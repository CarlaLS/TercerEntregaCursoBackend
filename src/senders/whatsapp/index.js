

const axios =require ("axios");
require('dotenv').config();

 const enviarWhatsapp = async (phone, message) => {
	
	if (phone.charAt(0) != "+") phone = `+${phone}`;

	let post_object = {
		secret: process.env.SMS_MASIVO_API_KEY,
		account: process.env.SMS_MASIVO_WHATSAPP_ACCOUNT,
		phone: phone,
		message: message,
		shortener: 0,
	};

	let data_string = new URLSearchParams(post_object).toString();

	let send = await axios.post("https://smsmasivo.online/api/send/whatsapp", data_string);
	return send;
};

module.exports= {enviarWhatsapp}