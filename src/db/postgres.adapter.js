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
  return result.rows[0];
}

async function listCustomers() {
  const result = await connection.query("SELECT * FROM customers;");
  return result.rows;
}

async function searchCustomerById({ id }) {
  const result = await connection.query(
    "SELECT * FROM customers WHERE id=$1;",
    [id]
  );
  return result.rows[0];
}

async function searchCustomerByCpf({ cpf }) {
  const result = await connection.query(
    "SELECT * FROM customers WHERE cpf=$1;",
    [cpf]
  );
  return result.rows[0];
}

async function createCustomer({ name, phone, cpf, birthday }) {
  await connection.query(
    `INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4);`,
    [name, phone, cpf, birthday]
  );
}

async function updateCustomer({ id, name, phone, cpf, birthday }) {
  const { rowCount } = await connection.query(
    `UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5;`,
    [name, phone, cpf, birthday, id]
  );
  return rowCount;
}

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
  searchCustomerByCpf,
};

export default db;
