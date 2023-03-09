const competenceValidators = require('../../src/app/validators/competenceValidators');

describe('tests for isValidYearsOfExperience', () => {
  test('Providing a nonnegative float returns true', () => {
    expect(competenceValidators.isValidYearsOfExperiance(1.5)).toBe(true);
  });

  test('Providing a negative float returns false', () => {
    expect(competenceValidators.isValidYearsOfExperiance(-1)).toBe(false);
  });
});
