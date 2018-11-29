const validator = require("validator");
const isEmpty = require("./is-empty"); // require our specialized isEmpty function

// validate registration input data
const validateRegisterInput = data => {
  let errors = {};

  // if fields exist, use them, otherwise convert to empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.password = "Password field is required";
  }

  if (validator.isEmpty(data.password2)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
