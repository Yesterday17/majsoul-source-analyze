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
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.common.anotherloginUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        this.root = this.me.getChildByName('root');
        this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            this.hide,
            null,
            !1
          );
      }

      show() {
        this.me.visible = !0;
        Laya.LocalStorage.setItem('_pre_sociotype', '');
        app.Log.info_net('UI_AnotherLogin  close net');
        game.LobbyNetMgr.Inst.Close();
        game.MJNetMgr.Inst && game.MJNetMgr.Inst.Close();
        t.UIBase.anim_pop_out(this.root, null);
      }

      hide() {
        Laya.LocalStorage.setItem('_pre_sociotype', '');
        Laya.Browser.window.conch
          ? Laya.Browser.window.conch &&
            Laya.Browser.window.conch.exit &&
            Laya.Browser.window.conch.exit()
          : (Laya.Browser.window.location.href = GameMgr.Inst.link_url);
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_AnotherLogin = e;
})(uiscript || (uiscript = {}));