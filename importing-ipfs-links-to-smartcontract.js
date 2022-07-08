var parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];
var keys = require("./keys.js")
var env = require("./env.js")
var Web3 = require('web3');
//console.log(web3)
var NETWORK = false//poly
var network = NETWORK ? env.polyProviders[0] : env.ethProviders[0]

const web3 = new Web3(network)
var machine = web3.eth.accounts.wallet.add(keys.wallet);
var potatoNFT_Address = NETWORK?'0xC8A95D226a86258392D9b997C7be98e08D066E42':'0x59528AB0734b21B036290f2291617661A6eeDE62'//
var potatoNFT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"potatoID","type":"uint256"}],"name":"MintPotatoHead","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"potatoes","type":"uint256[]"}],"name":"PotatoTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructAttributes","outputs":[{"internalType":"string","name":"JSON","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructDescription","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructName","outputs":[{"internalType":"string","name":"URI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"constructSVG","outputs":[{"internalType":"string","name":"SVG","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"fireWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPotatoData","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"metascore","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"images","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"metapoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256[]","name":"background","type":"uint256[]"},{"internalType":"uint256[]","name":"leftArm","type":"uint256[]"},{"internalType":"uint256[]","name":"rightArm","type":"uint256[]"},{"internalType":"uint256[]","name":"hat","type":"uint256[]"},{"internalType":"uint256[]","name":"ears","type":"uint256[]"},{"internalType":"uint256[]","name":"eyes","type":"uint256[]"},{"internalType":"uint256[]","name":"nose","type":"uint256[]"},{"internalType":"uint256[]","name":"mouth","type":"uint256[]"},{"internalType":"uint256[]","name":"shoes","type":"uint256[]"},{"internalType":"uint256[]","name":"rarityrank","type":"uint256[]"},{"internalType":"uint256[]","name":"gradeBonus","type":"uint256[]"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"background","type":"uint256"},{"internalType":"uint256","name":"leftArm","type":"uint256"},{"internalType":"uint256","name":"rightArm","type":"uint256"},{"internalType":"uint256","name":"hat","type":"uint256"},{"internalType":"uint256","name":"ears","type":"uint256"},{"internalType":"uint256","name":"eyes","type":"uint256"},{"internalType":"uint256","name":"nose","type":"uint256"},{"internalType":"uint256","name":"mouth","type":"uint256"},{"internalType":"uint256","name":"shoes","type":"uint256"},{"internalType":"uint256","name":"rarityrank","type":"uint256"},{"internalType":"uint256","name":"gradeBonus","type":"uint256"}],"name":"mintPotatoHead","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"meta","type":"uint256"}],"name":"newPiece","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"image","type":"string[]"},{"internalType":"string[]","name":"desc","type":"string[]"},{"internalType":"uint256[]","name":"meta","type":"uint256[]"}],"name":"newPieces","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pieces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"potatoTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"potatoes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"workerAddress","type":"address"}],"name":"setWorker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ID","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var potatoContract = new web3.eth.Contract(potatoNFT_ABI, potatoNFT_Address)
//console.log(potatoContract.methods)
//console.log(doc)
let length = doc.length
let chunkSize = NETWORK?10:25;
function uploadBatchOfParts(position){
	if(position>=doc.length){
		return;
	}
	let tail = Math.min(position+chunkSize, doc.length);
	let batch = doc.slice(position, tail)
	//console.log("TAIL - Position = ", tail - position);
	let names = [];
	let ipfs_links = [];
	let metas = [];
	batch.forEach( (part)=>{
		if(part.Name){
			names.push(part.Name);
			ipfs_links.push(part.IPFS);
			metas.push(part.Metapoints);
		}
	});

	if (names.length==0){
		console.log("no more populated rows.")
		return;
	}

	

	function TX(){
		var tx = potatoContract.methods.newPieces(names, ipfs_links, metas)
		tx.send({ from:machine.address, gasLimit: NETWORK?2500000:25000000 }, function(r,hash){
			if(r) throw r;
			console.log( "Hash: ", hash )
			let hashChecks = 0
			function readHash(){
				setTimeout(function(){
					web3.eth.getTransactionReceipt(hash)
					.then(function(res){
						//
						if(res === null){
							hashChecks += 1
							console.log("Nothing yet, trying again...", hashChecks)
							readHash();
							
						}else{
							if(res.status){
								//console.log('res',res.status)
								console.log("Batch #"+(position/chunkSize+1)+" Uploaded")
								if(tail != doc.length){
									uploadBatchOfParts(position+chunkSize);
								}else{
									console.log("should be done")
								}
							}else{
								//console.log('res',res.status)
								console.log("The entire tx failed. Needs to be ran again")
								TX();
								//attempt tx again
							}
						}
					}).catch(function(r){
						console.error("------ ====== = ERROR = ====== ------")
						console.error(r)
					})
				},5000)	
			}

			readHash();
			
		})
		.catch(function(err){
			console.error("====== = ------ ERROR ------ = ======")
			console.error(err)
		})
	}
	TX()

	/*
	.on('transactionHash', function(hash){
	    console.log("transactionHash: "+hash);
	})
	.on('confirmation', function(N, receipt){
		if(N == 1){
			console.log("Batch #"+(position/chunkSize+1)+" Uploaded")
			if(tail != doc.length){
				uploadBatchOfParts(position+chunkSize);
			}
		}
	})
	.on('error', console.error);
	*/
}
uploadBatchOfParts(0);


// unsubscribes the subscription
//subscription.unsubscribe(function(error, success){
//    if(success)
//       console.log('Successfully unsubscribed!');
//});


















/*	
web3.eth.accounts.signTransaction({
	nonce: web3.eth.getTransactionCount('0x2f712f2c2e4EEE913D15CAa8E4709400D61BFBAc'),
	from: machine.address,
	to: potatoAddress,
	value: 0,
	data: data.encodeABI()
}, "0x0ddbb93dbe456aff17bf33fe090b2c8b8e57c278d3dcd686b4955cd4164fbc1d" , (e,hash)=>{
	err(e)
	console.log(hash);
});
*/
//console.log(doc)
/*
var potatoContract = new web3.eth.Contract(abi, potatoAddress)

let data = potatoContract.methods.newPieces(["https://ipfs.io/ipfs/QmTrQWJ65F6ybavUKHW9y9JXGnQMLRV1LHRoSYXyUqgAMx"],["Some Part"])
web3.eth.sendTransaction({
	from: machine.address,
	to: potatoAddress,
	value: 0,
	data: data.encodeABI()
},(e,hash)=>{
	err(e)
	console.log(hash);
});

//machine
*/