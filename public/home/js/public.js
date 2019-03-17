$(document).ready(function(){
    // $(".footer").load("http://localhost/fkg/dist/template/public.html #footer");
    $(".download").hover(function(){
        $(".sj").stop().show().next().stop().show();
    },function () {
        $(".sj").stop().hide().next().stop().hide();
    });
    $(".detail-nav").hover(function () {
        $(this).find("dd").css("display","block");
    });
    $(".header-desc-nav").mouseleave(function () {
        $(".second-menu").css("display","none");
    });
    $(".detail-nav dd").hover(function(){
        $.ajax({
            url: "/api/nav",
            success: function(t) {
                var s =`<li><div class="title">1111<i></i></div><div class="three-catalog">`
                for(var i = 0; i< t.data.length;++i){
                    
                    s += `<a href="./list.html">${t.data[i].name}</a>`;
                    
                }
                s +=`</div></li>`;
                $(".second-menu").html(s)
            }
        })
        $(".second-menu").css({"display":"block","zIndex":99});
    });
    $(".header-desc-nav").on("mouseleave",function () {
        $(".second-menu").css({"display":"none","zIndex":-1});
    });
    // $(".specialty .desc-right .title-list").on("click","a",function () {
    //     $(this).addClass("active").siblings().removeClass("active");
    //     let dataId = parseInt($(this).attr("data-id"));
    //     $.ajax({
    //         url:"http://localhost/fkg/dist/interface/product.php",
    //         dataType:"json",
    //         data:{dataId:dataId},
    //         success:function(res){
    //             let str = ``;
    //             for(let i = 0;i < res.length;++i){
    //                 str+=` <li><div class="specialty-detials valign"><a href="javascript:;" class="detail" data-id="${res[i].id}">`;
    //                 str += ` <img src="${res[i].pic}" alt=""><p>${res[i].desc}</p><div class="add-cart">
    //                         <span>￥${res[i].presentPrice}</span>
    //                                    <s>￥${res[i].originalPrice}</s>
    //                                    <a class="cart" href="javascript:;" data-id="${res[i].id}"></a>
    //                                </div>
    //                            </a>
    //                        </div>
    //                    </li>`;
    //             }
    //             $(".specialty .product-desc").html(str);
    //         }
    //     })
    // });


})
if(document.cookie) {
    $(".welcome").html("你好" + document.cookie.split("=")[1] + "欢迎来到蜂狂购"+"&nbsp;&nbsp;<a href='javascript:;' class='cancel'>注销</a>");
    $(".cancel").on("click",function(){
        let d = new Date();
        d.setDate(d.getDate()-1);
        document.cookie = "user=111; expires="+d;
        window.location.href = "http://localhost/fkg/dist/index.html";
    });
}


