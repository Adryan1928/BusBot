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
    console.log(message.body);

    const welcomeMessage = 'Bom dia! Eu sou o bot José, estou aqui para ajudar com perguntas acadêmicas e apoiar seus estudos. \nDigite: 01 para receber perguntas \nDigite: 02 para encerrar.';

    if (message.body === '01') {
        client.sendMessage(message.from, 'Você escolheu 1. Aqui estão suas perguntas: \n1. Pergunta A \n2. Pergunta B \n\nDigite "gabarito" para ver as respostas.');
    } else if (message.body.toLowerCase() === 'gabarito') {
        client.sendMessage(message.from, 'Aqui está o gabarito: \n1. Resposta A \n2. Resposta B \n Digite: 02 para encerrar.');
    } else if (message.body === '02') {
        client.sendMessage(message.from, 'Você escolheu encerrar. Até a próxima!');
    } else if (message.body !== welcomeMessage) {
        client.sendMessage(message.from, welcomeMessage);
    }
});


client.initialize();
