

// data = ActiveObject();

// $.extend(data,{
//   current_user:{
//     name: 'Jared'
//   },
//   petitions: [
//     {id:1, title: 'save shit'},
//     {id:2, title: 'dont do that'},
//   ]
// });

// data.changed();
// // here we mutate all the data into a flat set so
// // we can detect changes

// // you can access your data how you'd expect
// data.current_user.name //=> 'Jared'
// data.petitions[0].id   //=> 1

// // you can subscribe to changes via the flat
// data.watch('current_user.name', function(){ … })

// data.current_user.name = 'Steve'
// data.changed();


// • store the data in normal js object
// • when a save/change event is fired we mutate the entire data
// into a flat set and check for changes
// • you can subscribe to changes via the flat key reference


function ActiveData(data){
  if (this instanceof ActiveData); else return new ActiveData(data);
  this.data = data || {};
  this.values = {};
  this.watchers = {};
}

$.extend(ActiveData.prototype, {

  keys: function(){
    return Object.keys(this.data);
  },

  extend: function(object){
    $.extend(this.data, object);
    return this;
  },

  //
  changed: function() {
    var
      values  = this.values
      changes = [];

    function updateValues(object, namespace) {
      var p, key, value;
      for(var p in object){
        if (object.hasOwnProperty(p)){
          value = object[p];

          // format the key based on valid JS
          key = p.match(/^[a-z_]+[a-z0-9_]*$/i) ?
            (namespace ? '.' : '')+p :
            p.match(/^[0-9]+$/) ? '['+p+']' : '["'+p+'"]';
          if (namespace) key = namespace+key;

          if (typeof value === 'string' || typeof value === 'number'){
            if (!(key in values) || (key in values && values[key] !== value)){
              changes.push(key)
            }
            values[key] = value
          }else{
            updateValues(value, key);
          }
        }
      }
    }

    updateValues(this.data);

    var key, properties, code, last_property, last_object;

    for (key in values){
      properties    = ('data.'+key).split(/\]?\.|\[/);
      last_property = properties.pop();
      code          = 'this["'+properties.join('"]["')+'"]';
      try{ last_object = eval(code); }catch(e){}
      if (last_object && last_property in last_object);else{
        changes.push(key); delete values[key]
      }
    }

    console.log('changes', changes);

    changes.forEach(function() {

    });

    return this;
  },

  watch: function(pattern, callback) {
    pattern = pattern
      .replace(/\*/g, "__STAR__")
      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
      .replace(/__STAR__/g, "[^\]]+")
    ;
    pattern = RegExp(pattern);
    this.watchers[pattern] || (this.watchers[pattern] = []).push(callback);
    return this;
  }

});

ad = new ActiveData;

ad.watch('*', function(){
  console.log('CHANGES', arguments);
});

ad.data.a = 1;
ad.data.b = 2;
ad.data.c = 'C';
ad.data.current_user = {
  name: 'Jared',
  age: 29,
  "a crazy key": 'zomg',
  "99": 'bitchez',
  friends: [
    {name: 'Chris', age: 28},
    {name: 'Megan', age: 23},
  ],
};

ad.changed();

ad.changed();

ad.data.an={
  example:{
    "of something":['very',{
      complicated: {
        'and super': 'complex'
      }
    }]
  }
};

ad.changed();

console.dir(ad.data);
console.dir(ad.values);


// ActiveData.Namespace = function(prefix, parent){
//   if (this instanceof ActiveData.Namespace); else return new ActiveData.Namespace(prefix, parent);
//   this.prefix = prefix;
//   this.parent = parent;
// };

// $.extend(ActiveData.Namespace.prototype, {

//   keys: function(){
//     var regexp = RegExp('^'+this.prefix+':(.+)$');
//     return this.parent.keys().map(function(key){
//       return key.match(regexp) ? RegExp.$1 : false;
//     }).filter(function(key){ return key; });
//   },

//   get: function(key){
//     return this.parent.get(this.prefix+':'+key);
//   },

//   set: function(key, value){
//     this.parent.set(this.prefix+':'+key, value);
//     return this;
//   },

//   del: function(key){
//     this.parent.del(this.prefix+':'+key);
//     return this;
//   },

//   change: function(key, callback){
//     var namespace = this;
//     this.parent.change(this.prefix+':'+key, function(value){
//       callback.call(namespace, value, key);
//     });
//     return this;
//   },

//   namespace: function(prefix){
//     return new ActiveData.Namespace(prefix, this);
//   }

// });
