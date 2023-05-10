import { gameRepository as db } from "../repositories/index.js";

async function listGames(req, res) {
  const { name, offset, limit, order, desc } = req.query;
  try {
    res.send(
      await db.listGames({ name: name?.trim(), offset, limit, order, desc })
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function createGame(req, res) {
  try {
    const result = await db.searchGameByName(req.body);
    if (result) {
      return res.sendStatus(409);
    }
    await db.createGame(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { createGame, listGames };
