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
      for (var p in key) this.set(p, key[p]);
    }else{
      old_value = this.data[key]
      if (old_value !== value){
        this.data[key] = value;
        // TODO possibly delay triggering until the next thread
        // to make batching automatic
        $(this).trigger(key, value);
      }
    }
    return this;
  },

  del: function(key){
    delete this.data[key];
    $(this).trigger(key, undefined);
    return this;
  },

  change: function(key, callback){
    $(this).bind(key, function(event, value){
      callback.call(this, value, key);
    });
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

// TESTS
// DATA = new ActiveData;
// DATA.set('name', 'steve');
// console.log('name', DATA.get('name'));
// DATA.change('name', function(){
//   console.log('NAME CHANGED', this, arguments);
// });
// DATA.set('name', 'frank');

// FRIENDS = DATA.namespace('friends');
// FRIENDS.set('best','jared');
// FRIENDS.set('worst','tony');
// FRIENDS.change('best', function(){
//   console.log('BESST FRIEND CHANGES', this, arguments);
// });
// FRIENDS.set('best','Chris');
// FRIENDS.del('best');

// FEET = FRIENDS.namespace('feet');
// FEET.set('left','LEFT');
// FEET.set('right','RIGHT');
// FEET.change('left', function(){
//   console.log('FRIEND LEFT FEET CHANGED', this, arguments);
// });
// FEET.set('left','L3FT');
// FEET.del('left');

// !function(){
//   var data = {}, callbacks = {};

//   function ActiveData(key, value){
//     key = String(key);

//     // GET
//     if (arguments.length === 1) return data[key];

//     if (arguments.length === 2){
//       // BIND
//       if (typeof value === 'function'){
//         (callbacks[key] || (callbacks[key] = [])).push(value);
//         return ActiveData;
//       }

//       // SET
//       data[key] = value;
//       (callbacks[key] || []).forEach(function(callback){
//         callback.call({value:value, key:key}, value, key);
//       });
//       return ActiveData;
//     }

//     throw new Error('ArgumentError');
//   }

//   window.ActiveData = ActiveData;

//   ActiveData.toString = function(){
//     return '[ActiveData]';
//   };

//   ActiveData.namespace = function(namespace){
//     var parent_namespace = namespace;
//     function Namespace(key, value){
//       arguments[0] = namespace+':'+arguments[0];
//       var r = ActiveData.apply(this, arguments);
//       return typeof r === 'function' ? Namespace : r;
//     }
//     Namespace.namespace = function(namespace){
//       return ActiveData.namespace(parent_namespace+':'+namespace);
//     }
//     Namespace.toString = function(){
//       return '[ActiveData Namespace: '+namespace+']';
//     };
//     return Namespace;
//   };

// }();
