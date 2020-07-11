const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database');
const helpers = require('../lib/helpers');

passport.use(
	'local-signup',
	new LocalStrategy(
		{
			usernameField: 'name',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, name, password, done) => {
			const { email } = req.body;
			const newUser = { name, email };

			try {
				newUser.password = await helpers.encryptPassword(password);

				const restul = await db.query('INSERT INTO users SET ?', newUser);
				newUser.id = restul.insertId;

				return done(
					null,
					newUser,
					req.flash('success', 'Bienvenido a nuestra app ' + name)
				);
			} catch {
				return done(
					null,
					false,
					req.flash(
						'error',
						'No pudimos registrarte, por favor revisa los campos'
					)
				);
			}
		}
	)
);

passport.use(
	'local-login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const rows = await db.query('SELECT * FROM users WHERE email = ?', email);

			if (rows.length > 0) {
				const user = rows[0];
				const validPassword = await helpers.matchPassword(
					password,
					user.password
				);
				if (validPassword) {
					done(null, user, req.flash('success', 'Bienvenid@ ' + user.name));
				} else {
					done(
						null,
						false,
						req.flash('error', 'La contraseña o el usuario son incorrectos')
					);
				}
			} else {
				return done(
					null,
					false,
					req.flash('error', 'La contraseña o el usuario son incorrectos')
				);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const rows = await db.query('SELECT * FROM users WHERE id = ?', id);
		done(null, rows[0]);
	} catch (error) {}
});
