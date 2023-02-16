const applicationRepository = require('../../src/app/repositories/applicationRepository');
const dbConfig = require('../../src/app/config/db-config');

const pg_promise = require('pg-promise')();

let database;

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
  await database.none("DELETE FROM applications WHERE 'applicantId'='9999'");
  await database.none("DELETE from users WHERE id='9999'");
});

const connectToDatabase = async () => {
  return pg_promise({
    host: dbConfig.HOST,
    database: dbConfig.NAME,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
  });
};

describe('tests for findAllApplications', () => {
  test('Applications are found successfully', async () => {
    const applications = await applicationRepository.findAllApplications();
    expect(applications.length).toBeGreaterThanOrEqual(1);
  });
});
