import connection from "./postgres.connection.js";

async function listGames() {
  const result = await connection.query("SELECT * FROM games;");
  return result.rows;
}

async function createGame({ name, image, stockTotal, pricePerDay }) {
  await connection.query(
    `INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4);`,
    [name, image, stockTotal, pricePerDay]
  );
}

async function searchGameByName({ name }) {
  const result = await connection.query("SELECT * FROM games WHERE name=$1;", [
    name,
  ]);
  return result.rows;
}

function listCustomers() {}

function searchCustomerById(id) {}

function createCustomer(customer) {}

function updateCustomer(id) {}

function listRentals() {}

function createRental(rental) {}

function finishRental() {}

function deleteRental(id) {}

const db = {
  createCustomer,
  createGame,
  createRental,
  deleteRental,
  finishRental,
  listCustomers,
  updateCustomer,
  searchCustomerById,
  listRentals,
  listGames,
  searchGameByName,
};

export default db;
