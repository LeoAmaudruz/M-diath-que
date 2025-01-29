const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Afficher les documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();
    res.render('documents', { documents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Emprunter un document
router.post('/borrow/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (document.available) {
      document.available = false;
      await document.save();
      res.redirect('/documents');
    } else {
      res.status(400).json({ message: 'Document déjà emprunté' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retourner un document
router.post('/return/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document.available) {
      document.available = true;
      await document.save();
      res.redirect('/documents');
    } else {
      res.status(400).json({ message: 'Document déjà disponible' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;