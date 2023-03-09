const applicationRepository = require('../../src/app/repositories/applicationRepository');
const dbConfig = require('../../src/app/config/db-config');

const pg_promise = require('pg-promise')();

let database;

beforeAll(async () => {
  database = await connectToDatabase();
  await require('../../src/app/integration/database').init();
  const status = "'accepted'";
  await database.none(
    "insert into users values (9999, 'test', 'test', 'testtt@gmail.com', '098765432112', 'testusername', 'testpassword', 'applicant')",
  );
  await database.none(
    'insert into applications (id, status, "applicantId") values (9998,' +
      status +
      ', 9999)',
  );
});

afterAll(async () => {
  await database.none('DELETE FROM applications WHERE id=9998');
  await database.none("DELETE from users WHERE id='9999'");
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

describe('tests for findAllApplications', () => {
  test('Applications are found successfully', async () => {
    const applications = await applicationRepository.findAllApplications();
    expect(applications.length).toBeGreaterThanOrEqual(1);
  });
});

describe('tests for findApplicationById', () => {
  it('should return the application with the given id', async () => {
    const application = await applicationRepository.findApplicationById(9998);
    expect(application.status).toBe('accepted');
    expect(application.applicant.email).toBe('testtt@gmail.com');
  });
  it('should return null if an application with the given id does not exist', async () => {
    const application = await applicationRepository.findApplicationById(99999);
    expect(application).toBe(null);
  });
});

describe('tests for updateStatus', () => {
  it('should update the status of the application correctly', async () => {
    await applicationRepository.updateStatus('rejected', 1, 9998);
    const application = await database.one(
      'SELECT version, status FROM applications WHERE id=9998',
    );
    expect(application.version).toBe(2);
    expect(application.status).toBe('rejected');
  });

  it('should throw an error if the version does not match the current version', async () => {
    try {
      await applicationRepository.updateStatus('rejected', 3, 9998);
      fail('An error was not thrown.');
    } catch (error) {
      expect(error).toBe('version mismatch');
    }
  });
});
