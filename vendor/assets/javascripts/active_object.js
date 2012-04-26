

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







// function ActiveObject(object) {
//   return $.extend({}, object || {}, ActiveObject.prototype);
// }

// $.extend(ActiveObject.prototype, {

//   // keys: function(){
//   //   return Object.keys(this);
//   // },

//   get: function(key){
//     return this[key];
//   },

//   set: function(key, value){
//     if (arguments.length === 1){
//       for (var p in key) this.set(p, key[p]);
//       return this;
//     }

//     if (arguments.length === 2){
//       var old_value = this[key]
//       if (old_value !== value){
//         if ($.isPlainObject(value)) value = ActiveObject(value);
//         this[key] = value;
//         this.change(key);
//       }
//       return this;
//     }
//     throw new Error('argument error');
//   },

//   del: function(key){
//     if (key in this){
//       delete this[key];
//       this.change(key);
//     }
//     return this;
//   },

//   change: function(key){
//     // TODO possibly delay triggering until the next thread
//     // to make batching automatic
//     var value = this.get(key);
//     $(this)
//       .trigger(key+':change', [value, key]);
//       .trigger('*:change', [value, key]);
//     return this;
//   },

//   watch: function(key, callback) {
//     if (arguments.length === 1){
//       callback = key
//       $(this).bind('*:change', function(event, value){
//         callback.call(this, value, key);
//       });
//     }else
//     if (arguments.length === 2){
//       $(this).bind(key+':change', function(event, value){
//         callback.call(this, value, key);
//       });
//     }
//     return this;
//   }

// });






// ActiveObject = new Constructor({

//   initialize: function(object) {
//     this.changeCallbacks = {};
//     this.object = {};
//     this.set(object);
//   },

//   keys: function(){
//     return Object.keys(this.object);
//   },

//   properties: function(){
//     var properties = {};
//     this.keys().map(function(key){ properties[key.match(/^([^:]+)/)[0]] = true });
//     return Object.keys(properties);
//   },

//   get: function(key){
//     return this.object[key];
//   },

//   set: function(key, value){
//     var p;
//     if (arguments.length === 1){
//       value = key
//       for (p in value) this.set(p, value[p]);
//       return this;
//     }
//     if (arguments.length === 2){
//       if (typeof value === 'string' || typeof value === 'number'){
//         this.object[key] = String(value);
//       }else{
//         for (p in value) this.set(key+':'+p, value[p]);
//       }
//       return this;
//     }
//     throw new Error('argument error');
//   },

//   toObject: function(properties){
//     properties || (properties = this.properties());
//     properties.map(function(){

//     });
//   }

// });



// petition = {
//   id: 9584833,
//   title: 'save the whales',
//   signature_count: 456755,
//   recent_signatures: [
//     {
//       id: 345234523,
//       signer: 'James Brown',
//       reason: 'I love whales!'
//     },
//     {
//       id: 345234529,
//       signer: 'Peter Chezney',
//       reason: 'whales rock!'
//     },
//   ]
// }

// inital_state = {
//   layout: 'mobile',
//   page:   'posts/index',
//   petition: petition,
// };

// petition_update = {
//   signature_count: 456755,
//   recent_signatures: [
//     {
//       id: 345237823,
//       signer: 'Slowey McSlowerson',
//       reason: 'I love whales toooo!'
//     },
//     {
//       id: 345234523,
//       signer: 'James Brown',
//       reason: 'I love whales!'
//     },
//     {
//       id: 345234529,
//       signer: 'Peter Chezney',
//       reason: 'whales rock!'
//     },
//   ]
// }

// d = new ActiveObject(inital_state);

// console.log('keys', d.keys());
// console.log('keys', d.properties());
// console.log(d);

// // ActiveData.Collection = new Constructor({

// // });



// // data = new ActiveData.Object;

// // data.set('petition', );



// // // OR

// // data.get('petition')                            //=> null
// // data.get('petition:title')                      //=> 'save the whales'
// // data.get('petition:signature_count')            //=> 'save the whales'
// // data.get('petition:recent_signatures:size')     //=> 2
// // data.get('petition:recent_signatures:0:signer') //=> 'James Brown'
// // data.get('petition:recent_signatures:0:reason') //=> 'I love whales!'
// // data.get('petition:recent_signatures:1:signer') //=> 'Peter Chezney'
// // data.get('petition:recent_signatures:1:reason') //=> 'whales rock!'

// // // equal
// // data.watch('petition:recent_signatures', function(){});
// // data.watch(/^petition:recent_signatures$/, function(){});

// // // equal
// // data.watch('petition:recent_signatures:*', function(){});
// // data.watch(/^petition:recent_signatures:.+$/, function(){});

// // rs = data.namespace('petition:recent_signatures')
// // rs.keys() //=> ['size','0','1'];
// // rs.watch('0')











// // // OR

// // data.get('petition.title')                       //=> 'save the whales'
// // data.get('petition.signature_count')             //=> 'save the whales'
// // data.get('petition.recent_signatures.size')      //=> 2
// // data.get('petition.recent_signatures.0.signer') //=> 'James Brown'
// // data.get('petition.recent_signatures.0.reason') //=> 'I love whales!'
// // data.get('petition.recent_signatures.1.signer') //=> 'Peter Chezney'
// // data.get('petition.recent_signatures.1.reason') //=> 'whales rock!'











// // p = data.get('petition');
// // p.get('title') //=> 'save the whales'
// // p.get('signature_count') //=> 456755

// // rs = p.get('recent_signatures');
// // rs.get('size')          //=> 2
// // rs.get(0).get('signer') //=> 'James Brown'
// // rs.get(0).get('reason') //=> 'I love whales!'
// // rs.get(0).get('index')  //=> 0
// // rs.get(1).get('signer') //=> 'Peter Chezney'
// // rs.get(1).get('reason') //=> 'whales rock!'
// // rs.get(1).get('index')  //=> 1
