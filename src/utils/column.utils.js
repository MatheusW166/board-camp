function checkGameColumn(columnName) {
  return ["id", "name", "image", "stockTotal", "pricePerDay"].includes(
    columnName
  );
}

function checkCustomerColumn(columnName) {
  return ["id", "name", "phone", "cpf", "birthday"].includes(columnName);
}

export { checkGameColumn, checkCustomerColumn };
