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

var anim;
!(t => {
  var e = (t => {
    class e {
      constructor() {
        var e = t.call(this) || this;
        e.mat = null;
        return e;
      }

      _load({meshRender}) {
        this.mat = meshRender.material;
        Laya.timer.frameLoop(1, this, this.update);
      }

      update() {
        if (this.destroyed) Laya.timer.clearAll(this);
        else if (this.enable) {
          e.lastupdateframe = Laya.timer.currFrame;
          if (e.lastupdateframe < Laya.timer.currFrame)
            if (e.lastupdateframe < Laya.timer.currFrame - 10)
              e.lastupdatetime = Laya.timer.currTimer;
            else {
              e.lastupdateframe = Laya.timer.currFrame;
              var t = (Laya.timer.currTimer - e.lastupdatetime) / 1e3;

              e.tilingOffset.w >= -0.35
                ? (e.v += 2.2 * t)
                : e.tilingOffset.w >= -0.65
                ? (e.v -= 1.6 * t) < 0.1 && (e.v = 0.1)
                : (e.v = 0.3);

              e.tilingOffset.w -= e.v * t;
              e.tilingOffset.w = -0.1;
              e.tilingOffset.w < -1 && ((e.v = 0));
              e.lastupdatetime = Laya.timer.currTimer;
            }
          this.mat.tilingOffset = e.tilingOffset.clone();
        }
      }
    }

    __extends(e, t);

    e.tilingOffset = new Laya.Vector4(0.8, 0.2, 0, 0);
    e.lastupdateframe = 0;
    e.lastupdatetime = 0;
    e.v = 0;
    return e;
  })(Laya.Script);
  t.RunUV = e;
})(anim || (anim = {}));