let router = require("express").Router();
router.get("/",(req,res)=>{
	 let commonDate = {
        slides:req.session,
        crumb:"首页",
        active:"slideNav",
        columnName:req.query.columnName,
        'api_name':"slideNav",
        q:req.query.q,
        time:req.query.time,
        start:req.query.start,
        rule:req.query.rule,
        count:req.query.count
    }
	res.render("slidenav/add",commonDate);
});
module.exports = router;