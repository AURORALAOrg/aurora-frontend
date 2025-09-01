/**
 * Logger utility for Aurora application
 * Provides configurable logging levels and environment-based logging
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

const LOG_LEVEL_NAMES = {
  0: 'ERROR',
  1: 'WARN',
  2: 'INFO',
  3: 'DEBUG',
  4: 'TRACE'
};

class Logger {
  constructor() {
    this.level = this.getLogLevel();
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  getLogLevel() {
    // In production, only show ERROR and WARN by default
    if (process.env.NODE_ENV === 'production') {
      return LOG_LEVELS.WARN;
    }
    
    // In development, show all levels
    return LOG_LEVELS.DEBUG;
  }

  shouldLog(level) {
    return level <= this.level;
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const levelName = LOG_LEVEL_NAMES[level];
    const prefix = `[${timestamp}] [${levelName}]`;
    
    if (data) {
      return `${prefix} ${message}`, data;
    }
    return `${prefix} ${message}`;
  }

  error(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      if (data) {
        console.error(this.formatMessage(LOG_LEVELS.ERROR, message), data);
      } else {
        console.error(this.formatMessage(LOG_LEVELS.ERROR, message));
      }
    }
  }

  warn(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.WARN)) {
      if (data) {
        console.warn(this.formatMessage(LOG_LEVELS.WARN, message), data);
      } else {
        console.warn(this.formatMessage(LOG_LEVELS.WARN, message));
      }
    }
  }

  info(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.INFO)) {
      if (data) {
        console.info(this.formatMessage(LOG_LEVELS.INFO, message), data);
      } else {
        console.info(this.formatMessage(LOG_LEVELS.INFO, message));
      }
    }
  }

  debug(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.DEBUG)) {
      if (data) {
        console.log(this.formatMessage(LOG_LEVELS.DEBUG, message), data);
      } else {
        console.log(this.formatMessage(LOG_LEVELS.DEBUG, message));
      }
    }
  }

  trace(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.TRACE)) {
      if (data) {
        console.log(this.formatMessage(LOG_LEVELS.TRACE, message), data);
      } else {
        console.log(this.formatMessage(LOG_LEVELS.TRACE, message));
      }
    }
  }

  // Convenience methods for specific contexts
  auth(message, data = null) {
    this.debug(`[AUTH] ${message}`, data);
  }

  wallet(message, data = null) {
    this.debug(`[WALLET] ${message}`, data);
  }

  nft(message, data = null) {
    this.debug(`[NFT] ${message}`, data);
  }

  stellar(message, data = null) {
    this.debug(`[STELLAR] ${message}`, data);
  }

  contract(message, data = null) {
    this.debug(`[CONTRACT] ${message}`, data);
  }

  transaction(message, data = null) {
    this.debug(`[TX] ${message}`, data);
  }

  // Method to set log level dynamically
  setLevel(level) {
    if (typeof level === 'string') {
      const levelKey = level.toUpperCase();
      if (LOG_LEVELS[levelKey] !== undefined) {
        this.level = LOG_LEVELS[levelKey];
      }
    } else if (typeof level === 'number' && level >= 0 && level <= 4) {
      this.level = level;
    }
  }

  // Method to get current log level
  getLevel() {
    return this.level;
  }

  // Method to check if debug logging is enabled
  isDebugEnabled() {
    return this.level >= LOG_LEVELS.DEBUG;
  }

  // Method to check if trace logging is enabled
  isTraceEnabled() {
    return this.level >= LOG_LEVELS.TRACE;
  }
}

// Create singleton instance
const logger = new Logger();

// Export both the class and the singleton instance
export { Logger, LOG_LEVELS, LOG_LEVEL_NAMES };
export default logger;
