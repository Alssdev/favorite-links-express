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
  try {
    const links = await db.query('SELECT * FROM links');
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

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const links = await db.query('SELECT * FROM links WHERE ID = ?', id);
    res.render('links/edit', { link: links[0] });
  } catch (error) {
    // handle error
  }
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const updatedLink = { title, url, description };

  try {
    await db.query('UPDATE links SET ? WHERE id = ?', [updatedLink, id]);
    res.redirect('/links');
  } catch (error) {
    // handle error
  }
});

module.exports = router;
