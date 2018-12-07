// specialized isEmpty function (could have used a lodash function but whatever)
const isEmpty = value =>
  value === undefined || // undefined
  value === null || // null
  (typeof value === "object" && Object.keys(value).length === 0) || // empty object
  (typeof value === "string" && value.trim().length === 0); // empty string

export default isEmpty;
