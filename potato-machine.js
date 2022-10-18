var keys = require("./keys.js")
var env = require("./env.js")
var Web3 = require('web3');
var ETHERS =  require('ethers')

var _ = {} //store global variables from database

/*const Moralis = require("moralis/node");
const serverUrl = 
const appId = keys.moralis_appId
const masterKey = keys.moralis_masterKey*/

//const events = await Moralis.Web3API.native.getContractEvents(options);

const client = require('./connection.js')
const pDealer = require('./potato-dealer.js')
var PD = new pDealer(client);

var network = env.network ? env.polyProviders[0] : env.ethProviders[0]

//Mainnet: 'https://mainnet.infura.io/v3/'+keys.infura
//Testnet: 'https://ropsten.infura.io/v3/'+keys.infura
const polygon_web3 = new Web3(network)
var blue_machine = polygon_web3.eth.accounts.wallet.add(keys.wallet);

//Mainnet: https://bsc-dataseed4.binance.org/
//Testnet: https://data-seed-prebsc-1-s1.binance.org:8545/
const bsc_web3 = new Web3( new Web3.providers.WebsocketProvider(env.bscProviders[1]) )
var orange_machine = bsc_web3.eth.accounts.wallet.add(keys.wallet);

var machineAddress = orange_machine.address;
var adminAddress = machineAddress;

//Polygon Contracts
var potatoNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"potatoes","type":"uint256[]"}],"name":"PotatoTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructAttributes","outputs":[{"internalType":"string","name":"JSON","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructDescription","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructName","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructSVG","outputs":[{"internalType":"string","name":"SVG","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPotatoData","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"metascore","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"images","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"metapoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"UINTs","type":"uint256[]"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"UINTs","type":"uint256[]"}],"name":"mintPotatoHeads","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"meta","type":"uint256"}],"name":"newPiece","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"image","type":"string[]"},{"internalType":"string[]","name":"desc","type":"string[]"},{"internalType":"uint256[]","name":"meta","type":"uint256[]"}],"name":"newPieces","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pieces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"potatoTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"potatoes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoNFT_Contract = new polygon_web3.eth.Contract(potatoNFT_ABI, env.potatoNFT)

var swapNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"PotatoReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"indexed":false,"internalType":"string","name":"inResponseTo","type":"string"}],"name":"SendPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"onPotatoReceived","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"string","name":"inResponseTo","type":"string"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var swapNFT_contract = new polygon_web3.eth.Contract(swapNFT_ABI, env.swapNFT)

var potatoDuel_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"duelID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wildPotatoID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"WIN","type":"bool"},{"indexed":false,"internalType":"string","name":"inResponseTo","type":"string"}],"name":"FinalizeDuel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"duelist","type":"address"},{"indexed":false,"internalType":"uint256","name":"rarity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"potatoID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duelID","type":"uint256"}],"name":"PotatoDuelGo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"PotatoReceived","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duelID","type":"uint256"},{"internalType":"uint256","name":"wildPotatoID","type":"uint256"},{"internalType":"bool","name":"WIN","type":"bool"},{"internalType":"string","name":"inResponseTo","type":"string"}],"name":"finalizeDuel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"onPotatoReceived","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoDuel_contract = new polygon_web3.eth.Contract(potatoDuel_ABI, env.potatoDuel)

var potatoBuy_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"destination","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Batchmint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"paid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BuyPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"destination","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"batchmint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyPotato","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoBuy_contract = new polygon_web3.eth.Contract(potatoBuy_ABI, env.buyContract)

//Binance Contracts
var potatoTokenABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
var potatoTokenContract = new bsc_web3.eth.Contract(potatoTokenABI, env.potatoToken)

var swapTOKEN_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"forWhom","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositPotatoToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"inResponseTo","type":"string"}],"name":"SendPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"forWhom","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositPotatoToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"inResponseTo","type":"string"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var swapTOKEN_contract = new bsc_web3.eth.Contract(swapTOKEN_ABI, env.swapToken)

var winspin_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"spinner","type":"address"}],"name":"SpinWheel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"inResponseTo","type":"string"},{"indexed":false,"internalType":"string","name":"notification","type":"string"}],"name":"SpinWheelNotification","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"spinWheel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"inResponseTo","type":"string"},{"internalType":"string","name":"notification","type":"string"}],"name":"spinWheelNotification","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var winspin_contract = new bsc_web3.eth.Contract(winspin_ABI, env.winspin)


//THIS IS STARTING THE WHOLE THING
client.connect(function(err){
	if (err) throw err;
	console.log('connected');

	client.query("SELECT * FROM globals", function(err,res,fields){
		if (err) throw err;

		res.forEach((gv)=>{
			_[gv.name] = gv.val
		});
		console.log('Pulled global variables. (This is for recovering the state if VM gets shut off. We are not using these yet)')
		//this.bridgeSize
		client.query("SELECT COUNT(*) FROM bridge", function(err,res,fields){
			if (err) throw err;
			console.log( 'RESULTS FROM COUNT bridge for bridgeSize', res )
			PD.sizeBridge ( res[0]['COUNT(*)'] )
			console.log("bridgeSize", PD.bridgeSize)
			listenToEvents();
		});
	});
});

function listenToEvents(){
	/*insistTX(polygon_web3,()=>{
		return swapNFT_contract.methods.sendPotato(machineAddress, [574357,917954])//swapTOKEN_contract.methods.sendPotato(swapper, thePotatoes.length)
	},()=>{
		console.log("Tried sending, test...")
	})*/

	console.log("Listening for Tokens(BSC) & NFTs(POLY)")
	/*await Moralis.start({serverUrl, appId, masterKey});

	const ABI = {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"forWhom","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositPotatoToken","type":"event"}
	const options = {
	  chain: "eth",
	  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
	  topic: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
	  from_block:,
	  to_block:,
	  abi: ABI,
	};
	Moralis.Web3API.native.getContractEvents(options)*/

	catch_BSC_events()
	catch_polygon_events()
	//catchDuels()
}

function catch_BSC_events(){
	bsc_web3.eth.getBlockNumber().then(function(latestBlock){
		if(latestBlock > _.latest_bsc_block_scanned){
			console.log({fromBlock:_.latest_bsc_block_scanned, toBlock:latestBlock})
			let promise1 = swapTOKEN_contract.getPastEvents('allEvents',{fromBlock:_.latest_bsc_block_scanned, toBlock:latestBlock},function(e,x){
				if(e) console.error(e)
				if(x)
				x.forEach((event)=>{
					if(event.event == "DepositPotatoToken"){
						catchToken_swap(event)
					}
				})
			})
			let promise2 = winspin_contract.getPastEvents('allEvents',{fromBlock:_.latest_bsc_block_scanned, toBlock:latestBlock},function(e,x){
				if(e) console.error(e)
				if(x)
				x.forEach((event)=>{
					if(event.event == "SpinWheel"){
						run_wheelSpin(event)
					}
				})
			})
			
			Promise.all([promise1,promise2]).then(()=>{
				console.log('----------checked bsc---------- ',_.latest_bsc_block_scanned+" >>>> "+latestBlock)
				_.latest_bsc_block_scanned = latestBlock+1
				client.query("UPDATE globals SET val="+_.latest_bsc_block_scanned+" WHERE name = 'latest_bsc_block_scanned'",function(){
					setTimeout(catch_BSC_events,5000)
				})
			})

		}else{
			setTimeout(catch_BSC_events,3000)
		}
	}).catch(err=>{
		console.log(err)
		console.log("\n=========\n=========\n Gonna try continuing catching tokens events")
		catch_BSC_events()
	})
}

function run_wheelSpin(event){
	console.log("BUSD received for spin... ...")
	let spinner = event.returnValues.spinner;
	let inResponseToTx = event.transactionHash;
	let prizes = [
		{type:'NFT',count:1,weight:100},
		{type:'NFT',count:3,weight:50},
		{type:'NFT',count:5,weight:10},
		{type:'ERC20',count:1,weight:100},
		{type:'ERC20',count:3,weight:50},
		{type:'ERC20',count:5,weight:10},
		{type:'LOSS',count:0,weight:10}
	];
	
	let bucketSize = 0;
	prizes.forEach(function(x){
		bucketSize += x.weight;
	})
	

	let weightedRoll = Math.floor( bucketSize * Math.random() )	
	let chosen;
	let j;
	
	for(j=0; j<prizes.length; j+=1){
		let prize = prizes[j];
		weightedRoll -= prize.weight
		if(weightedRoll <= 0){
			chosen = j;
			break;
		}
	}

	let chosenPrize = prizes[j];
	console.log("}}}}}}}}}}}}}}}}}}}}PRIZE REWARD :::::: ", chosenPrize)
	function sendNotification(json,inResponseToTx){
		insistTX(bsc_web3, ()=>{
			return winspin_contract.methods.spinWheelNotification(inResponseToTx,json)
		},function(){
			console.log("spinWheelNotification  sent");
		} )
	}
	if(chosenPrize.type !== "LOSS"){
		PD.batchmint( chosenPrize.count, function(rewards){
			console.log("work.f()")
			
			let nft_dest = chosenPrize.type=="NFT"?spinner:env.swapNFT
			insistTX(polygon_web3,()=>{
				return potatoNFT_Contract.methods.mintPotatoHeads(nft_dest, rewards.params)
			},()=>{
				console.log("Successfully minted "+nft_dest.substr(0,8)+' these Potato NFTs:', rewards.IDs)

				if(chosenPrize.type=="ERC20"){
					PD.benchTicket(rewards.IDs, function(){
						console.log("work.f() ... 2")
						insistTX(bsc_web3,()=>{
							console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>spinner: ",spinner)
							return potatoTokenContract.methods.transfer(spinner, chosenPrize.count)
						},()=>{
							console.log("Successfully sent BSC potato Tokens to the player")
							sendNotification(`{"prize":${chosenPrize.count},"type":'ERC20'}`,inResponseToTx)
						})
					})
				}else{
					insistTX(bsc_web3,()=>{
						return potatoTokenContract.methods.transfer(env.swapToken, chosenPrize.count)
					},()=>{
						console.log("Successfully sent BSC potato Tokens to the bridge")
						sendNotification(`{"prize":${chosenPrize.count},"type":'NFT'}`,inResponseToTx)
					})
				}

			})
		})
	}else{
		console.log("Loss winspin")
		sendNotification(`{"prize":0,"type":'nothing'}`,inResponseToTx)
	}
	/*if(chosenPrize.type=='NFT'){}
	if(chosenPrize.type=='ERC20'){}*/
}

function catchToken_swap(event){
	console.log("Tokens received ... going to send POLY POTATO")
	let swapper = event.returnValues.from;
	let count =  ETHERS.BigNumber.from(event.returnValues.amount).div(  ETHERS.BigNumber.from(10).pow(18) )
	//.div(10**18).toNumber();
	console.log("Comparing Decimal Sizes",count,event.returnValues.amount)
	let inResponseTo = event.transactionHash;
	PD.pullTicket(count, function(randomPotatoes){
		insistTX(polygon_web3,()=>{
			return swapNFT_contract.methods.sendPotato(swapper, randomPotatoes, inResponseTo)
		},()=>{
			console.log("Successfully sent "+swapper+' these potatoes:', randomPotatoes)
		})
	})
}

function catch_polygon_events(){	
	polygon_web3.eth.getBlockNumber().then(function(latestBlock){
		if(latestBlock > _.latest_poly_block_scanned){
			console.log({fromBlock:_.latest_poly_block_scanned, toBlock:latestBlock})

			let promise0 = potatoBuy_contract.getPastEvents('allEvents',{fromBlock:_.latest_poly_block_scanned, toBlock:latestBlock},function(e,x){
				if(e) console.error(e)
				if(x)
				x.forEach((event)=>{
					switch(event.event){
						case "BuyPotato":
							catchPotatoSale(event);
						break;
						case "BatchMint":
							console.log("DO THE BATCH MINT THING");
							//catchBatchMint(event);
						break;
					}
				})
			})

			let promise1 = swapNFT_contract.getPastEvents('allEvents',{fromBlock:_.latest_poly_block_scanned, toBlock:latestBlock},function(e,x){
				if(e) console.error(e)
				if(x)
				x.forEach((event)=>{
					if(event.event == "PotatoReceived"){
						catchNFT_swap(event)
					}
				})
			})

			let promise2 = potatoDuel_contract.getPastEvents('allEvents',{fromBlock:_.latest_poly_block_scanned, toBlock:latestBlock},function(e,x){
				if(e) console.error(e)
				if(x)
				x.forEach((event)=>{
					if(event.event == "PotatoDuelGo"){
						catch_duel(event)
					}
				})
			})

			Promise.all([promise0,promise1,promise2]).then(()=>{
				console.log('----------checked Poly----------',_.latest_poly_block_scanned+" >>>> "+latestBlock)
				_.latest_poly_block_scanned = latestBlock+1
				client.query("UPDATE globals SET val="+_.latest_poly_block_scanned+" WHERE name = 'latest_poly_block_scanned'",function(){
					setTimeout(catch_polygon_events,5000)
				})
			})

		}else{
			setTimeout(catch_polygon_events,3000)
		}
	}).catch(err=>{
		console.log(err)
		console.log("\n=========\n=========\n Gonna try continuing catching NFT events")
		catch_polygon_events()
	})
}

function catchNFT_swap(event){
	//put in check to make sure the NFT was sent to the swapNFT contract.
	console.log("NFT received for swap ... going to send BSC Tokens")
	let swapper = event.returnValues.from;
	let thePotatoes = event.returnValues.tokenIds;
	let inResponseTo = event.transactionHash;
	console.log("The potatoes we want to send:", thePotatoes)
	PD.benchTicket(thePotatoes, function(){
		insistTX(bsc_web3,()=>{
			console.log(ETHERS.BigNumber.from(10))
			console.log(ETHERS.BigNumber.from(10).pow(18))
			console.log(ETHERS.BigNumber.from(10).pow(18).mul(thePotatoes.length))
			return swapTOKEN_contract.methods.sendPotato(swapper, ETHERS.BigNumber.from(10).pow(18).mul(thePotatoes.length) , inResponseTo)
		},()=>{
			console.log("Successfully sent "+swapper+' BSC potato Tokens')
		})
	})
}

function catchPotatoSale(event){
	console.log("recieved payment to mint ... going to send POLY POTATO(s)")
	let sender = event.returnValues.sender;
	let count = event.returnValues.amount;
	//let inResponseTo = event.transactionHash;
	PD.batchmint(count, function(rewards){
		insistTX(bsc_web3,()=>{
			let X = ETHERS.BigNumber.from(10).pow(18).mul(count);
			console.log(".-.-.--.-.-.",X)
			return potatoTokenContract.methods.transfer( env.swapToken, X )
		},()=>{
			console.log("Stocked bridge with "+count+" Potato ERC20 tokens ")
			
			insistTX(polygon_web3,()=>{
				return potatoNFT_Contract.methods.mintPotatoHeads(sender, rewards.params)
			},()=>{
				console.log("Successfully purchased and minted by "+sender.substr(0,8)+' these Potato NFTs:', rewards.IDs)
			})
		})
	});
}

function catch_duel(event){
	//put in check to make sure the NFT was sent to the swapNFT contract.
	console.log("NFT received for DUEL ... going to battle")
	//event PotatoDuelGo(address duelist, uint rarity, uint potatoID, uint duelID);
	let duelist = event.returnValues.duelist;
	let playerRarity = event.returnValues.rarity;
	let duelID = event.returnValues.duelID;
	let inResponseTo = event.transactionHash;
	PD.fightTicket(null, function(wildPotato){
		//
		console.log("Player Rarity:", playerRarity)
		console.log("Wild Potato Rarity:", wildPotato.rarity_rank)
		let playerWinning = playerRarity<wildPotato.rarity_rank
		insistTX(polygon_web3,()=>{
			let params = []
			params.push(wildPotato.ID)
			params.push(wildPotato.background)
			params.push(wildPotato.leftarm)
			params.push(wildPotato.rightarm)
			params.push(wildPotato.hat)
			params.push(wildPotato.ears)
			params.push(wildPotato.eyes)
			params.push(wildPotato.nose)
			params.push(wildPotato.mouth)
			params.push(wildPotato.shoes)
			let rare = wildPotato.rarity_rank;
			params.push(rare)
			//6237282755832998000
			let gb = 0;
			if (rare<8888888/20){
				gb = 40
			}else if (rare<8888888/5){
				gb = 30
			}else if (rare<8888888/2){
				gb = 20
			}else{
				gb = 10
			}
			params.push(gb) //gradeBonuses
			
			return potatoNFT_Contract.methods.mintPotatoHeads( (playerWinning)?duelist:adminAddress/*our personal pocket*/, params)

		},()=>{
			console.log("Successfully minted potatoes")
			insistTX(bsc_web3,()=>{
				return potatoTokenContract.methods.transfer( (playerWinning)?env.swapToken:adminAddress, 1)
			},()=>{
				console.log("Successfully sent Potato Token to: "+(playerWinning)?"Bridge":"Admin Address")
				insistTX(polygon_web3,()=>{
					return potatoDuel_contract.methods.finalizeDuel( duelID, wildPotato.ID , (playerWinning), inResponseTo )
				},()=>{
					console.log("Successfully Fianlized the duel: " + duelID )
				})
			})
		})
	})
}



// This would be for Rebooting. Poly and BSC have different rate limits for getting past events. I'll deal with this later.
// This should be a background service in its own VM. It's doing a light weight job. It should be fine if we launch it to just subscribe to the networks.
// If there's a fire, this recovery script can be finished and all events on chain will be available to access and fulfill any swaps that were paused while offline.

// Get Everything up to date since the last time it was online
function GetPastEvents(){
	let promise_from_NFT_contract = potatoNFT_Contract.getPastEvents("");
	let promise_from_TOKEN_contract = potatoTokenContract.getPastEvents("");
}

/*function sendTx(tx, onConfirm){
	tx.send({ from:machineAddress, gasLimit:25000000 })
	.on('transactionHash', function(hash){
	    //console.log("transactionHash: "+hash);
	})
	.on('confirmation', function(N, receipt){
		if(N == 1){
			onConfirm(receipt)
		}
	})
	.on('error', console.error);
}*/


function insistTX(WEB3,txf,donef,timeout){
	//f = function(){return potatoContract.methods.newPieces(names, ipfs_links, metas)}
	function TX(){txf().send({ from:machineAddress, gasLimit: 2500000 }, function(r,hash){
		if(r) throw r;
		console.log( "Tx Hash: ", hash )
		let hashChecks = 0
		function readHash(){
			setTimeout(function(){
				WEB3.eth.getTransactionReceipt(hash)
				.then(function(res){
					//
					if(res === null){
						hashChecks += 1
						console.log("Nothing yet, trying again...", hashChecks)
						readHash();
					}else{
						if(res.status){
							//console.log('res',res.status)
							console.log("Tx Success", hash)
							if(donef)
								donef()
						}else{
							//console.log('res',res.status)
							console.log("Tx Dropped. Attempting again", hash)
							TX();
							//attempt tx again
						}
					}
				}).catch(function(r){
					console.error("------ ====== = ERROR = ====== ------")
					console.error(r)
				})
			},timeout?timeout:5000)	
		}

		readHash();
			
		})
		.catch(function(err){
			console.error("====== = ------ ERROR ------ = ======")
			console.error(err)
		})
	}
	TX();
}