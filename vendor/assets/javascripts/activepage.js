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
      var view_context = new ActivePage.ViewContext;
      var html = view_context.render_layout(layout, {
        content: view_context.render_page(page, data)
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
    var view_context = new ActivePage.ViewContext;
    // view_context.include(helpers);
    return view_context.render_view('components/'+this.name, locals);
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



ActivePage.Views = {
  templates: {},
  register: function(name, value){
    this.templates[name] = value;
    return this;
  },
  render: function(name, locals){
    var template = this.templates[name];
    if (!template) throw new Error('view not found: '+name);
    return template(locals);
  }
};

ActivePage.ViewContext = new Constructor({

  initialize: function(){
    ActivePage.ViewContext.mixins.forEach(this.include.bind(this));
  },

  include: function(mixin){
    $.extend(this, mixin);
    return this;
  },

  render_view: function(name, locals){
    return ActivePage.Views.render(name, $.extend({}, this, locals));
  },

  render_layout: function(name, locals){
    return this.render_view('layouts/'+name, locals);
  },

  render_page: function(name, locals){
    return this.render_view('pages/'+name, locals);
  },

  render_component: function(name, locals){
    return ActivePage.Component(name).render(locals);
  }

});

ActivePage.ViewContext.mixins = [];
ActivePage.ViewContext.include = function(mixin){
  this.mixins.push(mixin);
  return this;
};


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
