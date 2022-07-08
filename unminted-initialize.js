const client = require('./connection.js')

let potatoCount = 8888888
let potatoTotal = potatoCount;
let batchSize = 10000;


function stackUnminted(){
	let DNA = [];
	if(potatoCount>0){
		for(let i=0; i<batchSize && potatoCount>0; i+=1){
			DNA.push( mutate() )
			potatoCount -= 1
		}

		let stack_tSQL = 'INSERT INTO unminted (ID) VALUES ';
		let stack_mSQL = '';
		for(let i=0; i<DNA.length; i+=1){
			stack_mSQL += "("+(potatoTotal-potatoCount+i)+")"
			if(i !== DNA.length-1 ){
				stack_mSQL += ','
			}
		}

		client.query( stack_tSQL+stack_mSQL, function(err,res){
			if(err) throw err;
			console.log("_P "+potatoCount)
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
