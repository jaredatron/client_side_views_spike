ActivePage.Component('login-form', function(c){

  c.selector
    ('form')
      .bind('ajax:success', function(form, event, data, status, xhr) {
        ActivePage.data.extend(data).changed();
      })
      .bind('ajax:error', function(form, event, status, error) {
        alert('login error', status.responseText);
      })
    .end
  .end;

});
