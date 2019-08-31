const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.both_ui.secondconfirmUI()) || this;
      return (
        (t.func_cancel = null),
        (t.func_confirm = null),
        (t.locking = !1),
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
          !1
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
          !1
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
        (this.locking = !1);
    }),
    (i.prototype.show = function(e, i, n, a, r) {
      const s = this;
      void 0 === i && (i = null),
        void 0 === n && (n = null),
        void 0 === a && (a = 960),
        void 0 === r && (r = 560),
        (this.func_cancel = n),
        (this.func_confirm = i),
        (this.desc.text = e),
        (this.root.x = a),
        (this.root.y = r),
        (this.root.getChildByName('btn_confirm').x = 114),
        (this.root.getChildByName('btn_cancel').x = 339),
        (this.root.getChildByName('btn_cancel').visible = !0),
        (this.locking = !0),
        (this.enable = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            s.locking = !1;
          })
        );
    }),
    (i.prototype.show_only_confirm = function(e, i, n, a) {
      const r = this;
      void 0 === i && (i = null),
        void 0 === n && (n = 960),
        void 0 === a && (a = 560),
        (this.func_confirm = i),
        (this.desc.text = e),
        (this.root.x = n),
        (this.root.y = a),
        (this.root.getChildByName('btn_confirm').x = 226),
        (this.root.getChildByName('btn_cancel').visible = !1),
        (this.locking = !0),
        (this.enable = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            r.locking = !1;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_SecondConfirm = e;
})(uiscript || (uiscript = {}));