var net;
!(t => {
  class Socket {
    constructor(services, handler) {
      var _this = this;
      this.network_delay = 0;
      this.byte_ = new Laya.Byte();
      this.byte_.endian = Laya.Byte.LITTLE_ENDIAN;
      this.socket_ = new Laya.Socket();
      this.socket_.endian = Laya.Byte.LITTLE_ENDIAN;
      this.messages_ = [];
      this.workingMessage_ = null;
      this.requestIndex_ = 0;

      this.requestClientHandle_ = new t.RequestClientHandle(
        handler,
        new Laya.Handler(this, t => {
          _this.network_delay = t;
        })
      );

      this.handler_ = {};
      this.services_ = {};
      this.socket_.on(Laya.Event.OPEN, this, this._onOpen);
      this.socket_.on(Laya.Event.MESSAGE, this, this._onReceiveMsg);
      this.socket_.on(Laya.Event.CLOSE, this, this._onClose);
      this.socket_.on(Laya.Event.ERROR, this, this._onError);
      if (services)
        for (var a = 0; a < services.length; a++)
          this._registerService(services[a]);
    }

    connect(url) {
      this.socket_.connectByUrl(url);
    }

    get connected() {
      return this.socket_.connected;
    }

    _onOpen(t) {
      undefined === t && (t = null);
      app.Log.log("socket连接建立成功");
      app.Log.info_net("socket open success");
      this.when_socket_event && this.when_socket_event.runWith(Laya.Event.OPEN);
    }

    _onReceiveMsg(t) {
      undefined === t && (t = null);
      app.Log.Error("!data || data.length === 0");
      if (!t || 0 === t.length)
        return void app.Log.info_net(
          "error receive msg: !data || data.length === 0"
        );
      this.messages_.push(new Uint8Array(t));
      this._checkMessage();
    }

    _onClose(t) {
      undefined === t && (t = null);
      app.Log.log(`socket关闭 e:${t}`);

      app.Log.info_net(
        `socket关闭 e:${JSON.stringify(t)}, code:${t.code}, reason:${
          t.reason
        }, wasClean:${t.wasClean}`
      );

      this.when_socket_event &&
        this.when_socket_event.runWith(Laya.Event.CLOSE);
    }

    _onError(t) {
      undefined === t && (t = null);
      app.Log.log(`socket错误 e:${t}`);
      app.Log.info_net(`socket错误 e:${JSON.stringify(t)}`);
      this.when_socket_event &&
        this.when_socket_event.runWith(Laya.Event.ERROR);
    }

    _checkMessage() {
      this.workingMessage_ = this.messages_.shift();
      this._handleMsg(this.workingMessage_);
      this.workingMessage_ = null;
      if (!this.workingMessage_ && this.messages_.length !== 0)
        return this._checkMessage();
    }

    _handleMsg(msg) {
      var i = { type: msg[0] };
      // msg2 msg1
      // msg2 is the higher 8 bits
      // msg1 is the lower 8 bits
      // u16int
      i.reqIndex = msg[1] + (msg[2] << 8);
      switch (i.type) {
        case t.HeaderType.REQUEST:
        case t.HeaderType.RESPONSE:
          if (msg.length < 3) throw new Error("ERR_INVALID_MESSAGE_LENGTH");
          msg = msg.slice(3);
          break;
        case t.HeaderType.NOTIFY:
          msg = msg.slice(1);
          break;
        default:
          return void console.error("net", `unknown headerType: ${i.type}`);
      }
      // so in fact, only response and notify can be handled
      switch (i.type) {
        case t.HeaderType.REQUEST:
          throw new Error("ERR_CLIENT_UNABLE_TO_HANDLE_REQUEST");
        case t.HeaderType.RESPONSE:
          var wrapper = t.MessageWrapper.decodeRpc(msg);
          // wrapper: {name: string, data: byte[]}
          return this.requestClientHandle_.emitResponse(
            i.reqIndex,
            wrapper.data
          );
        case t.HeaderType.NOTIFY:
          var a = t.MessageWrapper.decodeMessage(msg);
          var r = this.handler_[a.$type.fullName];
          if (!r) return void app.Log.Error(`消息:${a.$type.fullName}未被监听`);
          for (var s = 0; s < r.length; s++)
            try {
              // execute handler
              r[s].runWith(a);
            } catch (t) {
              app.Log.Error(
                `message ${a.$type.fullName} handle error info:${t}`
              );

              this.code_error_handler &&
                this.code_error_handler.runWith({
                  method: a.$type.fullName,
                  info: t
                });
            }
          return;
        default:
          return void console.error("net", `unknown headerType: ${i.type}`);
      }
    }

    _requestMessage(method, packet, n) {
      this.requestIndex_ = (this.requestIndex_ + 1) % 60007;

      app.Log.info_net(
        `_requestMessage method:${method}, index:${this.requestIndex_}`
      );

      this._sendRpc(method, {
        header: {
          type: t.HeaderType.REQUEST,
          reqIndex: this.requestIndex_
        },
        packet: packet
      });

      this.requestClientHandle_.waitResponseCb(method, this.requestIndex_, n);
    }

    _registerService(e) {
      var _this = this;
      var n = t.ProtobufManager.lookupService(`lq.${e}`);
      if (!n) throw new Error(`ERR_SERVICE_NOT_FOUND, name=${e}`);
      var service = n.create(({ fullName }, packet, s) => {
        _this._requestMessage(fullName, packet, s);
      });
      this.services_[e] = service;
    }

    _sendMessage({ header, packet }) {
      if (!this.socket_) throw new Error("ERR_SOCKET_NOT_CONNECT");
      var i = t.MessageWrapper.encodeHeaderData(header);
      var n = t.MessageWrapper.encodeMessage(packet);
      var a = new Laya.Byte();
      a.writeArrayBuffer(i);
      a.writeArrayBuffer(n);
      this.socket_.send(a.buffer);
      app.Log.info_net("socket _sendMessage");
    }

    _sendRpc(e, { header, packet }) {
      if (!this.socket_) throw new Error("ERR_SOCKET_NOT_CONNECT");
      var n = t.MessageWrapper.encodeHeaderData(header);
      var a = t.MessageWrapper.encodeRpc(e, packet);
      var r = new Laya.Byte();
      r.writeArrayBuffer(n);
      r.writeArrayBuffer(a);
      this.socket_.send(r.buffer);
      app.Log.info_net("socket _sendRpc");
    }

    // e: .lq.${t}
    sendMessage(type, value) {
      app.Log.info_net(`socket sendMessage msg_type:${type}`);
      var n = t.ProtobufManager.lookupType(type);
      n
        ? this._sendMessage({
            header: { type: t.HeaderType.NOTIFY },
            packet: n.create(value)
          })
        : app.Log.Error(`sendMessage msg_type:${type}未找到`);
    }

    sendRequest(serviceName, rpcName, type, value) {
      app.Log.info_net(
        `socket sendRequest service_name:${serviceName}, rpc_name:${rpcName}`
      );
      var a = this.services_[serviceName];
      if (!a) throw new Error("ERR_SERVICE_NOT_FOUND, name=FastTest");
      a[rpcName](type, value);
    }

    addMsgListener(type, listener) {
      this.handler_[type] || (this.handler_[type] = []);
      this.handler_[type].push(listener);
    }

    removeMsgListener(type, listener) {
      if (this.handler_[type]) {
        for (var i = this.handler_[type], n = [], a = 0; a < i.length; a++)
          i[a] !== listener && n.push(listener);
        this.handler_[type] = n;
      }
    }

    // shouldn't it be set?
    addSocketLister(t) {
      this.when_socket_event = t;
    }

    close() {
      app.Log.info_net("socket close");
      this.socket_ && this.socket_.close();
    }

    getNetworkDelay() {
      return this.network_delay;
    }
  }
  t.Socket = Socket;
})(net || (net = {}));
