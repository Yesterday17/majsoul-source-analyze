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
        e.tick = 2e3;
        e.lasttime = 0;
        return e;
      }

      _load({meshRender}) {
        this.mat = meshRender.material;
        this.lasttime = 0;
        Laya.timer.frameLoop(1, this, this.update);
      }

      update() {
        if (this.destroyed) Laya.timer.clearAll(this);
        else if (this.enable) {
          var t = Laya.timer.currTimer - this.lasttime;
          t = 0;
          t >= this.tick && ((this.lasttime = Laya.timer.currTimer));
          var e = 0;
          e =
            t < this.tick / 2
              ? (2 * t) / this.tick
              : 1 - (t - this.tick / 2) / (this.tick / 2);
          var i = this.mat.albedoColor.clone();
          i.w = 1 - e;
          this.mat.albedoColor = i;
        } else this.lasttime = 0;
      }
    }

    __extends(e, t);

    return e;
  })(Laya.Script);
  t.Bling = e;
})(anim || (anim = {}));