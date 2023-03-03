const userValidators = require('../../src/app/validators/userValidators');

describe('tests for isString', () => {
  test('Providing a string as parameter returns true', () => {
    expect(userValidators.isString('string')).toBe(true);
  });

  test('Providing non string as parameter returns false', () => {
    expect(userValidators.isString(null)).toBe(false);
  });
});

describe('tests for isValidName', () => {
  test('Providing a string longer than 1 character returns true', () => {
    expect(userValidators.isValidName('name')).toBe(true);
  });

  test('Providing empty value as parameter returns false', () => {
    expect(userValidators.isValidName(null)).toBe(false);
    expect(userValidators.isValidName(undefined)).toBe(false);
  });

  test('Providing a string shorter than 2 characters returns false', () => {
    expect(userValidators.isValidName('a')).toBe(false);
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

describe('tests for isValidUsername', () => {
  test('Providing a string longer than 3 character returns true', () => {
    expect(userValidators.isValidUsername('username')).toBe(true);
  });

  test('Providing empty value as parameter returns false', () => {
    expect(userValidators.isValidUsername(null)).toBe(false);
    expect(userValidators.isValidUsername(undefined)).toBe(false);
  });

  test('Providing a string shorter than 4 characters returns false', () => {
    expect(userValidators.isValidUsername('aaa')).toBe(false);
  });
});

describe('tests for isValidPassword', () => {
  test('Providing a string longer than 3 character returns true', () => {
    expect(userValidators.isValidPassword('password')).toBe(true);
  });

  test('Providing empty value as parameter returns false', () => {
    expect(userValidators.isValidPassword(null)).toBe(false);
    expect(userValidators.isValidPassword(undefined)).toBe(false);
  });

  test('Providing a string shorter than 4 characters returns false', () => {
    expect(userValidators.isValidPassword('aaa')).toBe(false);
  });
});
