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
    res.redirect('/links');
  } catch (error) {
    // handle error
  }
});

router.get('/', async (req, res) => {
  let links = [];
  try {
    links = await db.query('SELECT * FROM links');
    res.render('links/list', { links });
  } catch (error) {
    // handle error
  }
});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM links WHERE ID = ?', id);
    res.redirect('/links');
  } catch (error) {
    // handle error
  }
});

module.exports = router;
