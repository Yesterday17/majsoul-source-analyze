let game;
!(t => {
  let e;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.tryconnect = 1)] = 'tryconnect'),
      (t[(t.connecting = 2)] = 'connecting'),
      (t[(t.reconnecting = 3)] = 'reconnecting'),
      (t[(t.disconnect = 4)] = 'disconnect');
  })(e = t.EConnectState || (t.EConnectState = {}));
  const i = (() => {
    function i() {
      (this.urls = []),
        (this.link_index = -1),
        (this.servername = ''),
        (this.connect_state = e.none),
        (this.open_func = null),
        (this.reconnect_count = 0),
        (this.reconnect_span = [500, 1e3, 3e3, 6e3, 1e4, 15e3]),
        (this.lasterrortime = 0),
        (this.inMaintenance = false),
        (this.maintenanceInfo = ''),
        (this._connect_listeners = []);
    }
    return Object.defineProperty(i, 'Inst', {
      get() {
        return null == this._Inst ? (this._Inst = new i()) : this._Inst;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(i.prototype, 'isOK', {
      get() {
        return this.connect_state == e.connecting;
      },
      enumerable: true,
      configurable: true
    }),
    (i.prototype.OpenConnect = function(t, n) {
      const a = this;
      if ((app.Log.log('LobbyNetMgr OpenConnect'), this.inMaintenance))
        n && n.runWith({ open: false, maintenance: this.maintenanceInfo });
      else if (
        this.connect_state != e.connecting ||
        (t != i.gateway_region_name && '' != t)
      ) {
        if ('' == (i.gateway_region_name = t)) {
          let r = Laya.LocalStorage.getItem('gateway_region');
          (r && '' != r) || (r = GameMgr.ClientRegion),
            (i.gateway_region_name = r);
        }
        i.gateway_regions[i.gateway_region_name] ||
          (i.gateway_region_name = 'mainland'),
          (this.open_func = null),
          (this.urls.length = 0),
          app.Log.info_net(
            `LobbyNetMgr OpenConnect 2 close: ${this.connect_state}`
          ),
          this.Close(),
          (this.connect_state = e.none),
          (this.open_func = n),
          Laya.timer.once(500, this, () => {
            a._setState(e.tryconnect), a._fetch_gateway();
          });
      } else n && n.runWith({ open: true });
    }),
    (i.prototype.Close = function() {
      app.Log.log('LobbyNetMgr close '),
        app.Log.info_net(
          `LobbyNetMgr Close connect_state:${this.connect_state}`
        ),
        (GameMgr.Inst.logined = false),
        (this.open_func = null),
        this._setState(e.none),
        app.NetAgent.Close2Lobby();
    }),
    (i.prototype._OnConnent = function(i) {
      app.Log.log(`LobbyNetMgr _OnConnent event:${i}`),
        i == Laya.Event.CLOSE || i == Laya.Event.ERROR
          ? Laya.timer.currTimer - this.lasterrortime > 100 &&
            ((this.lasterrortime = Laya.timer.currTimer),
            this.connect_state == e.tryconnect
              ? this._try_to_linknext()
              : this.connect_state == e.connecting
              ? GameMgr.Inst.logined
                ? ((GameMgr.Inst.logined = false),
                  this._setState(e.reconnecting),
                  (this.reconnect_count = 0),
                  this._fetch_gateway(),
                  this._trigger_connect_msg('reconnect'))
                : (this._setState(e.none),
                  this.open_func &&
                    this.open_func.runWith({
                      open: false,
                      info: `${t.Tools.strOfLocalization(11)} tyr`
                    }),
                  (this.open_func = null))
              : this.connect_state == e.reconnecting &&
                this._try_to_linknext())
          : i == Laya.Event.OPEN &&
            (this.connect_state == e.tryconnect
              ? (this._setState(e.connecting),
                this.open_func && this.open_func.runWith({ open: true }),
                (this.open_func = null))
              : this.connect_state == e.reconnecting &&
                (this._setState(e.connecting), this._ReconnectSuccess()));
    }),
    (i.prototype._Reconnect = function() {
      const t = this;
      this.reconnect_count >= this.reconnect_span.length
        ? (app.Log.log('Lobby重连失败'), this._setState(e.disconnect))
        : (Laya.timer.once(
            this.reconnect_span[this.reconnect_count],
            this,
            () => {
              t.connect_state == e.reconnecting &&
                (app.Log.log(
                  `LobbyNetMgr _Reconnect  count:${t.reconnect_count}`
                ),
                t._fetch_gateway());
            }
          ),
          this.reconnect_count++);
    }),
    (i.prototype._ReconnectSuccess = function() {
      const e = this;
      const i = {};
      GameMgr.inConch
        ? (i.device_type = 'app')
        : GameMgr.iniOSWebview
        ? (i.device_type = 'app-ios')
        : (Laya.Browser.onPC && (i.device_type = 'pc'),
          Laya.Browser.onIPad && (i.device_type = 'ipad'),
          Laya.Browser.onMobile && (i.device_type = 'mobile')),
        Laya.Browser.onMac && (i.os = 'mac'),
        Laya.Browser.onIOS && (i.os = 'ios'),
        (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
          (i.os = 'android'),
        Laya.Browser.onWeiXin && (i.browser = 'weixin'),
        Laya.Browser.onSafari && (i.browser = 'safari'),
        Laya.Browser.onFirefox && (i.browser = 'firefox'),
        Laya.Browser.onEdge && (i.browser = 'edge'),
        Laya.Browser.onMiniGame && (i.browser = 'minigame');
      const n = [];
      GameMgr.inGooglePlay && n.push(1),
        GameMgr.inChina && n.push(2),
        -1 == GameMgr.Inst.sociotype
          ? app.NetAgent.sendReq2Lobby(
              'Lobby',
              'login',
              {
                account: GameMgr.Inst.account,
                password: GameMgr.encodeP(GameMgr.Inst.password),
                reconnect: true,
                device: i,
                random_key: GameMgr.device_id,
                client_version: t.ResourceVersion.version,
                currency_platforms: n
              },
              (e, {error}) => {
                e || error
                  ? uiscript.UIMgr.Inst.ShowErrorInfo(
                      t.Tools.strOfLocalization(2007)
                    )
                  : (app.Log.log('LobbyNetMgr 重连成功'),
                    (GameMgr.Inst.logined = true));
              }
            )
          : app.NetAgent.sendReq2Lobby(
              'Lobby',
              'oauth2Login',
              {
                type: GameMgr.Inst.sociotype,
                access_token: GameMgr.Inst.access_token,
                reconnect: true,
                device: i,
                random_key: GameMgr.device_id,
                client_version: t.ResourceVersion.version,
                currency_platforms: n
              },
              (i, {error}) => {
                i || error
                  ? uiscript.UIMgr.Inst.ShowErrorInfo(
                      t.Tools.strOfLocalization(2007)
                    )
                  : (app.Log.log('LobbyNetMgr 重连成功'),
                    (GameMgr.Inst.logined = true),
                    e._trigger_connect_msg('reconnect_success'));
              }
            );
    }),
    (i.prototype._setState = function(t) {
      (this.connect_state = t),
        t == e.disconnect
          ? uiscript.UI_Disconnect.Inst && uiscript.UI_Disconnect.Inst.show()
          : t == e.reconnecting &&
            uiscript.UI_Disconnect.Inst &&
            uiscript.UI_Disconnect.Inst.show(),
        this.refreshCommonShow();
    }),
    (i.prototype.refreshCommonShow = function() {
      GameMgr.inRelease ||
        (null != uiscript.UI_Common.Inst &&
          uiscript.UI_Common.Inst.label_net_lobby &&
          (this.connect_state == e.none
            ? ((uiscript.UI_Common.Inst.label_net_lobby.text =
                `未连接:${this.servername}`),
              (uiscript.UI_Common.Inst.label_net_lobby.color = '#ffffff'))
            : this.connect_state == e.tryconnect
            ? ((uiscript.UI_Common.Inst.label_net_lobby.text =
                `尝试连接:${this.servername}`),
              (uiscript.UI_Common.Inst.label_net_lobby.color = '#ffffff'))
            : this.connect_state == e.connecting
            ? ((uiscript.UI_Common.Inst.label_net_lobby.text =
                `大厅服务器:${this.servername}`),
              (uiscript.UI_Common.Inst.label_net_lobby.color = '#00ff00'))
            : this.connect_state == e.disconnect
            ? ((uiscript.UI_Common.Inst.label_net_lobby.text =
                `大厅服务器:${this.servername} 断开连接`),
              (uiscript.UI_Common.Inst.label_net_lobby.color = '#ff0000'))
            : this.connect_state == e.reconnecting &&
              ((uiscript.UI_Common.Inst.label_net_lobby.text =
                `大厅服务器:${this.servername} 正在重连`),
              (uiscript.UI_Common.Inst.label_net_lobby.color = '#ff0000'))));
    }),
    (i.prototype._fetch_gateway = function() {
      const n = this;
      app.Log.log('_fetch_gateway begin'),
        (this.urls = []),
        (this.link_index = -1);
      i.gateway_url = '', i.gateway_regions[i.gateway_region_name] &&
        (i.gateway_url = i.gateway_regions[i.gateway_region_name]), app.Log.log(
        `${i.gateway_url} ${i.gateway_region_name} ${JSON.stringify(i.gateway_regions)}`
      ), (a => {
        const r = new Laya.HttpRequest();
        r.once(Laya.Event.COMPLETE, n, a => {
          !(a => {
            app.Log.log(`_fetch_gateway return:${a}`);
            const r = JSON.parse(a);
            if (r.maintenance)
              n.connect_state == e.tryconnect
                ? ((n.inMaintenance = true),
                  (n.maintenanceInfo = r.maintenance.message),
                  n.open_func &&
                    n.open_func.runWith({
                      open: false,
                      maintenance: n.maintenanceInfo
                    }),
                  (n.open_func = null),
                  n._setState(e.none))
                : n.connect_state == e.reconnecting &&
                  n._setState(e.disconnect);
            else if (r.servers && r.servers.length > 0) {
              for (
                let s = r.servers, o = t.Tools.deal_gateway(s), l = 0;
                l < o.length;
                l++
              )
                n.urls.push({ name: `${i.gateway_name}_${l}`, url: o[l] });
              (n.link_index = -1), n._try_to_linknext();
            } else
              n.open_func &&
                n.open_func.runWith({
                  open: false,
                  info: t.Tools.strOfLocalization(62)
                }),
                (n.open_func = null),
                n.connect_state == e.tryconnect
                  ? n._setState(e.none)
                  : n._setState(e.disconnect);
          })(a);
        }),
          r.once(Laya.Event.ERROR, n, i => {
            n.connect_state == e.tryconnect
              ? (n.open_func &&
                  n.open_func.runWith({
                    open: false,
                    info: t.Tools.strOfLocalization(61)
                  }),
                (n.open_func = null),
                n._setState(e.none))
              : n.connect_state == e.reconnecting && n._Reconnect();
          });
        const s = [];
        s.push('If-Modified-Since'),
          s.push('0'),
          (a += '?service=ws-gateway'),
          GameMgr.inHttps
            ? (a += '&protocol=ws&ssl=true')
            : (a += '&protocol=ws&ssl=false'),
          r.send(a, '', 'get', 'text', s);
      })(i.gateway_url);
    }),
    (i.prototype._try_to_linknext = function() {
      this.link_index++,
        this.link_index < 0 || this.link_index >= this.urls.length
          ? this.connect_state == e.tryconnect
            ? (this._setState(e.none),
              this.open_func &&
                this.open_func.runWith({
                  open: false,
                  info: t.Tools.strOfLocalization(11)
                }),
              (this.open_func = null))
            : this.connect_state == e.reconnecting && this._Reconnect()
          : ((this.servername = i.gateway_name),
            app.NetAgent.connect2Lobby(
              this.urls[this.link_index].url,
              Laya.Handler.create(this, this._OnConnent, null, false)
            ));
    }),
    (i.prototype.add_connect_listener = function(t) {
      this._connect_listeners.push(t);
    }),
    (i.prototype._trigger_connect_msg = function(t) {
      app.Log.info_net('触发重连');
      for (let e = 0; e < this._connect_listeners.length; e++)
        this._connect_listeners[e].runWith(t);
    }),
    (i.gateway_name = ''),
    (i.gateway_regions = null),
    (i.gateway_region_name = ''),
    (i.gateway_url = ''),
    (i._Inst = null),
    i
  ;
  })();
  t.LobbyNetMgr = i;
})(game || (game = {}));