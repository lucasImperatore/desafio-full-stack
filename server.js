const express = require('express');
const path = require('path');
const app = express();
const mysql = require("mysql2");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost", // Servidor do MySQL
  user: "root", // Usuário padrão do XAMPP
  password: "", // Senha (geralmente vazia no XAMPP)
  database: "books", // Nome do banco que você criou
});

// ---------- ROTAS ----------



// POST /usuarios → insere um novo usuário no banco
app.post("/arquive", (req, res) => {
  const { book_name, author_name,ean,score,stats } = req.body; // Extrai os dados enviados pelo front
  db.query(
    "INSERT INTO arquive (book_name,author_name,ean,score,stats) VALUES (?, ?, ?, ?, ?)", // Query SQL com placeholders
    [book_name, author_name,ean,score,stats], // Valores que substituem os "?"
    (err, result) => {
      if (err) throw err;
      res.json({ message: "livro adicionado com sucesso!" }); // Retorno de sucesso
    }
  );
});

// GET /usuarios → retorna todos os usuários do banco
app.get("/arquive", (req, res) => {
  db.query("SELECT * FROM arquive", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});