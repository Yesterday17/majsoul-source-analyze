var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.entrance.maintenanceUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me
          .getChildByName('maintenance')
          .getChildByName('container')),
          (this.info = this.root.getChildByName('text')),
          (this.me.visible = false),
          (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e) {
        (this.info.text = e),
          (this.me.visible = true),
          t.UIBase.anim_pop_out(this.root, null);
      }),
      (i.prototype.close = function() {
        var e = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, function() {
            e.me.visible = false;
          })
        );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Entrance_Maintenance = e;
})(uiscript || (uiscript = {}));