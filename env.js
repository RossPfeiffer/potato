var keys = require("./keys.js")
var env = {}

//TEST
//if(0)
{
	env = {
		live: false,
		test: true,
		ethProviders:[ 'https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/eth/ropsten', 'https://ropsten.infura.io/v3/'+keys.infura],
		polyProviders:['https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mumbai'],
		bscProviders:['https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet']
	}
}

//LIVE
if(0)
{
	env = {
		live: true,
		test: false,
		polyProviders:['https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mainnet'],
		bscProviders:['https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/mainnet'],
	}
}

module.exports = env