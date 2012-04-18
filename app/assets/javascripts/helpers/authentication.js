ActivePage.Helpers('authentication', {
  loggedIn: function(){
    return !!this.data.get('loggedIn');
  },
});
