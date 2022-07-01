const client = require('./connection.js')
const fs = require('fs');

//configs
const rezDepth = 90;
var chunkResolutions = [];
var collectedData = [];
for(let i=0; i<=rezDepth+10 ;i+=1){ collectedData.push([]) }
//for(let i=10; i<=rezDepth+10 ;i+=10){
//	console.log('Resolution', high/i)
//	chunkResolutions.push( high/i ) 
//	collectedData[i].push([])
//}
var high;
var batch = 0;
var batchSize = 10000;
client.connect( function(err){
	if(err) throw err;
	console.log("retrieving highest metascore value")
	client.query("SELECT metascore FROM potatoes ORDER BY metascore DESC LIMIT 0,1",function(err,res,fields){
		if(err) throw err;
		high = res[0].metascore
		console.log('Highest Metascore ',high);
		for(let i=10;i<=rezDepth+10; i+=10){
			console.log('Resolution Chunk Size: ', high/i)
			chunkResolutions.push(high/i)
			collectedData[i].push([])
		}
		collectData();
	});
})

function collectData(){
	client.query("SELECT * FROM potatoes ORDER BY ID ASC LIMIT "+((batch)*batchSize)+","+(batchSize),function(err,res,fields){
		//
		if(res.length>0){
			res.forEach((potato)=>{
				chunkResolutions.forEach((chunkSize,i)=>{
					//console.log('pMETA - ',potato.metascore)
					let chunk = Math.floor( potato.metascore/chunkSize );
					//console.log('['+i+']','['+chunk+']','--->'+collectedData[i][chunk])
					if(!collectedData[i][chunk]){
						collectedData[i][chunk] = 1;
					}else{
						collectedData[i][chunk] += 1;
					}
				});
				
			});
			//console.log(collectedData);
			console.log("Batch "+batch+"'s Data Collected"); 
			batch += 1;
			collectData();
		}else{
			let csv = '';
			collectedData.forEach( (resolution)=>{
				csv += '\n'
				
				resolution.forEach( (chunk,i)=>{
					csv += chunk
					if( i != resolution.length-1){
						csv += ','
					}
				})

				fs.writeFile('metascore-data.csv', csv, err => {
				  if (err) {
				    console.error(err);
				  }
				});
			})
			
			client.end();	
		}
	});
}
