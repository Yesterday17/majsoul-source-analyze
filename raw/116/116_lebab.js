let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.entrance.maintenanceUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me
        .getChildByName('maintenance')
        .getChildByName('container')),
        (this.info = this.root.getChildByName('text')),
        (this.me.visible = false),
        (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
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
      const e = this;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.me.visible = false;
        })
      );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Entrance_Maintenance = e;
})(uiscript || (uiscript = {}));