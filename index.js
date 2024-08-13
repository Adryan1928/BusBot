const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Cliente conectado!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
    console.log(message.body)
	if (message.body != 'Bom dia! Eu sou o bot José, aqui para ajudar com perguntas acadêmicas e apoiar seus estudos. \nDigite: 01 para receber perguntas \nDigite: 02 para não receber perguntas.') {
        if (message.body == '01') {
            client.sendMessage(message.from,'Você escolheu 1')
            return
        } else if (message.body == 'Você escolheu 1') {
            return
        }
		client.sendMessage(message.from, 'Bom dia, eu sou o bot José! \n Eu posso te enviar perguntas acadêmicas para você te apoiar nos seus estudos! \n Digite: 01; se você deseja receber \n Digite: 02; se não.');

	}
});


client.initialize();

