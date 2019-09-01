let uiscript;
!(t => {
  const e = (e => {
    function i() {
      return e.call(this, new ui.mj.alUI()) || this;
    }
    return __extends(i, e),
    (i.Show = function() {
      const e = new i();
      t.UIMgr.Inst.AddMJUI(e),
        Laya.timer.frameOnce(5, this, () => {
          e.show();
        });
    }),
    (i.prototype.show = function() {
      const t = this;
      (this.me.visible = true),
        this.me.start.play(0, false),
        Laya.timer.once(1300, this, () => {
          (t.me.visible = false), t.me.destroy(true);
        });
    }),
    i
  ;
  })(t.UIBase);
  t.UI_AL = e;
})(uiscript || (uiscript = {}));