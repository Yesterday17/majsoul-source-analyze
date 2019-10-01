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
        var t = e.call(this, new ui.entrance.ios_webview_updateUI()) || this;
        i.Inst = t;
        return t;
      }

      static show(e) {
        var n = new i();
        t.UIMgr.Inst.AddLobbyUI(n);
        Laya.timer.frameOnce(5, this, () => {
          n._show(e);
        });
      }

      _show(t) {
        this.enable = !0;
        this.me.getChildByName('root').getChildByName('text').text = t;
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_IOS_Webview_Update = e;
})(uiscript || (uiscript = {}));