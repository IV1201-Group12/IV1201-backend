module.exports = {
  corsOptions: () => {
    if (process.NODE.env === 'production') {
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
