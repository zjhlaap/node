$(document).ready(function(){
    $(".pass i img").on("click",function(){
        if($(this).parent().prev().attr("type")==="text"){
            $(this).parent().prev().attr("type","password")
            $(this).attr("src","./images/openEye.png");
        }else if($(this).parent().prev().attr("type")==="password"){
            $(this).parent().prev().attr("type","text");
            $(this).attr("src","./images/closeEye.png");
        }
    });
    $(".tel").on("blur",function(){
        if(!(/^1[34578]\d{9}$/.test($(this).val()))){
            error("手机号码输入有误");
            return false;
        }
    });
    $(".confirm-password").on("blur",function () {
        if($(this).val() !== $(".password").val()){
            error("两次密码不一致"); return false;
        }
    });
    $(".code").on("blur",function(){
        if($(this).val()==="" || $(this).val()===" "){
            error("验证码不能为空"); return false;
        }
    });
    $(".get-code").on("click",function(){
        if($(".tel").val()==="" || $(".tel").val() == " "){
            error("手机号码不能为空"); return false;
        }else{
            $(this).attr("disabled",true);
            let i = 3;
            let timer = setInterval(function(){
                if(i<=1){
                    $(".get-code").val("重新获取验证码");
                    $(".get-code").attr("disabled",false);
                    clearInterval(timer);
                }
                $(".get-code").val(i);
                i--;
            },1000)
        }
    });
    $(".now-register").on("click",function () {
        if(!(/^1[34578]\d{9}$/.test($(".tel").val()))){
            error("手机号码输入有误");
            return false;
        }
        if($(".confirm-password").val() !== $(".password").val()){
            error("两次密码不一致"); return false;
        }
        if($(".code").val()==="" || $(".code").val()===" "){
            error("验证码不能为空"); return false;
        }
        if($(".tel").val()==="" || $(".tel").val() == " "){
            error("手机号码不能为空"); return false;
        }else{
            $(".get-code").attr("disabled",true);
            let i = 3;
            let timer = setInterval(function(){
                if(i<=1){
                    $(".get-code").val("重新获取验证码");
                    $(".get-code").attr("disabled",false);
                    clearInterval(timer);
                }
                $(".get-code").val(i);
                i--;
            },1000)
        }
        $.ajax({
            url: "/api/register/reg",
            dataType: "json",
            data: {
                pass: $(".password").val(),
                tel: $(".tel").val(),
                type: 1
            },
            success: function(t) {
                window.location.href = "/.login.html",
                alert("注册成功"),
            }
        })
    })
    function error(msg){
        $(".tips").css("display","block").find(".tips-info").html(msg);
        setTimeout(function(){
            $(".tips").css("display","none")
        },2000)
    }
});