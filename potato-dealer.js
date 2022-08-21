function PotatoDealer(client){
	this.queries = [];
	this.client = client;
	this.bridgeSize = 0;
}
PotatoDealer.prototype.sizeBridge = function(x){this.bridgeSize = x}

PotatoDealer.prototype.fightTicket = function(p,f){
	console.log('A request for a duel')
	this.queries.push({type:'duel',p:p,f:f})
	if(this.queries.length == 1){
		this.next();
	}
};

PotatoDealer.prototype.batchmint = function(p,f){
	console.log('A request for a batchmint')
	this.queries.push({type:'batchmint',p:p,f:f})
	if(this.queries.length == 1){
		this.next();
	}
};

PotatoDealer.prototype.benchTicket = function(p,f){
	console.log('A request for Tokens from a Potato NFT that has been benched')
	this.queries.push({type:'bench',p:p,f:f})
	if(this.queries.length == 1){
		this.next();
	}
};
PotatoDealer.prototype.pullTicket = function(p,f){
	console.log('A request for an NFT from a BSC Tokens deposited')
	this.queries.push({type:'draw',p:p,f:f})
	if(this.queries.length == 1){
		this.next();
	}
};

PotatoDealer.prototype.next = function(){
	//construct query
	let _this = this
	if(this.queries.length>0){
		let work = this.queries[0]//.shift();
		let query = '';

		if(work.type == 'bench'){
			query += 'INSERT INTO bridge (ID) VALUES ';
			work.p.forEach((ID,i)=>{
				query += '('+ID+')'
				if(i!==work.p.length-1){
					query += ','
				}
			})
			console.log("--------------- Running ---------------\n", query)
			this.client.query(query,function(err,res,fields){
				if(err) throw err;
				//run call back to send tokens for the deposited NFTs
				_this.bridgeSize += work.p.length
				console.log("running block tx")
				_this.queries.shift();
				_this.next()
				work.f()
			})
		}

		if(work.type == 'draw'){//RANDOMIZATION HAPPENS AT PULL
			let count = work.p
			query += 'SELECT ID FROM ( SELECT ID, ROW_NUMBER() OVER (ORDER BY stackorder) AS rn FROM bridge ) q WHERE '+(function(){
				console.log("count", count, "bridgeSize", _this.bridgeSize)
				var arr = [];
				while(arr.length < count){
				    var r = Math.floor(Math.random() * _this.bridgeSize) + 1;
				    if(arr.indexOf(r) === -1) {
				    	arr.push(r);
				    	console.log('Randomly Selected Position: ',r)
				    }
				}
				let q = ''
				arr.forEach((ID,i)=>{
					console.log("Row Number ", ID)
					q+= "rn="+ID
					if(i!==count-1){
						q+=' OR '
					}
				})
				return q
			})()+' ORDER BY rn';
			
			this.client.query( query, function(err,res,fields){
				if(err) throw err;
				console.log("RESULTS from complex ROW_NUMBER query", res)
				let query = 'DELETE FROM bridge WHERE ';
				let pIDs= [];
				
				res.forEach((potato,i)=>{
					let pID = potato.ID;
					query += "ID = "+pID;
					if(i !== res.length-1){
						query += ' OR '
					}
					pIDs.push(pID)
				})

				_this.client.query(query,function(err,res,fields){
					if(err) throw err;
					console.log("running block tx")
					_this.bridgeSize -= count
					// subtract from tracked bridge table size.
					_this.queries.shift();
					_this.next()
					work.f(pIDs)
				})
			})
		}

		if(work.type == 'duel'){
			_this.client.query("SELECT COUNT(*) FROM unminted", function(err,res,fields){
				if (err) throw err;
				sum_of_unminted = res[0]['COUNT(*)']
				console.log( 'RESULTS FROM COUNT unminted for sum_of_unminted', res, sum_of_unminted  )

				let pick = Math.floor(Math.random() * sum_of_unminted) + 1
				let query = 'SELECT ID FROM ( SELECT ID, ROW_NUMBER() OVER (ORDER BY ID) AS rn FROM unminted ) q WHERE rn='+pick;
				console.log("Start:::", Date.now() )
				_this.client.query(query,function(err,res,fields){
					console.log("End:::", Date.now() )
					if (err) throw err;
					
					let IDs_of_the_potato_we_need_data_for = res[0].ID;
					/*
					just gonna leave this here.

					SET @r=0;
					UPDATE potatoes SET rarity_rank= @r:= (@r+1) ORDER BY rarity DESC;
					*/
					_this.client.query('SELECT *,rarity_rank FROM potatoes WHERE ID='+IDs_of_the_potato_we_need_data_for,function(err,res,fields){
						if (err) throw err;

						//let params = []
						let wildPotato;
						res.forEach((p)=>{
							wildPotato = p;// ikno	
						})
						
						_this.client.query('DELETE FROM unminted WHERE ID='+IDs_of_the_potato_we_need_data_for,function(err,res,fields){
							console.log('Deleted the minted ID #'+IDs_of_the_potato_we_need_data_for+' from the unminted list...')
							//sum_of_unminted -= BATCHSIZE
							_this.queries.shift();
							_this.next()
							work.f(wildPotato)
							//add them to bridge table	
							/*client.query("INSERT INTO bridge (ID) VALUES "+insert_into_bridge,function(){
								console.log(insert_into_bridge, ":::::: ADDED TO BRIDGE")
								mintBatch()
							})*/
						})

					})

				})
			});
		}

		if(work.type == 'batchmint'){
			_this.client.query("SELECT COUNT(*) FROM unminted", function(err,res,fields){
				if (err) throw err;
				sum_of_unminted = res[0]['COUNT(*)']
				console.log( 'RESULTS FROM COUNT unminted for sum_of_unminted', res, sum_of_unminted  )

				//let pick = Math.floor(Math.random() * sum_of_unminted) + 1
				var BATCHSIZE = work.p
				var arr = [];
				while(arr.length < Math.min(BATCHSIZE,sum_of_unminted) ){
				    var r = Math.floor(Math.random() * sum_of_unminted) + 1;
				    if(arr.indexOf(r) === -1) arr.push(r);
				}

				let Q = ''
				arr.forEach((order_number,i)=>{
					Q+= "rn="+order_number
					if(i!==BATCHSIZE-1){
						Q+=' OR '
					}
				})

				let query = 'SELECT ID FROM ( SELECT ID, ROW_NUMBER() OVER (ORDER BY ID) AS rn FROM unminted ) q WHERE ' + Q;
				console.log("Start:::", Date.now() )
				_this.client.query(query,function(err,res,fields){
					console.log("End:::", Date.now() )
					if (err) throw err;
					
					let IDs_of_the_potato_we_need_data_for = '' // = res[0].ID;
					res.forEach((row,i)=>{
						IDs_of_the_potato_we_need_data_for+= "ID="+row.ID
						if(i!==BATCHSIZE-1){
							IDs_of_the_potato_we_need_data_for+=' OR '
						}
					})
					/*
					just gonna leave this here.

					SET @r=0;
					UPDATE potatoes SET rarity_rank= @r:= (@r+1) ORDER BY rarity DESC;
					*/
					_this.client.query('SELECT *,rarity_rank FROM potatoes WHERE '+IDs_of_the_potato_we_need_data_for,function(err,pBatch,fields){
						if (err) throw err;
						console.log(pBatch);
						//let params = []
						//let wildPotato;
						//pBatch.forEach((p)=>{
						//	wildPotato = p;// ikno	
						//})
						
						_this.client.query('DELETE FROM unminted WHERE '+IDs_of_the_potato_we_need_data_for,function(err,res,fields){
							if (err) throw err;
							console.log('Deleted the minted IDs from the unminted list...',res)
							//sum_of_unminted -= BATCHSIZE
							_this.queries.shift();
							_this.next()
							work.f(pBatch)
							//add them to bridge table	
							/*client.query("INSERT INTO bridge (ID) VALUES "+insert_into_bridge,function(){
								console.log(insert_into_bridge, ":::::: ADDED TO BRIDGE")
								mintBatch()
							})*/
						})

					})

				})
			});
		}
	}
};

module.exports = PotatoDealer