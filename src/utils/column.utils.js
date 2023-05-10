function checkGameColumn(columnName) {
  return ["id", "name", "image", "stockTotal", "pricePerDay"].includes(
    columnName
  );
}

function checkCustomerColumn(columnName) {
  return ["id", "name", "phone", "cpf", "birthday"].includes(columnName);
}

function checkRentalColumn(columnName) {
  return [
    "id",
    "customerId",
    "gameId",
    "rentDate",
    "daysRented",
    "returnDate",
    "originalPrice",
    "delayFee",
  ].includes(columnName);
}

export { checkGameColumn, checkCustomerColumn, checkRentalColumn };
