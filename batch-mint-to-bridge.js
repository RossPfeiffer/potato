let BATCHSIZE = 10
let BATCHES = 100
var keys = require("./keys.js")
var env = require("./env.js")
var Web3 = require('web3');
const client = require('./connection.js')

var NETWORK = false
var network = NETWORK ? env.polyProviders[0] : env.ethProviders[0]

const polygon_web3 = new Web3(network)
var blue_machine = polygon_web3.eth.accounts.wallet.add(keys.wallet);

var machineAddress = blue_machine.address;

//Polygon Contracts
var potatoNFT_Address = NETWORK?'0xC8A95D226a86258392D9b997C7be98e08D066E42':'0x59528AB0734b21B036290f2291617661A6eeDE62'//
var potatoNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"potatoID","type":"uint256"}],"name":"MintPotatoHead","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"potatoes","type":"uint256[]"}],"name":"PotatoTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructAttributes","outputs":[{"internalType":"string","name":"JSON","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructDescription","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructName","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructSVG","outputs":[{"internalType":"string","name":"SVG","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPotatoData","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"metascore","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"images","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"metapoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"background","type":"uint256[]"},{"internalType":"uint256[]","name":"leftArm","type":"uint256[]"},{"internalType":"uint256[]","name":"rightArm","type":"uint256[]"},{"internalType":"uint256[]","name":"hat","type":"uint256[]"},{"internalType":"uint256[]","name":"ears","type":"uint256[]"},{"internalType":"uint256[]","name":"eyes","type":"uint256[]"},{"internalType":"uint256[]","name":"nose","type":"uint256[]"},{"internalType":"uint256[]","name":"mouth","type":"uint256[]"},{"internalType":"uint256[]","name":"shoes","type":"uint256[]"},{"internalType":"uint256[]","name":"rarityrank","type":"uint256[]"},{"internalType":"uint256[]","name":"gradeBonus","type":"uint256[]"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"gradeBonus","type":"uint256"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"meta","type":"uint256"}],"name":"newPiece","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"image","type":"string[]"},{"internalType":"string[]","name":"desc","type":"string[]"},{"internalType":"uint256[]","name":"meta","type":"uint256[]"}],"name":"newPieces","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pieces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"potatoTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"potatoes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoNFT_Contract = new polygon_web3.eth.Contract(potatoNFT_ABI, potatoNFT_Address)

var swapNFT_address = '0x5Efbb2FFCD8cA3b9c28Ae3B8395321867913054E'//Poly: 
var swapNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"PotatoReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"SendPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"onPotatoReceived","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var swapNFT_contract = new polygon_web3.eth.Contract(swapNFT_ABI, swapNFT_address)

let sum_of_unminted;
client.connect(function(err){
	if (err) throw err;
	console.log('connected');
	let DNA, result;
	let potatoCount = 0;
	//client.query()
	client.query("SELECT COUNT(*) FROM unminted", function(err,res,fields){
		if (err) throw err;
		console.log( 'RESULTS FROM COUNT unminted for sum_of_unminted', res )
		sum_of_unminted = res[0]['COUNT(*)']
		mintBatch()
	});
	
})

function mintBatch(){
	let query = 'SELECT ID FROM ( SELECT ID, ROW_NUMBER() OVER (ORDER BY stackorder) AS rn FROM bridge ) q WHERE '+(function(){
		var arr = [];
		while(arr.length < BATCHSIZE){
		    var r = Math.floor(Math.random() * sum_of_unminted) + 1;
		    if(arr.indexOf(r) === -1) arr.push(r);
		}
		let q = ''
		arr.forEach((ID,i)=>{
			q+= "rn="+ID
			if(i!==p.length-1){
				q+=' OR '
			}
		})
		return q
	})()+' ORDER BY rn';
	console.log( "query :::::::::: ", query )
}