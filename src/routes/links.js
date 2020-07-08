const { Router } = require('express');
const router = Router();

const db = require('../database');

router.get('/add', (req, res) => {
  res.render('links/add');
});

router.post('/add', (req, res) => {
  console.log(req.body);
  res.send('recived');
});

module.exports = router;
