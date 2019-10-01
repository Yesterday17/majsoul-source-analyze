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

var uiscript;
!(t => {
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.channel = 1)] = 'channel';
    t[(t.person = 2)] = 'person';
  })(e || (e = {}));
  var i = (t => {
    class i {
      constructor() {
        var n = t.call(this, new ui.lobby.lobbychatUI()) || this;
        n.render_text = null;
        n.btn_switch = null;
        n.container_main = null;
        n.left_heads = null;
        n.chattype = e.none;
        n.chat_account_id = 0;
        i.Inst = n;
        return n;
      }

      onCreate() {}
      onShow() {}
      onHide() {}
      onReceivePersonMsg(t) {}
      onReceiveWorldMsg() {}
      firstRefresh() {}
    }

    __extends(i, t);
    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_LobbyChat = i;
})(uiscript || (uiscript = {}));