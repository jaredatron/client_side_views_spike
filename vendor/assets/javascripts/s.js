!function(global, jQuery, undefined) {

  var
    EMTPY = /^\s*$/,
    WRAPPING_WHITESPACE = /^\s*|\s*$/g,
    COMMA = /\s*,\s*/g,
    TRAILING_COMMA = /,\s*$/;

  global.S = S;

  function S(value){ return Selector(value, S); }
  S.toSelector = S.toString = S.valueOf = function(){ return ''; };
  S.end = S;

  S.prototype.isSelector = true;
  S.prototype.toSelector = toSelector;
  S.prototype.toString   = toSelector;
  S.prototype.valueOf    = toSelector;

  function Selector(value, parent) {
    if (value === undefined) value = '';
    if (typeof value.toString === 'function') value = value.toString();
    validateSelector(value);
    value = strip(value);
    var selector = function(value){
      return arguments.length ? Selector(value, selector) : selector;
    };
    selector.value = value;
    selector.end = parent;
    extend(selector, S.prototype);
    selector.toString = S.prototype.toString;
    selector.valueOf  = S.prototype.valueOf;
    return selector;
  }

  function toSelector(){
    var
      self      = this,
      selectors = self.value.split(COMMA);

    validateSelector(self.value);
    // TODO uniq selectors before returning
    return map.call(selectors, function(selector, parent_selectors){
      selector = strip(selector);
      if (self === self.end || self.end === S) return selector;
      if (selector.indexOf('&') === -1) selector = '& '+selector;

      parent_selectors = self.end.toString().split(COMMA);

      return map.call(parent_selectors, function(parent_selector){
        return selector.replace(/&/g, parent_selector);
      }).join(', ');

    }).join(', ');
  }


  // Helpers

  function validateSelector(value){
    if (TRAILING_COMMA.test(value)) throw 'Selectors can\'t end in commas. "'+value+'"';
  }

  function strip(text){
    return text
      .replace(WRAPPING_WHITESPACE, '')
      .replace(COMMA, ', ')
    ;
  }

  function extend(object, extension, p){
    for (p in extension) object[p] = extension[p];
  }

  function map(fun /*, thisp*/) {
    var self = Object(this);
    var length = self.length >>> 0;
    if (typeof fun != "function")
        throw new TypeError();
    var result = new Array(length);
    var thisp = arguments[1];
    for (var i = 0; i < length; i++) {
        if (i in self)
            result[i] = fun.call(thisp, self[i], i, self);
    }
    return result;
  }

}(this, jQuery);
