const express = require('express');
const { syncProduct } = require('../controllers/sync.controller');
const verifySyncKey = require('../middleware/verifySyncKey');

const router = express.Router();

router.post('/product', verifySyncKey, syncProduct);

module.exports = router;
