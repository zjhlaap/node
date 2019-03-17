require.config({
    shim:{
        "pb":["jq"],
        "dd":["jq"],
        "de":["dd"]
    },
    paths:{
        "jq":"jquery",
        "pb":"public",
        "de":"detail",
        "dd":"detail-default"
    }
});
require(["jq","pb","de","dd"],function(_,__,detail,mr){
    new detail();
});