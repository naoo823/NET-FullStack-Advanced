// Logging utility// For a real app, you would use a library like Winston
const logger = {
  info: (message) => console.log(`[INFO] ${message}`),
  error: (message) => console.error(`[ERROR] ${message}`),
};

module.exports = logger;