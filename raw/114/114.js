var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.entrance.error_infoUI()) || this;
      return (t.locking = false), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me
          .getChildByName('error')
          .getChildByName('container')),
          (this.info = this.root.getChildByName('text')),
          (this.me.visible = false),
          (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e, i) {
        var n = this;
        (this.info.text = e),
          (this.root.getChildByName('einfo').text = i
            ? app.Log.getCacheLog()
            : ''),
          (this.enable = true),
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
              (e.enable = false), (e.locking = false);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Entrance_Error = e;
})(uiscript || (uiscript = {}));