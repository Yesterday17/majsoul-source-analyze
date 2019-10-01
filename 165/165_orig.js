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
      var t = e.call(this, new ui.mj.gamestopUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        (this.blackbg = this.me.getChildByName('blackbg')),
          (this.root = this.me.getChildByName('root')),
          (this.label_dots = this.root.getChildByName('dots'));
      }),
      (i.prototype.show = function() {
        var e = this;
        if (!this.enable) {
          (this.enable = !0),
            view.DesktopMgr.Inst.mode == view.EMJMode.play
              ? ((this.blackbg.visible = !0),
                (this.blackbg.alpha = 0),
                Laya.Tween.to(this.blackbg, { alpha: 0.3 }, 200))
              : (this.blackbg.visible = !1),
            (this.root.scaleX = this.root.scaleY = 1),
            t.UIBase.anim_pop_out(this.root, null),
            Laya.timer.clearAll(this);
          var i = 0;
          Laya.timer.loop(1e3, this, function() {
            for (var t = '', n = 0; n < i; n++) t += '.';
            (i = (i + 1) % 4), (e.label_dots.text = t);
          });
        }
      }),
      (i.prototype.close = function() {
        (this.enable = !1), Laya.timer.clearAll(this);
      }),
      i
    );
  })(t.UIBase);
  t.UI_GameStop = e;
})(uiscript || (uiscript = {}));