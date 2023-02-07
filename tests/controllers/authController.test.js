const createAccountController = require('../../src/app/controllers/authController');

const pg_promise = require('pg-promise')();

beforeAll(async () => {
  database = await connectToDatabase();
});

afterEach(async () => {
  await database.none("DELETE FROM users WHERE firstname='test'");
});

let database;

const connectToDatabase = async () => {
  return pg_promise({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });
};

describe('tests for createApplicant', () => {
  const reqCorrect = {
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
  test('A new account is created successfully', async () => {
    await createAccountController.createApplicant(reqCorrect, res, null);
    expect(res.statusCode).toEqual(201);
  });

  test('An error is thrown if person number is invalid', async () => {
    await createAccountController.createApplicant(
      reqPnrNumberInvalid,
      res,
      null,
    );
    expect(res.message).toEqual('Person number is not valid');
  });

  test('An error is thrown if email is invalid', async () => {
    await createAccountController.createApplicant(reqEmailInvalid, res, null);
    expect(res.message).toEqual('Email is not valid');
  });
});
