//简化获取元素节点
function gEBId(ele){
    return document.getElementById(ele);
}
function gEBTN(ele,name) {
    return ele.getElementsByTagName(name);
}
function gEBCN(ele,name){
    return getElementsByClassName(ele,name);
}
//获取cookie、设置展示和关闭函数，以供各模块使用
var cookies=getcookie();
function close(ele) {
    return ele.style.display='none';
}
function show(ele) {
    return ele.style.display='inline-block';
}
//兼容浏览器的监听事件
function addEvent(node,event,handler){
    if (!!node.addEventListener){
        node.addEventListener(event,handler,!1);
    }else{
        node.attachEvent('on'+event,handler);
    }
}
//设置cookie
function setCookie(name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires)
        cookie += '; expires=' + expires.toGMTString();
    if (path)
        cookie += '; path=' + path;
    if (domain)
        cookie += '; domain=' + domain;
    if (secure)
        cookie += '; secure=' + secure;
    document.cookie = cookie;
}
//获取cookie
function getcookie () {
    var cookie = {};
    var all = document.cookie;
    if (all === '')
        return cookie;
    var list = all.split('; ');
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
//删除cookie
function removeCookie (name, path, domain) {
    document.cookie = name + '=' + '; path=' + path + '; domain=' + domain + '; max-age=0';
}
//兼容getElementsByClassName
function getElementsByClassName(element,names) {
	if (element.getElementsByClassName) {
		return element.getElementsByClassName(names);
	}else{
		var elements=element.getElementsByTagName('*'),result=[];
		for (var i = 0,ele,len=elements.length;ele=elements[i],i<len ;i++) {
			if (hasClassName(ele,names)) {
				result.push(ele);
			}
		}
		function hasClassName(elementorg,nameorg) {
			var attrorg=elementorg.getAttribute('class');
			var attrname=nameorg.split(' ');
			for (var i = 0,len=attrname.length; i < len; i++) {
				if (attrorg.indexOf(attrname[i])) {
					continue;
				}else{
					return false;
				}
			}
			return true;
		}
		return result;
	}
}
//封装Ajax请求参数序列化
function serialize (data) {
    if (!data) return '';
    var pairs = [];
    for (var name in data){
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}
//封装Ajax的GET请求方法
function get(url,options,callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                 callback(xhr.responseText);
            } else {
                console.log("Ajax request failed : " + xhr.status);
            }
        }
    };
    xhr.open("get",url + "?" + serialize(options),true);
    xhr.send(null);
}
//兼容preventDefault
function preventDefault(event){
    if(event&&event.preventDefault){
        return event.preventDefault();
    }else{
        return window.event.returnValue=false;
    }
}
//兼容ie8版本的淡入动画
function fadein(ele,time) {
    var distance1=1,distance2=100;
    var stepLength1=distance1/100;
    var stepLength2=distance2/100;
    var offset1=0,offset2=0;
    //获取每隔多少秒触发的时间长度，触发100次，乘积就是动画时间time长度
    var timeact=parseInt(time)/100;
    var step=function(){
        var tmpOffset1=offset1+stepLength1,tmpOffset2=offset2+stepLength2;
        if ((tmpOffset1<=1)&&(tmpOffset2<=100)) {
            ele.style.opacity=tmpOffset1;
            offset1=tmpOffset1;
            ele.style.filter='alpha(opacity='+tmpOffset2+')';
            offset2=tmpOffset2;
        } else {
            ele.style.opacity=tmpOffset1;
            ele.style.filter='alpha(opacity='+tmpOffset2+')';
            clearInterval(intervalID);
        }
    };
    //初始化元素的透明度为0，兼容IE8
    ele.style.opacity=0;
    ele.style.filter='alpha(opacity='+0+')';
    var intervalID=setInterval(step,timeact);
}