const validator = require("validator");
const isEmpty = require("./is-empty"); // require our specialized isEmpty function

// validate registration input data
const validateLoginInput = data => {
  let errors = {};

  // if fields exist, use them, otherwise convert to empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
