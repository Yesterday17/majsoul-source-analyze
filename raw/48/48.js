var game;
!(function(t) {
  var e = (function() {
    function t(e, n) {
      var a = this;
      (this.id = 0),
        (this._loaded = !1),
        (this._destoryed = !1),
        (this._root = null),
        (this.id = t.IDcount++),
        (this.url = e),
        (this._loaded = !1),
        (this._destoryed = !1),
        (this._root = new Laya.Sprite3D()),
        (this._root.active = !0),
        this._root.on('undisplay', this, function() {
          a._root.destroyed && (a._destoryed || a.destory());
        });
      Laya.timer.currTimer;
      i.try2get_effect(
        e,
        Laya.Handler.create(this, function() {
          if (null == a._root || a._root.destroyed || a._destoryed);
          else {
            a._loaded = !0;
            var t = Laya.loader.getRes(e);
            t &&
              t instanceof Laya.Sprite3D &&
              (n && (t = t.clone()),
              a._root.addChild(t),
              (t.transform.localPosition = new Laya.Vector3(0, 0, 0)),
              (t.active = !0));
          }
        })
      );
    }
    return (
      Object.defineProperty(t.prototype, 'loaded', {
        get: function() {
          return this._loaded;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t.prototype, 'destoryed', {
        get: function() {
          return this._destoryed;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t.prototype, 'root', {
        get: function() {
          return this._root;
        },
        enumerable: !0,
        configurable: !0
      }),
      (t.prototype.destory = function() {
        this._destoryed ||
          ((this._destoryed = !0),
          this._root && !this._root.destroyed && this._root.destroy(!0),
          this._loaded && (this._destoryed = !0),
          i.on_effectbase_destory(this.url));
      }),
      (t.IDcount = 0),
      t
    );
  })();
  t.EffectBase = e;
  var i = (function() {
    function t() {}
    return (
      (t.init = function(t) {
        var e = this;
        Laya.loader.load(
          'd3_prefab.json',
          Laya.Handler.create(this, function() {
            (e.d3res_map = Laya.loader.getRes('d3_prefab.json')), t && t.run();
          })
        );
      }),
      (t.try2get_effect = function(t, e) {
        var i = this;
        this._preload_effects_count.hasOwnProperty(t) &&
        this._preload_effects_count[t] > 0
          ? (this._effect_status.hasOwnProperty(t) ||
              (this._effect_status[t] = { status: 0, count: 0, listeners: [] }),
            this._effect_status[t].count++,
            0 == this._effect_status[t].status
              ? (this._effect_status[t].listeners.push(e),
                (this._effect_status[t].status = 1),
                Laya.loader.create(
                  t,
                  Laya.Handler.create(this, function() {
                    i._effect_status[t].status = 2;
                    for (
                      var e = 0;
                      e < i._effect_status[t].listeners.length;
                      e++
                    )
                      i._effect_status[t].listeners[e].run();
                    i._effect_status[t].listeners = [];
                  }),
                  null,
                  null,
                  [],
                  0
                ))
              : 1 == this._effect_status[t].status
              ? this._effect_status[t].listeners.push(e)
              : e.run())
          : app.Log.Error('EffectMgr ' + t + '使用前并未预热');
      }),
      (t.on_effectbase_destory = function(t) {
        if (
          this._effect_status.hasOwnProperty(t) &&
          (this._effect_status[t].count--, this._effect_status[t].count <= 0)
        ) {
          var e = Laya.loader.getRes(t);
          e && e.destroy(!0),
            (this._effect_status[t].count = 0),
            (this._effect_status[t].status = 0);
        }
      }),
      (t.force_dispose_3d_res = function(t) {
        for (var e = this.d3res_map[t], i = 0; i < e.length; i++) {
          var n = Laya.loader.getRes(e[i]);
          n && n.dispose();
        }
      }),
      (t.preheat_3d_effect = function(t, e, i, n, a) {
        for (var r = [], s = 0; s < t.length; s++) {
          var o = t[s];
          if (
            (this._preload_effects_count.hasOwnProperty(o) ||
              (this._preload_effects_count[o] = 0),
            0 == this._preload_effects_count[o] &&
              (r.push(o), this.d3res_map.hasOwnProperty(o)))
          )
            for (var l = this.d3res_map[o], h = 0; h < l.length; h++) {
              var c = l[h];
              this._res_count.hasOwnProperty(c)
                ? this._res_count[c]++
                : (this._res_count[c] = 1);
            }
          this._preload_effects_count[o]++;
        }
        this._prehead_3d_effect(r, e, i, n, a);
      }),
      (t._prehead_3d_effect = function(t, e, i, n, a) {
        var r = this;
        if (0 == t.length) return a.runWith(1), void n.run();
        var s = 0,
          o = i ? 5 : 2;
        a.runWith(0);
        var l = function() {
          if (s >= t.length) return a.runWith(1), void n.run();
          a.runWith(s / t.length);
          for (var h = [], c = 0; c < o && s < t.length; c++) h.push(t[s++]);
          for (var u = '', c = 0; c < h.length; c++)
            0 != c && (u += ','), (u += h[c]);
          app.Log.log('preheart_list:' + u),
            Laya.loader.create(
              h,
              Laya.Handler.create(r, function() {
                Laya.timer.frameOnce(1, r, function() {
                  for (
                    var t = 10,
                      n = function(n) {
                        var a = h[n].url,
                          s = 6;
                        'scene/ron_nilin.lh' == a && (s = 20),
                          s + 4 > t && (t = s + 4);
                        var o = Laya.loader.getRes(a);
                        if (o)
                          e.addChild(o),
                            (o.transform.position = i
                              ? new Laya.Vector3(1e4, 1e4, 1e4)
                              : new Laya.Vector3(0, 0, 0)),
                            (o.active = !0),
                            Laya.timer.frameOnce(s, r, function() {
                              var t = Laya.loader.getRes(a);
                              t && t.destroy(!0);
                            });
                        else {
                          var l = {};
                          (l.error = 'preheart effect url:' + a + ' =null'),
                            (l.stack = ''),
                            (l.method = '_prehead_3d_effect'),
                            (l.name = '_prehead_3d_effect'),
                            GameMgr.Inst.onFatalError(l, !1);
                        }
                      },
                      a = 0;
                    a < h.length;
                    a++
                  )
                    n(a);
                  Laya.timer.frameOnce(10, r, function() {
                    l();
                  });
                });
              })
            );
        };
        l();
      }),
      (t.dispose_3d_effect = function(t) {
        for (var e = 0; e < t.length; e++) {
          var i = t[e];
          if (
            (app.Log.log('dispose_3d_effect:' + i),
            this._preload_effects_count.hasOwnProperty(i) &&
              this._preload_effects_count[i] > 0)
          ) {
            if (
              (this._preload_effects_count[i]--,
              0 == this._preload_effects_count[i])
            ) {
              if (this.d3res_map.hasOwnProperty(i))
                for (var n = this.d3res_map[i], a = 0; a < n.length; a++) {
                  var r = n[a];
                  if (
                    this._res_count.hasOwnProperty(r) &&
                    this._res_count[r] > 0
                  ) {
                    if ((this._res_count[r]--, 0 == this._res_count[r])) {
                      var s = Laya.loader.getRes(r);
                      s && (s.clearTexture ? s.clearTexture() : s.dispose());
                    }
                  } else app.Log.Error('资源释放过多次1：' + i);
                }
              var o = Laya.loader.getRes(i);
              o && o.destroy(!0);
            }
          } else app.Log.Error('资源释放过多次0：' + i);
        }
      }),
      (t.create_d3_effect = function(t, i) {
        void 0 === i && (i = !1);
        return new e(t, i).root;
      }),
      (t.d3res_map = null),
      (t._ui_effects = []),
      (t._preload_effects_count = {}),
      (t._res_count = {}),
      (t._effect_status = {}),
      t
    );
  })();
  t.EffectMgr = i;
})(game || (game = {}));