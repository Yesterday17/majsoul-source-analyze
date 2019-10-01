var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var view;
!(t => {
  t.PAIMODEL_HEIGHT = 0.043225 * 0.94;
  t.PAIMODEL_WIDTH = 0.032775 * 0.94;
  t.PAIMODEL_THICKNESS = 0.0235 * 0.95 * 0.94;
  t.PAI_COUNT = 136;
  var e;
  !(t => {
    t[(t.NULL = 0)] = 'NULL';
    t[(t.AUTH = 1)] = 'AUTH';
    t[(t.SYNCING = 2)] = 'SYNCING';
    t[(t.READY = 3)] = 'READY';
  })(e = t.ELink_State || (t.ELink_State = {}));
  var i;
  !(t => {
    t[(t.Liqi4 = 0)] = 'Liqi4';
    t[(t.Liqi3 = 1)] = 'Liqi3';
  })(i = t.ERuleMode || (t.ERuleMode = {}));
  var n;
  !(t => {
    t[(t.play = 0)] = 'play';
    t[(t.paipu = 1)] = 'paipu';
    t[(t.live_broadcast = 2)] = 'live_broadcast';
  })(n = t.EMJMode || (t.EMJMode = {}));
  var a = (a => {
    class r {
      constructor() {
        var e = a.call(this) || this;
        e.rule_mode = i.Liqi4;
        e.mode = n.play;
        e.active = !1;
        e.game_config = null;
        e.seat = 0;
        e.dora = [];
        e.players = null;
        e.mainrole = null;
        e.num_left_show = new Array();
        e.plane_chang = null;
        e.plane_ju = null;
        e.trans_container_effect = null;
        e.effect_pai_canchi = null;
        e.effect_dora3D = null;
        e.effect_doraPlane = null;
        e.effect_shadow = null;
        e.auto_hule = !1;
        e.auto_nofulu = !1;
        e.auto_moqie = !1;
        e.auto_liqi = !0;
        e.duringReconnect = !1;
        e.gameing = !1;
        e.lastpai_seat = 0;
        e.lastqipai = null;
        e.oplist = [];
        e.liqi_select = [];
        e.operation_showing = !1;
        e.myaccountid = 0;
        e.player_datas = [];
        e.player_effects = [];
        e.mjp_res_name = '';
        e.last_gang = 0;
        e.gameEndResult = null;
        e.levelchangeinfo = null;
        e.activity_reward = null;
        e.rewardinfo = null;
        e.choosed_pai = null;
        e.actionList = [];
        e.action_index = 0;
        e.current_step = 0;
        e.actionMap = null;
        e.tingpais = [];
        e.record_show_hand = !1;
        e.record_show_paopai = !1;
        e.ptchange = 0;
        e.waiting_lingshang_deal_tile = !1;
        e.md5 = '';
        e.paipu_config = 0;
        e.ai_level = 1;
        e.timestoped = !1;
        e.handles_after_timerun = [];
        e.doactioncd = 0;
        e.dochain_fast = !1;
        e.action_running = !1;
        e.hangupCount = 0;
        e.state_cache = {};
        r.Inst = e;
        e.actionMap = {};

        e.actionMap.ActionMJStart = new Laya.Handler(
          e,
          ({msg}) => {
            msg;
            app.Log.log('ActionMJStart begin');
            e.ClearOperationShow();
            GameMgr.Inst.EnterMJ();

            uiscript.UI_FightBegin.show(
              Laya.Handler.create(e, () => {
                uiscript.UI_Loading.Inst.close();
                e.ActionRunComplete();
              })
            );

            return 2e3;
          },
          null,
          !1
        );

        e.actionMap.ActionNewRound = new Laya.Handler(
          e,
          ({msg, fast}) => {
            app.Log.log('ActionNewRound begin');
            var n = msg;
            var a = fast;
            e.ClearOperationShow();
            uiscript.UI_Loading.Inst.close();
            GameMgr.Inst.EnterMJ();
            uiscript.UI_FightBegin.hide();
            t.ActionNewRound.fastplay(n, -1);
            if (
              (a)
            )
              return 0;
            var r = uiscript.UI_FightBegin.hide();

            Laya.timer.once(r + 200, e, () => {
              t.ActionNewRound.play(n);
            });

            n.al && (r += 1300);
            return r + 200 + 1200 + 400;
          },
          null,
          !1
        );

        e.actionMap.ActionDiscardTile = new Laya.Handler(
          e,
          ({msg, fast}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionDiscardTile.fastplay(n, -1);
            t.ActionDiscardTile.play(n);
            Laya.timer.once(500, e, e.ActionRunComplete);
            return fast
              ? (0)
              : (500);
          },
          null,
          !1
        );

        e.actionMap.ActionDealTile = new Laya.Handler(
          e,
          ({msg, fast}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionDealTile.fastplay(n, -1);
            t.ActionDealTile.play(n);
            return fast
              ? (0)
              : (500);
          },
          null,
          !1
        );

        e.actionMap.ActionChiPengGang = new Laya.Handler(
          e,
          ({msg, fast}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionChiPengGang.fastplay(n, -1);
            t.ActionChiPengGang.play(n);
            return fast
              ? (0)
              : (1100);
          },
          null,
          !1
        );

        e.actionMap.ActionAnGangAddGang = new Laya.Handler(
          e,
          ({msg, fast}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionAnGangAddGang.fastplay(n, -1);
            t.ActionAnGangAddGang.play(n);
            return fast
              ? (0)
              : (1100);
          },
          null,
          !1
        );

        e.actionMap.ActionHule = new Laya.Handler(
          e,
          ({msg}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionHule.play(n);
            return 5e3;
          },
          null,
          !1
        );

        e.actionMap.ActionNoTile = new Laya.Handler(
          e,
          ({msg}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionNoTile.play(n);
            return 5e3;
          },
          null,
          !1
        );

        e.actionMap.ActionLiuJu = new Laya.Handler(
          e,
          ({msg}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionLiuJu.play(n);
            return 5e3;
          },
          null,
          !1
        );

        e.actionMap.ActionBaBei = new Laya.Handler(
          e,
          ({msg, fast}) => {
            e.ClearOperationShow();
            var n = msg;
            t.ActionBabei.fastplay(n, -1);
            t.ActionBabei.play(n);
            return fast
              ? (0)
              : (1e3);
          },
          null,
          !1
        );

        app.NetAgent.AddListener2MJ(
          'NotifyGameEndResult',
          Laya.Handler.create(e, ({result}) => {
            e.gameEndResult = result;
          })
        );

        app.NetAgent.AddListener2MJ(
          'ActionPrototype',
          Laya.Handler.create(e, t => {
            app.Log.log(`Receive Action: ${JSON.stringify(t)}`);
            if (
              (e.duringReconnect)
            )
              e.actionList.push(t);
            else if (e.actionList.length > 0) e.actionList.push(t);
            else {
              e.actionList.push(t);
              var i = e.doactioncd - Laya.timer.currTimer;
              i < 0 && (i = 0);
              e.StartChainAction(i);
            }
          })
        );

        app.NetAgent.AddListener2MJ(
          'NotifyGameFinishReward',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyGameFinishReward: ${JSON.stringify(t)}`);
            e.levelchangeinfo = t.level_change;
            e.rewardinfo = t;
          })
        );

        app.NetAgent.AddListener2MJ(
          'NotifyActivityReward',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyActivityReward: ${JSON.stringify(t)}`);
            e.activity_reward = t;
          })
        );

        app.NetAgent.AddListener2MJ(
          'NotifyGameTerminate',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyGameTerminate:${JSON.stringify(t)}`);
            'user-manual-terminate' != t.reason &&
              uiscript.UI_SecondConfirm.Inst.show_only_confirm(
                game.Tools.strOfLocalization(2227),
                Laya.Handler.create(e, () => {
                  e.Reset();
                  game.Scene_MJ.Inst.GameEnd();
                })
              );
          })
        );

        t.ModelAnimationController.init_data();

        app.NetAgent.AddListener2MJ(
          'NotifyGamePause',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyGamePause:${JSON.stringify(t)}`);
            var i = t.paused;
            e.setGameStop(i);
          })
        );

        app.NetAgent.AddListener2MJ(
          'NotifyActivityPoint',
          Laya.Handler.create(e, ({activity_points}) => {
            for (var e = activity_points, i = 0; i < e.length; i++) {
              var n = e[i];
              n.activity_id == uiscript.UI_Activity_DuanWu_Point.activity_id &&
                (uiscript.UI_Activity_DuanWu_Point.point = n.point);
            }
          })
        );

        app.NetAgent.AddListener2MJ(
          'NotifyLeaderboardPoint',
          Laya.Handler.create(e, ({leaderboard_points}) => {
            for (var e = leaderboard_points, i = 0; i < e.length; i++) {
              var n = e[i];
              n.leaderboard_id ==
                uiscript.UI_Activity_DuanWu_Rank.activity_id &&
                (uiscript.UI_Activity_DuanWu_Rank.point = n.point);
            }
          })
        );

        return e;
      }

      get round_id() {
        return `${this.index_change}-${this.index_ju}-${this.index_ben}`;
      }

      get main_role_character_info() {
        return this.player_datas[this.seat].character;
      }

      get player_count() {
        return this.rule_mode == i.Liqi3 ? 3 : 4;
      }

      seat2LocalPosition(t) {
        if (this.rule_mode == i.Liqi3) {
          for (var e = this.seat, n = 0; n < 4; n++) {
            if (t == e) return n;
            ++e >= 3 && (e = -1);
          }
          return 0;
        }
        return (t - this.seat + 4) % 4;
      }

      localPosition2Seat(t) {
        if (this.rule_mode == i.Liqi3) {
          for (var e = this.seat, n = 0; n < t; n++) ++e >= 3 && (e = -1);
          return e;
        }
        return (this.seat + t) % 4;
      }

      getPlayerName(t) {
        return this.player_datas[t].nickname;
      }

      get showingPaopai() {
        return this.mode != n.play;
      }

      is_dora3_mode() {
        return !!(
          this.game_config &&
          this.game_config.mode &&
          this.game_config.mode.detail_rule &&
          this.game_config.mode.detail_rule.dora3_mode
        );
      }

      ActionRunComplete() {
        this.action_running = !1;
      }

      StartChainAction(t) {
        this.doactioncd = Laya.timer.currTimer + t;
        Laya.timer.frameLoop(1, this, this.DoChainAction);
      }

      DoChainAction() {
        var t = this;
        this.action_index = 0;
        this.actionList = [];
        this.dochain_fast = !1;
        Laya.timer.clear(this, this.DoChainAction);
        app.Log.log('finishSyncGame0');

        app.NetAgent.sendReq2MJ(
          'FastTest',
          'finishSyncGame',
          {},
          (t, e) => {}
        );

        if (this.action_index >= this.actionList.length)
          this.duringReconnect &&
            ((this.duringReconnect = !1));
        else {
          if (!this.dochain_fast) {
            if (this.action_running) return;
            if (Laya.timer.currTimer <= this.doactioncd - Laya.timer.delta)
              return;
            Laya.timer.clear(this, this.DoChainAction);
          }
          this.duringReconnect = !1;
          app.Log.log('finishSyncGame1');

          this.action_index == this.actionList.length - 1 &&
            this.duringReconnect &&
            (app.NetAgent.sendReq2MJ('FastTest', 'finishSyncGame', {}, (t, e) => {}));

          this.dochain_fast = !1;
          this.dochain_fast = !1;

          this.action_index + 4 < this.actionList.length &&
            (this.dochain_fast = !0);

          this.dochain_fast
            ? this.action_index + 2 < this.actionList.length
              ? this.DoMJAction(this.actionList[this.action_index++], !0)
              : (this.DoMJAction(this.actionList[this.action_index++], !1))
            : (this.dochain_fast
            ? Laya.timer.once(800, this, () => {
                for (
                  var e = t.actionList.length - 1;
                  e >= t.action_index;
                  e--
                )
                  if ('ActionNewRound' == t.actionList[e].name) {
                    t.action_index = e;
                    break;
                  }
                t.DoMJAction(t.actionList[t.action_index++], !0);
              })
            : this.DoMJAction(this.actionList[this.action_index++], !1));
        }
      }

      DoMJAction(t, e) {
        var i = this;
        if (this.active) {
          var n = net.ProtobufManager.lookupType(`lq.${t.name}`);
          if (!n) throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, lq.${t.name}`);
          var a = t.step;
          var r = n.decode(t.data);

          app.Log.log(
              `DoMJAction step:${a} [${t.name}]:  ${JSON.stringify(r)} fast:${e}`
            );

          app.Log.log(
            `step 不对 强制触发全数据重连 step:${a} current_step:${this.current_step}`
          );

          if (
            (a > 1 && a != this.current_step + 1)
          )
            return void this.trySyncGame();
          var s = 0;
          this.current_step = a;
          if ((this.actionMap.hasOwnProperty(t.name)))
            try {
              e || (this.action_running = !0);
              s = this.actionMap[t.name].runWith({ msg: r, fast: e });
            } catch (e) {
              var o = {};
              o.error = e.message;
              o.stack = e.stack;
              o.method = 'DoMJAction';
              o.name = t.name;
              o.data = t;
              o.step = a;
              return void GameMgr.Inst.onFatalError(o);
            }
          else app.Log.Error(`没有监听操作：${t.name}`);
          e
            ? this.DoChainAction()
            : Laya.timer.frameOnce(1, this, () => {
                i.StartChainAction(s);
              });
        }
      }

      _load(e) {
        this.desktop3D = e;
        this.desktop3D.getChildByName('all').active = !1;
        var i = this.desktop3D.getChildByName('poss');
        this.players = new Array();

        this.mainrole = i
            .getChildByName('man_1')
            .addComponent(t.ViewPlayer_Me);

        this.mainrole.Init(
          this,
          0,
          game.Scene_MJ.Inst.root2.getChildByName('hands'),
          i.getChildByName('ming_1').getChildAt(0),
          i.getChildByName('hai_1').getChildAt(0),
          i.getChildByName('man_1'),
          i.getChildByName('babei_1').getChildAt(0)
        );

        this.mainrole.trans_hand3D = i.getChildByName('pai_1');
        this.mainrole.trans_hand3D.getChildAt(0).active = !1;
        this.mainrole.trans_hand3D.active = !1;
        this.mainrole.trans_hand3DCover = i.getChildByName('pai_1_cover');
        this.mainrole.trans_hand3DCover.getChildAt(0).active = !1;
        this.mainrole.trans_hand3DCover.active = !1;
        this.players.push(this.mainrole);
        for (var n = 2; n <= 4; n++) {
          var a = i.getChildByName(`man_${n}`).addComponent(t.ViewPlayer_Other);

          a.Init(
            this,
            n - 1,
            i.getChildByName(`pai_${n}`).getChildAt(0),
            i.getChildByName(`ming_${n}`).getChildAt(0),
            i.getChildByName(`hai_${n}`).getChildAt(0),
            i.getChildByName(`man_${n}`),
            i.getChildByName(`babei_${n}`).getChildAt(0)
          );

          this.players.push(a);
        }
        var r = this.desktop3D.getChildByName('other');
        var s = r.getChildByName('left');
        this.num_left_show.push(s.getChildByName('0'));
        this.num_left_show.push(s.getChildByName('1'));
        this.SetLeftPaiShow(0);
        var o = r.getChildByName('chang');
        this.plane_chang = o.getChildByName('chang');
        this.plane_ju = o.getChildByName('ju');
        this.SetChangJuShow(0, 0);

        this.trans_container_effect = this.desktop3D.getChildByName(
            'effect'
          );

        this.effect_pai_canchi = this.trans_container_effect.getChildByName(
            'effect_pai_canchi'
          );

        this.effect_dora3D = this.trans_container_effect.getChildByName(
            'effect_dora'
          );

        this.effect_shadow = this.trans_container_effect.getChildByName(
            'effect_shadow'
          );

        this.effect_pai_canchi.active = !0;
        this.effect_dora3D.active = !0;
        this.effect_shadow.active = !0;

        this.effect_doraPlane = game.Scene_MJ.Inst.root2
            .getChildByName('hands')
            .getChildByName('effect_dora');

        this.effect_doraPlane.active = !1;
      }

      initRoom(e, a, s, o, l) {
        var h = this;
        uiscript.UI_WaitingRoom.Inst.resetData();
        this.game_config = e;
        this.rule_mode = i.Liqi4;

        e.mode.mode &&
          (e.mode.mode < 10
            ? (this.rule_mode = i.Liqi4)
            : (this.rule_mode = i.Liqi3));

        this.mode = o;
        this.seat = -1;
        this.player_datas = a;
        this.gameEndResult = null;
        this.levelchangeinfo = null;
        this.activity_reward = null;
        this.rewardinfo = null;
        this.active = !0;
        this.ptchange = 0;
        this.paipu_config = 0;
        this.timestoped = !1;
        this.action_running = !1;
        this.hangupCount = 0;
        this.handles_after_timerun = [];
        uiscript.UI_GameStop.Inst.close();

        this.mode == n.paipu
          ? (this.record_show_hand = this.record_show_paopai = !0)
          : (this.record_show_hand = this.record_show_paopai = !1);

        uiscript.UI_Invite.Inst.enable = !1;

        this.mode == n.play
          ? (4 == e.category &&
          (GameMgr.Inst.custom_match_id = e.meta.contest_uid))
          : (uiscript.UI_Invite.Inst.enable = !0);

        this.myaccountid = s;
        for (var c = {}, u = 0; u < a.length; u++)
          for (
            var _ = cfg.item_definition.skin.get(a[u].avatar_id),
              d = cfg.item_definition.character.get(_.character_id),
              f = cfg.voice.sound.getGroup(d.sound),
              p = 0;
            p < f.length;
            p++
          )
            if (
              a[u].character &&
              2 == f[p].category &&
              f[p].level_limit <= a[u].character.level
            ) {
              var m = f[p].path + t.AudioMgr.suffix;
              c.hasOwnProperty(m) || (c[m] = 1);
            }
        for (var g in c) Laya.loader.load(g, null, null, null, 3);
        for (u = 0; u < this.player_datas.length; u++)
          this.player_datas[u].account_id == s && (this.seat = u);
        if (-1 == this.seat) {
          uiscript.UIMgr.Inst.ShowErrorInfo(
            game.Tools.strOfLocalization(2228)
          );

          if (this.mode == n.play)
            return void app.Log.Error(JSON.stringify(a));
          this.seat = 0;
        }
        uiscript.UI_Replay.Inst.enable = this.mode == n.paipu;
        r.bianjietishi = !0;
        if (
          (o == n.play)
        ) {
          if (e.mode && e.mode.detail_rule) {
            var y = e.mode.detail_rule;
            null != y.bianjietishi && (r.bianjietishi = y.bianjietishi);
          }
          if (2 == e.category && e.meta) {
            var v = cfg.desktop.matchmode.get(e.meta.mode_id);
            v && 6 == v.room && (r.bianjietishi = !1);
          }
          uiscript.UI_MJTask_Progress.record();
        }

        this.mjp_res_name = game.GameUtility.get_common_view_res_name(
          game.ECommonView.mjp
        );

        this.player_effects = [];
        for (u = 0; u < this.player_datas.length; u++) {
          var b = this.player_datas[u].character;

          this.player_datas[u].character = {
            charid: 200001,
            level: 0,
            exp: 0,
            views: [],
            skin: 400101,
            is_upgraded: !1
          };

          if (b) {
            var w = b.views;
            var x = 'scene/effect_hupai_default.lh';
            var I = '';
            var C = 'scene/liqi_default.lh';
            var S = 'hand_human';
            var M = '';
            var T = 'scene/effect_mingpai_default.lh';
            var L = cfg.item_definition.character.get(b.charid);
            L && (S = L.hand);
            if ((w))
              for (p = 0; p < w.length; p++) {
                var E = w[p].slot;
                var D = w[p].item_id;
                if (E == game.EPlayerView.liqi_bgm) {
                  var N = cfg.item_definition.item.get(D);
                  N && (M = N.sargs[0]);
                } else {
                  var A = cfg.item_definition.view.get(D);
                  A &&
                    (E == game.EPlayerView.hupai_effect
                      ? (x = `scene/${A.res_name}.lh`)
                      : E == game.EPlayerView.liqi_effect
                      ? (I = `scene/${A.res_name}.lh`)
                      : E == game.EPlayerView.liqibang
                      ? (C = `scene/${A.res_name}.lh`)
                      : E == game.EPlayerView.hand_model
                      ? (S = A.res_name)
                      : E == game.EPlayerView.mingpai_effect &&
                        (T = `scene/${A.res_name}.lh`));
                }
              }
            this.player_effects.push({
              effect_hupai: x,
              effect_liqi: I,
              liqibang: C,
              hand: S,
              liqi_bgm: M,
              effect_ming: T
            });
          } else
            this.player_effects.push({
              effect_hupai: 'scene/effect_hupai_default.lh',
              effect_liqi: '',
              liqibang: 'scene/liqi_default.lh',
              hand: 'hand_human',
              liqi_bgm: '',
              effect_ming: 'scene/effect_mingpai_default.lh'
            });
        }
        uiscript.UI_DesktopInfo.Inst.initRoom();
        uiscript.UI_DesktopInfo.Inst.refreshSeat();
        uiscript.UI_Hangup_Warn.Inst.enable = !1;
        uiscript.UI_TingPai.Inst.enable = !0;
        this.index_change = 0;
        this.index_ju = 0;
        this.index_ben = 0;
        this.index_player = 0;
        this.gameing = !0;
        this.left_tile_count = 69;
        this.duringReconnect = !1;
        this.current_step = 0;
        this.action_index = 0;
        this.dochain_fast = !1;
        this.actionList = [];
        this.setAutoHule(!1);
        this.setAutoMoQie(!1);
        this.setAutoNoFulu(!1);
        uiscript.UI_DesktopInfo.Inst.resetFunc();
        this.SetChangJuShow(this.index_change, this.index_ju);
        uiscript.UI_DesktopInfo.Inst.setBen(this.index_ben);
        uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
        this.players[u].onInitRoom(this.localPosition2Seat(u));
        this.players[u].SetScore(0, 0);
        this.players[u].trans_ind.active = !1;
        for (u = 0; u < 4; u++)
          this.players[u].RefreshDir();
        this.RefreshPaiLeft();
        uiscript.UI_GameEnd.Inst.forceclose();
        uiscript.UI_RankChange.Inst.close();
        uiscript.UI_MJReward.Inst.close();

        Laya.timer.frameOnce(6, this, () => {
          h.Reset();

          app.Log.log(
            `场景init结束：${Laya.Stat.currentMemorySize / 1024 / 1024} MB`
          );

          l && l.run();
        });

        this.state_cache = {};

        this.state_cache.duanwu_point =
            uiscript.UI_Activity_DuanWu_Point.point;

        uiscript.UI_Activity.activity_is_running(
          uiscript.UI_Activity_DuanWu_Point.activity_id
        ) &&
          ((this.state_cache.duanwu_rank = uiscript.UI_Activity_DuanWu_Rank.point));
      }

      changeMainbody(t) {
        if (this.mode != n.play) {
          this.seat = t;
          uiscript.UI_DesktopInfo.Inst.refreshSeat(!0);
          this.players[e].onInitRoom(this.localPosition2Seat(e));
          this.players[e].trans_ind.active = !1;
          for (var e = 0; e < 4; e++)
            this.players[e].RefreshDir();
          this.Reset();
          this.mode == n.paipu && uiscript.UI_Replay.Inst.onChangeMainBody();
          this.mode == n.live_broadcast &&
            uiscript.UI_Live_Broadcast.Inst.onChangeMainbody();
        }
      }

      trySyncGame() {
        var t = this;
        this.Reset();
        this.duringReconnect = !0;
        this.hangupCount = 0;
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'syncGame',
          { round_id: this.round_id, step: 0 },
          (e, i) => {
            uiscript.UIMgr.Inst.showNetReqError('syncGame', e, i);
            app.Log.log(`[syncGame2] ${JSON.stringify(i)}`);

            uiscript.UIMgr.Inst.ShowErrorInfo(
                  game.Tools.strOfLocalization(2229)
                );

            t.fetchLinks();
            t.Reset();
            t.duringReconnect = !0;
            e || i.error
              ? (game.Scene_MJ.Inst.ForceOut())
              : (i.isEnd
              ? (game.Scene_MJ.Inst.GameEnd())
              : (t.syncGameByStep(i.game_restore)));
          }
        );
      }

      syncGameByStep(e) {
        var i = this;
        var n = !1;
        this.timestoped = !1;
        this.handles_after_timerun = [];
        this.action_running = !1;
        uiscript.UI_GameStop.Inst.close();
        this.hangupCount = 0;
        uiscript.UI_Hangup_Warn.Inst.enable = !1;
        e && 5 === e.game_state && (this.timestoped = !0);
        GameMgr.Inst.EnterMJ();
        this.duringReconnect = !1;
        if (
          (e && e.actions && e.actions.length > 0)
        ) {
          this.actionList = [];
          var a = -1;
          null != e.passed_waiting_time &&
            void 0 != e.passed_waiting_time &&
            (a = 1e3 * e.passed_waiting_time);
          for (var s = 0; s < e.actions.length; s++) {
            var o = e.actions[s];
            var l = s == e.actions.length - 1 ? a : -1;
            var h = net.ProtobufManager.lookupType(`lq.${o.name}`);
            if (!h)
              throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, lq.${o.name}`);
            var c = h.decode(o.data);
            this.current_step = o.step;
            try {
              t.ActionHule.fastplay(c, l);
              t.ActionLiuJu.fastplay(c, l);
              t.ActionNoTile.fastplay(c, l);
              switch (o.name) {
                case 'ActionNewRound':
                  t.ActionNewRound.fastplay(c, l);
                  break;
                case 'ActionDiscardTile':
                  t.ActionDiscardTile.fastplay(c, l);
                  break;
                case 'ActionDealTile':
                  t.ActionDealTile.fastplay(c, l);
                  break;
                case 'ActionChiPengGang':
                  t.ActionChiPengGang.fastplay(c, l);
                  break;
                case 'ActionAnGangAddGang':
                  t.ActionAnGangAddGang.fastplay(c, l);
                  break;
                case 'ActionHule':
                  n = !0;
                  break;
                case 'ActionLiuJu':
                  n = !0;
                  break;
                case 'ActionNoTile':
                  n = !0;
                  break;
                case 'ActionBaBei':
                  t.ActionBabei.fastplay(c, l);
              }
            } catch (t) {
              var u = {};
              u.error = t.message;
              u.stack = t.stack;
              u.method = 'syncGameByStep';
              u.name = o.name;
              u.data = o;
              u.step = s;
              GameMgr.Inst.onFatalError(u);
              break;
            }
          }
          Laya.timer.once(1e3, this, () => {
            i.duringReconnect = !1;
            uiscript.UI_Loading.Inst.close();
            n || t.BgmListMgr.PlayMJBgm();
            i.DoChainAction();
          });
        } else
          this.timestoped
            ? this.handles_after_timerun.push(
                Laya.Handler.create(this, () => {
                  app.NetAgent.sendReq2MJ(
                    'FastTest',
                    'confirmNewRound',
                    {},
                    (t, e) => {}
                  );
                })
              )
            : app.NetAgent.sendReq2MJ(
                'FastTest',
                'confirmNewRound',
                {},
                (t, e) => {}
              );
        app.Log.log('finishSyncGame11');

        app.NetAgent.sendReq2MJ('FastTest', 'finishSyncGame', {}, (t, e) => {});

        r.Inst.fetchLinks();
        this.timestoped && uiscript.UI_GameStop.Inst.show();
      }

      setGameStop(t) {
        this.timestoped = t;
        this.handles_after_timerun = [];
        if (t != this.timestoped)
          if ((this.timestoped))
            uiscript.UI_GameStop.Inst.show();
          else {
            uiscript.UI_GameStop.Inst.close();
            if ((this.handles_after_timerun))
              for (var e = 0; e < this.handles_after_timerun.length; e++)
                this.handles_after_timerun[e].run();
            this.handles_after_timerun = [];
            this.hangupCount = 0;
          }
      }

      CreatePai3D(t) {
        var e = this.desktop3D
            .getChildByName('all')
            .getChildByName('maque')
            .clone();

        var i = this.desktop3D
          .getChildByName('all')
          .getChildByName('maque_outline')
          .clone();

        var n = e;
        var a = new caps.BaseMaterial(caps.Cartoon.filename);
        var r = 'scene/Assets/Resource/mjpai/';
        'en' == GameMgr.client_language && (r += 'en/');
        r += `${this.mjp_res_name}/${t.toString()}.png`;
        a.setTexture(caps.Cartoon.TEXTURE, Laya.loader.getRes(r));
        a.setNumber(caps.Cartoon.SPLIT, 0.4);
        a.setColor(caps.Cartoon.COLOR_LIGHT, new Laya.Vector3(1, 1, 1));

        a.setColor(
          caps.Cartoon.COLOR_UNLIGHT,
          new Laya.Vector3(0.788, 0.788, 0.8235)
        );

        a.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1));
        n.meshRender.sharedMaterial = a;
        var s = i;
        e.addChild(s);
        s.transform.localPosition = new Laya.Vector3(0, 0, 0);
        s.transform.localScale = new Laya.Vector3(1, 1, 1);
        s.transform.localRotation = new Laya.Quaternion(0, 0, 0, 0);
        var o = s;
        var l = new caps.Material_Outline(caps.Outline.filename);

        l.setColor(
          caps.Outline.OUTLINE_COLOR,
          new Laya.Vector3(0.165, 0.192, 0.204)
        );

        l.setNumber(caps.Outline.OUTLINE_ALPHA, 0.6);
        l.setNumber(caps.Outline.OUTLINE, 0.0012);
        o.meshRender.sharedMaterial = l;
        return e;
      }

      RefreshPlayerIndicator() {
        this.players[t].trans_ind.active =
          t == this.seat2LocalPosition(this.index_player);

        for (var t = 0; t < 4; t++)
          this.players[t].RefreshScore(this.mainrole.score);
      }

      setAutoHule(t) {
        this.auto_hule = t;
        this._PendingAuto();
      }

      setAutoNoFulu(t) {
        this.auto_nofulu = t;
        this._PendingAuto();
      }

      setAutoMoQie(t) {
        this.auto_moqie = t;
        this._PendingAuto();
      }

      setAutoLiPai(t) {
        this.auto_liqi = t;
        t && this.gameing && this.mainrole && this.mainrole.LiPai();
      }

      setScoreDelta(t) {
        this.players[e].duringShowDetla = t;
        for (var e = 1; e < 4; e++)
          this.players[e].RefreshScore(this.mainrole.score);
      }

      SetChangJuShow(t, e) {
        var i = new Laya.Vector4(0.2, 1, (t % 4) * 0.2, 0);

        'en' == GameMgr.client_language &&
          (i = new Laya.Vector4(1, 0.25, 0, 0.25 * ((t % 4) - 3)));

        this.plane_chang.meshRender.material.tilingOffset = i;
        var n = new Laya.Vector4(0.25, 1, 0.25 * e, 0);
        this.plane_ju.meshRender.material.tilingOffset = n;
      }

      SetLeftPaiShow(t) {
        t >= 100 ? (t = 99) : t < 0 && (t = 0);
        for (var e = [t % 10, Math.floor(t / 10)], i = 0; i < e.length; i++) {
          var n = new Laya.Vector4(0.1, 1, 0.1 * e[i], 0);
          this.num_left_show[i].meshRender.material.tilingOffset = n;
        }
      }

      RefreshPaiLeft() {
        this.SetLeftPaiShow(this.left_tile_count);
      }

      Reset() {
        app.Log.log('DesktopMgr.Reset');
        this.operation_showing = !1;
        this.oplist = [];
        Laya.timer.clearAll(t.ActionAnGangAddGang);
        Laya.timer.clearAll(t.ActionChiPengGang);
        Laya.timer.clearAll(t.ActionDealTile);
        Laya.timer.clearAll(t.ActionDiscardTile);
        Laya.timer.clearAll(t.ActionHule);
        Laya.timer.clearAll(t.ActionLiqi);
        Laya.timer.clearAll(t.ActionLiuJu);
        Laya.timer.clearAll(t.ActionNewRound);
        Laya.timer.clearAll(t.ActionNoTile);
        Laya.timer.clearAll(t.ActionOperation);
        Laya.timer.clearAll(this);
        uiscript.UI_DesktopInfo.Inst.reset_rounds();
        uiscript.UI_Replay.Inst.reset();
        this.effect_pai_canchi.active = !1;
        for (var e = 0; e < 4; e++) this.players[e].Reset();
        this.tingpais = [[], [], [], []];
        this.md5 = '';
        this.current_step = -1;
      }

      setScores(e) {
        for (var i = 0; i < e.length; i++)
          this.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].SetScore(
            e[i],
            e[this.seat]
          );
      }

      _PendingAuto() {
        if (null == this.oplist || 0 == this.oplist.length) return !1;
        app.Log.log('_PendingAuto');
        try {
          var t = !1;
          var e = !1;
          var i = !1;
          var n = !1;
          var a = !1;
          var r = this.operation_showing;
          this.operation_showing = !0;
          var s = null;
          this.liqi_select = [];
          for (_ = 0; _ < this.oplist.length; _++) {
            switch (this.oplist[_].type) {
              case mjcore.E_PlayOperation.eat:
              case mjcore.E_PlayOperation.peng:
              case mjcore.E_PlayOperation.ming_gang:
              case mjcore.E_PlayOperation.rong:
                t = !0;
                break;
              case mjcore.E_PlayOperation.an_gang:
              case mjcore.E_PlayOperation.add_gang:
              case mjcore.E_PlayOperation.liqi:
              case mjcore.E_PlayOperation.zimo:
              case mjcore.E_PlayOperation.babei:
                e = !0;
              case mjcore.E_PlayOperation.jiuzhongjiupai:
                e = !0;
            }
            a = !0;

            this.oplist[_].type == mjcore.E_PlayOperation.dapai &&
                ((s = this.oplist[_].combination));

            if (
              (this.oplist[_].type == mjcore.E_PlayOperation.liqi)
            ) {
              a = !0;
              this.liqi_select = [];
              for (var o = 0; o < this.oplist[_].combination.length; o++)
                this.liqi_select.push(
                  mjcore.MJPai.Create(this.oplist[_].combination[o])
                );
            }
            this.oplist[_].type == mjcore.E_PlayOperation.rong && (i = !0);
            this.oplist[_].type == mjcore.E_PlayOperation.zimo && (n = !0);
          }
          var l = this.auto_hule;
          var h = this.auto_nofulu;
          var c = this.auto_moqie;
          h = !0;
          this.hangupCount >= 5 && ((c = !0));

          Laya.timer.once(800, this, () => {
            i
              ? app.NetAgent.sendReq2MJ(
                  'FastTest',
                  'inputChiPengGang',
                  { type: mjcore.E_PlayOperation.rong, index: 0 },
                  (t, e) => {}
                )
              : n &&
                app.NetAgent.sendReq2MJ(
                  'FastTest',
                  'inputOperation',
                  { type: mjcore.E_PlayOperation.zimo, index: 0 },
                  (t, e) => {}
                );
          });

          this.ClearOperationShow();
          if ((l && (i || n)))
            return !1;
          e && (r || uiscript.UIMgr.Inst.ShowLiqiZimo(this.oplist));
          if (t) {
            app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputChiPengGang',
              { cancel_operation: !0 },
              (t, e) => {}
            );

            this.ClearOperationShow();
            if (h && !i && !n)
              return !1;
            r || uiscript.UIMgr.Inst.ShowChipenghu(this.oplist);
          } else if (
            (a)
          ) {
            this.Action_QiPai(this.mainrole.last_tile.val, !0, !0);
            if (
              c &&
              !uiscript.UI_LiQiZiMo.Inst.enable &&
              null != this.mainrole.last_tile
            )
              return !1;
            this.mainrole.can_discard = !0;
            if (!r && ((s && s.length > 0))) {
              for (var u = [], _ = 0; _ < s.length; _++)
                u.push(mjcore.MJPai.Create(s[_]));
              this.mainrole.ChiTiSelect(u);
            }
          } else this.mainrole.can_discard = !1;
        } catch (t) {
          var d = {};
          d.error = t.message;
          d.stack = t.stack;
          d.method = '_PendingAuto';
          d.name = 'DesktopMgr';
          GameMgr.Inst.onFatalError(d);
        }
        return !0;
      }

      OperationTimeOut() {
        if (null != this.oplist && 0 != this.oplist.length) {
          var t = !1;
          var e = !1;
          var i = !1;
          var n = !1;
          var a = !1;
          this.operation_showing;
          this.operation_showing = !0;
          this.hangupCount++;
          this.hangupCount >= 5 &&
            !uiscript.UI_Hangup_Warn.Inst.enable &&
            uiscript.UI_Hangup_Warn.Inst.show();
          for (o = 0; o < this.oplist.length; o++) {
            switch (this.oplist[o].type) {
              case mjcore.E_PlayOperation.eat:
              case mjcore.E_PlayOperation.peng:
              case mjcore.E_PlayOperation.ming_gang:
              case mjcore.E_PlayOperation.rong:
                t = !0;
                break;
              case mjcore.E_PlayOperation.an_gang:
              case mjcore.E_PlayOperation.add_gang:
              case mjcore.E_PlayOperation.liqi:
              case mjcore.E_PlayOperation.zimo:
              case mjcore.E_PlayOperation.babei:
                e = !0;
            }
            a = !0;

            (this.oplist[o].type != mjcore.E_PlayOperation.dapai &&
              this.oplist[o].type != mjcore.E_PlayOperation.liqi) ||
              (this.oplist[o].type == mjcore.E_PlayOperation.dapai &&
              this.oplist[o].combination);

            this.oplist[o].type == mjcore.E_PlayOperation.rong && (i = !0);
            this.oplist[o].type == mjcore.E_PlayOperation.zimo && (n = !0);
          }

          i
            ? app.NetAgent.sendReq2MJ(
                'FastTest',
                'inputChiPengGang',
                { type: mjcore.E_PlayOperation.rong, index: 0, timeuse: 1e6 },
                (t, e) => {}
              )
            : app.NetAgent.sendReq2MJ(
                'FastTest',
                'inputChiPengGang',
                { cancel_operation: !0, timeuse: 1e6 },
                (t, e) => {}
              );

          n
              ? app.NetAgent.sendReq2MJ(
                  'FastTest',
                  'inputOperation',
                  {
                    type: mjcore.E_PlayOperation.zimo,
                    index: 0,
                    timeuse: 1e6
                  },
                  (t, e) => {}
                )
              : app.NetAgent.sendReq2MJ(
                  'FastTest',
                  'inputOperation',
                  { cancel_operation: !0, timeuse: 1e6 },
                  (t, e) => {}
                );

          if (t)
            this.ClearOperationShow();
          else if (a)
            if (this.mainrole.during_liqi) {
              r = this.mainrole.hand[o].val;
              for (
                var r = null, s = !1, o = 0;
                o < this.mainrole.hand.length;
                o++
              )
                this.mainrole.hand[o].valid &&
                  ((s = this.mainrole.hand[o] === this.mainrole.last_tile));
              this.Action_LiQi(r, s);
            } else {
              var l = null;
              var s = !1;
              l = this.mainrole.last_tile.val;

              null == l &&
                  this.mainrole.last_tile &&
                  this.mainrole.last_tile.valid &&
                  ((s = !0));

              if (
                (null == l)
              )
                for (o = this.mainrole.hand.length - 1; o >= 0; o--)
                  if (this.mainrole.hand[o].valid) {
                    l = this.mainrole.hand[o].val;
                    s = !1;
                    break;
                  }
              this.Action_QiPai(l, s, !0);
            }
          else
            e &&
              (this.ClearOperationShow());
        }
      }

      WhenDoOperation() {
        this.hangupCount = 0;

        uiscript.UI_Hangup_Warn.Inst.enable &&
          (uiscript.UI_Hangup_Warn.Inst.enable = !1);

        this.ClearOperationShow();
      }

      ClearOperationShow() {
        this.operation_showing = !1;
        this.oplist = [];
        uiscript.UIMgr.Inst.CloseLiuJu();
        uiscript.UIMgr.Inst.CloseWin();
        uiscript.UIMgr.Inst.CloseChipenghu();
        uiscript.UIMgr.Inst.CloseLiqiZimo();
        Laya.timer.clearAll(t.ActionOperation);
        uiscript.UI_ScoreChange.Inst.enable = !1;
        this.mainrole.can_discard = !1;
        uiscript.UI_DesktopInfo.Inst.closeCountDown();
      }

      WhenLiqiInfo(t) {
        var e = this;
        t &&
          Laya.timer.once(300, this, () => {
            var i = t.seat;
            var n = t.score;
            e.players[e.seat2LocalPosition(i)].ShowLiqi();
            e.players[e.seat2LocalPosition(i)].SetScore(n, e.mainrole.score);
            uiscript.UI_DesktopInfo.Inst.setLiqibang(t.liqibang);
          });
      }

      WhenDoras(e, i) {
        var n = this;
        if (
          !(
            null == e ||
            void 0 == e ||
            0 == e.length ||
            e.length <= this.dora.length
          ) &&
          e
        ) {
          this.dora.length > a
            ? (this.dora[a] = mjcore.MJPai.Create(e[a]))
            : this.dora.push(mjcore.MJPai.Create(e[a]));

          for (var a = 0; a < e.length; a++)
            uiscript.UI_DesktopInfo.Inst.setDora(a, this.dora[a]);

          Laya.timer.frameOnce(1, this, () => {
            for (var t = 0; t < 4; t++) n.players[t].OnDoraRefresh();
          });

          i || t.AudioMgr.PlayAudio(215);
        }
      }

      Action_QiPai(t, e, i) {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            type: mjcore.E_PlayOperation.dapai,
            tile: t.toString(),
            moqie: e,
            timeuse: uiscript.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {
            t
              ? app.Log.Error('Action_QiPai 失败')
              : app.Log.info('Action_QiPai 成功');
          }
        );

        i ? this.ClearOperationShow() : this.WhenDoOperation();
      }

      Action_LiQi(t, e) {
        if (!this.liqi_select || 0 == this.liqi_select.length) return !1;
        for (var i = !1, n = 0; n < this.liqi_select.length; n++)
          if (0 == mjcore.MJPai.Distance(this.liqi_select[n], t)) {
            i = !0;
            break;
          }

        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            type: mjcore.E_PlayOperation.liqi,
            tile: t.toString(),
            moqie: e,
            timeuse: uiscript.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {
            t
              ? app.Log.Error('Action_LiQi 失败')
              : app.Log.info('Action_LiQi 成功');
          }
        );

        this.WhenDoOperation();
        return !!i &&
        (!0);
      }

      SetLastQiPai(t, e) {
        this.lastqipai = e;
        this.lastpai_seat = t;
        this.effect_pai_canchi.active = !1;
      }

      ShowHuleEffect(e, i, n) {
        var a = this;
        if (null != e) {
          i.y = 0;
          var r = game.EffectMgr.create_d3_effect(n);
          this.trans_container_effect.addChild(r.root);
          r.root.transform.position = i;
          r.root.active = !0;
          var s = 213;
          switch (n) {
            case 'scene/effect_hupai_default.lh':
              s = 213;
              break;
            case 'scene/effect_hupai_fire.lh':
              s = 230;
              break;
            case 'scene/effect_hupai_feng.lh':
              s = 231;
              break;
            case 'scene/effect_hupai_sakura.lh':
              s = 232;
              break;
            case 'scene/effect_hupai_ice.lh':
              s = 233;
              break;
            case 'scene/effect_hupai_juguang.lh':
              s = 234;
              break;
            case 'scene/effect_hupai_heihuo.lh':
              s = 237;
              break;
            case 'scene/effect_hupai_yanhua.lh':
              s = 238;
              break;
            case 'scene/ron_huolongjuan.lh':
              s = 305034;
              break;
            case 'scene/ron_keji.lh':
              s = 305035;
              break;
            case 'scene/ron_meiguihua.lh':
              s = 305036;
              break;
            case 'scene/ron_ko.lh':
              s = 305039;
              break;
            case 'scene/ron_nilin.lh':
              s = 305040;
          }
          t.AudioMgr.PlayAudio(s);
          'scene/effect_hupai_yanhua.lh' == n &&
            Laya.timer.once(600, this, () => {
              var t = game.EffectMgr.create_d3_effect(
                'scene/effect_hupai_yanhua_bang.lh'
              ).root;
              a.desktop3D.addChild(t);
              t.transform.position = new Laya.Vector3(0, 0, 0);
              t.active = !0;
              Laya.timer.once(2e3, a, () => {
                t.destroy(!0);
              });
            });
          var o = !1;
          var l = e.model.parent;
          var h = e.model.transform.rotation.clone();
          var c = e.model.transform.worldMatrix.clone();

          r.addLoadedListener(
            Laya.Handler.create(this, () => {
              if (!o) {
                var t = game.Tools.GetNodeByNameInChildren(r.root, 'pai_anim');
                t.addChild(e.model);
                e.model.transform.rotation = h.clone();
                e.model.transform.worldMatrix = c.clone();
                t &&
                  (Laya.timer.once(1800, a, () => {
                  if (!o) {
                    var t = e.model.transform.rotation.clone();
                    var i = e.model.transform.worldMatrix.clone();
                    l.addChild(e.model);
                    e.model.transform.rotation = t.clone();
                    e.model.transform.worldMatrix = i.clone();
                  }
                }));
              }
            })
          );

          Laya.timer.once(2e3, this, () => {
            o = !0;
            var t = e.model.transform.rotation.clone();
            var i = e.model.transform.worldMatrix.clone();
            l.addChild(e.model);
            e.model.transform.rotation = t.clone();
            e.model.transform.worldMatrix = i.clone();
            r.destory();
          });
        }
      }

      ShowChiPengEffect() {
        this.lastqipai.model.parent.addChild(this.effect_pai_canchi);
        this.effect_pai_canchi.transform.localPosition = this.lastqipai.model.transform.localPosition.clone();
        this.effect_pai_canchi.transform.localRotation = this.lastqipai.model.transform.localRotation.clone();
        this.lastqipai.model &&
          this.lastqipai.model.transform &&
          ((this.effect_pai_canchi.active = !0));
      }

      CloseChiPngEffect() {
        this.effect_pai_canchi.active = !1;
        this.effect_pai_canchi &&
          ((this.trans_container_effect && this.trans_container_effect.addChild(this.effect_pai_canchi)));
      }

      setChoosedPai(t) {
        var e = !1;
        e || !t || this.choosed_pai || (e = !0);
        e || t || !this.choosed_pai || (e = !0);

        !e &&
          t &&
          this.choosed_pai &&
          0 != mjcore.MJPai.Distance(this.choosed_pai, t) &&
          (e = !0);

        this.choosed_pai = t ? t.Clone() : null;
        if (
          (e && (r.bianjietishi))
        ) {
          for (var i = 0; i < 4; i++) this.players[i].OnChoosePai();
          uiscript.UI_TingPai.Inst.onChooseTile(t);
        }
      }

      setTingpai(e, i) {
        for (var n = !1, a = [], r = 0; r < i.length; r++)
          a.push(mjcore.MJPai.Create(i[r].tile));
        this.tingpais[e].length != a.length && (n = !0);
        for (r = 0; r < a.length && !n; r++)
          0 != mjcore.MJPai.Distance(a[r], this.tingpais[e][r]) && (n = !0);
        if (n) {
          this.tingpais[e] = a;
          for (r = 0; r < t.DesktopMgr.Inst.players.length; r++) {
            if (!(this.localPosition2Seat(r) < 0)) {
              for (
                o = 0;
                o < t.DesktopMgr.Inst.players[r].container_qipai.pais.length;
                o++
              ) {
                (l =
                  t.DesktopMgr.Inst.players[r].container_qipai.pais[
                    o
                  ]).ispaopai = this.isPaoPai(l.val);

                l.OnChoosedPai();
              }
              for (
                o = 0;
                o < t.DesktopMgr.Inst.players[r].container_ming.pais.length;
                o++
              ) {
                (l =
                  t.DesktopMgr.Inst.players[r].container_ming.pais[
                    o
                  ]).ispaopai = this.isPaoPai(l.val);

                l.OnChoosedPai();
              }
              for (
                o = 0;
                o < t.DesktopMgr.Inst.players[r].container_babei.pais.length;
                o++
              ) {
                (l =
                  t.DesktopMgr.Inst.players[r].container_babei.pais[
                    o
                  ]).ispaopai = this.isPaoPai(l.val);

                l.OnChoosedPai();
              }
              l.ispaopai = this.isPaoPai(l.val);

              (l = t.DesktopMgr.Inst.players[r].container_qipai.last_pai) &&
                  (l.OnChoosedPai());

              if (
                (0 == r)
              )
                for (
                  var s = t.DesktopMgr.Inst.players[r], o = 0;
                  o < s.hand.length;
                  o++
                ) {
                  (l = s.hand[o]).ispaopai = this.isPaoPai(l.val);
                  l.RefreshPaoPai();
                }
              else
                for (
                  var s = t.DesktopMgr.Inst.players[r], o = 0;
                  o < s.hand.length;
                  o++
                ) {
                  var l = s.hand[o].pai3D;

                  this.record_show_hand
                    ? (l.ispaopai = this.isPaoPai(l.val))
                    : (l.ispaopai = !1);

                  l.OnChoosedPai();
                }
            }
          }
        }
      }

      isPaoPai(t) {
        if (!this.record_show_paopai) return !1;
        for (var e = 0; e < this.tingpais.length; e++)
          for (var i = 0; i < this.tingpais[e].length; i++)
            if (0 == mjcore.MJPai.Distance(this.tingpais[e][i], t)) return !0;
        return !1;
      }

      getPaiLeft(t) {
        for (var e = 0, i = 0; i < 4; i++) {
          for (
            var n = this.players[i], a = 0;
            a < n.container_babei.pais.length;
            a++
          )
            0 == mjcore.MJPai.Distance(n.container_babei.pais[a].val, t) && e++;
          for (a = 0; a < n.container_ming.pais.length; a++)
            0 == mjcore.MJPai.Distance(n.container_ming.pais[a].val, t) && e++;
          for (a = 0; a < n.container_qipai.pais.length; a++)
            0 == mjcore.MJPai.Distance(n.container_qipai.pais[a].val, t) && e++;
          n.container_qipai.last_pai &&
            0 == mjcore.MJPai.Distance(n.container_qipai.last_pai.val, t) &&
            e++;
        }
        for (i = 0; i < this.mainrole.hand.length; i++)
          0 == mjcore.MJPai.Distance(this.mainrole.hand[i].val, t) && e++;
        for (i = 0; i < this.dora.length; i++)
          this.dora[i] && 0 == mjcore.MJPai.Distance(this.dora[i], t) && e++;
        var r = 4 - e;
        return r < 0 ? 0 : r > 4 ? 4 : r;
      }

      get_gang_count() {
        for (var t = 0, e = 0; e < this.players.length; e++) {
          if (this.localPosition2Seat(e) >= 0)
            for (
              var i = this.players[e].container_ming.mings, n = 0;
              n < i.length;
              n++
            )
              (i[n].type != mjcore.E_Ming.gang_an &&
                i[n].type != mjcore.E_Ming.gang_ming) ||
                t++;
        }
        return t;
      }

      get_babei_count() {
        for (var t = 0, e = 0; e < this.players.length; e++) {
          this.localPosition2Seat(e) >= 0 &&
            (t += this.players[e].container_babei.pais.length);
        }
        return t;
      }

      fetchLinks() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'fetchGamePlayerState',
          {},
          (t, e) => {
            if (t || e.error)
              uiscript.UIMgr.Inst.showNetReqError('fetchGamePlayerState', t, e);
            else {
              app.Log.log(JSON.stringify(e));
              r.player_link_state = [];
              for (var i = 0; i < e.state_list.length; i++)
                r.player_link_state.push(e.state_list[i]);
              uiscript.UI_DesktopInfo.Inst.refreshLinks();
            }
          }
        );
      }

      onShowHandChange(t) {
        if (this.gameing) {
          this.record_show_hand = t;
          for (var e = 1; e < 4; e++) this.players[e].onShowHandChange(t);
        }
      }

      onShowPaopaiChange(e) {
        if (this.gameing) {
          this.record_show_paopai = e;
          this.mainrole.onShowPaopaiChange();
          for (i = 1; i < 4; i++) this.players[i].onShowPaopaiChange();
          for (var i = 0; i < t.DesktopMgr.Inst.players.length; i++) {
            if (!(this.localPosition2Seat(i) < 0)) {
              for (
                n = 0;
                n < t.DesktopMgr.Inst.players[i].container_qipai.pais.length;
                n++
              ) {
                (a =
                  t.DesktopMgr.Inst.players[i].container_qipai.pais[
                    n
                  ]).ispaopai = this.isPaoPai(a.val);

                a.OnChoosedPai();
              }
              for (
                n = 0;
                n < t.DesktopMgr.Inst.players[i].container_ming.pais.length;
                n++
              ) {
                (a =
                  t.DesktopMgr.Inst.players[i].container_ming.pais[
                    n
                  ]).ispaopai = this.isPaoPai(a.val);

                a.OnChoosedPai();
              }
              for (
                var n = 0;
                n < t.DesktopMgr.Inst.players[i].container_babei.pais.length;
                n++
              ) {
                (a =
                  t.DesktopMgr.Inst.players[i].container_babei.pais[
                    n
                  ]).ispaopai = this.isPaoPai(a.val);

                a.OnChoosedPai();
              }
              var a = t.DesktopMgr.Inst.players[i].container_qipai.last_pai;
              a.ispaopai = this.isPaoPai(a.val);
              a && (a.OnChoosedPai());
            }
          }
        }
      }

      onRoundEnd(e, i) {
        var n = t.DesktopMgr.Inst.seat2LocalPosition(e);
        this.players[n].OnRoundEnd(i);
      }
    }

    __extends(r, a);

    r.Inst = null;
    r.player_link_state = [e.NULL, e.NULL, e.NULL, e.NULL];
    r.click_prefer = 0;
    r.double_click_pass = 0;
    r.en_mjp = !1;
    r.bianjietishi = !0;
    return r;
  })(Laya.Script);
  t.DesktopMgr = a;
})(view || (view = {}));