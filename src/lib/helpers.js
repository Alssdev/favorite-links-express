const bcrypt = require('bcryptjs');

const helpers = {
	async encryptPassword(password) {
		const salt = await bcrypt.genSalt(10);
		const finalPassword = await bcrypt.hash(password, salt);

		return finalPassword;
	},

	async matchPassword(password, savedPassword) {
		try {
			return await bcrypt.compare(password, savedPassword);
		} catch (error) {
			// handle error
		}
	},
};

module.exports = helpers;
