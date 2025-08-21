const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all clients
router.get('/', async (req, res) => {
  try {
    const clients = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await pool.query('SELECT * FROM clients WHERE client_id = ?', [req.params.id]);
    if (client.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(client[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create client
router.post('/', async (req, res) => {
  const { name, email, address } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO clients (name, email, address) VALUES (?, ?, ?)',
      [name, email, address]
    );
    res.status(201).json({
      client_id: result.insertId,
      message: 'Cliente criado com sucesso'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Email já cadastrado' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT update client
router.put('/:id', async (req, res) => {
  const { name, email, address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE clients SET name = ?, email = ?, address = ? WHERE client_id = ?',
      [name, email, address, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE client
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM clients WHERE client_id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;