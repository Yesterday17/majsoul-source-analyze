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
  var e = (function(t) {
    function e() {
      var i = t.call(this, new ui.both_ui.gettitleUI()) || this;
      return (e.Inst = i), i;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.icon = this.root.getChildByName('icon')),
          (this.btn_close = this.me.getChildByName('btn_close')),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            !1
          ));
      }),
      (e.prototype.show = function(t, e) {
        var i = this;
        (this.enable = !0),
          (this.complete = e),
          (this.icon.skin = game.LoadMgr.getResImageSkin(
            cfg.item_definition.title.get(t).icon
          )),
          (this.btn_close.visible = !1),
          (this.root.alpha = 1),
          (this.locking = !0),
          this.me.in.play(0, !1),
          Laya.timer.once(1e3, this, function() {
            (i.locking = !1), (i.btn_close.visible = !0);
          });
      }),
      (e.prototype.close = function() {
        var t = this;
        (this.locking = !0),
          this.me.out.play(0, !1),
          Laya.timer.once(200, this, function() {
            (t.locking = !1), (t.enable = !1), t.complete && t.complete.run();
          });
      }),
      (e.Inst = null),
      e
    );
  })(t.UIBase);
  t.UI_Gettitle = e;
})(uiscript || (uiscript = {}));