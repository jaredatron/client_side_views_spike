ActivePage = {};

ActivePage.state = new ActiveData();

ActivePage.render = function(){
  console.log('page.render called', page);

  var
    layout = ActivePage.state.get('layout'),
    page   = ActivePage.state.get('page'),
    url    = location.pathname.replace(/(\.html)?$/,'.json') + location.search;

  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'json',
    async: false,
    success: function(data){
      console.log(data);
      var html = Views.render('layout', layout, {
        content: content = Views.render('page', page, data)
      });
      $(document.body).html(html);
      console.log('page.render complete');
    }
  });
}

ActivePage.Component = function(name, block){
  if (this instanceof ActivePage.Component); else return new ActivePage.Component(name, block);
  if (typeof name !== 'string') throw new Error('name must be a string');
  var component = ActivePage.components[name];
  if (!component){
    component = ActivePage.components[name] = this;
    component.name = name;
  }
  if (block) block.call(component, component);
  return component;
}

ActivePage.components = {};

$.extend(ActivePage.Component.prototype, {
  view: function(locals){
    return '<strong>the '+this.name+' component has no view</strong>';
  },
  render: function(locals){
    return this.view(locals);
  },
  redraw: function(){
    console.log('redrawing', this);
  }
});


ActivePage.Helper = function(name, value){
  // TODO make this extend instead of overwrite
  ActivePage.helpers[name] = value;
};

ActivePage.helpers = {};

//   data: {}
// };

// ActivePage.State.Namespace = new Constructor({
//   initialize: function(name){
//     this.name = name;
//   },

//   set: function(key, value){
//     return store[this.namespace+':'+key] = value;
//   },

//   get: function(key){
//     return store[this.namespace+':'+key];
//   },

//   on: function(events, keys, callback){

//   },
// });


// ActivePage.State.set('logged_in', true);
// ActivePage.State.get('logged_in'); //-> true

// ActivePage.State.change('logged_in', function(logged_in){
//   alert('you are '+(logged_in ? 'now' : 'no longer')+' logged in');
// }); //-> true

// ActivePage.State.set('logged_in', true); //-> alerts "you are no longer logged in"
// ActivePage.State.set('logged_in', false); //-> alerts "you are now logged in"


// ActivePage.State.Namespace.prototype.set
//   store: {},

//   namespace: '',



// };
