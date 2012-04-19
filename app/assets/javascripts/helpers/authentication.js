ActivePage.Helper('authentication', {
  loggedIn: function(){
    return !!this.data.get('loggedIn');
  },
});
