const validator = require("validator");
const isEmpty = require("./is-empty"); // require our specialized isEmpty function

// validate registration input data
const validateProfileInput = data => {
  let errors = {};

  // if fields exist, use them, otherwise convert to empty string
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Website is not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Youtube is not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Twitter is not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Facebook is not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Linkedin is not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Instagram is not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
