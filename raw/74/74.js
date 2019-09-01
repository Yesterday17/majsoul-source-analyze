var game;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this) || this;
      return (
        (t.scene_path = 'scene/lobby.ls'),
        (t.ui_effect_list = [
          'scene/effect_get_character.lh',
          'scene/effect_get_zhuangban.lh',
          'scene/effect_heartup.lh',
          'scene/effect_heartup_favor.lh',
          'scene/effect_heartlevelup.lh',
          'scene/effect_item_shine.lh',
          'scene/effect_item_shine_big.lh'
        ]),
        (t.scene_container = null),
        (t.scene = null),
        (t.bg_front_plane = null),
        (t.bg_front_mat = null),
        (t.bg_back_plane = null),
        (t.bg_back_mat = null),
        (t._current_bg = ''),
        (t._change_start_time = 0),
        (t._during_change_bg = false),
        (t._check_idcard = false),
        (t._load_listener = []),
        (t._progress_listener = []),
        (t._yard_img_url = ''),
        (t._indoor_img_url = ''),
        (t._loading_yard_img_url = ''),
        (t._lobby_effet_name = ''),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.init = function(e) {
        var i = this;
        this._load_state = t.E_LoadState.loading;
        var n = [];
        n.push('extendRes/charactor/default_girl/full.png'),
          n.push('extendRes/charactor/default_girl/half.png'),
          n.push('extendRes/charactor/default_girl/smallhead.png'),
          n.push('extendRes/charactor/default_girl/bighead.png'),
          n.push('extendRes/charactor/default_girl/waitingroom.png'),
          n.push('extendRes/charactor/default_man/full.png'),
          n.push('extendRes/charactor/default_man/half.png'),
          n.push('extendRes/charactor/default_man/smallhead.png'),
          n.push('extendRes/charactor/default_man/bighead.png'),
          n.push('extendRes/charactor/default_man/waitingroom.png'),
          n.push('extendRes/emo/default.png');
        for (
          var a = [302001, 302002, 302003, 302004], r = 0;
          r < a.length;
          r++
        ) {
          var s = cfg.item_definition.item.get(a[r]);
          n.push(s.icon),
            s.icon_transparent &&
              '' != s.icon_transparent &&
              n.push(s.icon_transparent);
        }
        n.push('extendRes/items/default.jpg'),
          cfg.level_definition.level_definition.forEach(function(t, e) {
            n.push(t.primary_icon);
          }),
          this._loadaudio(),
          n.push('extendRes/items/gold0.png'),
          n.push('extendRes/items/gold1.png'),
          t.LoadMgr.loadResImage(
            n,
            Laya.Handler.create(this, function() {
              t.LoadMgr.loadRes(
                t.E_LoadType.common,
                Laya.Handler.create(i, function() {
                  t.LoadMgr.loadRes(
                    t.E_LoadType.lobby,
                    Laya.Handler.create(i, function() {
                      return Laya.timer.frameOnce(1, i, function() {
                        t.EffectMgr.init(
                          Laya.Handler.create(i, function() {
                            i.onProgressUpdate(1),
                              Laya.timer.frameOnce(5, i, function() {
                                GameMgr.Inst.addScene(
                                  (i.scene_container = new Laya.Sprite())
                                ),
                                  (i.scene_container.visible = true),
                                  (i._load_state = t.E_LoadState.loaded);
                                for (
                                  var e = 0;
                                  e < i._load_listener.length;
                                  e++
                                )
                                  i._load_listener[e] &&
                                    i._load_listener[e].run();
                                (i._load_listener = []),
                                  (i._progress_listener = []);
                              });
                          })
                        );
                      });
                    }),
                    Laya.Handler.create(
                      i,
                      function(t) {
                        return i.onProgressUpdate(0.7 + 0.3 * t);
                      },
                      null,
                      false
                    )
                  );
                }),
                Laya.Handler.create(
                  i,
                  function(t) {
                    return i.onProgressUpdate(0.5 + 0.2 * t);
                  },
                  null,
                  false
                )
              );
            }),
            Laya.Handler.create(
              this,
              function(t) {
                return i.onProgressUpdate(0.5 * t);
              },
              null,
              false
            )
          );
      }),
      (i.prototype._loadaudio = function() {
        cfg.audio.audio.forEach(function(t) {
          'lobby' == t.type && Laya.loader.load(t.path + view.AudioMgr.suffix);
        });
      }),
      (i.prototype.buildScene = function(e, i) {
        var n = this;
        if (this.scene) return i.runWith(1), void e.run();
        i.runWith(0),
          Laya.loader.create(
            this.scene_path,
            Laya.Handler.create(this, function() {
              i.runWith(0.3);
              var a = [];
              n._indoor_img_url = 'scene/Assets/Resource/lobby/indoor.jpg';
              var r = t.GameUtility.get_common_view_id(3);
              if (r) {
                var s = cfg.item_definition.view.get(r);
                n._yard_img_url =
                  'scene/Assets/Resource/lobby/' + s.res_name + '.jpg';
              } else n._yard_img_url = 'scene/Assets/Resource/lobby/yard.jpg';
              a.push(n._indoor_img_url),
                a.push(n._yard_img_url),
                Laya.loader.create(
                  a,
                  Laya.Handler.create(n, function() {
                    (n.scene = Laya.loader.getRes(n.scene_path)),
                      n.scene_container.addChild(n.scene),
                      (n.bg_front_plane = n.scene
                        .getChildByName('root')
                        .getChildByName('bg_front')),
                      (n.bg_front_mat =
                        n.bg_front_plane.meshRender.sharedMaterial),
                      (n.bg_back_plane = n.scene
                        .getChildByName('root')
                        .getChildByName('bg_back')),
                      (n.bg_back_mat =
                        n.bg_back_plane.meshRender.sharedMaterial),
                      (n.bg_front_plane.active = false),
                      i.runWith(0.6),
                      Laya.timer.frameOnce(8, n, function() {
                        (n.scene.visible = true),
                          i.runWith(0.8),
                          n.preheart_effect(
                            e,
                            Laya.Handler.create(
                              n,
                              function(t) {
                                i.runWith(0.8 + 0.2 * t);
                              },
                              null,
                              false
                            )
                          );
                      });
                  }),
                  Laya.Handler.create(
                    n,
                    function(t) {
                      return i.runWith(0.3 + 0.3 * t);
                    },
                    null,
                    false
                  )
                );
            }),
            Laya.Handler.create(
              this,
              function(t) {
                return i.runWith(0.3 * t);
              },
              null,
              false
            )
          );
      }),
      (i.prototype.preheart_effect = function(e, i) {
        var n = this;
        app.Log.log('scene_lobby preheart_effect'),
          t.EffectMgr.preheat_3d_effect(
            this.ui_effect_list,
            t.FrontEffect.Inst.root2,
            true,
            Laya.Handler.create(this, function() {
              Laya.timer.frameOnce(5, n, function() {
                i.runWith(1), e.run();
              });
            }),
            i
          );
      }),
      (i.prototype.onEnable = function() {
        (this._during_change_bg = false),
          uiscript.UIMgr.Inst.onSceneLobby_Enable(),
          this.scene && (this.scene.visible = true),
          view.BgmListMgr.PlayLobbyBgm(),
          this.pending_enter_event(),
          (uiscript.UI_Invite.Inst.enable = true),
          Laya.timer.frameLoop(1, this, this._update, null, true);
      }),
      (i.prototype.pending_enter_event = function() {
        var e = this,
          i = 'yard';
        if (
          GameMgr.Inst.account_data.nickname &&
          '' != GameMgr.Inst.account_data.nickname
        )
          if (GameMgr.Inst.ingame)
            (i = 'indoor'),
              t.MJNetMgr.Inst.OpenConnect(
                GameMgr.Inst.mj_game_token,
                GameMgr.Inst.mj_game_uuid,
                GameMgr.Inst.mj_server_location,
                true,
                null
              );
          else if (uiscript.UI_WaitingRoom.Inst.inRoom)
            (i = 'indoor'), uiscript.UIMgr.Inst.ShowWaitingRoom();
          else if (-1 != GameMgr.Inst.beinvited_roomid) {
            var n = GameMgr.Inst.beinvited_roomid;
            (GameMgr.Inst.beinvited_roomid = -1),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'joinRoom',
                { room_id: n },
                function(t, e) {
                  t || e.error
                    ? (uiscript.UIMgr.Inst.showNetReqError('joinRoom', t, e),
                      uiscript.UIMgr.Inst.showLobby())
                    : (uiscript.UI_WaitingRoom.Inst.updateData(e.room),
                      uiscript.UIMgr.Inst.ShowWaitingRoom());
                }
              );
          } else if ('' != GameMgr.Inst.outsee_paipuid) {
            var a = GameMgr.Inst.outsee_paipuid;
            GameMgr.Inst.outsee_paipuid = '';
            var r = a.split('_'),
              s = 0,
              o = 0;
            if (
              (r.length > 1 &&
                (s =
                  'a' == r[1].charAt(0)
                    ? t.Tools.decode_account_id(parseInt(r[1].substr(1)))
                    : parseInt(r[1])),
              r.length > 2)
            ) {
              var l = parseInt(r[2]);
              l && (o = l);
            }
            GameMgr.Inst.checkPaiPu(r[0], s, o);
          } else if (GameMgr.Inst.custom_match_id > 0)
            (i = 'indoor'),
              uiscript.UI_Match_Room.Inst.enable ||
                uiscript.UI_Match_Room.Inst.show(GameMgr.Inst.custom_match_id);
          else {
            var h = true;
            if (
              ((uiscript.UI_Ob.Inst.enable ||
                uiscript.UI_PaiPu.Inst.enable ||
                uiscript.UI_Match_Room.Inst.enable) &&
                ((h = false), (i = 'indoor')),
              h)
            ) {
              uiscript.UI_Lobby.Inst.enable = true;
              var c = false;
              if (!this._check_idcard) {
                this._check_idcard = true;
                'chs' != GameMgr.client_language ||
                  uiscript.UI_ShiMingRenZheng.renzhenged ||
                  GameMgr.Inst.player_in_haiwai ||
                  !GameMgr.inRelease ||
                  ((c = true),
                  Laya.LocalStorage.setItem(
                    'shiming_time_' +
                      t.Tools.encode_account_id(GameMgr.Inst.account_id),
                    Date.now().toString()
                  ));
              }
              if (c) uiscript.UI_ShiMingRenZheng.Inst.show();
              else if (uiscript.UI_User_Xieyi.Inst) {
                GameMgr.Inst.account_setting[
                  t.EAccountSetKey.user_xieyi.toString()
                ]
                  ? (this.pending_pop2(),
                    uiscript.UI_User_Xieyi.Inst.destroy(),
                    (uiscript.UI_User_Xieyi.Inst = null))
                  : uiscript.UI_User_Xieyi.Inst.show(
                      Laya.Handler.create(this, function() {
                        app.NetAgent.sendReq2Lobby(
                          'Lobby',
                          'updateAccountSettings',
                          {
                            setting: {
                              key: t.EAccountSetKey.user_xieyi,
                              value: 1
                            }
                          },
                          function(t, e) {}
                        ),
                          (GameMgr.Inst.account_setting[
                            t.EAccountSetKey.user_xieyi.toString()
                          ] = 1),
                          e.pending_pop2(),
                          uiscript.UI_User_Xieyi.Inst.destroy(),
                          (uiscript.UI_User_Xieyi.Inst = null);
                      })
                    );
              } else this.pending_pop2();
            }
          }
        else uiscript.UI_Nickname.show();
        this.change_bg(i, true);
      }),
      (i.prototype.pending_pop2 = function() {
        uiscript.UI_Info.lobbyPopout() ||
          (uiscript.UI_Activity.need_popout &&
            uiscript.UI_Activity.Inst.show());
      }),
      (i.prototype.onDisable = function() {
        Laya.AtlasResourceManager.instance.freeAll(),
          uiscript.UIMgr.Inst.onSceneLobby_Disable(),
          (this.scene.visible = false),
          t.LoadMgr.disposeSceneRes('lobby'),
          (this._current_bg = ''),
          (this.bg_back_mat = null),
          (this.bg_back_plane = null),
          (this.bg_front_mat = null),
          (this.bg_front_plane = null),
          this.scene.destroy(true),
          (this.scene = null),
          (this._lobby_effet_name = ''),
          (this._loading_yard_img_url = ''),
          t.EffectMgr.dispose_3d_effect(this.ui_effect_list),
          t.EffectMgr.force_dispose_3d_res(this.scene_path),
          (this._during_change_bg = false),
          Laya.timer.clearAll(this);
      }),
      (i.prototype.addLoadListenter = function(e, i) {
        this._load_state == t.E_LoadState.loaded
          ? Laya.timer.once(500, this, function() {
              i && i.runWith(1), e && e.run();
            })
          : (i && this._progress_listener.push(i),
            e && this._load_listener.push(e));
      }),
      (i.prototype.change_bg = function(t, e) {
        if (t != this._current_bg || (this._during_change_bg && e)) {
          var i = '',
            n = 'yinghua2';
          if (
            ('indoor' == t
              ? (i = this._indoor_img_url)
              : 'scene/Assets/Resource/lobby/beijing_xiaripaidui.jpg' ==
                  (i = this._yard_img_url) && (n = 'effect_xiaribeijing'),
            (this._current_bg = t),
            Laya.loader.getRes(i))
          ) {
            if (n != this._lobby_effet_name) {
              for (
                var a = this.scene.getChildByName('effects'), r = 0;
                r < a.numChildren;
                r++
              )
                a.getChildAt(r).active = false;
              this._lobby_effet_name = n;
            }
            '' == this._current_bg && (e = true),
              e
                ? ((this.bg_front_plane.active = false),
                  (this._during_change_bg = false),
                  (this.scene
                    .getChildByName('effects')
                    .getChildByName(this._lobby_effet_name).active = true))
                : ((this.bg_front_plane.active = true),
                  (this.bg_front_mat.albedoTexture = this.bg_back_mat.albedoTexture),
                  (this.bg_front_mat.albedoColor = new Laya.Vector4(
                    1,
                    1,
                    1,
                    1
                  )),
                  (this._during_change_bg = true),
                  (this._change_start_time = Laya.timer.currTimer)),
              (this.bg_back_mat.albedoTexture = Laya.loader.getRes(i));
          }
        }
      }),
      (i.prototype.set_lobby_bg = function(t) {
        var e = this;
        this._loading_yard_img_url != t &&
          ((this._loading_yard_img_url = t),
          this._yard_img_url != t
            ? Laya.loader.create(
                t,
                Laya.Handler.create(this, function() {
                  if (t == e._loading_yard_img_url) {
                    if (e._yard_img_url != t) {
                      var i = e._yard_img_url;
                      (e._yard_img_url = t),
                        'yard' == e._current_bg && e.change_bg('yard', true),
                        Laya.loader.clearTextureRes(i);
                    }
                    e._loading_yard_img_url = '';
                  } else Laya.loader.clearTextureRes(t);
                })
              )
            : (this._loading_yard_img_url = ''));
      }),
      (i.prototype._update = function() {
        if (this._during_change_bg) {
          var t = Laya.timer.currTimer - this._change_start_time;
          if (t >= 200)
            (this._during_change_bg = false),
              (this.bg_front_plane.active = false),
              (this.scene
                .getChildByName('effects')
                .getChildByName(this._lobby_effet_name).active = true);
          else {
            var e = 1 - t / 200;
            this.bg_front_mat.albedoColor = new Laya.Vector4(1, 1, 1, e);
          }
        }
      }),
      (i.prototype.onProgressUpdate = function(t) {
        for (var e = 0; e < this._progress_listener.length; e++)
          this._progress_listener[e].runWith(t);
      }),
      (i.Inst = null),
      i
    );
  })(t.SceneBase);
  t.Scene_Lobby = e;
})(game || (game = {}));