var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.mj.info_md5UI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            false
          ));
        var e = this.root.getChildByName('content');
        (e.vScrollBarSkin = ''), e.refresh();
      }),
      (i.prototype.show = function() {
        var e = this;
        (this.locking = true),
          (this.enable = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              e.locking = false;
            })
          );
        var i = this.root.getChildByName('content'),
          n = i.getChildByName('desc');
        (n.height = n.textField.textHeight), i.refresh();
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.enable = false);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Info_MD5 = e;
})(uiscript || (uiscript = {}));