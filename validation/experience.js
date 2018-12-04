const validator = require("validator");
const isEmpty = require("./is-empty"); // require our specialized isEmpty function

// validate experience input data
const validateExperienceInput = data => {
  let errors = {};

  // if fields exist, use them, otherwise convert to empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.title = "Job Title field is required";
  }

  if (validator.isEmpty(data.company)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.company = "Company field is required";
  }

  if (validator.isEmpty(data.from)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
