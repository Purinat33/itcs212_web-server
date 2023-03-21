// const winston = require('winston');

// // define the logger
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'logs.log' })
//   ]
// });

// // middleware to log requests
// const requestLogger = (req, res, next) => {
//   const { ip, originalUrl, method } = req;
//   const { userId, isAdmin } = req.session || {};
//   const timestamp = moment().tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ssZ');

//   logger.info({
//     ip,
//     timestamp,
//     userId: userId || 0,
//     role: isAdmin ? 'ADMIN' : 'USER',
//     action: originalUrl === '/login' ? 'logging in' : originalUrl === '/register' ? 'registering' : '',
//     response: res.statusCode
//   });

//   next();
// };

// // middleware to log ADMIN actions
// const adminActionLogger = (req, res, next) => {
//   const { originalUrl, method } = req;
//   const { isAdmin } = req.session || {};
//   const timestamp = moment().tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ssZ');

//   if (isAdmin && originalUrl.startsWith('/admin')) {
//     logger.info({
//       ip: req.ip,
//       timestamp,
//       userId: req.session.userId || 0,
//       role: 'ADMIN',
//       action: `${method} ${originalUrl}`,
//       response: res.statusCode
//     });
//   }

//   next();
// };

// // middleware to log failed authorization to ADMIN actions
// const authFailedLogger = (req, res, next) => {
//   const { originalUrl } = req;
//   const { isAdmin } = req.session || {};
//   const timestamp = moment().tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ssZ');

//   if (isAdmin && originalUrl.startsWith('/admin') && res.statusCode === 401) {
//     logger.warn({
//       ip: req.ip,
//       timestamp,
//       userId: req.session.userId || 0,
//       role: 'ADMIN',
//       action: `failed authorization to ${originalUrl}`,
//       response: res.statusCode
//     });
//   }

//   next();
// };

// module.exports = {
//   requestLogger,
//   adminActionLogger,
//   authFailedLogger
// };
