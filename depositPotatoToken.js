var keys = require("./keys.js")
var env = require("./env.js")
var Web3 = require('web3');


const bsc_web3 = new Web3(env.bscProviders[0])
var machine = bsc_web3.eth.accounts.wallet.add(keys.wallet);

//Binance Contracts
var potatoTokenABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
var potatoTokenContract = new bsc_web3.eth.Contract(potatoTokenABI, env.potatoToken)

var swapTOKEN_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"forWhom","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositPotatoToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SendPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forWhom","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositPotatoToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var swapTOKEN_contract = new bsc_web3.eth.Contract(swapTOKEN_ABI, env.swapToken)


insistTX(()=>{
	console.log("going for the approve of the erc20 token")
	return potatoTokenContract.methods.approve(env.swapToken, 1)
},()=>{
	console.log("Approved swap contracts use of potatoTokenContract["+ env.potatoToken+']')
	console.log('attempting to deposit tokens into contract')
	insistTX(()=>{
		return swapTOKEN_contract.methods.depositPotatoToken(machine.address, 1)
	},()=>{
		console.log(machine.address,"should have an NFT now")
	})
	
})

function insistTX(txf,donef,timeout){
	function TX(){txf().send({ from:machine.address, gasLimit: 27000000 }, function(r,hash){
		if(r) throw r;
		console.log( "Tx Hash: ", hash )
		let hashChecks = 0
		function readHash(){
			setTimeout(function(){
				bsc_web3.eth.getTransactionReceipt(hash)
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