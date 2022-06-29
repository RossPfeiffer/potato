//const http = require('http');
const client = require('./connection.js')

var parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];


let potatoCount = 8888888
let batchSize = 10000;
var weightedBuckets = [];
let runningScores = [];
runningScores.push(0)

for(let i=0;i<9;i+=1){
	weightedBuckets[i] = new Array();
}

doc.forEach( function(part,i){
	//console.log(weightedBuckets)
	if(part.PartType !== ''){
		runningScores.push(0)
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

		let tSQL = "INSERT INTO potatoes (nose,mouth,hat,eyes,ears,shoes,background,leftarm,rightarm) VALUES ";
		let mSQL = '';
		for(let i=0; i<DNA.length; i+=1){
			mSQL += "("+DNA[i][0]+","+DNA[i][1]+","+DNA[i][2]+","+DNA[i][3]+","+DNA[i][4]+","+DNA[i][5]+","+DNA[i][6]+","+DNA[i][7]+","+	DNA[i][8]+")"
			if(i !== DNA.length-1){
				mSQL += ','
			}
		}

		client.query( tSQL+mSQL, function(err,res){
			if(err) throw err;
			console.log("_P "+potatoCount)
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

let doops; 
function checkForDuplicates(){
	//when this is done, then add up scores.
	console.log('Checking for duplicates')
	client.query(`
	SELECT 
	    ID,
	    nose, COUNT(nose),
	    mouth,  COUNT(mouth),
	    hat, COUNT(hat),
	    eyes, COUNT(eyes),
	    ears, COUNT(ears),
	    shoes, COUNT(shoes),
	    background, COUNT(background),
	    leftarm, COUNT(leftarm),
	    rightarm, COUNT(rightarm)
	FROM
	    potatoes
	GROUP BY 
	    nose , 
	    mouth , 
	    hat,
	    eyes,
	    ears,
	    shoes,
	    background,
	    leftarm,
	    rightarm
	HAVING 
	    COUNT(nose) > 1
	    AND COUNT(mouth) > 1
	    AND COUNT(hat) > 1
	    AND COUNT(eyes) > 1
	    AND COUNT(ears) > 1
	    AND COUNT(shoes) > 1
	    AND COUNT(background) > 1
	    AND COUNT(leftarm) > 1
	    AND COUNT(rightarm) > 1;
	`,function(err,res,fields){
		doops = res;
		popDoops();
	})
}

function popDoops(){
	if(doops.length>0){
		let DNA = mutate(true);
		console.log("Checking", DNA)
		client.query("SELECT * FROM potatoes WHERE ( nose="+DNA[0]+" AND mouth="+DNA[1]+" AND hat="+DNA[2]+" AND eyes="+DNA[3]+" AND ears="+DNA[4]+" AND shoes="+DNA[5]+" AND background="+DNA[6]+" AND leftarm="+DNA[7]+" AND rightarm="+DNA[8]+")",(err,res,fields)=>{
			if (err) throw err;
			if(res.length>0){
				console.log("No Good, Re-Roll")
				popDoops()
			}else{
				console.log("Unique-ified")
				let doop = doops[doops.length-1];
				runningScores[doop.nose] -= 1
				runningScores[doop.mouth] -= 1
				runningScores[doop.hat] -= 1
				runningScores[doop.eyes] -= 1
				runningScores[doop.ears] -= 1
				runningScores[doop.shoes] -= 1
				runningScores[doop.background] -= 1
				runningScores[doop.leftarm] -= 1
				runningScores[doop.rightarm] -= 1
				DNA.forEach((attr)=>{
					runningScores[attr] += 1;	
				})
				doops.pop()
				client.query("UPDATE potatoes SET nose="+DNA[0]+",mouth="+DNA[1]+",hat="+DNA[2]+",eyes="+DNA[3]+",ears="+DNA[4]+",shoes="+DNA[5]+",background="+DNA[6]+",leftarm="+DNA[7]+",rightarm="+DNA[8]+" WHERE ID="+doop.ID, (err,res,fields)=>{
					if(err) throw err;
					console.log("Updated to be unique")
					popDoops();
				})
			}
			
		})
	}else{
		console.log("Record Rarity Scores")
		storeRarityCounts();
	}
}

function storeRarityCounts(){
	if(runningScores.length>1){
		let uses = runningScores[runningScores.length-1]
		let used = runningScores.length-1
		client.query("UPDATE part_usage SET used="+uses+" WHERE (ID = "+(used)+")",function(err,res,fields){
			if (err) throw err;
			console.log("updated PartID:"+used+" uses to "+ uses)
			runningScores.pop()
			storeRarityCounts();
		});
	}else{
		console.log("Should be done generating "+potatoCount+" unique potatoes and storing rarity scores for parts... ")
		client.end();
	}
}


client.connect(function(err){
	if (err) throw err;
	console.log('connected');
	let DNA, result;
	let potatoCount = 0;
	generatePotato()
})

function mutate(X){
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

		if(!X){runningScores[chosen+1] += 1;}

		DNA[i] = chosen;
	}
	return DNA;
}
