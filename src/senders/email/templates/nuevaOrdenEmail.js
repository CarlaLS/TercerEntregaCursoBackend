
require('dotenv').config()

const nevaOrdenEmail= (order_data) => {
	let productos = order_data.productos
		.map((producto) => {
			return `<p><b>${producto.title}</b>: $${producto.price}</p>`;
		})
		.join(" ");

	const mailOptions = {
		from: `<${process.env.GMAIL_USER}>`,
		to: process.env.ADMIN_EMAIL,
		subject: `Nuevo pedido de: ${order_data.user.name} - ${order_data.user.username}`,
		html: `
			<h1>Nuevo pedido de: ${order_data.user.username}</h1>
			<p><img src="${order_data.user.photo}" width="100px"/></p>
			<p><b>Nombre:</b> ${order_data.user.name}</p>
			<p><b>Dirección:</b> ${order_data.user.address}</p>
			<p><b>Teléfono:</b> ${order_data.user.phone}</p>
			<p><b>Cantidad de productos:</b> ${order_data.productos_quantity}</p>
			<p><b>PRODUCTOS:</b> ${productos}</p>
			<p><b>Total:</b> $${order_data.total_price}</p>
		`,

		
	};

	return mailOptions;
};

module.exports = {nevaOrdenEmail}