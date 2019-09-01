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
      (this.enable = true),
        (this.me.getChildByName('root').getChildByName('text').text = t);
    }),
    i
  ;
  })(t.UIBase);
  t.UI_IOS_Webview_Update = e;
})(uiscript || (uiscript = {}));