var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.both_ui.infolite_titleUI()) || this;
      return (
        (t.panel = null),
        (t.desc = null),
        (t.locking = false),
        (t.title = null),
        (i.Inst = t),
        t
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
          (this.title = this.root.getChildByName('title')),
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
      (i.prototype.show = function(e, i) {
        var n = this;
        (this.me.visible = true),
          (this.title.text = e),
          (this.panel.vScrollBar.value = 0),
          (this.desc.text = i),
          (this.desc.height = this.desc.textField.textHeight),
          (this.locking = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = false;
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
  t.UI_InfoLite_Title = e;
})(uiscript || (uiscript = {}));