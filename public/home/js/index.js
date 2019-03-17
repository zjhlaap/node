class Banner{
    constructor(){
        this.cont = $("#banner").find(".container");
        this.imgs = this.cont[0].getElementsByTagName("img");
        this.left = $("#banner").find("#left");
        this.right = $("#banner").find("#right");
        this.index = this.imgs.length-1;
        this.iPrev = 0;
        this.init();
        this.move();
        this.autoPlay();
    }
    init(){
        for(let i = 0;i < this.imgs.length;++i){
            let span = $("<span>");
            $(".banner-point").append(span);
        }
        this.pointClick();
    }
    move(){
        var that = this;
        this.left.on("click",function () {
            if(that.index == 0){
                that.index = that.imgs.length-1;
                that.iPrev = 0;
            }else{
                that.iPrev = that.index ;
                that.index --;
            }
            that.changeColorAndChangePicture();
        });
        this.right.on("click",function(){
            if(that.index==that.imgs.length-1){
                that.index=0;
                that.iPrev = that.imgs.length-1;
            }else{
                that.iPrev = that.index;
                that.index++;
            }
            that.changeColorAndChangePicture();

        })
    }
    pointClick(){
        let that =this;
        $(".banner-point").on("click","span",function(){
            that.iPrev = that.index;
            that.index = $(this).index();
           that.changeColorAndChangePicture();
        });
    }
    changeColorAndChangePicture(){
        $(".banner-point span").eq(this.index).addClass("active").siblings().removeClass("active");
        $(this.imgs[this.iPrev]).stop().animate({opacity:0});
        $(this.imgs[this.index]).stop().animate({opacity:1});
    }
    autoPlay(){
        let that = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            if(that.index==that.imgs.length-1){
                that.index=0;
                that.iPrev = that.imgs.length-1;
            }else{
                that.iPrev = that.index;
                that.index++;
            }
            that.changeColorAndChangePicture();
        },2000);
        $(".container").hover(function(){
            clearInterval(that.timer);
        },function(){
            that.timer = setInterval(function () {
                if(that.index==that.imgs.length-1){
                    that.index=0;
                    that.iPrev = that.imgs.length-1;
                }else{
                    that.iPrev = that.index;
                    that.index++;
                }
                that.changeColorAndChangePicture();
            },2000)
        });

    }


}
class SmallBanner{
    constructor(cont){
        this.cont =cont.find(".desc-left");
        this.descList = this.cont.find(".desc-right");
        this.banner = this.cont.find(".desc-banner").find(".small-banner").find("a");
        this.left = this.cont.find(".dire").find(".specialty-left");
        this.right = this.cont.find(".dire").find(".specialty-right");
        this.em = this.cont.find(".subscript").find("em");
        this.cont.find(".subscript").find("i").html(this.banner.length);
        this.index = this.banner.length-1;
        this.iPrev = 0;
        this.current = 1;
        this.init();
        this.move();
    }
    init(){
        var that = this;
        this.left.on("click",function(){
            if(that.index == 0){
                that.index = that.banner.length-1;
                that.iPrev = 0;
            }else{
                that.iPrev = that.index;
                that.index--;
            }
           that.change();
        });
        this.right.on("click",function(){
            if(that.index==that.banner.length-1){
                that.index = 0;
                that.iPrev = that.banner.length-1;
            }else{
                that.iPrev = that.index;
                that.index++;
            }
            that.change();
        });
    }
    move(){
        let that = this;
        clearInterval(this.timer)
        this.timer = setInterval(function(){
            if(that.index == 0){
                that.index = that.banner.length-1;
                that.iPrev = 0;
            }else{
                that.iPrev = that.index;
                that.index--;
            }
            that.change();
        },2000)
        this.cont.hover(function () {
            clearInterval(that.timer);
        },function () {
            this.timer = setInterval(function(){
                if(that.index == 0){
                    that.index = that.banner.length-1;
                    that.iPrev = 0;
                }else{
                    that.iPrev = that.index;
                    that.index--;
                }
                that.change();
            },2000)
        });
    }
    change(){
        this.current = this.index + 1;
        this.em.html(this.current);
        this.banner.eq(this.iPrev).stop().fadeOut();
        this.banner.eq(this.index).stop().fadeIn();
    }

}
class AddCart{
    constructor(){

        $(".product-desc").on("click","a.cart",function () {
            $.ajax({
            url: "/api/addCart",
            dataType: "json",
            data: {
                id: $(this).attr("data-id"),
                type: 1
            },
            success: function(n) {
                if(n.error==0){
                    alert("加入成功")
                }else{
                    if(n.msg==undefined){
                        window.location.href='./login.html'
                    }else{
                        alert(n.msg); 
                    }
                    
                }
            }
        })
        });
        $(".product-desc").on("click","a.detail",function () {
            let id = $(this).attr("data-id");
            window.location.href="./detail.html?id="+id;
        });
    }

}
$(".title-list a").on("click",function(){
   $(this).addClass("active").siblings().removeClass("active");
});
$(document).on("scroll",function(){
    let currentTop = $(this).scrollTop()+$(window).height()-$(window).height()/2
    if(currentTop >= $(".specialty").offset().top){
        $(".floor ul li:eq(0)").addClass("current").siblings().removeClass("current");
        $(".floor").css("display","block").stop().animate({
            top:$(this).scrollTop()+$(window).height()/8-$("#content").offset().top
        })
    }else{
        $(".floor").css("display","none");
    }
    if(currentTop >= $(".food").offset().top){
        $(".floor ul li:eq(1)").addClass("current").siblings().removeClass("current");
    }
    if(currentTop >= $(".drink").offset().top){
        $(".floor ul li:eq(2)").addClass("current").siblings().removeClass("current");
    }
    if(currentTop >= $(".foodstuff").offset().top){
        $(".floor ul li:eq(3)").addClass("current").siblings().removeClass("current");
    }
    if(currentTop >= $(".vegetabes").offset().top){
        $(".floor ul li:eq(4)").addClass("current").siblings().removeClass("current");
    }
    if(currentTop >= $(".alcohol").offset().top){
        $(".floor ul li:eq(5)").addClass("current").siblings().removeClass("current");
    }
    if(currentTop >= $(".nutr").offset().top){
        $(".floor ul li:eq(6)").addClass("current").siblings().removeClass("current");
    }
});
$(".floor ul").find("li").on("click",function(){
    if(!$(this).hasClass("return-top")){
        $(this).addClass("current").siblings().removeClass("current");
        $('html,body').animate({scrollTop: (($(this).index()+1)*660+$("#content").offset().top)}, 800);
    }else{
        $("html,body").animate({scrollTop:0},1000);
    }
});
window.onload = function () {
    if(document.cookie){
        //$(".welcome").html("你好"+document.cookie.split("=")[1]+"欢迎来到蜂狂购");
        $(".banner-login p").html("你好"+document.cookie.split("=")[1]);
        $(".banner-login .login-button").css("display","none");
    }
};
$.ajax({
   url: "/api/product",
    dataType: "json",
    data:{term_id:"5c8b71e84a896b20f8d46802"},
    success:function(n){
        n = n.data;
        for (var i = "",
        e = 0; e < n.length; ++e) i += ' <li><div class="specialty-detials valign"><a href="javascript:;" class="detail" data-id="'.concat(n[e]._id, '">'),
        i += ' <img src="'.concat(n[e].pic, '" alt=""><p>').concat(n[e].desc, '</p><div class="add-cart">\n                            <span>￥').concat(n[e].presentPrice, "</span>\n                                       <s>￥").concat(n[e].originalPrice, '</s>\n                                       <a class="cart" href="javascript:;" data-id="').concat(n[e]._id, '"></a>\n                                   </div>\n                               </a>\n                           </div>\n                       </li>');
        $(".specialty .product-desc").html(i)
    }
});
$(".title-list a").on("click",
function() {
    $(this).addClass("active").siblings().removeClass("active");
    $.ajax({
    url: "/api/product",
    dataType: "json",
    data:{term_id:$(this).attr("data-id")},
    success: function(n) {
        n = n.data;
        for (var i = "",
        e = 0; e < n.length; ++e) i += ' <li><div class="specialty-detials valign"><a href="javascript:;" class="detail" data-id="'.concat(n[e]._id, '">'),
        i += ' <img src="'.concat(n[e].pic, '" alt=""><p>').concat(n[e].desc, '</p><div class="add-cart">\n                            <span>￥').concat(n[e].presentPrice, "</span>\n                                       <s>￥").concat(n[e].originalPrice, '</s>\n                                       <a class="cart" href="javascript:;" data-id="').concat(n[e].id, '"></a>\n                                   </div>\n                               </a>\n                           </div>\n                       </li>');
        $(".specialty .product-desc").html(i)
    }
})
})
 $.ajax({
    url:"/api/banner",
    success:(result)=>{
    var str = '';
    for(var i=0;i<result.data.length;++i){
      str += '<img src='+result.data[i].pic_address+'>';
    }
        $("#banners-container").html(str);
        new Banner();
        new AddCart();
    }
})
