const express = require('express');
const router = express.Router();
const { sendEmailEthereal, sendEmail } = require('../controllers/sendEmail');

router.route('/').get(sendEmailEthereal);

module.exports = router;
