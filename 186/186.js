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

var uiscript;
!(t => {
  var e;

  var i = (() => {
    class t {
      constructor(t) {
        var e = this;
        this._show_hand = !1;
        this._show_paopai = !1;
        this.me = t;
        this._btn_out = this.me.getChildByName('btn_out');

        this._btn_out.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.switch();
            },
            null,
            !1
          );

        this.me.getChildByName(
            'btn_shoupai'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e._show_hand = !e._show_hand;
              e._choosed_show_hand.visible = e._show_hand;
              view.DesktopMgr.Inst.onShowHandChange(e._show_hand);
            },
            null,
            !1
          );

        this._choosed_show_hand = this.me
            .getChildByName('btn_shoupai')
            .getChildByName('choosed');

        this._choosed_show_paopai = this.me
            .getChildByName('btn_paopai')
            .getChildByName('choosed');

        this.me.getChildByName(
            'btn_paopai'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e._show_paopai = !e._show_paopai;
              e._choosed_show_paopai.visible = e._show_paopai;
              view.DesktopMgr.Inst.onShowPaopaiChange(e._show_paopai);
            },
            null,
            !1
          );

        this._choosed_show_paopai = this.me
            .getChildByName('btn_paopai')
            .getChildByName('choosed');

        this.me.getChildByName('label_word').visible =
            'chs' == GameMgr.client_language;

        this.me.getChildByName('img_set').visible =
            'chs' != GameMgr.client_language;
      }

      reset() {
        Laya.Tween.clearAll(this);
        this._show_hand = !1;
        this.me.x = -258;
        this._btn_out.disabled = !1;
        this._choosed_show_hand.visible = this._show_hand;
        this._show_paopai = !1;
        this._choosed_show_paopai.visible = this._show_paopai;
      }

      switch() {
        var t = this,
          e = -258;
        this.me.x < -100 && (e = -5);
        this._btn_out.disabled = !0;
        Laya.Tween.to(
          this.me,
          { x: e },
          200,
          Laya.Ease.strongOut,
          Laya.Handler.create(this, () => {
            t._btn_out.disabled = !1;
          }),
          0,
          !0,
          !0
        );
      }
    }

    return t;
  })();

  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.gameing = 1)] = 'gameing';
    t[(t.end = 2)] = 'end';
    t[(t.interrupt = 3)] = 'interrupt';
  })(e || (e = {}));
  var n = (n => {
    class a {
      constructor() {
        var t = n.call(this, new ui.mj.live_broadcastUI()) || this;
        t.state = e.none;
        t.segments = [];
        t._time0 = 0;
        t._time_start = 0;
        t.segment_index = 0;
        t.unit_index = 0;
        t.during_asknew = !1;
        t.retry_loadtime = 0;
        t.segment_end_millisecond = 0;
        t.guanzhanconfig = null;
        t.do_unit_cd = 0;
        t.time_stop_length = 0;
        t.time_stop_start_time = 0;
        a.Inst = t;
        return t;
      }

      static goToWatch(e, i, n) {
        var r = this;
        app.Log.log(`goToWatch res:${JSON.stringify(i)}`);
        t.UI_Loading.Inst.show('enter_mj');
        game.Scene_Lobby.Inst.active && (game.Scene_Lobby.Inst.active = !1);
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
        var u = game.Tools.strOfLocalization(2003);
        var _ = s.game_config.mode;
        _.extendinfo && (u = game.Tools.strOfLocalization(2004));

        1 === _.detail_rule.ai_level &&
            (u = game.Tools.strOfLocalization(2003));

        _.detail_rule &&
          _.detail_rule.ai_level &&
          ((2 === _.detail_rule.ai_level && (u = game.Tools.strOfLocalization(2004))));
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
                is_upgraded: !1
              }
            });
        game.Scene_MJ.Inst.openMJRoom(
          _,
          o,
          Laya.Handler.create(this, () => {
            view.DesktopMgr.Inst.initRoom(
              JSON.parse(JSON.stringify(s.game_config)),
              o,
              n,
              view.EMJMode.live_broadcast,
              Laya.Handler.create(r, () => {
                t.UI_Loading.Inst.setProgressVal(0.7);
                Laya.timer.once(1e3, r, () => {
                  GameMgr.Inst.EnterMJ();
                  t.UI_Loading.Inst.setProgressVal(0.8);
                  a.Inst.startLive(e, i);
                });
              })
            );
          }),
          Laya.Handler.create(
            this,
            e => t.UI_Loading.Inst.setProgressVal(0.7 * e),
            null,
            !1
          )
        );
      }

      onCreate() {
        this.guanzhanconfig = new i(this.me.getChildByName('config'));
      }

      onDisable() {
        Laya.timer.clearAll(this);
      }

      _doRecord(t, e, i) {
        try {
          view.DesktopMgr.Inst.ClearOperationShow();
          switch ((t)) {
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
          var n = {};
          n.error = i.message;
          n.stack = i.stack;
          n.method = 'ui_live_broadcast doRecord';
          n.name = t;
          n.data = e;
          GameMgr.Inst.onFatalError(n);
          return 1e6;
        }
        return 0;
      }

      _doFastRecord(t, e, i) {
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
          var n = {};
          n.error = i.message;
          n.stack = i.stack;
          n.method = 'ui_live_broadcast doFastRecord';
          n.name = t;
          n.data = e;
          GameMgr.Inst.onFatalError(n);
          return 1e6;
        }
      }

      _doUnit({name, data, category, timestamp}, i, n) {
        if (i) {
          this._doFastRecord(name, data, n);
          view.DesktopMgr.Inst.timestoped || (this.time_stop_length = 0);
          if (1 == category)
            return 0;
          view.DesktopMgr.Inst.gameEndResult = data.result;
          this.enable = !1;
          view.DesktopMgr.Inst.setGameStop(data.paused);

          this.time_stop_start_time > 0 &&
            (this.time_stop_length +=
              timestamp - this.time_stop_start_time);

          if ('GameNewRoundState' == name) {
            for (r = 0; r < data.seat_states.length; r++)
              view.DesktopMgr.player_link_state[r] = data.seat_states[r];
            t.UI_DesktopInfo.Inst.refreshLinks();
          } else
            'NotifyGameEndResult' == name
              ? (t.UIMgr.Inst.ShowGameEnd())
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
                ((view.DesktopMgr.Inst.timestoped ? this.time_stop_start_time = timestamp : this.time_stop_start_time = -1));
          return -1;
        }
        if (1 == category) {
          var a = this._doRecord(name, data, n);
          view.DesktopMgr.Inst.timestoped || (this.time_stop_length = 0);
          return a;
        }
        view.DesktopMgr.Inst.gameEndResult = data.result;
        this.enable = !1;
        view.DesktopMgr.Inst.setGameStop(data.paused);

        this.time_stop_start_time > 0 &&
          (this.time_stop_length +=
            timestamp - this.time_stop_start_time);

        if ('GameNewRoundState' == name) {
          for (var r = 0; r < data.seat_states.length; r++)
            view.DesktopMgr.player_link_state[r] = data.seat_states[r];
          t.UI_DesktopInfo.Inst.refreshLinks();
        } else
          'NotifyGameEndResult' == name
            ? (t.UIMgr.Inst.ShowGameEnd())
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
              ((view.DesktopMgr.Inst.timestoped ? this.time_stop_start_time = timestamp : this.time_stop_start_time = -1));
        return -1;
      }

      _parseUnit({action_data, timestamp, action_category}) {
        var e = net.MessageWrapper.decodeMessage(action_data);
        return {
          timestamp: timestamp,
          category: action_category,
          name: e.$type.name,
          data: e
        };
      }

      _loadUnit(t, e, i) {
        var n = this;
        var a = new Laya.HttpRequest();

        a.once(Laya.Event.COMPLETE, this, e => {
          if (i) {
            var a = new Laya.Byte();
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
            i.runWith({ success: !0, id: t, units: s });
          }
        });

        a.once(Laya.Event.ERROR, this, e => {
          i && i.runWith({ success: !1, id: t });
        });
        a.send(e, '', 'get', 'arraybuffer', []);
      }

      startLive(e, {now_millisecond, segments}) {
        var n = this;
        this.segment_index = 0;
        this.segments = [];
        this._time0 = now_millisecond;
        var a = 0;
        var r = !1;
        this.game_uuid = e;
        this.enable = !0;
        this.guanzhanconfig.reset();
        this.do_unit_cd = 0;
        for (
          var s = e => {
            app.Log.log(`loadover0 ${JSON.stringify(e)}`);
            app.Log.log('loadover2');
            r = !0;

            t.UIMgr.Inst.ShowErrorInfo(
              game.Tools.strOfLocalization(15)
            );

            if (!r)
              if (
                (e.success)
              ) {
                for (var i = 0; i < n.segments.length; i++)
                  if (n.segments[i].segment_id == e.id) {
                    n.segments[i].units = e.units;
                    n.segments[i].loaded = !0;
                    break;
                  }
                app.Log.log('loadover1');
                a++;

                t.UI_Loading.Inst.setProgressVal(
                  0.8 + (a / n.segments.length) * 0.2
                );

                a == n.segments.length && n._onFirstLoadOver();
              } else
                n._forceQuit();
          },
            o = 0;
          o < segments.length;
          o++
        ) {
          var l = segments[o].segment_id;
          var h = segments[o].segment_uri;
          this.segments.push({ segment_id: l, uri: h, units: [], loaded: !1 });
          this._loadUnit(l, h, Laya.Handler.create(this, s));
        }
      }

      _onFirstLoadOver() {
        var i = this;
        if (this._fastSync()) {
          t.UI_Loading.Inst.close();
          this.state = e.gameing;
          var n = this.segments[this.segments.length - 1].units;
          var a = n[n.length - 1].timestamp;
          this.segment_end_millisecond = a;
          app.Log.log('fastSync over');

          Laya.timer.loop(
            100,
            this,
            () => {
              i._timeDoAction(!1);
            },
            null,
            !0
          );

          Laya.timer.loop(
            3700,
            this,
            () => {
              i._askNewSegment();
            },
            null,
            !1
          );
        }
      }

      _unitIsTimeLast(t, e) {
        if (t >= this.segments.length) return !0;
        var i = this.segments[t];
        if (!i.loaded) return !0;
        if (i.units.length <= e) return this._unitIsTimeLast(t + 1, 0);
        var n = this._time0 + Laya.timer.currTimer - this._time_start;
        var a = i.units[e];
        return (
          a.timestamp > n || (2 == a.category && this._unitIsTimeLast(t, e + 1))
        );
      }

      _getTimeStop(t, e, i) {
        var n = 0;

        i > 0 &&
            (n = this._time0 + Laya.timer.currTimer - this._time_start - i);

        if (
          (t >= this.segments.length)
        )
          return n;
        var a = this.segments[t];
        if (!a.loaded) return n;
        if (a.units.length <= e) return this._getTimeStop(t + 1, 0, i);
        var r = a.units[e];
        var s = this._time0 + Laya.timer.currTimer - this._time_start;
        if (r.timestamp > s) return n;
        if (1 == r.category) return 0;
        if ('NotifyGamePause' == r.name) {
          var o = 0;
          i > 0 && (o += r.timestamp - i);
          i = r.data.paused ? r.timestamp : -1;
          return o + this._getTimeStop(t, e + 1, i);
        }
        return this._getTimeStop(t, e + 1, i);
      }

      _timeDoAction(t) {
        if (this.segment_index >= this.segments.length) return !1;
        var e = this.segments[this.segment_index];
        if (!e.loaded) return !1;
        if (
          this.segment_index == this.segments.length - 1 &&
          this.unit_index >= e.units.length
        )
          return !1;
        var i = e.units[this.unit_index];
        var n = this._time0 + Laya.timer.currTimer - this._time_start;
        if (i.timestamp > n) return !0;
        app.Log.log('_timeDoAction name:');
        if (
          ('NotifyGameEndResult' == i.name)
        )
          return !0;
        if (
          1 == i.category &&
          Laya.timer.currTimer < this.do_unit_cd &&
          'RecordNewRound' != i.name
        )
          return !0;
        var a = this._unitIsTimeLast(this.segment_index, this.unit_index + 1);

        a &&
            (n -= this._getTimeStop(
              this.segment_index,
              this.unit_index + 1,
              this.time_stop_start_time
            ));

        if (
          (t)
        )
          a ? this._doUnit(i, !0, n - i.timestamp) : this._doUnit(i, !0, -1);
        else {
          var r = this._doUnit(i, !1, n - i.timestamp);
          r > 0 && (this.do_unit_cd = Laya.timer.currTimer + r);
        }
        this.unit_index++;
        this.unit_index = 0;

        this.unit_index >= e.units.length &&
          (this.segment_index++);

        return this._timeDoAction(t);
      }

      _askNewSegment() {
        var i = this;
        if (
          this.state == e.gameing &&
          !(this.during_asknew || this.retry_loadtime >= 3) &&
          this.segments[this.segments.length - 1].loaded
        ) {
          this.during_asknew = !0;
          this._time0 + Laya.timer.currTimer - this._time_start + 15e3 <
            this.segment_end_millisecond ||
            (app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchGameLiveLeftSegment',
            {
              game_uuid: this.game_uuid,
              last_segment_id: this.segments[this.segments.length - 1]
                .segment_id
            },
            (e, n) => {
              i.during_asknew = !1;
              i.retry_loadtime++;
              if ((e || n.error))
                i.retry_loadtime >= 3 &&
                  t.UIMgr.Inst.showNetReqError(
                    'fetchGameLiveLeftSegment',
                    e,
                    n
                  );
              else {
                i.retry_loadtime = 0;
                i.state = n.live_state;
                var a = n.segments;
                i.segment_end_millisecond = n.segment_end_millisecond;
                for (
                  var r = ({success, id, units}) => {
                      if (success)
                        for (var e = 0; e < i.segments.length; e++)
                          if (i.segments[e].segment_id == id) {
                            i.segments[e].units = units;
                            i.segments[e].loaded = !0;
                            break;
                          }
                    },
                    s = i.segments[i.segments.length - 1].segment_id,
                    o = 0;
                  o < a.length;
                  o++
                ) {
                  var l = a[o].segment_id;
                  var h = a[o].segment_uri;

                  i.segments.push({
                      segment_id: l,
                      uri: h,
                      units: [],
                      loaded: !1
                    });

                  l <= s ||
                    (i._loadUnit(l, h, Laya.Handler.create(i, r, null, !1)));
                }
              }
            }
          ));
        }
      }

      _forceQuit() {
        this.state = e.none;
        this.enable = !1;
        GameMgr.Inst.EnterLobby();
      }

      _fastSync() {
        var e = -1;
        var i = -1;
        this.time_stop_start_time = -1;
        this.time_stop_length = 0;
        e = n;
        for (var n = 0; n < this.segments.length; n++)
          for (var a = this.segments[n], r = 0; r < a.units.length; r++)
            a.units[r].timestamp <= this._time0 &&
              'RecordNewRound' == a.units[r].name &&
              ((i = r));
        app.Log.log(`_fastSync1: segment=${e}, unit=${i}`);
        if (
          (-1 == e)
        ) {
          e = 0;
          for (var a = this.segments[0], r = 0; r < a.units.length; r++)
            if ('RecordNewRound' == a.units[r].name) {
              e = 0;
              i = r;
              this._time0 = a.units[r].timestamp - 50;
              break;
            }
        }
        app.Log.log(`_fastSync2: segment=${e}, unit=${i}`);
        app.Log.Error('给的数据没有RecordNewRound');
        t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(15));
        this._forceQuit();
        this.segment_index = e;
        this.unit_index = i;
        this._time_start = Laya.timer.currTimer;
        this._timeDoAction(!0);
        return -1 == i
          ? (!1)
          : (!0);
      }

      onChangeMainbody() {
        this._time0 = this._time0 + Laya.timer.currTimer - this._time_start;
        this._time_start = Laya.timer.currTimer;
        this.do_unit_cd = 0;
        this._fastSync();
      }

      onScoreChangeConfirm() {
        this.do_unit_cd = 0;
        if ((this.segment_index >= this.segments.length))
          return !1;
        var e = this.segments[this.segment_index];
        if (!e.loaded) return !1;
        if (
          this.segment_index == this.segments.length - 1 &&
          this.unit_index >= e.units.length
        )
          return !1;
        var i = e.units[this.unit_index];
        t.UI_ScoreChange.Inst.enable = !1;
        'NotifyGameEndResult' == i.name &&
          (this._doUnit(i, !1, 0));
      }
    }

    __extends(a, n);

    a.fetchInfo = (e, i) => {
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchGameLiveInfo',
        { game_uuid: e },
        (n, a) => {
          t.UIMgr.Inst.showNetReqError('fetchGameLiveInfo', n, a);
          app.Log.log(`fetchGameLiveInfo res:${JSON.stringify(a)}`);
          n || a.error
            ? (i && i.runWith({ success: !1 }))
            : (a.left_start_seconds
            ? t.UI_WaitOb.Inst.show(e, a.left_start_seconds, i)
            : i && i.runWith({ success: !0, data: a }));
        }
      );
    };

    return a;
  })(t.UIBase);
  t.UI_Live_Broadcast = n;
})(uiscript || (uiscript = {}));