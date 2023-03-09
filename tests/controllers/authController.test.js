const authController = require('../../src/app/controllers/authController');
const dbConfig = require('../../src/app/config/db-config');
const request = require('supertest');
const app = require('../../src/app/index.js');
const { generateHash } = require('../../src/app/utils/bcrypt');

const pg_promise = require('pg-promise')();
let database;

beforeAll(async () => {
  database = await connectToDatabase();
  await require('../../src/app/integration/database').init();
});

beforeEach(async () => {
  const pass = await generateHash('password123');
  await database.none(
    `insert into users values (9002, 'testauthcont', 'testauthcont', 'testauthcont@gmail.com', '111111111112', 'testauthcont', '${pass}', 'applicant')`,
  );
});
afterAll(async () => {
  return database.$pool.end();
});
afterEach(async () => {
  await database.none("DELETE FROM users where id='9002'");
  await database.none(
    "DELETE FROM users where firstname='testregisterauthcont'",
  );
});

const connectToDatabase = async () => {
  return pg_promise({
    host: dbConfig.HOST,
    database: dbConfig.NAME,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
  });
};

describe('tests for register', () => {
  const reqCorrect = {
    body: {
      firstname: 'testregisterauthcont',
      lastname: 'testregisterauthcont',
      email: 'testregisterauthcont@gmail.com',
      pnr: '111111111113',
      username: 'testregisterauthcont',
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
    await authController.register(reqCorrect, res, null);
    expect(res.statusCode).toEqual(201);
  });
});

describe('tests for login', () => {
  it('should return a 401 status code if user does not exist', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'nonexistinguser', password: 'password123' });
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('No user with those credentials');
  });
  it('should return a 401 status code if password is incorrect', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testauthcont', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('No user with those credentials');
  });
  it('should set a cookie and return user info if login is successful', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testauthcont', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ username: 'testauthcont', role: 'applicant' });
    expect(
      res.headers['set-cookie'].find((item) => item.includes('ACCESSTOKEN')) !=
        undefined,
    ).toBe(true);
  });
});
