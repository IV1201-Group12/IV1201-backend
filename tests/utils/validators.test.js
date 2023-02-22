const userValidators = require('../../src/app/validators/userValidators');

describe('tests for isString', () => {
  test('Providing a string as parameter returns true', () => {
    expect(userValidators.isString('string')).toBe(true);
  });

  test('Providing non string as parameter returns false', () => {
    expect(userValidators.isString(null)).toBe(false);
  });
});

describe('tests for isValidPnr', () => {
  test('Providing a valid person number returns true', () => {
    expect(userValidators.isValidPnr('123456789012')).toBe(true);
  });

  test('Providing a non number as parameter returns false', () => {
    expect(userValidators.isValidPnr('12345awsshshs')).toBe(false);
  });

  test('Providing a person number that does not have 12 digits returns false', () => {
    expect(userValidators.isValidPnr('1234567890')).toBe(false);
  });
});

describe('tests for isValidEmail', () => {
  test('Providing a valid email returns true', () => {
    expect(userValidators.isValidEmail('test@gmail.com')).toBe(true);
  });

  test('Providing an invalid email returns false', () => {
    expect(userValidators.isValidEmail('test')).toBe(false);
  });
});
