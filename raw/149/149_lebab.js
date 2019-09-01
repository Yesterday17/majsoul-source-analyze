let uiscript;
!(t => {
  const e = (t => {
    function e() {
      const i = t.call(this, new ui.both_ui.fly_tipsUI()) || this;
      return (
        (i.templete = null),
        (i.clone = null),
        (i.last_tips = null),
        (e.Inst = i),
        i
      );
    }
    return __extends(e, t),
    (e.ShowTips = function(t) {
      this.Inst && this.Inst._fly_tips(t);
    }),
    (e.prototype.onCreate = function() {
      (this.templete = this.me.getChildByName('templete')),
        (this.templete.visible = false),
        (this.clone = this.templete.scriptMap['capsui.UICopy']);
    }),
    (e.prototype._fly_tips = function(t) {
      const e = this;
      this.enable = true;
      const i = this.clone.getNodeClone();
      i.text = t;
      let n = 540;
      this.last_tips && (n = Math.max(n, this.last_tips.y + 50)),
        (i.y = n),
        (i.visible = true),
        (this.last_tips = i),
        Laya.Tween.to(
          i,
          { y: n - 150, alpha: 0 },
          1500,
          Laya.Ease.linearNone,
          Laya.Handler.create(this, () => {
            e.last_tips === i &&
              (e.last_tips.destroy(true),
              (e.last_tips = null),
              (e.enable = false));
          })
        );
    }),
    e
  ;
  })(t.UIBase);
  t.UI_FlyTips = e;
})(uiscript || (uiscript = {}));