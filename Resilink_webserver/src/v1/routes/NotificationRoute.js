const express = require('express');
const router = express.Router();
const io = require('../index.js').io; // Importez le serveur io depuis le fichier index.js

// Route pour diffuser un message à tous les clients
router.post('/broadcast', (req, res) => {
  const message = req.body.message;
  io.emit('broadcast', { message });
  res.status(200).json({ success: true, message: 'Diffusion réussie' });
});

// Route pour envoyer un message à un utilisateur spécifique
router.post('/send-message/:userId', (req, res) => {
  const userId = req.params.userId;
  const message = req.body.message;
  io.to(userId).emit('private-message', { sender: 'Serveur', message });
  res.status(200).json({ success: true, message: 'Message privé envoyé avec succès' });
});

module.exports = router;