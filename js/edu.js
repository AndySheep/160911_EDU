//获取cookie以供各模块使用
var cookie=getcookie();
/* 顶部通知条 */
var note=document.getElementById('g-note');
var closenote=document.getElementById('m-note-close');
var shownote='shownote';
function closeNote(ele) {
	return ele.className+='closenote';
}
/* 优先判断是否含有shownote这个cookie，若有则直接关闭通知，若无则监听点击事件，监听到点击事件后先设置cookie，然后关闭通知。 */
if (cookie.shownote=='yes') {
	closeNote(note);
}else{
	addEvent(closenote,'click',function(event){
	setCookie(shownote,'yes');
	});
	addEvent(closenote,'click',function(event){
	closeNote(note);
	});
}
/* /顶部通知条 */
/* 头部信息 */
var login=document.getElementById('m-head-login');
addEvent(login,'click',function(event){
	if (cookie.loginSuc=='yes') {
		
	}
})
/* /头部信息 */