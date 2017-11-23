
function date(datalist,num, todayCount){
	(function($) {
		var Checkin = function(ele, options) {
			this.ele = ele;
			this.opt = options;
			this.defaults = {
				
				height: 'auto',
				background: '#fff',
				radius: 10,
				color: '#fff',
				padding: 0,
				
				dateArray: datalist, // 假设已签到的天数+1
			};
			this.obj = $.extend({}, this.defaults, this.opt);
		}
		Checkin.prototype.init = function() {
			var _self = this.ele,
				html = '',
				myDate = new Date(),
				year = myDate.getFullYear(),
				month = myDate.getMonth(),
				day = myDate.getDate(),
				weekText = ['日', '一', '二', '三', '四', '五', '六'];
			/*var title_html = "<div class='title'><p>" + (month + 1) + '月' + "</p><p class='action'><i>活跃天数：<span id='numValue'>"+num+"</span> 天</i></p>";
			if (todayCount > 0) {
				title_html = title_html + "<a class=\'checkBtn\' style=\'background: #cccccc\' href=\"javascript:;\">已签到</a></div>";
			} else {
				title_html = title_html + "<a class=\'checkBtn\' onclick='footbtn()' href=\"javascript:;\">签到</a></div>";
			}
			_self.css({
				width: this.obj.width + 'px',
				height: this.obj.height,
				background: this.obj.background,
				borderRadius: this.obj.radius,
				color: this.obj.color,
				padding: this.obj.padding
			}).append(title_html);*/
			
		
			var title1_html = "<p style='font-size:16px;color:#262626;text-align: center;margin-top:10px;'>"+year +"年 "+(month+1)+"月</p>";
			$("<ul class='week mui-clearfix'></ul>"+title1_html +"<ul class='calendarList mui-clearfix'></ul>").appendTo(_self);

			for(var i = 0; i < 7; i++) {
				_self.find(".week").append("<li>" + weekText[i] + "</li>")
			};
			for(var i = 0; i < 42; i++) {
				html += "<li class='datas'></li>"
			};
			_self.find(".calendarList").append(html);
			var $li = _self.find(".calendarList").find("li");
			_self.find(".week li").css({
				width: (_self.width() / 7) + 'px',
				height: 20 + 'px',
				boxSizing: 'border-box',
				background: '#fff',
				fontSize:"12px",
				color:"#262626"
			});
			$li.css({
				width:(_self.width() / 7) + 'px',
				height: 55 + 'px',
				lineHeight: 55 + 'px',
				fontSize:"15px",
				boxSizing: 'border-box'
			});
			_self.find(".calendarList").find("li:nth-child(7n)").css('borderRight', 'none');
			_self.find(".week li:nth-child(7n)").css('borderRight', 'none');
			var monthFirst = new Date(year, month, 1).getDay();
			var d = new Date(year, (month + 1), 0)
			var totalDay = d.getDate(); //获取当前月的天数
			for(var i = 0; i < totalDay; i++) {
				$li.eq(i + monthFirst).html(i + 1);
				$li.eq(i + monthFirst).addClass('data' + (i + 1));
				$li.eq(i + monthFirst).attr('dayTime',year+'-'+(month + 1) + '-' + (i + 1));
				
				if(isArray(this.obj.dateArray)) {
					for(var j = 0; j < this.obj.dateArray.length; j++) {
						if(i == this.obj.dateArray[j]) {
							// 假设已经签到的
							$li.eq(i + monthFirst).addClass('checked');
						}
					}
				}
			}
			//$li.eq(monthFirst+day-1).css('background','#f7ca8e')
			_self.find($(".data" + day)).addClass('able-qiandao').text('今天');
			for(var k = 1;k<day;k++){
				$(".calendarList").find($(".data" + k)).addClass('color-no');
			}
			
			
			/*第二个月*/
			var month2;
			var year2;
			var html2 = '';
			
			if(month + 1 >= 12){
				month2 = (month+1)%12;
				year2 = year + 1;
			}
			else{
				month2 = month +1;
				year2 = year;
			}
			
			var title2_html = "<p style='font-size:16px;color:#262626;text-align: center;margin-top:10px;'>"+year2 +"年 "+(month2+1)+"月</p>";
			var calen2 = title2_html + "<ul class='calendarList2 mui-clearfix'></ul>";
			$(".calendarList").after(calen2);
			
			for(var j = 0; j < 42; j++) {
				html2 += "<li class='datas'></li>"
			};
			_self.find(".calendarList2").append(html2);
			var $li = _self.find(".calendarList2").find("li");
			$li.css({
				width:(_self.width() / 7) + 'px',
				height: 55 + 'px',
				lineHeight: 55 + 'px',
				fontSize:"15px",
				boxSizing: 'border-box',
			});
			_self.find(".calendarList2").find("li:nth-child(7n)").css('borderRight', 'none');
			_self.find(".week li:nth-child(7n)").css('borderRight', 'none');
			var monthFirst = new Date(year2, month2, 1).getDay();
			var d = new Date(year2, (month2 + 1), 0)
			var totalDay = d.getDate(); //获取当前月的天数
			for(var i = 0; i < totalDay; i++) {
				$li.eq(i + monthFirst).html(i + 1);
				$li.eq(i + monthFirst).addClass('data' + (i + 1));
				
				$li.eq(i + monthFirst).attr('dayTime',year2+'-'+(month2 + 1) + '-' + (i + 1));
				
				if(isArray(this.obj.dateArray)) {
					for(var j = 0; j < this.obj.dateArray.length; j++) {
						if(i == this.obj.dateArray[j]) {
							// 假设已经签到的
							$li.eq(i + monthFirst).addClass('checked');
						}
					}
				}
			}
			
			/*暂定目前只能提前30天买票*/
			var date1 = new Date();
	        var date2 = new Date(date1);
	        date2.setDate(date1.getDate()+30);
	        var times = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
			
			for(var k = date2.getDate() ;k<40;k++){
				$(".calendarList2").find($(".data" + k)).addClass('color-no');
			}
			
			
			
			/*第三个月*/
			var month3;
			var year3;
			var html3 = '';
			
			if(month2 + 1 >= 12){
				month3 = (month2+1)%12;
				year3 = year2 + 1;
			}
			else{
				month3 = month2 +1;
				year3 = year2;
			}
			
			var title3_html = "<p style='font-size:16px;color:#262626;text-align: center;margin-top:10px;'>"+year3 +"年 "+(month3+1)+"月</p>";
			var calen3 = title3_html + "<ul class='calendarList3 mui-clearfix'></ul>";
			$(".calendarList2").after(calen3);
			
			for(var j = 0; j < 42; j++) {
				html3+= "<li class='datas'></li>"
			};
			_self.find(".calendarList3").append(html2);
			var $li = _self.find(".calendarList3").find("li");
			$li.css({
				width:(_self.width() / 7) + 'px',
				height: 55 + 'px',
				lineHeight: 55 + 'px',
				fontSize:"15px",
				boxSizing: 'border-box'
			});
			_self.find(".calendarList3").find("li:nth-child(7n)").css('borderRight', 'none');
			_self.find(".week li:nth-child(7n)").css('borderRight', 'none');
			var monthFirst3 = new Date(year3, month3, 1).getDay();
			var d = new Date(year3, (month3 + 1), 0)
			var totalDay = d.getDate(); //获取当前月的天数
			for(var i = 0; i < totalDay; i++) {
				$li.eq(i + monthFirst3).html(i + 1);
				$li.eq(i + monthFirst3).addClass('data' + (i + 1));
				$li.eq(i + monthFirst).attr('dayTime',year3+'-'+(month3 + 1) + '-' + (i + 1));
				
				if(isArray(this.obj.dateArray)) {
					for(var j = 0; j < this.obj.dateArray.length; j++) {
						if(i == this.obj.dateArray[j]) {
							// 假设已经签到的
							$li.eq(i + monthFirst3).addClass('checked');
						}
					}
				}
			}
			/* 暂定第三个月无法选 */
			for(var k = 1 ;k<40;k++){
				$(".calendarList3").find($(".data" + k)).addClass('color-no');
			}
			
			
			/*给日期加上onclick属性 */
			$(".datas").each(function(e){
				/*如果颜色不为灰色，添加点击事件 */
				if($(this).css('color') === '#262626'){
					$(this).attr('onclick',lickFun);
				}				
				
			})
			
			
			
			
			
		}
		var isChecked = false;
		Checkin.prototype.events = function() {
			var _self = this.ele;
			var $li = _self.find(".calendarList").find("li");
			//取消日历点击签到，只能点击签到进行签到
			/*$li.on('click', function(event) {
				event.preventDefault();
				if($(this).hasClass('able-qiandao')) {
					$(this).addClass('checked');
					modal(_self);
					isChecked = true;
				}
			});*/
			var checkBtn = _self.find(".checkBtn");
			checkBtn.click(function(event) {
				modal(_self);
				_self.find('.able-qiandao').addClass('checked');
				isChecked = true;
			});
		}
		var modal = function(e) {
			var mask = e.parents().find(".mask");
			var close = e.parents().find(".closeBtn");
//			if(mask && !isChecked) {
//				mask.addClass('trf');
//			} else {
//				return
//			};
//			close.click(function(event) {
//				event.preventDefault();
//				mask.removeClass('trf')
//			});
			e.parents().find('.checkBtn').css("background","#cccccc");
			e.parents().find('.checkBtn').text("已签到");
		}
		$.fn.Checkin = function(options) {
			var checkin = new Checkin(this, options);
			var obj = [checkin.init(), checkin.events()]
			return obj
		}
		var isArray = function(arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	})(jQuery);
	// 插件调用
	$(".checkin").Checkin();
	// 元素居中显示，与插件无关，根本自己需要修改；
//		$(".checkin").css('marginTop',parseInt(($(window).innerHeight()-$(".checkin").outerHeight())/2)+'px');
}
