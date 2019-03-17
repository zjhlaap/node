let router = require("express").Router();
let mongo = require("../../../common/mongo");
router.get("/",(req,res)=>{
 	let commonDate = {
        slides:req.session,
        crumb:"product",
        active:"column",
        columnName:"column",
        api_name:"product",
        id:req.query.id
    }
	mongo({
		collection:"column",
		callback:(collection,client,ObjectId)=>{
			 collection.find({_id:ObjectId(req.query.id)}).toArray((err,result)=>{
                client.close();
			 	commonDate.result=result[0];
                    res.render("product/column/update",commonDate)
                });
		}
	});
})
module.exports = router;