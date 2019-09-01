let app;
!(t => {
  const e = (() => {
    function e() {}
    return Object.defineProperty(e, 'lobby_ip', {
      get() {
        return this._lobby_ip;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(e, 'mj_ip', {
      get() {
        return this._mj_ip;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(e, 'lobby_network_delay', {
      get() {
        return this._socket_lobby
          ? this._socket_lobby.getNetworkDelay()
          : 1e7;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(e, 'mj_network_delay', {
      get() {
        return this._socket_mj ? this._socket_mj.getNetworkDelay() : 1e7;
      },
      enumerable: true,
      configurable: true
    }),
    (e.init = function() {
      (this._socket_lobby = new net.Socket(
        ['Lobby'],
        Laya.Handler.create(this, this.onReceiveMsgError, null, false)
      )),
        (this._socket_mj = new net.Socket(
          ['FastTest'],
          Laya.Handler.create(this, this.onReceiveMsgError, null, false)
        ));
    }),
    (e.connect2Lobby = function(t, e) {
      this._socket_lobby.addSocketLister(e),
        this._socket_lobby.connect(
          (GameMgr.inHttps ? 'wss://' : 'ws://') + t
        ),
        (this._lobby_ip = t);
    }),
    (e.sendMsg2Lobby = function(t, e) {
      this._socket_lobby.sendMessage(`.lq.${t}`, e);
    }),
    (e.isLobbyConnectOK = () => !!game.LobbyNetMgr.Inst &&
    game.LobbyNetMgr.Inst.connect_state == game.EConnectState.connecting),
    (e.sendReq2Lobby = function(e, i, n, a) {
      if (game.LobbyNetMgr.Inst) {
        if (
          game.LobbyNetMgr.Inst.connect_state != game.EConnectState.connecting
        ) {
          r = `发送${i}时,`;
          switch (game.LobbyNetMgr.Inst.connect_state) {
            case game.EConnectState.none:
              r += '连接不存在';
              break;
            case game.EConnectState.tryconnect:
              r += '连接正在尝试';
              break;
            case game.EConnectState.reconnecting:
              r += '连接重试重连';
              break;
            case game.EConnectState.disconnect:
              r += '连接已断开';
          }
          return (
            t.Log.log(r),
            uiscript.UIMgr.Inst &&
              (GameMgr.inRelease
                ? uiscript.UIMgr.Inst.ShowErrorInfo(
                    game.Tools.strOfLocalization(2006)
                  )
                : uiscript.UIMgr.Inst.ShowErrorInfo(r)),
            false
          );
        }
        return this._socket_lobby.sendRequest(e, i, n, a), true;
      }
      var r = `发送${i}时LobbyNetMgr不存在`;
      return (
        t.Log.log(r),
        uiscript.UIMgr.Inst &&
          !GameMgr.inRelease &&
          uiscript.UIMgr.Inst.ShowErrorInfo(r),
        false
      );
    }),
    (e.AddListener2Lobby = function(t, e) {
      (e.once = false), this._socket_lobby.addMsgListener(`.lq.${t}`, e);
    }),
    (e.RemoveListener2Lobby = function(t, e) {
      this._socket_lobby.removeMsgListener(`.lq.${t}`, e);
    }),
    (e.connect2MJ = function(t, e) {
      this._socket_mj.addSocketLister(e),
        this._socket_mj.connect((GameMgr.inHttps ? 'wss://' : 'ws://') + t),
        (this._mj_ip = t);
    }),
    (e.sendMsg2MJ = function(t, e) {
      this._socket_mj.sendMessage(`.lq.${t}`, e);
    }),
    (e.isMJConnectOK = () => game.MJNetMgr.Inst &&
    game.MJNetMgr.Inst.connect_state == game.EConnectState.connecting),
    (e.sendReq2MJ = function(e, i, n, a) {
      if (game.MJNetMgr.Inst) {
        if (
          game.MJNetMgr.Inst.connect_state != game.EConnectState.connecting
        ) {
          r = `发送${i}时,`;
          switch (game.MJNetMgr.Inst.connect_state) {
            case game.EConnectState.none:
              r += '连接不存在';
              break;
            case game.EConnectState.tryconnect:
              r += '连接正在尝试';
              break;
            case game.EConnectState.reconnecting:
              r += '连接重试重连';
              break;
            case game.EConnectState.disconnect:
              r += '连接已断开';
          }
          return (
            t.Log.log(r),
            GameMgr.inRelease
              ? 'checkNetworkDelay' != i &&
                uiscript.UIMgr.Inst.ShowErrorInfo(
                  game.Tools.strOfLocalization(2006)
                )
              : uiscript.UIMgr.Inst.ShowErrorInfo(r),
            false
          );
        }
        return this._socket_mj.sendRequest(e, i, n, a), true;
      }
      var r = `发送${i}时MJNetMgr不存在`;
      return (
        t.Log.log(r),
        uiscript.UIMgr.Inst &&
          !GameMgr.inRelease &&
          uiscript.UIMgr.Inst.ShowErrorInfo(r),
        false
      );
    }),
    (e.AddListener2MJ = function(t, e) {
      (e.once = false), this._socket_mj.addMsgListener(`.lq.${t}`, e);
    }),
    (e.Close2MJ = function() {
      this._socket_mj && (this._socket_mj.close(), (this._mj_ip = ''));
    }),
    (e.Close2Lobby = function() {
      t.Log.info_net('NetAgent Close2Lobby'),
        this._socket_lobby &&
          (this._socket_lobby.close(), (this._lobby_ip = ''));
    }),
    (e.onReceiveMsgError = ({method, info}) => {
      if (game.LobbyNetMgr.Inst.isOK) {
        let i = '';
        (i += `acc:${GameMgr.Inst.account_id}`),
          (i += `,处理[${method}]代码出错:{${info}}`),
          (i += `,deviceinfo:${JSON.stringify(game.Tools.deviceInfo)}`),
          t.NetAgent.sendReq2Lobby(
            'Lobby',
            'clientMessage',
            { timestamp: Math.floor(Date.now() / 1e3), message: i },
            (t, e) => {}
          );
      }
    }),
    (e._lobby_ip = ''),
    (e._mj_ip = ''),
    (e._socket_lobby = null),
    (e._socket_mj = null),
    e
  ;
  })();
  t.NetAgent = e;
})(app || (app = {}));