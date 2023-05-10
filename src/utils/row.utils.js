function rowToRental(row) {
  row.customer = {
    id: row.customerId,
    name: row.customerName,
  };
  row.game = {
    id: row.gameId,
    name: row.gameName,
  };
  delete row.customerName;
  delete row.gameName;
  return row;
}

export { rowToRental };
