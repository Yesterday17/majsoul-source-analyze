let view;
!(t => {
  const e = (() => {
    function t() {}
    return (t.init_data = function() {
      const t = this;
      this._loaded ||
        ((this._loaded = !0),
        cfg.animation.animation.forEach(e => {
          const i = e.name;
          const n = e.type;
          const a = e;
          if (((a.lifetime /= a.speed), a.keypoint))
            for (let r = 0; r < a.keypoint.length; r++)
              a.keypoint[r] /= a.speed;
          t._map_anim.hasOwnProperty(i) || (t._map_anim[i] = {}),
            (t._map_anim[i][n] = a);
        }));
    }),
    (t.get_anim_config = function(t, e) {
      return this._map_anim[t] ? this._map_anim[t][e] : null;
    }),
    (t._loaded = !1),
    (t._map_anim = {}),
    t
  ;
  })();
  t.ModelAnimationController = e;
})(view || (view = {}));