var net;
!(function(t) {
  var e = (function() {
    function e(e, i) {
      var n = this;
      if (
        ((this.network_delay = 0),
        (this.byte_ = new Laya.Byte()),
        (this.byte_.endian = Laya.Byte.LITTLE_ENDIAN),
        (this.socket_ = new Laya.Socket()),
        (this.socket_.endian = Laya.Byte.LITTLE_ENDIAN),
        (this.messages_ = []),
        (this.workingMessage_ = null),
        (this.requestIndex_ = 0),
        (this.requestClientHandle_ = new t.RequestClientHandle(
          i,
          new Laya.Handler(this, function(t) {
            n.network_delay = t;
          })
        )),
        (this.handler_ = {}),
        (this.services_ = {}),
        this.socket_.on(Laya.Event.OPEN, this, this._onOpen),
        this.socket_.on(Laya.Event.MESSAGE, this, this._onReceiveMsg),
        this.socket_.on(Laya.Event.CLOSE, this, this._onClose),
        this.socket_.on(Laya.Event.ERROR, this, this._onError),
        e)
      )
        for (var a = 0; a < e.length; a++) this._registerService(e[a]);
    }
    return (
      (e.prototype.connect = function(t) {
        this.socket_.connectByUrl(t);
      }),
      Object.defineProperty(e.prototype, 'connected', {
        get: function() {
          return this.socket_.connected;
        },
        enumerable: !0,
        configurable: !0
      }),
      (e.prototype._onOpen = function(t) {
        void 0 === t && (t = null),
          app.Log.log('socket连接建立成功'),
          app.Log.info_net('socket open success'),
          this.when_socket_event &&
            this.when_socket_event.runWith(Laya.Event.OPEN);
      }),
      (e.prototype._onReceiveMsg = function(t) {
        if ((void 0 === t && (t = null), !t || 0 === t.length))
          return (
            app.Log.Error('!data || data.length === 0'),
            void app.Log.info_net(
              'error receive msg: !data || data.length === 0'
            )
          );
        this.messages_.push(new Uint8Array(t)), this._checkMessage();
      }),
      (e.prototype._onClose = function(t) {
        void 0 === t && (t = null),
          app.Log.log('socket关闭 e:' + t),
          app.Log.info_net(
            'socket关闭 e:' +
              JSON.stringify(t) +
              ', code:' +
              t.code +
              ', reason:' +
              t.reason +
              ', wasClean:' +
              t.wasClean
          ),
          this.when_socket_event &&
            this.when_socket_event.runWith(Laya.Event.CLOSE);
      }),
      (e.prototype._onError = function(t) {
        void 0 === t && (t = null),
          app.Log.log('socket错误 e:' + t),
          app.Log.info_net('socket错误 e:' + JSON.stringify(t)),
          this.when_socket_event &&
            this.when_socket_event.runWith(Laya.Event.ERROR);
      }),
      (e.prototype._checkMessage = function() {
        if (!this.workingMessage_ && 0 !== this.messages_.length)
          return (
            (this.workingMessage_ = this.messages_.shift()),
            this._handleMsg(this.workingMessage_),
            (this.workingMessage_ = null),
            this._checkMessage()
          );
      }),
      (e.prototype._handleMsg = function(e) {
        var i = { type: e[0] };
        switch (i.type) {
          case t.HeaderType.REQUEST:
          case t.HeaderType.RESPONSE:
            if (e.length < 3) throw new Error('ERR_INVALID_MESSAGE_LENGTH');
            (i.reqIndex = e[1] + (e[2] << 8)), (e = e.slice(3));
            break;
          case t.HeaderType.NOTIFY:
            e = e.slice(1);
            break;
          default:
            return void console.error('net', 'unknown headerType: ' + i.type);
        }
        switch (i.type) {
          case t.HeaderType.REQUEST:
            throw new Error('ERR_CLIENT_UNABLE_TO_HANDLE_REQUEST');
          case t.HeaderType.RESPONSE:
            var n = t.MessageWrapper.decodeRpc(e);
            return this.requestClientHandle_.emitResponse(i.reqIndex, n.data);
          case t.HeaderType.NOTIFY:
            var a = t.MessageWrapper.decodeMessage(e),
              r = this.handler_[a.$type.fullName];
            if (!r)
              return void app.Log.Error(
                '消息:' + a.$type.fullName + '未被监听'
              );
            for (var s = 0; s < r.length; s++)
              try {
                r[s].runWith(a);
              } catch (t) {
                app.Log.Error(
                  'message ' + a.$type.fullName + ' handle error info:' + t
                ),
                  this.code_error_handler &&
                    this.code_error_handler.runWith({
                      method: a.$type.fullName,
                      info: t
                    });
              }
            return;
          default:
            return void console.error('net', 'unknown headerType: ' + i.type);
        }
      }),
      (e.prototype._requestMessage = function(e, i, n) {
        (this.requestIndex_ = (this.requestIndex_ + 1) % 60007),
          app.Log.info_net(
            '_requestMessage method:' + e + ', index:' + this.requestIndex_
          ),
          this._sendRpc(e, {
            header: {
              type: t.HeaderType.REQUEST,
              reqIndex: this.requestIndex_
            },
            packet: i
          }),
          this.requestClientHandle_.waitResponseCb(e, this.requestIndex_, n);
      }),
      (e.prototype._registerService = function(e) {
        var i = this,
          n = t.ProtobufManager.lookupService('lq.' + e);
        if (!n) throw new Error('ERR_SERVICE_NOT_FOUND, name=' + e);
        var a = n.create(function(t, e, n) {
          i._requestMessage(t.fullName, e, n);
        });
        this.services_[e] = a;
      }),
      (e.prototype._sendMessage = function(e) {
        if (!this.socket_) throw new Error('ERR_SOCKET_NOT_CONNECT');
        var i = t.MessageWrapper.encodeHeaderData(e.header),
          n = t.MessageWrapper.encodeMessage(e.packet),
          a = new Laya.Byte();
        a.writeArrayBuffer(i),
          a.writeArrayBuffer(n),
          this.socket_.send(a.buffer),
          app.Log.info_net('socket _sendMessage');
      }),
      (e.prototype._sendRpc = function(e, i) {
        if (!this.socket_) throw new Error('ERR_SOCKET_NOT_CONNECT');
        var n = t.MessageWrapper.encodeHeaderData(i.header),
          a = t.MessageWrapper.encodeRpc(e, i.packet),
          r = new Laya.Byte();
        r.writeArrayBuffer(n),
          r.writeArrayBuffer(a),
          this.socket_.send(r.buffer),
          app.Log.info_net('socket _sendRpc');
      }),
      (e.prototype.sendMessage = function(e, i) {
        app.Log.info_net('socket sendMessage msg_type:' + e);
        var n = t.ProtobufManager.lookupType(e);
        n
          ? this._sendMessage({
              header: { type: t.HeaderType.NOTIFY },
              packet: n.create(i)
            })
          : app.Log.Error('sendMessage msg_type:' + e + '未找到');
      }),
      (e.prototype.sendRequest = function(t, e, i, n) {
        app.Log.info_net(
          'socket sendRequest service_name:' + t + ', rpc_name:' + e
        );
        var a = this.services_[t];
        if (!a) throw new Error('ERR_SERVICE_NOT_FOUND, name=FastTest');
        a[e](i, n);
      }),
      (e.prototype.addMsgListener = function(t, e) {
        this.handler_[t] || (this.handler_[t] = []), this.handler_[t].push(e);
      }),
      (e.prototype.removeMsgListener = function(t, e) {
        if (this.handler_[t]) {
          for (var i = this.handler_[t], n = [], a = 0; a < i.length; a++)
            i[a] !== e && n.push(e);
          this.handler_[t] = n;
        }
      }),
      (e.prototype.addSocketLister = function(t) {
        this.when_socket_event = t;
      }),
      (e.prototype.close = function() {
        app.Log.info_net('socket close'), this.socket_ && this.socket_.close();
      }),
      (e.prototype.getNetworkDelay = function() {
        return this.network_delay;
      }),
      e
    );
  })();
  t.Socket = e;
})(net || (net = {}));