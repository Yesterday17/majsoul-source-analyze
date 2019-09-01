let uiscript;
!(t => {
  const e = (() => {
    function t(t, e, i) {
      const n = this;
      (this._func_locking = null),
        (this._func_hide = null),
        (this._func_locking = e),
        (this._func_hide = i),
        (this.me = t);
      const a = this.me.getChildByName('unhit');
      this.me.getChildByName('btn').clickHandler = Laya.Handler.create(
        this,
        () => {
          (n._func_locking && n._func_locking.run()) ||
            ((a.mouseX < 0 ||
              a.mouseX > a.width ||
              a.mouseY < 0 ||
              a.mouseY > a.height) &&
              (n._func_hide && n._func_hide.run(), n.hide()));
        },
        null,
        false
      );
    }
    return (
      (t.prototype.show = function() {
        Laya.timer.clearAll(this),
          (this.me.visible = true),
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