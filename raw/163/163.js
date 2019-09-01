var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.both_ui.infoliteUI()) || this;
      return (
        (t.panel = null), (t.desc = null), (t.locking = false), (i.Inst = t), t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.panel = this.root.getChildByName('content')),
          (this.panel.vScrollBar.visible = false),
          (this.desc = this.panel.getChildByName('desc')),
          (this.locking = false),
          (this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e) {
        var i = this;
        (this.me.visible = true),
          (this.panel.vScrollBar.value = 0),
          (this.desc.text = e),
          (this.desc.height = this.desc.textField.textHeight),
          (this.locking = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              i.locking = false;
            })
          );
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.me.visible = false);
            })
          );
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_InfoLite = e;
})(uiscript || (uiscript = {}));