// const winston = require('winston');
// const moment = require('moment-timezone')

// // define the logger
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'log/logs.log' })
//   ]
// });

// // middleware to log requests
// const requestLogger = (req, res, next) => {
//   const { ip, originalUrl, method } = req;
//   const { userId, isAdmin } = req.session || {};
//   const timestamp = moment().tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ssZ');
//   const isUserAuthenticated = req.user && req.user.id;

//   logger.info({
//     ip,
//     timestamp,
//     user: {
//         id: userId || 0,
//         role: isAdmin ? 'ADMIN' : 'USER',
//     },
//     action: {
//         method,
//         url: originalUrl,
//     },
//     response: {
//         status: isUserAuthenticated ? 200 : 401,
//         message: isUserAuthenticated ? 'OK' : 'Unauthorized',
//     },
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
//       user: {
//         id: req.session.userId || 0,
//         role: 'ADMIN',
//       },
//       action: {
//         method,
//         url: originalUrl,
//       },
//       response: {
//         status: res.statusCode,
//         message: res.statusMessage,
//       },
//     });
//   }

//   next();
// };

// // middleware to log failed authorization to ADMIN actions
// const authFailedLogger = (req, res, next) => {
//   const { originalUrl } = req;
//   const { userId, isAdmin } = req.session || {};
//   const timestamp = moment().tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ssZ');

//   if (isAdmin && originalUrl.startsWith('/admin') && res.statusCode === 401 && userId) {
//     logger.warn({
//       ip: req.ip,
//       timestamp,
//       user: {
//         id: req.session.userId || 0,
//         role: 'ADMIN',
//       },
//       action: {
//         method: req.method,
//         url: originalUrl,
//       },
//       response: {
//         status: res.statusCode,
//         message: res.statusMessage,
//       },
//     });
//   }

//   next();
// };


// module.exports = {
//   requestLogger,
//   adminActionLogger,
//   authFailedLogger
// };
