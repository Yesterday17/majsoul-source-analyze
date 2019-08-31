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
      var i = t.call(this, new ui.both_ui.fly_tipsUI()) || this;
      return (
        (i.templete = null),
        (i.clone = null),
        (i.last_tips = null),
        (e.Inst = i),
        i
      );
    }
    return (
      __extends(e, t),
      (e.ShowTips = function(t) {
        this.Inst && this.Inst._fly_tips(t);
      }),
      (e.prototype.onCreate = function() {
        (this.templete = this.me.getChildByName('templete')),
          (this.templete.visible = !1),
          (this.clone = this.templete.scriptMap['capsui.UICopy']);
      }),
      (e.prototype._fly_tips = function(t) {
        var e = this;
        this.enable = !0;
        var i = this.clone.getNodeClone();
        i.text = t;
        var n = 540;
        this.last_tips && (n = Math.max(n, this.last_tips.y + 50)),
          (i.y = n),
          (i.visible = !0),
          (this.last_tips = i),
          Laya.Tween.to(
            i,
            { y: n - 150, alpha: 0 },
            1500,
            Laya.Ease.linearNone,
            Laya.Handler.create(this, function() {
              e.last_tips === i &&
                (e.last_tips.destroy(!0),
                (e.last_tips = null),
                (e.enable = !1));
            })
          );
      }),
      e
    );
  })(t.UIBase);
  t.UI_FlyTips = e;
})(uiscript || (uiscript = {}));