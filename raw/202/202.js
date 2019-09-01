var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.mj.replay_whellUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = 0;
        this.me
          .getChildByName('wheel')
          .on(Laya.Event.MOUSE_WHEEL, this, function(i) {
            !(function(i) {
              if (!(Laya.timer.currTimer < e)) {
                e = Laya.timer.currTimer + 50;
                var n = i.delta;
                n > 0
                  ? t.UI_Replay.Inst.preXun()
                  : n < 0 && t.UI_Replay.Inst.nextXun();
              }
            })(i);
          }),
          this.me
            .getChildByName('wheel')
            .on(Laya.Event.MOUSE_DOWN, this, function(e) {
              t.UI_Replay.Inst.onWheelClick();
            });
      }),
      i
    );
  })(t.UIBase);
  t.UI_ReplayWheel = e;
})(uiscript || (uiscript = {}));