import db from "../db/postgres.adapter.js";

async function listCustomers(req, res) {
  const { cpf } = req.query;
  try {
    let result;

    if (cpf) {
      result = await db.listCustomersByCpf({ cpf });
    } else {
      result = await db.listCustomers();
    }

    res.send(result);
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
