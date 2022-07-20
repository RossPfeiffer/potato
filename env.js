var keys = require("./keys.js")
var env = {}

//TEST
//if(0)
{
	env = {
		live: false,
		test: true,
		ethProviders:[/*'https://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/eth/ropsten',*/ 'https://ropsten.infura.io/v3/'+keys.infura],
		polyProviders:['https://polygon-mumbai.g.alchemy.com/v2/'+keys.alchemy,/*'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/polygon/mumbai/ws'*/],
		bscProviders:['https://thrumming-hidden-paper.bsc-testnet.discover.quiknode.pro/b5ca8ac7b92f0165072a51f9e2f663ec0f48accd/',/*'wss://ws-nd-907-484-822.p2pify.com/'+keys.chainstack,'wss://speedy-nodes-nyc.moralis.io/'+keys.moralis+'/bsc/testnet/ws'*/]
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
env.potatoNFT = MUMBAI ? '0x2c9B0abC2d52d48cB4831dB4aAaC1801762856B1':'0xfc8eE68Afd22Ea304Bd54dB47518A1AEB41CDFeE'
env.swapNFT = MUMBAI ? '0x2878e7F839005474e36f6954EC67FA005c4af15F':'0x0C3Dc3028b13d70D283FB239A48C6379a4b275F4'
env.potatoDuel = MUMBAI ? '0x2878e7F839005474e36f6954EC67FA005c4af15F':'0x7Fc62133F26b36AD7D2BF3252Fb23b7F65c17dD4'
env.potatoToken = '0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89'
env.swapToken = '0x7d3FD5d44bcc9c85bBf4ae8DE0beB3248634F9C8'


module.exports = env