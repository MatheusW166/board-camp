import {
  rentalRepository,
  customerRepository,
  gameRepository,
} from "../repositories/index.js";

async function listRentals(req, res) {
  const { customerId, gameId, offset, limit, order, desc } = req.query;
  try {
    res.send(
      await rentalRepository.listRentals({
        customerId,
        gameId,
        offset,
        limit,
        order,
        desc,
      })
    );
  } catch (err) {
    res.sendStatus(500);
  }
}

async function createRental(req, res) {
  const { customerId, gameId } = req.body;
  try {
    const customer = await customerRepository.searchCustomerById({
      id: customerId,
    });
    if (!customer) return res.sendStatus(400);

    const game = await gameRepository.searchGameById({ id: gameId });
    if (!game) return res.sendStatus(400);

    const rentalsCount = await rentalRepository.countGameRentals({
      id: gameId,
    });
    if (rentalsCount >= game.stockTotal) return res.sendStatus(400);

    await rentalRepository.createRental({
      ...req.body,
      pricePerDay: game.pricePerDay,
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function returnRental(req, res) {
  const { id } = req.params;
  try {
    const rent = await rentalRepository.searchRentalById({ id });
    if (!rent) return res.sendStatus(404);

    if (rent.returnDate) return res.sendStatus(400);
    const game = await gameRepository.searchGameById({ id: rent.gameId });

    const rentDate = new Date(rent.rentDate).getTime();
    const returnDate = Date.now();

    const delayInDays = Math.trunc(
      (returnDate - rentDate) / (1000 * 3600 * 24)
    );
    const delayFee = delayInDays * game.pricePerDay;

    const updatedCount = await rentalRepository.returnRental({ id, delayFee });
    if (updatedCount === 0) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    const rent = await rentalRepository.searchRentalById({ id });
    if (!rent) return res.sendStatus(404);

    if (!rent.returnDate) return res.sendStatus(400);

    const deletedCount = await rentalRepository.deleteRental({ id });
    if (deletedCount === 0) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listRentals, createRental, returnRental, deleteRental };
