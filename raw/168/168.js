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
      var t = e.call(this, new ui.entrance.ios_webview_updateUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.show = function(e) {
        var n = new i();
        t.UIMgr.Inst.AddLobbyUI(n),
          Laya.timer.frameOnce(5, this, function() {
            n._show(e);
          });
      }),
      (i.prototype._show = function(t) {
        (this.enable = !0),
          (this.me.getChildByName('root').getChildByName('text').text = t);
      }),
      i
    );
  })(t.UIBase);
  t.UI_IOS_Webview_Update = e;
})(uiscript || (uiscript = {}));