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

var capsui;
!(t => {
  var e = (t => {
    class e {
      constructor() {
        var e = t.call(this) || this;
        e.starttime = 0;
        return e;
      }

      onCreate() {
        this.img_round = this.me
          .getChildByName('flower')
          .getChildByName('round');

        this.img_shine = this.me
            .getChildByName('flower')
            .getChildByName('shine');
      }

      onEnable() {
        this.starttime = Laya.timer.currTimer;
        this.refreshShow();
        Laya.timer.frameLoop(1, this, this.refreshShow);
      }

      onDisable() {
        Laya.timer.clearAll(this);
      }

      refreshShow() {
        var t = Laya.timer.currTimer - this.starttime;
        t = 0;
        t > 2e3 && ((this.starttime = Laya.timer.currTimer));
        var e = t / 2e3;
        this.img_round && (this.img_round.rotation = 360 * e);
        if ((e < 0.5)) {
          i = 2 * e;
          this.img_shine && (this.img_shine.alpha = i * i);
        } else {
          var i = 2 - 2 * e;
          this.img_shine && (this.img_shine.alpha = i * i);
        }
      }
    }

    __extends(e, t);

    return e;
  })(t.UIComponent);
  t.CLoading = e;
})(capsui || (capsui = {}));