const jwt = require('jsonwebtoken');

const secret = 'TEMPORARYSECRETASDASDSDSADSADSADASDASDAS';

module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      secret,
      {
        expiresIn: '1h',
      },
    );
  },
  verifyToken: (token) => {
    try {
      const decodedToken = jwt.verify(token, secret);
      return decodedToken;
    } catch (err) {
      //todo
      throw new Error('Bad token');
    }
  },
};
