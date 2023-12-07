module.exports.mapUserToSession = (user) => {
  const { _id, email, firstname, lastname, isAdmin, fullname, username } = user;
  return { id: _id, email, firstname, lastname, isAdmin, fullname, username };
};
