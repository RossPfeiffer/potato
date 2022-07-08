let BATCHSIZE = 10
let BATCHES = 100
var keys = require("./keys.js")
var env = require("./env.js")
var Web3 = require('web3');
const client = require('./connection.js')

var NETWORK = env.network
var network = env.network ? env.polyProviders[0] : env.ethProviders[0]


const polygon_web3 = new Web3(network)
var blue_machine = polygon_web3.eth.accounts.wallet.add(keys.wallet);

var machineAddress = blue_machine.address;

//Polygon Contracts
var potatoNFT_Address = env.potatoNFT
var potatoNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"potatoID","type":"uint256"}],"name":"MintPotatoHead","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"potatoes","type":"uint256[]"}],"name":"PotatoTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructAttributes","outputs":[{"internalType":"string","name":"JSON","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructDescription","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructName","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructSVG","outputs":[{"internalType":"string","name":"SVG","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPotatoData","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"metascore","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"images","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"metapoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"gradeBonus","type":"uint256"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"background","type":"uint256[]"},{"internalType":"uint256[]","name":"leftArm","type":"uint256[]"},{"internalType":"uint256[]","name":"rightArm","type":"uint256[]"},{"internalType":"uint256[]","name":"hat","type":"uint256[]"},{"internalType":"uint256[]","name":"ears","type":"uint256[]"},{"internalType":"uint256[]","name":"eyes","type":"uint256[]"},{"internalType":"uint256[]","name":"nose","type":"uint256[]"},{"internalType":"uint256[]","name":"mouth","type":"uint256[]"},{"internalType":"uint256[]","name":"shoes","type":"uint256[]"},{"internalType":"uint256[]","name":"rarityrank","type":"uint256[]"},{"internalType":"uint256[]","name":"gradeBonus","type":"uint256[]"}],"name":"mintPotatoHeads","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"meta","type":"uint256"}],"name":"newPiece","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"image","type":"string[]"},{"internalType":"string[]","name":"desc","type":"string[]"},{"internalType":"uint256[]","name":"meta","type":"uint256[]"}],"name":"newPieces","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pieces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"potatoTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"potatoes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoNFT_Contract = new polygon_web3.eth.Contract(potatoNFT_ABI, potatoNFT_Address)

var swapNFT_address = '0x5Efbb2FFCD8cA3b9c28Ae3B8395321867913054E'
var swapNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"PotatoReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"SendPotato","type":"event"},{"inputs":[],"name":"FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"onPotatoReceived","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"sendPotato","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var swapNFT_contract = new polygon_web3.eth.Contract(swapNFT_ABI, swapNFT_address)

let sum_of_unminted;
client.connect(function(err){
	if (err) throw err;
	console.log('connected');
	let DNA, result;
	//client.query()
	client.query("SELECT COUNT(*) FROM unminted", function(err,res,fields){
		if (err) throw err;
		sum_of_unminted = res[0]['COUNT(*)']
		console.log( 'RESULTS FROM COUNT unminted for sum_of_unminted', res, sum_of_unminted  )
		
		mintBatch()
	});
	
})

function mintBatch(){
	if(BATCHES==0){
		console.log("Done with batches")
		return
	}
	var arr = [];
	while(arr.length < Math.min(BATCHSIZE,sum_of_unminted) ){
	    var r = Math.floor(Math.random() * sum_of_unminted) + 1;
	    if(arr.indexOf(r) === -1) arr.push(r);
	}
	let Q = ''
	arr.forEach((order_number,i)=>{
		Q+= "rn="+order_number
		if(i!==BATCHSIZE-1){
			Q+=' OR '
		}
	})
	let query = 'SELECT ID FROM ( SELECT ID, ROW_NUMBER() OVER (ORDER BY ID) AS rn FROM unminted ) q WHERE '+Q+' ORDER BY rn';
	console.log( "QUERY :::::::::: ", query ," :::::::::: ")
	if(arr.length){
		client.query(query,function(err,res,fields){
			if (err) throw err;
			console.log("Pulled "+BATCHSIZE+" random potato IDs",res)
			let ID_query_chain = ''	
			res.forEach((row,i)=>{
				ID_query_chain+= "ID="+row.ID
				if(i!==res.length-1){
					ID_query_chain+=' OR '
				}
			})
			console.log( "RUNNING ID PULLING QUERY :::::::::::::::::::: ")
			client.query('SELECT *,ROW_NUMBER() OVER (ORDER BY rarity DESC) AS rare FROM potatoes WHERE '+ID_query_chain,function(err,res,fields){
				if (err) throw err;
				console.log("Pulled "+BATCHSIZE+" random potatoes with attributes",res)
				let leftArms = []
				let rightArms = []
				let hats = []
				let ears = []
				let eyes= []
				let noses = []
				let mouths = []
				let shoes = []
				let backgrounds = []
				let rarityRanks = []
				let gradeBonuses = []
				res.forEach((p)=>{
					leftArms.push(p.leftarm)
					rightArms.push(p.rightarm)
					hats.push(p.hat)
					ears.push(p.ears)
					eyes.push(p.eyes)
					noses.push(p.nose)
					mouths.push(p.mouth)
					shoes.push(p.shoes)
					backgrounds.push(p.background)
					rarityRanks.push(p.rare)
					gradeBonuses.push(0)
				})
				
				insistTX(()=>{
					return potatoNFT_Contract.methods.mintPotatoHeads(env.swapNFT,backgrounds, leftArms, rightArms, hats, ears, eyes, noses, mouths,shoes, rarityRanks,gradeBonuses)
				},()=>{
					console.log('Batch #'+BATCHES+' minted, deleting IDs from the list of unminted potatoes:::', ID_query_chain)
					BATCHES -=1

					client.query('DELETE FROM unminted WHERE '+ID_query_chain,function(err,res,fields){
						console.log('Deleted the minted IDs from the unminted list... checking for next batch to mint')
						sum_of_unminted -= BATCHSIZE
						mintBatch()	
					})
					
				})


			})
			//collect ID's & remove them once batch mint is successful
			//
		})
	}else{
		console.log("BATCHSIZE is 0, which could mean that all 8888888 have been minted ....\nFINISHED")
	}

}

function insistTX(txf,donef,timeout){
	//f = function(){return potatoContract.methods.newPieces(names, ipfs_links, metas)}
	function TX(){txf().send({ from:machineAddress, gasLimit: NETWORK?2500000:25000000 }, function(r,hash){
		if(r) throw r;
		console.log( "Tx Hash: ", hash )
		let hashChecks = 0
		function readHash(){
			setTimeout(function(){
				polygon_web3.eth.getTransactionReceipt(hash)
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