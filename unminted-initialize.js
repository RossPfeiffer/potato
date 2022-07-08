const client = require('./connection.js')

let potatoCount = 8888888
let potatoTotal = potatoCount;
let batchSize = 10000;


function stackUnminted(){
	let DNA = [];
	if(potatoCount>0){
		let stack_tSQL = 'INSERT INTO unminted (ID) VALUES ';
		let stack_mSQL = '';
		for(let i=1; i<=batchSize && potatoCount>=0; i+=1){
			stack_mSQL += "("+(potatoCount)+")"
			potatoCount -= 1

			if(i !== batchSize && potatoCount != 0){
				stack_mSQL += ','
			}
		}

		client.query( stack_tSQL+stack_mSQL, function(err,res){
			if(err) throw err;
			console.log("_Unminted Stacked ::: "+potatoCount)
			stackUnminted()
		})
	}else{
		console.log("Done creating stack for the unminted potatoes")
	}
}


client.connect(function(err){
	if (err) throw err;
	console.log('connected');
	let DNA, result;
	let potatoCount = 0;
	stackUnminted()
})
