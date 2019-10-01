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
  var e = (function(t) {
    function e() {
      var i = t.call(this, new ui.common.reconnectUI()) || this;
      return (e.Inst = i), i;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        var t = this;
        this.me.getChildByName('btn_ok').clickHandler = Laya.Handler.create(
          this,
          function() {
            (t.enable = !1),
              game.MJNetMgr.Inst.OpenConnect(
                GameMgr.Inst.mj_game_token,
                GameMgr.Inst.mj_game_uuid,
                GameMgr.Inst.mj_server_location,
                !0,
                null
              );
          },
          null,
          !1
        );
      }),
      (e.Inst = null),
      e
    );
  })(t.UIBase);
  t.UI_Reconnect = e;
})(uiscript || (uiscript = {}));