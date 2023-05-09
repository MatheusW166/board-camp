import db from "../db/postgres.adapter.js";

async function listRentals(_, res) {
  try {
    res.send(await db.listRentals());
  } catch (err) {
    res.sendStatus(500);
  }
}

async function createRental(req, res) {
  const { customerId, gameId } = req.body;
  try {
    const customer = await db.searchCustomerById({ id: customerId });
    if (!customer) return res.sendStatus(400);

    const game = await db.searchGameById({ id: gameId });
    if (!game) return res.sendStatus(400);

    const rentalsCount = await db.countGameRentals({ id: gameId });
    if (rentalsCount >= game.stockTotal) return res.sendStatus(400);

    await db.createRental({ ...req.body, pricePerDay: game.pricePerDay });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listRentals, createRental };
