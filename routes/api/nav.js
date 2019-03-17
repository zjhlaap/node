let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	mongo({
		collection:"nav",
		callback:(collection,client,ObjectId)=>{
			collection.find({}).toArray((err,result)=>{
				if(!err && result.length >0 ){
					res.send({error:0,data:result});
				}
			});
		}
	});
});
module.exports = router;