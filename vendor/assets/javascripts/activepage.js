ActivePage = {};

ActivePage.state = new ActiveData();

ActivePage.render = function(layout, page){
  var
    view_context = new ActivePage.ViewContext,
    page_content = view_context.render_page(page),
    html         = view_context.render_layout(layout, {content: page_content});
  $(document.body).html(html);
}

ActivePage.reload = function(){
  var url = location.pathname.replace(/(\.html)?$/,'.json') + location.search;
  $.getJSON(url, function(page_state){
    ActivePage.state.set(page_state);
  });
}

ActivePage.Component = new Constructor({

  initialize: function(name, block){
    if (this instanceof ActivePage.Component); else return new ActivePage.Component(name, block);
    if (typeof name !== 'string') throw new Error('name must be a string');
    var component = ActivePage.components[name];
    if (!component){
      component = ActivePage.components[name] = this;
      component.name = name;
      component._helpers = [];
    }
    if (block) block.call(component, component);
    return component;
  },

  helpers: function(){
    if (arguments.length > 0) [].push.apply(this._helpers, arguments);
    return this._helpers;
  },

  render: function(locals){
    var view_context, html;
    view_context = new ActivePage.ViewContext;
    this.helpers().forEach(function(helper){
      view_context.include(ActivePage.Helper(helper));
    });
    html = view_context.render_view('components/'+this.name, locals);
    return '<div class="'+this.name+'">'+html+'</div>';
  },

  redraw: function(){
    $('.'+this.name).replaceWith(this.render());
    return this;
  }

});

ActivePage.components = {};

ActivePage.Helper = function(name, value){
  // TODO make this extend instead of overwrite
  if (arguments.length === 0){
    throw new Error('name required');
  }
  if (arguments.length === 1){
    value = ActivePage.helpers[name];
    if (!value) {
      debugger;1
      throw new Error('unknown helper '+name);
    }
  }
  if (arguments.length === 2){
    ActivePage.helpers[name] = value;
  }
  return value;
};

ActivePage.helpers = {};





ActivePage.Views = {
  templates: {},
  register: function(name, value){
    this.templates[name] = value;
    return this;
  },
  render: function(name, locals){
    var template = this.templates[name] || function(){
      var error = new Error('ActivePage.TemplateMissing: '+name);
      return "\n<pre class='error'>" + Haml.html_escape(error.stack) + "</pre>\n";

    }
    return template(locals);
  }
};

// ActivePage.TemplateMissing = function(template){
//   var tmp = Error.prototype.constructor.apply(this, arguments);

//   for (var p in tmp) {
//     if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
//   }

//   this.template = template;
//   this.message = tmp.message;
// }
// ActivePage.TemplateMissing.prototype = new Error;
// ActivePage.TemplateMissing.prototype.name = 'ActivePage.TemplateMissing';

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

ActivePage.ViewContext.include({
  state: function(key){
    return ActivePage.state.get(key);
  }
});
