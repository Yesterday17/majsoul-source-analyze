let uiscript;
!(t => {
  let e;

  const i = (() => {
    function t(t) {
      const e = this;
      (this._show_hand = false),
        (this._show_paopai = false),
        (this.me = t),
        (this._btn_out = this.me.getChildByName('btn_out')),
        (this._btn_out.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.switch();
          },
          null,
          false
        )),
        (this.me.getChildByName(
          'btn_shoupai'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            (e._show_hand = !e._show_hand),
              (e._choosed_show_hand.visible = e._show_hand),
              view.DesktopMgr.Inst.onShowHandChange(e._show_hand);
          },
          null,
          false
        )),
        (this._choosed_show_hand = this.me
          .getChildByName('btn_shoupai')
          .getChildByName('choosed')),
        (this._choosed_show_paopai = this.me
          .getChildByName('btn_paopai')
          .getChildByName('choosed')),
        (this.me.getChildByName(
          'btn_paopai'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            (e._show_paopai = !e._show_paopai),
              (e._choosed_show_paopai.visible = e._show_paopai),
              view.DesktopMgr.Inst.onShowPaopaiChange(e._show_paopai);
          },
          null,
          false
        )),
        (this._choosed_show_paopai = this.me
          .getChildByName('btn_paopai')
          .getChildByName('choosed')),
        (this.me.getChildByName('label_word').visible =
          'chs' == GameMgr.client_language),
        (this.me.getChildByName('img_set').visible =
          'chs' != GameMgr.client_language);
    }
    return (t.prototype.reset = function() {
      Laya.Tween.clearAll(this),
        (this._show_hand = false),
        (this.me.x = -258),
        (this._btn_out.disabled = false),
        (this._choosed_show_hand.visible = this._show_hand),
        (this._show_paopai = false),
        (this._choosed_show_paopai.visible = this._show_paopai);
    }),
    (t.prototype.switch = function() {
      const t = this;
      let e = -258;
      this.me.x < -100 && (e = -5),
        (this._btn_out.disabled = true),
        Laya.Tween.to(
          this.me,
          { x: e },
          200,
          Laya.Ease.strongOut,
          Laya.Handler.create(this, () => {
            t._btn_out.disabled = false;
          }),
          0,
          true,
          true
        );
    }),
    t
  ;
  })();

  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.gameing = 1)] = 'gameing'),
      (t[(t.end = 2)] = 'end'),
      (t[(t.interrupt = 3)] = 'interrupt');
  })(e || (e = {}));
  const n = (n => {
    function a() {
      const t = n.call(this, new ui.mj.live_broadcastUI()) || this;
      return (
        (t.state = e.none),
        (t.segments = []),
        (t._time0 = 0),
        (t._time_start = 0),
        (t.segment_index = 0),
        (t.unit_index = 0),
        (t.during_asknew = false),
        (t.retry_loadtime = 0),
        (t.segment_end_millisecond = 0),
        (t.guanzhanconfig = null),
        (t.do_unit_cd = 0),
        (t.time_stop_length = 0),
        (t.time_stop_start_time = 0),
        (a.Inst = t),
        t
      );
    }
    return __extends(a, n),
    (a.fetchInfo = (e, i) => {
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchGameLiveInfo',
        { game_uuid: e },
        (n, a) => {
          n || a.error
            ? (t.UIMgr.Inst.showNetReqError('fetchGameLiveInfo', n, a),
              i && i.runWith({ success: false }))
            : (app.Log.log(`fetchGameLiveInfo res:${JSON.stringify(a)}`),
              a.left_start_seconds
                ? t.UI_WaitOb.Inst.show(e, a.left_start_seconds, i)
                : i && i.runWith({ success: true, data: a }));
        }
      );
    }),
    (a.goToWatch = function(e, i, n) {
      const r = this;
      app.Log.log(`goToWatch res:${JSON.stringify(i)}`),
        t.UI_Loading.Inst.show('enter_mj'),
        game.Scene_Lobby.Inst.active && (game.Scene_Lobby.Inst.active = false);
      for (
        var s = i.live_head, o = [null, null, null, null], l = 0;
        l < s.players.length;
        l++
      ) {
        for (var h = -1, c = 0; c < s.seat_list.length; c++)
          if (s.seat_list[c] == s.players[l].account_id) {
            h = c;
            break;
          }
        -1 != h
          ? (o[h] = s.players[l])
          : app.Log.Error(
              `goToWatch ${JSON.stringify(s.players[l])}未找到位置`
            );
      }
      let u = game.Tools.strOfLocalization(2003);
      const _ = s.game_config.mode;
      _.extendinfo && (u = game.Tools.strOfLocalization(2004)),
        _.detail_rule &&
          _.detail_rule.ai_level &&
          (1 === _.detail_rule.ai_level &&
            (u = game.Tools.strOfLocalization(2003)),
          2 === _.detail_rule.ai_level &&
            (u = game.Tools.strOfLocalization(2004)));
      for (l = 0; l < o.length; l++)
        null == o[l] &&
          (o[l] = {
            nickname: u,
            avatar_id: 400101,
            level: { id: 10101 },
            level3: { id: 20101 },
            character: {
              charid: 200001,
              level: 0,
              exp: 0,
              views: [],
              skin: 400101,
              is_upgraded: false
            }
          });
      game.Scene_MJ.Inst.openMJRoom(
        o,
        Laya.Handler.create(this, () => {
          view.DesktopMgr.Inst.initRoom(
            JSON.parse(JSON.stringify(s.game_config)),
            o,
            n,
            view.EMJMode.live_broadcast,
            Laya.Handler.create(r, () => {
              t.UI_Loading.Inst.setProgressVal(0.7),
                Laya.timer.once(1e3, r, () => {
                  GameMgr.Inst.EnterMJ(),
                    t.UI_Loading.Inst.setProgressVal(0.8),
                    a.Inst.startLive(e, i);
                });
            })
          );
        }),
        Laya.Handler.create(
          this,
          e => t.UI_Loading.Inst.setProgressVal(0.7 * e),
          null,
          false
        )
      );
    }),
    (a.prototype.onCreate = function() {
      this.guanzhanconfig = new i(this.me.getChildByName('config'));
    }),
    (a.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (a.prototype._doRecord = (t, e, i) => {
      try {
        switch ((view.DesktopMgr.Inst.ClearOperationShow(), t)) {
          case 'RecordNewRound':
            return view.ActionNewRound.record(e, i);
          case 'RecordDiscardTile':
            return view.ActionDiscardTile.record(e, i);
          case 'RecordDealTile':
            return view.ActionDealTile.record(e, i);
          case 'RecordChiPengGang':
            return view.ActionChiPengGang.record(e, i);
          case 'RecordAnGangAddGang':
            return view.ActionAnGangAddGang.record(e, i);
          case 'RecordHule':
            return view.ActionHule.record(e);
          case 'RecordLiuJu':
            return view.ActionLiuJu.record(e);
          case 'RecordNoTile':
            return view.ActionNoTile.record(e);
          case 'RecordBaBei':
            return view.ActionBabei.record(e);
        }
      } catch (i) {
        const n = {};
        return (
          (n.error = i.message),
          (n.stack = i.stack),
          (n.method = 'ui_live_broadcast doRecord'),
          (n.name = t),
          (n.data = e),
          GameMgr.Inst.onFatalError(n),
          1e6
        );
      }
      return 0;
    }),
    (a.prototype._doFastRecord = (t, e, i) => {
      try {
        switch (t) {
          case 'RecordNewRound':
            view.ActionNewRound.fastrecord(e, i);
            break;
          case 'RecordDiscardTile':
            view.ActionDiscardTile.fastrecord(e, i);
            break;
          case 'RecordDealTile':
            view.ActionDealTile.fastrecord(e, i);
            break;
          case 'RecordChiPengGang':
            view.ActionChiPengGang.fastrecord(e, i);
            break;
          case 'RecordAnGangAddGang':
            view.ActionAnGangAddGang.fastrecord(e, i);
            break;
          case 'RecordHule':
            view.ActionHule.fastrecord(e);
            break;
          case 'RecordLiuJu':
            view.ActionLiuJu.fastrecord(e);
            break;
          case 'RecordNoTile':
            view.ActionNoTile.fastrecord(e);
            break;
          case 'RecordBaBei':
            view.ActionBabei.fastrecord(e);
        }
      } catch (i) {
        const n = {};
        return (
          (n.error = i.message),
          (n.stack = i.stack),
          (n.method = 'ui_live_broadcast doFastRecord'),
          (n.name = t),
          (n.data = e),
          GameMgr.Inst.onFatalError(n),
          1e6
        );
      }
    }),
    (a.prototype._doUnit = function({category, name, data, timestamp}, i, n) {
      if (i) {
        if (1 == category)
          return this._doFastRecord(name, data, n),
          view.DesktopMgr.Inst.timestoped || (this.time_stop_length = 0),
          0
        ;
        if ('GameNewRoundState' == name) {
          for (r = 0; r < data.seat_states.length; r++)
            view.DesktopMgr.player_link_state[r] = data.seat_states[r];
          t.UI_DesktopInfo.Inst.refreshLinks();
        } else
          'NotifyGameEndResult' == name
            ? ((view.DesktopMgr.Inst.gameEndResult = data.result),
              (this.enable = false),
              t.UIMgr.Inst.ShowGameEnd())
            : 'NotifyPlayerConnectionState' == name
            ? t.UI_DesktopInfo.Inst.onPlayerConnectionState(data)
            : 'GameEndAction' == name
            ? 3 == data.state &&
              t.UI_Popout.PopOutNoTitle(
                game.Tools.strOfLocalization(16),
                Laya.Handler.create(this, () => {
                  game.Scene_MJ.Inst.ForceOut();
                })
              )
            : 'NotifyGamePause' == name &&
              (view.DesktopMgr.Inst.setGameStop(data.paused),
              this.time_stop_start_time > 0 &&
                (this.time_stop_length +=
                  timestamp - this.time_stop_start_time),
              view.DesktopMgr.Inst.timestoped
                ? (this.time_stop_start_time = timestamp)
                : (this.time_stop_start_time = -1));
        return -1;
      }
      if (1 == category) {
        const a = this._doRecord(name, data, n);
        return (
          view.DesktopMgr.Inst.timestoped || (this.time_stop_length = 0), a
        );
      }
      if ('GameNewRoundState' == name) {
        for (var r = 0; r < data.seat_states.length; r++)
          view.DesktopMgr.player_link_state[r] = data.seat_states[r];
        t.UI_DesktopInfo.Inst.refreshLinks();
      } else
        'NotifyGameEndResult' == name
          ? ((view.DesktopMgr.Inst.gameEndResult = data.result),
            (this.enable = false),
            t.UIMgr.Inst.ShowGameEnd())
          : 'NotifyGameBroadcast' == name
          ? t.UI_DesktopInfo.Inst.onGameBroadcast(data)
          : 'NotifyPlayerConnectionState' == name
          ? t.UI_DesktopInfo.Inst.onPlayerConnectionState(data)
          : 'GameEndAction' == name
          ? 3 == data.state &&
            t.UI_Popout.PopOutNoTitle(
              game.Tools.strOfLocalization(16),
              Laya.Handler.create(this, () => {
                game.Scene_MJ.Inst.ForceOut();
              })
            )
          : 'NotifyGamePause' == name &&
            (view.DesktopMgr.Inst.setGameStop(data.paused),
            this.time_stop_start_time > 0 &&
              (this.time_stop_length +=
                timestamp - this.time_stop_start_time),
            view.DesktopMgr.Inst.timestoped
              ? (this.time_stop_start_time = timestamp)
              : (this.time_stop_start_time = -1));
      return -1;
    }),
    (a.prototype._parseUnit = ({action_data, timestamp, action_category}) => {
      const e = net.MessageWrapper.decodeMessage(action_data);
      return {
        timestamp: timestamp,
        category: action_category,
        name: e.$type.name,
        data: e
      };
    }),
    (a.prototype._loadUnit = function(t, e, i) {
      const n = this;
      const a = new Laya.HttpRequest();
      a.once(Laya.Event.COMPLETE, this, e => {
        if (i) {
          const a = new Laya.Byte();
          a.writeArrayBuffer(e);
          for (
            var r = net.MessageWrapper.decodeMessage(
                a.getUint8Array(0, a.length)
              ),
              s = [],
              o = 0;
            o < r.actions.length;
            o++
          )
            s.push(n._parseUnit(r.actions[o]));
          i.runWith({ success: true, id: t, units: s });
        }
      }),
        a.once(Laya.Event.ERROR, this, e => {
          i && i.runWith({ success: false, id: t });
        });
      a.send(e, '', 'get', 'arraybuffer', []);
    }),
    (a.prototype.startLive = function(e, {now_millisecond, segments}) {
      const n = this;
      (this.segment_index = 0),
        (this.segments = []),
        (this._time0 = now_millisecond);
      let a = 0;
      let r = false;
      (this.game_uuid = e),
        (this.enable = true),
        this.guanzhanconfig.reset(),
        (this.do_unit_cd = 0);
      for (
        let s = e => {
                if (!r)
                  if (
                    (app.Log.log(`loadover0 ${JSON.stringify(e)}`), e.success)
                  ) {
                    for (let i = 0; i < n.segments.length; i++)
                      if (n.segments[i].segment_id == e.id) {
                        (n.segments[i].units = e.units),
                          (n.segments[i].loaded = true);
                        break;
                      }
                    app.Log.log('loadover1'),
                      a++,
                      t.UI_Loading.Inst.setProgressVal(
                        0.8 + (a / n.segments.length) * 0.2
                      ),
                      a == n.segments.length && n._onFirstLoadOver();
                  } else
                    app.Log.log('loadover2'),
                      (r = true),
                      t.UIMgr.Inst.ShowErrorInfo(
                        game.Tools.strOfLocalization(15)
                      ),
                      n._forceQuit();
              },
            o = 0;
        o < segments.length;
        o++
      ) {
        const l = segments[o].segment_id;
        const h = segments[o].segment_uri;
        this.segments.push({ segment_id: l, uri: h, units: [], loaded: false }),
          this._loadUnit(l, h, Laya.Handler.create(this, s));
      }
    }),
    (a.prototype._onFirstLoadOver = function() {
      const i = this;
      if (this._fastSync()) {
        t.UI_Loading.Inst.close(), (this.state = e.gameing);
        const n = this.segments[this.segments.length - 1].units;
        const a = n[n.length - 1].timestamp;
        (this.segment_end_millisecond = a),
          app.Log.log('fastSync over'),
          Laya.timer.loop(
            100,
            this,
            () => {
              i._timeDoAction(false);
            },
            null,
            true
          ),
          Laya.timer.loop(
            3700,
            this,
            () => {
              i._askNewSegment();
            },
            null,
            false
          );
      }
    }),
    (a.prototype._unitIsTimeLast = function(t, e) {
      if (t >= this.segments.length) return true;
      const i = this.segments[t];
      if (!i.loaded) return true;
      if (i.units.length <= e) return this._unitIsTimeLast(t + 1, 0);
      const n = this._time0 + Laya.timer.currTimer - this._time_start;
      const a = i.units[e];
      return (
        a.timestamp > n || (2 == a.category && this._unitIsTimeLast(t, e + 1))
      );
    }),
    (a.prototype._getTimeStop = function(t, e, i) {
      let n = 0;
      if (
        (i > 0 &&
          (n = this._time0 + Laya.timer.currTimer - this._time_start - i),
        t >= this.segments.length)
      )
        return n;
      const a = this.segments[t];
      if (!a.loaded) return n;
      if (a.units.length <= e) return this._getTimeStop(t + 1, 0, i);
      const r = a.units[e];
      const s = this._time0 + Laya.timer.currTimer - this._time_start;
      if (r.timestamp > s) return n;
      if (1 == r.category) return 0;
      if ('NotifyGamePause' == r.name) {
        let o = 0;
        return (
          i > 0 && (o += r.timestamp - i),
          (i = r.data.paused ? r.timestamp : -1),
          o + this._getTimeStop(t, e + 1, i)
        );
      }
      return this._getTimeStop(t, e + 1, i);
    }),
    (a.prototype._timeDoAction = function(t) {
      if (this.segment_index >= this.segments.length) return false;
      const e = this.segments[this.segment_index];
      if (!e.loaded) return false;
      if (
        this.segment_index == this.segments.length - 1 &&
        this.unit_index >= e.units.length
      )
        return false;
      const i = e.units[this.unit_index];
      let n = this._time0 + Laya.timer.currTimer - this._time_start;
      if (i.timestamp > n) return true;
      if (
        (app.Log.log('_timeDoAction name:'), 'NotifyGameEndResult' == i.name)
      )
        return true;
      if (
        1 == i.category &&
        Laya.timer.currTimer < this.do_unit_cd &&
        'RecordNewRound' != i.name
      )
        return true;
      const a = this._unitIsTimeLast(this.segment_index, this.unit_index + 1);
      if (
        (a &&
          (n -= this._getTimeStop(
            this.segment_index,
            this.unit_index + 1,
            this.time_stop_start_time
          )),
        t)
      )
        a ? this._doUnit(i, true, n - i.timestamp) : this._doUnit(i, true, -1);
      else {
        const r = this._doUnit(i, false, n - i.timestamp);
        r > 0 && (this.do_unit_cd = Laya.timer.currTimer + r);
      }
      return (
        this.unit_index++,
        this.unit_index >= e.units.length &&
          ((this.unit_index = 0), this.segment_index++),
        this._timeDoAction(t)
      );
    }),
    (a.prototype._askNewSegment = function() {
      const i = this;
      if (
        this.state == e.gameing &&
        !(this.during_asknew || this.retry_loadtime >= 3) &&
        this.segments[this.segments.length - 1].loaded
      ) {
        this._time0 + Laya.timer.currTimer - this._time_start + 15e3 <
          this.segment_end_millisecond ||
          ((this.during_asknew = true),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchGameLiveLeftSegment',
            {
              game_uuid: this.game_uuid,
              last_segment_id: this.segments[this.segments.length - 1]
                .segment_id
            },
            (e, n) => {
              if (((i.during_asknew = false), e || n.error))
                i.retry_loadtime++,
                  i.retry_loadtime >= 3 &&
                    t.UIMgr.Inst.showNetReqError(
                      'fetchGameLiveLeftSegment',
                      e,
                      n
                    );
              else {
                (i.retry_loadtime = 0), (i.state = n.live_state);
                const a = n.segments;
                i.segment_end_millisecond = n.segment_end_millisecond;
                for (
                  let r = ({success, id, units}) => {
                          if (success)
                            for (let e = 0; e < i.segments.length; e++)
                              if (i.segments[e].segment_id == id) {
                                (i.segments[e].units = units),
                                  (i.segments[e].loaded = true);
                                break;
                              }
                        },
                      s = i.segments[i.segments.length - 1].segment_id,
                      o = 0;
                  o < a.length;
                  o++
                ) {
                  const l = a[o].segment_id;
                  const h = a[o].segment_uri;
                  l <= s ||
                    (i.segments.push({
                      segment_id: l,
                      uri: h,
                      units: [],
                      loaded: false
                    }),
                    i._loadUnit(l, h, Laya.Handler.create(i, r, null, false)));
                }
              }
            }
          ));
      }
    }),
    (a.prototype._forceQuit = function() {
      (this.state = e.none), (this.enable = false), GameMgr.Inst.EnterLobby();
    }),
    (a.prototype._fastSync = function() {
      let e = -1;
      let i = -1;
      (this.time_stop_start_time = -1), (this.time_stop_length = 0);
      for (let n = 0; n < this.segments.length; n++)
        for (var a = this.segments[n], r = 0; r < a.units.length; r++)
          a.units[r].timestamp <= this._time0 &&
            'RecordNewRound' == a.units[r].name &&
            ((e = n), (i = r));
      if (
        (app.Log.log(`_fastSync1: segment=${e}, unit=${i}`), -1 == e)
      ) {
        e = 0;
        for (var a = this.segments[0], r = 0; r < a.units.length; r++)
          if ('RecordNewRound' == a.units[r].name) {
            (e = 0), (i = r), (this._time0 = a.units[r].timestamp - 50);
            break;
          }
      }
      return app.Log.log(`_fastSync2: segment=${e}, unit=${i}`),
      -1 == i
        ? (app.Log.Error('给的数据没有RecordNewRound'),
          t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(15)),
          this._forceQuit(),
          false)
        : ((this.segment_index = e),
          (this.unit_index = i),
          (this._time_start = Laya.timer.currTimer),
          this._timeDoAction(true),
          true)
    ;
    }),
    (a.prototype.onChangeMainbody = function() {
      (this._time0 = this._time0 + Laya.timer.currTimer - this._time_start),
        (this._time_start = Laya.timer.currTimer),
        (this.do_unit_cd = 0),
        this._fastSync();
    }),
    (a.prototype.onScoreChangeConfirm = function() {
      if (((this.do_unit_cd = 0), this.segment_index >= this.segments.length))
        return false;
      const e = this.segments[this.segment_index];
      if (!e.loaded) return false;
      if (
        this.segment_index == this.segments.length - 1 &&
        this.unit_index >= e.units.length
      )
        return false;
      const i = e.units[this.unit_index];
      'NotifyGameEndResult' == i.name &&
        ((t.UI_ScoreChange.Inst.enable = false), this._doUnit(i, false, 0));
    }),
    a
  ;
  })(t.UIBase);
  t.UI_Live_Broadcast = n;
})(uiscript || (uiscript = {}));