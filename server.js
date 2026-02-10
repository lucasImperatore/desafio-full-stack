const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

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
  const { book_name, author_name, ean, score, stats } = req.body; // Extrai os dados enviados pelo front
  db.query(
    "INSERT INTO arquive (book_name,author_name,ean,score,stats) VALUES (?, ?, ?, ?, ?)", // Query SQL com placeholders
    [book_name, author_name, ean, score, stats], // Valores que substituem os "?"
    (err, result) => {
      if (err) {
        // identificador caso haja erros
        console.error("Erro ao inserir:", err);
        return res.status(500).send("Erro ao salvar o livro.");
      }

      // comando res.redirect para retornar para pagina books.html
      res.redirect("/books.html");
    },
  );
});



// GET /usuarios → retorna todos os usuários do banco
app.get("/arquive", (req, res) => {
  db.query("SELECT * FROM arquive", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});


//Delete/ deleta o livro selecionado pelo id
app.delete("/arquive/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM arquive WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "erro ao deletar" });
      }

      res.json({ message: "livro deletado com sucesso!" });
    }
  );
});

// Adiciona isto no seu server.js
// Rota para ATUALIZAR (PUT)
app.put("/arquive/:id", (req, res) => {
    const id = req.params.id; // Pega o '1' da URL
    const { score, stats } = req.body; // Pega os dados enviados pelo fetch

    // Comando SQL para atualizar
    const sql = "UPDATE arquive SET score = ?, stats = ? WHERE id = ?";
    
    db.query(sql, [score, stats, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao atualizar no banco de dados." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Livro não encontrado para atualizar." });
        }

        res.json({ message: "Livro atualizado com sucesso!" });
    });
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
