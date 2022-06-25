const http = require('http');
const client = require('./connection.js')

var parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];


let potatoCount = 8888888

weightedBuckets = [];
for(let i=0;i<9;i+=1){
	weightedBuckets.push([])
}

doc.forEach( function(part,i){
	weightedBuckets[part.PartType].push( { ID:i, weight:part.RARITY } )
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
		client.query("SELECT * FROM potatoes WHERE ( nose = "+DNA[0]+", mouth = "+DNA[1]+", hat = "+DNA[2]+", eyes = "+DNA[3]+", ears = "+DNA[4]+", shoes = "+DNA[5]+", background = "+DNA[6]+", leftArm = "+DNA[7]+", rightArm = "+DNA[8]+" )", function(err,res,fields){
			
			if(err) throw err;
			console.log(res,fields);

			if(res.length){
				generatePotato()
			}else{
				client.query("INSERT into potatoes (nose,mouth,hat,eyes,ears,shoes,background,leftarm,rightarm) VALUES ("+DNA[0]+","+DNA[1]+","+DNA[2]+","+DNA[3]+","+DNA[4]+","+DNA[5]+","+DNA[6]+","+DNA[7]+","+DNA[8]+")", function(err,res){
					generatePotato()
				})
			}
		})
	}
}

client.connect(async function(){
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