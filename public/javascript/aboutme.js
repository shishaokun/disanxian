var weather = function(){
	// $.getJSON('https://www.baidu.com/home/xman/data/superload?type=weather', function(ret){
	// 	console.log(ret);
	// });
	$('.fixed-window').css({
		height: $(document).height(),
	});
}

var options = {
	imgUrl: '/images/disanxian_black.png', // 分享后展示的一张图片
	lineLink: 'http://www.disanxian.net', // 点击分享后跳转的页面地址
	descContent: "拒绝雾霾，从我做起。",  // 分享后的描述信息
	shareTitle: '地三鲜工作室', // 分享后的标题
	appid: '',  // 应用id,如果有可以填，没有就留空
};