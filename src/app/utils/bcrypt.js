const bcrypt = require('bcrypt');

/**
 * The methods used for hashing passwords and comparing plaintext passwords to hashes.
 * Uses the bcrypt package (https://www.npmjs.com/package/bcrypt) which uses the bcrypt algorithm for hashing.
 */
module.exports = {
  /**
   * Generates a hash from a given password.
   * Uses 10 salt rounds.
   * @param {*} password The given password.
   * @returns The generated hash.
   */
  generateHash: async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  },
  /**
   * Compares a given plaintext password and hash to see if they correspond.
   * @param {*} password The given plaintext password.
   * @param {*} hash The given hash.
   * @returns true if they correspond, false otherwise.
   */
  comparePassword: async (password, hash) => {
    const isSame = await bcrypt.compare(password, hash);
    return isSame;
  },
};
