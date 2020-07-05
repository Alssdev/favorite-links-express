<<<<<<< HEAD
const { Router } = require('express')
const router = Router()

const db = require('../database')

module.exports = router
=======
const { Router } = require('express');
const router = Router();

const db = require('../database');

router.get('/add', (req, res) => {
  res.send('Formulario');
});

module.exports = router;
>>>>>>> 1f2f56e... Creación de la Estructura princiapl del proyecto
