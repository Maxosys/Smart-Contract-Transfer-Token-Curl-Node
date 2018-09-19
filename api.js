const express = require('express');
const app = express();
const Web3 = require('web3');

const web3     = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/INFURA_KEY'));
var Tx = require('ethereumjs-tx');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const SHA256 = require("crypto-js/sha256");
const cors = require('cors');
let fs = require('fs');

var db = require('./dbconnection'); //reference of dbconnection.js

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/ethtoethaddress', (req, res) => {

 db.getConnection(function(err, connection) {

    var postBody             = req.body; 

    var toAddress            = postBody.toAddress;
    var value                = postBody.value;
    var coinwallet           = postBody.coinwallet;
    var saltkey               = postBody.saltkey;

console.log(toAddress);

let walletContractAddress      = "SMART CONTRACT WALLET ADDRESS";

const abiArray = ["PUT YOUR ABI CODE HERE"];


let contract          = web3.eth.contract(abiArray).at(walletContractAddress)  
var coder             = require('web3/lib/solidity/coder');
var CryptoJS          = require('crypto-js');
var SolidityFunction  = require('web3/lib/web3/function');
  
var myPrivateKey      = 'PRIMARY_KEY'+saltkey;  // set according to your idea

var privateKey        = new Buffer(myPrivateKey, 'hex');

var CoinValue         =  web3.toWei(value,"ether");

var data              =  contract.transfer.getData(toAddress, CoinValue ,{ from: coinwallet }); //'0x'+dataHex;


var nonce = web3.toHex(web3.eth.getTransactionCount(coinwallet));

while (nonce <= lastnonce) nonce++;
lastnonce = nonce;



console.log('nonce (transaction count on fromAccount): ' + nonce );
console.log('Gas Price : ' + web3.eth.gasPrice );


var gasPrice = "0x098bca5a00"; //web3.toHex(web3.eth.gasPrice);
var gasLimitHex = web3.toHex(300000);// (user defined)  

var rawTx = { 'nonce': nonce, 'gasPrice': gasPrice, 'gasLimit': gasLimitHex,'to': walletContractAddress,'from' : coinwallet ,'value': "0x00",'data': data,'chainId':3};

console.log(rawTx);

var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = '0x'+tx.serialize().toString('hex');

web3.eth.sendRawTransaction(serializedTx, function(err, txHash){ console.log(err, txHash)

res.send({ txHash: txHash });
 })

  connection.release();

    });
});
