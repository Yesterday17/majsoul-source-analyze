let view;
!(t => {
  (t.PAIMODEL_HEIGHT = 0.043225 * 0.94),
    (t.PAIMODEL_WIDTH = 0.032775 * 0.94),
    (t.PAIMODEL_THICKNESS = 0.0235 * 0.95 * 0.94),
    (t.PAI_COUNT = 136);
  let e;
  !(t => {
    (t[(t.NULL = 0)] = 'NULL'),
      (t[(t.AUTH = 1)] = 'AUTH'),
      (t[(t.SYNCING = 2)] = 'SYNCING'),
      (t[(t.READY = 3)] = 'READY');
  })(e = t.ELink_State || (t.ELink_State = {}));
  let i;
  !(t => {
    (t[(t.Liqi4 = 0)] = 'Liqi4'), (t[(t.Liqi3 = 1)] = 'Liqi3');
  })(i = t.ERuleMode || (t.ERuleMode = {}));
  let n;
  !(t => {
    (t[(t.play = 0)] = 'play'),
      (t[(t.paipu = 1)] = 'paipu'),
      (t[(t.live_broadcast = 2)] = 'live_broadcast');
  })(n = t.EMJMode || (t.EMJMode = {}));
  const a = (a => {
    function r() {
      const e = a.call(this) || this;
      return (e.rule_mode = i.Liqi4),
      (e.mode = n.play),
      (e.active = false),
      (e.game_config = null),
      (e.seat = 0),
      (e.dora = []),
      (e.players = null),
      (e.mainrole = null),
      (e.num_left_show = new Array()),
      (e.plane_chang = null),
      (e.plane_ju = null),
      (e.trans_container_effect = null),
      (e.effect_pai_canchi = null),
      (e.effect_dora3D = null),
      (e.effect_doraPlane = null),
      (e.effect_shadow = null),
      (e.auto_hule = false),
      (e.auto_nofulu = false),
      (e.auto_moqie = false),
      (e.auto_liqi = true),
      (e.duringReconnect = false),
      (e.gameing = false),
      (e.lastpai_seat = 0),
      (e.lastqipai = null),
      (e.oplist = []),
      (e.liqi_select = []),
      (e.operation_showing = false),
      (e.myaccountid = 0),
      (e.player_datas = []),
      (e.player_effects = []),
      (e.mjp_res_name = ''),
      (e.last_gang = 0),
      (e.gameEndResult = null),
      (e.levelchangeinfo = null),
      (e.activity_reward = null),
      (e.rewardinfo = null),
      (e.choosed_pai = null),
      (e.actionList = []),
      (e.action_index = 0),
      (e.current_step = 0),
      (e.actionMap = null),
      (e.tingpais = []),
      (e.record_show_hand = false),
      (e.record_show_paopai = false),
      (e.ptchange = 0),
      (e.waiting_lingshang_deal_tile = false),
      (e.md5 = ''),
      (e.paipu_config = 0),
      (e.ai_level = 1),
      (e.timestoped = false),
      (e.handles_after_timerun = []),
      (e.doactioncd = 0),
      (e.dochain_fast = false),
      (e.action_running = false),
      (e.hangupCount = 0),
      (e.state_cache = {}),
      (r.Inst = e),
      (e.actionMap = {}),
      (e.actionMap.ActionMJStart = new Laya.Handler(
        e,
        ({msg}) => {
          msg;
          return app.Log.log('ActionMJStart begin'),
          e.ClearOperationShow(),
          GameMgr.Inst.EnterMJ(),
          uiscript.UI_FightBegin.show(
            Laya.Handler.create(e, () => {
              uiscript.UI_Loading.Inst.close(), e.ActionRunComplete();
            })
          ),
          2e3
        ;
        },
        null,
        false
      )),
      (e.actionMap.ActionNewRound = new Laya.Handler(
        e,
        ({msg, fast}) => {
          app.Log.log('ActionNewRound begin');
          const n = msg;
          const a = fast;
          if (
            (e.ClearOperationShow(),
            uiscript.UI_Loading.Inst.close(),
            GameMgr.Inst.EnterMJ(),
            a)
          )
            return (
              uiscript.UI_FightBegin.hide(),
              t.ActionNewRound.fastplay(n, -1),
              0
            );
          let r = uiscript.UI_FightBegin.hide();
          return Laya.timer.once(r + 200, e, () => {
            t.ActionNewRound.play(n);
          }),
          n.al && (r += 1300),
          r + 200 + 1200 + 400
        ;
        },
        null,
        false
      )),
      (e.actionMap.ActionDiscardTile = new Laya.Handler(
        e,
        ({msg, fast}) => {
          e.ClearOperationShow();
          const n = msg;
          return fast
            ? (t.ActionDiscardTile.fastplay(n, -1), 0)
            : (t.ActionDiscardTile.play(n),
              Laya.timer.once(500, e, e.ActionRunComplete),
              500);
        },
        null,
        false
      )),
      (e.actionMap.ActionDealTile = new Laya.Handler(
        e,
        ({msg, fast}) => {
          e.ClearOperationShow();
          const n = msg;
          return fast
            ? (t.ActionDealTile.fastplay(n, -1), 0)
            : (t.ActionDealTile.play(n), 500);
        },
        null,
        false
      )),
      (e.actionMap.ActionChiPengGang = new Laya.Handler(
        e,
        ({msg, fast}) => {
          e.ClearOperationShow();
          const n = msg;
          return fast
            ? (t.ActionChiPengGang.fastplay(n, -1), 0)
            : (t.ActionChiPengGang.play(n), 1100);
        },
        null,
        false
      )),
      (e.actionMap.ActionAnGangAddGang = new Laya.Handler(
        e,
        ({msg, fast}) => {
          e.ClearOperationShow();
          const n = msg;
          return fast
            ? (t.ActionAnGangAddGang.fastplay(n, -1), 0)
            : (t.ActionAnGangAddGang.play(n), 1100);
        },
        null,
        false
      )),
      (e.actionMap.ActionHule = new Laya.Handler(
        e,
        ({msg}) => {
          e.ClearOperationShow();
          const n = msg;
          return t.ActionHule.play(n), 5e3;
        },
        null,
        false
      )),
      (e.actionMap.ActionNoTile = new Laya.Handler(
        e,
        ({msg}) => {
          e.ClearOperationShow();
          const n = msg;
          return t.ActionNoTile.play(n), 5e3;
        },
        null,
        false
      )),
      (e.actionMap.ActionLiuJu = new Laya.Handler(
        e,
        ({msg}) => {
          e.ClearOperationShow();
          const n = msg;
          return t.ActionLiuJu.play(n), 5e3;
        },
        null,
        false
      )),
      (e.actionMap.ActionBaBei = new Laya.Handler(
        e,
        ({msg, fast}) => {
          e.ClearOperationShow();
          const n = msg;
          return fast
            ? (t.ActionBabei.fastplay(n, -1), 0)
            : (t.ActionBabei.play(n), 1e3);
        },
        null,
        false
      )),
      app.NetAgent.AddListener2MJ(
        'NotifyGameEndResult',
        Laya.Handler.create(e, ({result}) => {
          e.gameEndResult = result;
        })
      ),
      app.NetAgent.AddListener2MJ(
        'ActionPrototype',
        Laya.Handler.create(e, t => {
          if (
            (app.Log.log(`Receive Action: ${JSON.stringify(t)}`),
            e.duringReconnect)
          )
            e.actionList.push(t);
          else if (e.actionList.length > 0) e.actionList.push(t);
          else {
            e.actionList.push(t);
            let i = e.doactioncd - Laya.timer.currTimer;
            i < 0 && (i = 0), e.StartChainAction(i);
          }
        })
      ),
      app.NetAgent.AddListener2MJ(
        'NotifyGameFinishReward',
        Laya.Handler.create(e, t => {
          app.Log.log(`NotifyGameFinishReward: ${JSON.stringify(t)}`),
            (e.levelchangeinfo = t.level_change),
            (e.rewardinfo = t);
        })
      ),
      app.NetAgent.AddListener2MJ(
        'NotifyActivityReward',
        Laya.Handler.create(e, t => {
          app.Log.log(`NotifyActivityReward: ${JSON.stringify(t)}`),
            (e.activity_reward = t);
        })
      ),
      app.NetAgent.AddListener2MJ(
        'NotifyGameTerminate',
        Laya.Handler.create(e, t => {
          app.Log.log(`NotifyGameTerminate:${JSON.stringify(t)}`),
            'user-manual-terminate' != t.reason &&
              uiscript.UI_SecondConfirm.Inst.show_only_confirm(
                game.Tools.strOfLocalization(2227),
                Laya.Handler.create(e, () => {
                  e.Reset(), game.Scene_MJ.Inst.GameEnd();
                })
              );
        })
      ),
      t.ModelAnimationController.init_data(),
      app.NetAgent.AddListener2MJ(
        'NotifyGamePause',
        Laya.Handler.create(e, t => {
          app.Log.log(`NotifyGamePause:${JSON.stringify(t)}`);
          const i = t.paused;
          e.setGameStop(i);
        })
      ),
      app.NetAgent.AddListener2MJ(
        'NotifyActivityPoint',
        Laya.Handler.create(e, ({activity_points}) => {
          for (let e = activity_points, i = 0; i < e.length; i++) {
            const n = e[i];
            n.activity_id == uiscript.UI_Activity_DuanWu_Point.activity_id &&
              (uiscript.UI_Activity_DuanWu_Point.point = n.point);
          }
        })
      ),
      app.NetAgent.AddListener2MJ(
        'NotifyLeaderboardPoint',
        Laya.Handler.create(e, ({leaderboard_points}) => {
          for (let e = leaderboard_points, i = 0; i < e.length; i++) {
            const n = e[i];
            n.leaderboard_id ==
              uiscript.UI_Activity_DuanWu_Rank.activity_id &&
              (uiscript.UI_Activity_DuanWu_Rank.point = n.point);
          }
        })
      ),
      e
    ;
    }
    return __extends(r, a),
    Object.defineProperty(r.prototype, 'round_id', {
      get() {
        return `${this.index_change}-${this.index_ju}-${this.index_ben}`;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(r.prototype, 'main_role_character_info', {
      get() {
        return this.player_datas[this.seat].character;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(r.prototype, 'player_count', {
      get() {
        return this.rule_mode == i.Liqi3 ? 3 : 4;
      },
      enumerable: true,
      configurable: true
    }),
    (r.prototype.seat2LocalPosition = function(t) {
      if (this.rule_mode == i.Liqi3) {
        for (let e = this.seat, n = 0; n < 4; n++) {
          if (t == e) return n;
          ++e >= 3 && (e = -1);
        }
        return 0;
      }
      return (t - this.seat + 4) % 4;
    }),
    (r.prototype.localPosition2Seat = function(t) {
      if (this.rule_mode == i.Liqi3) {
        for (var e = this.seat, n = 0; n < t; n++) ++e >= 3 && (e = -1);
        return e;
      }
      return (this.seat + t) % 4;
    }),
    (r.prototype.getPlayerName = function(t) {
      return this.player_datas[t].nickname;
    }),
    Object.defineProperty(r.prototype, 'showingPaopai', {
      get() {
        return this.mode != n.play;
      },
      enumerable: true,
      configurable: true
    }),
    (r.prototype.ActionRunComplete = function() {
      this.action_running = false;
    }),
    (r.prototype.StartChainAction = function(t) {
      (this.doactioncd = Laya.timer.currTimer + t),
        Laya.timer.frameLoop(1, this, this.DoChainAction);
    }),
    (r.prototype.DoChainAction = function() {
      const t = this;
      if (this.action_index >= this.actionList.length)
        (this.action_index = 0),
          (this.actionList = []),
          (this.dochain_fast = false),
          Laya.timer.clear(this, this.DoChainAction),
          this.duringReconnect &&
            (app.Log.log('finishSyncGame0'),
            app.NetAgent.sendReq2MJ(
              'FastTest',
              'finishSyncGame',
              {},
              (t, e) => {}
            ),
            (this.duringReconnect = false));
      else {
        if (!this.dochain_fast) {
          if (this.action_running) return;
          if (Laya.timer.currTimer <= this.doactioncd - Laya.timer.delta)
            return;
          Laya.timer.clear(this, this.DoChainAction);
        }
        this.action_index == this.actionList.length - 1 &&
          this.duringReconnect &&
          ((this.duringReconnect = false),
          app.Log.log('finishSyncGame1'),
          app.NetAgent.sendReq2MJ('FastTest', 'finishSyncGame', {}, (t, e) => {})),
          this.dochain_fast
            ? this.action_index + 2 < this.actionList.length
              ? this.DoMJAction(this.actionList[this.action_index++], true)
              : ((this.dochain_fast = false),
                this.DoMJAction(this.actionList[this.action_index++], false))
            : ((this.dochain_fast = false),
              this.action_index + 4 < this.actionList.length &&
                (this.dochain_fast = true),
              this.dochain_fast
                ? Laya.timer.once(800, this, () => {
                    for (
                      let e = t.actionList.length - 1;
                      e >= t.action_index;
                      e--
                    )
                      if ('ActionNewRound' == t.actionList[e].name) {
                        t.action_index = e;
                        break;
                      }
                    t.DoMJAction(t.actionList[t.action_index++], true);
                  })
                : this.DoMJAction(this.actionList[this.action_index++], false));
      }
    }),
    (r.prototype.DoMJAction = function(t, e) {
      const i = this;
      if (this.active) {
        const n = net.ProtobufManager.lookupType(`lq.${t.name}`);
        if (!n) throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, lq.${t.name}`);
        const a = t.step;
        const r = n.decode(t.data);
        if (
          (app.Log.log(
            `DoMJAction step:${a} [${t.name}]:  ${JSON.stringify(r)} fast:${e}`
          ),
          a > 1 && a != this.current_step + 1)
        )
          return app.Log.log(
            `step 不对 强制触发全数据重连 step:${a} current_step:${this.current_step}`
          ),
          void this.trySyncGame()
        ;
        let s = 0;
        if (((this.current_step = a), this.actionMap.hasOwnProperty(t.name)))
          try {
            e || (this.action_running = true),
              (s = this.actionMap[t.name].runWith({ msg: r, fast: e }));
          } catch (e) {
            const o = {};
            return (
              (o.error = e.message),
              (o.stack = e.stack),
              (o.method = 'DoMJAction'),
              (o.name = t.name),
              (o.data = t),
              (o.step = a),
              void GameMgr.Inst.onFatalError(o)
            );
          }
        else app.Log.Error(`没有监听操作：${t.name}`);
        e
          ? this.DoChainAction()
          : Laya.timer.frameOnce(1, this, () => {
              i.StartChainAction(s);
            });
      }
    }),
    (r.prototype._load = function(e) {
      (this.desktop3D = e),
        (this.desktop3D.getChildByName('all').active = false);
      const i = this.desktop3D.getChildByName('poss');
      (this.players = new Array()),
        (this.mainrole = i
          .getChildByName('man_1')
          .addComponent(t.ViewPlayer_Me)),
        this.mainrole.Init(
          this,
          0,
          game.Scene_MJ.Inst.root2.getChildByName('hands'),
          i.getChildByName('ming_1').getChildAt(0),
          i.getChildByName('hai_1').getChildAt(0),
          i.getChildByName('man_1'),
          i.getChildByName('babei_1').getChildAt(0)
        ),
        (this.mainrole.trans_hand3D = i.getChildByName('pai_1')),
        (this.mainrole.trans_hand3D.getChildAt(0).active = false),
        (this.mainrole.trans_hand3D.active = false),
        (this.mainrole.trans_hand3DCover = i.getChildByName('pai_1_cover')),
        (this.mainrole.trans_hand3DCover.getChildAt(0).active = false),
        (this.mainrole.trans_hand3DCover.active = false),
        this.players.push(this.mainrole);
      for (let n = 2; n <= 4; n++) {
        const a = i.getChildByName(`man_${n}`).addComponent(t.ViewPlayer_Other);
        a.Init(
          this,
          n - 1,
          i.getChildByName(`pai_${n}`).getChildAt(0),
          i.getChildByName(`ming_${n}`).getChildAt(0),
          i.getChildByName(`hai_${n}`).getChildAt(0),
          i.getChildByName(`man_${n}`),
          i.getChildByName(`babei_${n}`).getChildAt(0)
        ),
          this.players.push(a);
      }
      const r = this.desktop3D.getChildByName('other');
      const s = r.getChildByName('left');
      this.num_left_show.push(s.getChildByName('0')),
        this.num_left_show.push(s.getChildByName('1')),
        this.SetLeftPaiShow(0);
      const o = r.getChildByName('chang');
      (this.plane_chang = o.getChildByName('chang')),
        (this.plane_ju = o.getChildByName('ju')),
        this.SetChangJuShow(0, 0),
        (this.trans_container_effect = this.desktop3D.getChildByName(
          'effect'
        )),
        (this.effect_pai_canchi = this.trans_container_effect.getChildByName(
          'effect_pai_canchi'
        )),
        (this.effect_dora3D = this.trans_container_effect.getChildByName(
          'effect_dora'
        )),
        (this.effect_shadow = this.trans_container_effect.getChildByName(
          'effect_shadow'
        )),
        (this.effect_pai_canchi.active = true),
        (this.effect_dora3D.active = true),
        (this.effect_shadow.active = true),
        (this.effect_doraPlane = game.Scene_MJ.Inst.root2
          .getChildByName('hands')
          .getChildByName('effect_dora')),
        (this.effect_doraPlane.active = false);
    }),
    (r.prototype.initRoom = function(e, a, s, o, l) {
      const h = this;
      uiscript.UI_WaitingRoom.Inst.resetData(),
        (this.game_config = e),
        (this.rule_mode = i.Liqi4),
        e.mode.mode &&
          (e.mode.mode < 10
            ? (this.rule_mode = i.Liqi4)
            : (this.rule_mode = i.Liqi3)),
        (this.mode = o),
        (this.seat = -1),
        (this.player_datas = a),
        (this.gameEndResult = null),
        (this.levelchangeinfo = null),
        (this.activity_reward = null),
        (this.rewardinfo = null),
        (this.active = true),
        (this.ptchange = 0),
        (this.paipu_config = 0),
        (this.timestoped = false),
        (this.action_running = false),
        (this.hangupCount = 0),
        (this.handles_after_timerun = []),
        uiscript.UI_GameStop.Inst.close(),
        this.mode == n.paipu
          ? (this.record_show_hand = this.record_show_paopai = true)
          : (this.record_show_hand = this.record_show_paopai = false),
        this.mode == n.play
          ? ((uiscript.UI_Invite.Inst.enable = false),
            4 == e.category &&
              (GameMgr.Inst.custom_match_id = e.meta.contest_uid))
          : (uiscript.UI_Invite.Inst.enable = true),
        (this.myaccountid = s);
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
            const m = f[p].path + t.AudioMgr.suffix;
            c.hasOwnProperty(m) || (c[m] = 1);
          }
      for (const g in c) Laya.loader.load(g, null, null, null, 3);
      for (u = 0; u < this.player_datas.length; u++)
        this.player_datas[u].account_id == s && (this.seat = u);
      if (-1 == this.seat) {
        if (this.mode == n.play)
          return (
            uiscript.UIMgr.Inst.ShowErrorInfo(
              game.Tools.strOfLocalization(2228)
            ),
            void app.Log.Error(JSON.stringify(a))
          );
        this.seat = 0;
      }
      if (
        ((uiscript.UI_Replay.Inst.enable = this.mode == n.paipu),
        (r.bianjietishi = true),
        o == n.play)
      ) {
        if (e.mode && e.mode.detail_rule) {
          const y = e.mode.detail_rule;
          null != y.bianjietishi && (r.bianjietishi = y.bianjietishi);
        }
        if (2 == e.category && e.meta) {
          const v = cfg.desktop.matchmode.get(e.meta.mode_id);
          v && 6 == v.room && (r.bianjietishi = false);
        }
        uiscript.UI_MJTask_Progress.record();
      }
      (this.mjp_res_name = game.GameUtility.get_common_view_res_name(
        game.ECommonView.mjp
      )),
        (this.player_effects = []);
      for (u = 0; u < this.player_datas.length; u++) {
        const b = this.player_datas[u].character;
        if (b) {
          const w = b.views;
          let x = 'scene/effect_hupai_default.lh';
          let I = '';
          let C = 'scene/liqi_default.lh';
          let S = 'hand_human';
          let T = '';
          const M = cfg.item_definition.character.get(b.charid);
          if ((M && (S = M.hand), w))
            for (p = 0; p < w.length; p++) {
              const E = w[p].slot;
              const L = w[p].item_id;
              if (E == game.EPlayerView.liqi_bgm) {
                const D = cfg.item_definition.item.get(L);
                D && (T = D.sargs[0]);
              } else {
                const A = cfg.item_definition.view.get(L);
                A &&
                  (E == game.EPlayerView.hupai_effect
                    ? (x = `scene/${A.res_name}.lh`)
                    : E == game.EPlayerView.liqi_effect
                    ? (I = `scene/${A.res_name}.lh`)
                    : E == game.EPlayerView.liqibang
                    ? (C = `scene/${A.res_name}.lh`)
                    : E == game.EPlayerView.hand_model && (S = A.res_name));
              }
            }
          this.player_effects.push({
            effect_hupai: x,
            effect_liqi: I,
            liqibang: C,
            hand: S,
            liqi_bgm: T
          });
        } else
          (this.player_datas[u].character = {
            charid: 200001,
            level: 0,
            exp: 0,
            views: [],
            skin: 400101,
            is_upgraded: false
          }),
            this.player_effects.push({
              effect_hupai: 'scene/effect_hupai_default.lh',
              effect_liqi: '',
              liqibang: 'scene/liqi_default.lh',
              hand: 'hand_human',
              liqi_bgm: ''
            });
      }
      uiscript.UI_DesktopInfo.Inst.initRoom(),
        uiscript.UI_DesktopInfo.Inst.refreshSeat(),
        (uiscript.UI_Hangup_Warn.Inst.enable = false),
        (uiscript.UI_TingPai.Inst.enable = true),
        (this.index_change = 0),
        (this.index_ju = 0),
        (this.index_ben = 0),
        (this.index_player = 0),
        (this.gameing = true),
        (this.left_tile_count = 69),
        (this.duringReconnect = false),
        (this.current_step = 0),
        (this.action_index = 0),
        (this.dochain_fast = false),
        (this.actionList = []),
        this.setAutoHule(false),
        this.setAutoMoQie(false),
        this.setAutoNoFulu(false),
        uiscript.UI_DesktopInfo.Inst.resetFunc(),
        this.SetChangJuShow(this.index_change, this.index_ju),
        uiscript.UI_DesktopInfo.Inst.setBen(this.index_ben),
        uiscript.UI_DesktopInfo.Inst.setZhenting(false);
      for (u = 0; u < 4; u++)
        this.players[u].onInitRoom(this.localPosition2Seat(u)),
          this.players[u].SetScore(0, 0),
          (this.players[u].trans_ind.active = false),
          this.players[u].RefreshDir();
      this.RefreshPaiLeft(),
        uiscript.UI_GameEnd.Inst.forceclose(),
        uiscript.UI_RankChange.Inst.close(),
        uiscript.UI_MJReward.Inst.close(),
        Laya.timer.frameOnce(6, this, () => {
          h.Reset(),
            app.Log.log(
              `场景init结束：${Laya.Stat.currentMemorySize / 1024 / 1024} MB`
            ),
            l && l.run();
        }),
        (this.state_cache = {}),
        uiscript.UI_Activity.activity_is_running(
          uiscript.UI_Activity_DuanWu_Point.activity_id
        ) &&
          ((this.state_cache.duanwu_point =
            uiscript.UI_Activity_DuanWu_Point.point),
          (this.state_cache.duanwu_rank =
            uiscript.UI_Activity_DuanWu_Rank.point));
    }),
    (r.prototype.changeMainbody = function(t) {
      if (this.mode != n.play) {
        (this.seat = t), uiscript.UI_DesktopInfo.Inst.refreshSeat(true);
        for (let e = 0; e < 4; e++)
          this.players[e].onInitRoom(this.localPosition2Seat(e)),
            (this.players[e].trans_ind.active = false),
            this.players[e].RefreshDir();
        this.Reset(),
          this.mode == n.paipu && uiscript.UI_Replay.Inst.onChangeMainBody(),
          this.mode == n.live_broadcast &&
            uiscript.UI_Live_Broadcast.Inst.onChangeMainbody();
      }
    }),
    (r.prototype.trySyncGame = function() {
      const t = this;
      this.Reset(),
        (this.duringReconnect = true),
        (this.hangupCount = 0),
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'syncGame',
          { round_id: this.round_id, step: 0 },
          (e, i) => {
            e || i.error
              ? (uiscript.UIMgr.Inst.showNetReqError('syncGame', e, i),
                game.Scene_MJ.Inst.ForceOut())
              : (app.Log.log(`[syncGame2] ${JSON.stringify(i)}`),
                i.isEnd
                  ? (uiscript.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2229)
                    ),
                    game.Scene_MJ.Inst.GameEnd())
                  : (t.fetchLinks(),
                    t.Reset(),
                    (t.duringReconnect = true),
                    t.syncGameByStep(i.game_restore)));
          }
        );
    }),
    (r.prototype.syncGameByStep = function(e) {
      const i = this;
      let n = false;
      if (
        ((this.timestoped = false),
        (this.handles_after_timerun = []),
        (this.action_running = false),
        uiscript.UI_GameStop.Inst.close(),
        (this.hangupCount = 0),
        (uiscript.UI_Hangup_Warn.Inst.enable = false),
        e && 5 === e.game_state && (this.timestoped = true),
        GameMgr.Inst.EnterMJ(),
        e && e.actions && e.actions.length > 0)
      ) {
        this.actionList = [];
        let a = -1;
        null != e.passed_waiting_time &&
          undefined != e.passed_waiting_time &&
          (a = 1e3 * e.passed_waiting_time);
        for (let s = 0; s < e.actions.length; s++) {
          const o = e.actions[s];
          const l = s == e.actions.length - 1 ? a : -1;
          const h = net.ProtobufManager.lookupType(`lq.${o.name}`);
          if (!h)
            throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, lq.${o.name}`);
          const c = h.decode(o.data);
          this.current_step = o.step;
          try {
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
                t.ActionHule.fastplay(c, l), (n = true);
                break;
              case 'ActionLiuJu':
                t.ActionLiuJu.fastplay(c, l), (n = true);
                break;
              case 'ActionNoTile':
                t.ActionNoTile.fastplay(c, l), (n = true);
                break;
              case 'ActionBaBei':
                t.ActionBabei.fastplay(c, l);
            }
          } catch (t) {
            const u = {};
            (u.error = t.message),
              (u.stack = t.stack),
              (u.method = 'syncGameByStep'),
              (u.name = o.name),
              (u.data = o),
              (u.step = s),
              GameMgr.Inst.onFatalError(u);
            break;
          }
        }
        Laya.timer.once(1e3, this, () => {
          (i.duringReconnect = false),
            uiscript.UI_Loading.Inst.close(),
            n || t.BgmListMgr.PlayMJBgm(),
            i.DoChainAction();
        });
      } else
        (this.duringReconnect = false),
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
      app.Log.log('finishSyncGame11'),
        app.NetAgent.sendReq2MJ('FastTest', 'finishSyncGame', {}, (t, e) => {}),
        r.Inst.fetchLinks(),
        this.timestoped && uiscript.UI_GameStop.Inst.show();
    }),
    (r.prototype.setGameStop = function(t) {
      if (t != this.timestoped)
        if (((this.timestoped = t), this.timestoped))
          (this.handles_after_timerun = []), uiscript.UI_GameStop.Inst.show();
        else {
          if ((uiscript.UI_GameStop.Inst.close(), this.handles_after_timerun))
            for (let e = 0; e < this.handles_after_timerun.length; e++)
              this.handles_after_timerun[e].run();
          (this.handles_after_timerun = []), (this.hangupCount = 0);
        }
    }),
    (r.prototype.CreatePai3D = function(t) {
      const e = this.desktop3D
          .getChildByName('all')
          .getChildByName('maque')
          .clone();

      const i = this.desktop3D
        .getChildByName('all')
        .getChildByName('maque_outline')
        .clone();

      const n = e;
      const a = new caps.BaseMaterial(caps.Cartoon.filename);
      let r = 'scene/Assets/Resource/mjpai/';
      'en' == GameMgr.client_language && (r += 'en/'),
        (r += `${this.mjp_res_name}/${t.toString()}.png`),
        a.setTexture(caps.Cartoon.TEXTURE, Laya.loader.getRes(r)),
        a.setNumber(caps.Cartoon.SPLIT, 0.4),
        a.setColor(caps.Cartoon.COLOR_LIGHT, new Laya.Vector3(1, 1, 1)),
        a.setColor(
          caps.Cartoon.COLOR_UNLIGHT,
          new Laya.Vector3(0.788, 0.788, 0.8235)
        ),
        a.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1)),
        (n.meshRender.sharedMaterial = a);
      const s = i;
      e.addChild(s),
        (s.transform.localPosition = new Laya.Vector3(0, 0, 0)),
        (s.transform.localScale = new Laya.Vector3(1, 1, 1)),
        (s.transform.localRotation = new Laya.Quaternion(0, 0, 0, 0));
      const o = s;
      const l = new caps.Material_Outline(caps.Outline.filename);
      return (
        l.setColor(
          caps.Outline.OUTLINE_COLOR,
          new Laya.Vector3(0.165, 0.192, 0.204)
        ),
        l.setNumber(caps.Outline.OUTLINE_ALPHA, 0.6),
        l.setNumber(caps.Outline.OUTLINE, 0.0012),
        (o.meshRender.sharedMaterial = l),
        e
      );
    }),
    (r.prototype.RefreshPlayerIndicator = function() {
      for (let t = 0; t < 4; t++)
        (this.players[t].trans_ind.active =
          t == this.seat2LocalPosition(this.index_player)),
          this.players[t].RefreshScore(this.mainrole.score);
    }),
    (r.prototype.setAutoHule = function(t) {
      (this.auto_hule = t), this._PendingAuto();
    }),
    (r.prototype.setAutoNoFulu = function(t) {
      (this.auto_nofulu = t), this._PendingAuto();
    }),
    (r.prototype.setAutoMoQie = function(t) {
      (this.auto_moqie = t), this._PendingAuto();
    }),
    (r.prototype.setAutoLiPai = function(t) {
      (this.auto_liqi = t),
        t && this.gameing && this.mainrole && this.mainrole.LiPai();
    }),
    (r.prototype.setScoreDelta = function(t) {
      for (let e = 1; e < 4; e++)
        (this.players[e].duringShowDetla = t),
          this.players[e].RefreshScore(this.mainrole.score);
    }),
    (r.prototype.SetChangJuShow = function(t, e) {
      let i = new Laya.Vector4(0.2, 1, (t % 4) * 0.2, 0);
      'en' == GameMgr.client_language &&
        (i = new Laya.Vector4(1, 0.25, 0, 0.25 * ((t % 4) - 3))),
        (this.plane_chang.meshRender.material.tilingOffset = i);
      const n = new Laya.Vector4(0.25, 1, 0.25 * e, 0);
      this.plane_ju.meshRender.material.tilingOffset = n;
    }),
    (r.prototype.SetLeftPaiShow = function(t) {
      t >= 100 ? (t = 99) : t < 0 && (t = 0);
      for (let e = [t % 10, Math.floor(t / 10)], i = 0; i < e.length; i++) {
        const n = new Laya.Vector4(0.1, 1, 0.1 * e[i], 0);
        this.num_left_show[i].meshRender.material.tilingOffset = n;
      }
    }),
    (r.prototype.RefreshPaiLeft = function() {
      this.SetLeftPaiShow(this.left_tile_count);
    }),
    (r.prototype.Reset = function() {
      app.Log.log('DesktopMgr.Reset'),
        (this.operation_showing = false),
        (this.oplist = []),
        Laya.timer.clearAll(t.ActionAnGangAddGang),
        Laya.timer.clearAll(t.ActionChiPengGang),
        Laya.timer.clearAll(t.ActionDealTile),
        Laya.timer.clearAll(t.ActionDiscardTile),
        Laya.timer.clearAll(t.ActionHule),
        Laya.timer.clearAll(t.ActionLiqi),
        Laya.timer.clearAll(t.ActionLiuJu),
        Laya.timer.clearAll(t.ActionNewRound),
        Laya.timer.clearAll(t.ActionNoTile),
        Laya.timer.clearAll(t.ActionOperation),
        Laya.timer.clearAll(this),
        uiscript.UI_DesktopInfo.Inst.reset_rounds(),
        uiscript.UI_Replay.Inst.reset(),
        (this.effect_pai_canchi.active = false);
      for (let e = 0; e < 4; e++) this.players[e].Reset();
      (this.tingpais = [[], [], [], []]),
        (this.md5 = ''),
        (this.current_step = -1);
    }),
    (r.prototype.setScores = function(e) {
      for (let i = 0; i < e.length; i++)
        this.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].SetScore(
          e[i],
          e[this.seat]
        );
    }),
    (r.prototype._PendingAuto = function() {
      if (null == this.oplist || 0 == this.oplist.length) return false;
      app.Log.log('_PendingAuto');
      try {
        var t = false;
        let e = false;
        let i = false;
        let n = false;
        let a = false;
        const r = this.operation_showing;
        this.operation_showing = true;
        let s = null;
        this.liqi_select = [];
        for (_ = 0; _ < this.oplist.length; _++) {
          switch (this.oplist[_].type) {
            case mjcore.E_PlayOperation.eat:
            case mjcore.E_PlayOperation.peng:
            case mjcore.E_PlayOperation.ming_gang:
            case mjcore.E_PlayOperation.rong:
              t = true;
              break;
            case mjcore.E_PlayOperation.an_gang:
            case mjcore.E_PlayOperation.add_gang:
            case mjcore.E_PlayOperation.liqi:
            case mjcore.E_PlayOperation.zimo:
            case mjcore.E_PlayOperation.babei:
              e = true;
            case mjcore.E_PlayOperation.jiuzhongjiupai:
              e = true;
          }
          if (
            (this.oplist[_].type == mjcore.E_PlayOperation.dapai &&
              ((a = true), (s = this.oplist[_].combination)),
            this.oplist[_].type == mjcore.E_PlayOperation.liqi)
          ) {
            (a = true), (this.liqi_select = []);
            for (let o = 0; o < this.oplist[_].combination.length; o++)
              this.liqi_select.push(
                mjcore.MJPai.Create(this.oplist[_].combination[o])
              );
          }
          this.oplist[_].type == mjcore.E_PlayOperation.rong && (i = true),
            this.oplist[_].type == mjcore.E_PlayOperation.zimo && (n = true);
        }
        const l = this.auto_hule;
        let h = this.auto_nofulu;
        let c = this.auto_moqie;
        if ((this.hangupCount >= 5 && ((h = true), (c = true)), l && (i || n)))
          return Laya.timer.once(800, this, () => {
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
          }),
          this.ClearOperationShow(),
          false
        ;
        if (t) {
          if (h && !i && !n)
            return app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputChiPengGang',
              { cancel_operation: true },
              (t, e) => {}
            ),
            this.ClearOperationShow(),
            false
          ;
          r || uiscript.UIMgr.Inst.ShowChipenghu(this.oplist);
        } else if (
          (e && (r || uiscript.UIMgr.Inst.ShowLiqiZimo(this.oplist)), a)
        ) {
          if (
            c &&
            !uiscript.UI_LiQiZiMo.Inst.enable &&
            null != this.mainrole.last_tile
          )
            return this.Action_QiPai(this.mainrole.last_tile.val, true, true), false;
          if (!r && ((this.mainrole.can_discard = true), s && s.length > 0)) {
            for (var u = [], _ = 0; _ < s.length; _++)
              u.push(mjcore.MJPai.Create(s[_]));
            this.mainrole.ChiTiSelect(u);
          }
        } else this.mainrole.can_discard = false;
      } catch (t) {
        const d = {};
        (d.error = t.message),
          (d.stack = t.stack),
          (d.method = '_PendingAuto'),
          (d.name = 'DesktopMgr'),
          GameMgr.Inst.onFatalError(d);
      }
      return true;
    }),
    (r.prototype.OperationTimeOut = function() {
      if (null != this.oplist && 0 != this.oplist.length) {
        let t = false;
        let e = false;
        let i = false;
        let n = false;
        let a = false;
        this.operation_showing;
        this.operation_showing = true;
        this.hangupCount++,
          this.hangupCount >= 5 &&
            !uiscript.UI_Hangup_Warn.Inst.enable &&
            uiscript.UI_Hangup_Warn.Inst.show();
        for (o = 0; o < this.oplist.length; o++) {
          switch (this.oplist[o].type) {
            case mjcore.E_PlayOperation.eat:
            case mjcore.E_PlayOperation.peng:
            case mjcore.E_PlayOperation.ming_gang:
            case mjcore.E_PlayOperation.rong:
              t = true;
              break;
            case mjcore.E_PlayOperation.an_gang:
            case mjcore.E_PlayOperation.add_gang:
            case mjcore.E_PlayOperation.liqi:
            case mjcore.E_PlayOperation.zimo:
            case mjcore.E_PlayOperation.babei:
              e = true;
          }
          (this.oplist[o].type != mjcore.E_PlayOperation.dapai &&
            this.oplist[o].type != mjcore.E_PlayOperation.liqi) ||
            ((a = true),
            this.oplist[o].type == mjcore.E_PlayOperation.dapai &&
              this.oplist[o].combination),
            this.oplist[o].type == mjcore.E_PlayOperation.rong && (i = true),
            this.oplist[o].type == mjcore.E_PlayOperation.zimo && (n = true);
        }
        if (t)
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
                { cancel_operation: true, timeuse: 1e6 },
                (t, e) => {}
              ),
            this.ClearOperationShow();
        else if (a)
          if (this.mainrole.during_liqi) {
            for (
              var r = null, s = false, o = 0;
              o < this.mainrole.hand.length;
              o++
            )
              this.mainrole.hand[o].valid &&
                ((r = this.mainrole.hand[o].val),
                (s = this.mainrole.hand[o] === this.mainrole.last_tile));
            this.Action_LiQi(r, s);
          } else {
            let l = null;
            var s = false;
            if (
              (null == l &&
                this.mainrole.last_tile &&
                this.mainrole.last_tile.valid &&
                ((l = this.mainrole.last_tile.val), (s = true)),
              null == l)
            )
              for (o = this.mainrole.hand.length - 1; o >= 0; o--)
                if (this.mainrole.hand[o].valid) {
                  (l = this.mainrole.hand[o].val), (s = false);
                  break;
                }
            this.Action_QiPai(l, s, true);
          }
        else
          e &&
            (n
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
                  { cancel_operation: true, timeuse: 1e6 },
                  (t, e) => {}
                ),
            this.ClearOperationShow());
      }
    }),
    (r.prototype.WhenDoOperation = function() {
      (this.hangupCount = 0),
        uiscript.UI_Hangup_Warn.Inst.enable &&
          (uiscript.UI_Hangup_Warn.Inst.enable = false),
        this.ClearOperationShow();
    }),
    (r.prototype.ClearOperationShow = function() {
      (this.operation_showing = false),
        (this.oplist = []),
        uiscript.UIMgr.Inst.CloseLiuJu(),
        uiscript.UIMgr.Inst.CloseWin(),
        uiscript.UIMgr.Inst.CloseChipenghu(),
        uiscript.UIMgr.Inst.CloseLiqiZimo(),
        Laya.timer.clearAll(t.ActionOperation),
        (uiscript.UI_ScoreChange.Inst.enable = false),
        (this.mainrole.can_discard = false),
        uiscript.UI_DesktopInfo.Inst.closeCountDown();
    }),
    (r.prototype.WhenLiqiInfo = function(t) {
      const e = this;
      t &&
        Laya.timer.once(300, this, () => {
          const i = t.seat;
          const n = t.score;
          e.players[e.seat2LocalPosition(i)].ShowLiqi(),
            e.players[e.seat2LocalPosition(i)].SetScore(n, e.mainrole.score),
            uiscript.UI_DesktopInfo.Inst.setLiqibang(t.liqibang);
        });
    }),
    (r.prototype.WhenDoras = function(e, i) {
      const n = this;
      if (
        !(
          null == e ||
          undefined == e ||
          0 == e.length ||
          e.length <= this.dora.length
        ) &&
        e
      ) {
        for (let a = 0; a < e.length; a++)
          this.dora.length > a
            ? (this.dora[a] = mjcore.MJPai.Create(e[a]))
            : this.dora.push(mjcore.MJPai.Create(e[a])),
            uiscript.UI_DesktopInfo.Inst.setDora(a, this.dora[a]);
        Laya.timer.frameOnce(1, this, () => {
          for (let t = 0; t < 4; t++) n.players[t].OnDoraRefresh();
        }),
          i || t.AudioMgr.PlayAudio(215);
      }
    }),
    (r.prototype.Action_QiPai = function(t, e, i) {
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
      ),
        i ? this.ClearOperationShow() : this.WhenDoOperation();
    }),
    (r.prototype.Action_LiQi = function(t, e) {
      if (!this.liqi_select || 0 == this.liqi_select.length) return false;
      for (var i = false, n = 0; n < this.liqi_select.length; n++)
        if (0 == mjcore.MJPai.Distance(this.liqi_select[n], t)) {
          i = true;
          break;
        }
      return !!i &&
      (app.NetAgent.sendReq2MJ(
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
      ),
      this.WhenDoOperation(),
      true);
    }),
    (r.prototype.SetLastQiPai = function(t, e) {
      (this.lastqipai = e),
        (this.lastpai_seat = t),
        (this.effect_pai_canchi.active = false);
    }),
    (r.prototype.ShowHuleEffect = function(e, i) {
      const n = this;
      if (null != e) {
        e = e.clone();
        const a = game.EffectMgr.create_d3_effect(i);
        this.trans_container_effect.addChild(a),
          (a.transform.position = e),
          (a.active = true);
        let r = 213;
        switch (i) {
          case 'scene/effect_hupai_default.lh':
            r = 213;
            break;
          case 'scene/effect_hupai_fire.lh':
            r = 230;
            break;
          case 'scene/effect_hupai_feng.lh':
            r = 231;
            break;
          case 'scene/effect_hupai_sakura.lh':
            r = 232;
            break;
          case 'scene/effect_hupai_ice.lh':
            r = 233;
            break;
          case 'scene/effect_hupai_juguang.lh':
            r = 234;
            break;
          case 'scene/effect_hupai_heihuo.lh':
            r = 237;
            break;
          case 'scene/effect_hupai_yanhua.lh':
            r = 238;
            break;
          case 'scene/ron_huolongjuan.lh':
            r = 305034;
            break;
          case 'scene/ron_keji.lh':
            r = 305035;
            break;
          case 'scene/ron_meiguihua.lh':
            r = 305036;
            break;
          case 'scene/ron_ko.lh':
            r = 305039;
            break;
          case 'scene/ron_nilin.lh':
            r = 305040;
        }
        t.AudioMgr.PlayAudio(r),
          Laya.timer.once(2e3, this, () => {
            a.destroy(true);
          }),
          'scene/effect_hupai_yanhua.lh' == i &&
            Laya.timer.once(600, this, () => {
              const t = game.EffectMgr.create_d3_effect(
                'scene/effect_hupai_yanhua_bang.lh'
              );
              n.desktop3D.addChild(t),
                (t.transform.position = new Laya.Vector3(0, 0, 0)),
                (t.active = true),
                Laya.timer.once(2e3, n, () => {
                  t.destroy(true);
                });
            });
      }
    }),
    (r.prototype.ShowChiPengEffect = function() {
      this.lastqipai.model &&
        this.lastqipai.model.transform &&
        (this.lastqipai.model.parent.addChild(this.effect_pai_canchi),
        (this.effect_pai_canchi.transform.localPosition = this.lastqipai.model.transform.localPosition.clone()),
        (this.effect_pai_canchi.transform.localRotation = this.lastqipai.model.transform.localRotation.clone()),
        (this.effect_pai_canchi.active = true));
    }),
    (r.prototype.CloseChiPngEffect = function() {
      this.effect_pai_canchi &&
        ((this.effect_pai_canchi.active = false),
        this.trans_container_effect &&
          this.trans_container_effect.addChild(this.effect_pai_canchi));
    }),
    (r.prototype.setChoosedPai = function(t) {
      let e = false;
      if (
        (e || !t || this.choosed_pai || (e = true),
        e || t || !this.choosed_pai || (e = true),
        !e &&
          t &&
          this.choosed_pai &&
          0 != mjcore.MJPai.Distance(this.choosed_pai, t) &&
          (e = true),
        e && ((this.choosed_pai = t ? t.Clone() : null), r.bianjietishi))
      ) {
        for (let i = 0; i < 4; i++) this.players[i].OnChoosePai();
        uiscript.UI_TingPai.Inst.onChooseTile(t);
      }
    }),
    (r.prototype.setTingpai = function(e, i) {
      for (var n = false, a = [], r = 0; r < i.length; r++)
        a.push(mjcore.MJPai.Create(i[r].tile));
      this.tingpais[e].length != a.length && (n = true);
      for (r = 0; r < a.length && !n; r++)
        0 != mjcore.MJPai.Distance(a[r], this.tingpais[e][r]) && (n = true);
      if (n) {
        this.tingpais[e] = a;
        for (r = 0; r < t.DesktopMgr.Inst.players.length; r++) {
          if (!(this.localPosition2Seat(r) < 0)) {
            for (
              o = 0;
              o < t.DesktopMgr.Inst.players[r].container_qipai.pais.length;
              o++
            ) {
              ((l =
                t.DesktopMgr.Inst.players[r].container_qipai.pais[
                  o
                ]).ispaopai = this.isPaoPai(l.val)),
                l.OnChoosedPai();
            }
            for (
              o = 0;
              o < t.DesktopMgr.Inst.players[r].container_ming.pais.length;
              o++
            ) {
              ((l =
                t.DesktopMgr.Inst.players[r].container_ming.pais[
                  o
                ]).ispaopai = this.isPaoPai(l.val)),
                l.OnChoosedPai();
            }
            for (
              o = 0;
              o < t.DesktopMgr.Inst.players[r].container_babei.pais.length;
              o++
            ) {
              ((l =
                t.DesktopMgr.Inst.players[r].container_babei.pais[
                  o
                ]).ispaopai = this.isPaoPai(l.val)),
                l.OnChoosedPai();
            }
            if (
              ((l = t.DesktopMgr.Inst.players[r].container_qipai.last_pai) &&
                ((l.ispaopai = this.isPaoPai(l.val)), l.OnChoosedPai()),
              0 == r)
            )
              for (
                var s = t.DesktopMgr.Inst.players[r], o = 0;
                o < s.hand.length;
                o++
              ) {
                ((l = s.hand[o]).ispaopai = this.isPaoPai(l.val)),
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
                  : (l.ispaopai = false),
                  l.OnChoosedPai();
              }
          }
        }
      }
    }),
    (r.prototype.isPaoPai = function(t) {
      if (!this.record_show_paopai) return false;
      for (let e = 0; e < this.tingpais.length; e++)
        for (let i = 0; i < this.tingpais[e].length; i++)
          if (0 == mjcore.MJPai.Distance(this.tingpais[e][i], t)) return true;
      return false;
    }),
    (r.prototype.getPaiLeft = function(t) {
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
      const r = 4 - e;
      return r < 0 ? 0 : r > 4 ? 4 : r;
    }),
    (r.prototype.get_gang_count = function() {
      for (var t = 0, e = 0; e < this.players.length; e++) {
        if (this.localPosition2Seat(e) >= 0)
          for (
            let i = this.players[e].container_ming.mings, n = 0;
            n < i.length;
            n++
          )
            (i[n].type != mjcore.E_Ming.gang_an &&
              i[n].type != mjcore.E_Ming.gang_ming) ||
              t++;
      }
      return t;
    }),
    (r.prototype.get_babei_count = function() {
      for (var t = 0, e = 0; e < this.players.length; e++) {
        this.localPosition2Seat(e) >= 0 &&
          (t += this.players[e].container_babei.pais.length);
      }
      return t;
    }),
    (r.prototype.fetchLinks = () => {
      app.NetAgent.sendReq2MJ(
        'FastTest',
        'fetchGamePlayerState',
        {},
        (t, e) => {
          if (t || e.error)
            uiscript.UIMgr.Inst.showNetReqError('fetchGamePlayerState', t, e);
          else {
            app.Log.log(JSON.stringify(e)), (r.player_link_state = []);
            for (let i = 0; i < e.state_list.length; i++)
              r.player_link_state.push(e.state_list[i]);
            uiscript.UI_DesktopInfo.Inst.refreshLinks();
          }
        }
      );
    }),
    (r.prototype.onShowHandChange = function(t) {
      if (this.gameing) {
        this.record_show_hand = t;
        for (let e = 1; e < 4; e++) this.players[e].onShowHandChange(t);
      }
    }),
    (r.prototype.onShowPaopaiChange = function(e) {
      if (this.gameing) {
        (this.record_show_paopai = e), this.mainrole.onShowPaopaiChange();
        for (i = 1; i < 4; i++) this.players[i].onShowPaopaiChange();
        for (var i = 0; i < t.DesktopMgr.Inst.players.length; i++) {
          if (!(this.localPosition2Seat(i) < 0)) {
            for (
              n = 0;
              n < t.DesktopMgr.Inst.players[i].container_qipai.pais.length;
              n++
            ) {
              ((a =
                t.DesktopMgr.Inst.players[i].container_qipai.pais[
                  n
                ]).ispaopai = this.isPaoPai(a.val)),
                a.OnChoosedPai();
            }
            for (
              n = 0;
              n < t.DesktopMgr.Inst.players[i].container_ming.pais.length;
              n++
            ) {
              ((a =
                t.DesktopMgr.Inst.players[i].container_ming.pais[
                  n
                ]).ispaopai = this.isPaoPai(a.val)),
                a.OnChoosedPai();
            }
            for (
              var n = 0;
              n < t.DesktopMgr.Inst.players[i].container_babei.pais.length;
              n++
            ) {
              ((a =
                t.DesktopMgr.Inst.players[i].container_babei.pais[
                  n
                ]).ispaopai = this.isPaoPai(a.val)),
                a.OnChoosedPai();
            }
            var a = t.DesktopMgr.Inst.players[i].container_qipai.last_pai;
            a && ((a.ispaopai = this.isPaoPai(a.val)), a.OnChoosedPai());
          }
        }
      }
    }),
    (r.Inst = null),
    (r.player_link_state = [e.NULL, e.NULL, e.NULL, e.NULL]),
    (r.click_prefer = 0),
    (r.double_click_pass = 0),
    (r.en_mjp = false),
    (r.bianjietishi = true),
    r
  ;
  })(Laya.Script);
  t.DesktopMgr = a;
})(view || (view = {}));