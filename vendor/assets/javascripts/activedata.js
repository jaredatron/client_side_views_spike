function ActiveData(data){
  if (this instanceof ActiveData); else return new ActiveData(data);
  this.data = data || {};
}

$.extend(ActiveData.prototype, {

  keys: function(){
    return Object.keys(this.data);
  },

  get: function(key){
    return this.data[key];
  },

  set: function(key, value){
    var p, old_value;
    if (arguments.length === 1){
      for (p in key) this.set(p, key[p]);
      return this;
    }
    if (arguments.length === 2){
      old_value = this.data[key]
      if (typeof old_value === 'object' || old_value !== value){
        this.data[key] = value;
        this.change(key);
      }
      return this;
    }
    throw new Error('argument error');
  },

  del: function(key){
    delete this.data[key];
    this.change(key);
    return this;
  },

  change: function(key, callback){
    if (arguments.length === 1){
      // TODO possibly delay triggering until the next thread
      // to make batching automatic
      $(this).trigger(key, this.get(key));
    }
    if (arguments.length === 2){
      $(this).bind(key, function(event, value){
        callback.call(this, value, key);
      });
    }
    return this;
  },

  namespace: function(namespace){
    return new ActiveData.Namespace(namespace, this);
  }

});

ActiveData.Namespace = function(prefix, parent){
  if (this instanceof ActiveData.Namespace); else return new ActiveData.Namespace(prefix, parent);
  this.prefix = prefix;
  this.parent = parent;
};

$.extend(ActiveData.Namespace.prototype, {

  keys: function(){
    var regexp = RegExp('^'+this.prefix+':(.+)$');
    return this.parent.keys().map(function(key){
      return key.match(regexp) ? RegExp.$1 : false;
    }).filter(function(key){ return key; });
  },

  get: function(key){
    return this.parent.get(this.prefix+':'+key);
  },

  set: function(key, value){
    this.parent.set(this.prefix+':'+key, value);
    return this;
  },

  del: function(key){
    this.parent.del(this.prefix+':'+key);
    return this;
  },

  change: function(key, callback){
    var namespace = this;
    this.parent.change(this.prefix+':'+key, function(value){
      callback.call(namespace, value, key);
    });
    return this;
  },

  namespace: function(prefix){
    return new ActiveData.Namespace(prefix, this);
  }

});
