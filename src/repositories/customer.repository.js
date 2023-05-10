import connection from "../db/postgres.connection.js";

async function listCustomersByCpf({ cpf }) {
  cpf += "%";
  const result = await connection.query(
    `SELECT * FROM customers WHERE cpf LIKE $1;`,
    [cpf]
  );
  return result.rows;
}

async function listCustomers() {
  const result = await connection.query("SELECT * FROM customers;");
  return result.rows;
}

async function searchCustomerById({ id }) {
  const result = await connection.query(
    "SELECT * FROM customers WHERE id=$1;",
    [id]
  );
  return result.rows[0];
}

async function searchCustomerByCpf({ cpf }) {
  const result = await connection.query(
    "SELECT * FROM customers WHERE cpf=$1;",
    [cpf]
  );
  return result.rows[0];
}

async function createCustomer({ name, phone, cpf, birthday }) {
  await connection.query(
    `INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4);`,
    [name, phone, cpf, birthday]
  );
}

async function updateCustomer({ id, name, phone, cpf, birthday }) {
  const { rowCount } = await connection.query(
    `UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5;`,
    [name, phone, cpf, birthday, id]
  );
  return rowCount;
}

const customerRepository = {
  createCustomer,
  listCustomers,
  listCustomersByCpf,
  searchCustomerByCpf,
  searchCustomerById,
  updateCustomer,
};

export default customerRepository;
