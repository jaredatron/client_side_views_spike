var Constructor = (function() {

  function extend(extension){
    if (typeof extension === 'function')
      extension = extension.apply(this.prototype);
    if (typeof extension === 'object')
      for (var p in extension) this.prototype[p] = extension[p];
    return this;
  }

  function ConstructorInstance(){}
  function construct(superObject){
    ConstructorInstance.prototype = superObject;
    return new ConstructorInstance;
  }

  function toString() { return 'Constructor'; };

  function Constructor(superConstructor, extension){

    var constructor = function ConstructorInstance(){
      var self = (this instanceof constructor) ? this : construct(constructor.prototype);
      self.constructor = constructor;
      return (typeof self.initialize === "function") ?
        self.initialize.apply(self, arguments) || self : self;
    };

    constructor.toString = toString;
    constructor.extend = extend;

    if (arguments.length === 1 &&
      typeof superConstructor === 'object' ||
      (
        typeof superConstructor === 'function' &&
        !("superConstructor" in superConstructor) &&
        superConstructor.name === ""
      )
    ){
      extension = superConstructor || extension;
      superConstructor = Constructor;
    }

    superConstructor || (superConstructor = Constructor);

    constructor.superConstructor = superConstructor;
    constructor.prototype = construct(superConstructor.prototype);
    constructor.prototype.constructor = constructor;
    constructor.prototype.superObject = superConstructor.prototype;

    for (var p in Constructor.prototype)
      if (p in constructor.prototype); else
        constructor.prototype[p] = Constructor.prototype[p];

    if (extension) Constructor.prototype.extend.call(constructor.prototype, extension);

    return constructor;
  };

  Constructor.superConstructor = undefined;

  Constructor.prototype.extend = function(extension) {
    if (typeof extension === 'function')
      extension = extension.apply(this);
    if (typeof extension === 'object')
      for (var p in extension) this[p] = extension[p];
    return this;
  };

  Constructor.prototype.$super = function(property, args){
    var superObject = this.superObject, func = superObject[property];
    if (typeof func !== 'function') throw "no superclass function `"+property+"`";
    this.superObject = superObject.superObject;
    try{
      return superObject[property].apply(this, args);
    }finally{
      this.superObject = superObject;
    }
  };



  return Constructor;

})();
