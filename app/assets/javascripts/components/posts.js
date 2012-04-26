ActivePage.Component('posts', function(c){

  c.magic = function(){

  };

  ActivePage.data.change('posts', function(){
    c.redraw();
  });

  S('.posts').click(function(){

  });

});
