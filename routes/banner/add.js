let router = require("express").Router();
router.get("/",(req,res)=>{
	let commonDate = {
        slides:req.session,
        crumb:"banner",
        active:"banner",
        columnName:req.query.columnName,
        api_name:"banner",
        title:req.query.title,
        q:req.query.q,
        time:req.query.time,
        start:req.query.start,
        rule:req.query.rule,
        count:req.query.count
    }
    res.render("banner/add",commonDate);
});
module.exports = router;