/* jshint devel:true */
;(function($){

  // 左侧导航栏切换
  $('body').on('click', '.leftmenus li', function(event) {
    event.preventDefault();
    $(this).addClass('current').siblings('li').removeClass('current');
  });

  // 给他人充值
  $('body').on('click', '.others a', function(event) {
    event.preventDefault();
    var account = $(this).data('account');
    $('.others').hide().siblings('.oneself').show();
    $('#i_account').val(account).select().siblings('.tips').hide();
  });

  /* 充值金额、选择银行 */
  $('body').on('mouseover', '.money-wrap li, .banks-wrap li, .sim-wrap li, .gcards-wrap li, .bodys li', function(){
    $(this).find('.select').show();
    $(this).css('zIndex',20).siblings('li').removeAttr('style');
  }).on('mouseout', '.money-wrap li, .banks-wrap li, .sim-wrap li, .gcards-wrap li, .bodys li', function(){
    if($(this).find('.src-flag:visible').length){
      $(this).find('.select').show();
    }else{
      $(this).find('.select').hide();
      $(this).removeAttr('style');
    }
  });

  $('body').on('click', '.money-wrap li, .banks-wrap li:not(.more-bank, .fold-bank), .sim-wrap li, .gcards-wrap li', function(event) {
	  $('.item').find('.default').show().siblings('.click').hide();
    $(this).parent('ul').find('.select, .src-flag').hide();
    $(this).parent('ul').siblings('ul').find('.select, .src-flag').hide();
    $(this).find('.select, .src-flag').show();
    $(this).css('zIndex',20).siblings('li').removeAttr('style');
  });

  $('body').on('click', function(event) {
    $('.txt-wrap').find('input').removeClass('ipt-select');
    $('.txt-wrap').find('.src-dropdown-unfold').attr('class','src-dropdown');
    $('.dd').hide();
    $('#input-money').tooltip(
      {
        title:'充值金额只能是正整数'
      }
    ).tooltip('show');
  });
  /* 充值金额、选择银行 end */

  // 点击其他金额
  $('body').on('click', '.item', function(event) {
    event.stopPropagation();
    $(this).find('.default').hide().siblings('.click').show();
    $(this).find('.txt-ssm').focus().siblings('.tips').hide();
 
  });

  /* 选择游戏、积分优惠券 tab 切换 */
  $('body').on('click', '.heads li', function(event) {
    event.stopPropagation();
    var index = $(this).index();
    $(this).addClass('select').siblings().removeClass('select');
    $(this).parents('.heads-wrap').siblings('.bodys-wrap').find('.bodys, .error').hide().eq(index).show();
  });

  var discountHtml = $('.discount-wrap').html();
  $('body').on('click', '.tabs li', function(event) {
    event.preventDefault();
    // 清空优惠券选择
    //$('.discount-wrap').html(discountHtml);
    cashNum = fullNum = 0;

    var index = $(this).index();
    $(this).addClass('select').siblings().removeClass('select');
    $('.discount').hide()
    $(this).parent('.tabs').siblings('.discount').eq(index).show();
  });
  /* 选择游戏、积分优惠券 tab 切换 end */

  /* 更多银行、更多积分优惠券 */
  $('body').on('click', '.more-bank', function(event) {
    $(this).addClass('none');
    $('.fold-bank').removeClass('none');
    $('#min-banks').show();
  });
  $('body').on('click', '.fold-bank', function(event) {
    $(this).addClass('none');
    $('.more-bank').removeClass('none');
    $('#min-banks').hide();
  });

  $('body').on('click', '.help a', function(event) {
    event.preventDefault();
    var bool = $(this).find('i').hasClass('src-down');
    if(bool){
      $(this).html('收起<i class="src-up"></i>');
      $(this).parents('.discount').height('auto');
      $(this).parents('.help').siblings('.min-tickets').slideDown();
    }else{
      $(this).html('展开<i class="src-down"></i>');
      $(this).parents('.help').siblings('.min-tickets').slideUp(function(){
        $(this).parents('.discount').height('140px');
      });
    }
  });
  /* 更多银行、更多积分优惠券 end */

  /* 优惠券、满减券 */
  $('body').on('click', '.tickets-wrap li', function(event) {
    var className = $(this).attr('class');
    if(!yhqPayLimit){
    	yhqPayLimit = 5;
    }
    if(className.indexOf('cash') !== -1){
      if(className.indexOf('select') !== -1 && GLOBAL.cashNum < yhqPayLimit+1){
        $(this).attr('class', "src-cash");
        if(GLOBAL.cashNum === 0){
        	GLOBAL.cashNum = 0;
        }else{
        	GLOBAL.cashNum--;
        }
        GLOBAL.isMaxFee = true;
      }else if(GLOBAL.cashNum < yhqPayLimit && GLOBAL.isMaxFee){
        $(this).attr('class', "src-cash-select");
        GLOBAL.cashNum++;
      }
    }else{
      if(className.indexOf('select') !== -1 && GLOBAL.fullNum < 2){
        $(this).attr('class', "src-full");
        if(GLOBAL.fullNum === 0){
        	GLOBAL.fullNum = 0;
        }else{
        	GLOBAL.fullNum--;
        }
      }else if(GLOBAL.fullNum < 1){
        $(this).attr('class', "src-full-select");
        GLOBAL.fullNum++;
      }
    }
  });
  /* 优惠券、满减券 end */

})(jQuery);

