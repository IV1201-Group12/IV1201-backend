const { verifyToken } = require('../utils/jwt');

/**
 * Middleware used for authorizing a request.
 */
module.exports = {
  /**
   * Extracts the token from the ACCESSTOKEN cookie, verifies that it is valid,
   * and that the role included in it corresponds to the given role.
   * Responds with HTTP status code 403 and a corresponding error message if the token does not exist,
   * is not valid or does not have the correct role.
   * @param {*} role The given role.
   * @returns The next() function if the token exists, is valid and has the correct role.
   */
  authorizeRequest: (role) => {
    return (req, res, next) => {
      const token = req.cookies.ACCESSTOKEN;
      if (!token) {
        return res.status(401).send('No token');
      }
      try {
        const tokenData = verifyToken(token);
        req.id = tokenData.id;
        req.username = tokenData.username;
        req.role = tokenData.role;
        if (!role.includes(req.role)) return res.status(403).send('Wrong role');
        return next();
      } catch (err) {
        return res.status(401).send(err);
      }
    };
  },
};
