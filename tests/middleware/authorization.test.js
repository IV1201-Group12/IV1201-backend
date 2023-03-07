const { generateToken } = require('../../src/app/utils/jwt');
const { authorizeRequest } = require('../../src/app/middleware/authorization');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (token) => ({
  cookies: { ACCESSTOKEN: token },
});

const mockRecruiter = { id: 1, username: 'recruitername', role: 'recruiter' };
const mockApplicant = { id: 2, username: 'applicantname', role: 'applicant' };
const mockValidApplicantToken = generateToken(mockApplicant);
const mockValidRecruiterToken = generateToken(mockRecruiter);
const mockInvalidRecruiterToken = mockValidRecruiterToken.slice(1);

describe('tests for authorizeRequest', () => {
  test('it should respond with a 401 with the correct message if there is no token in the request', () => {
    const mockReqNoToken = mockRequest();
    const mockRes = mockResponse();
    const next = jest.fn();

    const func = authorizeRequest(['recruiter']);
    func(mockReqNoToken, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith('No token');
  });
  test('it should respond with a 401 with the correct message if the token in the request is not valid', () => {
    const mockReqInvalidToken = mockRequest(mockInvalidRecruiterToken);
    const mockRes = mockResponse();
    const next = jest.fn();

    const func = authorizeRequest(['recruiter']);
    func(mockReqInvalidToken, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith('Invalid token.');
  });
  test('it should respond with a 403 with the correct message if the role of the token in the request does not authorize access', () => {
    const mockReqValidTokenWrongRole = mockRequest(mockValidApplicantToken);
    const mockRes = mockResponse();
    const next = jest.fn();

    const func = authorizeRequest(['recruiter']);
    func(mockReqValidTokenWrongRole, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.send).toHaveBeenCalledWith('Wrong role');
  });
  test('next should be called if the token in the request is valid for the requested role', () => {
    const mockReqValidTokenCorrectRole = mockRequest(mockValidRecruiterToken);
    const mockRes = mockResponse();
    const next = jest.fn();

    const func = authorizeRequest(['recruiter']);
    func(mockReqValidTokenCorrectRole, mockRes, next);
    expect(next).toHaveBeenCalled();
  });
});
