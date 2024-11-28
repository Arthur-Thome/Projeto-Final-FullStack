const express = require("express");
const router = express.Router();
const { getAllLivros, addLivro } = require("../controllers/livrosController");

// Definição da rota GET e POST para /livros
router.get("/", getAllLivros);  // Para obter todos os livros
router.post("/", addLivro);     // Para adicionar um novo livro

module.exports = router;
