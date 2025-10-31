const {
  loginValidation,
  registerValidation,
} = require("../middleware/validation");
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.loginUser = async (params) => {
  const { error } = loginValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { email, password } = params;
  const hashedPassword = md5(password.toString());

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, hashedPassword],
      (err, result) => {
        if (err) {
          reject({
            data: err,
            message: "Something went wrong, please try again",
            statusCode: 400,
          });
          return;
        }

        if (result.length === 0) {
          reject({
            message: "Wrong credentials, please try again",
            statusCode: 400,
          });
          return;
        }

        const token = jwt.sign({ data: result }, "secret");
        resolve({
          message: "Logged in successfully",
          data: result,
          token,
        });
      }
    );
  });
};

exports.registerUser = async (params) => {
  const { error } = registerValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { fullName, email, password } = params;
  const hashedPassword = md5(password.toString());

  // cria automaticamente o username com base no email
  const username = email.split("@")[0];

  return new Promise((resolve, reject) => {
    // verificar se o email já existe
    db.query(`SELECT email FROM users WHERE email = ?`, [email], (err, result) => {
      if (err) {
        reject({
          message: "Something went wrong, please try again",
          statusCode: 400,
          data: err,
        });
        return;
      }

      if (result.length > 0) {
        reject({
          message: "Email address is in use, please try a different one",
          statusCode: 400,
        });
        return;
      }

      // inserir novo usuário (username agora obrigatório)
      db.query(
        `INSERT INTO users (username, fname, email, password) VALUES (?,?,?,?)`,
        [username, fullName, email, hashedPassword],
        (err, result) => {
          if (err) {
            reject({
              message: "Something went wrong, please try again",
              statusCode: 400,
              data: err,
            });
            return;
          }

          const token = jwt.sign({ data: result }, "secret");
          resolve({
            data: result,
            message: "You have successfully registered.",
            token: token,
            statusCode: 200,
          });
        }
      );
    });
  });
};