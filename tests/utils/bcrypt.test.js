const bcrypt = require('bcrypt');
const bcryptJS = require('../../src/app/utils/bcrypt');

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hash'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('generateHash', () => {
  it('generates a hash of the password', async () => {
    const password = 'password';
    const hash = await bcryptJS.generateHash(password);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(hash).toBe('hash');
  });
});

describe('comparePassword', () => {
  it('compares the password to the hash and returns true if they match', async () => {
    const password = 'password';
    const hash = 'hash';
    const result = await bcryptJS.comparePassword(password, hash);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    expect(result).toBe(true);
  });
});
