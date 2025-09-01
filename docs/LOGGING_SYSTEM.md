# Aurora Logging System

## Overview

The Aurora application uses a centralized logging system to replace all `console.log` statements with proper, configurable logging levels. This improves performance, security, and code professionalism in production environments.

## Features

- **Environment-based logging levels**: Different log levels for development and production
- **Structured logging**: Consistent format with timestamps and log levels
- **Context-specific methods**: Specialized logging methods for different parts of the application
- **ESLint integration**: Prevents `console.log` usage in production builds

## Log Levels

| Level | Description | Production | Development |
|-------|-------------|------------|-------------|
| ERROR | Critical errors that need immediate attention | ✅ | ✅ |
| WARN | Warning messages for potential issues | ✅ | ✅ |
| INFO | General information messages | ❌ | ✅ |
| DEBUG | Detailed debugging information | ❌ | ✅ |
| TRACE | Very detailed trace information | ❌ | ✅ |

## Usage

### Basic Logging

```javascript
import logger from '@/lib/logger';

// Error logging
logger.error('Something went wrong', error);

// Warning logging
logger.warn('Potential issue detected', { userId, action });

// Info logging
logger.info('User action completed', { userId, action });

// Debug logging
logger.debug('Processing request', { requestId, params });

// Trace logging
logger.trace('Function entry point', { functionName, args });
```

### Context-Specific Logging

The logger provides specialized methods for different parts of the application:

```javascript
// Authentication context
logger.auth('User login attempt', { email, success });

// Wallet operations
logger.wallet('Wallet connected', { address, type });

// NFT operations
logger.nft('NFT minted successfully', { tokenId, recipient });

// Stellar blockchain operations
logger.stellar('Transaction submitted', { txHash, status });

// Contract interactions
logger.contract('Contract deployed', { contractId, network });

// Transaction processing
logger.transaction('Transaction signed', { xdr, walletType });
```

## Configuration

### Environment Variables

The logging level is automatically determined based on the `NODE_ENV` environment variable:

- **Production** (`NODE_ENV=production`): Only ERROR and WARN levels
- **Development** (`NODE_ENV=development`): All levels including DEBUG

### Dynamic Configuration

You can change the log level at runtime:

```javascript
import logger, { LOG_LEVELS } from '@/lib/logger';

// Set to specific level
logger.setLevel(LOG_LEVELS.INFO);

// Set by name
logger.setLevel('DEBUG');

// Check current level
const currentLevel = logger.getLevel();

// Check if debug is enabled
if (logger.isDebugEnabled()) {
  // Perform debug operations
}
```

## Migration from console.log

### Before (Old Code)
```javascript
console.log('User logged in:', user);
console.error('Login failed:', error);
console.warn('Invalid email format:', email);
```

### After (New Code)
```javascript
import logger from '@/lib/logger';

logger.auth('User logged in', user);
logger.error('Login failed', error);
logger.warn('Invalid email format', { email });
```

## ESLint Rules

The project includes ESLint rules to prevent `console.log` usage:

- **Production**: `console.log` is treated as an error
- **Development**: `console.log` generates a warning
- **Custom rule**: Suggests using the logger instead

### ESLint Configuration

```javascript
// eslint.config.js
rules: {
  // Prevent console.log in production
  "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
  // Suggest using logger
  "no-restricted-syntax": [
    "error",
    {
      selector: "CallExpression[callee.object.name='console'][callee.property.name='log']",
      message: "Use logger from @/lib/logger instead of console.log"
    }
  ]
}
```

## Best Practices

1. **Use appropriate log levels**: Don't use ERROR for informational messages
2. **Include context**: Always provide relevant data as the second parameter
3. **Use context-specific methods**: Use `logger.auth()` for auth events, `logger.wallet()` for wallet operations, etc.
4. **Avoid sensitive data**: Never log passwords, private keys, or other sensitive information
5. **Structured data**: Pass objects instead of concatenated strings for better parsing

## Performance Considerations

- Logging is automatically disabled in production for DEBUG and TRACE levels
- The logger checks the current level before processing messages
- Use `logger.isDebugEnabled()` to avoid expensive operations in debug logging

## Troubleshooting

### Common Issues

1. **Logger not imported**: Make sure to import logger in each file
2. **Wrong log level**: Check if your message is being filtered by the current log level
3. **Missing context**: Always provide relevant data for better debugging

### Debug Mode

To enable debug logging in production (for troubleshooting):

```javascript
import logger from '@/lib/logger';

// Temporarily enable debug logging
logger.setLevel('DEBUG');

// Your debug code here

// Reset to production level
logger.setLevel('WARN');
```

## Migration Checklist

- [ ] Import logger in all files that use console.log
- [ ] Replace console.log with appropriate logger method
- [ ] Replace console.error with logger.error
- [ ] Replace console.warn with logger.warn
- [ ] Add context data as second parameter
- [ ] Use context-specific methods where appropriate
- [ ] Test logging in both development and production environments
- [ ] Verify ESLint rules are working correctly
