const {
  validateRegister,
  validateLogin,
  validateChangeStatusOfApplication,
} = require('../../src/app/middleware/validation');

describe('tests for validateRegister', () => {
  const reqValid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '111111111115',
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
      pnr: '111111111116',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };

  const reqFirstnameInvalid = {
    body: {
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '111111111117',
      username: 'test',
      password: '12345test',
      role: 'applicant',
    },
  };
  const reqLastnameInvalid = {
    body: {
      firstname: 'test',
      email: 'test@gmail.com',
      pnr: '111111111118',
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
      pnr: '111111111119',
      username: 'test',
      role: 'applicant',
    },
  };
  const reqUsernameInvalid = {
    body: {
      firstname: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      pnr: '111111111110',
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
    validateRegister(reqValid, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('An error is thrown if person number is invalid', () => {
    validateRegister(reqPnrNumberInvalid, res, null);
    expect(res.message).toEqual('Pnr is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if email is invalid', () => {
    validateRegister(reqEmailInvalid, res, null);
    expect(res.message).toEqual('Email is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if first name is invalid', () => {
    validateRegister(reqFirstnameInvalid, res, null);
    expect(res.message).toEqual('Firstname is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if last name is invalid', () => {
    validateRegister(reqLastnameInvalid, res, null);
    expect(res.message).toEqual('Lastname is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if password is invalid', () => {
    validateRegister(reqPasswordInvalid, res, null);
    expect(res.message).toEqual('Password is not valid');
    expect(res.statusCode).toEqual(400);
  });

  test('An error is thrown if username is invalid', () => {
    validateRegister(reqUsernameInvalid, res, null);
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

describe('tests for validateChangeStatusOfApplication', () => {
  const reqValid = {
    body: {
      status: 'accepted',
      version: 1,
    },
  };
  const reqStatusMissing = {
    body: {
      version: 1,
    },
  };
  const reqStatusInvalid = {
    body: {
      status: 'notastatus',
      version: 1,
    },
  };
  const reqVersionMissing = {
    body: {
      status: 'accepted',
    },
  };
  const reqVersionInvalid = {
    body: {
      status: 'accepted',
      version: 0,
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
    validateChangeStatusOfApplication(reqValid, res, next);
    expect(next).toHaveBeenCalled();
  });
  test('An error is thrown if no status is not included', () => {
    validateChangeStatusOfApplication(reqStatusMissing, res, next);
    expect(res.message).toEqual('Status is not valid');
    expect(res.statusCode).toEqual(400);
  });
  test('An error is thrown if no status is not valid', () => {
    validateChangeStatusOfApplication(reqStatusInvalid, res, next);
    expect(res.message).toEqual('Status is not valid');
    expect(res.statusCode).toEqual(400);
  });
  test('An error is thrown if no version is not included', () => {
    validateChangeStatusOfApplication(reqVersionMissing, res, next);
    expect(res.message).toEqual('Version is not valid');
    expect(res.statusCode).toEqual(400);
  });
  test('An error is thrown if no version is not valid', () => {
    validateChangeStatusOfApplication(reqVersionInvalid, res, next);
    expect(res.message).toEqual('Version is not valid');
    expect(res.statusCode).toEqual(400);
  });
});
