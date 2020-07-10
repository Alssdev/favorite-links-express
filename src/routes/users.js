const { Router } = require('express');
const router = Router();

const db = require('../database');

router.post('/user/:id', async (req, res) => {
	const { id } = req.params;
	const { biography } = req.body;

	try {
		const userData = await db.query('SELECT * FROM users WHERE id = ?', id)[0];
		const updatedUser = { ...userData, biography };
		await db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);

		req.flash('success', 'Tus datos han sido actualizados correctamente');
		res.redirect('/profile');
	} catch (error) {
		req.flash(
			'error',
			'No pudimos actualizar tu biografía, por favor intentalo más tarde'
		);
		console.error(error);
		res.redirect('/profile');
	}
});

module.exports = router;
