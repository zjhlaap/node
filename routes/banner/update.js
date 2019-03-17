let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
	 let commonDate = {
        slides:req.session,
        crumb:"banner",
        active:"banner",
        columnName:"banner",
        api_name:"banner",
        id:req.query.id
    }
	mongo({
		collection:"banner",
		callback:(collection,client,ObjectId)=>{
			 collection.find({_id:ObjectId(req.query.id)}).toArray((err,result)=>{
                client.close();
			 	commonDate.result=result[0];
                    res.render("banner/update",commonDate)
                });
		}
	});
});
module.exports = router;