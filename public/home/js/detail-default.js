let id = window.location.search.split("?")[1].split("=")[1];
$.ajax({
    url:"/api/detail",
    dataType:"json",
    data:{id:id},
    success:function(res){
        res=res.data;
        $(".item-info .show-img").find("img").attr("src",res.pic);
        $(".item-info .item-img").find("a").eq(0).find("img").attr("src",res.pic);
        $(".item-info .big-img").find("img").attr("src",res.pic);
        $(".item-info-center").find("h3").html(res.desc);
        $(".item-info-center").find(".price-intro").find(".original-price").find("s").html(res.originalPrice);
        $(".item-info-center").find(".price-intro").find(".present-price").find("s").html(res.presentPrice);
        $(".item-info-center").find(".buy").find(".add-cart").attr("data-id",res.id);
    }
});
$(".item-info-center .buy .add-cart").on("click",function () {
   $.ajax({
        url: "/api/addCart",
        data: {
            id:id,
            type: 1
        },
        dataType:'json',
        success: function(n) {
           if(n.error==0){
                alert("加入成功")
            }else{
                 if(n.msg==undefined){
                        window.location.href=n.url;
                    }else{
                        alert(n.msg); 
                    }
            }
        }
    })
})
