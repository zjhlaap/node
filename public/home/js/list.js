$(".header-desc-nav").mouseleave(function () {
    $(".detail-nav").find("dd").css("display","none");
});
$.ajax({
    url: "/api/list",
    dataType:"json",
    success:function (res) {
        res = res.data;
        let str1 = "";
        let str2 = "";
        for(let i = 0;i < 4;++i){
            str1 += `<li class="valign" data-id="${res[i]._id}">
                <a href="./detail.html?id=${res[i]._id}">
               <img src="${res[i].pic}" alt="">
               <p class="product-title">${res[i].desc}</p>
               <p class="price">
                   <span class="fl">￥${res[i].presentPrice}</span>
                   <s class="fl">￥${res[i].originalPrice}</s>
               </p>
               </a>
               <a href="javascript:;" class="addCart" data-id="${res[i]._id}">加入购物车</a>
           </li>`
        }
        $.each(res,function(k,v){
            str2 += `<li>
                        <a href="./detail.html?id=${v._id}">
                        <div class="item valign"><img src="${v.pic}" alt="">
                            <p class="item-title">${v.desc}</p>
                            <p class="price">
                                <span class="fl">￥${v.presentPrice}</span>
                                <a href="javascript:;" class="fr addCart" data-id="${v._id}"></a>
                            </p>
                            <p class="gd">销量：3件</p>
                            <p class="gd">评价：0条</p>
                            <p class="gd">店铺：固定的店铺</p>
                        </div>
                        </a> 
                    </li>`
        });
        $(".hot-Product").html(str1);
        $(".product-container dd ul").html(str2);
    }
});
$(".hot-Product").on("click","a.addCart",function(){
    addCart($(this).attr("data-id"));
});
$(".product-container dd ul").on("click","a.addCart",function(){
    addCart($(this).attr("data-id"));
});
function addCart(id){
    $.ajax({
        url: "/api/addCart",
            dataType: "json",
        data: {
            id: id,
            type: 1
        },
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
}