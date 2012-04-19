ActivePage.Component('posts', function(c){

  ActivePage.state.change('posts', function(){
    c.redraw();
  });

});
