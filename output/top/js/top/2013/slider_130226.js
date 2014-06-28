(function(){
		var $ = jQuery;
			

		$(document).ready(function(){
				$.fn.mytoolbox = function(settings) {

					/* ediotrial_new  Slider Pototype */
					function  editorial_new(obj){
						this.initial_num=0;
						this.obj = obj;
						this.tab_num = 1;

						this.constructor = function(){
							

							this.tab_num = obj.find(".RecommendInner .InnerLargeBox ul.edpanel").size();

							if(this.tab_num ==1){
								obj.find(".ToolBar").hide();
							}

							this.initial_num = this.initial(0,Number(this.tab_num)-1);
							this.position = this.initial_num ;

							for(var i=0;i<this.tab_num;i++){
								obj.find(".ToolBar ul").append(" <li class=''><span>"+i+"</span></li>");
							}

							obj.find(".ToolBar ul li").eq(this.initial_num ).children("span").css("background-position","-449px -570px");



							var marginLeft = this.initial_num *-640;
							obj.find("#RecommendNew .InnerLargeBox").css("margin-left",marginLeft);



							//console.log("this.initial_num "+this.initial_num );

						};

						this.auto_move = function(){
								//console.log("auto_move");
						};

						this.initial = function(from,to){
    						return Math.floor(Math.random()*(to-from+1)+from);
						};

						this.autoRun = function(){

						}

						this.now_position = function(num){
							this.position  = Number(this.position) + Number(num);
							if(this.position <0){this.position = Number(this.tab_num)-1}
							else if(this.position >Number(this.tab_num)-1){
								this.position = 0;
							}

							obj.find(".ToolBar ul li").eq(this.position).children("span").css("background-position","-449px -570px");
							obj.find(".ToolBar ul li").eq(this.position).siblings().children("span").css("background-position","-439px -570px");

							return this.position;
						}

						this.runIt = function(p){
							var now=0;

							switch(p){
								case 0:
								//	console.log("run0");
									 now = this.now_position(-1);
									break;

								case 1:
								//	console.log("run1");
									 now = this.now_position(1);
									break;
								default:
								//	console.log("Error");
								}

							if(this.tab_num >1){
							obj.find('.Deco').hide();
							var now = now *-640;
							obj.find("#RecommendNew .InnerLargeBox").animate({ marginLeft: now },500,function() {
								obj.find('.Deco').show();
							});
							}
						}


					};





					    var _defaultSettings = {
					        callback: function () {
					            alert(this.id);
					        }
					    };



					    var _settings = $.extend(_defaultSettings, settings);
					    return this.each(function() {
					    	/*  Rending  to   each match OBj */
					    	var temp = new editorial_new($(this));
					    	temp.constructor();	
					 
					    	function m1(){  temp.runIt(1); }
					    		//var time_flag = setInterval(m1,1000);
					    	$(this).find(".LeftArr").click(function(){
								temp.runIt(0);
							});

					    	$(this).find(".RightArr").click(function(){
								temp.runIt(1);
							});							

							$(this).mouseenter(function(){
								//	clearInterval(time_flag );
									//console.log("enter");
									
							});

							$(this).mouseleave(function(){
								//	clearInterval(time_flag );
								//	time_flag = setInterval(m1,1000);
							});
					    });
					}; 

		});
	})();


	(function(){
	var $ = jQuery;
		$(function () {
		    $("#editorialAd").mytoolbox();
		    $("#editorialAd1").mytoolbox();
		    $("#editorialAd2").mytoolbox();
			$("#editorialAd3").mytoolbox();
			$("#editorialAd4").mytoolbox();
		});
})();