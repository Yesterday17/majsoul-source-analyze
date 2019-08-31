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
        (t.ui_effect_list = [
          'scene/effect_getstar.lh',
          'scene/effect_losestar.lh',
          'scene/effect_queshi_bang.lh',
          'scene/effect_juanzhou.lh',
          'scene/effect_yiman.lh',
          'scene/effect_yiman2.lh'
        ]),
        (t.scene_hand = null),
        (t.root2 = null),
        (t.camera_hand = null),
        (t._common_texture2d_loaded = !1),
        (t._desktop_model_path = ''),
        (t._mjp_path = ''),
        (t._effect_list = []),
        (t._mjp_textures = []),
        (t._model_list = []),
        (i.Inst = t),
        'jp' == GameMgr.client_language
          ? t.ui_effect_list.push('scene/effect_winlose_jp.lh')
          : 'en' == GameMgr.client_language
          ? t.ui_effect_list.push('scene/effect_winlose_en.lh')
          : t.ui_effect_list.push('scene/effect_winlose.lh'),
        t.ui_effect_list.push(
          'scene/effect_yiman_queding_' + GameMgr.client_language + '.lh'
        ),
        t.ui_effect_list.push(
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
      (i.prototype.openMJRoom = function(t, e, i) {
        var n = this;
        this.load_common_texture2d(
          Laya.Handler.create(this, function() {
            n.load_mainscene(
              Laya.Handler.create(n, function() {
                n.active_common_texture2d(
                  Laya.Handler.create(n, function() {
                    app.Log.log('active_common_texture2d over'),
                      n._load_my_desktop_view(
                        Laya.Handler.create(n, function() {
                          app.Log.log('_load_my_desktop_view over'),
                            n._load_my_mjp_view(
                              Laya.Handler.create(n, function() {
                                app.Log.log('_load_my_mjp_view over'),
                                  n._load_player_views(
                                    t,
                                    Laya.Handler.create(n, function() {
                                      app.Log.log('_load_player_effects over'),
                                        (view.DesktopMgr.Inst.active = !0),
                                        (n.desktop.visible = !0),
                                        view.DesktopMgr.Inst.Reset(),
                                        i.runWith(1),
                                        e.run();
                                    }),
                                    Laya.Handler.create(
                                      n,
                                      function(t) {
                                        return i.runWith(0.75 + 0.25 * t);
                                      },
                                      null,
                                      !1
                                    )
                                  );
                              }),
                              Laya.Handler.create(
                                n,
                                function(t) {
                                  return i.runWith(0.65 + 0.1 * t);
                                },
                                null,
                                !1
                              )
                            );
                        }),
                        Laya.Handler.create(
                          n,
                          function(t) {
                            return i.runWith(0.6 + 0.05 * t);
                          },
                          null,
                          !1
                        )
                      );
                  }),
                  Laya.Handler.create(
                    n,
                    function(t) {
                      return i.runWith(0.55 + 0.05 * t);
                    },
                    null,
                    !1
                  )
                );
              }),
              Laya.Handler.create(
                n,
                function(t) {
                  return i.runWith(0.1 + 0.45 * t);
                },
                null,
                !1
              )
            );
          }),
          Laya.Handler.create(
            this,
            function(t) {
              return i.runWith(0.1 * t);
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
      (i.prototype._load_player_views = function(e, i, n) {
        var a = this,
          r = {};
        r['scene/effect_chipeng.lh'] = 1;
        for (var s = {}, o = {}, l = {}, h = 0; h < e.length; h++) {
          var c = e[h];
          if (c && c.character) {
            var u = c.character,
              _ = 'scene/effect_hupai_default.lh',
              d = 'scene/hand_human.lh',
              f = cfg.item_definition.character.get(u.charid);
            f && (d = 'scene/' + f.hand + '.lh');
            var p = '',
              m = 'scene/liqi_default.lh',
              g = '';
            if (u.views)
              for (var y = 0; y < u.views.length; y++) {
                var v = u.views[y].slot,
                  b = u.views[y].item_id;
                if (v == t.EPlayerView.liqi_bgm) {
                  var w = cfg.item_definition.item.get(b);
                  w && (g = w.sargs[0]);
                } else {
                  var x = cfg.item_definition.view.get(b);
                  x &&
                    (v == t.EPlayerView.hupai_effect
                      ? (_ = 'scene/' + x.res_name + '.lh')
                      : v == t.EPlayerView.liqi_effect
                      ? (p = 'scene/' + x.res_name + '.lh')
                      : v == t.EPlayerView.liqibang
                      ? (m = 'scene/' + x.res_name + '.lh')
                      : v == t.EPlayerView.hand_model &&
                        (d = 'scene/' + x.res_name + '.lh'));
                }
              }
            (r[_] = 1),
              'scene/effect_hupai_yanhua.lh' == _ &&
                (r['scene/effect_hupai_yanhua_bang.lh'] = 1),
              '' != p && (r[p] = 1),
              (s[m] = 1),
              (s[d] = 1),
              '' != g && (l[g] = 1);
            var I = u.skin,
              C = cfg.item_definition.skin.get(I);
            (o[C.path + '/full.png'] = 1),
              (o[C.path + '/half.png'] = 1),
              C.no_reverse &&
                ((o[C.path + '/reverse/full.png'] = 1),
                (o[C.path + '/reverse/half.png'] = 1));
          }
        }
        this._effect_list = [];
        for (var S in r) this._effect_list.push(S);
        this._model_list = [];
        for (var S in s) this._model_list.push(S);
        var T = [];
        for (var S in o) T.push(S);
        n.runWith(0),
          t.LoadMgr.loadResImage(
            T,
            Laya.Handler.create(this, function() {
              Laya.loader.create(
                a._model_list,
                Laya.Handler.create(a, function() {
                  t.EffectMgr.preheat_3d_effect(
                    a._effect_list,
                    view.DesktopMgr.Inst.trans_container_effect,
                    !1,
                    Laya.Handler.create(a, function() {
                      t.EffectMgr.preheat_3d_effect(
                        a.ui_effect_list,
                        t.FrontEffect.Inst.root2,
                        !0,
                        Laya.Handler.create(a, function() {
                          Laya.timer.frameOnce(5, a, function() {
                            i.run();
                            for (var t in l) Laya.loader.load('audio/' + t);
                          });
                        }),
                        Laya.Handler.create(
                          a,
                          function(t) {
                            return n.runWith(0.65 + 0.35 * t);
                          },
                          null,
                          !1
                        )
                      );
                    }),
                    Laya.Handler.create(
                      a,
                      function(t) {
                        return n.runWith(0.4 + 0.25 * t);
                      },
                      null,
                      !1
                    )
                  );
                }),
                Laya.Handler.create(
                  a,
                  function(t) {
                    return n.runWith(0.3 + 0.1 * t);
                  },
                  null,
                  !1
                )
              );
            }),
            Laya.Handler.create(
              this,
              function(t) {
                return n.runWith(0.3 * t);
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
            t.EffectMgr.dispose_3d_effect(this.ui_effect_list);
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
      i
    );
  })(t.SceneBase);
  t.Scene_MJ = e;
})(game || (game = {}));