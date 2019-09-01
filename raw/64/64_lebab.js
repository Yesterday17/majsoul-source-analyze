let capsui;
!(t => {
  const e = (t => {
    function e() {
      const e = t.call(this) || this;
      return (e.starttime = 0), e;
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      (this.img_round = this.me
        .getChildByName('flower')
        .getChildByName('round')),
        (this.img_shine = this.me
          .getChildByName('flower')
          .getChildByName('shine'));
    }),
    (e.prototype.onEnable = function() {
      (this.starttime = Laya.timer.currTimer),
        this.refreshShow(),
        Laya.timer.frameLoop(1, this, this.refreshShow);
    }),
    (e.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (e.prototype.refreshShow = function() {
      let t = Laya.timer.currTimer - this.starttime;
      t > 2e3 && ((t = 0), (this.starttime = Laya.timer.currTimer));
      const e = t / 2e3;
      if ((this.img_round && (this.img_round.rotation = 360 * e), e < 0.5)) {
        i = 2 * e;
        this.img_shine && (this.img_shine.alpha = i * i);
      } else {
        var i = 2 - 2 * e;
        this.img_shine && (this.img_shine.alpha = i * i);
      }
    }),
    e
  ;
  })(t.UIComponent);
  t.CLoading = e;
})(capsui || (capsui = {}));