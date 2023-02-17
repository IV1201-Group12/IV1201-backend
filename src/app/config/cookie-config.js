module.exports = {
  cookieConfigLogin: () => {
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
  cookieConfigLogout: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        maxAge: 5 * 1000, //5s
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      };
    } else {
      return {
        maxAge: 5 * 1000, //5s
        httpOnly: true,
        sameSite: 'Strict',
      };
    }
  },
};
