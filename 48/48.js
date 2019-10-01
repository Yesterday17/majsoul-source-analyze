var game;
!(t => {
  var e = (() => {
    function t(e, n) {
      var a = this;
      this.id = 0;
      this._loaded = !1;
      this._destroyed = !1;
      this._root = null;
      this._effect = null;
      this._when_loaded = null;
      this.id = t.IDcount++;
      this.url = e;
      this._loaded = !1;
      this._destroyed = !1;
      this._root = new Laya.Sprite3D();
      this._root.active = !0;
      this._root.on('undisplay', this, () => {
        a._root.destroyed && (a._destroyed || a.destory());
      });
      Laya.timer.currTimer;
      i.try2get_effect(
        e,
        Laya.Handler.create(this, () => {
          if (null == a._root || a._root.destroyed || a._destroyed);
          else {
            a._loaded = !0;
            var t = Laya.loader.getRes(e);
            a._effect = t;
            n && (a._effect = t.clone());
            a._root.addChild(a._effect);
            a._effect.transform.localPosition = new Laya.Vector3(0, 0, 0);

            t &&
              t instanceof Laya.Sprite3D &&
              ((a._effect.active = !0));

            null != a._when_loaded && a._when_loaded.run();
          }
        })
      );
    }

    Object.defineProperty(t.prototype, 'loaded', {
      get() {
        return this._loaded;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'destroyed', {
      get() {
        return this._destroyed;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'root', {
      get() {
        return this._root;
      },
      enumerable: !0,
      configurable: !0
    });

    t.prototype.addLoadedListener = function(t) {
      this.loaded ? t.run() : (this._when_loaded = t);
    };

    t.prototype.destory = function() {
      this._destroyed = !0;
      this._root && !this._root.destroyed && this._root.destroy(!0);
      this._loaded && this._effect.destroy(!0);
      this._destroyed ||
        (i.on_effectbase_destory(this.url));
    };

    t.IDcount = 0;
    return t;
  })();
  t.EffectBase = e;
  var i = (() => {
    class t {
      static init(t) {
        var e = this;
        Laya.loader.load(
          'd3_prefab.json',
          Laya.Handler.create(this, () => {
            e.d3res_map = Laya.loader.getRes('d3_prefab.json');
            t && t.run();
          })
        );
      }

      static try2get_effect(t, e) {
        var i = this;

        this._effect_status.hasOwnProperty(t) ||
              (this._effect_status[t] = { status: 0, count: 0, listeners: [] });

        this._effect_status[t].count++;
        this._effect_status[t].listeners.push(e);
        this._effect_status[t].status = 1;
        this._preload_effects_count.hasOwnProperty(t) &&
        this._preload_effects_count[t] > 0
          ? (0 == this._effect_status[t].status
          ? (Laya.loader.create(
          t,
          Laya.Handler.create(this, () => {
            i._effect_status[t].status = 2;
            Laya.loader.getRes(t).active = !1;
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
          : app.Log.Error(`EffectMgr ${t}使用前并未预热`);
      }

      static on_effectbase_destory(t) {
        this._effect_status[t].count--;
        if (
          this._effect_status.hasOwnProperty(t) &&
          (this._effect_status[t].count <= 0)
        ) {
          var e = Laya.loader.getRes(t);
          e && e.destroy(!0);
          this._effect_status[t].count = 0;
          this._effect_status[t].status = 0;
        }
      }

      static force_dispose_3d_res(t) {
        for (var e = this.d3res_map[t], i = 0; i < e.length; i++) {
          var n = Laya.loader.getRes(e[i]);
          n && n.dispose();
        }
      }

      static preheat_3d_effect(t, e, i, n, a) {
        for (var r = [], s = 0; s < t.length; s++) {
          var o = t[s];

          this._preload_effects_count.hasOwnProperty(o) ||
              (this._preload_effects_count[o] = 0);

          r.push(o);
          if (
            (0 == this._preload_effects_count[o] &&
            (this.d3res_map.hasOwnProperty(o)))
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
      }

      static _prehead_3d_effect(t, e, i, n, a) {
        var r = this;
        a.runWith(1);
        if (0 == t.length) return void n.run();
        var s = 0;
        var o = i ? 5 : 2;
        a.runWith(0);
        var l = () => {
          a.runWith(1);
          if (s >= t.length) return void n.run();
          a.runWith(s / t.length);
          for (var h = [], c = 0; c < o && s < t.length; c++) h.push(t[s++]);
          0 != c && (u += ',');
          for (var u = '', c = 0; c < h.length; c++)
            u += h[c];
          app.Log.log(`preheart_list:${u}`);
          Laya.loader.create(
            h,
            Laya.Handler.create(r, () => {
              Laya.timer.frameOnce(1, r, () => {
                for (
                  var t = t => {
                    var n = h[t].url,
                      a = 40;
                    'scene/ron_nilin.lh' == n && (a = 60);
                    var s = Laya.loader.getRes(n);
                    e.addChild(s);

                    s.transform.position = i
                        ? new Laya.Vector3(1e4, 1e4, 1e4)
                        : new Laya.Vector3(0, 0, 0);

                    s.active = !0;
                    if (s)
                      Laya.timer.frameOnce(a, r, () => {
                        var t = Laya.loader.getRes(n);
                        t && t.destroy(!0);
                      });
                    else {
                      var o = {};
                      o.error = `preheart effect url:${n} =null`;
                      o.stack = '';
                      o.method = '_prehead_3d_effect';
                      o.name = '_prehead_3d_effect';
                      GameMgr.Inst.onFatalError(o, !1);
                    }
                  },
                    n = 0;
                  n < h.length;
                  n++
                )
                  t(n);
                Laya.timer.frameOnce(10, r, () => {
                  l();
                });
              });
            })
          );
        };
        l();
      }

      static dispose_3d_effect(t) {
        for (var e = 0; e < t.length; e++) {
          var i = t[e];
          app.Log.log(`dispose_3d_effect:${i}`);
          if (
            (this._preload_effects_count.hasOwnProperty(i) &&
            this._preload_effects_count[i] > 0)
          ) {
            this._preload_effects_count[i]--;
            if (
              (0 == this._preload_effects_count[i])
            ) {
              if (this.d3res_map.hasOwnProperty(i))
                for (var n = this.d3res_map[i], a = 0; a < n.length; a++) {
                  var r = n[a];
                  if (
                    this._res_count.hasOwnProperty(r) &&
                    this._res_count[r] > 0
                  ) {
                    this._res_count[r]--;
                    if ((0 == this._res_count[r])) {
                      var s = Laya.loader.getRes(r);
                      s && (s.clearTexture ? s.clearTexture() : s.dispose());
                    }
                  } else app.Log.Error(`资源释放过多次1：${i}`);
                }
              var o = Laya.loader.getRes(i);
              o && o.destroy(!0);
            }
          } else app.Log.Error(`资源释放过多次0：${i}`);
        }
      }
    }

    t.create_d3_effect = (t, i) => {
      void 0 === i && (i = !1);
      return new e(t, i);
    };

    t.d3res_map = null;
    t._ui_effects = [];
    t._preload_effects_count = {};
    t._res_count = {};
    t._effect_status = {};
    return t;
  })();
  t.EffectMgr = i;
})(game || (game = {}));