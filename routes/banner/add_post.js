let router = require("express").Router();
let mongo = require("../../common/mongo");
router.post("/",(req,res)=>{
	mongo({
		collection:"banner",
		callback:(collection,client,ObjectId)=>{
			collection.insertOne({
				"pic_address":req.ppp,
				 time:Date.now()
			},(err,result)=>{
				client.close();
				  if(!err && result.result.n>0){
                    res.send({error:0,msg:"插入成功",url:"/admin/banner?columnName=banner"});
                }else{
                    res.send({error:1,msg:"插入失败"})
                }
			})
		}
	});
}); 
module.exports = router;