/**
 * The CORS options used to enable cross-site requests.
 */

module.exports = {
  /**
   * Function that returns the CORS options depending on the environment.
   * Sets the "Access-Control-Allow-Origin" header appropriately.
   * Sets the "Access-Control-Allow-Credentials" header.
   * @returns The CORS options for the current environment.
   */
  corsOptions: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        origin: ['https://iv1201-frontend.onrender.com'],
        credentials: true,
      };
    } else {
      return {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true,
      };
    }
  },
};
