const { verifyToken } = require('../utils/jwt');

module.exports = {
  authorizeRequest: (req, res, next) => {
    const token = req.cookies.ACCESSTOKEN;
    if (!token) {
      //todo
      return res.status(403).send('No token');
    }
    try {
      const tokenData = verifyToken(token);
      req.id = tokenData.id;
      req.username = tokenData.username;
      req.role = tokenData.role;
      return next();
    } catch {
      //todo
      return res.status(403).send('Bad token');
    }
  },
};
