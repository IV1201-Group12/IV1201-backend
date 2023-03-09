const availabilityValidators = require('../../src/app/validators/availabilityValidators');

describe('tests for isValidDate', () => {
  futureDate = new Date('10000-01-01');
  pastDate = new Date('2020-01-01');
  valueNotParseableToDate = 'abc';
  test('Providing future date returns true', () => {
    expect(availabilityValidators.isValidDate(futureDate)).toBe(true);
  });

  test('Providing past date returns false', () => {
    expect(availabilityValidators.isValidDate(pastDate)).toBe(false);
  });

  test('Providing value not parseable to Date returns false', () => {
    expect(availabilityValidators.isValidDate(valueNotParseableToDate)).toBe(
      false,
    );
  });
});
