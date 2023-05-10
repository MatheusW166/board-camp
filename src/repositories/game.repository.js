import connection from "../db/postgres.connection.js";

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

const gameRepository = {
  createGame,
  listGames,
  listGamesByName,
  searchGameById,
  searchGameByName,
};

export default gameRepository;
