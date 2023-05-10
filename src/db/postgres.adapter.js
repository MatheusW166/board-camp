import connection from "./postgres.connection.js";
import { rowToRental } from "../utils/row.utils.js";

async function listGamesByName({ name }) {
  name += "%";
  const result = await connection.query(
    `SELECT * FROM games WHERE name ILIKE $1;`,
    [name]
  );
  return result.rows;
}

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

async function searchGameById({ id }) {
  const result = await connection.query("SELECT * FROM games WHERE id=$1;", [
    id,
  ]);
  return result.rows[0];
}

async function listCustomersByCpf({ cpf }) {
  cpf += "%";
  const result = await connection.query(
    `SELECT * FROM customers WHERE cpf LIKE $1;`,
    [cpf]
  );
  return result.rows;
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
  cpf += "%";
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

async function listRentals({ customerId, gameId }) {
  let query = `SELECT
	r.*,
	c.name AS "customerName",
	g.name AS "gameName"
	FROM rentals r
	INNER JOIN games g ON r."gameId"=g.id
	INNER JOIN customers c ON c.id=r."customerId" WHERE 1=1`;

  const parameters = [];
  if (customerId) {
    parameters.push(customerId);
    query += ` AND r."customerId"=$${parameters.length}`;
  }
  if (gameId) {
    parameters.push(gameId);
    query += ` AND r."gameId"=$${parameters.length}`;
  }

  const result = await connection.query(`${query};`, parameters);

  return result.rows.map(rowToRental);
}

async function createRental({ customerId, gameId, pricePerDay, daysRented }) {
  const today = new Date().toISOString();
  const originalPrice = pricePerDay * daysRented;

  await connection.query(
    `INSERT INTO rentals ("customerId","gameId","daysRented","rentDate","originalPrice") 
    VALUES ($1,$2,$3,$4,$5);`,
    [customerId, gameId, daysRented, today, originalPrice]
  );
}

async function searchRentalById({ id }) {
  const result = await connection.query("SELECT * FROM rentals WHERE id=$1;", [
    id,
  ]);
  return result.rows[0];
}

async function returnRental({ id, delayFee = 0 }) {
  const returnDate = new Date().toISOString();
  const { rowCount } = await connection.query(
    `UPDATE rentals SET "returnDate"=$1,"delayFee"=$2 WHERE id=$3;`,
    [returnDate, delayFee, id]
  );
  return rowCount;
}

async function deleteRental({ id }) {
  const { rowCount } = await connection.query(
    `DELETE FROM rentals WHERE id=$1;`,
    [id]
  );
  return rowCount;
}

async function countGameRentals({ id }) {
  const result = await connection.query(
    `SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`,
    [id]
  );

  return result.rows[0].count;
}

const db = {
  createCustomer,
  createGame,
  createRental,
  deleteRental,
  returnRental,
  listCustomers,
  updateCustomer,
  searchCustomerById,
  listRentals,
  listGames,
  searchGameByName,
  searchCustomerByCpf,
  searchGameById,
  countGameRentals,
  searchRentalById,
  listGamesByName,
  listCustomersByCpf,
};

export default db;
