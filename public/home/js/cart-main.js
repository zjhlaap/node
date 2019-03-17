require.config({
    baseUrl:"/home/js",
    paths:{
        jq:"jquery",
        pb:"public",
        cr:"cart"
    }
});
require(['jq','pb',"cr"],function (a,b,c) {
   new c();
});