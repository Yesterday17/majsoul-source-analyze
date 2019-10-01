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
  game;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this) || this;
      return (
        (t.desktop = null),
        (t.camera_main = null),
        (t.scene_path2 = 'scene/mjhandpai.ls'),
        (t.scene_hand = null),
        (t.root2 = null),
        (t.camera_hand = null),
        (t._common_texture2d_loaded = !1),
        (t._desktop_model_path = ''),
        (t._mjp_path = ''),
        (t._effect_list = []),
        (t._ui_effect_list = []),
        (t._mjp_textures = []),
        (t._model_list = []),
        (i.Inst = t),
        'jp' == GameMgr.client_language
          ? i.ui_effect_list.push('scene/effect_winlose_jp.lh')
          : 'en' == GameMgr.client_language
          ? i.ui_effect_list.push('scene/effect_winlose_en.lh')
          : i.ui_effect_list.push('scene/effect_winlose.lh'),
        i.ui_effect_list.push(
          'scene/effect_yiman_queding_' + GameMgr.client_language + '.lh'
        ),
        i.ui_effect_list.push(
          'scene/effect_yiman_jihui_' + GameMgr.client_language + '.lh'
        ),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.init = function(t) {}),
      (i.prototype.onEnable = function() {
        uiscript.UIMgr.Inst.onSceneMJ_Enable();
      }),
      (i.prototype.onDisable = function() {
        uiscript.UIMgr.Inst.onSceneMJ_Disable(),
          view.DesktopMgr.Inst.Reset(),
          (view.DesktopMgr.Inst.active = !1),
          (this.desktop.visible = !1),
          t.MJNetMgr.Inst.Close(),
          t.LoadMgr.disposeSceneRes('mjdesktop');
      }),
      (i.prototype.openMJRoom = function(t, e, i, n) {
        var a = this;
        this.load_common_texture2d(
          Laya.Handler.create(this, function() {
            a.load_mainscene(
              Laya.Handler.create(a, function() {
                a.active_common_texture2d(
                  Laya.Handler.create(a, function() {
                    app.Log.log('active_common_texture2d over'),
                      a._load_my_desktop_view(
                        Laya.Handler.create(a, function() {
                          app.Log.log('_load_my_desktop_view over'),
                            a._load_my_mjp_view(
                              Laya.Handler.create(a, function() {
                                app.Log.log('_load_my_mjp_view over'),
                                  a._load_player_views(
                                    t,
                                    e,
                                    Laya.Handler.create(a, function() {
                                      app.Log.log('_load_player_effects over'),
                                        (view.DesktopMgr.Inst.active = !0),
                                        (a.desktop.visible = !0),
                                        view.DesktopMgr.Inst.Reset(),
                                        n.runWith(1),
                                        i.run();
                                    }),
                                    Laya.Handler.create(
                                      a,
                                      function(t) {
                                        return n.runWith(0.75 + 0.25 * t);
                                      },
                                      null,
                                      !1
                                    )
                                  );
                              }),
                              Laya.Handler.create(
                                a,
                                function(t) {
                                  return n.runWith(0.65 + 0.1 * t);
                                },
                                null,
                                !1
                              )
                            );
                        }),
                        Laya.Handler.create(
                          a,
                          function(t) {
                            return n.runWith(0.6 + 0.05 * t);
                          },
                          null,
                          !1
                        )
                      );
                  }),
                  Laya.Handler.create(
                    a,
                    function(t) {
                      return n.runWith(0.55 + 0.05 * t);
                    },
                    null,
                    !1
                  )
                );
              }),
              Laya.Handler.create(
                a,
                function(t) {
                  return n.runWith(0.1 + 0.45 * t);
                },
                null,
                !1
              )
            );
          }),
          Laya.Handler.create(
            this,
            function(t) {
              return n.runWith(0.1 * t);
            },
            null,
            !1
          )
        );
      }),
      (i.prototype.load_mainscene = function(e, i) {
        var n = this;
        uiscript.UIMgr.Inst.openMjDesktopUI(
          Laya.Handler.create(
            this,
            function() {
              n.desktop
                ? (i.runWith(1), e.run())
                : (cfg.audio.audio.forEach(function(t) {
                    'mj' == t.type &&
                      Laya.loader.load(t.path + view.AudioMgr.suffix);
                  }),
                  t.LoadMgr.loadRes(
                    t.E_LoadType.scene_mj,
                    Laya.Handler.create(n, function() {
                      return Laya.timer.frameOnce(1, n, function() {
                        var t = 'scene/mjdesktop.ls';
                        'en' == GameMgr.client_language &&
                          (t = 'scene/mjdesktop_en.ls'),
                          (n.desktop = Laya.loader.getRes(t)),
                          (n.desktop.ambientColor = new Laya.Vector3(
                            0.4,
                            0.4,
                            0.4
                          ));
                        var a = n.desktop.getChildByName('main_camera');
                        GameMgr.Inst.addScene(n.desktop);
                        var r = n.desktop.addChild(new Laya.DirectionLight());
                        r.transform.translate(new Laya.Vector3(0, 1, 1.7)),
                          (r.color = new Laya.Vector3(0.5, 0.5, 0.5)),
                          (r.direction = new Laya.Vector3(0, -0.933, -0.36));
                        var s = Laya.loader.getRes(n.scene_path2);
                        GameMgr.Inst.addScene(s),
                          (n.scene_hand = s),
                          (n.root2 = s.getChildByName('root')),
                          (n.camera_hand = s.getChildByName('camera')),
                          (n.camera_hand.useOcclusionCulling = !1);
                        (n.desktop
                          .getChildByName('room')
                          .addComponent(view.DesktopMgr).mainCamera = a),
                          (a.useOcclusionCulling = !1),
                          i.runWith(1),
                          e.run();
                      });
                    }),
                    Laya.Handler.create(
                      n,
                      function(t) {
                        return i.runWith(0.2 + 0.8 * t);
                      },
                      null,
                      !1
                    )
                  ));
            },
            null,
            !1
          ),
          Laya.Handler.create(
            this,
            function(t) {
              return i.runWith(0.2 * t);
            },
            null,
            !1
          )
        );
      }),
      (i.prototype.load_common_texture2d = function(e, i) {
        var n = this;
        if (this._common_texture2d_loaded) i && i.runWith(1), e && e.run();
        else {
          for (
            var a = [], r = 0;
            r < t.EffectMgr.d3res_map.mj_common_texture2d.length;
            r++
          )
            a.push(t.EffectMgr.d3res_map.mj_common_texture2d[r]);
          Laya.loader.create(
            a,
            Laya.Handler.create(this, function() {
              (n._common_texture2d_loaded = !0), e && e.run();
            }),
            i,
            laya.d3.resource.Texture2D_caps
          );
        }
      }),
      (i.prototype.active_common_texture2d = function(e, i) {
        i.runWith(0);
        for (
          var n = [], a = 0;
          a < t.EffectMgr.d3res_map.mj_common_texture2d.length;
          a++
        )
          n.push(t.EffectMgr.d3res_map.mj_common_texture2d[a]);
        var r = 0,
          s = function() {
            if (r >= n.length) return i.runWith(1), void e.run();
            i.runWith(r / n.length);
            var t = Laya.loader.getRes(n[r]);
            t && t.recreateResource(), r++, s();
          };
        s();
      }),
      (i.prototype.clearTexture_commont_texture2d = function() {
        for (
          var e = t.EffectMgr.d3res_map.mj_common_texture2d, i = 0;
          i < e.length;
          i++
        ) {
          var n = Laya.loader.getRes(e[i]);
          n && n.clearTexture();
        }
      }),
      (i.prototype._load_my_mjp_view = function(e, i) {
        var n = [];
        n.push(
          'scene/Assets/Resource/tablecloth/' +
            t.GameUtility.get_common_view_res_name(t.ECommonView.desktop) +
            '/Table_Dif.jpg'
        );
        var a = t.GameUtility.get_common_view_res_name(t.ECommonView.mjp),
          r = 'scene/Assets/Resource/mjpai/';
        'en' == GameMgr.client_language && (r += 'en/'), (r += a + '/');
        for (var s = 0; s < 10; s++)
          n.push(r + s + 'm.png'),
            n.push(r + s + 'p.png'),
            n.push(r + s + 's.png'),
            s >= 1 && s < 8 && n.push(r + s + 'z.png');
        n.push(r + 'hand.png'),
          (this._mjp_textures = n),
          Laya.loader.create(n, e, i);
      }),
      (i.prototype._load_my_desktop_view = function(e, i) {
        var n = this,
          a = t.GameUtility.get_common_view_res_name(t.ECommonView.desktop);
        'tablecloth_quehunji1' == a &&
          'chs' != GameMgr.client_language &&
          (a += '_enjp'),
          (this._desktop_model_path = 'scene/' + a + '.lh'),
          Laya.loader.create(
            this._desktop_model_path,
            Laya.Handler.create(this, function() {
              (n._desktop_model = Laya.loader.getRes(n._desktop_model_path)),
                n.desktop
                  .getChildByName('room')
                  .getChildByName('container_desktop')
                  .addChild(n._desktop_model),
                (n._desktop_model.transform.localPosition = new Laya.Vector3(
                  0,
                  0,
                  0
                )),
                (n._desktop_model.transform.localScale = new Laya.Vector3(
                  1,
                  1,
                  1
                )),
                (n._desktop_model.transform.localRotationEuler = new Laya.Vector3(
                  0,
                  0,
                  0
                )),
                (n._desktop_model.active = !0),
                (n._desktop_model.isStatic = !0),
                i.runWith(1),
                e.run();
            }),
            i
          );
      }),
      (i.prototype._load_player_views = function(e, n, a, r) {
        var s = this,
          o = {},
          l = {},
          h = {},
          c = {},
          u = {};
        if (e) {
          var _ = 0;
          e &&
            e.mode &&
            e.mode.detail_rule &&
            e.mode.detail_rule.dora3_mode &&
            (_ = 1),
            _ &&
              ((l[
                'scene/effect_dora3_begin_' + GameMgr.client_language + '.lh'
              ] = 1),
              (l['scene/effect_dora3_shine.lh'] = 1));
        }
        for (k = 0; k < n.length; k++) {
          var d = n[k];
          if (d && d.character) {
            var f = d.character,
              p = 'scene/effect_hupai_default.lh',
              m = 'scene/hand_human.lh',
              g = cfg.item_definition.character.get(f.charid);
            g && (m = 'scene/' + g.hand + '.lh');
            var y = '',
              v = 'scene/liqi_default.lh',
              b = '',
              w = 'scene/effect_mingpai_default.lh';
            if (f.views)
              for (N = 0; N < f.views.length; N++) {
                var x = f.views[N].slot,
                  I = f.views[N].item_id;
                if (x == t.EPlayerView.liqi_bgm) {
                  var C = cfg.item_definition.item.get(I);
                  C && (b = C.sargs[0]);
                } else {
                  var S = cfg.item_definition.view.get(I);
                  S &&
                    (x == t.EPlayerView.hupai_effect
                      ? (p = 'scene/' + S.res_name + '.lh')
                      : x == t.EPlayerView.liqi_effect
                      ? (y = 'scene/' + S.res_name + '.lh')
                      : x == t.EPlayerView.liqibang
                      ? (v = 'scene/' + S.res_name + '.lh')
                      : x == t.EPlayerView.hand_model
                      ? (m = 'scene/' + S.res_name + '.lh')
                      : x == t.EPlayerView.mingpai_effect &&
                        (w = 'scene/' + S.res_name + '.lh'));
                }
              }
            (o[p] = 1),
              'scene/effect_hupai_yanhua.lh' == p &&
                (o['scene/effect_hupai_yanhua_bang.lh'] = 1),
              '' != y && (o[y] = 1),
              (o[w] = 1),
              (h[v] = 1),
              (h[m] = 1),
              '' != b && (u[b] = 1);
            var M = f.skin,
              T = cfg.item_definition.skin.get(M);
            if (
              ((c[T.path + '/full.png'] = 1),
              (c[T.path + '/half.png'] = 1),
              T.no_reverse &&
                ((c[T.path + '/reverse/full.png'] = 1),
                (c[T.path + '/reverse/half.png'] = 1)),
              f.extra_emoji)
            )
              for (
                var L = f.extra_emoji,
                  E = cfg.character.emoji.getGroup(f.charid),
                  D = 0;
                D < L.length;
                D++
              )
                for (var N = 0; N < E.length; N++)
                  if (E[N].sub_id == L[D]) {
                    var A = E[N];
                    2 == A.type && (l['scene/' + A.view + '.lh'] = 1);
                  }
          }
        }
        this._effect_list = [];
        for (var B in o) this._effect_list.push(B);
        this._model_list = [];
        for (var B in h) this._model_list.push(B);
        var R = [];
        for (var B in c) R.push(B);
        this._ui_effect_list = [];
        for (var k = 0; k < i.ui_effect_list.length; k++)
          this._ui_effect_list.push(i.ui_effect_list[k]);
        for (var B in l) this._ui_effect_list.push(B);
        r.runWith(0),
          t.LoadMgr.loadResImage(
            R,
            Laya.Handler.create(this, function() {
              Laya.loader.create(
                s._model_list,
                Laya.Handler.create(s, function() {
                  t.EffectMgr.preheat_3d_effect(
                    s._effect_list,
                    view.DesktopMgr.Inst.trans_container_effect,
                    !1,
                    Laya.Handler.create(s, function() {
                      t.EffectMgr.preheat_3d_effect(
                        s._ui_effect_list,
                        t.FrontEffect.Inst.root2,
                        !0,
                        Laya.Handler.create(s, function() {
                          Laya.timer.frameOnce(5, s, function() {
                            a.run();
                            for (var t in u) Laya.loader.load('audio/' + t);
                          });
                        }),
                        Laya.Handler.create(
                          s,
                          function(t) {
                            return r.runWith(0.65 + 0.35 * t);
                          },
                          null,
                          !1
                        )
                      );
                    }),
                    Laya.Handler.create(
                      s,
                      function(t) {
                        return r.runWith(0.3 + 0.35 * t);
                      },
                      null,
                      !1
                    )
                  );
                }),
                Laya.Handler.create(
                  s,
                  function(t) {
                    return r.runWith(0.2 + 0.1 * t);
                  },
                  null,
                  !1
                )
              );
            }),
            Laya.Handler.create(
              this,
              function(t) {
                return r.runWith(0.2 * t);
              },
              null,
              !1
            )
          );
      }),
      (i.prototype._on_quit = function() {
        if (
          (uiscript.UI_DesktopInfo.Inst &&
            uiscript.UI_DesktopInfo.Inst.onCloseRoom(),
          uiscript.UI_Win.Inst && (uiscript.UI_Win.Inst.enable = !1),
          uiscript.UI_ScoreChange.Inst &&
            (uiscript.UI_ScoreChange.Inst.enable = !1),
          view.DesktopMgr.Inst && view.DesktopMgr.Inst.active)
        ) {
          if (
            (this._desktop_model &&
              (this._desktop_model.destroy(!0), (this._desktop_model = null)),
            t.EffectMgr.force_dispose_3d_res(this._desktop_model_path),
            this._desktop_model_path)
          ) {
            (n = Laya.loader.getRes(this._desktop_model_path)) && n.destroy(!0),
              (this._desktop_model_path = '');
          }
          for (i = 0; i < this._model_list.length; i++) {
            var e = this._model_list[i].url;
            t.EffectMgr.force_dispose_3d_res(e);
            (n = Laya.loader.getRes(e)) && n.destroy(!0);
          }
          this.clearTexture_commont_texture2d(),
            t.EffectMgr.dispose_3d_effect(this._effect_list),
            t.EffectMgr.dispose_3d_effect(this._ui_effect_list);
          for (var i = 0; i < this._mjp_textures.length; i++) {
            var n = Laya.loader.getRes(this._mjp_textures[i].url);
            n && n.dispose();
          }
        }
      }),
      (i.prototype.GameEnd = function() {
        app.Log.log('Scene_MJ GameEnd'),
          this._on_quit(),
          t.MJNetMgr.Inst.Close(),
          (GameMgr.Inst.ingame = !1),
          GameMgr.Inst.EnterLobby();
      }),
      (i.prototype.ForceOut = function() {
        app.Log.log('Scene_MJ ForceOut'),
          this._on_quit(),
          t.MJNetMgr.Inst.Close(),
          GameMgr.Inst.EnterLobby();
      }),
      (i.Inst = null),
      (i.ui_effect_list = [
        'scene/effect_getstar.lh',
        'scene/effect_losestar.lh',
        'scene/effect_queshi_bang.lh',
        'scene/effect_juanzhou.lh',
        'scene/effect_yiman.lh',
        'scene/effect_yiman2.lh'
      ]),
      i
    );
  })(t.SceneBase);
  t.Scene_MJ = e;
})(game || (game = {}));