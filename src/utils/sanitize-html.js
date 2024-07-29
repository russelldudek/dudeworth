import DOMPurify from 'dompurify';

export function sanitizeHtml(html) {
  return {
    __html: DOMPurify.sanitize(html)
  };
}