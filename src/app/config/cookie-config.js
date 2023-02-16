module.exports = {
  cookieConfig: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 60 * 60 * 1000, //1h
      };
    } else {
      return {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, //1h
      };
    }
  },
};