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
      var t = e.call(this, new ui.entrance.error_infoUI()) || this;
      return (t.locking = !1), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me
          .getChildByName('error')
          .getChildByName('container')),
          (this.info = this.root.getChildByName('text')),
          (this.me.visible = !1),
          (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            !1
          ));
      }),
      (i.prototype.show = function(e, i) {
        var n = this;
        (this.info.text = e),
          (this.root.getChildByName('einfo').text = i
            ? app.Log.getCacheLog()
            : ''),
          (this.enable = !0),
          (this.locking = !0),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = !1;
            })
          );
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.enable = !1), (e.locking = !1);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Entrance_Error = e;
})(uiscript || (uiscript = {}));