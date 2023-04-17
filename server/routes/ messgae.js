const express = require('express');
const router = express();
const { sendMessage } = require('../controllers/message')

router.post('/api/message', sendMessage )

module.exports = router