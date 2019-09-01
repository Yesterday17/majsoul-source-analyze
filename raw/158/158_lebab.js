let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.common.hangup_logoutUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          this.hide,
          null,
          false
        ));
    }),
    (i.prototype.show = function() {
      (this.me.visible = true),
        app.Log.info_net('UI_Hanguplogout  close net'),
        game.LobbyNetMgr.Inst.Close(),
        game.MJNetMgr.Inst && game.MJNetMgr.Inst.Close(),
        t.UIBase.anim_pop_out(this.root, null);
    }),
    (i.prototype.hide = () => {
      Laya.Browser.window.conch
        ? Laya.Browser.window.conch &&
          Laya.Browser.window.conch.exit &&
          Laya.Browser.window.conch.exit()
        : (Laya.Browser.window.location.href = GameMgr.Inst.link_url);
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Hanguplogout = e;
})(uiscript || (uiscript = {}));