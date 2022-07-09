var keys = require("./keys.js")
var env = {}

//TEST
//if(0)
{
	env = {
		live: false,
		test: true,
		ethProviders:['https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/eth/ropsten', 'https://ropsten.infura.io/v3/'+keys.infura],
		polyProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mumbai/ws'],
		//https://speedy-nodes-nyc.moralis.io/313453df8c4f0c7eb4823465/bsc/testnet/archive
		//bscProviders:['https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet']
		bscProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet/ws']
	}
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

var MUMBAI = false
env.network = MUMBAI;
env.potatoNFT = MUMBAI ? '0x2c9B0abC2d52d48cB4831dB4aAaC1801762856B1':'0x724DFec55777510Ba4006b58c1309567BAE98fA6'
env.swapNFT = MUMBAI ? '0x2878e7F839005474e36f6954EC67FA005c4af15F':'0x27792F8198e0685e6d1577cA8a463788D060cd8a'
env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
env.swapToken = '0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'


module.exports = env