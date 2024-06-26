document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded and parsed");
    await loadContent();
    setupToggleButtons();
    setupSmoothScroll();
    setupDynamicSentences();
    setupButtonHoverEffect();
    setupTermsToggle();
});

function toggleMenu() {
    const mainNav = document.getElementById('main-nav');
    mainNav.classList.toggle('show');
}

async function loadContent() {
    try {
        console.log("Fetching content...");
        const aboutData = await fetchJSON('about.json');
        updateAboutSection(aboutData);

        const servicesData = await fetchJSON('services.json');
        updateServicesSection(servicesData);

        const roadmapData = await fetchJSON('roadmap.json');
        updateRoadmapSection(roadmapData);

        const faqData = await fetchJSON('faq.json');
        updateFaqSection(faqData);

        const heroData = await fetchJSON('hero.json');
        console.log("Hero data loaded:", heroData);
        setupDynamicKeywords(heroData);

        const contactData = await fetchJSON('contact.json');
        updateContactSection(contactData);

        const termsData = await fetchJSON('terms.json');
        updateTermsSection(termsData);

        console.log("All content loaded successfully.");
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

async function fetchJSON(url) {
    console.log(`Fetching JSON data from ${url}...`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    const data = await response.json();
    console.log(`Data fetched from ${url}:`, data);
    return data;
}

function updateAboutSection(data) {
    console.log("Updating About section with data:", data);
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = data.introduction + data.sections.map(section => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${section.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${section.title}</h3>
            <div class="content hidden">${section.content}</div>
        </div>
    `).join('') + `
        <div class="call-to-action">
            <h2>${data.callToAction.title}</h2>
            <p>${data.callToAction.body}</p>
        </div>
    `;
}

function updateServicesSection(data) {
    console.log("Updating Services section with data:", data);
    const servicesContent = document.getElementById('services-content');
    servicesContent.innerHTML = data.introduction + data.tiers.map(tier => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${tier.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${tier.title}</h3>
            <div class="content hidden">
                <p>${tier.description}</p>
                <ul>${tier.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
            </div>
        </div>
    `).join('');
}

function updateRoadmapSection(data) {
    console.log("Updating Roadmap section with data:", data);
    const roadmapContent = document.getElementById('roadmap-content');
    roadmapContent.innerHTML = data.introduction + data.steps.map(step => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${step.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${step.title}</h3>
            <div class="content hidden">${step.content}</div>
        </div>
    `).join('');
}

function updateFaqSection(data) {
    console.log("Updating FAQ section with data:", data);
    const faqIntro = document.getElementById('faq-intro');
    faqIntro.innerHTML = data.body;

    const faqContent = document.getElementById('faq-content');
    faqContent.innerHTML = data.questions.map(faq => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${faq.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${faq.question}</h3>
            <div class="content hidden">${faq.answer}</div>
        </div>
    `).join('');
}

function updateContactSection(data) {
    console.log("Updating Contact section with data:", data);
    const contactTitle = document.getElementById('contact-title');
    const contactBody = document.getElementById('contact-body');
    contactTitle.textContent = data.title;
    contactBody.innerHTML = data.body;
}

function updateTermsSection(data) {
    console.log("Updating Terms section with data:", data);
    const termsContent = document.getElementById('terms-content');
    termsContent.innerHTML = data.termsAndConditions.sections.map(section => `
        <h3>${section.title}</h3>
        <p>${section.content}</p>
    `).join('') + `
        <h2>Privacy Policy</h2>
        ${data.privacyPolicy.sections.map(section => `
            <h3>${section.title}</h3>
            <p>${section.content}</p>
        `).join('')}
    `;
}

function setupToggleButtons() {
    console.log("Setting up toggle buttons...");
    const faqButton = document.getElementById('toggle-faq');
    const faqContent = document.getElementById('faq-content');

    faqButton.addEventListener('click', () => {
        faqContent.classList.toggle('hidden');
        faqButton.textContent = faqContent.classList.contains('hidden') ? 'Show Q&A' : 'Hide Q&A';
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('collapsible')) {
            event.target.classList.toggle('active');
            event.target.nextElementSibling.classList.toggle('hidden');
        }
    });
}

function setupSmoothScroll() {
    console.log("Setting up smooth scroll...");
    const headerOffset = document.querySelector('header').offsetHeight + 80; // Add extra offset

    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function setupDynamicKeywords(heroData) {
    console.log("Setting up dynamic keywords with data:", heroData);
    const dynamicKeywords = heroData.keywords;
    const dynamicKeywordElement = document.getElementById('dynamic-keyword');
    let heroIndex = 0;

    setInterval(() => {
        if (dynamicKeywords && dynamicKeywords.length > 0) {
            dynamicKeywordElement.textContent = dynamicKeywords[heroIndex].text;
            dynamicKeywordElement.style.color = dynamicKeywords[heroIndex].color;
            dynamicKeywordElement.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
            console.log(`Changed keyword to: ${dynamicKeywords[heroIndex].text} with color ${dynamicKeywords[heroIndex].color}`);
            heroIndex = (heroIndex + 1) % dynamicKeywords.length;
        } else {
            console.error("No keywords available to display.");
        }
    }, 2000);
}

function setupDynamicSentences() {
    console.log("Setting up dynamic sentences...");
    const roadmapThemes = [
        { text: "Innovation", color: "#FF7F00" },
        { text: "Growth", color: "#00FFFF" },
        { text: "Resilience", color: "#FF1493" }
    ];

    let roadmapIndex = 0;
    let serviceThemeIndex = 0;
    const dynamicTheme = document.getElementById("dynamic-theme");
    const dynamicServiceTheme = document.getElementById("dynamic-service-theme");
    const dynamicFaqTheme = document.getElementById("dynamic-faq-theme");

    setInterval(() => {
        dynamicTheme.textContent = roadmapThemes[roadmapIndex].text;
        dynamicTheme.style.color = roadmapThemes[roadmapIndex].color;
        dynamicTheme.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
        roadmapIndex = (roadmapIndex + 1) % roadmapThemes.length;
    }, 2000);

    setInterval(() => {
        dynamicServiceTheme.textContent = roadmapThemes[serviceThemeIndex].text;
        dynamicServiceTheme.style.color = roadmapThemes[serviceThemeIndex].color;
        dynamicServiceTheme.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
        serviceThemeIndex = (serviceThemeIndex + 1) % roadmapThemes.length;
    }, 2000);

    setInterval(() => {
        dynamicFaqTheme.textContent = roadmapThemes[serviceThemeIndex].text;
        dynamicFaqTheme.style.color = roadmapThemes[serviceThemeIndex].color;
        dynamicFaqTheme.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
        serviceThemeIndex = (serviceThemeIndex + 1) % roadmapThemes.length;
    }, 2000);
}

function setupButtonHoverEffect() {
    const neonColors = [
        'red', 'orange', 'yellow', 'lime', 'green', 'aqua', 'cyan', 'blue', 'indigo', 'deeppink', 'magenta'
    ];
    
    const complementaryColors = {
        'red': 'cyan',
        'orange': 'blue',
        'yellow': 'indigo',
        'lime': 'magenta',
        'green': 'deeppink',
        'aqua': 'red',
        'cyan': 'red',
        'blue': 'orange',
        'indigo': 'yellow',
        'deeppink': 'lime',
        'magenta': 'green'
    };

    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseover', () => {
            const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
            button.style.setProperty('--neon-color', randomColor);
            button.style.setProperty('--complementary-color', complementaryColors[randomColor]);
        });
    });
}

function setupTermsToggle() {
    const termsLink = document.getElementById('terms-link');
    const termsSection = document.getElementById('terms');
    const closeTermsButton = document.getElementById('close-terms');

    termsLink.addEventListener('click', function (e) {
        e.preventDefault();
        termsSection.classList.toggle('hidden');
        termsSection.classList.toggle('open');
    });

    closeTermsButton.addEventListener('click', function () {
        termsSection.classList.add('hidden');
        termsSection.classList.remove('open');
    });
}

