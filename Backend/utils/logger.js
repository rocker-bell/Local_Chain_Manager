import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log file path
const logFilePath = path.join(__dirname, '../../logs/app.log');

// Ensure logs directory exists
const ensureLogDir = () => {
  try {
    const dir = path.dirname(logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('❌ Failed to create log directory:', err.message);
  }
};

// Format log message
const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
};

// Core write function (SAFE — never throws)
const writeLog = (level, message) => {
  try {
    ensureLogDir();
    const logEntry = formatMessage(level, message);

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('❌ Failed to write log:', err.message);
      }
    });
  } catch (err) {
    // Absolute fallback — never crash app
    console.error('❌ Logger failure:', err.message);
  }
};

// Public logger API
export const logger = {
  info: (msg) => writeLog('info', msg),

  error: (msg) => writeLog('error', msg),

  warn: (msg) => writeLog('warn', msg),

  // Specialized helpers for your requirement
  logSave: (file) => writeLog('info', `💾 Saved data to ${file}`),

  logLoad: (file) => writeLog('info', `📂 Loaded data from ${file}`),

  logIOError: (file, err) =>
    writeLog('error', `❌ I/O error on ${file}: ${err.message}`),
};