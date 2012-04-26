
function ActiveData(data){
  if (this instanceof ActiveData); else return new ActiveData(data);
  this.watchers = {};
  this.resetTo(data);
}

$.extend(ActiveData.prototype, {

  resetTo: function(data) {
    this.data     = data || {};
    this.values   = {};
    this.changes  = [];
    this.updateValues().ignoreChanges();
  },

  keys: function(){
    return Object.keys(this.data);
  },

  extend: function(object){
    $.extend(this.data, object);
    return this;
  },

  get: function(key) {
    var property = this.keyToProperty(key)
    if (property) return property.object[property.name];
  },

  set: function(key, value) {
    var property = this.keyToProperty(key)
    if (property) property.object[property.name] = value;
    return this;
  },

  keyToProperty: function(key, dontThrow) {
    var
      properties = ('data.'+key).split(/\./),
      property   = properties.pop(),
      code       = 'this["'+properties.join('"]["')+'"]',
      object;
    try{ object = eval(code); }catch(e){};
    if (object && property in object) return {object:object, name:property};
    if (!dontThrow) throw new Error('invalid key: '+key);
  },

  updateValues: function() {
    var
      values   = this.values,
      changes  = this.changes;

    function update(object, namespace) {
      var p, key, value;
      for(var p in object){
        if (object.hasOwnProperty(p)){
          value = object[p];
          key = namespace ? namespace+'.'+p  : p;

          if ($.isPlainObject(value) || $.isArray(value)){
            update(value, key);
          }else{
            if (!(key in values) || (key in values && values[key] !== value)){
              changes.push([key, value]);
            }
            values[key] = value;
          }
        }
      }
    }

    update(this.data);

    // remove nonexistant keys from the values set
    for (var key in values){
      if (!this.keyToProperty(key, true)){
        changes.push([key, undefined]);
        delete values[key];
      }
    }

    return this;
  },

  ignoreChanges: function() {
    this.changes.length = 0;
    return this;
  },

  //
  changed: function() {
    var
      watchers = this.watchers,
      changes  = this.changes;

    this.updateValues();

    // fire change events for the values that changed
    while (changes.length){
      var
        change = changes.shift(),
        key    = change[0],
        value  = change[1];

      Object.keys(watchers).forEach(function(pattern){
        if (!key.match(RegExp(pattern))) return;
        watchers[pattern].forEach(function(callback) {
          callback.call(this, key, value);
        })
      });
    }

    return this;
  },

  watch: function(pattern, callback) {
    pattern = pattern
      .replace(/\*\*/g, "__STARSTAR__")
      .replace(/\*/g, "__STAR__")
      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
      .replace(/__STARSTAR__/g, ".+")
      .replace(/__STAR__/g, "[^\.]+")
    ;
    pattern = '^'+pattern+'$';
    this.watchers[pattern] || (this.watchers[pattern] = []).push(callback);
    return this;
  }

});

// ad = new ActiveData;

// ad.watch('*', function(){
//   console.log('BASE PROPERTY CHANGE', arguments);
// });

// ad.watch('**', function(){
//   console.log('ANY PROPERTY CHANGED', arguments);
// });

// ad.watch('current_user.*', function(){
//   console.log('current_user BASE PROPERTY CHANGED', arguments);
// });

// ad.watch('current_user.**', function(){
//   console.log('current_user ANY CHILD PROPERTY CHANGED', arguments);
// });


// ad.data.a = 1;
// ad.data.b = 2;
// ad.data.c = 'C';
// ad.data.current_user = {
//   name: 'Jared',
//   age: 29,
//   "a crazy key": 'zomg',
//   "99": 'bitchez',
//   friends: [
//     {name: 'Chris', age: 28},
//     {name: 'Megan', age: 23},
//   ],
// };

// // ad.changed();

// // ad.changed();

// ad.data.an={
//   example:{
//     "of something":[
//       {
//         "very very":{
//           "and crazy":{
//             hard:{
//               forno:{
//                 reason: [1,2,3]
//               }
//             },
//           },
//         },
//       },
//     ],
//   }
// };

// // ad.changed();

// // console.dir(ad.data);
// // console.dir(ad.values);

// console.dir(ad);

// ad.watch('current_user.name', function(key, value){
//   console.log('WOOT', arguments);
// });

