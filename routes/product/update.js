let router = require("express").Router();
let mongo = require("../../common/mongo");
router.get("/",(req,res)=>{
    
     let commonDate = {
        slides:req.session,
        crumb:"首页",
        active:"follow",
        columnName:req.query.columnName,
        'api_name':"product",
        q:req.query.q,
        time:req.query.time,
        start:req.query.start,
        rule:req.query.rule,
        count:req.query.count,
        id:req.query.id
    }
    mongo({
        collection:"column",
        callback:(collection,client,ObjectId)=>{
            collection.find({}).toArray((err,result)=>{
                commonDate.pid = result;
                mongo({
                    collection:req.query.columnName,
                    callback:(collection,client,ObjectId)=>{
                        collection.find({
                            _id:ObjectId(req.query.id)
                        }).toArray((err,result)=>{
                            client.close();
                            // commonDate.pic = result[0].pic;
                            console.log(result[0].pic)
                            commonDate.result=result[0];
                                res.render("product/update",commonDate)
                        });
                    }
                })
            });
        }
    });
	
});
module.exports = router;