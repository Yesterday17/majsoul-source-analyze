let anim;
!(t => {
  const e = (t => {
    function e() {
      const e = t.call(this) || this;
      return (e.mat = null), (e.tick = 2e3), (e.lasttime = 0), e;
    }
    return __extends(e, t),
    (e.prototype._load = function({meshRender}) {
      (this.mat = meshRender.material),
        (this.lasttime = 0),
        Laya.timer.frameLoop(1, this, this.update);
    }),
    (e.prototype.update = function() {
      if (this.destroyed) Laya.timer.clearAll(this);
      else if (this.enable) {
        let t = Laya.timer.currTimer - this.lasttime;
        t >= this.tick && ((t = 0), (this.lasttime = Laya.timer.currTimer));
        let e = 0;
        e =
          t < this.tick / 2
            ? (2 * t) / this.tick
            : 1 - (t - this.tick / 2) / (this.tick / 2);
        const i = this.mat.albedoColor.clone();
        (i.w = 1 - e), (this.mat.albedoColor = i);
      } else this.lasttime = 0;
    }),
    e
  ;
  })(Laya.Script);
  t.Bling = e;
})(anim || (anim = {}));