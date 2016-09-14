var note=document.getElementById('g-note');
var closenote=document.getElementById('m-note-close');
var shownote='shownote';
var notecookie=(function getcookie () {
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
function closeNote(ele) {
	return ele.className+='closenote';
}
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
function addEvent(node,event,handler){
    if (!!node.addEventListener){
        node.addEventListener(event,handler,!1);
    }else{
        node.attachEvent('on'+event,handler);
    }
}
/* 优先判断是否含有shownote这个cookie，若有则直接关闭通知，若无则监听点击事件，监听到点击事件后先设置cookie，然后关闭通知。 */
if (notecookie.shownote=='yes') {
	closeNote(note);
}else{
	addEvent(closenote,'click',function(event){
	setCookie(shownote,'yes');
	})
	addEvent(closenote,'click',function(event){
	closeNote(note);
	})
}