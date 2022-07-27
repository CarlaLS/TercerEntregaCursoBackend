


const nuevaOrdenSms = (user) => {
	return `Nuevo pedido de ${user.name}: ${user.username}.`;
};

module.exports = {nuevaOrdenSms}