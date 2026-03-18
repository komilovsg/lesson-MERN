// Middleware для проверки JWT (заполнишь при прохождении "Custom Auth Middleware & JWT Verify")
// Использование: router.get('/me', auth, (req, res) => { ... })
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const jwtSecret = process.env.JWT_SECRET || (config.has('jwtSecret') ? config.get('jwtSecret') : null);
    if (!jwtSecret) {
      return res.status(500).json({ msg: 'Server misconfigured: missing JWT secret' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
