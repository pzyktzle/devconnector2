const validator = require("validator");
const isEmpty = require("./is-empty"); // require our specialized isEmpty function

// validate registration input data
const validatePostInput = data => {
  let errors = {};

  // if fields exist, use them, otherwise convert to empty string
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;
