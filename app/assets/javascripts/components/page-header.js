ActivePage.Component('page-header', function(c){

  c.helpers('authentication');

  ActivePage.state.change('logged_in', function(){
    c.redraw();
  });

  S('.component.page-header')
    ('a.login')
      .click(function(link, event){
        link.closest('.component.page-header').find('form.login').show();
      })
    .end
    ('form.login')
      .bind('submit-succes', function(form, event){
        ActivePage.state.set('logged_in', true);
      })
    .end
    ('a.logout')
      .click(function(link, event){
        $.post('/logout', function(){
          ActivePage.state.set('logged_in', false);
        });
      })
    .end
  .end;

});


// this would re-draw all page-header components on the page
// ActivePage.Component('page-header').redraw();
