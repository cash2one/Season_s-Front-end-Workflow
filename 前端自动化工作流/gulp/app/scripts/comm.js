;$(function(){

  // 公告
  $(".toolbar-info .close").click(function(){
      $(this).parent().slideUp(1000);
  })

  var tbfunc = function(){},
      tbobj = {
        $toolbar: $(".toolbar-wrap")
      };
      tbobj.top = tbobj.$toolbar.offset().top;
  tbfunc.prototype = {
    fixed: function(top){
      var scrollTop = $(window).scrollTop();
      if(scrollTop > top){
        tbobj.$toolbar.addClass('fixed');
      }else if(scrollTop < top){
        tbobj.$toolbar.removeClass('fixed');
      }
    }
  };

  var tbins = new tbfunc();
  tbins.fixed(tbobj.top);
  $(window).scroll(function(){
    tbins.fixed(tbobj.top);
  })


  /* 在线客服 */
  $('.service').on('click', function(event) {
    $(this).parents('.service-wrap').animate({
      right: '-198'
    }, 1000, function(){
      $(this).find('.service').hide();
      $(this).find('.service-unfold').show();
      $(this).animate({
        right: '0'
      }, 1000)
    })
  });

  $('.serve').on('click', function(event) {
    $(this).parents('.service-wrap').animate({
      right: '-198'
    }, 1000, function(){
      $(this).find('.service-unfold').hide();
      $(this).find('.service').show();
      $(this).animate({
        right: '0'
      }, 1000)
    })
  });
  /* 在线客服 end */

});