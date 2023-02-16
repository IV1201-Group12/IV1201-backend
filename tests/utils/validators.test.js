const Validators = require('../../src/app/utils/validators');

describe('tests for isString', () => {
  test('Providing a string as parameter returns true', () => {
    expect(Validators.isString('string')).toBe(true);
  });

  test('Providing non string as parameter returns false', () => {
    expect(Validators.isString(null)).toBe(false);
  });
});

describe('tests for isValidPnr', () => {
  test('Providing a valid person number returns true', () => {
    expect(Validators.isValidPnr('123456789012')).toBe(true);
  });

  test('Providing a non number as parameter returns false', () => {
    expect(Validators.isValidPnr('12345awsshshs')).toBe(false);
  });

  test('Providing a person number that does not have 12 digits returns false', () => {
    expect(Validators.isValidPnr('1234567890')).toBe(false);
  });
});

describe('tests for isValidEmail', () => {
  test('Providing a valid email returns true', () => {
    expect(Validators.isValidEmail('test@gmail.com')).toBe(true);
  });

  test('Providing an invalid email returns false', () => {
    expect(Validators.isValidEmail('test')).toBe(false);
  });
});
