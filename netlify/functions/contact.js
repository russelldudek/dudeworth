const crypto = require("crypto");

const SPREADSHEET_ID = process.env.CRM_SPREADSHEET_ID || "19OiUSu4ExbhpbCqt83q0a4Kbi3T8LzzNwvkTeebSpVE";
const SHEET_NAME = process.env.CRM_OUTREACH_LOG_TAB || "Outreach Log";

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

const base64url = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const getPrivateKey = () => {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  return key ? key.replace(/\\n/g, "\n") : "";
};

const getAccessToken = async () => {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = getPrivateKey();
  if (!email || !privateKey) {
    throw new Error("Google service account environment variables are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signature = crypto.createSign("RSA-SHA256").update(unsigned).sign(privateKey, "base64url");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });

  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error_description || payload.error || "Google token request failed.");
  return payload.access_token;
};

const clean = (value, limit = 1200) => String(value || "").trim().slice(0, limit);

const buildRow = (payload) => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const stamp = now.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const logId = `WEB-${stamp}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const contact = email ? `${name} <${email}>` : name;
  const subject = clean(payload.subject, 180) || "Website inquiry";
  const company = clean(payload.company, 180) || "Website Inquiry";
  const startTimeline = clean(payload.startTimeline, 120);
  const budgetRange = clean(payload.budgetRange, 120);
  const engagementType = clean(payload.engagementType, 180);
  const message = clean(payload.message, 1600);
  const sourcePage = clean(payload.sourcePage, 500);
  const notes = [
    `Website form submission from dudeworth.com.`,
    startTimeline && `Start timing: ${startTimeline}.`,
    budgetRange && `Budget range: ${budgetRange}.`,
    engagementType && `Closest help: ${engagementType}.`,
    message && `Message: ${message}`,
  ]
    .filter(Boolean)
    .join(" ");

  return [
    logId,
    date,
    company,
    contact,
    "Website Form",
    subject,
    subject,
    "Received",
    "",
    "Review website inquiry and respond from HI@dudeworth.com",
    "",
    sourcePage,
    notes,
  ];
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed." });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  if (clean(payload.website)) return json(200, { ok: true });

  const captchaA = Number(payload.captchaA);
  const captchaB = Number(payload.captchaB);
  const captchaAnswer = Number(payload.captchaAnswer);
  if (!Number.isFinite(captchaA) || !Number.isFinite(captchaB) || captchaA + captchaB !== captchaAnswer) {
    return json(400, { error: "Worthiness Check did not match." });
  }

  if (
    !clean(payload.name) ||
    !clean(payload.email) ||
    !clean(payload.startTimeline) ||
    !clean(payload.budgetRange) ||
    !clean(payload.engagementType) ||
    !clean(payload.message)
  ) {
    return json(400, { error: "Name, email, start timing, budget, help type, and message are required." });
  }

  try {
    const token = await getAccessToken();
    const range = encodeURIComponent(`'${SHEET_NAME}'!A:M`);
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [buildRow(payload)] }),
      },
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || "Google Sheets append failed.");
    return json(200, { ok: true, updatedRange: result.updates?.updatedRange });
  } catch (error) {
    return json(500, { error: error.message });
  }
};
