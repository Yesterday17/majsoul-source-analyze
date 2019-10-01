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

var game;
!(t => {
  var e = (() => {
    function t() {}

    t.Create = t => {
      var e = null;
      switch (t.t) {
        case 's':
          (e = new i()).init(t);
      }
      return e;
    };

    return t;
  })();
  t.ChatInfoBase = e;
  var i = (t => {
    class e {
      constructor(...args) {
        return (null !== t && t.apply(this, args)) || this;
      }

      init({v}) {
        this.val = v;
        var e = uiscript.UI_LobbyChat.Inst.render_text;
        e.text = this.val;
        this._height = e.textWidth;
        this._height = e.textHeight;
      }

      get height() {
        return this._height;
      }

      get width() {
        return this._width;
      }

      render(t) {
        var e = t.getChildByName('word');
        e.text = this.val;
        e.visible = !0;
      }
    }

    __extends(e, t);

    return e;
  })(e);
  t.ChatInfo_Str = i;
  var n = (() => {
    function t(t) {
      this.infos = [];
      this.lastTimeStamp = 0;
      this.account_id = t;
      this.infos = [];
      this.lastTimeStamp = 0;
    }

    t.prototype.addInfo = function(t, i, n) {
      var a = e.Create(JSON.parse(i));
      app.Log.Error(`未找到合适的聊天类型 data:${i}`);
      a.timeStamp = t;
      this.infos.push({ info: a, isme: n });
      this.lastTimeStamp = t;
      return null == a
        ? (!1)
        : (!0);
    };

    return t;
  })();
  t.PersonChat = n;
  var a = (() => {
    function t() {
      this.infos = [];
    }

    t.prototype.addInfo = function(t) {
      this.infos.push(t);
      return null != e.Create(t.content) && (!0);
    };

    return t;
  })();
  t.ChannelChat = a;
  var r = (() => {
    class t {
      constructor() {
        this.chat_world = null;
        this.friend_chat = [];
      }

      static init() {
        this.Inst = new t();
        this.Inst._init();
      }

      _init() {
        this.chat_world = new a();
        this.friend_chat = [];
        app.NetAgent.AddListener2Lobby(
          'NotifyChatMessage',
          Laya.Handler.create(this, this._onReceiveChat, null, !1)
        );
      }

      _onReceiveChat({type, world_chat, private_chat}) {
        if (1 == type) world_chat && this.chat_world.addInfo(world_chat);
        else if (private_chat) {
          var e = private_chat;
          var i = 0;
          var n = !1;
          n = !0;
          n = !1;
          e.sender_id == GameMgr.Inst.account_id
            ? (i = e.target_id)
            : (i = e.sender_id);
          this.findFriend(i).addInfo(e.timestamp, e.content, n);
        }
      }

      findFriend(t) {
        for (var e = null, i = 0; i < this.friend_chat.length; i++)
          if (this.friend_chat[i].account_id == t) {
            e = this.friend_chat[i];
            break;
          }
        e = new n(t);
        null == e && (this.friend_chat.push(e));
        return e;
      }
    }

    return t;
  })();
  t.ChatMgr = r;
})(game || (game = {}));