define(function(){
    class Carts{
        constructor(){
            let that = this;
            $.ajax({
                url:"/api/cart",
                dataType:"json",
                data:{type:2},
                success:function (res) {
                    let str = ''
                   if(res.url !== undefined ){
                        window.location.href= "./login.html";
                   }else{
                        res = res.data;
                         for(let i = 0;i < res.length;++i){
                            str += `<div class="product-desc" data-id="${res[i].id}"><div class="info ">
                                <input type="checkbox" checked class="confirm fl">
                                <img src="${res[i].pic}" alt="" class="fl"> 
                                <div class="intro fl">
                                    <p>${res[i].desc}</p>
                                    <span>规格：500克</span>
                                </div>
                                <p class="price fl">￥ <s>${res[i].presentPrice}</s></p>
                                <div class="count fl">
                                    <input type="text" class="num" value="${res[i].count}">
                                    <input type="button" class="reduce" value="-">
                                    <input type="button" class="add" value="+">
                                </div>
                                <p class="total-price fl">￥<s></s></p>
                                <a href="javascript:;" class="fr del">删除</a>
                            </div>
                        </div>`;
                        }
                        $(".content dl dd div").html(str);
                        that.tx();
                        that.del();
                   }
                }
            });
        }
        tx(){
            let that =this;
            $(".business-checked").on("click",function(){
                if($(this).is(":checked")){
                    $(this).parent().siblings().find(".confirm").prop("checked",true);
                    $(".all-checkbox").prop("checked",true);
                }else{
                    $(this).parent().siblings().find(".confirm").prop("checked",false);
                    $(".all-checkbox").prop("checked",false);
                }
            });
            $(".confirm").on("click",function(){
                if($(this).is(":checked")){
                    let allChecked = $(this).parent().parent().siblings().find(".confirm");
                    let onOff = true;
                    $.each(allChecked,function(k,v){
                        if(!$(v).is(":checked")){
                            onOff = false;
                        }
                    });
                    if(onOff){
                        $(".business-checked").prop("checked",true);
                        $(".all-checkbox").prop("checked",true);
                    }
                }else{
                    $(this).parent().parent().siblings().find(".business-checked").prop("checked",false);
                    $(".all-checkbox").prop("checked",false);
                }
            });
            $(".all-checkbox").on("click",function () {
                if($(this).is(":checked")){
                    $(".business-checked").prop("checked",true);
                    $(".confirm").prop("checked",true);
                }else{
                    $(".business-checked").prop("checked",false);
                    $(".confirm").prop("checked",false);
                }
            });


            this.price();
            $(".num").on("input",function(){
                that.price($(this).parent().siblings(".total-price"));
                that.cartCount = parseInt($(this).val());
                that.cartId = parseInt($(this).parent().parent().parent().attr("data-id"));
                that.count();
            });
            $(".reduce").on("click",function(){
                let count =  $(this).siblings(".num").val()-1;
                if(count<=0){
                    count=1;
                }
                $(this).siblings(".num").val(count);
                that.price($(this).parent().siblings(".total-price"));
                that.cartCount = parseInt($(this).siblings(".num").val());
                that.cartId = parseInt($(this).parent().parent().parent().attr("data-id"));
                that.count();
            })
            $(".add").on("click",function(){
                let count = parseInt( $(this).siblings(".num").val())+1;
                $(this).siblings(".num").val(count);
                that.price($(this).parent().siblings(".total-price"));
                that.cartCount = parseInt($(this).siblings(".num").val());
                that.cartId = parseInt($(this).parent().parent().parent().attr("data-id"));
                that.count();
            })
        }
        count(){
            $.ajax({
                url:"http://localhost/fkg/dist/interface/delCart.php",
                data:{id:this.cartId,count:this.cartCount,type:2},
                success:function () {

                }
            })
        }
        price(ele){
            let count = 0;
            let allPrice = 0;
            if(!ele){
                $.each($(".total-price"),function(k,v){
                    let val = $(v).siblings(".count").find(".num").val();
                    let sl = $(v).siblings(".price").find("s").html();
                    $(v).find("s").html((val*sl).toFixed(2));
                    count +=  parseInt(val);
                    allPrice += (val*sl);
                })
            }else{
                count = parseInt($("dt .num").find("i").html());
                $(ele).find("s").html(($(ele).siblings(".price").find("s").html()*$(ele).siblings(".count").find(".num").val()).toFixed(2));
                count = 0;
                allPrice = 0;
                $.each($(".total-price"),function(k,v){
                    let val = $(v).siblings(".count").find(".num").val();
                    let sl = $(v).siblings(".price").find("s").html();
                    count +=  parseInt(val);
                    allPrice += (val*sl);
                })
            }
            $("dt .num").find("i").html(count);
            $("dt .total-money").find("em.money").html(allPrice.toFixed(2))
        }
        del(){
            $(".del").on("click",function () {
                let count = parseInt($(this).siblings(".count").children(".num").val());
                let price = parseInt($(this).siblings(".total-price").children("s").html());
                let id = $(this).parent().parent().attr("data-id");
                $("dt .num").children("i").html(parseInt($("dt .num").children("i").html())-count);
                $("dt .total-money").children("em.money").html(parseInt($("dt .total-money").children("em.money").html())-price);
                $(this).parent().parent().remove();
                $.ajax({
                    url:'http://fkg/dist/interface/delCart.php',
                    dataType: "json",
                    data:{id:id},
                    success:function () {
                        
                    }
                });

            });
        }


    }
    return Carts;
});
