let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	mongo({
		collection:"follow",
		callback:(collection,client,ObjectId)=>{
			collection.find({"term_id":req.query.term_id}).toArray((err,result)=>{
				if(!err){
					res.send({error:0,data:result})
				}else{
					res.send({error:1,msg:"未查询到结果"});
				}
			});
		}
	})
})
module.exports = router;