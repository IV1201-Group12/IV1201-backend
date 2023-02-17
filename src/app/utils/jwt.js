const jwt = require('jsonwebtoken');

/**
 * The methods used for generating and verifying JSON web tokens.
 * Uses the jsonwebtoken package (https://www.npmjs.com/package/jsonwebtoken).
 */
module.exports = {
  /**
   * Generates a token from a given user object, using the id, username and role as claims.
   * @param {*} user The given user object.
   * @returns The generated token.
   */
  generateToken: (user) => {
    return jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
  },
  /**
   * Verifies that a given token is valid by decoding it with the secret.
   * @param {*} token The given token.
   * @returns The decoded token.
   * @throws Will throw an error if the token is not valid.
   */
  verifyToken: (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    } catch (err) {
      throw new Error('Invalid token.');
    }
  },
};
