import { hourRegex } from "./Constants";

export const earliestStartValidation = (values, errors) => {
  if (!values.earliestStart) {
    errors.earliestStart = "Field can't be empty.";
  }
  if (values.earliestStart < 0) {
    errors.earliestStart = "Invalid hour.";
  }
  if (hourRegex.test(values.earliestStart)) {
    errors.earliestStart = "Invalid hour format.";
  }
  if (values.earliestStart < 6 && values.earliestStart > 0) {
    errors.earliestStart = "Earliest start can't be earlier than 6.";
  }
  if (values.earliestStart > 14) {
    errors.earliestStart = "Earliest start can't be later than 14";
  }
};

export const getEarliestStartErrors = (earliestStartValue) => {
  let earliestStartErrors = []
  if (!earliestStartValue) {
    earliestStartErrors.push("Invalid hour.");
  }
  if (earliestStartValue <= 0) {
    earliestStartErrors.push("Invalid hour.");
  }
  if (hourRegex.test(earliestStartValue)) {
    earliestStartErrors.push("Invalid hour format.");
  }
  if (earliestStartValue < 6 && earliestStartValue > 0) {
    earliestStartErrors.push("Latest end can't be earlier than 14.");
  }
  if (earliestStartValue > 14 ) {
    earliestStartErrors.push("Latest end can't be later than 22.");
  }
  return earliestStartErrors;
};