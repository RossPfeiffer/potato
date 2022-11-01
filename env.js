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
	env.swapNFT = MUMBAI ? '0x3bD93Bf80bdAd6244E094C190d0c653bc2948Aa6':'0x3bD93Bf80bdAd6244E094C190d0c653bc2948Aa6'
	env.potatoDuel = MUMBAI ? '0xD4f9276d12AB391CCbd6b394EB9Afe8f72b40d88':'0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'
	env.buyContract = MUMBAI? '0xEd25626a5f7A123BB1dda826a579469816a06b33':'0xEd25626a5f7A123BB1dda826a579469816a06b33'
	env.winspin_poly = '0xECf05aCF49234775034401B5918DE50328eC587D'

	//BINANCE
	env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.swapToken = '0x1fAC9A47FDE227802EFB85b0615b3c2A1e4F1266'
	env.winspin = '0x47142CCAE990e07AE62CD48c92fe308853ed77Ee'
	env.BUSD = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.buyContract_bsc = '0xEF70e9525f5097A2f0dbc9f56569e64C968CD96F'
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