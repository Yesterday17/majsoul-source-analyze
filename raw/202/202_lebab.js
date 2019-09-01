let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.mj.replay_whellUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      let e = 0;
      this.me
        .getChildByName('wheel')
        .on(Laya.Event.MOUSE_WHEEL, this, i => {
          !(({delta}) => {
            if (!(Laya.timer.currTimer < e)) {
              e = Laya.timer.currTimer + 50;
              const n = delta;
              n > 0
                ? t.UI_Replay.Inst.preXun()
                : n < 0 && t.UI_Replay.Inst.nextXun();
            }
          })(i);
        }),
        this.me
          .getChildByName('wheel')
          .on(Laya.Event.MOUSE_DOWN, this, e => {
            t.UI_Replay.Inst.onWheelClick();
          });
    }),
    i
  ;
  })(t.UIBase);
  t.UI_ReplayWheel = e;
})(uiscript || (uiscript = {}));