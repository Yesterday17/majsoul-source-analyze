var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.channel = 1)] = 'channel'),
      (t[(t.person = 2)] = 'person');
  })(e || (e = {}));
  var i = (function(t) {
    function i() {
      var n = t.call(this, new ui.lobby.lobbychatUI()) || this;
      return (
        (n.render_text = null),
        (n.btn_switch = null),
        (n.container_main = null),
        (n.left_heads = null),
        (n.chattype = e.none),
        (n.chat_account_id = 0),
        (i.Inst = n),
        n
      );
    }
    return (
      __extends(i, t),
      (i.prototype.onCreate = function() {}),
      (i.prototype.onShow = function() {}),
      (i.prototype.onHide = function() {}),
      (i.prototype.onReceivePersonMsg = function(t) {}),
      (i.prototype.onReceiveWorldMsg = function() {}),
      (i.prototype.firstRefresh = function() {}),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_LobbyChat = i;
})(uiscript || (uiscript = {}));