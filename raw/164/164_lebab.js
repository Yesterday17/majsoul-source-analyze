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
      const t = e.call(this, new ui.both_ui.infolite_titleUI()) || this;
      return (
        (t.panel = null),
        (t.desc = null),
        (t.locking = !1),
        (t.title = null),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.panel = this.root.getChildByName('content')),
        (this.panel.vScrollBar.visible = !1),
        (this.desc = this.panel.getChildByName('desc')),
        (this.title = this.root.getChildByName('title')),
        (this.locking = !1),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.close();
          },
          null,
          !1
        ));
    }),
    (i.prototype.show = function(e, i) {
      const n = this;
      (this.me.visible = !0),
        (this.title.text = e),
        (this.panel.vScrollBar.value = 0),
        (this.desc.text = i),
        (this.desc.height = this.desc.textField.textHeight),
        (this.locking = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        );
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_InfoLite_Title = e;
})(uiscript || (uiscript = {}));