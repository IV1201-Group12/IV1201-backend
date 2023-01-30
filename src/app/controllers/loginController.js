const userDAO = require('../integration/userDAO');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const existingUser = userDAO.getExistingUser(username);
    if (!existingUser) {
      //todo
      res.status(401).send("error - doesn't exist");
    }
    const validPass = await comparePassword(password, existingUser.password);
    if (!validPass) {
      //todo
      return res.status(401).send('error - wrong pass');
    }
    const token = generateToken(existingUser);
    return res
      .cookie('ACCESSTOKEN', token, {
        httpOnly: true,
        //Secure? om production
      })
      .status(200)
      .json('logged in');
    // res.send({ token });
  },
};
