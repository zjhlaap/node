let route = require("express").Router();
let mongo = require("../../common/mongo");
route.get("/",(req,res)=>{
	mongo({
		collection:'follow',
		callback:(collection,client,ObjectId)=>{
			collection.find({}).toArray((err,result)=>{
				res.send({data:result});
			});
		}
	});
})
module.exports = route;