const sanitizeHtml = require("sanitize-html"); 

function cleanText(text) {
  return sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function sanitizeInput(value) {
  return value
    .normalize("NFKC")
    .replace(/\p{Cf}/gu, "")
    .trim();
}

function sanitizeText(value) {
  return value
    .normalize("NFKC")
    .replace(/\p{Cf}/gu, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .trim();
} 

module.exports = {
  sanitizeInput,
  sanitizeText,
  cleanText,
};
