let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	mongo({
		collection:"follow",
		callback:(collection,client,ObjectId)=>{
			collection.find({_id:ObjectId(req.query.id)}).toArray((err,result)=>{
				res.send({data:result[0]});
			});
		}
	});
});

module.exports = router;