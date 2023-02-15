const {
  validateCreateApplicant,
  validateLogin,
} = require('../../src/app/middleware/validation');

describe('tests for validateCreateApplicant', () => {
  const reqValid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '123456789018',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };
  const reqPnrNumberInvalid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '12345',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };

  const reqEmailInvalid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'testmailcom',
      pnr: '123456789018',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };

  const reqFirstnameInvalid = {
    body: {
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '123456789018',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };
  const reqLastnameInvalid = {
    body: {
      firstname: 'test',
      email: 'test@gmail.com',
      pnr: '123456789018',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };
  const reqPasswordInvalid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '123456789018',
      username: 'test',
      role: 'applicant',
    },
  };
  const reqUsernameInvalid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '123456789018',
      password: '12345test',
      role: 'applicant',
    },
  };
  const res = {
    statusCode: null,
    message: null,

    status: (value) => {
      res.statusCode = value;
      return {
        send: (message) => {
          res.message = message;
        },
      };
    },
  };

  const next = jest.fn();

  test('Next is called if the request is valid', () => {
    validateCreateApplicant(reqValid, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('An error is thrown if person number is invalid', () => {
    validateCreateApplicant(reqPnrNumberInvalid, res, null);
    expect(res.message).toEqual('Person number is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if email is invalid', () => {
    validateCreateApplicant(reqEmailInvalid, res, null);
    expect(res.message).toEqual('Email is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if first name is invalid', () => {
    validateCreateApplicant(reqFirstnameInvalid, res, null);
    expect(res.message).toEqual('Name is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if last name is invalid', () => {
    validateCreateApplicant(reqLastnameInvalid, res, null);
    expect(res.message).toEqual('Surname is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if password is invalid', () => {
    validateCreateApplicant(reqPasswordInvalid, res, null);
    expect(res.message).toEqual('Password is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if username is invalid', () => {
    validateCreateApplicant(reqUsernameInvalid, res, null);
    expect(res.message).toEqual('Username is not valid');
    expect(res.statusCode).toEqual(400);
  });
});

describe('tests for validateLogin', () => {
  const reqValid = {
    body: {
      username: 'test',
      password: '12345test',
    },
  };
  const reqUsernameInvalid = {
    body: {
      password: '12345test',
    },
  };
  const reqPasswordInvalid = {
    body: {
      username: 'test',
    },
  };
  const res = {
    statusCode: null,
    message: null,

    status: (value) => {
      res.statusCode = value;
      return {
        send: (message) => {
          res.message = message;
        },
      };
    },
  };
  const next = jest.fn();
  test('Next is called if the request is valid', () => {
    validateLogin(reqValid, res, next);
    expect(next).toHaveBeenCalled();
  });
  test('An error is thrown if no username is included', () => {
    validateLogin(reqUsernameInvalid, res, next);
    expect(res.message).toEqual('Enter a username');
    expect(res.statusCode).toEqual(400);
  });
  test('An error is thrown if no password is included', () => {
    validateLogin(reqPasswordInvalid, res, next);
    expect(res.message).toEqual('Enter a password');
    expect(res.statusCode).toEqual(400);
  });
});
