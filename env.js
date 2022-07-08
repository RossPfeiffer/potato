var keys = require("./keys.js")
var env = {}

//TEST
//if(0)
{
	env = {
		live: false,
		test: true,
		ethProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/eth/ropsten', 'https://ropsten.infura.io/v3/'+keys.infura],
		polyProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mumbai'],
		bscProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet']
	}
}

//LIVE
if(0)
{
	env = {
		live: true,
		test: false,
		polyProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mainnet'],
		bscProviders:['wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/mainnet'],
	}
}

var MUMBAI = true
env.network = MUMBAI;
env.potatoNFT = MUMBAI ? '0x3963B4b48529c990EF8FC4882f2C03b83b3B91e2':'0xcb8ceea2129ee79fdde35c7d3bc3aa88659aa99f'
env.swapNFT = MUMBAI ? '0x5b4cc928e01b3ba9071d51ac7559e3e08f46d36c':'0xcb8ceea2129ee79fdde35c7d3bc3aa88659aa99f'
env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
env.swapToken = '0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'


module.exports = env