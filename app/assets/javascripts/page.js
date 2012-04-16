Page = {};
!function(){

  Page.render = function(layout, page, options){
    console.log('page.render called', page);
    var url = location.pathname.replace(/(\.html)?$/,'.json') + location.search;
    options || (options = {});
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json',
      async: false,
      success: function(data){
        console.log(data);
        options.content = Views.render('page', page, data);
        var html = Views.render('layout', layout, options);
        $(document.body).html(html);
        console.log('page.render complete');
      }
    });
  }

}();
