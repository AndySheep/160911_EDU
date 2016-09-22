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
//初始化一个nowbanner用于存储轮播状态
var nowbanner=0;
//监听按钮点击事件，点击后调用切换函数
for (var i = 0, len=bannerBarLi.length; i < len; i++){
	bannerBarLi[i].index=i;
	bannerBarLi[i].onclick=function(){
		nowbanner=this.index;
		bannerTab();
	};
}
//切换函数，先清空所有按钮和轮播图的显示状态，然后给nowbanner状态的按钮及轮播图添加显示样式并调用fadein淡入函数
function bannerTab() {
	//控制bannerBarLi的className
	for(var i=0,ilen=bannerBarLi.length;i<ilen;i++){
		bannerBarLi[i].className = '';
	}
	bannerBarLi[nowbanner].className = 'm-bar-active';

	//控制bannerImgLi的className
	for(var j=0,jlen=bannerImgLi.length;j<jlen;j++){
		bannerImgLi[j].style.display='none';
	}
	bannerImgLi[nowbanner].style.display='inline-block';
	//淡入调用，传入需要淡入的节点及淡入过程的时间，单位‘ms’
	fadein(bannerImgLi[nowbanner], 500);
}
//自动轮播函数
function next() {
	nowbanner++;
	//判断bannerBarLi目前的位置，播到最后一张时将nowbanner归零
	if(nowbanner == bannerBarLi.length) {
		nowbanner = 0;
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
/* 内容区 */
/* 内容区的详细课程区域 */
//获取内容区节点
var content=gEBId('g-content');
//获取内容区Tab的节点
var cHead=gEBId('m-content-header');
//获取内容区Tab的节点列表
var cHeadLi=gEBTN(cHead,'h1');
//获取内容区课程节点
var cKc=gEBId('m-content-kcul');
//获取内容区课程节点列表
var cKcLi=gEBTN(cKc,'li');
//获取翻页器节点
var cPg=gEBId('m-content-pt');
//获取翻页器节点列表
var cPgLi=gEBTN(cPg,'li');
//获取翻页器上一页节点
var cPb=gEBId('m-content-pb');
//获取翻页器下一页节点
var cPn=gEBId('m-content-pn');
//设置课程列表及翻页器列表函数，调用Ajax所获得的数据及当前页信息来设置课程列表内容
function setKc(data,pNum){
	//清空课程列表和翻页器列表
	cPg.innerHTML='';
	cKc.innerHTML='';
	//获取总的页数并新建翻页器
	var totalNum=data.totalPage;
	for (var i=1;i<=totalNum;i++){
		var ptLi=document.createElement('li');
		ptLi.innerText=i;
		cPg.appendChild(ptLi);
	}
	//清空所有页码样式并给当前页的页码注入样式
	for (var e=0;e<totalNum;e++){
		cPgLi[e].className = '';
	}
	cPgLi[pNum-1].className ='m-content-pgact';
	//获取当前页的每页课程数量并新建列表
	var pSize=data.pagination.pageSize;
	for (var j=0;j<pSize;j++){
		var Kclist=document.createElement('li');
		cKc.appendChild(Kclist);
	}
	//获取课程列表详情并依次填充新建的列表
	var pList=data.list;
	function fillcKcLi(cKcLi,pList){
		cKcLi.innerHTML='<div class="m-content-liMEnter"><img src="'+pList.middlePhotoUrl+'" alt="'+pList.name+'"><h2>'+pList.name+'</h2><a href="'+pList.providerLink+'" target="_blank" rel="nofollow" title="'+pList.provider+'">'+pList.provider+'</a><span><i></i>'+pList.learnerCount+'</span><strong>'+((pList.price=='免费')?'':'&#65509;')+pList.price+'</strong></div>'+'<div class="m-content-liMleave"><img src="'+pList.middlePhotoUrl+'" alt="'+pList.name+'"><a href="'+pList.providerLink+'" target="_blank" rel="nofollow" title="'+pList.provider+'"><h2>'+pList.name+'</h2></a><i></i><em>'+pList.learnerCount+'人在学</em><strong>发布者 : <a href="'+pList.providerLink+'" target="_blank" rel="nofollow" title="'+pList.provider+'">'+pList.provider+'</a></strong><span>分类 : '+(pList.categoryName==null?'暂无分类':pList.categoryName)+'</span><div><p>'+pList.description+'</p></div></div>';
	}
	//先判断价格值是否为0，若为0则先转换成‘免费’字符串然后填充，否则直接填充列表
	for (var k=0;k<pSize;k++){
		pList[k].price=(pList[k].price==0)?'免费':pList[k].price.toFixed(2);
		fillcKcLi(cKcLi[k],pList[k]);
	}
	//此处是采用闭包的方式储存课程列表下标，然后监听mouseenter和mouseleave事件，触发后分别给原列表和浮窗设置显示和隐藏的样式，以达到浮窗效果
	for(var f=0;f<pSize;f++){
		(function(f){
			addEvent(cKcLi[f],'mouseenter',function(event){
				var cKcLiOrg=gEBCN(cKcLi[f],'m-content-liMEnter');
				var cKcLiNow=gEBCN(cKcLi[f],'m-content-liMleave');
				cKcLiOrg[0].style.display='none';
				cKcLiNow[0].style.display='inline-block';
			});
			addEvent(cKcLi[f],'mouseleave',function(event){
				var cKcLiOrg=gEBCN(cKcLi[f],'m-content-liMEnter');
				var cKcLiNow=gEBCN(cKcLi[f],'m-content-liMleave');
				cKcLiOrg[0].style.display='inline-block';
				cKcLiNow[0].style.display='none';
			});
		})(f);
	}
	//先储存页码下标，然后监听页码点击，触发后修改当前页码值并调用Ajax读取数据及重新设置列表
	for (var g=0,glen=totalNum;g<glen;g++){
		(function (g){
			addEvent(cPgLi[g],'click',function(event){
				pNoNow=g;
				var pageN=pNoNow+1;
				var pageT=(pTabNow+1)*10;
				var pageS=pSizeNow;
				KcAjax(pageN,pageS,pageT);
			});
		})(g);
	}
}
//先设置当前Tab页的样式，然后调用Ajax获取数据并执行setKc函数
function KcAjax(pageN,pageS,pageT){
	for (var i=0,ilen=cHeadLi.length;i<ilen;i++){
		cHeadLi[i].className = '';
	}
	cHeadLi[pTabNow].className='m-content-act';
	get('http://study.163.com/webDev/couresByCategory.htm',{pageNo:pageN,psize:pageS,type:pageT},function(data){
		var dataList=JSON.parse(data);
		setKc(dataList,pageN);
	});
	return;
}
//初定当前Tab页及页码页下标为0，供所有函数调用
var pTabNow=0,pNoNow=0;
//根据初始浏览器窗口大小设定每页课程的初始数量，供所有函数调用
var pSizeNow=(function(){
	return document.documentElement.clientWidth<1205?15:20;
})();
//初始化页面，默认为产品设计第一页
KcAjax(1,pSizeNow,10);
//监听Tab页点击事件，并将当前页码归1后调用Ajax获取数据及设置课程列表
for (var i=0,ilen=cHeadLi.length;i<ilen;i++){
	cHeadLi[i].index=i;
	cHeadLi[i].onclick=function(){
		pTabNow=this.index;
		var pageT=(pTabNow+1)*10;
		KcAjax(1,pSizeNow,pageT);
	};
}
//上一页函数，先判断是否已到第一页，若已经是第一页，则不执行任何动作，否则根据跳转上一页并将下标减1
function pageUp(pageN,pageS,pageT){
	pageT=(pageT+1)*10;
	if(pageN>0){
		KcAjax(pageN,pageS,pageT);
		--pNoNow;
	}
}
//下一页函数，先判断是否已到最后一页,若已经是最后一页，则不执行任何动作，否则根据跳转下一页并将下标加1
function pageNext(pageN,pageS,pageT){
	pageT=(pageT+1)*10;
	if(pageN<(cPgLi.length-1)){
		pageN+=2;
		KcAjax(pageN,pageS,pageT);
		++pNoNow;
	}
}
//每页课程数量重置函数，判断浏览器窗口大小，当浏览器窗口宽度小于1205px时，将每页课程数量设置为15项，否则设置为20项
function pageResize(pageN,pageS,pageT){
	pageS=document.documentElement.clientWidth<1205?15:20;
	++pageN;
	pageT=(pageT+1)*10;
	KcAjax(pageN,pageS,pageT);
}
//监听上一页按钮点击事件，触发后调用上一页函数
addEvent(cPb,'click',function(event){
	pageUp(pNoNow,pSizeNow,pTabNow);
});
//监听下一页按钮点击事件，触发后调用下一页函数
addEvent(cPn,'click',function(event){
	pageNext(pNoNow,pSizeNow,pTabNow);
});
//监听浏览器窗口大小变化事件，触发后调用课程数量重置函数
addEvent(window,'resize',function(event){
	pageResize(pNoNow,pSizeNow,pTabNow);
});
/* 内容区的详细课程区域 */
/* 视频弹窗 */
//依次获取弹出的视频窗口节点、弹出的视频节点、首页视频图片节点和视频关闭按钮节点
var video=gEBId('m-content-videopop');
var playvideo=gEBId('m-content-videoplay');
var popvideo=gEBId('m-content-videoimg');
var closevideo=gEBId('m-content-videoclose');
//监听首页视频图片点击事件，触发后弹出视频窗口和遮罩，点击空间上的播放按钮后即可播放，设置了预加载()
addEvent(popvideo,'click',function(event){
	show(mask);
	show(video);
});
//监听视频窗口关闭按钮点击事件，触发后先暂停播放，然后关闭视频弹窗和遮罩
addEvent(closevideo,'click',function(event){
	playvideo.pause();
	close(video);
	close(mask);
});
//增加一个视频区点击可以控制播放和暂停的效果
addEvent(playvideo,'click',function(event){
	if(!!playvideo.paused){
		playvideo.play();
	}else{
		playvideo.pause();
	}
});
/* /视频弹窗 */
/* 最热排行 */
//依次获得排行榜节点、ol节点和节点列表
var hot=gEBId('m-content-hot');
var hotLists=gEBTN(hot,'ol')[0];
var hotLi=gEBTN(hotLists,'li');
//排行榜设置函数，在获取Ajax调用的数据后设置排行榜内容并间隔5秒滚动
function setHotline(arrHot){
	//依次创建十个空li
	for (var i=0;i<20;i++){
		var Li=document.createElement('li');
		hotLists.appendChild(Li);
	}
	//依次将Ajax获取到的内容填入li中
	for (var j=0;j<20;j++){
		hotLi[j].innerHTML='<img src="'+arrHot[j].smallPhotoUrl+'" alt="'+arrHot[j].name+'"><h2>'+arrHot[j].name+'</h2><em><span></span>'+arrHot[j].learnerCount+'</em>';
	}
	//更改排行榜，每隔5秒将hotLists列表的第一个子节点取出保存并添加到最后
	function changeHot(){
		var hotLihead=hotLists.firstChild;
		hotLists.removeChild(hotLists.firstChild);
		hotLists.appendChild(hotLihead);
	}
	setInterval(changeHot,5000);
}
//获取最热排行的Ajax数据并调用设置排行榜函数
function hotAjax(){
	get('http://study.163.com/webDev/hotcouresByCategory.htm','',function(hotData){
		setHotline(JSON.parse(hotData));
	});
}
hotAjax();
/* /最热排行 */
/* /内容区 */