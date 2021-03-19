const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { clearScreenDown } = require('readline');
const banco1 = require('./src/banco1');
const stages = require('./src/stages.js');

const SESSION_FILE_PATH = './whatsapp-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr); 
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Cliente conectado!');
    
});

client.on('message', msg => {
    let resp = stages.step[getStage(msg.from)].obj.execute(msg.from);
    for (let index = 0; index < resp.length; index++){
        const element = resp[index];
        client.sendMessage(msg.from, element);
    }
});


client.initialize();

function getStage(user) {
    return banco1.db[user].stage;
}

/**
 * Código para envio de uma única mensagem
 *  client.on('message', msg => {
    //console.log(message);
    if(msg.body === 'Olá') {
      client.sendMessage(msg.from, 'Bem vindo!');
    }
  });

 * 
 * 
 * 
 * 
 * 
 * 
 * Resposta em cima de outra
 * client.on('message', msg => {
    if (msg.body == 'Olá') {
        msg.reply('Olá, sou um assistente virtual e estou em fase de testes!');
    }
});




 * const client = new Client();
 * 
 */