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
  var e = (function(e) {
    function i() {
      return e.call(this, new ui.mj.alUI()) || this;
    }
    return (
      __extends(i, e),
      (i.Show = function() {
        var e = new i();
        t.UIMgr.Inst.AddMJUI(e),
          Laya.timer.frameOnce(5, this, function() {
            e.show();
          });
      }),
      (i.prototype.show = function() {
        var t = this;
        (this.me.visible = !0),
          this.me.start.play(0, !1),
          Laya.timer.once(1300, this, function() {
            (t.me.visible = !1), t.me.destroy(!0);
          });
      }),
      i
    );
  })(t.UIBase);
  t.UI_AL = e;
})(uiscript || (uiscript = {}));