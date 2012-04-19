
//https://github.com/deadlyicon/s.js
!function(jQuery, DOCUMENT, undefined){

  var SjQuery = jQuery.sub();

  SjQuery.prototype.root = function(){
    var selector = this.toSelector().root();
    return toSjQuery(this.closest(selector), selector);
  };

  SjQuery.prototype.up = function(){
    var selector = this.toSelector().end;
    return toSjQuery(this.closest(selector), selector);
  };

  jQuery.prototype.toSelector = function(){
    return S(this.selector);
  };

  S.prototype.get = function(){
    return toSjQuery(this.toString(), this);
  };

  S.prototype.bind = function(types, data, fn){
    var index, wrapper;

    if (typeof data === 'function') fn = data; data = undefined;

    fn.sjs_wrapper || wrapEventHandler(fn, this);

    DOCUMENT.delegate(this, types, data, fn.sjs_wrapper);
    return this;
  };

  S.prototype.unbind = function(types, fn){
    DOCUMENT.undelegate(this, types, fn.sjs_wrapper || fn);
    return this;
  };

  S.createEventMethods = function(){
    jQuery.each(arguments, function(i, event){
      S.prototype[event] = function(data, fn) { return this.bind(event, data, fn); };
    });
  };

  S.createEventMethods(
    "blur", "focus", "focusin", "focusout", "load", "resize", "scroll", "unload", "click",
    "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter",
    "mouseleave", "change", "select", "submit", "keydown", "keypress", "keyup", "error"
  );

  jQuery.each(["find", "filter", "closest", "delegate", "undelegate"], function(index, name){
    var $super = jQuery.prototype[name];
    jQuery.prototype[name] = function(selector){
      if (typeof selector === 'function' && 'toSelector' in selector)
        arguments[0] = selector.toSelector();
      return $super.apply(this, arguments);
    };
  });

  function toSjQuery(expression, selector){
    var collection = SjQuery(expression);
    collection.toSelector = function(){ return selector };
    return collection;
  }

  function wrapEventHandler(fn, selector){
    fn.sjs_wrapper = function(){
      var $this = toSjQuery(this, selector);
      arguments = Array.prototype.slice.apply(arguments);
      arguments.unshift($this);
      fn.apply(this, arguments);
    };
    fn.sjs_wrapper.wraps = fn;
  }

}(jQuery, jQuery(document));
