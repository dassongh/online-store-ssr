const express = require('express');
const router = express.Router();

router.get('/howToFind', (req, res) => {
  res.render('Contact', {
    contactPage: true,
  });
});

module.exports = router;
