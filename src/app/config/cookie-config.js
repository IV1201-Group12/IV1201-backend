/**
 * The cookie configurations used for the authentication cookies.
 */

module.exports = {
  /**
   * Function that returns the cookie configurations for the login cookie.
   * One configuration for communication over HTTPS.
   * One configuration for communication over HTTP.
   * @returns The cookie configuration for the current environment.
   */
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
  /**
   * Function that returns the cookie configurations for the logout cookie.
   * One configuration for communication over HTTPS.
   * One configuration for communication over HTTP.
   * @returns The cookie configuration for the current environment.
   */
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
