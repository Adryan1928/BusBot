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
        client.sendMessage(message.from, 'Aqui está o gabarito: \n1. Resposta A \n2. Resposta B \nDigite: "Mais" para ter acesso a mais questões. \nDigite: 02 para encerrar.');
    } else if (message.body.toLowerCase() === 'mais') {
        client.sendMessage(message.from, 'Quer mais perguntas como essas? Assine o "Descomplica" e tenha acesso a uma vasta coleção de questões e materiais de estudo! \nAproveite nosso CUPOM DE DESCONTO exclusivo: *BOTJOSE10* \nNão perca essa oportunidade de melhorar seus estudos. Assine agora!');
        client.sendMessage(message.from, 'Estamos encerrando por aqui. Até a próxima!');
    }
     else if (message.body === '02') {
        client.sendMessage(message.from, 'Você escolheu encerrar. Até a próxima!');
    } else if (message.body !== welcomeMessage) {
        client.sendMessage(message.from, welcomeMessage);
    }
});


client.initialize();
