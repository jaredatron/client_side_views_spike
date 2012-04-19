
//https://github.com/deadlyicon/s.js
!function(jQuery, DOCUMENT, undefined){

  jQuery.prototype.toSelector = function(){
    return S(this.selector);
  };

  S.prototype.get = function(){
    return jQuery(this.toSelector());
  };

  S.prototype.bind = function(types, data, fn){
    var index, wrapper;

    if (typeof data === 'function') fn = data; data = undefined;

    fn.sjs_wrapper || wrapEventHandler(fn);

    DOCUMENT.delegate(this, types, data, fn.sjs_wrapper);
    return this;
  };

  S.prototype.unbind = function(types, fn){
    DOCUMENT.undelegate(this, types, fn.sjs_wrapper || fn);
    return this;
  };

  S.createEventMethods = function(){
    $.each(arguments, function(i, event){
      S.prototype[event] = function(data, fn) { return this.bind(event, data, fn); };
    });
  };

  S.createEventMethods(
    "blur", "focus", "focusin", "focusout", "load", "resize", "scroll", "unload", "click",
    "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter",
    "mouseleave", "change", "select", "submit", "keydown", "keypress", "keyup", "error"
  );

  $.each(["find", "filter", "closest", "delegate", "undelegate"], function(index, name){
    var $super = jQuery.prototype[name];
    jQuery.prototype[name] = function(selector){
      if (typeof selector === 'function' && 'toSelector' in selector)
        arguments[0] = selector.toSelector();
      return $super.apply(this, arguments);
    };
  });

  function wrapEventHandler(fn){
    fn.sjs_wrapper = function(){
      arguments = Array.prototype.slice.apply(arguments);
      arguments.unshift(jQuery(this));
      fn.apply(this, arguments);
    };
    fn.sjs_wrapper.wraps = fn;
  }

}(jQuery, jQuery(document));
