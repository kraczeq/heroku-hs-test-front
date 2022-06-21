import { hourRegex } from "./Constants";

export const workIntervalStartValidation = (values, errors) => {
  if (!values.workStart) {
    errors.workStart = "This field is required.";
  } 
  if (values.workStart <= 0) {
    errors.workStart = "Invalid hour";
  }
  if (hourRegex.test(values.workStart)) {
    errors.workStart = "Invalid hour format.";
  } 
  if (values.workStart < 6 && values.workStart > 0) {
    errors.workStart = "Work start can't be earlier than 6.";
  } 
  if (values.workStart > 14) {
    errors.workStart = "Work start can't be later than 14.";
  }
};

export const getworkIntervalEndErrors = (workIntervalEndValue) => {
  let workIntervalEndErrors = []
  if (!workIntervalEndValue) {
    workIntervalEndErrors.push("Invalid hour.");
  }
  if (workIntervalEndValue <= 0) {
    workIntervalEndErrors.push("Invalid hour.");
  }
  if (hourRegex.test(workIntervalEndValue)) {
    workIntervalEndErrors.push("Invalid hour format.");
  }
  if (workIntervalEndValue < 6 && workIntervalEndValue > 0) {
    workIntervalEndErrors.push("Work start can't be earlier than 14.");
  }
  if (workIntervalEndValue > 14 ) {
    workIntervalEndErrors.push("Work start can't be later than 22.");
  }
  return workIntervalEndErrors;
};

export const workIntervalEndValidation = (values, errors) => {
  if (!values.workEnd) {
    errors.workEnd = "This field is required.";
  } 
  if (values.workEnd <= 0) {
    errors.workEnd = "Invalid hour";
  } 
  if (hourRegex.test(values.workIntervalEndValidation)) {
    errors.workEnd = "Invalid hour format.";
  }
  if (values.workEnd < 14 && values.workStart > 0) {
    errors.workEnd = "Work end can't be earlier than 14.";
  } 
  if (values.workEnd > 22) {
    errors.workEnd = "Work end can't be later than 22";
  }
};

export const getWorkIntervalEndErrors = (workIntervalEndValue) => {
  let workIntervalEndErrors = []
  if (!workIntervalEndValue) {
    workIntervalEndErrors.push("Invalid hour");
  }
  if (workIntervalEndValue <= 0) {
    workIntervalEndErrors.push("Invalid hour");
  }
  if (hourRegex.test(workIntervalEndValue)) {
    workIntervalEndErrors.push("Invalid hour format");
  }
  if (workIntervalEndValue < 14 && workIntervalEndValue > 0) {
    workIntervalEndErrors.push("Work end can't be earlier than 14");
  }
  if (workIntervalEndValue > 22 ) {
    workIntervalEndErrors.push("Work end can't be later than 22");
  }
  return workIntervalEndErrors;
};
