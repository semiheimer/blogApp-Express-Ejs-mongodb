"use strict";
const { UnauthenticatedError } = require("../../errors/customErrors");
const { verifyRefreshJWT } = require("../../helpers/tokenHelper");
const registerCreateUser = require("../../middlewares/registerOrCreateUser");
const UserModel = require("../../models/User.model");

module.exports.AuthApiController = {
  register: registerCreateUser,
  login: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */
    const { username, email, password } = req.body;

    if (!((email || username) && password))
      throw new UnauthenticatedError(
        "Please enter an username/email and password",
      );
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
      password,
    });

    if (!user)
      throw new UnauthenticatedError("Wrong username/email or password");
    if (!user?.isActive)
      throw new UnauthenticatedError("This account is not active");
    res.send({
      error: false,
      token: user.generateAuthToken("withRefresh"),
    });
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */
    const auth = req.headers?.authorization || null;
    const refreshToken = auth ? auth.split(" ")[1] : null;
    if (!refreshToken)
      throw new UnauthenticatedError("Resresh token is necessary");
    try {
      const { _id, password } = verifyRefreshJWT(refreshToken);
      const user = await User.findOne({ _id }).select("+password");
      if (user?.password !== password)
        throw new UnauthenticatedError("Authentication is invalid");
      if (!user?.isActive)
        throw new UnauthenticatedError("This account is not active");
      res.send({
        error: false,
        token: user.generateAuthToken("withRefresh"),
      });
    } catch (error) {
      throw new UnauthenticatedError("Authentication invalid");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

    res.send({
      error: false,
      message:
        "No need any doing for logout. You must delete Token from your browser.",
    });
  },
};
