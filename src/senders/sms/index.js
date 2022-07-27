const axios = require ('axios')
require('dotenv').config()

   const enviarSms = async (phone, message) => {
	
	if (phone.charAt(0) != "+") phone = `+${phone}`;

	let post_object = {
		secret: process.env.SMS_MASIVO_API_KEY,
		mode: "devices",
		device: process.env.SMS_MASIVO_DEVICE_ID,
		sim: 1,
		priority: 1,
		phone: phone,
		message: message,
	};

	let data_string = new URLSearchParams(post_object).toString();

	let send = await axios.post("https://smsmasivo.online/api/send/sms", data_string);
	return send;
};
module.exports = {enviarSms}