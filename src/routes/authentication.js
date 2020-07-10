const { Router } = require('express');
const router = Router();

const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
	res.render('auth/signup');
});

router.post(
	'/singup',
	isNotLoggedIn,
	passport.authenticate('local-signup', {
		successRedirect: '/links',
		failureRedirect: '/signup',
		successFlash: true,
		failureFlash: true,
	})
);

router.get('/login', isNotLoggedIn, (req, res) => {
	res.render('auth/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local-login', {
		successRedirect: '/links',
		failureRedirect: '/login',
		successFlash: true,
		failureFlash: true,
	})(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
	res.render('profile/profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
	req.logOut();
	res.redirect('/login');
});
module.exports = router;
