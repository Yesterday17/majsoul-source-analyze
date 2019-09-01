let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.both_ui.secondconfirmUI()) || this;
      return (
        (t.func_cancel = null),
        (t.func_confirm = null),
        (t.locking = false),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking ||
              (t.close(),
              t.func_confirm && t.func_confirm.run(),
              (t.func_cancel = null),
              (t.func_confirm = null));
          },
          null,
          false
        )),
        (this.root.getChildByName(
          'btn_cancel'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking ||
              (t.close(),
              t.func_cancel && t.func_cancel.run(),
              (t.func_cancel = null),
              (t.func_confirm = null));
          },
          null,
          false
        )),
        (this.root.getChildByName('btn_cancel').filters = [
          new Laya.ColorFilter([
            0.3086,
            0.6094,
            0.082,
            0,
            0,
            0.3086,
            0.6094,
            0.082,
            0,
            0,
            0.3086,
            0.6094,
            0.082,
            0,
            0,
            0,
            0,
            0,
            1,
            0
          ])
        ]),
        (this.desc = this.root.getChildByName('desc')),
        (this.locking = false);
    }),
    (i.prototype.show = function(e, i, n, a, r) {
      const s = this;
      undefined === i && (i = null),
        undefined === n && (n = null),
        undefined === a && (a = 960),
        undefined === r && (r = 560),
        (this.func_cancel = n),
        (this.func_confirm = i),
        (this.desc.text = e),
        (this.root.x = a),
        (this.root.y = r),
        (this.root.getChildByName('btn_confirm').x = 114),
        (this.root.getChildByName('btn_cancel').x = 339),
        (this.root.getChildByName('btn_cancel').visible = true),
        (this.locking = true),
        (this.enable = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            s.locking = false;
          })
        );
    }),
    (i.prototype.show_only_confirm = function(e, i, n, a) {
      const r = this;
      undefined === i && (i = null),
        undefined === n && (n = 960),
        undefined === a && (a = 560),
        (this.func_confirm = i),
        (this.desc.text = e),
        (this.root.x = n),
        (this.root.y = a),
        (this.root.getChildByName('btn_confirm').x = 226),
        (this.root.getChildByName('btn_cancel').visible = false),
        (this.locking = true),
        (this.enable = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            r.locking = false;
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
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_SecondConfirm = e;
})(uiscript || (uiscript = {}));