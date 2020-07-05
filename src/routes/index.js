<<<<<<< HEAD
const { Router } = require('express')
const router = Router()

router.get('/', (request, response) => {
  response.send('Hello World')
})

module.exports = router
=======
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
>>>>>>> 1f2f56e... Creación de la Estructura princiapl del proyecto
