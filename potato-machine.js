var keys = require("./keys.js")
var env = require("./env.js")
var Web3 = require('web3');
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
const bsc_web3 = new Web3( new Web3.providers.WebsocketProvider(env.bscProviders[0]) )
var orange_machine = bsc_web3.eth.accounts.wallet.add(keys.wallet);

var machineAddress = orange_machine.address;

//Polygon Contracts
var potatoNFT_Address = env.potatoNFT
var potatoNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"potatoes","type":"uint256[]"}],"name":"PotatoTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructAttributes","outputs":[{"internalType":"string","name":"JSON","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructDescription","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructName","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructSVG","outputs":[{"internalType":"string","name":"SVG","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPotatoData","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"metascore","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"images","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"metapoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"UINTs","type":"uint256[]"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"UINTs","type":"uint256[]"}],"name":"mintPotatoHeads","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"meta","type":"uint256"}],"name":"newPiece","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"image","type":"string[]"},{"internalType":"string[]","name":"desc","type":"string[]"},{"internalType":"uint256[]","name":"meta","type":"uint256[]"}],"name":"newPieces","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pieces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"potatoTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"potatoes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoNFT_Contract = new polygon_web3.eth.Contract(potatoNFT_ABI, potatoNFT_Address)

var swapNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"PotatoReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"SendPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"onPotatoReceived","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var swapNFT_contract = new polygon_web3.eth.Contract(swapNFT_ABI, env.swapNFT)

var potatoDuel_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"duelist","type":"address"},{"indexed":false,"internalType":"uint256","name":"rarity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"potatoID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duelID","type":"uint256"}],"name":"PotatoDuel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"PotatoReceived","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"duelID","type":"uint256"},{"internalType":"uint256","name":"wildPotatoID","type":"uint256"},{"internalType":"bool","name":"WIN","type":"bool"}],"name":"finalizeDuel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"onPotatoReceived","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoDuel_contract = new polygon_web3.eth.Contract(potatoDuel_ABI, env.potatoDuel)

//Binance Contracts
var potatoERC_Address = env.potatoToken//
var potatoTokenABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
var potatoTokenContract = new bsc_web3.eth.Contract(potatoTokenABI, potatoERC_Address)

var swapTOKEN_address = env.swapToken//
var swapTOKEN_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"forWhom","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositPotatoToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SendPotato","type":"event"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"forWhom","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositPotatoToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var swapTOKEN_contract = new bsc_web3.eth.Contract(swapTOKEN_ABI, swapTOKEN_address)


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

	catchTokens()
	catch_polygon_events()
	catchDuels()
}

function catchTokens(){
	function catchToken_swap(event){
		console.log("Tokens received ... going to send POLY POTATO")
		let swapper = event.returnValues.from;
		let count = event.returnValues.amount;
		PD.pullTicket(count, function(randomPotatoes){
			insistTX(polygon_web3,()=>{//917954
				return swapNFT_contract.methods.sendPotato(swapper, randomPotatoes)//swapTOKEN_contract.methods.sendPotato(swapper, thePotatoes.length)
			},()=>{
				console.log("Successfully sent "+swapper+' these potatoes:', randomPotatoes)
			})
		})
	}
	bsc_web3.eth.getBlockNumber().then(function(latestBlock){

		if(latestBlock > _.latest_bsc_block_scanned){
			swapTOKEN_contract.getPastEvents('allEvents',{fromBlock:_.latest_bsc_block_scanned, toBlock:latestBlock},function(e,x){
				console.log('----------checked bsc---------- ',_.latest_bsc_block_scanned+" >>>> "+latestBlock)
				if(e) console.error(e)
				if(x)
				x.forEach((event)=>{
					if(event.event == "DepositPotatoToken"){
						catchToken_swap(event)
					}
				})
				_.latest_bsc_block_scanned = latestBlock+1
				client.query("UPDATE globals SET val="+_.latest_bsc_block_scanned+" WHERE name = 'latest_bsc_block_scanned'",function(){
					setTimeout(catchTokens,30000)
				})
			})
		}else{
			setTimeout(catchTokens,3000)
		}
	}).catch(err=>{
		console.log(err)
		console.log("\n=========\n=========\n Gonna try continuing catching tokens events")
		catchTokens()
	})
}
function catch_polygon_events(){
	
	polygon_web3.eth.getBlockNumber().then(function(latestBlock){
		if(latestBlock > _.latest_poly_block_scanned){
			//console.log("latestBlock",latestBlock)
			//console.log("_.latest_poly_block_scanned",_.latest_poly_block_scanned)
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

			Promise.all([promise1,promise2]).then(()=>{
				console.log('----------checked Poly----------',_.latest_poly_block_scanned+" >>>> "+latestBlock)
				_.latest_poly_block_scanned = latestBlock+1
				client.query("UPDATE globals SET val="+_.latest_poly_block_scanned+" WHERE name = 'latest_poly_block_scanned'",function(){
					setTimeout(catch_polygon_events,30000)
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
	console.log("The potatoes we want to send:", thePotatoes)
	PD.benchTicket(thePotatoes, function(pCount){
		insistTX(bsc_web3,()=>{
			return swapTOKEN_contract.methods.sendPotato(swapper, thePotatoes.length)
		},()=>{
			console.log("Successfully sent "+swapper+' BSC potato Tokens')
		})
	})
}

function catch_duel(event){
	//put in check to make sure the NFT was sent to the swapNFT contract.
	console.log("NFT received for DUEL ... going to battle")
	//event PotatoDuelGo(address duelist, uint rarity, uint potatoID, uint duelID);
	let duelist = event.returnValues.duelist;
	let playerRarity = event.returnValues.rarity;
	let duelID = event.returnValues.duelID;
	PD.fightTicket(null, function(wildPotato){
		//
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
			params.push(wildPotato.rarity_rank)
			params.push(0) //gradeBonuses
			
			return potatoNFT_Contract.methods.mintPotatoHeads( (playerRarity>wildPotato.rarity_rank)?duelist:machineAddress/*our personal pocket*/, params)

		},()=>{
			console.log("Successfully ... did transaction")
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