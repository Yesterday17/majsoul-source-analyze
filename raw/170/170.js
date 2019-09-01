var uiscript;
!(function(t) {
  var e = (function(t) {
    function e() {
      var i = t.call(this, new ui.both_ui.light_tipsUI()) || this;
      return (i.locking = false), (e.Inst = i), i;
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
            false
          ));
      }),
      (e.prototype.show = function(t) {
        var e = this;
        (this.info.text = t),
          (this.root.height = 120 + this.info.textField.textHeight),
          (this.enable = true),
          (this.locking = true),
          (this.root.scaleY = 0),
          Laya.timer.clearAll(this),
          Laya.Tween.to(
            this.root,
            { scaleY: 1 },
            150,
            null,
            Laya.Handler.create(this, function() {
              e.locking = false;
            })
          ),
          Laya.timer.once(3e3, this, function() {
            e.close();
          });
      }),
      (e.prototype.close = function() {
        var t = this;
        (this.locking = true),
          Laya.timer.clearAll(this),
          Laya.Tween.to(
            this.root,
            { scaleY: 0 },
            150,
            null,
            Laya.Handler.create(this, function() {
              (t.locking = false), (t.enable = false);
            })
          );
      }),
      e
    );
  })(t.UIBase);
  t.UI_LightTips = e;
})(uiscript || (uiscript = {}));