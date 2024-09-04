const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

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
    console.log(message.from);

    const welcomeMessage = 'Bom dia! Eu sou o bot José, estou aqui para ajudar com perguntas acadêmicas e apoiar seus estudos. \nDigite: 01 para receber perguntas \nDigite: 02 para encerrar.';

    if (message.body === '01') {
        axios.get('https://botjose.pythonanywhere.com/api/questoes/').then(response => {
            console.log('oi' + JSON.stringify(response.data));
            let questions = '';
            for (let question of response.data) {
                console.log(question)
                questions += `${question.id}) ${question.pergunta} \n`;
            }
            client.sendMessage(message.from, 'Você escolheu 1. Aqui estão suas perguntas: \n \n' + questions + '\nDigite o número da questão que deseja responder. \n\nSiga este model: questão=(número da questão) \nExemplo: questão=1');
        });
    } else if (message.body.toLowerCase() === 'gabarito') {
        client.sendMessage(message.from, 'Aqui está o gabarito: \n1. Resposta A \n2. Resposta B \nDigite: "Mais" para ter acesso a mais questões. \nDigite: 02 para encerrar.');
    } else if (message.body.toLowerCase() === 'mais') {
        client.sendMessage(message.from, 'Quer mais perguntas como essas? Assine o "Descomplica" e tenha acesso a uma vasta coleção de questões e materiais de estudo! \nAproveite nosso CUPOM DE DESCONTO exclusivo: *BOTJOSE10* \nNão perca essa oportunidade de melhorar seus estudos. Assine agora!');
        client.sendMessage(message.from, 'Estamos encerrando por aqui. Até a próxima!');
    } else if (message.body === '02') {
        client.sendMessage(message.from, 'Você escolheu encerrar. Até a próxima!');
    } else if (message.body !== welcomeMessage) {
        if (message.body.substring(0, 8) === 'questão=') {
            let questionNumber = message.body.substring(8, message.body.length);
            console.log('questionNumber'+questionNumber);
            axios.get(`https://botjose.pythonanywhere.com/api/questoes/${questionNumber}/`).then(response => {
                console.log('questão' + JSON.stringify(response.data));
                let question = response.data;
                let alternativas = ''
                let letra = 0;
                let letras = ['A', 'B', 'C', 'D', 'E'];
                for (let alternativa of question.alternativas) {
                    alternativas += `${letras[letra]}) ${alternativa.nome} \n`;
                    letra++;
                }
                client.sendMessage(message.from, `Você escolheu a questão ${question.id} \n${question.pergunta} \n${alternativas}\nDigite a letra da alternativa que você acha que é a correta. \nExemplo: alternativa=A;Questão=1`);
            });
        } else if (message.body.substring(0,12) === 'alternativa=') {
            let alternativaLetra = message.body.substring(12, message.body.length);
            let letra = alternativaLetra.substring(0, 1);
            let questionNumber = alternativaLetra.substring(10, alternativaLetra.length);
            console.log('letra' + letra);
            console.log('questionNumber' + questionNumber);
            axios.get(`https://botjose.pythonanywhere.com/api/questoes/${questionNumber}/`).then(response => {
                console.log('questão' + JSON.stringify(response.data));
                let acertou = false;
                let question = response.data;
                let numeroLetra = 0;
                let letras = ['A', 'B', 'C', 'D', 'E'];
                for (let alternativa of question.alternativas) {

                    if (letras[numeroLetra] === letra) {
                        if (alternativa.correta) {
                            acertou = true;
                        }
                    }

                    numeroLetra++;
                }
                if (acertou) {
                    client.sendMessage(message.from, 'Parabéns! Você acertou! \nDigite: "01" para ter acesso a mais questões. \nDigite: 02 para encerrar.');
                } else {
                    client.sendMessage(message.from, 'Que pena! Você errou! \nDigite: "01" para ter acesso a mais questões. \nDigite: "02" para encerrar.');
                }
            });
            
        } else {
            client.sendMessage(message.from, welcomeMessage);
        }
    } 
});


client.initialize();
