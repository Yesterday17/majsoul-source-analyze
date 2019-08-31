const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let game;
!(t => {
  const e = (() => {
    function t() {}
    return (t.Create = t => {
      let e = null;
      switch (t.t) {
        case 's':
          (e = new i()).init(t);
      }
      return e;
    }),
    t
  ;
  })();
  t.ChatInfoBase = e;
  var i = (t => {
    function e(...args) {
      return (null !== t && t.apply(this, args)) || this;
    }
    return __extends(e, t),
    (e.prototype.init = function({v}) {
      this.val = v;
      const e = uiscript.UI_LobbyChat.Inst.render_text;
      (e.text = this.val),
        (this._height = e.textWidth),
        (this._height = e.textHeight);
    }),
    Object.defineProperty(e.prototype, 'height', {
      get() {
        return this._height;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, 'width', {
      get() {
        return this._width;
      },
      enumerable: !0,
      configurable: !0
    }),
    (e.prototype.render = function(t) {
      const e = t.getChildByName('word');
      (e.text = this.val), (e.visible = !0);
    }),
    e
  ;
  })(e);
  t.ChatInfo_Str = i;
  const n = (() => {
    function t(t) {
      (this.infos = []),
        (this.lastTimeStamp = 0),
        (this.account_id = t),
        (this.infos = []),
        (this.lastTimeStamp = 0);
    }
    return (t.prototype.addInfo = function(t, i, n) {
      const a = e.Create(JSON.parse(i));
      return null == a
        ? (app.Log.Error(`未找到合适的聊天类型 data:${i}`), !1)
        : ((a.timeStamp = t),
          this.infos.push({ info: a, isme: n }),
          (this.lastTimeStamp = t),
          !0);
    }),
    t
  ;
  })();
  t.PersonChat = n;
  const a = (() => {
    function t() {
      this.infos = [];
    }
    return (
      (t.prototype.addInfo = function(t) {
        return null != e.Create(t.content) && (this.infos.push(t), !0);
      }),
      t
    );
  })();
  t.ChannelChat = a;
  const r = (() => {
    function t() {
      (this.chat_world = null), (this.friend_chat = []);
    }
    return (t.init = function() {
      (this.Inst = new t()), this.Inst._init();
    }),
    (t.prototype._init = function() {
      (this.chat_world = new a()),
        (this.friend_chat = []),
        app.NetAgent.AddListener2Lobby(
          'NotifyChatMessage',
          Laya.Handler.create(this, this._onReceiveChat, null, !1)
        );
    }),
    (t.prototype._onReceiveChat = function({type, world_chat, private_chat}) {
      if (1 == type) world_chat && this.chat_world.addInfo(world_chat);
      else if (private_chat) {
        const e = private_chat;
        let i = 0;
        let n = !1;
        e.sender_id == GameMgr.Inst.account_id
          ? ((n = !0), (i = e.target_id))
          : ((n = !1), (i = e.sender_id));
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
  ;
  })();
  t.ChatMgr = r;
})(game || (game = {}));