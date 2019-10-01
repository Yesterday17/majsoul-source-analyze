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
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.common.hangup_logoutUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
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
          app.Log.info_net('UI_Hanguplogout  close net'),
          game.LobbyNetMgr.Inst.Close(),
          game.MJNetMgr.Inst && game.MJNetMgr.Inst.Close(),
          t.UIBase.anim_pop_out(this.root, null);
      }),
      (i.prototype.hide = function() {
        Laya.Browser.window.conch
          ? Laya.Browser.window.conch &&
            Laya.Browser.window.conch.exit &&
            Laya.Browser.window.conch.exit()
          : (Laya.Browser.window.location.href = GameMgr.Inst.link_url);
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_Hanguplogout = e;
})(uiscript || (uiscript = {}));