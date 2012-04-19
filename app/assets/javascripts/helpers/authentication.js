ActivePage.Helper('authentication', {
  loggedIn: function(){
    return !!this.state('logged_in');
  },
});
