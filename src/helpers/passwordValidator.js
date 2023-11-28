"use strict";
module.exports = function passwordValidator(password) {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const isValid = passwordRegex.test(password);
  return isValid;
};
