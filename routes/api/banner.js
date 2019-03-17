let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	mongo({
		collection:'banner',
		callback:(collection,client,ObjectId)=>{
			collection.find({},{sort:{'time':-1},limit:5}).toArray((err,result)=>{
				if(!err){
					res.send({error:0,data:result})
				}else{
					res.send({error:1,msg:'获取失败'})
				}
			});
		}
	});
});
module.exports = router;