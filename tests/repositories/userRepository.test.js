const userRepository = require('../../src/app/repositories/userRepository');
const dbConfig = require('../../src/app/config/db-config');

const pg_promise = require('pg-promise')();

let database;

beforeAll(async () => {
  database = await connectToDatabase();
  await require('../../src/app/integration/database').init();
  await database.none(
    "insert into users values (9005, 'testuserrepo', 'testuserrepo', 'testuserrepo@gmail.com', '111111111122', 'testuserrepo', 'testuserrepo', 'applicant')",
  );
});
afterAll(async () => {
  await database.none("DELETE FROM users WHERE id='9005'");
  await database.none("DELETE FROM users WHERE firstname='testregister'");
  return database.$pool.end();
});

const connectToDatabase = async () => {
  return pg_promise({
    host: dbConfig.HOST,
    database: dbConfig.NAME,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
  });
};

const applicantCorrect = {
  firstname: 'testregister',
  lastname: 'testregister',
  email: 'testregister@gmail.com',
  pnr: '111111111123',
  username: 'testregister',
  password: 'testregister',
  role: 'applicant',
};

describe('tests for register', () => {
  const applicantPnrNumberWrongLength = {
    firstname: 'test',
    lastname: 'test',
    email: 'test@gmail.com',
    pnr: '123456',
    username: 'test11',
    password: '12345test',
    role: 'applicant',
  };
  const applicantPnrNumberNotNumeric = {
    firstname: 'test',
    lastname: 'test',
    email: 'test@gmail.com',
    pnr: 'abcabcabcabc',
    username: 'test1254',
    password: '12345test',
    role: 'applicant',
  };

  const applicantEmailInvalid = {
    firstname: 'test',
    lastname: 'test',
    email: 'testgmaicom',
    pnr: '111111111124',
    username: 'test',
    password: '12345test',
    role: 'applicant',
  };
  test('One new account is created successfully', async () => {
    await userRepository.createUser(applicantCorrect);
    expect(async () => {
      await database.one("SELECT * FROM users WHERE firstname='testregister'");
    }).not.toThrow();
  });

  test('An error is thrown if person number is not numeric', async () => {
    try {
      await userRepository.createUser(applicantPnrNumberNotNumeric);
      fail('An error was not thrown.');
    } catch (err) {
      expect(err.message).toEqual('Validation error: Pnr is not valid');
    }
  });
  test('An error is thrown if person number is of the wrong length', async () => {
    try {
      await userRepository.createUser(applicantPnrNumberWrongLength);
      fail('An error was not thrown.');
    } catch (err) {
      expect(err.message).toEqual('Validation error: Pnr is not valid');
    }
  });
  test('An error is thrown if email is invalid', async () => {
    try {
      await userRepository.createUser(applicantEmailInvalid);
      fail('An error was not thrown.');
    } catch (err) {
      expect(err.message).toEqual('Validation error: Email is not valid');
    }
  });
});
describe('tests for getExistingUser', () => {
  it('should return null if user does not exist', async () => {
    const existingUser = await userRepository.getExistingUser('nonexistent');
    expect(existingUser).toBeNull();
  });

  it('should return the user if it exists', async () => {
    const existingUser = await userRepository.getExistingUser('testuserrepo');
    expect(existingUser.firstname).toEqual('testuserrepo');
    expect(existingUser.lastname).toEqual('testuserrepo');
    expect(existingUser.email).toEqual('testuserrepo@gmail.com');
    expect(existingUser.pnr).toEqual('111111111122');
    expect(existingUser.password).toEqual('testuserrepo');
    expect(existingUser.username).toEqual('testuserrepo');
    expect(existingUser.role).toEqual('applicant');
  });
});
describe('tests for findUserById', () => {
  it('should return null if a user with the given id does not exist', async () => {
    const user = await userRepository.findUserById(99999);
    expect(user).toBeNull();
  });

  it('should return the user if a user with the given id exists', async () => {
    const existingUser = await userRepository.findUserById(9005);
    expect(existingUser.firstname).toBe('testuserrepo');
    expect(existingUser.lastname).toBe('testuserrepo');
    expect(existingUser.email).toBe('testuserrepo@gmail.com');
    expect(existingUser.pnr).toBe('111111111122');
    expect(existingUser.username).toBe('testuserrepo');
    expect(existingUser.role).toBe('applicant');
  });
});
