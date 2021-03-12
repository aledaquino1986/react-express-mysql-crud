const express = require("express");
const dotenv = require("dotenv");
const config = require("./config/app");
const database = require("./config/database");

const mysql = require("mysql");

const app = express();
dotenv.config();

app.use(express.json());

const db = mysql.createConnection({
  user: database.development.username,
  host: database.development.host,
  password: database.development.password,
  database: database.development.database
});

app.get("/api/customers", (req, res) => {
  const customers = [
    {
      id: 1,
      name: "Ale",
      lastName: "Aquino"
    },
    {
      id: 2,
      name: "Pipi",
      lastName: "Punpun"
    },
    {
      id: 3,
      name: "Nami",
      lastName: "Bonita chiquita"
    }
  ];

  res.send(customers);
});

app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("values inserted");
        res.send("Values inserted");
      }
    }
  );
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const country = req.body.country;

  db.query(
    "UPDATE employees SET country = ? where id = ?",
    [country, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const port = process.env.APP_PORT;

app.listen(5000, () => {
  console.log(port);
  console.log(`Server running on port ${port}`);
});
