define(function(){
    class Detail {
        constructor(){
            this.oSpan = $(".show-img").children("span");
            this.BigImgBox = $(".big-img");
            this.BigImg = this.BigImgBox.children("img");
            this.smallImg = $(".show-img").children("img");
            this.oP = $(".show-img").children("p");
            this.imgs = $(".item-img-list").find("a").find("img");
            this.left = $(".item-img .dire").find("#left");
            this.right = $(".item-img .dire").find("#right");
            this.index = 0;
            this.init();
            this.change();
            this.move();
        }
        init(){
            let that = this;
            this.oP.hover(function(){
                that.oSpan.css("display","block");
                that.BigImgBox.css("display","block");
                let myMaxL = that.smallImg.width() - that.oSpan.width();
                let myMaxT = that.smallImg.height() - that.oSpan.height();
                that.oP.on("mousemove",function(eve){
                    let l = eve.offsetX - that.oSpan.width()/2 - 5;
                    let t = eve.offsetY - that.oSpan.height()/2  - 5;
                    if(l<10) l =10;
                    if(t<10)t =10;
                    if(l>myMaxL) l =myMaxL + 10;
                    if(t>myMaxT)t = myMaxT + 10;
                    let x = l / (myMaxL+10);
                    let y = t / (myMaxT+10);
                    that.oSpan.css({left:l,top:t});
                    that.BigImg.css({
                        left:-x*(that.BigImg.width() - that.BigImgBox.width()),
                        top:-y*(that.BigImg.height() - that.BigImgBox.height())
                    });
                });
            },function(){
                that.oSpan.css("display","none");
                that.BigImgBox.css("display","none");
            });

            this.oP.on("mouseout",function(){
            });
        }
        change(){
            let that = this;
            this.imgs.on("click",function(){
                $(this).parent().addClass("current").siblings("a").removeClass("current");
                that.smallImg.attr("src",$(this).attr("src"));
                that.BigImg.attr("src",$(this).attr("src"));
            });
        }
        move(){
            let that = this;
            this.left.on("click",function () {
                if(that.index>=that.imgs.length){
                    that.index  = that.imgs.length;
                }else{
                    that.index++;
                }
                $(".item-img-list").css({marginLeft:-60*that.index + 20});

            });

            this.right.on("click",function(){console.log(that.index);
                if(that.index<=0){
                    that.index = 0;
                }else{
                    that.index--;
                }
                $(".item-img-list").css({marginLeft:-60*that.index + 20});

            });
        }
    }
    return Detail;
});