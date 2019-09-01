let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.mj.hangup_warnUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.blackbg = this.me.getChildByName('blackbg')),
        (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = new Laya.Handler(this, () => {
          t.locking || ((view.DesktopMgr.Inst.hangupCount = 0), t.close());
        }));
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.locking = true),
        (this.enable = true),
        (this.blackbg.alpha = 0),
        Laya.Tween.to(this.blackbg, { alpha: 0.3 }, 150),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        Laya.Tween.to(this.blackbg, { alpha: 0 }, 150),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Hangup_Warn = e;
})(uiscript || (uiscript = {}));