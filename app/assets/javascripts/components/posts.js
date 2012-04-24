ActivePage.Component('posts', function(c){

  c.magic = function(){

  };

  ActivePage.state.change('posts', function(){
    c.redraw();
  });

  S('.posts').click(function(){

  });

});
