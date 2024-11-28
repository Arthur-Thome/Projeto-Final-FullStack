const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');  // Se estiver usando PostgreSQL

// Configurações de middleware
app.use(cors());
app.use(bodyParser.json());

// Criação do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'livraria',
    password: '123456',
    port: 5433
});

// Rota POST para adicionar um novo livro
app.post('/livros', async (req, res) => {
    const { titulo, autor, editora, ano, preco, estoque } = req.body;

    try {
        const query = `
            INSERT INTO livros (titulo, autor, editora, ano, preco, estoque)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [titulo, autor, editora, ano, preco, estoque];

        // Execute a query
        const result = await pool.query(query, values);

        // Retorne o livro adicionado
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao adicionar o livro:", error);
        res.status(500).send("Erro ao adicionar o livro.");
    }
});

// Inicia o servidor na porta 3000
app.listen(5000, () => {
    console.log("Servidor rodando na porta 3000...");
});
