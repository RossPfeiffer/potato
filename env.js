var keys = require("./keys.js")
var env = {}
var MUMBAI = false
	
//TEST
//if(0)
{
	env = {
		live: false,
		test: true,
		ethProviders:[/*'https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/eth/ropsten',*/ 'https://ropsten.infura.io/v3/'+keys.infura],
		polyProviders:['https://polygon-mumbai.g.alchemy.com/v2/'+keys.alchemy,/*'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mumbai/ws'*/],
		bscProviders:['https://thrumming-hidden-paper.bsc-testnet.discover.quiknode.pro/b5ca8ac7b92f0165072a51f9e2f663ec0f48accd/','wss://ws-nd-907-484-822.p2pify.com/'+keys.chainstack,/*'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet/ws'*/]
	}//https://thrumming-hidden-paper.bsc-testnet.discover.quiknode.pro/b5ca8ac7b92f0165072a51f9e2f663ec0f48accd/

	env.network = MUMBAI;
	//POLY
	env.potatoNFT = MUMBAI ? '0x9ee1285facdb4268c1c117a9EFc8A972c332b6E9':'0xE08549fB0BEa283d8CC99ED9F062EEa6CF956abb'
	env.swapNFT = MUMBAI ? '0xeaF08e4a83b24d9346836ECe3F4FA4E0b6443C3D':'0xFbEb0a02831844bfE1849caEc6949318bC97E201'
	env.potatoDuel = MUMBAI ? '0xcE09E991efb947c64D29D0ca17F1b00D4BCe1dc5':'0x6ce78Ad3552ed9Dc46e3dEdf04c12197a6691594'

	//BINANCE
	env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.swapToken = '0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'
	env.winspin = '0x7EE6220F00c8AFB4F0533e83A8A8cd95cFb1729D'
	env.BUSD = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
}

//LIVE
if(0)
{
	env = {
		live: true,
		test: false,
		polyProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mainnet/ws'],
		bscProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/mainnet/ws'],
	}
}



module.exports = env