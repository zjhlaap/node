
$(document).ready(function () {
  let d2 = new Date();
    let hours = d2.getHours();
    for(let i = 0;i<$(".active-nav .time-slot").find(".time").length;++i){
        $(".active-nav .time-slot").find(".time")[i].innerHTML = hours + ":00";
        hours += 2;
    }

    setInterval(function () {
        let d = new Date();
        let d1 = new Date(d.getFullYear()+","+(parseInt(d.getMonth())+1)+","+d.getDate()+" "+(parseInt(d.getHours())+2)+":00:00");
        let ago = d1.getTime()-d.getTime();
        let agoHours = parseInt(ago/1000/60/60);
        let agoMinutes = parseInt((ago - agoHours*60*60*1000)/1000/60);
        let agoSeconds = parseInt((ago - agoHours*60*60*1000 - agoMinutes*60*1000)/1000);
        agoHours = agoHours<10?0+""+agoHours:agoHours;
        agoMinutes=agoMinutes<10?0+""+agoMinutes:agoMinutes;
        agoSeconds=agoSeconds<10?0+""+agoSeconds:agoSeconds;
        $(".time-slot.current").find(".count-down").find("i").html(agoHours+":"+agoMinutes+":"+agoSeconds);
    },1000)

});