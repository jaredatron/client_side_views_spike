Page = {};
!function(){

  Page.render = function(options){
    console.log('page.render called');
    options.url || (options.url = location.pathname.replace(/(\.html)?$/,'.json') + location.search);
    $.ajax({
      method: 'GET',
      url: options.url,
      dataType: 'json',
      async: false,
      success: function(data){
        console.log(data);
        options.content = Views.render(options.view, data);
        var html = Views.render('layouts/'+options.layout, options);
        console.log(html);
        $(document.body).html(html);
        console.log('page.render complete');
      }
    });

  }

}();
