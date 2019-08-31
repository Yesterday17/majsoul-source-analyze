var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
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
        enumerable: !0,
        configurable: !0
      }),
      (e.prototype.isopen = function() {
        return !1;
      }),
      (e.prototype.haveRedPoint = function() {
        return !1;
      }),
      (e.prototype.need_popout = function() {
        return !1;
      }),
      (e.prototype.show = function() {}),
      (e.prototype.hide = function() {}),
      e
    );
  })(t.UIBase);
  t.UI_ActivityBase = e;
})(uiscript || (uiscript = {}));