var game;
!(function(t) {
  var e = (function() {
    function e() {
      var e = this;
      (this.urls = []),
        (this.link_index = -1),
        (this.connect_state = t.EConnectState.none),
        (this.reconnect_count = 0),
        (this.reconnect_span = [500, 1e3, 3e3, 6e3, 1e4, 15e3]),
        (this.playerreconnect = false),
        (this.lasterrortime = 0),
        (this.load_over = false),
        (this.loaded_player_count = 0),
        (this.real_player_count = 0),
        app.NetAgent.AddListener2MJ(
          'NotifyPlayerLoadGameReady',
          Laya.Handler.create(this, function(t) {
            app.Log.log('NotifyPlayerLoadGameReady: ' + JSON.stringify(t)),
              (e.loaded_player_count = t.ready_id_list.length),
              e.load_over &&
                uiscript.UI_Loading.Inst.enable &&
                uiscript.UI_Loading.Inst.showLoadCount(
                  e.loaded_player_count,
                  e.real_player_count
                );
          })
        );
    }
    return (
      Object.defineProperty(e, 'Inst', {
        get: function() {
          return null == this._Inst ? (this._Inst = new e()) : this._Inst;
        },
        enumerable: true,
        configurable: true
      }),
      (e.prototype.OpenConnect = function(e, i, n, a, r) {
        var s = this;
        uiscript.UI_Loading.Inst.show('enter_mj'),
          t.Scene_Lobby.Inst.active && (t.Scene_Lobby.Inst.active = false),
          this.Close(),
          view.BgmListMgr.stopBgm(),
          Laya.timer.once(500, this, function() {
            (s.url = ''),
              (s.token = e),
              (s.game_uuid = i),
              (s.server_location = n),
              (GameMgr.Inst.ingame = true),
              (GameMgr.Inst.mj_server_location = n),
              (GameMgr.Inst.mj_game_token = e),
              (GameMgr.Inst.mj_game_uuid = i),
              (s.playerreconnect = a),
              s._setState(t.EConnectState.tryconnect),
              (s.load_over = false),
              (s.loaded_player_count = 0),
              (s.real_player_count = 0),
              s._fetch_gateway(0);
          });
      }),
      (e.prototype.Close = function() {
        (this.load_over = false),
          app.Log.log('MJNetMgr close'),
          this._setState(t.EConnectState.none),
          app.NetAgent.Close2MJ(),
          (this.url = '');
      }),
      (e.prototype._OnConnent = function(e) {
        app.Log.log('MJNetMgr _OnConnent event:' + e),
          e == Laya.Event.CLOSE || e == Laya.Event.ERROR
            ? Laya.timer.currTimer - this.lasterrortime > 100 &&
              ((this.lasterrortime = Laya.timer.currTimer),
              this.connect_state == t.EConnectState.tryconnect
                ? this._try_to_linknext()
                : this.connect_state == t.EConnectState.connecting
                ? view.DesktopMgr.Inst.active
                  ? ((view.DesktopMgr.Inst.duringReconnect = true),
                    this._setState(t.EConnectState.reconnecting),
                    (this.reconnect_count = 0),
                    this._Reconnect())
                  : (this._setState(t.EConnectState.disconnect),
                    uiscript.UIMgr.Inst.ShowErrorInfo(
                      t.Tools.strOfLocalization(2008)
                    ),
                    t.Scene_MJ.Inst.ForceOut())
                : this.connect_state == t.EConnectState.reconnecting &&
                  this._Reconnect())
            : e == Laya.Event.OPEN &&
              (this.connect_state == t.EConnectState.tryconnect
                ? (this._setState(t.EConnectState.connecting),
                  this._ConnectSuccess())
                : this.connect_state == t.EConnectState.reconnecting &&
                  (this._setState(t.EConnectState.connecting),
                  this._ConnectSuccess()));
      }),
      (e.prototype._Reconnect = function() {
        var e = this;
        t.LobbyNetMgr.Inst.connect_state == t.EConnectState.none ||
        t.LobbyNetMgr.Inst.connect_state == t.EConnectState.disconnect
          ? this._setState(t.EConnectState.disconnect)
          : t.LobbyNetMgr.Inst.connect_state == t.EConnectState.connecting &&
            GameMgr.Inst.logined
          ? this.reconnect_count >= this.reconnect_span.length
            ? this._setState(t.EConnectState.disconnect)
            : (Laya.timer.once(
                this.reconnect_span[this.reconnect_count],
                this,
                function() {
                  e.connect_state == t.EConnectState.reconnecting &&
                    (app.Log.log(
                      'MJNetMgr reconnect count:' + e.reconnect_count
                    ),
                    app.NetAgent.connect2MJ(
                      e.url,
                      Laya.Handler.create(e, e._OnConnent, null, false)
                    ));
                }
              ),
              this.reconnect_count++)
          : Laya.timer.once(1e3, this, this._Reconnect);
      }),
      (e.prototype._try_to_linknext = function() {
        this.link_index++,
          (this.url = ''),
          app.Log.log(
            'mj _try_to_linknext(' +
              this.link_index +
              ') url.length=' +
              this.urls.length
          ),
          this.link_index < 0 || this.link_index >= this.urls.length
            ? (this._setState(t.EConnectState.none),
              uiscript.UIMgr.Inst.ShowErrorInfo(t.Tools.strOfLocalization(59)),
              this._SendDebugInfo(),
              view.DesktopMgr.Inst &&
                !view.DesktopMgr.Inst.active &&
                t.Scene_MJ.Inst.ForceOut())
            : (app.NetAgent.connect2MJ(
                this.urls[this.link_index].url,
                Laya.Handler.create(this, this._OnConnent, null, false)
              ),
              (this.url = this.urls[this.link_index].url));
      }),
      (e.prototype._fetch_gateway = function(e) {
        var i = this;
        (this.urls = []),
          (this.link_index = -1),
          app.Log.log('mj _fetch_gateway retry_count:' + e);
        !(function(n) {
          var a = new Laya.HttpRequest();
          a.once(Laya.Event.COMPLETE, i, function(n) {
            !(function(n) {
              var a = JSON.parse(n);
              if (
                (app.Log.log('mj _fetch_gateway func_success data = ' + n),
                a.maintenance)
              )
                i._setState(t.EConnectState.none),
                  uiscript.UIMgr.Inst.ShowErrorInfo(
                    t.Tools.strOfLocalization(2009)
                  ),
                  view.DesktopMgr.Inst.active || t.Scene_MJ.Inst.ForceOut();
              else if (a.servers && a.servers.length > 0) {
                for (
                  var r = a.servers, s = t.Tools.deal_gateway(r), o = 0;
                  o < s.length;
                  o++
                )
                  i.urls.push({
                    name: t.LobbyNetMgr.gateway_name + '_' + o,
                    url: s[o]
                  });
                (i.link_index = -1), i._try_to_linknext();
              } else
                e < 1
                  ? Laya.timer.once(1e3, i, function() {
                      i._fetch_gateway(e + 1);
                    })
                  : (uiscript.UIMgr.Inst.ShowErrorInfo(
                      t.Tools.strOfLocalization(60)
                    ),
                    i._SendDebugInfo(),
                    view.DesktopMgr.Inst &&
                      !view.DesktopMgr.Inst.active &&
                      t.Scene_MJ.Inst.ForceOut(),
                    i._setState(t.EConnectState.none));
            })(n);
          }),
            a.once(Laya.Event.ERROR, i, function(n) {
              app.Log.log('mj _fetch_gateway func_error'),
                e < 1
                  ? Laya.timer.once(500, i, function() {
                      i._fetch_gateway(e + 1);
                    })
                  : (uiscript.UIMgr.Inst.ShowErrorInfo(
                      t.Tools.strOfLocalization(58)
                    ),
                    i._SendDebugInfo(),
                    view.DesktopMgr.Inst.active || t.Scene_MJ.Inst.ForceOut(),
                    i._setState(t.EConnectState.none));
            });
          var r = [];
          r.push('If-Modified-Since'),
            r.push('0'),
            (n += '?service=ws-game-gateway'),
            GameMgr.inHttps
              ? (n += '&protocol=ws&ssl=true')
              : (n += '&protocol=ws&ssl=false'),
            (n += '&location=' + i.server_location),
            a.send(n, '', 'get', 'text', r),
            app.Log.log('mj _fetch_gateway func_fetch url = ' + n);
        })(t.LobbyNetMgr.gateway_url);
      }),
      (e.prototype._setState = function(e) {
        (this.connect_state = e),
          GameMgr.inRelease ||
            (null != uiscript.UI_Common.Inst &&
              (e == t.EConnectState.none
                ? (uiscript.UI_Common.Inst.label_net_mj.text = '')
                : e == t.EConnectState.tryconnect
                ? ((uiscript.UI_Common.Inst.label_net_mj.text =
                    '尝试连接麻将服务器'),
                  (uiscript.UI_Common.Inst.label_net_mj.color = '#000000'))
                : e == t.EConnectState.connecting
                ? ((uiscript.UI_Common.Inst.label_net_mj.text =
                    '麻将服务器：正常'),
                  (uiscript.UI_Common.Inst.label_net_mj.color = '#00ff00'))
                : e == t.EConnectState.disconnect
                ? ((uiscript.UI_Common.Inst.label_net_mj.text =
                    '麻将服务器：断开连接'),
                  (uiscript.UI_Common.Inst.label_net_mj.color = '#ff0000'),
                  uiscript.UI_Disconnect.Inst &&
                    uiscript.UI_Disconnect.Inst.show())
                : e == t.EConnectState.reconnecting &&
                  ((uiscript.UI_Common.Inst.label_net_mj.text =
                    '麻将服务器：正在重连'),
                  (uiscript.UI_Common.Inst.label_net_mj.color = '#ff0000'),
                  uiscript.UI_Disconnect.Inst &&
                    uiscript.UI_Disconnect.Inst.show())));
      }),
      (e.prototype._ConnectSuccess = function() {
        var e = this;
        app.Log.log('MJNetMgr _ConnectSuccess '),
          (this.load_over = false),
          app.NetAgent.sendReq2MJ(
            'FastTest',
            'authGame',
            {
              account_id: GameMgr.Inst.account_id,
              token: this.token,
              game_uuid: this.game_uuid
            },
            function(i, n) {
              if (i || n.error)
                uiscript.UIMgr.Inst.showNetReqError('authGame', i, n),
                  t.Scene_MJ.Inst.GameEnd(),
                  view.BgmListMgr.PlayLobbyBgm();
              else {
                app.Log.log('麻将桌验证通过：' + JSON.stringify(n)),
                  uiscript.UI_Loading.Inst.setProgressVal(0.1);
                var a = [];
                view.DesktopMgr.player_link_state = n.state_list;
                var r = t.Tools.strOfLocalization(2003),
                  s = n.game_config.mode;
                view.ERuleMode.Liqi4;
                s.mode < 10
                  ? (view.ERuleMode.Liqi4, (e.real_player_count = 4))
                  : s.mode < 20 &&
                    (view.ERuleMode.Liqi3, (e.real_player_count = 3));
                for (h = 0; h < e.real_player_count; h++) a.push(null);
                s.extendinfo && (r = t.Tools.strOfLocalization(2004)),
                  s.detail_rule &&
                    s.detail_rule.ai_level &&
                    (1 === s.detail_rule.ai_level &&
                      (r = t.Tools.strOfLocalization(2003)),
                    2 === s.detail_rule.ai_level &&
                      (r = t.Tools.strOfLocalization(2004)));
                for (h = 0; h < n.seat_list.length; h++) {
                  var o = n.seat_list[h];
                  if (0 == o)
                    a[h] = {
                      nickname: r,
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
                    };
                  else {
                    0;
                    for (var l = 0; l < n.players.length; l++)
                      if (n.players[l].account_id == o) {
                        a[h] = n.players[l];
                        break;
                      }
                  }
                }
                for (var h = 0; h < e.real_player_count; h++)
                  null == a[h] &&
                    (a[h] = {
                      account: 0,
                      nickname: t.Tools.strOfLocalization(2010),
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
                (e.loaded_player_count = n.ready_id_list.length),
                  e._AuthSuccess(a, n.is_game_start, n.game_config.toJSON());
              }
            }
          );
      }),
      (e.prototype._AuthSuccess = function(e, i, n) {
        var a = this;
        view.DesktopMgr.Inst && view.DesktopMgr.Inst.active
          ? ((this.load_over = true),
            Laya.timer.once(500, this, function() {
              app.Log.log(
                '重连信息1 round_id:' +
                  view.DesktopMgr.Inst.round_id +
                  ' step:' +
                  view.DesktopMgr.Inst.current_step
              ),
                view.DesktopMgr.Inst.Reset(),
                (view.DesktopMgr.Inst.duringReconnect = true),
                uiscript.UI_Loading.Inst.setProgressVal(0.2),
                app.NetAgent.sendReq2MJ(
                  'FastTest',
                  'syncGame',
                  {
                    round_id: view.DesktopMgr.Inst.round_id,
                    step: view.DesktopMgr.Inst.current_step
                  },
                  function(e, i) {
                    e || i.error
                      ? (uiscript.UIMgr.Inst.showNetReqError('syncGame', e, i),
                        t.Scene_MJ.Inst.ForceOut())
                      : (app.Log.log('[syncGame] ' + JSON.stringify(i)),
                        i.isEnd
                          ? (uiscript.UIMgr.Inst.ShowErrorInfo(
                              t.Tools.strOfLocalization(2011)
                            ),
                            t.Scene_MJ.Inst.GameEnd())
                          : (uiscript.UI_Loading.Inst.setProgressVal(0.3),
                            view.DesktopMgr.Inst.fetchLinks(),
                            view.DesktopMgr.Inst.Reset(),
                            (view.DesktopMgr.Inst.duringReconnect = true),
                            view.DesktopMgr.Inst.syncGameByStep(
                              i.game_restore
                            )));
                  }
                );
            }))
          : t.Scene_MJ.Inst.openMJRoom(
              e,
              Laya.Handler.create(this, function() {
                view.DesktopMgr.Inst.initRoom(
                  JSON.parse(JSON.stringify(n)),
                  e,
                  GameMgr.Inst.account_id,
                  view.EMJMode.play,
                  Laya.Handler.create(a, function() {
                    i
                      ? Laya.timer.frameOnce(10, a, function() {
                          app.Log.log('重连信息2 round_id:-1 step:' + 1e6),
                            view.DesktopMgr.Inst.Reset(),
                            (view.DesktopMgr.Inst.duringReconnect = true),
                            app.NetAgent.sendReq2MJ(
                              'FastTest',
                              'syncGame',
                              { round_id: '-1', step: 1e6 },
                              function(e, i) {
                                app.Log.log('syncGame ' + JSON.stringify(i)),
                                  e || i.error
                                    ? (uiscript.UIMgr.Inst.showNetReqError(
                                        'syncGame',
                                        e,
                                        i
                                      ),
                                      t.Scene_MJ.Inst.ForceOut())
                                    : (uiscript.UI_Loading.Inst.setProgressVal(
                                        1
                                      ),
                                      view.DesktopMgr.Inst.fetchLinks(),
                                      a._PlayerReconnectSuccess(i));
                              }
                            );
                        })
                      : Laya.timer.frameOnce(10, a, function() {
                          app.Log.log('send enterGame'),
                            view.DesktopMgr.Inst.Reset(),
                            (view.DesktopMgr.Inst.duringReconnect = true),
                            app.NetAgent.sendReq2MJ(
                              'FastTest',
                              'enterGame',
                              {},
                              function(e, i) {
                                e || i.error
                                  ? (uiscript.UIMgr.Inst.showNetReqError(
                                      'enterGame',
                                      e,
                                      i
                                    ),
                                    t.Scene_MJ.Inst.ForceOut())
                                  : (uiscript.UI_Loading.Inst.setProgressVal(1),
                                    app.Log.log('enterGame'),
                                    a._EnterGame(i),
                                    view.DesktopMgr.Inst.fetchLinks());
                              }
                            );
                        });
                  })
                );
              }),
              Laya.Handler.create(
                this,
                function(t) {
                  return uiscript.UI_Loading.Inst.setProgressVal(0.1 + 0.8 * t);
                },
                null,
                false
              )
            );
      }),
      (e.prototype._EnterGame = function(e) {
        app.Log.log('正常进入游戏: ' + JSON.stringify(e)),
          e.is_end
            ? (uiscript.UIMgr.Inst.ShowErrorInfo(
                t.Tools.strOfLocalization(2011)
              ),
              t.Scene_MJ.Inst.GameEnd())
            : e.game_restore
            ? view.DesktopMgr.Inst.syncGameByStep(e.game_restore)
            : (console.log(
                '正常进入游戏：' +
                  Laya.Stat.currentMemorySize / 1024 / 1024 +
                  ' MB'
              ),
              (this.load_over = true),
              this.load_over &&
                uiscript.UI_Loading.Inst.enable &&
                uiscript.UI_Loading.Inst.showLoadCount(
                  this.loaded_player_count,
                  this.real_player_count
                ),
              (view.DesktopMgr.Inst.duringReconnect = false),
              view.DesktopMgr.Inst.StartChainAction(0));
      }),
      (e.prototype._PlayerReconnectSuccess = function(e) {
        app.Log.log('_PlayerReconnectSuccess data:' + JSON.stringify(e)),
          e.isEnd
            ? (uiscript.UIMgr.Inst.ShowErrorInfo(
                t.Tools.strOfLocalization(2011)
              ),
              t.Scene_MJ.Inst.GameEnd())
            : e.game_restore
            ? view.DesktopMgr.Inst.syncGameByStep(e.game_restore)
            : (uiscript.UIMgr.Inst.ShowErrorInfo(
                t.Tools.strOfLocalization(2012)
              ),
              t.Scene_MJ.Inst.ForceOut());
      }),
      (e.prototype._SendDebugInfo = function() {
        var t = {};
        (t.type = '未连接了!!!!!!'),
          (t.logs = app.Log.getCacheLog()),
          GameMgr.Inst.postInfo2Server(t);
      }),
      (e._Inst = null),
      e
    );
  })();
  t.MJNetMgr = e;
})(game || (game = {}));