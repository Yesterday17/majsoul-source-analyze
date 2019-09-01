var game;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t.Create = function(t) {
        var e = null;
        switch (t.t) {
          case 's':
            (e = new i()).init(t);
        }
        return e;
      }),
      t
    );
  })();
  t.ChatInfoBase = e;
  var i = (function(t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      __extends(e, t),
      (e.prototype.init = function(t) {
        this.val = t.v;
        var e = uiscript.UI_LobbyChat.Inst.render_text;
        (e.text = this.val),
          (this._height = e.textWidth),
          (this._height = e.textHeight);
      }),
      Object.defineProperty(e.prototype, 'height', {
        get: function() {
          return this._height;
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(e.prototype, 'width', {
        get: function() {
          return this._width;
        },
        enumerable: true,
        configurable: true
      }),
      (e.prototype.render = function(t) {
        var e = t.getChildByName('word');
        (e.text = this.val), (e.visible = true);
      }),
      e
    );
  })(e);
  t.ChatInfo_Str = i;
  var n = (function() {
    function t(t) {
      (this.infos = []),
        (this.lastTimeStamp = 0),
        (this.account_id = t),
        (this.infos = []),
        (this.lastTimeStamp = 0);
    }
    return (
      (t.prototype.addInfo = function(t, i, n) {
        var a = e.Create(JSON.parse(i));
        return null == a
          ? (app.Log.Error('未找到合适的聊天类型 data:' + i), false)
          : ((a.timeStamp = t),
            this.infos.push({ info: a, isme: n }),
            (this.lastTimeStamp = t),
            true);
      }),
      t
    );
  })();
  t.PersonChat = n;
  var a = (function() {
    function t() {
      this.infos = [];
    }
    return (
      (t.prototype.addInfo = function(t) {
        return null != e.Create(t.content) && (this.infos.push(t), true);
      }),
      t
    );
  })();
  t.ChannelChat = a;
  var r = (function() {
    function t() {
      (this.chat_world = null), (this.friend_chat = []);
    }
    return (
      (t.init = function() {
        (this.Inst = new t()), this.Inst._init();
      }),
      (t.prototype._init = function() {
        (this.chat_world = new a()),
          (this.friend_chat = []),
          app.NetAgent.AddListener2Lobby(
            'NotifyChatMessage',
            Laya.Handler.create(this, this._onReceiveChat, null, false)
          );
      }),
      (t.prototype._onReceiveChat = function(t) {
        if (1 == t.type) t.world_chat && this.chat_world.addInfo(t.world_chat);
        else if (t.private_chat) {
          var e = t.private_chat,
            i = 0,
            n = false;
          e.sender_id == GameMgr.Inst.account_id
            ? ((n = true), (i = e.target_id))
            : ((n = false), (i = e.sender_id));
          this.findFriend(i).addInfo(e.timestamp, e.content, n);
        }
      }),
      (t.prototype.findFriend = function(t) {
        for (var e = null, i = 0; i < this.friend_chat.length; i++)
          if (this.friend_chat[i].account_id == t) {
            e = this.friend_chat[i];
            break;
          }
        return null == e && ((e = new n(t)), this.friend_chat.push(e)), e;
      }),
      t
    );
  })();
  t.ChatMgr = r;
})(game || (game = {}));