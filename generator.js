//const http = require('http');
const client = require('./connection.js')

var parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];


let potatoCount = 1000

var weightedBuckets = [];

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
	let DNA = mutate();
	if(potatoCount>0){
		for(let i=0;i<9;i++){
			if(DNA[i]===undefined){
				generatePotato();
				return;
			}
		}
		//client.query("SELECT * FROM potatoes WHERE (nose = "+DNA[0]+" AND mouth = "+DNA[1]+" AND hat = "+DNA[2]+" AND eyes = "+DNA[3]+" AND ears = "+DNA[4]+" AND shoes = "+DNA[5]+" AND background = "+DNA[6]+" AND leftarm = "+DNA[7]+" AND  rightarm = "+DNA[8]+")", function(err,res,fields){
			
			//if(err) throw err;
			//console.log(res,fields);

			//if(res.length){
			//	generatePotato()
			//}else{
				client.query("INSERT into potatoes (nose,mouth,hat,eyes,ears,shoes,background,leftarm,rightarm) VALUES ("+DNA[0]+","+DNA[1]+","+DNA[2]+","+DNA[3]+","+DNA[4]+","+DNA[5]+","+DNA[6]+","+DNA[7]+","+DNA[8]+")", function(err,res){
					if(DNA[8]===727)
						console.log("Generated ",DNA);
					generatePotato()
				})
				client.query("UPDATE part_usage SET used=used+1 WHERE( ID="+(DNA[0]+1)+" OR ID="+(DNA[1]+1)+" OR ID="+(DNA[2]+1)+" OR ID="+(DNA[3]+1)+" OR ID="+(DNA[4]+1)+" OR ID="+(DNA[5]+1)+" OR ID="+(DNA[6]+1)+" OR ID="+(DNA[7]+1)+" OR ID="+(DNA[8]+1)+")")
			//}
		//})
	}
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
		let chosen;

		for(let j=0; j<weightedBuckets[i].length && weightedRoll>0; j+=1){
			let part = weightedBuckets[i][j];
			weightedRoll -= part.weight
			if(weightedRoll <= 0){
				chosen = part.ID;
				break;
			}
		}

		DNA[i] = chosen;
	}
	return DNA;
}
