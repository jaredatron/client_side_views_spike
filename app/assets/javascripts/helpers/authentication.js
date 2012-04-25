ActivePage.Helper('authentication', {
  currentUser: function(){
    return this.state('current_user');
  },
  loggedIn: function(){
    var currentUser = this.currentUser();
    return(
      currentUser !== null &&
      typeof this.currentUser() === 'object'
    );
  },
});
