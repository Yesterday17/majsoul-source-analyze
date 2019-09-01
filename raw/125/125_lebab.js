let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.agexianeUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me
        .getChildByName('agepending')
        .getChildByName('root')),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.btn_close = this.root.getChildByName('btn_close')),
        (this.xiaofei = this.root.getChildByName('xiaofei')),
        (this.shangxian = this.root.getChildByName('shangxian')),
        (this.btn_confirm.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          false
        )),
        (this.btn_close.clickHandler = Laya.Handler.create(
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
      (this.enable = true),
        (this.locking = true),
        (this.xiaofei.text = (e / 1e3).toString());
      let a = 0;
      (a = i < 16 ? 5e3 : 2e4),
        (this.shangxian.text = a.toString()),
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
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Agexiane = e;
})(uiscript || (uiscript = {}));