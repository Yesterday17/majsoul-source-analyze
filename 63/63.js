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
        e.mousedowned = !1;
        e.origin_scale_x = 1;
        e.origin_scale_y = 1;
        e.starttime = 0;
        e.origin_x = 0;
        return e;
      }

      onCreate() {
        this.origin_scale_x = this.me.scaleX;
        this.origin_scale_y = this.me.scaleY;
        this.me.on('mousedown', this, this.OnMouseDown);
        this.me.on('mouseup', this, this.OnMouseUp);
        this.me.on('mouseout', this, this.OnMouseUp);
        this.me.filters = [
            new Laya.ColorFilter([
              1,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
              0
            ])
          ];
      }

      onEnable() {
        this.me.scaleX = this.me.scaleY = 1;
        this.origin_scale_x = this.me.scaleX;
        this.origin_scale_y = this.me.scaleY;
      }

      onDisable() {
        this.mousedowned = !1;
        Laya.Tween.clearAll(this.me);
        this.me.scaleX = this.origin_scale_x;
        this.me.destroyed ||
          ((this.me.scaleY = this.origin_scale_y));
      }

      OnMouseDown() {
        this.mousedowned = !0;
        this.origin_x = this.me.scaleX;
        this.starttime = Laya.timer.currTimer;
        Laya.timer.clear(this, this.DoAnim);
        this.mousedowned ||
          (Laya.timer.frameLoop(1, this, this.DoAnim));
      }

      OnMouseUp() {
        this.mousedowned = !1;
        this.origin_x = this.me.scaleX;
        this.starttime = Laya.timer.currTimer;
        Laya.timer.clear(this, this.DoAnim);
        this.mousedowned &&
          (Laya.timer.frameLoop(1, this, this.DoAnim));
      }

      DoAnim() {
        if (this.me && !this.me.destroyed) {
          var t = Laya.timer.currTimer - this.starttime;
          var e = this.mousedowned ? 1.1 : 1;
          this.me.scaleX = this.me.scaleY = e;
          if (t >= 50)
            Laya.timer.clear(this, this.DoAnim);
          else {
            var i = t / 50;
            this.me.scaleX = this.me.scaleY = this.origin_x * (1 - i) + e * i;
          }
        }
      }
    }

    __extends(e, t);

    return e;
  })(t.UIComponent);
  t.CButton = e;
})(capsui || (capsui = {}));