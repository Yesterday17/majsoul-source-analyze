var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.mj.replay_whellUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = 0;

        this.me
          .getChildByName('wheel')
          .on(Laya.Event.MOUSE_WHEEL, this, i => {
            !(({delta}) => {
              if (!(Laya.timer.currTimer < e)) {
                e = Laya.timer.currTimer + 50;
                var n = delta;
                n > 0
                  ? t.UI_Replay.Inst.preXun()
                  : n < 0 && t.UI_Replay.Inst.nextXun();
              }
            })(i);
          });

        this.me
          .getChildByName('wheel')
          .on(Laya.Event.MOUSE_DOWN, this, e => {
            t.UI_Replay.Inst.onWheelClick();
          });
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_ReplayWheel = e;
})(uiscript || (uiscript = {}));