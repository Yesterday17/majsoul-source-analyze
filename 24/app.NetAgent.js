var app;
!(t => {
  class NetAgent {
    static init() {
      this._socket_lobby = new net.Socket(
        ["Lobby"],
        Laya.Handler.create(this, this.onReceiveMsgError, null, false)
      );

      this._socket_mj = new net.Socket(
        ["FastTest"],
        Laya.Handler.create(this, this.onReceiveMsgError, null, false)
      );
    }

    static connect2Lobby(lobbyIP, socketListener) {
      this._socket_lobby.addSocketLister(socketListener);

      this._socket_lobby.connect(
        (GameMgr.inHttps ? "wss://" : "ws://") + lobbyIP
      );

      this._lobby_ip = lobbyIP;
    }

    static sendMsg2Lobby(type, value) {
      this._socket_lobby.sendMessage(`.lq.${type}`, value);
    }

    static sendReq2Lobby(serviceName, rpcName, type, value) {
      if (game.LobbyNetMgr.Inst) {
        // here connecting should be 'connected'
        if (
          game.LobbyNetMgr.Inst.connect_state != game.EConnectState.connecting
        ) {
          // commented by yesterday17: error handling
          r = `发送${i}时,`;
          switch (game.LobbyNetMgr.Inst.connect_state) {
            case game.EConnectState.none:
              r += "连接不存在";
              break;
            case game.EConnectState.tryconnect:
              r += "连接正在尝试";
              break;
            case game.EConnectState.reconnecting:
              r += "连接重试重连";
              break;
            case game.EConnectState.disconnect:
              r += "连接已断开";
          }
          t.Log.log(r);

          uiscript.UIMgr.Inst &&
            (GameMgr.inRelease
              ? uiscript.UIMgr.Inst.ShowErrorInfo(
                  game.Tools.strOfLocalization(2006)
                )
              : uiscript.UIMgr.Inst.ShowErrorInfo(r));

          return false;
        }
        this._socket_lobby.sendRequest(serviceName, rpcName, type, value);
        return true;
      }
      // also error handling
      var r = `发送${rpcName}时LobbyNetMgr不存在`;
      t.Log.log(r);

      uiscript.UIMgr.Inst &&
        !GameMgr.inRelease &&
        uiscript.UIMgr.Inst.ShowErrorInfo(r);

      return false;
    }

    static AddListener2Lobby(type, listener) {
      listener.once = false;
      this._socket_lobby.addMsgListener(`.lq.${type}`, listener);
    }

    static RemoveListener2Lobby(type, listener) {
      this._socket_lobby.removeMsgListener(`.lq.${type}`, listener);
    }

    static connect2MJ(mjIP, listener) {
      this._socket_mj.addSocketLister(listener);
      this._socket_mj.connect((GameMgr.inHttps ? "wss://" : "ws://") + mjIP);
      this._mj_ip = mjIP;
    }

    static sendMsg2MJ(type, value) {
      this._socket_mj.sendMessage(`.lq.${type}`, value);
    }

    static sendReq2MJ(serviceName, rpcName, type, value) {
      if (game.MJNetMgr.Inst) {
        if (game.MJNetMgr.Inst.connect_state != game.EConnectState.connecting) {
          r = `发送${rpcName}时,`;
          switch (game.MJNetMgr.Inst.connect_state) {
            case game.EConnectState.none:
              r += "连接不存在";
              break;
            case game.EConnectState.tryconnect:
              r += "连接正在尝试";
              break;
            case game.EConnectState.reconnecting:
              r += "连接重试重连";
              break;
            case game.EConnectState.disconnect:
              r += "连接已断开";
          }
          t.Log.log(r);

          GameMgr.inRelease
            ? "checkNetworkDelay" != rpcName &&
              uiscript.UIMgr.Inst.ShowErrorInfo(
                game.Tools.strOfLocalization(2006)
              )
            : uiscript.UIMgr.Inst.ShowErrorInfo(r);

          return false;
        }
        this._socket_mj.sendRequest(serviceName, rpcName, type, value);
        return true;
      }
      var r = `发送${rpcName}时MJNetMgr不存在`;
      t.Log.log(r);

      uiscript.UIMgr.Inst &&
        !GameMgr.inRelease &&
        uiscript.UIMgr.Inst.ShowErrorInfo(r);

      return false;
    }

    static AddListener2MJ(type, listener) {
      listener.once = false;
      this._socket_mj.addMsgListener(`.lq.${type}`, listener);
    }

    static Close2MJ() {
      this._socket_mj.close();
      this._socket_mj && (this._mj_ip = "");
    }

    static Close2Lobby() {
      t.Log.info_net("NetAgent Close2Lobby");
      this._socket_lobby.close();
      this._socket_lobby && (this._lobby_ip = "");
    }
  }

  Object.defineProperty(NetAgent, "lobby_ip", {
    get() {
      return this._lobby_ip;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(NetAgent, "mj_ip", {
    get() {
      return this._mj_ip;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(NetAgent, "lobby_network_delay", {
    get() {
      return this._socket_lobby ? this._socket_lobby.getNetworkDelay() : 1e7;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(NetAgent, "mj_network_delay", {
    get() {
      return this._socket_mj ? this._socket_mj.getNetworkDelay() : 1e7;
    },
    enumerable: true,
    configurable: true
  });

  NetAgent.isLobbyConnectOK = () =>
    !!game.LobbyNetMgr.Inst &&
    game.LobbyNetMgr.Inst.connect_state == game.EConnectState.connecting;

  NetAgent.isMJConnectOK = () =>
    game.MJNetMgr.Inst &&
    game.MJNetMgr.Inst.connect_state == game.EConnectState.connecting;

  NetAgent.onReceiveMsgError = ({ method, info }) => {
    if (game.LobbyNetMgr.Inst.isOK) {
      var i = "";
      i += `acc:${GameMgr.Inst.account_id}`;
      i += `,处理[${method}]代码出错:{${info}}`;
      i += `,deviceinfo:${JSON.stringify(game.Tools.deviceInfo)}`;
      t.NetAgent.sendReq2Lobby(
        "Lobby",
        "clientMessage",
        { timestamp: Math.floor(Date.now() / 1e3), message: i },
        (t, e) => {}
      );
    }
  };

  NetAgent._lobby_ip = "";
  NetAgent._mj_ip = "";
  NetAgent._socket_lobby = null;
  NetAgent._socket_mj = null;
  t.NetAgent = NetAgent;
})(app || (app = {}));
