let routes = require("express").Router();
let mongo = require("../common/mongo");
routes.get("/",(req,res)=>{
	rule = req.query.rule ? req.query.rule: 'time'
    let commonDate = {
        slides:req.session,
        crumb:"banner",
        active:"banner",
        columnName:"banner",
        api_name:"banner",
        q:req.query.q,
        time:req.query.time,
        start:req.query.start,
        title:req.query.title,
        rule,
        count:req.query.count
    }
     mongo({
        collection:"banner",
        callback:(collection,client,ObjectId)=>{
                collection.find({},{
                        sort: rule ? { [rule]: -1 } : { 'time': -1 },
                    }).toArray((err,result)=>{
                    client.close();
                    commonDate.pageDate = {data:result};
                    res.render("banner",commonDate)
                });
        }
    });
    // res.render("banner",commonDate);
});
routes.use("/add",require("./banner/add"))
routes.use("/add_post",require("./banner/add_post"));
routes.use("/del",require("./banner/del"));
routes.use("/update",require("./banner/update"));
routes.use("/update_post",require("./banner/update_post"));
module.exports = routes;