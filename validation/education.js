const validator = require("validator");
const isEmpty = require("./is-empty"); // require our specialized isEmpty function

// validate education input data
const validateEducationInput = data => {
  let errors = {};

  // if fields exist, use them, otherwise convert to empty string
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  if (validator.isEmpty(data.school)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.school = "School field is required";
  }

  if (validator.isEmpty(data.degree)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.degree = "Degree field is required";
  }

  if (validator.isEmpty(data.from)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.from = "From date field is required";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    // validator.isEmpty only works on strings (that's why we convert to empty strings if field does not exist)
    errors.fieldofstudy = "Field of study is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEducationInput;
