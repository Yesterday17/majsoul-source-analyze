var uiscript;
!(function(t) {
  var e = (function() {
    function t(t, e, i) {
      var n = this;
      (this._func_locking = null),
        (this._func_hide = null),
        (this._func_locking = e),
        (this._func_hide = i),
        (this.me = t);
      var a = this.me.getChildByName('unhit');
      this.me.getChildByName('btn').clickHandler = Laya.Handler.create(
        this,
        function() {
          (n._func_locking && n._func_locking.run()) ||
            ((a.mouseX < 0 ||
              a.mouseX > a.width ||
              a.mouseY < 0 ||
              a.mouseY > a.height) &&
              (n._func_hide && n._func_hide.run(), n.hide()));
        },
        null,
        !1
      );
    }
    return (
      (t.prototype.show = function() {
        Laya.timer.clearAll(this),
          (this.me.visible = !0),
          (this.me.alpha = 0),
          Laya.Tween.to(this.me, { alpha: 0.3 }, 150);
      }),
      (t.prototype.hide = function() {
        Laya.timer.clearAll(this), Laya.Tween.to(this.me, { alpha: 0 }, 150);
      }),
      t
    );
  })();
  t.UI_BlackMask = e;
})(uiscript || (uiscript = {}));