ActiveObject = new Constructor({

  initialize: function(object) {
    this.changeCallbacks = {};
    this.object = {};
    this.set(object);
  },

  keys: function(){
    return Object.keys(this.object);
  },

  properties: function(){
    var properties = {};
    this.keys().map(function(key){ properties[key.match(/^([^:]+)/)[0]] = true });
    return Object.keys(properties);
  },

  get: function(key){
    return this.object[key];
  },

  set: function(key, value){
    var p;
    if (arguments.length === 1){
      value = key
      for (p in value) this.set(p, value[p]);
      return this;
    }
    if (arguments.length === 2){
      if (typeof value === 'string' || typeof value === 'number'){
        this.object[key] = String(value);
      }else{
        for (p in value) this.set(key+':'+p, value[p]);
      }
      return this;
    }
    throw new Error('argument error');
  },

  toObject: function(properties){
    properties || (properties = this.properties());
    properties.map(function(){

    });
  }

});



petition = {
  id: 9584833,
  title: 'save the whales',
  signature_count: 456755,
  recent_signatures: [
    {
      id: 345234523,
      signer: 'James Brown',
      reason: 'I love whales!'
    },
    {
      id: 345234529,
      signer: 'Peter Chezney',
      reason: 'whales rock!'
    },
  ]
}

inital_state = {
  layout: 'mobile',
  page:   'posts/index',
  petition: petition,
};

petition_update = {
  signature_count: 456755,
  recent_signatures: [
    {
      id: 345237823,
      signer: 'Slowey McSlowerson',
      reason: 'I love whales toooo!'
    },
    {
      id: 345234523,
      signer: 'James Brown',
      reason: 'I love whales!'
    },
    {
      id: 345234529,
      signer: 'Peter Chezney',
      reason: 'whales rock!'
    },
  ]
}

d = new ActiveObject(inital_state);

console.log('keys', d.keys());
console.log('keys', d.properties());
console.log(d);

// ActiveData.Collection = new Constructor({

// });



// data = new ActiveData.Object;

// data.set('petition', );



// // OR

// data.get('petition')                            //=> null
// data.get('petition:title')                      //=> 'save the whales'
// data.get('petition:signature_count')            //=> 'save the whales'
// data.get('petition:recent_signatures:size')     //=> 2
// data.get('petition:recent_signatures:0:signer') //=> 'James Brown'
// data.get('petition:recent_signatures:0:reason') //=> 'I love whales!'
// data.get('petition:recent_signatures:1:signer') //=> 'Peter Chezney'
// data.get('petition:recent_signatures:1:reason') //=> 'whales rock!'

// // equal
// data.watch('petition:recent_signatures', function(){});
// data.watch(/^petition:recent_signatures$/, function(){});

// // equal
// data.watch('petition:recent_signatures:*', function(){});
// data.watch(/^petition:recent_signatures:.+$/, function(){});

// rs = data.namespace('petition:recent_signatures')
// rs.keys() //=> ['size','0','1'];
// rs.watch('0')











// // OR

// data.get('petition.title')                       //=> 'save the whales'
// data.get('petition.signature_count')             //=> 'save the whales'
// data.get('petition.recent_signatures.size')      //=> 2
// data.get('petition.recent_signatures.0.signer') //=> 'James Brown'
// data.get('petition.recent_signatures.0.reason') //=> 'I love whales!'
// data.get('petition.recent_signatures.1.signer') //=> 'Peter Chezney'
// data.get('petition.recent_signatures.1.reason') //=> 'whales rock!'











// p = data.get('petition');
// p.get('title') //=> 'save the whales'
// p.get('signature_count') //=> 456755

// rs = p.get('recent_signatures');
// rs.get('size')          //=> 2
// rs.get(0).get('signer') //=> 'James Brown'
// rs.get(0).get('reason') //=> 'I love whales!'
// rs.get(0).get('index')  //=> 0
// rs.get(1).get('signer') //=> 'Peter Chezney'
// rs.get(1).get('reason') //=> 'whales rock!'
// rs.get(1).get('index')  //=> 1
