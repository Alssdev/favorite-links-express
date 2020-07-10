const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { decodeBase64 } = require('bcryptjs');

router.get('/signup', (req, res) => {
	res.render('auth/signup');
});

router.post(
	'/singup',
	passport.authenticate('local-signup', {
		successRedirect: '/links',
		failureRedirect: '/signup',
		failureFlash: true,
	})
);

router.get('/login', (req, res) => {
	res.render('auth/login');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local-login', {
		successRedirect: '/links',
		failureRedirect: '/login',
		failureFlash: true,
	})(req, res, next);
});

router.get('/profile', (req, res) => {
	res.render('profile/profile');
});

module.exports = router;
