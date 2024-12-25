const express = require('express');
const router = express.Router();
const peptideController = require('../controllers/peptideController');

router.get('/search', peptideController.searchPeptides);
router.post('/', peptideController.createPeptide);

module.exports = router;