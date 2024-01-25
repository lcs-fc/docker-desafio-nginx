const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const queryCreateTable = `CREATE TABLE IF NOT EXISTS People (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));`;
connection.query(queryCreateTable);

const queryInsertNames = `INSERT INTO People (name) VALUES ('Leomar Camargo');`;
connection.query(queryInsertNames);

const getAllPeople = () => {
  return new Promise((resolve, reject) => {
    const querySelectAll = `SELECT * FROM People`;
    connection.query(querySelectAll, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

app.get('/', async (req, res) => {
  try {
    const data = await getAllPeople();
    const title = '<h1>Full Cycle Rocks!</h1>';
    const list = `
      <ul>
        ${data.map(p => `<li>${p.name}</li>`).join('')}
      </ul>
    `;

    res.send(title + list);
  } catch (error) {
    console.error('Erro ao obter a lista de pessoas:', error);
  }
});

app.listen(port, () => {
  console.log('Porta: ' + port)
});