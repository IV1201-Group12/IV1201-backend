const applicationController = require('../../src/app/controllers/applicationController');
const applicationRepository = require('../../src/app/repositories/applicationRepository');

const dbConfig = require('../../src/app/config/db-config');
const pg_promise = require('pg-promise')();

beforeAll(async () => {
  database = await connectToDatabase();
  await require('../../src/app/integration/database').init();
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

describe('tests for getApplication', () => {
  it('should return application with the given id', async () => {
    const mockApplication = {
      id: 1,
      status: 'unhandled',
      version: 1,
      applicantId: 1,
    };
    const mockReq = { params: { id: 1 } };
    const mockRes = { json: jest.fn() };

    jest
      .spyOn(applicationRepository, 'findApplicationById')
      .mockResolvedValue(mockApplication);

    await applicationController.getApplication(mockReq, mockRes);

    expect(applicationRepository.findApplicationById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith(mockApplication);
  });

  it('should return 500 error if applicationRepository.findApplicationById throws an error', async () => {
    const mockReq = { params: { id: 1 } };
    const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mockError = new Error('Database error');

    jest
      .spyOn(applicationRepository, 'findApplicationById')
      .mockRejectedValue(mockError);

    await applicationController.getApplication(mockReq, mockRes);

    expect(applicationRepository.findApplicationById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});

describe('tests for changeStatusOfApplication', () => {
  it('should update the status of the application', async () => {
    const mockReq = {
      body: {
        id: 1,
        status: 'accepted',
        version: 2,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    jest.spyOn(applicationRepository, 'updateStatus').mockResolvedValue();

    await applicationController.changeStatusOfApplication(mockReq, mockRes);

    expect(applicationRepository.updateStatus).toHaveBeenCalledWith(
      'accepted',
      2,
      1,
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalled();
  });

  it('should return 409 if version mismatch error is thrown', async () => {
    const mockReq = {
      body: {
        id: 1,
        status: 'accepted',
        version: 2,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockError = 'version mismatch';

    jest
      .spyOn(applicationRepository, 'updateStatus')
      .mockRejectedValue(mockError);

    await applicationController.changeStatusOfApplication(mockReq, mockRes);

    expect(applicationRepository.updateStatus).toHaveBeenCalledWith(
      'accepted',
      2,
      1,
    );
    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.send).toHaveBeenCalledWith('version mismatch');
  });

  it('should return 500 if an error other than version mismatch is thrown', async () => {
    const mockReq = {
      body: {
        id: 1,
        status: 'accepted',
        version: 2,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockError = new Error('Database error');

    jest
      .spyOn(applicationRepository, 'updateStatus')
      .mockRejectedValue(mockError);

    await applicationController.changeStatusOfApplication(mockReq, mockRes);

    expect(applicationRepository.updateStatus).toHaveBeenCalledWith(
      'accepted',
      2,
      1,
    );
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});
