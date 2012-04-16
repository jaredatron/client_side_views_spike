Page = {};
!function(){

  Page.render = function(view){
    url = location.pathname.replace(/(\.html)?$/,'.json') + location.search;
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json',
      async: false,
      success: function(data){
        console.log(data);
        var html = Views.render(view, data);
        $('body').html(html);
      }
    });

  }

}();
