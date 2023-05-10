import { gameRepository as db } from "../repositories/index.js";

async function listGames(req, res) {
  const { name } = req.query;
  try {
    let result;
    if (name) {
      result = await db.listGamesByName({ name: name?.trim() });
    } else {
      result = await db.listGames();
    }
    res.send(result);
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
