const applicationController = require('../../src/app/controllers/applicationController');
const dbConfig = require('../../src/app/config/db-config');

const pg_promise = require('pg-promise')();

beforeAll(async () => {
  database = await connectToDatabase();
});
afterAll(async () => {
  return database.$pool.end();
});
beforeEach(async () => {
  const status = "'accepted'";
  await database.none(
    "insert into users values (9999, 'test', 'test', 'testtt@gmail.com', '098765432112', 'testusername', 'testpassword', 'applicant')",
  );
  await database.none(
    'insert into applications (status, "applicantId") values (' +
      status +
      ', 9999)',
  );
});

afterEach(async () => {
  await database.none('DELETE FROM applications WHERE "applicantId"=9999');
  await database.none("DELETE from users WHERE id='9999'");
});

let database;

const connectToDatabase = async () => {
  return pg_promise({
    host: dbConfig.HOST,
    database: dbConfig.NAME,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
  });
};

describe('tests for getAllApplications', () => {
  test('Applications are retrieved successfully', async () => {
    const req = {};
    const res = {
      result: null,
      statusCode: null,
      message: null,
      json: (result) => {
        res.result = result;
      },

      status: (value) => {
        res.statusCode = value;
        return {
          send: (message) => {
            res.message = message;
          },
        };
      },
    };
    await applicationController.getAllApplications(req, res);
    expect(res.result.length).toBeGreaterThanOrEqual(1);
    expect(res.statusCode).not.toBe(500);
  });
});
