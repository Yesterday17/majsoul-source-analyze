var uiscript;
!(function(t) {
  var e = (function(t) {
    function e(e, i) {
      var n = t.call(this, i) || this;
      return (n.__activity_name = e), n;
    }
    return (
      __extends(e, t),
      Object.defineProperty(e.prototype, 'activity_name', {
        get: function() {
          return this.__activity_name;
        },
        enumerable: true,
        configurable: true
      }),
      (e.prototype.isopen = function() {
        return false;
      }),
      (e.prototype.haveRedPoint = function() {
        return false;
      }),
      (e.prototype.need_popout = function() {
        return false;
      }),
      (e.prototype.show = function() {}),
      (e.prototype.hide = function() {}),
      e
    );
  })(t.UIBase);
  t.UI_ActivityBase = e;
})(uiscript || (uiscript = {}));