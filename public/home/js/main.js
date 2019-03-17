require.config({
    baseUrl:"/home/js",
    paths:{
        jq:"jquery",
        lo:"login"
    }
});
require(["jq","lo"],function (_,e) {
   new e();
});
