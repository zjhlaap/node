let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	mongo({
		collection:"banner",
		callback:(collection,client,ObjectId)=>{
			collection.deleteOne({
				_id:ObjectId(req.query.id)
			},(err,result)=>{
				client.close();
				if(!err){
					res.redirect("/admin/success?msg=删除成功&url=/admin/banner?dataName=banner");
				}else{
					res.redirect("/admin/error?msg=删除失败&url=/admin/banner?dataName=banner");
				}
			})
		}
	})
})
module.exports = router;