/*TEMPLATE=user/media.cs*/
(function($){
	$(document).ready(function(){

			//var getItemHistoryUrl='http://ws.rakuten.com.tw/footprints/rest/1.0/json/list/get?c=?';	//JSONP
            var footprinturl = "http://ws.rakuten.com.tw/footprints/rest/1.0/json/list/get?c=footprintCallbackWall";
            window.footprintCallbackWall = function(data){
											
												 
				if(data != null && data.items.length > 0){
					var itemArray = new Array();
					var groupItemCount = 10;
					var items = data.items;
					
					var objArrayLength = items.length;
							
					if(objArrayLength >= groupItemCount){
						objArrayLength = groupItemCount;
					}
					
					var testStr = "";
					for(var j=0; j<objArrayLength; j++){
						var itemName = items[j].name;
						var itemShName = '';
						if(itemName.length >= 28){
							itemShName = itemName.substring(0,22);
						}else{
							itemShName = itemName;
						}
						
						if(j<=2){
							itemArray.push('<li class="photolist">');
							itemArray.push('<div class="img">');
							itemArray.push('<a title="');
							itemArray.push(itemShName);
							itemArray.push('..." href="');
							itemArray.push(items[j].uri);
							itemArray.push('?f-id=FOOTPRINTS_CATEGORY">');
							itemArray.push('<img src="');
							itemArray.push(items[j].img);
							itemArray.push('" /></a></div>');
							itemArray.push('<span><a title="');
							itemArray.push(itemShName);
							itemArray.push('..." class="txtlink" href="');
							itemArray.push(items[j].uri);
							itemArray.push('?f-id=FOOTPRINTS_CATEGORY">');
							itemArray.push(itemShName);
							itemArray.push('...</a></span></li>');			
						}else{
							itemArray.push('<li><a title="');
							itemArray.push(itemShName);
							itemArray.push('..." href="');
							itemArray.push(items[j].uri);
							itemArray.push('?f-id=FOOTPRINTS_CATEGORY">');
							itemArray.push(itemShName);
							itemArray.push('...</a></li>');
						}
					}
					$('#itemList_pn').html(itemArray.join(""));	
				}else{
					$('#viewHistory').addClass('vh-none');	
				}
			};

            $.ajax({
                url: footprinturl,
                dataType: "script",
                type: "GET",
                cache: true,
                callback: footprintCallbackWall,
                data: null
            });
//			$.getJSON(getItemHistoryUrl,function(data){
//											
//												 
//				if(data != null && data.items.length > 0){
//					var itemArray = new Array();
//					var groupItemCount = 10;
//					var items = data.items;
//					
//					var objArrayLength = items.length;
//							
//					if(objArrayLength >= groupItemCount){
//						objArrayLength = groupItemCount;
//					}
//					
//					var testStr = "";
//					for(var j=0; j<objArrayLength; j++){
//						var itemName = items[j].name;
//						var itemShName = '';
//						if(itemName.length >= 28){
//							itemShName = itemName.substring(0,22);
//						}else{
//							itemShName = itemName;
//						}
//						
//						if(j<=2){
//							itemArray.push('<li class="photolist">');
//							itemArray.push('<div class="img">');
//							itemArray.push('<a title="');
//							itemArray.push(itemShName);
//							itemArray.push('..." href="');
//							itemArray.push(items[j].uri);
//							itemArray.push('?f-id=FOOTPRINTS_CATEGORY">');
//							itemArray.push('<img src="');
//							itemArray.push(items[j].img);
//							itemArray.push('" /></a></div>');
//							itemArray.push('<span><a title="');
//							itemArray.push(itemShName);
//							itemArray.push('..." class="txtlink" href="');
//							itemArray.push(items[j].uri);
//							itemArray.push('?f-id=FOOTPRINTS_CATEGORY">');
//							itemArray.push(itemShName);
//							itemArray.push('...</a></span></li>');			
//						}else{
//							itemArray.push('<li><a title="');
//							itemArray.push(itemShName);
//							itemArray.push('..." href="');
//							itemArray.push(items[j].uri);
//							itemArray.push('?f-id=FOOTPRINTS_CATEGORY">');
//							itemArray.push(itemShName);
//							itemArray.push('...</a></li>');
//						}
//					}
//					$('#itemList_pn').html(itemArray.join(""));	
//				}else{
//					$('#viewHistory').addClass('vh-none');	
//				}
//			});		
	});
})(jQuery);