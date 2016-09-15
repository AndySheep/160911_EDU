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