const cardapio = require('../cardapio');
const banco1 = require("../banco1");

function execute() {
    let menu = 'CARDAPIO \n\n';

    Object.keys(cardapio.menu).forEach((value) => {
        let element = cardapio.menu[value];
        menu += '${value} - ${element.descricao}        R$ ${element.preco} \n';
    });

    banco1.db[user].stage = 1;

    return ["Olá sou um assistente virtual", menu];
}

exports.execute = execute;
