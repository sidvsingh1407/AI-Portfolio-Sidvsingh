/**
 * utils/logger.ts
 * Production-safe logger that no-ops in non-dev environments
 */

const isProd = import.meta.env.PROD;

export const logger = {
  log: (...args: any[]) => {
    if (!isProd) console.log('[LOG]', ...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) console.warn('[WARN]', ...args);
  },
  error: (...args: any[]) => {
    if (!isProd) console.error('[ERROR]', ...args);
  },
  info: (...args: any[]) => {
    if (!isProd) console.info('[INFO]', ...args);
  }
};
