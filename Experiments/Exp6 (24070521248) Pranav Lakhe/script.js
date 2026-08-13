// practical6.js
// Single-file script implementing the classroom example (email validation, extraction, string functions, analysis)

const text = "Hi team — please send final reports to lead.dev@example.org and cc backups to ops+archive@sub.company.co.uk; urgent incidents should go to oncall@infra.example.net. Billing questions: accounts@finance.example.com. Thanks, Project Manager.Contact: alice.brown@example.com, backup: support@shop.co.uk — please reply within 24 hours.";

// 1. Email validation
const email = "student@example.com";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log("Text:\n", text);
console.log('\n1) Email validation');
console.log('Valid Email:', emailRegex.test(email));

// 2. Data extraction - extract all emails
// extract emails (improved regex to avoid trailing punctuation)
const emails = Array.from(text.matchAll(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g), m => m[1]);
console.log('\n2) Data extraction');
console.log('Extracted Emails:', emails);

// 2b. Remove / redact emails from the text
const redacted = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})[\.,;:!\)?]*/g, '[redacted]');
console.log('\n2b) Text after redacting emails:\n', redacted);

// 3. String functions
console.log('\n3) String functions');
console.log('Uppercase:', text.toUpperCase());
console.log('Lowercase:', text.toLowerCase());
console.log("Contains 'Welcome':", text.includes('Welcome'));
console.log('Text Length:', text.length);

// 4. Text analysis
const words = text.split(/\s+/).filter(Boolean);
console.log('\n4) Text analysis');
console.log('Number of Words:', words.length);

// Count occurrences of "email"
const count = (text.match(/email/g) || []).length;
console.log("Occurrences of 'email':", count);

// Exit when run in terminal
if (typeof process !== 'undefined' && process.stdout) process.exit(0);
