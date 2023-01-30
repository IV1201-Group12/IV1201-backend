const createAccountController = require('../../src/app/controllers/createAccountController');

const pg_promise = require('pg-promise')();

beforeAll(async () => {
  database = await connectToDatabase();
});

afterEach(async () => {
  await database.none("DELETE FROM person WHERE name='test'");
});

let database;

const connectToDatabase = async () => {
  return pg_promise({
    host: 'localhost',
    database: 'recruitment_application',
    user: 'postgres',
    password: 'postgres',
  });
};

describe('tests for createApplicant', () => {
  const reqCorrect = {
    body: {
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      pnr: 123456789018,
      username: 'test',
      password: '12345test',
      role_id: 2,
    },
  };

  const reqPnrNumberInvalid = {
    body: {
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      pnr: 12345,
      username: 'test',
      password: '12345test',
      role_id: 2,
    },
  };

  const res = {
    statusCode: null,
    status: (value) => {
      res.statusCode = value;
      return { send: () => {} };
    },
  };
  test('A new account is created sucessfully', async () => {
    await createAccountController.createApplicant(reqCorrect, res, null);
    expect(res.statusCode).toEqual(201);
  });

  test('An error is thrown if person number is invalid', async () => {
    try {
      await createAccountController.createApplicant(
        reqPnrNumberInvalid,
        res,
        null,
      );
      fail('An error was not thrown.');
    } catch (err) {
      expect(err.message).toEqual('Person number is not valid');
    }
  });
});
