var view;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t.init_data = function() {
        var t = this;
        this._loaded ||
          ((this._loaded = !0),
          cfg.animation.animation.forEach(function(e) {
            var i = e.name,
              n = e.type,
              a = e;
            if (((a.lifetime /= a.speed), a.keypoint))
              for (var r = 0; r < a.keypoint.length; r++)
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
    );
  })();
  t.ModelAnimationController = e;
})(view || (view = {}));