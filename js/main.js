var edit=document.getElementsByClassName('edit')[0];
var moved=false;
var selectTxt;//选择的文本
var range;

//获取选中的字符
edit.addEventListener("click",function(){
    getSelectionRange();//获取Range
});
edit.addEventListener("mousedown",function(){
    edit.addEventListener("mousemove",listenMove);
});
function listenMove(){
    moved=true;
};
edit.addEventListener("mouseup",function(){
    if(!moved){
        return;
    }
    //当有选中内容才进行操作
    edit.removeEventListener("mousemove",listenMove);
    getSelectionRange();
    selectTxt= range.toString();//将选择的内容从对象中提取出来,直接转字符串就行了。
    moved = false;
});

//改变字体大小
var fontSize=document.getElementById('fontSize');
var aFontLi=fontSize.getElementsByTagName('li');
for(let i=0,len=aFontLi.length;i<len;i++){
    aFontLi[i].getElementsByTagName('input')[0].onclick=addFontSize;
}
function addFontSize(){
    if(!range){
        return false;
    }
    var newFont = document.createElement("font");
    newFont.style.fontSize=this.value;
    newFont.innerText = selectTxt;
    insert(newFont);
}
//斜体，加粗，下划线
var aFontStyle=document.getElementsByClassName('fontStyle');
for(let i=0,len=aFontStyle.length;i<len;i++){
    aFontStyle[i].getElementsByTagName('input')[0].onclick=addFontStyle;
}
function addFontStyle(){
    if(!range){
        return false;
    }
    var name=this.name;
    var newNode;
    if(name=="italic"){
        newNode= document.createElement("i");
    }else if(name=="blod"){
        newNode= document.createElement("b");
    }else if(name=="underline"){
        newNode= document.createElement("u");
    }
    newNode.innerText = selectTxt;
    insert(newNode)
}
//修改字体颜色
var changeFontColor=document.getElementById('changeFontColor');
changeFontColor.onchange=function(){
    if(!range){
        return false;
    }
    var newFont = document.createElement("font");
    newFont.style.color=this.value;
    newFont.innerText = selectTxt;
    insert(newFont);
}
//插入图片
var insertImg=document.getElementsByClassName('insertImg')[0];
document.getElementById('insertImgBtn').onclick=function(){
    insertImg.style.display="block";
    var file=document.getElementById('fileImg');
    file.onchange=fileChange;
}
var aInsertBtn=document.getElementsByClassName('insertBtn');
//取消插入图片
aInsertBtn[1].onclick=function(){
    insertImg.style.display="none";
}
//插入图片
var imgSrc='';
aInsertBtn[0].onclick=function(){
    var txt=document.getElementById('txtImg');
    //如果同时存在本地上传图片和网络图片的地址，只插入网络图片
    console.log(txt.value)
    if(txt.value){
        imgSrc=txt.value;
        txt.value=" ";
    }
    addImg(imgSrc);
    insertImg.style.display="none";
}
function fileChange(){
    var val=this.value.toLowerCase().split('.');
    if(val){
        if(val[1]=='gif'||val[1]=='png'||val[1]=='jpg'||val[1]=='jpeg'){
            var reader = new FileReader();
                reader.onload = function (e) {
                imgSrc = e.target.result;		        
            }
            reader.readAsDataURL(this.files[0]);
        }else{
            alert("目前支持gif,png,jpg,jpeg格式的图片!")
        }
    }
}
function addImg(src){
    var newImg=new Image();
    newImg.className="insertNewImg";
    newImg.src=src;
    insert(newImg);
}
//插入节点
function insert(newNode){
    var fragNode = document.createDocumentFragment().appendChild(newNode);//创建文档碎片并放入新节点
    range.deleteContents();//删除Rnge中的内容
    range.insertNode(fragNode);//再插入新碎片
}

//修改加入图片的大小
document.addEventListener("click",imgDown);
function imgDown(e){
    var e=e||event;
    if(e.target.nodeName==="IMG"){
        var aImg=document.getElementsByClassName('insertNewImg');
        for(let i=0,len=aImg.length;i<len;i++){
            aImg[i].onclick=function(){
                var thatImg=this;
                //将修改图片框显示
                var changeImg=document.getElementsByClassName('changeImg')[0];
                changeImg.style.display="block";
                //设置初始里面的内容
                var changeImgW=document.getElementById('changeImgW');
                changeImgW.value=this.clientWidth;
                var changeImgH=document.getElementById('changeImgH');
                changeImgH.value=this.clientHeight;
                //按钮绑定
                var aBtn=changeImg.getElementsByClassName('changeBtn');
                aBtn[0].onclick=function(){
                    thatImg.style.cssText="width:"+changeImgW.value+"px;height:"+changeImgH.value+"px;";
                    changeImg.style.display="none";
                }
                aBtn[1].onclick=function(){
                    changeImg.style.display="none";
                }
            }
        }
    }
}

//获取当前光标位置
function getSelectionRange() { 
    var select;
    //兼容
    if (window.getSelection) { 
        select = window.getSelection();
           range = select.getRangeAt(0);//获取selection对象,并获取range对象
    } else if (document.selection) { 
        //IE浏览器
        range = document.selection.createRange();//IE可以直接获取
    };
};