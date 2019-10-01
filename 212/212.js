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
  var e = (t => {
    class e {
      constructor() {
        var i = t.call(this, new ui.common.reconnectUI()) || this;
        e.Inst = i;
        return i;
      }

      onCreate() {
        var t = this;
        this.me.getChildByName('btn_ok').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.enable = !1;
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
      }
    }

    __extends(e, t);

    e.Inst = null;
    return e;
  })(t.UIBase);
  t.UI_Reconnect = e;
})(uiscript || (uiscript = {}));