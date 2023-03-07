const dbConfig = require('../../src/app/config/db-config');
const userController = require('../../src/app/controllers/userController');
const userRepository = require('../../src/app/repositories/userRepository');
const pg_promise = require('pg-promise')();

describe('tests for getUser', () => {
  it('should return the user with the given id', async () => {
    const mockUser = {
      id: 1,
      firstname: 'test',
      lastname: 'test',
      email: 'testt@gmail.com',
      pnr: '111111111114',
      username: 'testusername',
      role: 'applicant',
    };
    const mockReq = { params: { id: 1 } };
    const mockRes = { json: jest.fn() };

    jest.spyOn(userRepository, 'findUserById').mockResolvedValue(mockUser);

    await userController.getUser(mockReq, mockRes);

    expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 500 error if userRepository.findUserById throws an error', async () => {
    const mockReq = { params: { id: 1 } };
    const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mockError = new Error('Database error');

    jest.spyOn(userRepository, 'findUserById').mockRejectedValue(mockError);

    await userController.getUser(mockReq, mockRes);

    expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});
