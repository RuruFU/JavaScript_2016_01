var main=document.querySelector("#main");
var desW=640;
var desH=1008;
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
if (winW/winH<desW/desH){
    main.style.webkitTransform="scale("+winH/desH+")"
}else {
    main.style.webkitTransform="scale("+winW/desW+")"
}


//1  前三个li每隔一秒网上移动20px，回到原始位置
var msg=document.querySelector('#message');
var oLis=document.querySelectorAll('#message>ul>li');
var oUl=document.querySelector('#message>ul');
function fnMessage(){
    var n=0;
    var h=null;
    var timer=window.setInterval(function(){
        oLis[n].style.opacity='1';
        oLis[n].style.webkitTransform='translate(0,0)';
        h+=oLis[n].offsetHeight-30;
        n++;
        if (n>=3){
            window.setTimeout(function(){//停顿一下
                oUl.style.webkitTransform='translate(0,'+(-h)+'px)';
                oUl.style.webkitTransform='1s';
            },1000)
            if (n==oLis.length){
                window.clearInterval(timer);
                main.removeChild(msg);
            }
        }
    },1000)

}

var cubeBox=document.querySelector("#cubeBox")
function  fnCube(){
    //开始有一个放大和旋转的效果
    cubeBox.style.webkitTransform="scale(0.7) rotateX(-135deg) rotateY(-135deg)"
    var startX=-130;
    var startY=-45;
    var x=null
    var y=null;
    document.addEventListener('touchstart',start,false);
    document.addEventListener('touchmove',move,false)
    document.addEventListener('touchend',end,false)
    function start(e){
        this.startTouch={x: e.touches[0].pageX,y: e.touches[0].pageY}
    }
    function move(e){
        var moveTouch={x: e.touches[0].pageX,y: e.touches[0].pageY};
        x=moveTouch.x-this.startTouch.x;
        y=moveTouch.y-this.startTouch.y;

        cubeBox.style.webkitTransform="scale(0.7) rotateX("+(-(startX+y))+"deg) rotateY("+(-(startY+x))+"deg)"
    }
    function end(){
        //更新起始值
        startX+=y;
        startY+=x;
        this.flag=false
    }
}
fnCube();


