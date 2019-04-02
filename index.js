const express = require("express");
const helmet = require("helmet");

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true, //important
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());
// endpoints here

server.post("/api/zoos", (req, res) => {
  db("zoos")
    .insert(req.body)
    .then(ids => {
      const [id] = ids;

      db("zoos")
        .where({ id })
        .then(zoo => {
          res.status(200).json(zoo[0]);
        });
    })
    .catch(error => {
      res.status(500).json({ error: "Please enter a zoo name" });
    });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


