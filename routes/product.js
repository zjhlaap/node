let routes = require("express").Router();
let mongo = require("../common/mongo");
routes.get("/",(req,res)=>{
   
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
    
    res.render("product",commonDate);
});
routes.use("/column",require("./product/column"));
routes.use("/add",require("./product/add"));
routes.use("/add_post",require("./product/add_post"));
routes.use("/del",require("./product/del"));
routes.use("/follow",require("./product/follow"));
routes.use("/update",require("./product/update"));
routes.use("/update_post",require("./product/update_post"));

module.exports = routes;