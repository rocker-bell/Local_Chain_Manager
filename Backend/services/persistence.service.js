import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export const FILE_PATH = path.resolve('blockchain.json');

export const persistenceService = {
  // save blockchain state to disk
  save: (blockchain) => {
    try {
      const data = JSON.stringify(blockchain, null, 2);
      fs.writeFileSync(FILE_PATH, data, 'utf-8');

      logger.logSave(FILE_PATH);
      console.log('[Persistence] Blockchain saved successfully.');
    } catch (err) {
      logger.logIOError(FILE_PATH, err);
    }
  },

  // load blockchain state from disk
  load: () => {
    try {
      if (!fs.existsSync(FILE_PATH)) {
        logger.warn('No saved blockchain found. Starting fresh.');
        return null;
      }

      const raw = fs.readFileSync(FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);

      // basic integrity check
      if (!parsed.chain || !Array.isArray(parsed.chain)) {
        logger.warn('Invalid blockchain structure. Starting fresh.');
        return null;
      }

      logger.logLoad(FILE_PATH);
      return parsed;
      console.log('[Persistence] Blockchain loaded from disk.');
    } catch (err) {
      logger.logIOError(FILE_PATH, err);
      return null; // NEVER crash
    }
  },

  // delete saved blockchain state
  clear: () => {
    try {
      if (fs.existsSync(FILE_PATH)) {
        fs.unlinkSync(FILE_PATH);
        logger.info(`🗑️ Cleared blockchain file: ${FILE_PATH}`);
        console.log('[Persistence] Blockchain cleared from disk.');
      }
    } catch (err) {
      logger.logIOError(FILE_PATH, err);
    }
  }
};
