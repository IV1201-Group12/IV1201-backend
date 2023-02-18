const { generateToken, verifyToken } = require('../../src/app/utils/jwt');

describe('tests for generateToken', () => {
  const userObjectValid = {
    id: 1,
    username: 'user',
    role: 'applicant',
  };

  const userObjectInvalid = {};

  test('it can generate a token given a valid user object', () => {
    expect(() => generateToken(userObjectValid)).not.toThrow();
  });
  test('it throws an error with the correct message if the user object is not valid', () => {
    try {
      expect(() => generateToken(userObjectInvalid)).toThrow();
    } catch (err) {
      expect(err.message).toEqual('Could not generate token.');
    }
  });
});

describe('tests for verifyToken', () => {
  const userObjectValid = {
    id: 1,
    username: 'user',
    role: 'applicant',
  };
  const validToken = generateToken(userObjectValid);
  const invalidToken = validToken.slice(1);
  test('it returns the decoded token when verifying a valid token', () => {
    const decodedToken = verifyToken(validToken);
    expect(decodedToken).toMatchObject(userObjectValid);
  });
  test('it throws an error with the correct message when verifying an invalid token', () => {
    try {
      expect(() => verifyToken(invalidToken)).toThrow();
    } catch (err) {
      expect(err.message).toEqual('Invalid token.');
    }
  });
});
