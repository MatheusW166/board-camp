import { customerRepository as db } from "../repositories/index.js";

async function listCustomers(req, res) {
  const { cpf, offset, limit, order, desc } = req.query;
  try {
    res.send(
      await db.listCustomers({ cpf: cpf?.trim(), offset, limit, order, desc })
    );
  } catch (err) {
    res.sendStatus(500);
  }
}

async function searchCustomerById(req, res) {
  const { id } = req.params;
  try {
    const result = await db.searchCustomerById({ id });
    if (!result) return res.sendStatus(404);

    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function createCustomer(req, res) {
  try {
    const result = await db.searchCustomerByCpf(req.body);
    if (result) return res.sendStatus(409);

    console.log(result);

    await db.createCustomer(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function updateCustomer(req, res) {
  const { id } = req.params;
  try {
    const customerFoundId = await db.searchCustomerById({ id });
    if (!customerFoundId) return res.sendStatus(404);

    const result = await db.searchCustomerByCpf(req.body);
    if (result?.id !== Number(id)) return res.sendStatus(409);

    const updatedCount = await db.updateCustomer({ id, ...req.body });
    if (updatedCount === 0) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listCustomers, searchCustomerById, createCustomer, updateCustomer };
