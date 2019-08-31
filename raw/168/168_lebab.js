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
      const t = e.call(this, new ui.entrance.ios_webview_updateUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.show = function(e) {
      const n = new i();
      t.UIMgr.Inst.AddLobbyUI(n),
        Laya.timer.frameOnce(5, this, () => {
          n._show(e);
        });
    }),
    (i.prototype._show = function(t) {
      (this.enable = !0),
        (this.me.getChildByName('root').getChildByName('text').text = t);
    }),
    i
  ;
  })(t.UIBase);
  t.UI_IOS_Webview_Update = e;
})(uiscript || (uiscript = {}));