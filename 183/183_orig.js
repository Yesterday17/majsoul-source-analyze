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
      var i = t.call(this, new ui.both_ui.light_tipsUI()) || this;
      return (i.locking = !1), (e.Inst = i), i;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.info = this.root.getChildByName('info')),
          (this.me.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            !1
          ));
      }),
      (e.prototype.show = function(t) {
        var e = this;
        (this.info.text = t),
          (this.root.height = 120 + this.info.textField.textHeight),
          (this.enable = !0),
          (this.locking = !0),
          (this.root.scaleY = 0),
          Laya.timer.clearAll(this),
          Laya.Tween.to(
            this.root,
            { scaleY: 1 },
            150,
            null,
            Laya.Handler.create(this, function() {
              e.locking = !1;
            })
          ),
          Laya.timer.once(3e3, this, function() {
            e.close();
          });
      }),
      (e.prototype.close = function() {
        var t = this;
        (this.locking = !0),
          Laya.timer.clearAll(this),
          Laya.Tween.to(
            this.root,
            { scaleY: 0 },
            150,
            null,
            Laya.Handler.create(this, function() {
              (t.locking = !1), (t.enable = !1);
            })
          );
      }),
      e
    );
  })(t.UIBase);
  t.UI_LightTips = e;
})(uiscript || (uiscript = {}));