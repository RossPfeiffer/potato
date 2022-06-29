//const http = require('http');
const client = require('./connection.js')

var parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];


let potatoCount = 8888888
let batchSize = 1000;
var weightedBuckets = [];
let runningScores = [];

for(let i=0;i<9;i+=1){
	weightedBuckets[i] = new Array();
}

doc.forEach( function(part,i){
	//console.log(weightedBuckets)
	if(part.PartType !== ''){
		weightedBuckets[parseInt(part.PartType)].push( { ID:i, weight:part.RARITY } )
	}
})

var bucketSizes = []
for(let i=0;i<9;i+=1){
	//let size = 0;
	bucketSizes[i] = 0;
	weightedBuckets[i].forEach((part)=>{
		bucketSizes[i] += part.weight
	})
}


function generatePotato(){
	let DNA = [];
	if(potatoCount>0){
		for(let i=0; i<batchSize && potatoCount>0; i+=1){
			DNA.push( mutate() )
			potatoCount -= 1
		}

		let tSQL = "INSERT into potatoes (nose,mouth,hat,eyes,ears,shoes,background,leftarm,rightarm) VALUES ";
		let mSQL = '';
		for(let i=0; i<DNA.length; i+=1){
			mSQL += "("+DNA[i][0]+","+DNA[i][1]+","+DNA[i][2]+","+DNA[i][3]+","+DNA[i][4]+","+DNA[i][5]+","+DNA[i][6]+","+DNA[i][7]+","+	DNA[i][8]+")"
			if(i !== DNA.length-1){
				mSQL += ','
			}
		}

		client.query( tSQL+mSQL, function(err,res){
			if(err) throw err;
			generatePotato()
		})
	}else{
		checkForDuplicates()
	}


	/*mSQL = '';
	for(let i=0; i<DNA.length; i+=1){
		mSQL += " UPDATE part_usage SET used=used+1 WHERE( ID="+(DNA[i][0]+1)+" OR ID="+(DNA[i][1]+1)+" OR ID="+(DNA[i][2]+1)+" OR ID="+(DNA[i][3]+1)+" OR ID="+(DNA[i][4]+1)+" OR ID="+(DNA[i][5]+1)+" OR ID="+(DNA[i][6]+1)+" OR ID="+(DNA[i][7]+1)+" OR ID="+(DNA[i][8]+1)+");"
		
	}
	client.query(mSQL)*/

}

function checkForDuplicates(){
	//when this is done, then add up scores.
}

client.connect(function(err){
	if (err) throw err;
	console.log('connected');
	let DNA, result;
	let potatoCount = 0;
	generatePotato()
})

function mutate(){
	let DNA = [];
	let weightedRoll;
	for(let i=0;i<9;i+=1){
		weightedRoll = Math.floor( bucketSizes[i] * Math.random() )
		wr = weightedRoll;
		let chosen;

		for(let j=0; j<weightedBuckets[i].length; j+=1){
			let part = weightedBuckets[i][j];
			weightedRoll -= part.weight
			if(weightedRoll <= 0){
				chosen = part.ID;
				break;
			}
		}
		runningScores[chosen] += 1;
		DNA[i] = chosen;
	}
	return DNA;
}
