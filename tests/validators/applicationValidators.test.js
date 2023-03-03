const applicationValidators = require('../../src/app/validators/applicationValidators');

describe('tests for isValidVersion', () => {
  test('Providing a nonnegative integer returns true', () => {
    expect(applicationValidators.isValidVersion(1)).toBe(true);
  });

  test('Providing a float returns false', () => {
    expect(applicationValidators.isValidVersion(1.5)).toBe(false);
  });

  test('Providing a negative integer returns false', () => {
    expect(applicationValidators.isValidVersion(-1)).toBe(false);
  });
});

describe('tests for isValidStatus', () => {
  test('Providing valid status returns true', () => {
    expect(applicationValidators.isValidStatus('unhandled')).toBe(true);
    expect(applicationValidators.isValidStatus('accepted')).toBe(true);
    expect(applicationValidators.isValidStatus('rejected')).toBe(true);
  });

  test('Providing invalid status returns false', () => {
    expect(applicationValidators.isValidStatus('notvalidstatus')).toBe(false);
  });
});
