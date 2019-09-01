let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.mj.info_md5UI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          false
        ));
      const e = this.root.getChildByName('content');
      (e.vScrollBarSkin = ''), e.refresh();
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.locking = true),
        (this.enable = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        );
      const i = this.root.getChildByName('content');
      const n = i.getChildByName('desc');
      (n.height = n.textField.textHeight), i.refresh();
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Info_MD5 = e;
})(uiscript || (uiscript = {}));