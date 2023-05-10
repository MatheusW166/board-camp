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

async function returnRental(req, res) {
  const { id } = req.params;
  try {
    const rent = await db.searchRentalById({ id });
    if (!rent) return res.sendStatus(404);

    if (rent.returnDate) return res.sendStatus(400);
    const game = await db.searchGameById({ id: rent.gameId });

    const rentDate = new Date(rent.rentDate).getTime();
    const returnDate = Date.now();

    const delayInDays = Math.trunc(
      (returnDate - rentDate) / (1000 * 3600 * 24)
    );
    const delayFee = delayInDays * game.pricePerDay;

    const updatedCount = await db.returnRental({ id, delayFee });
    if (updatedCount === 0) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    const rent = await db.searchRentalById({ id });
    if (!rent) return res.sendStatus(404);

    if (!rent.returnDate) return res.sendStatus(400);

    const deletedCount = await db.deleteRental({ id });
    if (deletedCount === 0) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listRentals, createRental, returnRental, deleteRental };
