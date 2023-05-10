import connection from "../db/postgres.connection.js";
import { rowToRental } from "../utils/row.utils.js";

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

const rentalRepository = {
  countGameRentals,
  createRental,
  deleteRental,
  listRentals,
  returnRental,
  searchRentalById,
};

export default rentalRepository;
