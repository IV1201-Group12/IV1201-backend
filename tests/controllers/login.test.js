const request = require('supertest');
const authRoute = require('../../src/app/routes/authRoute');
let userRepository = require('../../src/app/repositories/userRepository');
let { comparePassword, generateToken } = require('../../src/app/utils/jwt');

describe('login', () => {
  const mockUser = {
    id: 1,
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    pnr: '123456789012',
    username: 'testuser',
    password: 'password123',
    role: 'applicant',
  };

  beforeEach(() => {
    userRepository.getExistingUser = jest.fn().mockResolvedValue(mockUser);
    comparePassword = jest.fn().mockResolvedValue(true);
    generateToken = jest.fn().mockReturnValue('mockToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  //
  it('should return a 401 status code if user does not exist', async () => {
    // userRepository.getExistingUser = jest.fn().mockResolvedValue(null);
    // const res = await request(authRoute)
    //   .post('/login')
    //   .send({ username: 'nonexistinguser', password: 'password123' });
    // expect(res.statusCode).toBe(401);
    // expect(res.text).toBe('No user with those credentials');
    // expect(userRepository.getExistingUser).toHaveBeenCalledWith(
    //   'nonexistinguser',
    // );
    // expect(comparePassword).not.toHaveBeenCalled();
    // expect(generateToken).not.toHaveBeenCalled();
  });

  // it('should return a 401 status code if password is incorrect', async () => {
  //   comparePassword = jest.fn().mockResolvedValue(false);

  //   const res = await request(authRoute)
  //     .post('/login')
  //     .send({ username: 'testuser', password: 'wrongpassword' });

  //   expect(res.statusCode).toBe(401);
  //   expect(res.text).toBe('No user with those credentials');
  //   expect(userRepository.getExistingUser).toHaveBeenCalledWith('testuser');
  //   expect(comparePassword).toHaveBeenCalledWith(
  //     'wrongpassword',
  //     'password123',
  //   );
  //   expect(generateToken).not.toHaveBeenCalled();
  // });

  // it('should set a cookie and return user info if login is successful', async () => {
  //   const res = await request(authRoute)
  //     .post('/login')
  //     .send({ username: 'testuser', password: 'password123' });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({ username: 'testuser', role: 'user' });
  //   expect(res.headers['set-cookie']).toContain('ACCESSTOKEN=mockToken');
  //   expect(userRepository.getExistingUser).toHaveBeenCalledWith('testuser');
  //   expect(comparePassword).toHaveBeenCalledWith('password123', 'password123');
  //   expect(generateToken).toHaveBeenCalledWith(mockUser);
  // });
});
