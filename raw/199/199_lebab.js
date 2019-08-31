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

let uiscript;
!(t => {
  const e = (t => {
    function e() {
      const i = t.call(this, new ui.common.reconnectUI()) || this;
      return (e.Inst = i), i;
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      const t = this;
      this.me.getChildByName('btn_ok').clickHandler = Laya.Handler.create(
        this,
        () => {
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
  ;
  })(t.UIBase);
  t.UI_Reconnect = e;
})(uiscript || (uiscript = {}));