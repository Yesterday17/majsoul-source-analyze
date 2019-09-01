let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.mj.gamestopUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      (this.blackbg = this.me.getChildByName('blackbg')),
        (this.root = this.me.getChildByName('root')),
        (this.label_dots = this.root.getChildByName('dots'));
    }),
    (i.prototype.show = function() {
      const e = this;
      if (!this.enable) {
        (this.enable = true),
          view.DesktopMgr.Inst.mode == view.EMJMode.play
            ? ((this.blackbg.visible = true),
              (this.blackbg.alpha = 0),
              Laya.Tween.to(this.blackbg, { alpha: 0.3 }, 200))
            : (this.blackbg.visible = false),
          (this.root.scaleX = this.root.scaleY = 1),
          t.UIBase.anim_pop_out(this.root, null),
          Laya.timer.clearAll(this);
        let i = 0;
        Laya.timer.loop(1e3, this, () => {
          for (var t = '', n = 0; n < i; n++) t += '.';
          (i = (i + 1) % 4), (e.label_dots.text = t);
        });
      }
    }),
    (i.prototype.close = function() {
      (this.enable = false), Laya.timer.clearAll(this);
    }),
    i
  ;
  })(t.UIBase);
  t.UI_GameStop = e;
})(uiscript || (uiscript = {}));