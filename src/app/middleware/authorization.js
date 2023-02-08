const { verifyToken } = require('../utils/jwt');

module.exports = {
  authorizeRequest: (role) => {
    return (req, res, next) => {
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
        if (!role.includes(req.role)) return res.status(403).send('Wrong role');
        return next();
      } catch {
        //todo
        return res.status(403).send('Bad token');
      }
    };
  },
};
