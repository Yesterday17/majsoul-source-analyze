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
        var t = e.call(this, new ui.common.disconnectUI()) || this;
        t.root = null;
        t.txt_info = null;
        t.txt_dot = null;
        t.state = 0;
        t.count = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        this.root = this.me.getChildByName('root');
        this.txt_info = this.root.getChildByName('text');
        this.txt_dot = this.root.getChildByName('text_dot');
      }

      show() {
        this.enable = !0;
        Laya.timer.clearAll(this);
        this.refreshInfo();
        t.UIBase.anim_pop_out(this.root, null);
        Laya.timer.clearAll(this);
        this.refreshInfo();
        Laya.timer.clearAll(this);
        this.refreshInfo();
        this.root.scaleX = 1;
        this.root.scaleY = 1;
        this.root.alpha = 1;
        t.UIBase.anim_pop_out(this.root, null);

        1 == this.state ||
          (0 == this.state
            ? (Laya.timer.loop(500, this, this.refreshInfo))
            : 2 == this.state
            ? (Laya.timer.loop(500, this, this.refreshInfo))
            : 3 == this.state &&
              (Laya.timer.loop(500, this, this.refreshInfo)));

        this.state = 1;
        t.UIMgr.Inst.disableMouse();
      }

      hide() {
        var e = this;
        this.state = 2;
        Laya.timer.clearAll(this);
        Laya.timer.once(1e3, this, () => {
          e.state = 3;
          t.UIBase.anim_pop_hide(
            e.root,
            Laya.Handler.create(e, () => {
              e.state = 0;
              e.enable = !1;
              t.UIMgr.Inst.enableMouse();
            })
          );
        });
      }

      refreshInfo() {
        this.count = (this.count + 1) % 4;
        for (var t = '', e = 0; e < this.count; e++) t += '.';
        this.txt_info.text = game.Tools.strOfLocalization(2049);
        this.txt_info.text = game.Tools.strOfLocalization(2050);
        this.txt_info.text = game.Tools.strOfLocalization(2051);
        this.txt_info.text = game.Tools.strOfLocalization(2052);
        this.txt_dot.text = '';
        this.txt_info.text = game.Tools.strOfLocalization(2049);
        this.txt_info.text = game.Tools.strOfLocalization(2050);
        game.LobbyNetMgr.Inst.connect_state == game.EConnectState.disconnect
          ? (this.txt_dot.text = '')
          : game.LobbyNetMgr.Inst.connect_state ==
            game.EConnectState.reconnecting
          ? (this.txt_dot.text = t)
          : game.LobbyNetMgr.Inst.connect_state == game.EConnectState.none ||
            game.LobbyNetMgr.Inst.connect_state == game.EConnectState.tryconnect
          ? (this.txt_dot.text = '')
          : game.LobbyNetMgr.Inst.connect_state ==
              game.EConnectState.connecting &&
            (game.MJNetMgr.Inst.connect_state == game.EConnectState.none ||
            game.MJNetMgr.Inst.connect_state == game.EConnectState.tryconnect ||
            game.MJNetMgr.Inst.connect_state == game.EConnectState.connecting
              ? (this.hide())
              : game.MJNetMgr.Inst.connect_state ==
                game.EConnectState.disconnect
              ? (this.txt_dot.text = '')
              : game.MJNetMgr.Inst.connect_state ==
                  game.EConnectState.reconnecting &&
                ((this.txt_dot.text = t)));
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_Disconnect = e;
})(uiscript || (uiscript = {}));