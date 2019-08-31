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
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.common.anotherloginUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          this.hide,
          null,
          !1
        ));
    }),
    (i.prototype.show = function() {
      (this.me.visible = !0),
        Laya.LocalStorage.setItem('_pre_sociotype', ''),
        app.Log.info_net('UI_AnotherLogin  close net'),
        game.LobbyNetMgr.Inst.Close(),
        game.MJNetMgr.Inst && game.MJNetMgr.Inst.Close(),
        t.UIBase.anim_pop_out(this.root, null);
    }),
    (i.prototype.hide = () => {
      Laya.LocalStorage.setItem('_pre_sociotype', ''),
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
  t.UI_AnotherLogin = e;
})(uiscript || (uiscript = {}));