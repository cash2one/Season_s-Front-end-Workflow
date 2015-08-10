$(function() {
 	var gameId = $("#gameId").val();
    var guid = $("#guid").val();
    var identifier = $("#identifier").val();
   
    if (gameId !== "" && gameId !=undefined) {//游戏选中
	       var receiveMemberName = $('#receiveMemberName').val();
	       if(checkReceiveMemberName()){
	             $.post("/disburse/queryGameList.htm",{"receiveMemberName":receiveMemberName}, function(data){
	                 var all = data.data.allGameList,
	                     arr = ['abc', 'defg', 'hijk', 'lmno', 'pqrs', 'tuvw', 'xyz', 'tn'];
	                 for (var i = 0; i < arr.length; i++) {
	                     for (var j = 0; j < all[0][arr[i]].length; j++) {
	                         if (gameId === all[0][arr[i]][j].gameId) {
	                         	$('#i_games').val(all[0][arr[i]][j].name).siblings('.tips').hide();
	                             $('#domain').val(all[0][arr[i]][j].domain);
	                             $("#gameName").val(all[0][arr[i]][j].name);
	                             $('#department').val(all[0][arr[i]][j].department);
	                             $("#serverType").val(all[0][arr[i]][j].serverType);
	                             if($("#serverType").val() != 1){ //2有区无服，3有区有服
	                             	$("#game-picker-zone").hide().parents('.txt-wrap').show();
	                             }
	                             return false;
	                         }
	                     }
	                 }
	             });
	         }
         	//区服或guid选中
            if(identifier !=="" ||guid !==""){
                var receiveMemberName = $('#receiveMemberName').val();
                if(checkReceiveMemberName()){
                    $.post("/disburse/queryRegionServer.htm",{"gameId":gameId,"receiveMemberName":receiveMemberName}, function(data){
                        if (data.code === 0) {
        	               if(identifier !=""){
        	            	  var  region = data.data.allRegionList;
        	            	  if (region[0].serverList.length === 0) {
        	                         for (var i = 0; i < region.length; i++) {
                                    	if(identifier === region[i].identifier){
                                    	     $('#i_servers').val(region[i].name).siblings('.tips').hide();
        	                            	 $("#identifier").val(region[i].identifier);
        	                            	 $('#fullName').val(region[i].fullName);
        	                            	 $("#regionId").val(region[i].id);
                                    	}
        	                          }
        	                     } else {
        	                    	 for (var i = 0; i < region.length; i++) {
                                       for (var j = 0; j < region[i].serverList.length; j++) {
                                        	if(identifier === region[i].identifier){
                                        		 $('#i_servers').val(region[i].serverList[j].name).siblings('.tips').hide();
                                        		 $("#identifier").val(region[i].identifier);
        		                            	 $('#fullName').val(region[i].fullName);
        		                            	 $("#regionId").val(region[i].id);
                                        	}
                                        }
        	                    	 }
        	                    }
        	                }
        	                var guids=data.data.guids; 
        	           	    if(guid !="" && guids.length > 1){
               				   for (var i = 0; i < guids.length; i++) {
               					  if(guid == guids[i].id){
               						  $('#guid').val(guids[i].id);
               					  }
         	                   }
        	         	     }
                         }
            	    });
                }
            }     
     }
	
    var getAllGame = function(func) {
	   var receiveMemberName = $('#receiveMemberName').val();
	   if(checkReceiveMemberName()){
		   $.post("/disburse/queryGameList.htm",{"receiveMemberName":receiveMemberName}, function(data){
		          if (data.code === 0) {
		          	  var str =
		                '<div class="heads-wrap">' +
		                  '<ul class="heads">' +
		                   '<li class="select">玩过的</li>' +
		                   '<li>ABC</li>' +
		                   '<li>DEFG</li>' +
		                   '<li>HIJK</li>' +
		                   '<li>LMNO</li>' +
		                   '<li>PQRS</li>' +
		                   '<li>TUVW</li>' +
		                   '<li>XYZ</li>' +
		                   '<li>0-9</li>' +
		                  '</ul>' +
		                '</div>' +
		                ' <div class="bodys-wrap" >',
		                temp = '',
		                played = data.data.playedGameList;
		          		if(played.length == 0){
		          			temp += '<p class="error">您还未玩过任何一款游戏，快去玩下吧！</p>';
		          		}else{
		          			temp = '<ul class="bodys">';
			                for (var i = 0; i < played.length; i++) {
			                  temp += '<li data-domain="' + played[i].domain + '" data-department="' + played[i].department + '" data-gname="' + played[i].name + '" data-gid="' + played[i].gameId + '" data-stype="' + played[i].serverType + '"><span class="name">' + played[i].name + '</span><span class="select"></span></li></li>';
			                }
			                temp += "</ul>";
		             	  
		          		}
			            var all = data.data.allGameList,
			                arr = ['abc', 'defg', 'hijk', 'lmno', 'pqrs', 'tuvw', 'xyz', 'tn'];
			            var cycle = function(str) {
			            for (var i = 0; i < all.length; i++) {
			                  var xhStr = "";
			                  xhStr += '<ul class="bodys none">';
			                  for (var j = 0; j < all[i][str].length; j++) {
			                    var domain = all[i][str][j].domain;
			                    if (domain == undefined) {
			                      domain = "";
			                    }
			                    var hotFlag = 0;
			                    hotFlag = all[i][str][j].hotFlag;
			                    var name = all[i][str][j].name;
			                    var hot = "";
			                    if(hotFlag == 1){
			                    	hot = "hot";
			                    }
			                    xhStr += '<li data-domain="' + domain + '" data-department="' + all[i][str][j].department + '" data-gname="' + all[i][str][j].name + '" data-gid="' + all[i][str][j].gameId + '" data-stype="' + all[i][str][j].serverType + '"><span class="name '+ hot +'">' + name + '</span><span class="select"></span></li></li>';
			                  }
			                  xhStr += '</ul>';
			                  return xhStr;
			                }
			              }
			              for (var i = 0; i < arr.length; i++) {
			                temp += cycle(arr[i]);
			              }
			              str += temp + '</div></div>';
			              $('#game-picker-dialog').html(str);
			          } else{
			        	   $('#game-picker-dialog').html('<div class="heads-wrap"><ul class="heads"><li class="select">所有游戏</li></ul></div><div class="bodys-wrap" ><p class="error">游戏加载失败</p></div>');
			          }
		          	func();
		      });
	   }
       
   };
  
    var getZoneRole = function(func) {
        var gameId = $("#gameId").val();
        var receiveMemberName = $('#receiveMemberName').val();
        if(checkReceiveMemberName()){
        	 $.post("/disburse/queryRegionServer.htm",{"gameId":gameId,"receiveMemberName":receiveMemberName}, function(data){
            	 var gtype = data.data.gameType,
                 region = data.data.allRegionList;
                 if (data.code === 0 && region.length !== 0) {
                    loadOther(data);//加载游戏相关数据
                   	if (gtype != 1) {//如果不是端游，不显示已玩过的
    	               	var str = '<div class="heads-wrap">' +
    	                     '<ul class="heads">' +
    	                     '<li class="select">最近玩过的区服</li>' +
    	                     '</ul>' +
    	                     '</div>' +
    	                     ' <div class="bodys-wrap">',
    	                   tempStr = '',
    	                   played = data.data.playedRegionList;
    	                   var domain = $('#domain').val();
    	                   if (played.length === 0) {
    	                	   str += '<p class="error">您还没有登录过 <span>'+ $.trim($('#i_games').val()) +'，</span><a href="'+ domain +'" id="domainUrl" target="_blank">立即进入游戏</a></p></div>';
    	                   } else {
    	                     if (played[0].serverList.length === 0) {
    	                       tempStr = '<ul class="bodys ">';
    	                       for (var i = 0; i < played.length; i++) {
    	                           tempStr += '<li data-title="' + played[i].name + '" data-identifier="' + played[i].identifier + '" data-fname="' + played[i].fullName + '" data-zid="' + played[i].id + '"><span class="name">'+ played[i].name +'</span><span class="select" style="display: none;"></span></li>';
    	                       }
    	                       str += tempStr + "</ul>";
    	                     } else {
    	                       var a = b = '';
    	                       for (var i = 0; i < played.length; i++) {
    	                           a += '<h5>'+ played[i].name +'</h5><ul class="bodys clearfix">';
    	                           for (var j = 0; j < played[i].serverList.length; j++) {
    	                               a += '<li data-title="' + played[i].serverList[j].name + '" data-identifier="' + played[i].serverList[j].identifier + '" data-fname="' + played[i].serverList[j].fullName + '" data-gid="' + played[i].serverList[j].id + '"><span class="name">'+ played[i].name +'</span><span class="select" style="display: none;"></span></li>';
    	                           }
    	                            + '</ul>';
    	                       }
    	                       str += a + "</div>";
    	                     }
    	                   }
    	                   $('#game-picker-zone').html(str);
    	                   $("#game-picker-zone").show().parents('.txt-wrap').show();
                      }else{
    	                   var str = '<div class="heads-wrap">' +
    	                        '<ul class="heads">' +
    	                         '<li class="select">所有区服</li>' +
    	                        '</ul>' +
    	                      '</div>' +
    	                      ' <div class="bodys-wrap">',
    	                       temp = '';
    	                   if (region.length !== 0) {
    	                       if (region[0].serverList.length === 0) {
    	                           temp = '<ul class="bodys">';
    	                           for (var i = 0; i < region.length; i++) {
    	                               temp += '<li data-title="' + region[i].name + '" data-identifier="' + region[i].identifier + '" data-fname="' + region[i].fullName + '" data-zid="' + region[i].id + '"><span class="name">'+ region[i].name +'</span><span class="select" style="display: none;"></span></li>';
    	                           }
    	                           temp += "</ul></div>";
    	                       } else {
    	                           for (var i = 0; i < region.length; i++) {
    	                               temp += '<h5 data-zid="' + region[i].id + '">'+ region[i].name +'</h5><ul class="bodys clearfix">';
    	                               for (var j = 0; j < region[i].serverList.length; j++) {
    	                                   temp += '<li data-title="' + region[i].serverList[j].name + '" data-identifier="' + region[i].serverList[j].identifier + '" data-fname="' + region[i].serverList[j].fullName + '" data-gid="' + region[i].serverList[j].id + '"><span class="name">'+ region[i].name +'</span><span class="select" style="display: none;"></span></li>';
    	                               }
    	                               + '</ul></div>';
    	                           }
    	                       }
    	                       $('#game-picker-zone').html(str);
    	                       $("#game-picker-zone").show().parents('.txt-wrap').show();
    	                   }
                    }
                    // 加载分账号,角色等级
                    if (data.data.guids.length == 1) {//查询角色等级
                 	   $('#guid').val(data.data.guids[0].id);
                 	   getRoleLevel();
                    }else if (data.data.guids.length > 1) { //多个分账号的时候下拉显示分账号
                 	   var str = '<div class="bodys-wrap">'+
                        '<ul class="bodys">',
                        a_temp = '';
                        for (var i = 0; i < data.data.guids.length; i++) {
                            a_temp += '<li class="eps" data-gid="' + guids[i].id + '" data-title="' + guids[i].name + '"><span class="name">' + guids[i].name + '</span><span class="select"></span></li>';
                        }
                         + "</ul></div></div>";
                        $('#game-picker-role').html(str);
                        $("#game-picker-role").show().parents('.txt-wrap').show();
                    }   
                    func();
                 }else{
                	 $('#game-picker-zone .l-error').show().siblings('p').hide();
                 }
                
               });
        }
       
       }
    
    function loadOther(data){
        // 加载充值数量
        $('#minCharge').val(data.data.minCharge);
        $('#rechargeProportion').val(data.data.rechargeProportion);
        $('#gameUnit').val(data.data.gameUnit);
        //初始化serverType
        $('#serverType').val(data.data.serverType);
        var serverType = data.data.serverType;
        if(serverType == 1) {
        	$('#fullName').val("");
        }
        checkPrice();
    }
    
    function getAllGameLater(){
	    $('#i_games').parent().find('input').addClass('ipt-select');
	    $('#i_games').parent().find('.src-dropdown').attr('class','src-dropdown-unfold');
	    $('#i_games').parent().find('.dd').show();
	 }
    function getZoneRoleLater(){
    	$('#i_servers').parent().find('input').addClass('ipt-select');
    	$('#i_servers').parent().find('.src-dropdown').attr('class','src-dropdown-unfold');
    	$('#i_servers').parent().find('.dd').show();
    }
    // 选择游戏、服务器、角色
    $('body').on('click', '.txt-wrap', function(event) {
      event.stopPropagation();
      $('.txt-wrap').find('input').removeClass('ipt-select')
      $('.txt-wrap').find('.src-dropdown-unfold').attr('class','src-dropdown');
      $('.txt-wrap').find('.dd').hide();
      // 当点击选择游戏的时候才会触发
      if($(this).find('#i_games').length){
        $("#game-picker-zone").parents('.txt-wrap').hide();
        getAllGame(getAllGameLater);
      }else if($(this).find('#i_servers').length){
    	  getZoneRole(getZoneRoleLater);
      }
    });

    $('body').on('click', '.games-wrap, .server-wrap', function(event) {
      event.stopPropagation();
    });

    // 点击游戏区服赋值
    $('body').on('click', '.dd .bodys li', function(event) {
      event.stopPropagation();
      $('.txt-wrap').find('input').removeClass('ipt-select')
      $('.txt-wrap').find('.src-dropdown-unfold').attr('class','src-dropdown');
      $('.txt-wrap').find('.dd').hide();
      if($(this).parents('#game-picker-dialog').length){
          $('#i_games').val($(this).data('gname')).siblings('.tips').hide();
          $("#gameId").val($(this).data('gid'));
          $("#gameName").val($(this).data('gname'));
          $("#department").val($(this).data('department'));
          $("#domain").val($(this).data('domain'));
          $('#serverType').val($(this).data('stype'));
          $('#gameCoinMes').val($(this).data('gcoinmes'));
          $('#gameCoinRemark').val($(this).data('gremark'));
          checkGameId();
          getZoneRole(getZoneRoleLater);
       }else if($(this).parents('#game-picker-zone').length){
    	
          $('#i_servers').val($(this).data('title')).siblings('.tips').hide();
          if ($(this).data('gid') === undefined) {
              $('#regionId').val($(this).data('zid'));
          } else {
              $('#regionId').val($(this).parents('ul').siblings('h5').data('zid'));
              $('#serverId').val($(this).data('gid'));
          }
          $('#fullName').val($(this).data('fname'));
          var idenValue=$(this).data('identifier');
          if (idenValue=='' || idenValue == 'undefined') {
          	$("#identifier").val("");
          }else{
          	$("#identifier").val(idenValue);
          }
	      if($('#serverType').val()!=1){
			// checkRegion();
		  }
       }
    });
    
    $('.select-wrap').on('click', '.game-picker-wrap .clearfix li a', function(event) {
        event.preventDefault();
        $(this).parent('li').addClass('active').siblings('li').removeClass('active');
        var index = $(this).attr('href').indexOf('#');
        var id = $.trim($(this).attr('href').slice(index));
        $('.game-picker-wrap').find(id).addClass('active').siblings('div').removeClass('active');
    });


})
   

