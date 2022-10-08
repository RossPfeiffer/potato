var keys = require("./keys.js")
var env = {}
var MUMBAI = false
	
//TEST
//if(0)
{
	env = {
		live: false,
		test: true,
		ethProviders:[/*'https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/eth/ropsten',*/ 'https://goerli.infura.io/v3/'+keys.infura],
		polyProviders:['https://polygon-mumbai.g.alchemy.com/v2/'+keys.alchemy,/*'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mumbai/ws'*/],
		bscProviders:['https://thrumming-hidden-paper.bsc-testnet.discover.quiknode.pro/b5ca8ac7b92f0165072a51f9e2f663ec0f48accd/','wss://ws-nd-907-484-822.p2pify.com/'+keys.chainstack,/*'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet/ws'*/]
	}//https://thrumming-hidden-paper.bsc-testnet.discover.quiknode.pro/b5ca8ac7b92f0165072a51f9e2f663ec0f48accd/

	env.network = MUMBAI;
	//POLY
	env.potatoNFT = MUMBAI ? '0x9ee1285facdb4268c1c117a9EFc8A972c332b6E9':'0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.swapNFT = MUMBAI ? '0xeaF08e4a83b24d9346836ECe3F4FA4E0b6443C3D':'0xE6917548C45eD2F040AF8dDda7b7847bc62085bD'
	env.potatoDuel = MUMBAI ? '0xD4f9276d12AB391CCbd6b394EB9Afe8f72b40d88':'0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'
	env.buyContract = MUMBAI? '0x199A3C050B4000d1343DD00edE49499C0b0C5BC1':'0x199A3C050B4000d1343DD00edE49499C0b0C5BC1'

	//BINANCE
	env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.swapToken = '0x9365Ed6DE197689b2566Cc971F738A83D3E47853'
	env.winspin = '0x47142CCAE990e07AE62CD48c92fe308853ed77Ee'
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