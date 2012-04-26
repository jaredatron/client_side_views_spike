ActivePage.Component('page-header', function(c){

  c.helper('authentication');

  ActivePage.data.change('current_user', function(){
    c.redraw();
  });

  c.selector
    ('a.login')
      .click(function(link, event){
        link.root().find('.login-form').show().find('input:first').focus();
      })
    .end
    ('.login-form')
      ('input.cancel')
        .click(function(button, event) {
          button.closest('.login-form').hide()
        })
      .end

      .bind('submit-succes', function(form, event){
        ActivePage.data.set('logged_in', true);
      })
    .end

    ('a.logout')
      .bind('ajax:success', function(form, event, data, status, xhr) {
        ActivePage.data.set(data);
      })
      .bind('ajax:error', function(form, event, status, error) {
        alert('logout error', status.responseText);
      })
    .end
  .end;

});


// this would re-draw all page-header components on the page
// ActivePage.Component('page-header').redraw();
