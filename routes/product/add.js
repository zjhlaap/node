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
        count:req.query.count
    }
    mongo({
        collection:"column",
        callback:(collection,client,ObjectId)=>{
            collection.find({}).toArray((err,result)=>{
                client.close();
                commonDate.pid = result;
                res.render("product/add",commonDate);
            });
        }
    })
    
});
module.exports = router;