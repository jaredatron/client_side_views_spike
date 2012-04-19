ActivePage.Component('page-header', function(c){

  c.helpers = ['routes', 'authentication'];

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
        c.redraw();
      })
    .end
    ('a.logout')
      .click(function(link, event){
        $.ajax({
          url: '/session',
          method: 'delete',
          success: function(){
            c.redraw();
          }
        });
      })
    .end
  .end;

});


// this would re-draw all page-header components on the page
// ActivePage.Component('page-header').redraw();
