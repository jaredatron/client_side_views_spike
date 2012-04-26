ActivePage.Helper('authentication', {
  loggedIn: function(){
    return !!(this.current_user && this.current_user.id);
  },
});
