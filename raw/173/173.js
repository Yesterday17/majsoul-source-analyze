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
  uiscript;
!(function(t) {
  var e,
    i = (function() {
      function t(t) {
        var e = this;
        (this._show_hand = !1),
          (this._show_paopai = !1),
          (this.me = t),
          (this._btn_out = this.me.getChildByName('btn_out')),
          (this._btn_out.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.switch();
            },
            null,
            !1
          )),
          (this.me.getChildByName(
            'btn_shoupai'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              (e._show_hand = !e._show_hand),
                (e._choosed_show_hand.visible = e._show_hand),
                view.DesktopMgr.Inst.onShowHandChange(e._show_hand);
            },
            null,
            !1
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
            function() {
              (e._show_paopai = !e._show_paopai),
                (e._choosed_show_paopai.visible = e._show_paopai),
                view.DesktopMgr.Inst.onShowPaopaiChange(e._show_paopai);
            },
            null,
            !1
          )),
          (this._choosed_show_paopai = this.me
            .getChildByName('btn_paopai')
            .getChildByName('choosed')),
          (this.me.getChildByName('label_word').visible =
            'chs' == GameMgr.client_language),
          (this.me.getChildByName('img_set').visible =
            'chs' != GameMgr.client_language);
      }
      return (
        (t.prototype.reset = function() {
          Laya.Tween.clearAll(this),
            (this._show_hand = !1),
            (this.me.x = -258),
            (this._btn_out.disabled = !1),
            (this._choosed_show_hand.visible = this._show_hand),
            (this._show_paopai = !1),
            (this._choosed_show_paopai.visible = this._show_paopai);
        }),
        (t.prototype.switch = function() {
          var t = this,
            e = -258;
          this.me.x < -100 && (e = -5),
            (this._btn_out.disabled = !0),
            Laya.Tween.to(
              this.me,
              { x: e },
              200,
              Laya.Ease.strongOut,
              Laya.Handler.create(this, function() {
                t._btn_out.disabled = !1;
              }),
              0,
              !0,
              !0
            );
        }),
        t
      );
    })();
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.gameing = 1)] = 'gameing'),
      (t[(t.end = 2)] = 'end'),
      (t[(t.interrupt = 3)] = 'interrupt');
  })(e || (e = {}));
  var n = (function(n) {
    function a() {
      var t = n.call(this, new ui.mj.live_broadcastUI()) || this;
      return (
        (t.state = e.none),
        (t.segments = []),
        (t._time0 = 0),
        (t._time_start = 0),
        (t.segment_index = 0),
        (t.unit_index = 0),
        (t.during_asknew = !1),
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
    return (
      __extends(a, n),
      (a.fetchInfo = function(e, i) {
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchGameLiveInfo',
          { game_uuid: e },
          function(n, a) {
            n || a.error
              ? (t.UIMgr.Inst.showNetReqError('fetchGameLiveInfo', n, a),
                i && i.runWith({ success: !1 }))
              : (app.Log.log('fetchGameLiveInfo res:' + JSON.stringify(a)),
                a.left_start_seconds
                  ? t.UI_WaitOb.Inst.show(e, a.left_start_seconds, i)
                  : i && i.runWith({ success: !0, data: a }));
          }
        );
      }),
      (a.goToWatch = function(e, i, n) {
        var r = this;
        app.Log.log('goToWatch res:' + JSON.stringify(i)),
          t.UI_Loading.Inst.show('enter_mj'),
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
                'goToWatch ' + JSON.stringify(s.players[l]) + '未找到位置'
              );
        }
        var u = game.Tools.strOfLocalization(2003),
          _ = s.game_config.mode;
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
                is_upgraded: !1
              }
            });
        game.Scene_MJ.Inst.openMJRoom(
          o,
          Laya.Handler.create(this, function() {
            view.DesktopMgr.Inst.initRoom(
              JSON.parse(JSON.stringify(s.game_config)),
              o,
              n,
              view.EMJMode.live_broadcast,
              Laya.Handler.create(r, function() {
                t.UI_Loading.Inst.setProgressVal(0.7),
                  Laya.timer.once(1e3, r, function() {
                    GameMgr.Inst.EnterMJ(),
                      t.UI_Loading.Inst.setProgressVal(0.8),
                      a.Inst.startLive(e, i);
                  });
              })
            );
          }),
          Laya.Handler.create(
            this,
            function(e) {
              return t.UI_Loading.Inst.setProgressVal(0.7 * e);
            },
            null,
            !1
          )
        );
      }),
      (a.prototype.onCreate = function() {
        this.guanzhanconfig = new i(this.me.getChildByName('config'));
      }),
      (a.prototype.onDisable = function() {
        Laya.timer.clearAll(this);
      }),
      (a.prototype._doRecord = function(t, e, i) {
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
          var n = {};
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
      (a.prototype._doFastRecord = function(t, e, i) {
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
      (a.prototype._doUnit = function(e, i, n) {
        if (i) {
          if (1 == e.category)
            return (
              this._doFastRecord(e.name, e.data, n),
              view.DesktopMgr.Inst.timestoped || (this.time_stop_length = 0),
              0
            );
          if ('GameNewRoundState' == e.name) {
            for (r = 0; r < e.data.seat_states.length; r++)
              view.DesktopMgr.player_link_state[r] = e.data.seat_states[r];
            t.UI_DesktopInfo.Inst.refreshLinks();
          } else
            'NotifyGameEndResult' == e.name
              ? ((view.DesktopMgr.Inst.gameEndResult = e.data.result),
                (this.enable = !1),
                t.UIMgr.Inst.ShowGameEnd())
              : 'NotifyPlayerConnectionState' == e.name
              ? t.UI_DesktopInfo.Inst.onPlayerConnectionState(e.data)
              : 'GameEndAction' == e.name
              ? 3 == e.data.state &&
                t.UI_Popout.PopOutNoTitle(
                  game.Tools.strOfLocalization(16),
                  Laya.Handler.create(this, function() {
                    game.Scene_MJ.Inst.ForceOut();
                  })
                )
              : 'NotifyGamePause' == e.name &&
                (view.DesktopMgr.Inst.setGameStop(e.data.paused),
                this.time_stop_start_time > 0 &&
                  (this.time_stop_length +=
                    e.timestamp - this.time_stop_start_time),
                view.DesktopMgr.Inst.timestoped
                  ? (this.time_stop_start_time = e.timestamp)
                  : (this.time_stop_start_time = -1));
          return -1;
        }
        if (1 == e.category) {
          var a = this._doRecord(e.name, e.data, n);
          return (
            view.DesktopMgr.Inst.timestoped || (this.time_stop_length = 0), a
          );
        }
        if ('GameNewRoundState' == e.name) {
          for (var r = 0; r < e.data.seat_states.length; r++)
            view.DesktopMgr.player_link_state[r] = e.data.seat_states[r];
          t.UI_DesktopInfo.Inst.refreshLinks();
        } else
          'NotifyGameEndResult' == e.name
            ? ((view.DesktopMgr.Inst.gameEndResult = e.data.result),
              (this.enable = !1),
              t.UIMgr.Inst.ShowGameEnd())
            : 'NotifyGameBroadcast' == e.name
            ? t.UI_DesktopInfo.Inst.onGameBroadcast(e.data)
            : 'NotifyPlayerConnectionState' == e.name
            ? t.UI_DesktopInfo.Inst.onPlayerConnectionState(e.data)
            : 'GameEndAction' == e.name
            ? 3 == e.data.state &&
              t.UI_Popout.PopOutNoTitle(
                game.Tools.strOfLocalization(16),
                Laya.Handler.create(this, function() {
                  game.Scene_MJ.Inst.ForceOut();
                })
              )
            : 'NotifyGamePause' == e.name &&
              (view.DesktopMgr.Inst.setGameStop(e.data.paused),
              this.time_stop_start_time > 0 &&
                (this.time_stop_length +=
                  e.timestamp - this.time_stop_start_time),
              view.DesktopMgr.Inst.timestoped
                ? (this.time_stop_start_time = e.timestamp)
                : (this.time_stop_start_time = -1));
        return -1;
      }),
      (a.prototype._parseUnit = function(t) {
        var e = net.MessageWrapper.decodeMessage(t.action_data);
        return {
          timestamp: t.timestamp,
          category: t.action_category,
          name: e.$type.name,
          data: e
        };
      }),
      (a.prototype._loadUnit = function(t, e, i) {
        var n = this,
          a = new Laya.HttpRequest();
        a.once(Laya.Event.COMPLETE, this, function(e) {
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
        }),
          a.once(Laya.Event.ERROR, this, function(e) {
            i && i.runWith({ success: !1, id: t });
          });
        a.send(e, '', 'get', 'arraybuffer', []);
      }),
      (a.prototype.startLive = function(e, i) {
        var n = this;
        (this.segment_index = 0),
          (this.segments = []),
          (this._time0 = i.now_millisecond);
        var a = 0,
          r = !1;
        (this.game_uuid = e),
          (this.enable = !0),
          this.guanzhanconfig.reset(),
          (this.do_unit_cd = 0);
        for (
          var s = function(e) {
              if (!r)
                if (
                  (app.Log.log('loadover0 ' + JSON.stringify(e)), e.success)
                ) {
                  for (var i = 0; i < n.segments.length; i++)
                    if (n.segments[i].segment_id == e.id) {
                      (n.segments[i].units = e.units),
                        (n.segments[i].loaded = !0);
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
                    (r = !0),
                    t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(15)
                    ),
                    n._forceQuit();
            },
            o = 0;
          o < i.segments.length;
          o++
        ) {
          var l = i.segments[o].segment_id,
            h = i.segments[o].segment_uri;
          this.segments.push({ segment_id: l, uri: h, units: [], loaded: !1 }),
            this._loadUnit(l, h, Laya.Handler.create(this, s));
        }
      }),
      (a.prototype._onFirstLoadOver = function() {
        var i = this;
        if (this._fastSync()) {
          t.UI_Loading.Inst.close(), (this.state = e.gameing);
          var n = this.segments[this.segments.length - 1].units,
            a = n[n.length - 1].timestamp;
          (this.segment_end_millisecond = a),
            app.Log.log('fastSync over'),
            Laya.timer.loop(
              100,
              this,
              function() {
                i._timeDoAction(!1);
              },
              null,
              !0
            ),
            Laya.timer.loop(
              3700,
              this,
              function() {
                i._askNewSegment();
              },
              null,
              !1
            );
        }
      }),
      (a.prototype._unitIsTimeLast = function(t, e) {
        if (t >= this.segments.length) return !0;
        var i = this.segments[t];
        if (!i.loaded) return !0;
        if (i.units.length <= e) return this._unitIsTimeLast(t + 1, 0);
        var n = this._time0 + Laya.timer.currTimer - this._time_start,
          a = i.units[e];
        return (
          a.timestamp > n || (2 == a.category && this._unitIsTimeLast(t, e + 1))
        );
      }),
      (a.prototype._getTimeStop = function(t, e, i) {
        var n = 0;
        if (
          (i > 0 &&
            (n = this._time0 + Laya.timer.currTimer - this._time_start - i),
          t >= this.segments.length)
        )
          return n;
        var a = this.segments[t];
        if (!a.loaded) return n;
        if (a.units.length <= e) return this._getTimeStop(t + 1, 0, i);
        var r = a.units[e],
          s = this._time0 + Laya.timer.currTimer - this._time_start;
        if (r.timestamp > s) return n;
        if (1 == r.category) return 0;
        if ('NotifyGamePause' == r.name) {
          var o = 0;
          return (
            i > 0 && (o += r.timestamp - i),
            (i = r.data.paused ? r.timestamp : -1),
            o + this._getTimeStop(t, e + 1, i)
          );
        }
        return this._getTimeStop(t, e + 1, i);
      }),
      (a.prototype._timeDoAction = function(t) {
        if (this.segment_index >= this.segments.length) return !1;
        var e = this.segments[this.segment_index];
        if (!e.loaded) return !1;
        if (
          this.segment_index == this.segments.length - 1 &&
          this.unit_index >= e.units.length
        )
          return !1;
        var i = e.units[this.unit_index],
          n = this._time0 + Laya.timer.currTimer - this._time_start;
        if (i.timestamp > n) return !0;
        if (
          (app.Log.log('_timeDoAction name:'), 'NotifyGameEndResult' == i.name)
        )
          return !0;
        if (
          1 == i.category &&
          Laya.timer.currTimer < this.do_unit_cd &&
          'RecordNewRound' != i.name
        )
          return !0;
        var a = this._unitIsTimeLast(this.segment_index, this.unit_index + 1);
        if (
          (a &&
            (n -= this._getTimeStop(
              this.segment_index,
              this.unit_index + 1,
              this.time_stop_start_time
            )),
          t)
        )
          a ? this._doUnit(i, !0, n - i.timestamp) : this._doUnit(i, !0, -1);
        else {
          var r = this._doUnit(i, !1, n - i.timestamp);
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
        var i = this;
        if (
          this.state == e.gameing &&
          !(this.during_asknew || this.retry_loadtime >= 3) &&
          this.segments[this.segments.length - 1].loaded
        ) {
          this._time0 + Laya.timer.currTimer - this._time_start + 15e3 <
            this.segment_end_millisecond ||
            ((this.during_asknew = !0),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchGameLiveLeftSegment',
              {
                game_uuid: this.game_uuid,
                last_segment_id: this.segments[this.segments.length - 1]
                  .segment_id
              },
              function(e, n) {
                if (((i.during_asknew = !1), e || n.error))
                  i.retry_loadtime++,
                    i.retry_loadtime >= 3 &&
                      t.UIMgr.Inst.showNetReqError(
                        'fetchGameLiveLeftSegment',
                        e,
                        n
                      );
                else {
                  (i.retry_loadtime = 0), (i.state = n.live_state);
                  var a = n.segments;
                  i.segment_end_millisecond = n.segment_end_millisecond;
                  for (
                    var r = function(t) {
                        if (t.success)
                          for (var e = 0; e < i.segments.length; e++)
                            if (i.segments[e].segment_id == t.id) {
                              (i.segments[e].units = t.units),
                                (i.segments[e].loaded = !0);
                              break;
                            }
                      },
                      s = i.segments[i.segments.length - 1].segment_id,
                      o = 0;
                    o < a.length;
                    o++
                  ) {
                    var l = a[o].segment_id,
                      h = a[o].segment_uri;
                    l <= s ||
                      (i.segments.push({
                        segment_id: l,
                        uri: h,
                        units: [],
                        loaded: !1
                      }),
                      i._loadUnit(l, h, Laya.Handler.create(i, r, null, !1)));
                  }
                }
              }
            ));
        }
      }),
      (a.prototype._forceQuit = function() {
        (this.state = e.none), (this.enable = !1), GameMgr.Inst.EnterLobby();
      }),
      (a.prototype._fastSync = function() {
        var e = -1,
          i = -1;
        (this.time_stop_start_time = -1), (this.time_stop_length = 0);
        for (var n = 0; n < this.segments.length; n++)
          for (var a = this.segments[n], r = 0; r < a.units.length; r++)
            a.units[r].timestamp <= this._time0 &&
              'RecordNewRound' == a.units[r].name &&
              ((e = n), (i = r));
        if (
          (app.Log.log('_fastSync1: segment=' + e + ', unit=' + i), -1 == e)
        ) {
          e = 0;
          for (var a = this.segments[0], r = 0; r < a.units.length; r++)
            if ('RecordNewRound' == a.units[r].name) {
              (e = 0), (i = r), (this._time0 = a.units[r].timestamp - 50);
              break;
            }
        }
        return (
          app.Log.log('_fastSync2: segment=' + e + ', unit=' + i),
          -1 == i
            ? (app.Log.Error('给的数据没有RecordNewRound'),
              t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(15)),
              this._forceQuit(),
              !1)
            : ((this.segment_index = e),
              (this.unit_index = i),
              (this._time_start = Laya.timer.currTimer),
              this._timeDoAction(!0),
              !0)
        );
      }),
      (a.prototype.onChangeMainbody = function() {
        (this._time0 = this._time0 + Laya.timer.currTimer - this._time_start),
          (this._time_start = Laya.timer.currTimer),
          (this.do_unit_cd = 0),
          this._fastSync();
      }),
      (a.prototype.onScoreChangeConfirm = function() {
        if (((this.do_unit_cd = 0), this.segment_index >= this.segments.length))
          return !1;
        var e = this.segments[this.segment_index];
        if (!e.loaded) return !1;
        if (
          this.segment_index == this.segments.length - 1 &&
          this.unit_index >= e.units.length
        )
          return !1;
        var i = e.units[this.unit_index];
        'NotifyGameEndResult' == i.name &&
          ((t.UI_ScoreChange.Inst.enable = !1), this._doUnit(i, !1, 0));
      }),
      a
    );
  })(t.UIBase);
  t.UI_Live_Broadcast = n;
})(uiscript || (uiscript = {}));