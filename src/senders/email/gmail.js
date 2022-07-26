
const createTransport = require ('nodemailer');

require('dotenv').config()

const transporter = createTransport({
	service: "gmail",
	port: process.env.GMAIL_PORT || 587,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});


module.exports = { transporter}