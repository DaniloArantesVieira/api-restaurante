const express = require('express');
const router = express.Router();

const db = require('../config/database');

// GET /prato
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM prato';

  db.query(sql, (erro, resultados) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: 'Erro ao buscar os pratos'
      });
    }

    return res.status(200).json(resultados);
  });
});

// GET /prato/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM prato WHERE id = ?';

  db.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: 'Erro ao buscar o prato'
      });
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        mensagem: 'Prato não encontrado'
      });
    }

    return res.status(200).json(resultados[0]);
  });
});

// POST /prato
router.post('/', (req, res) => {
  const { nome, categoria, preco } = req.body || {};

  if (!nome || !categoria || preco === undefined) {
    return res.status(400).json({
      erro: 'Nome, categoria e preço são obrigatórios'
    });
  }

  const sql =
    'INSERT INTO prato (nome, categoria, preco) VALUES (?, ?, ?)';

  db.query(sql, [nome, categoria, preco], (erro, resultado) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: 'Erro ao cadastrar o prato'
      });
    }

    return res.status(201).json({
      mensagem: 'Prato cadastrado com sucesso',
      prato: {
        id: resultado.insertId,
        nome,
        categoria,
        preco
      }
    });
  });
});

// PUT /prato/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, categoria, preco } = req.body;

  if (!nome || !categoria || preco === undefined) {
    return res.status(400).json({
      erro: 'Nome, categoria e preço são obrigatórios'
    });
  }

  const sql =
    'UPDATE prato SET nome = ?, categoria = ?, preco = ? WHERE id = ?';

  db.query(sql, [nome, categoria, preco, id], (erro, resultado) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: 'Erro ao atualizar o prato'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Prato não encontrado'
      });
    }

    return res.status(200).json({
      mensagem: 'Prato atualizado com sucesso',
      prato: {
        id: Number(id),
        nome,
        categoria,
        preco
      }
    });
  });
});

// DELETE /prato/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM prato WHERE id = ?';

  db.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: 'Erro ao excluir o prato'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Prato não encontrado'
      });
    }

    return res.status(200).json({
      mensagem: 'Prato excluído com sucesso'
    });
  });
});

module.exports = router;