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
    function e() {
      var i = t.call(this, new ui.entrance.remind_newUI()) || this;
      return (i.process = null), (i._created = !1), (i._v = 0), (e.Inst = i), i;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        (this.process = this.me.getChildByName('process')),
          (this.process.text = this._v.toString() + '/10'),
          (this._created = !0);
      }),
      (e.prototype.setprocess = function(t) {
        (this._v = t),
          this._created && (this.process.text = t.toString() + '/10');
      }),
      (e.Inst = null),
      e
    );
  })(t.UIBase);
  t.UI_Remind = e;
})(uiscript || (uiscript = {}));