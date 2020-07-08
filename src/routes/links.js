const { Router } = require('express');
const router = Router();

const db = require('../database');

router.get('/add', (req, res) => {
  res.render('links/add');
});

router.post('/add', async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = { title, url, description };

  try {
    await db.query('INSERT INTO links SET ?', [newLink]);
  } catch (error) {
    console.log(error);
  }

  res.send('recived');
});

module.exports = router;
