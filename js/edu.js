/* 顶部通知条 */
//获取通知条节点
var note=gEBId('g-note');
//获取不再提醒元素节点
var closenote=gEBId('m-note-close');
//定义通知条cookie的名称
var shownote='shownote';
/* 优先判断是否含有shownote这个cookie，若有则直接关闭通知，若无则监听点击事件，监听到点击事件后先设置cookie，然后关闭通知。 */
if (cookies.shownote=='yes') {
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
//获取登录框信息提示节点
var loginshmsg=gEBId('m-loginshmsg');
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
/* 首先判断是否已设置登录cookie，若已设置，则将关注设置为已关注状态，否则显示关注状态并监听关注按钮的点击事件 */
if (cookies.loginSuc=='yes') {
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
	close(inputtip[0]);
});
addEvent(inputac,'blur',function (event) {
	if (inputac.value=='') {
		show(inputtip[0]);
	}
});
addEvent(inputpa,'focus',function (event) {
	close(inputtip[1]);
});
addEvent(inputpa,'blur',function (event) {
	if (inputac.value=='') {
		show(inputtip[1]);
	}
});
/* 监听登录按钮点击事件，点击登录后先验证表单，通过后调用Ajax登录，登录成功则返回首页，否则显示错误状态 */
gEBId('m-login-button').onclick=function(){
	addEvent(form,'submit',function(event){
		preventDefault(event);
		//验证账号和密码,未通过验证则显示提示信息并重置表单
		if(!(/studyOnline/.test(inputac.value)&&/study.163.com/.test(inputpa.value))){
			show(loginshmsg);
			form.reset();
		}else{
			//md5加密处理信息，调用Ajax的GET方法向服务器发送请求，若成功则退出登录弹窗，修改关注状态为已关注，设置相关cookie
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
					alert('Ajax通信失败！');
				}
			});
		}
	});
};
//监听取消关注按钮点击事件
loginno.onclick=function(){
	close(loginok);
	show(login);
	setCookie('loginSuc','no');
};
addEvent(login,'click',function(event){
	show(loginshow);
	show(mask);
	addEvent(loginclose,'click',function(event){
		close(loginshow);
		close(mask);
	});
});
/* /头部信息 */
/* banner区(代码逻辑结合慕课网及北京章鱼实现) */
//获取轮播图片、按钮的节点
var bannerImg=gEBId('m-banner-list');
var bannerImgLi=gEBTN(bannerImg,'li');
var bannerBarLi=gEBId('m-banner-bar').getElementsByTagName('span');
var banner=gEBId('g-banner');
//初始化一个now用于存储轮播状态
var now=0;
//监听按钮点击事件，点击后调用切换函数
for (var i = 0, len=bannerBarLi.length; i < len; i++){
	bannerBarLi[i].index=i;
	bannerBarLi[i].onclick=function(){
		now=this.index;
		bannerTab();
	};
}
//切换函数，先清空所有按钮和轮播图的显示状态，然后给now状态的按钮及轮播图添加显示样式并调用fadein淡入函数
function bannerTab() {
	//控制bannerBarLi的className
	for(var i=0,ilen=bannerBarLi.length;i<ilen;i++){
		bannerBarLi[i].className = '';
	}
	bannerBarLi[now].className = 'm-bar-active';

	//控制bannerImgLi的className
	for(var j=0,jlen=bannerImgLi.length;j<jlen;j++){
		bannerImgLi[j].className = '';
		//把其他li的opacity设置0
		bannerImgLi[j].style.opacity = 0;
		bannerImgLi[j].style.filter='alpha(opacity='+0+')';
	}
	bannerImgLi[now].className = 'm-img-active';
	//淡入调用，传入需要淡入的节点及淡入过程的时间，单位‘ms’
	fadein(bannerImgLi[now], 500);
}
//自动轮播函数
function next() {
	now++;
	//判断bannerBarLi目前的位置，播到最后一张时将now归零
	if(now == bannerBarLi.length) {
		now = 0;
	}
	bannerTab();
}
//计时器
var teimr = setInterval(next,5000);
//鼠标移入清除计时器
banner.onmouseover = function() {
		clearInterval(teimr);
	};
	//鼠标离开从启计时器
banner.onmouseout = function() {
	teimr = setInterval(next,5000);
};
/* /banner区 */