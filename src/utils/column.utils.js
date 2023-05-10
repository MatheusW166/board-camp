function checkGameColumn(columnName) {
  return ["id", "name", "image", "stockTotal", "pricePerDay"].includes(
    columnName
  );
}

export { checkGameColumn };
