const pool = require("../config/db");

// POST: Adicionar um novo livro
const addLivro = async (req, res) => {
    const { titulo, autor, editora, ano, preco, estoque } = req.body;
    
    if (!titulo || !autor || !editora || !ano || !preco || !estoque) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO livros (titulo, autor, editora, ano, preco, estoque) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [titulo, autor, editora, ano, preco, estoque]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao adicionar livro");
    }
};

module.exports = { getAllLivros, addLivro };
