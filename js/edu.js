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
var cookie=getcookie();
function close(ele) {
	return ele.className='close';
}
function show(ele) {
	return ele.className='show';
}
/* 顶部通知条 */
//获取通知条节点
var note=gEBId('g-note');
//获取不再提醒元素节点
var closenote=gEBId('m-note-close');
//定义通知条cookie的名称
var shownote='shownote';
/* 优先判断是否含有shownote这个cookie，若有则直接关闭通知，若无则监听点击事件，监听到点击事件后先设置cookie，然后关闭通知。 */
if (cookie.shownote=='yes') {
	close(note);
}else{
	addEvent(closenote,'click',function(event){
	setCookie(shownote,'yes');
	});
	addEvent(closenote,'click',function(event){
	close(note);
	});
}
/* /顶部通知条 */
/* 头部信息 */
//获取表单节点
var form=document.forms.loginForm;
//获取首页关注按钮
var login=gEBId('m-head-login');
//获取弹出的登录框节点
var loginshow=gEBId('g-loginForm');
//获取登录框的关闭按钮节点
var loginclose=gEBId('m-close-login');
//获取首页已关注按钮节点
var loginok=gEBId('m-head-loginok');
//获取首页取消关注按钮节点
var loginno=gEBId('m-head-loginno');
//获取遮罩元素节点
var mask=gEBId('g-mask');
//获取账号输入框节点
var inputac=gEBId('m-account');
//获取密码输入框节点
var inputpa=gEBId('m-password');
//获取账号和密码输入框的两个提示节点
var inputtip=gEBTN(form,'label');
//先关闭登录窗口和遮罩
close(loginshow);
close(mask);
/* 首先判断是否已设置登录cookie，若已设置，则将关注设置为已关注状态，否则显示关注状态并监听关注按钮的点击事件 */
if (cookie.loginSuc=='yes') {
	close(login);
	show(loginok);
}else{
	close(loginok);
	show(login);
	addEvent(login,'click',function(event){
		show(loginshow);
		show(mask);
		addEvent(loginclose,'click',function(event){
			close(loginshow);
			close(mask);
		});
	});
}
//监听输入事件，聚焦和有输入内容时隐藏提示文字，失焦并且无输入内容时显示提示文字
addEvent(inputac,'focus',function (event) {
	inputtip[0].style.display='none';
});
addEvent(inputac,'blur',function (event) {
	if (inputac.value=='') {
		inputtip[0].style.display='inline-block';
	}
});
addEvent(inputpa,'focus',function (event) {
	inputtip[1].style.display='none';
});
addEvent(inputpa,'blur',function (event) {
	if (inputac.value=='') {
		inputtip[1].style.display='inline-block';
	}
});
/* 监听登录点击事件，点击登录后调用Ajax获取登录是否成功信息并予以反馈到窗口的显示状态 */
gEBId('m-login-button').onclick=function(){
	addEvent(form,'submit',function(event){
		event.preventDefault();
	});
	//md5加密处理信息，调用Ajax的GET方法向服务器发送请求，若成功则退出弹窗，修改关注状态为已关注，设置相关cookie
	var usernamemd5=hex_md5(String(inputac.value));
	var passwordmd5=hex_md5(String(inputpa.value));
	get('http://study.163.com/webDev/login.htm',{userName:usernamemd5,password:passwordmd5},function (a) {
		if (a==='1') {
			setCookie('loginSuc','yes');
			close(loginshow);
			close(mask);
			get('http://study.163.com/webDev/ attention.htm','',function (b) {
				if (b==='1') {
					setCookie('followSuc','yes');
					close(login);
					show(loginok);
				}else{
					alert('关注cookie设置失败！');
				}
			});
		}else{
			alert('您的账号和密码错误，请重新输入！');
		}
	});
};
//监听取消关注按钮点击事件
loginno.onclick=function(){
	close(loginok);
	show(login);
	removeCookie('loginSuc');
};
/* /头部信息 */