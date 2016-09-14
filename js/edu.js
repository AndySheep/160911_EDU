/* 顶部通知条 */
var elenote=document.getElementById('g-note');
var shownote='shownote';
function getElementsByClassName(element,names) {
	if (element.getElementsByClassName) {
		return element.getElementsByClassName(names);//特性侦测，优先使用W3C规范
	}else{
		var elements=element.getElementsByTagName('*'),//获取所有的后代元素
			result=[];//建立空数组集合，用来存放识别到的符合要求的元素
		for (var i = 0,ele,len=elements.length;ele=elements[i],i<len ;i++) {
			if (hasClassName(ele,names)) {
				result.push(ele);
			}
		}//遍历所有的后代元素，如果有符合类名的元素则将它压入result中
		function hasClassName(elementorg,nameorg) {
			var attrorg=elementorg.getAttribute('class');//获取具有class样式属性值
			var attrname=nameorg.split(' ');//获取识别元素的集合
			for (var i = 0,len=attrname.length; i < len; i++) {
				if (attrorg.indexOf(attrname[i])) {
					continue;
				}else{
					return false;
				}
			}
			return true;//判断是否具有该名称属性
		}
		return result;
	}
}
var gnotecookie=(function getcookie () {
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
})();
if (gnotecookie.shownote==1) {
	closent('elenote');console.log(gnotecookie.shownote)
}else{
	(function setCookie (name, value, expires, path, domain, secure) {
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
})(shownote,1)
}
var closenote=getElementsByClassName(elenote,'m-note-close');
function closent (ele){
	return elenote.className+='closenote';
}
// closenote.onclick=closent('elenote');
/* /顶部通知条 */