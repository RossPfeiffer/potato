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
		bscProviders:['https://white-rough-hill.bsc-testnet.discover.quiknode.pro/ef21661be620381d975f5ac963a976cef880cbd2/','wss://ws-nd-907-484-822.p2pify.com/'+keys.chainstack,/*'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet/ws'*/]
	}//https://thrumming-hidden-paper.bsc-testnet.discover.quiknode.pro/b5ca8ac7b92f0165072a51f9e2f663ec0f48accd/

	env.network = MUMBAI;
	//POLY
	env.potatoNFT = MUMBAI ? '0x9ee1285facdb4268c1c117a9EFc8A972c332b6E9':'0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.swapNFT = MUMBAI ? '0xeaF08e4a83b24d9346836ECe3F4FA4E0b6443C3D':'0xE6917548C45eD2F040AF8dDda7b7847bc62085bD'
	env.potatoDuel = MUMBAI ? '0xD4f9276d12AB391CCbd6b394EB9Afe8f72b40d88':'0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'
	env.buyContract = MUMBAI? '0xEd25626a5f7A123BB1dda826a579469816a06b33':'0xEd25626a5f7A123BB1dda826a579469816a06b33'
	env.winspin_poly = '0xECf05aCF49234775034401B5918DE50328eC587D'

	//BINANCE
	env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
	env.swapToken = '0x817c625dEBe65AaB6288DCeF951bb2083C39e257'
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