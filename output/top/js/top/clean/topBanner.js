/*TEMPLATE=user/media.cs*/
!function(a){function b(b,c){return parseInt(a.css(b[0],c))||0}function c(a){return a[0].offsetWidth+b(a,"marginLeft")+b(a,"marginRight")}function d(a){return a[0].offsetHeight+b(a,"marginTop")+b(a,"marginBottom")}a.fn.jCarouselLite=function(b){return b=a.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:!1,auto:null,speed:200,easing:null,vertical:!1,circular:!0,visible:3,start:0,scroll:1,currentItemIndex:null,currentItemOrder:null,beforeStart:function(){},direct:!0,item_num:0,show_main_pic:function(b){var b=a(b),c=a(".mainBanner"),d=c.find("img");b.addClass("curr").siblings().removeClass("curr"),d.attr("src",b.find("img").attr("src2")),c.attr("href",b.find("a").attr("href")),c.attr("onclick",b.find("a").attr("onclick")),c.attr("alt",b.find("a").attr("alt")),c.attr("title",b.find("a").attr("title"))},afterEnd:function(c){if(b.direct)var d=a(c[0]).index()-1;else var d=a(c[0]).index()+1;null===b.currentItemOrder?b.show_main_pic(c[0]):b.isChangePosition?(b.currentItemIndex=1*(b.currentItemOrder-d),b.show_main_pic(c[b.currentItemIndex]),b.isChangePosition=!1):b.show_main_pic(c[b.currentItemIndex])}},b||{}),this.each(function(){function e(){return o.slice(q).slice(0,n)}function f(c){if(!g){if(b.beforeStart&&b.beforeStart.call(this,e()),b.circular)c<=b.start-n-1?(k.css(h,-((p-2*n)*r)+"px"),q=c==b.start-n-1?p-2*n-1:p-2*n-b.scroll):c>=p-n+1?(k.css(h,-(n*r)+"px"),q=c==p-n+1?n+1:n+b.scroll):q=c;else{if(0>c||c>p-n)return;q=c}g=!0,k.animate("left"==h?{left:-(q*r)}:{top:-(q*r)},b.speed,b.easing,function(){b.afterEnd&&b.afterEnd.call(this,e()),g=!1}),b.circular||(a(b.btnPrev+","+b.btnNext).removeClass("disabled"),a(q-b.scroll<0&&b.btnPrev||q+b.scroll>p-n&&b.btnNext||[]).addClass("disabled"))}return!1}var g=!1,h=b.vertical?"top":"left",i=b.vertical?"height":"width",j=a(this),k=a("ul",j),l=a("li",k),m=l.size(),n=b.visible;b.circular&&(k.prepend(l.slice(m-n-1+1).clone()).append(l.slice(0,n).clone()),b.start+=n);var o=a("li",k),p=o.size(),q=b.start;j.css("visibility","visible"),o.css({overflow:"hidden","float":b.vertical?"none":"left"}),k.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"}),j.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var r=b.vertical?d(o):c(o),s=r*p,t=r*n;o.css({width:o.width(),height:o.height()}),k.css(i,s+"px").css(h,-(q*r)),j.css(i,t+"px"),b.btnPrev&&a(b.btnPrev).click(function(){return b.direct=!1,f(q-b.scroll)}),b.btnNext&&a(b.btnNext).click(function(){return b.direct=!0,f(q+b.scroll)}),b.btnGo&&a.each(b.btnGo,function(c,d){a(d).click(function(){return f(b.circular?b.visible+c:c)})}),b.mouseWheel&&j.mousewheel&&j.mousewheel(function(a,c){return f(c>0?q-b.scroll:q+b.scroll)});var u=null;b.auto&&(u=setInterval(function(){f(q+b.scroll)},b.auto+b.speed));var v=function(){u=setInterval(function(){f(q+b.scroll)},b.auto+b.speed)},w=function(){clearInterval(u)};a("#tbg").bind("mouseenter",function(){w()}),a("#tbg").bind("mouseleave",function(){w(),v()}),b.item_num=a("#tbg .mid a").length,a("#banners li").bind("mouseenter",function(){var c=a(this);b.show_main_pic(c),c.addClass("curr").siblings().removeClass("curr"),b.currentItemOrder=c.index(),b.isChangePosition=!0})})}}(jQuery);