const userRepository = require('../../src/app/repositories/userRepository');
const dbConfig = require('../../src/app/config/db-config');

const pg_promise = require('pg-promise')();

let database;

beforeAll(async () => {
  database = await connectToDatabase();
});
afterAll(async () => {
  return database.$pool.end();
});
afterEach(async () => {
  await database.none("DELETE FROM users WHERE firstname='test'");
});

const connectToDatabase = async () => {
  return pg_promise({
    host: dbConfig.HOST,
    database: dbConfig.NAME,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
  });
};

describe('tests for createApplicant', () => {
  const applicantCorrect = {
    firstname: 'test',
    lastname: 'test',
    email: 'test@gmail.com',
    pnr: '123456789012',
    username: 'test',
    password: '12345test',
    role: 'applicant',
  };

  const applicantPnrNumberInvalid = {
    firstname: 'test',
    lastname: 'test',
    email: 'test@gmail.com',
    pnr: '123456',
    username: 'test11',
    password: '12345test',
    role: 'applicant',
  };

  const applicantEmailInvalid = {
    firstname: 'test',
    lastname: 'test',
    email: 'testgmaicom',
    pnr: '123456789012',
    username: 'test',
    password: '12345test',
    role: 'applicant',
  };
  test('One new account is created successfully', async () => {
    await userRepository.createApplicant(applicantCorrect);
    expect(async () => {
      await database.one("SELECT * FROM users WHERE firstname='test'");
    }).not.toThrow();
  });

  test('An error is thrown if person number is invalid', async () => {
    try {
      await userRepository.createApplicant(applicantPnrNumberInvalid);
      fail('An error was not thrown.');
    } catch (err) {
      expect(err.message).toEqual(
        'Validation error: Person number is not valid.',
      );
    }
  });

  test('An error is thrown if email is invalid', async () => {
    try {
      await userRepository.createApplicant(applicantEmailInvalid);
      fail('An error was not thrown.');
    } catch (err) {
      expect(err.message).toEqual(
        'Validation error: Validation isEmail on email failed',
      );
    }
  });
});
