const client = require('./connection.js')
const fs = require('fs');

//configs
const rezDepth = 90;
var chunkResolutions = [];
var collectedData = [];
for(let i=0; i<=rezDepth+10 ;i+=1){ collectedData.push([]) }
for(let i=10; i<=rezDepth+10 ;i+=10){
 chunkResolutions.push( high/i ) 
 collectedData[i].push([])
}
var high;

client.connect( function(err){
	if(err) throw err;
	console.log("retrieving highest metascore value")
	client.query("SELECT metascore FROM potatoes ORDER BY metascore DESC LIMIT 0,1",function(err,res,fields){
		if(err) throw err;
		high = res[0].metascore

		collectData();
	});
})

function collectData(){
	client.query("SELECT * FROM potatoes ORDER BY ID ASC LIMIT "+((batch)*batchSize)+","+(batchSize),function(err,res,fields){
		//
		if(res.length>0){
			res.forEach((potato)=>{
				chunkResolutions.forEach((rez)=>{
					let chunkSize = 8888888/rez;
					let chunk = Math.floor( potato.metascore/chunkSize );
					collectedData[rez][chunk] += 1;
				});
			});
			batch += 1;
			collectData();
		}else{
			let csv = '';
			collectedData.forEach( (resolution,i)=>{
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