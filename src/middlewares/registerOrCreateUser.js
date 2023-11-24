const passwordValidator = require("../helpers/passwordValidator");

module.exports = async (req, res, next) => {
  /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
  req.body.isAdmin = false;
  if (!passwordValidator(req.body?.password))
    throw new BadRequestError(
      "1 numeric 1 alphanumeric 1 special char and at least 8 char are necessary",
    );
  const data = await User.create(req.body);
  res.status(201).send({
    error: false,
    data,
  });
};
