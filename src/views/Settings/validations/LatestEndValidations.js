import { hourRegex } from "./Constants";

export const latestEndValidation = (values, errors) => {
  if (!values.latestEnd) {
    errors.latestEnd = "Field can't be empty.";
  }
  if (values.latestEnd <= 0) {
    errors.latestEnd = "Invalid hour.";
  }
  if (hourRegex.test(values.latestEnd)) {
    errors.latestEnd = "Invalid hour format.";
  }
  if (values.latestEnd < 14 && values.latestEnd > 0) {
    errors.latestEnd = "Latest end can't be earlier than 14.";
  }
  if (values.latestEnd > 22) {
    errors.latestEnd = "Latest end can't be later than 22.";
  }
};

export const getLatestEndErrors = (latestEndValue) => {
  let latestEndErrors = []
  if (!latestEndValue) {
    latestEndErrors.push("Invalid hour");
  }
  if (latestEndValue <= 0) {
    latestEndErrors.push("Invalid hour");
  }
  if (hourRegex.test(latestEndValue)) {
    latestEndErrors.push("Invalid hour format");
  }
  if (latestEndValue < 14 && latestEndValue > 0) {
    latestEndErrors.push("Latest end can't be earlier than 14");
  }
  if (latestEndValue > 22 ) {
    latestEndErrors.push("Latest end can't be later than 22");
  }
  return latestEndErrors;
};