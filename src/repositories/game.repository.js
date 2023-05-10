import connection from "../db/postgres.connection.js";
import { checkGameColumn } from "../utils/column.utils.js";

async function listGames({ name, offset, limit, order, desc = false }) {
  let query = "SELECT * FROM games WHERE 1=1";

  const params = [];
  if (name) {
    name += "%";
    params.push(name);
    query += ` AND name ILIKE $${params.length}`;
  }

  if (checkGameColumn(order)) {
    query += ` ORDER BY "${order}" ${desc ? "DESC" : "ASC"}`;
  }

  if (limit) {
    params.push(limit);
    query += ` LIMIT $${params.length}`;
  }

  if (offset) {
    params.push(offset);
    query += ` OFFSET $${params.length}`;
  }

  const result = await connection.query(`${query};`, params);
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

const gameRepository = {
  createGame,
  listGames,
  searchGameById,
  searchGameByName,
};

export default gameRepository;
