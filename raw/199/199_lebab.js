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
          (t.enable = false),
            game.MJNetMgr.Inst.OpenConnect(
              GameMgr.Inst.mj_game_token,
              GameMgr.Inst.mj_game_uuid,
              GameMgr.Inst.mj_server_location,
              true,
              null
            );
        },
        null,
        false
      );
    }),
    (e.Inst = null),
    e
  ;
  })(t.UIBase);
  t.UI_Reconnect = e;
})(uiscript || (uiscript = {}));