var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  capsui;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = t.call(this) || this;
      return (
        (e.mousedowned = !1),
        (e.origin_scale_x = 1),
        (e.origin_scale_y = 1),
        (e.starttime = 0),
        (e.origin_x = 0),
        e
      );
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        (this.origin_scale_x = this.me.scaleX),
          (this.origin_scale_y = this.me.scaleY),
          this.me.on('mousedown', this, this.OnMouseDown),
          this.me.on('mouseup', this, this.OnMouseUp),
          this.me.on('mouseout', this, this.OnMouseUp),
          (this.me.filters = [
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
          ]);
      }),
      (e.prototype.onEnable = function() {
        (this.me.scaleX = this.me.scaleY = 1),
          (this.origin_scale_x = this.me.scaleX),
          (this.origin_scale_y = this.me.scaleY);
      }),
      (e.prototype.onDisable = function() {
        (this.mousedowned = !1),
          Laya.Tween.clearAll(this.me),
          this.me.destroyed ||
            ((this.me.scaleX = this.origin_scale_x),
            (this.me.scaleY = this.origin_scale_y));
      }),
      (e.prototype.OnMouseDown = function() {
        this.mousedowned ||
          ((this.mousedowned = !0),
          (this.origin_x = this.me.scaleX),
          (this.starttime = Laya.timer.currTimer),
          Laya.timer.clear(this, this.DoAnim),
          Laya.timer.frameLoop(1, this, this.DoAnim));
      }),
      (e.prototype.OnMouseUp = function() {
        this.mousedowned &&
          ((this.mousedowned = !1),
          (this.origin_x = this.me.scaleX),
          (this.starttime = Laya.timer.currTimer),
          Laya.timer.clear(this, this.DoAnim),
          Laya.timer.frameLoop(1, this, this.DoAnim));
      }),
      (e.prototype.DoAnim = function() {
        if (this.me && !this.me.destroyed) {
          var t = Laya.timer.currTimer - this.starttime,
            e = this.mousedowned ? 1.1 : 1;
          if (t >= 50)
            (this.me.scaleX = this.me.scaleY = e),
              Laya.timer.clear(this, this.DoAnim);
          else {
            var i = t / 50;
            this.me.scaleX = this.me.scaleY = this.origin_x * (1 - i) + e * i;
          }
        }
      }),
      e
    );
  })(t.UIComponent);
  t.CButton = e;
})(capsui || (capsui = {}));