function validateDate(inputDate) {
  const dateObject = new Date(inputDate);
  return dateObject.toString() !== "Invalid Date";
}

export { validateDate };
