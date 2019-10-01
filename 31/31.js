var view;
!(t => {
  var e = (() => {
    class t {
      static init_data() {
        var t = this;
        this._loaded = !0;
        this._loaded ||
          (cfg.animation.animation.forEach(e => {
          var i = e.name;
          var n = e.type;
          var a = e;
          a.lifetime /= a.speed;
          if ((a.keypoint))
            for (var r = 0; r < a.keypoint.length; r++)
              a.keypoint[r] /= a.speed;
          t._map_anim.hasOwnProperty(i) || (t._map_anim[i] = {});
          t._map_anim[i][n] = a;
        }));
      }

      static get_anim_config(t, e) {
        return this._map_anim[t] ? this._map_anim[t][e] : null;
      }
    }

    t._loaded = !1;
    t._map_anim = {};
    return t;
  })();
  t.ModelAnimationController = e;
})(view || (view = {}));