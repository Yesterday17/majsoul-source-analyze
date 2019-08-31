const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

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