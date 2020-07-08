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

  res.redirect('/links');
});

router.get('/', async (req, res) => {
  let links = [];
  try {
    links = await db.query('SELECT * FROM links');
  } catch (error) {
    console.log('error');
  }

  res.render('links/list', { links });
});

module.exports = router;
