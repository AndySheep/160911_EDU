function addEvent(node,event,handler){
    if (!!node.addEventListener){
        node.addEventListener(event,handler,!1);
    }else{
        node.attachEvent('on'+event,handler);
    }
}//兼容浏览器的监听事件
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