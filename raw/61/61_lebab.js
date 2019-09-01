let anim;
!(t => {
  const e = (t => {
    function e() {
      const e = t.call(this) || this;
      return (e.mat = null), e;
    }
    return __extends(e, t),
    (e.prototype._load = function({meshRender}) {
      (this.mat = meshRender.material),
        Laya.timer.frameLoop(1, this, this.update);
    }),
    (e.prototype.update = function() {
      if (this.destroyed) Laya.timer.clearAll(this);
      else if (this.enable) {
        if (e.lastupdateframe < Laya.timer.currFrame)
          if (e.lastupdateframe < Laya.timer.currFrame - 10)
            (e.lastupdateframe = Laya.timer.currFrame),
              (e.lastupdatetime = Laya.timer.currTimer);
          else {
            e.lastupdateframe = Laya.timer.currFrame;
            const t = (Laya.timer.currTimer - e.lastupdatetime) / 1e3;
            e.tilingOffset.w >= -0.35
              ? (e.v += 2.2 * t)
              : e.tilingOffset.w >= -0.65
              ? (e.v -= 1.6 * t) < 0.1 && (e.v = 0.1)
              : (e.v = 0.3),
              (e.tilingOffset.w -= e.v * t),
              e.tilingOffset.w < -1 && ((e.tilingOffset.w = -0.1), (e.v = 0)),
              (e.lastupdatetime = Laya.timer.currTimer);
          }
        this.mat.tilingOffset = e.tilingOffset.clone();
      }
    }),
    (e.tilingOffset = new Laya.Vector4(0.8, 0.2, 0, 0)),
    (e.lastupdateframe = 0),
    (e.lastupdatetime = 0),
    (e.v = 0),
    e
  ;
  })(Laya.Script);
  t.RunUV = e;
})(anim || (anim = {}));