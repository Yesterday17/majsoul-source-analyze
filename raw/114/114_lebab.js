let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.entrance.error_infoUI()) || this;
      return (t.locking = false), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me
        .getChildByName('error')
        .getChildByName('container')),
        (this.info = this.root.getChildByName('text')),
        (this.me.visible = false),
        (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          false
        ));
    }),
    (i.prototype.show = function(e, i) {
      const n = this;
      (this.info.text = e),
        (this.root.getChildByName('einfo').text = i
          ? app.Log.getCacheLog()
          : ''),
        (this.enable = true),
        (this.locking = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = false;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.enable = false), (e.locking = false);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Entrance_Error = e;
})(uiscript || (uiscript = {}));