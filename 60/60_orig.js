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
  anim;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = t.call(this) || this;
      return (e.mat = null), (e.tick = 2e3), (e.lasttime = 0), e;
    }
    return (
      __extends(e, t),
      (e.prototype._load = function(t) {
        (this.mat = t.meshRender.material),
          (this.lasttime = 0),
          Laya.timer.frameLoop(1, this, this.update);
      }),
      (e.prototype.update = function() {
        if (this.destroyed) Laya.timer.clearAll(this);
        else if (this.enable) {
          var t = Laya.timer.currTimer - this.lasttime;
          t >= this.tick && ((t = 0), (this.lasttime = Laya.timer.currTimer));
          var e = 0;
          e =
            t < this.tick / 2
              ? (2 * t) / this.tick
              : 1 - (t - this.tick / 2) / (this.tick / 2);
          var i = this.mat.albedoColor.clone();
          (i.w = 1 - e), (this.mat.albedoColor = i);
        } else this.lasttime = 0;
      }),
      e
    );
  })(Laya.Script);
  t.Bling = e;
})(anim || (anim = {}));