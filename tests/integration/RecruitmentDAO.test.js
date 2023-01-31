const RecruitmentDAO = require('../../src/app/integration/RecruitmentDAO');

const pg_promise = require('pg-promise')();

beforeAll(async () => {
  database = await connectToDatabase();
});

afterEach(async () => {
  await database.none("DELETE FROM person WHERE name='test'");
});

let database;

const applicant = {
  name: 'test',
  surname: 'test',
  email: 'test@gmail.com',
  pnr: 123456789,
  username: 'test',
  password: '12345test',
  role_id: 2,
};

const connectToDatabase = async () => {
  return pg_promise({
    host: 'localhost',
    database: 'recruitment_application',
    user: 'postgres',
    password: 'postgres',
  });
};

test('One new account is created', async () => {
  await RecruitmentDAO.createApplicant(applicant);
  expect(async () => {
    await database.one("SELECT * FROM person WHERE name='test'");
  }).not.toThrow();
});
