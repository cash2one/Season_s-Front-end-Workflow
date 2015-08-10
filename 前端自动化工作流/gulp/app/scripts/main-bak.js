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

  // 选择游戏、服务器、角色
  $('body').on('click', '.txt-wrap', function(event) {
    event.stopPropagation();
    $('.txt-wrap').find('input').removeClass('ipt-select')
    $('.txt-wrap').find('.src-dropdown-unfold').attr('class','src-dropdown');
    $('.txt-wrap').find('.dd').hide();
    $(this).find('input').addClass('ipt-select');
    $(this).find('.src-dropdown').attr('class','src-dropdown-unfold');
    $(this).find('.dd').show();
  });

  /* 充值金额、选择银行 */
  $('body').on('mouseover', '.money-wrap li, .banks-wrap li, .sim-wrap li, .gcards-wrap li, .bodys li', function(){
    $($(this).find('.select').length)
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

  $('body').on('click', '.money-wrap li, .banks-wrap li, .sim-wrap li, .gcards-wrap li', function(event) {
    $(this).parent('ul').find('.select, .src-flag').hide();
    $(this).find('.select, .src-flag').show();
    $(this).css('zIndex',20).siblings('li').removeAttr('style');
  });

  $('body').on('click', function(event) {
    $('.txt-wrap').find('input').removeClass('ipt-select')
    $('.txt-wrap').find('.src-dropdown-unfold').attr('class','src-dropdown');
    $('.dd').hide();
    $('#input-money').tooltip(
      {
        title:'123'
      }
    ).tooltip('show');
  });
  /* 充值金额、选择银行 end */

  // 点击其他金额
  $('body').on('click', '#item', function(event) {
    event.stopPropagation();
    $(this).find('.default').hide().siblings('.click').show();
    $(this).find('.txt-ssm').focus().siblings('.tips').hide();
    $('#input-money').tooltip('show');
  });

  /* 选择游戏、积分优惠券 tab 切换 */
  $('body').on('click', '.heads li', function(event) {
    event.preventDefault();
    var index = $(this).index();
    $(this).addClass('select').siblings().removeClass('select');
    $(this).parents('.heads-wrap').siblings('.bodys-wrap').find('.bodys, .error').hide().eq(index).show();
  });

  var discountHtml = $('.discount-wrap').html();
  $('body').on('click', '.tabs li', function(event) {
    event.preventDefault();
    // 清空优惠券选择
    $('.discount-wrap').html(discountHtml);
    cashNum = fullNum = 0;

    var index = $(this).index();
    $('.discount-wrap .tabs li').eq(index).addClass('select').siblings().removeClass('select');
    $('.discount-wrap .discount').eq(index).show().siblings('.discount').hide();
  });
  /* 选择游戏、积分优惠券 tab 切换 end */

  /* 更多银行、更多积分优惠券 */
  $('body').on('click', '.more-bank', function(event) {
    $(this).remove();
    $('#min-banks').show();
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
  var cashNum = fullNum = 0;
  $('body').on('click', '.tickets-wrap li', function(event) {
    var className = $(this).attr('class');
    if(className.indexOf('cash') !== -1){
      if(className.indexOf('select') !== -1 && cashNum < 7){
        $(this).attr('class', "src-cash");
        if(cashNum === 0){
          cashNum = 0;
        }else{
          cashNum--;
        }
      }else if(cashNum < 6){
        $(this).attr('class', "src-cash-select");
        cashNum++;
      }
    }else{
      if(className.indexOf('select') !== -1 && fullNum < 2){
        $(this).attr('class', "src-full");
        if(fullNum === 0){
          fullNum = 0;
        }else{
          fullNum--;
        }
      }else if(fullNum < 1){
        $(this).attr('class', "src-full-select");
        fullNum++;
      }
    }
  });
  /* 优惠券、满减券 end */

})(jQuery);

