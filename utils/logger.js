const fs = require("fs");
const path = require("path");

// Log file path
const logFilePath = path.join(__dirname, "..", "logs", "app.log");

// Function to write logs to file
const writeLog = (level, message) => {
    const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry, "utf8");
};

// Logger object with different log levels
const logger = {
    warn: (message) => {
        writeLog("warn", message);
    },
    info: (message) => {
        writeLog("info", message);
    },
    error: (message) => {
        writeLog("error", message);
    }
};

module.exports = logger;
