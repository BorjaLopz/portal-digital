const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");
const chalk = require("chalk");

const createService = async (
  title,
  request_body,
  user_id,
  required_type,
  file_name = "",
  hide = false,
  done = false
) => {
  let connection;

  try {
    connection = await getConnection();

    console.log(chalk.green(title));
    console.log(chalk.yellow(request_body));
    console.log(chalk.yellow(user_id));
    console.log(chalk.yellow(required_type));

    const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type, done, hide) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, request_body, user_id, file_name, required_type, done, hide]
    );

    /*const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type) VALUES (?, ?, ?, ?, ?)`, [title, request_body, user_id, file_name, required_type]
    );*/

    console.log(chalk.green("Ya lo hemos creado!"));

    return newService.insertId;
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

const getServiceByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun servicio con ese id", 400);
    }
    return result[0];
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

const getAllServices = async () => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(`SELECT * FROM requireds WHERE done = ? ORDER BY creation_date ASC`, [0]);

    if (result.length === 0) {
      throw generateError("No hay ningun servicio", 404);
    }

    return result;
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

module.exports = { createService, getServiceByID, getAllServices };
