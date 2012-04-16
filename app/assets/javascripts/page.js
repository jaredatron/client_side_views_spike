Page = {};
!function(){

  Page.render = function(options){
    console.log('page.render called');
    options.url || (options.url = location.pathname.replace(/(\.html)?$/,'.json') + location.search);
    $.ajax({
      method: 'GET',
      url: options.url,
      dataType: 'json',
      // async: false,
      success: function(data){
        console.log(data);
        options.content = Views.render(options.view, data);
        var layout = Views.render('layouts/'+options.layout, options);
        console.log(layout);
        document.open();
        document.write(layout);
        document.close();
        $(document).trigger('ready');
        console.log('page.render complete');
      }
    });

  }

}();
