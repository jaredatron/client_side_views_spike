ActivePage.Component('page-header', function(c){

  c.helper('authentication');

  function dataChange(key, value){
    console.log('redrawing because data changed', arguments);
    c.redraw();
  }

  c.watch('current_user.name', dataChange);

  // it would be awesome if we could subscribe to set of
  // data patterns and have our callback called once when
  // any matching data changes


  c.selector
    ('a.login')
      .click(function(link, event){
        link.root().find('.login-form').show().find('input:first').focus();
      })
    .end

    ('a.logout')
      .bind('ajax:success', function(form, event, data, status, xhr) {
        ActivePage.data.extend(data).changed();
      })
      .bind('ajax:error', function(form, event, status, error) {
        alert('logout error', status.responseText);
      })
    .end
  .end;

});


// this would re-draw all page-header components on the page
// ActivePage.Component('page-header').redraw();
