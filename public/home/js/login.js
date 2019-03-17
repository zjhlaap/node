define(function () {
     class Login{
          constructor(){
               $(".login-btn").on("click",function(){
                    if($("#user").val()==""){
                         $(".tips1").html("手机号码不能为空");
                         $(".tips1").css("display","block");
                         return false;
                    }
                    if($("#pass").val()==""){
                         $(".tips2").html("密码不能为空");
                         $(".tips2").css("display","block");
                         return false;
                    }
                    $.ajax({
                        url: "/api/login/loginIn",
                        dataType: "json",
                         data:{type:2,tel:$("#user").val(),pass:$("#pass").val()},
                         success:function (res) {
                              if(res){
                                   window.location.href = "./index.html";
                              }else{
                                   alert("用户名或密码错误");
                              }
                         }
                    })
               });
          }
     }

    return Login;
});