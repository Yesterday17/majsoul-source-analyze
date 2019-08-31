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
        (this.me.visible = !1),
        (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.close();
          },
          null,
          !1
        ));
    }),
    (i.prototype.show = function(e) {
      (this.info.text = e),
        (this.me.visible = !0),
        t.UIBase.anim_pop_out(this.root, null);
    }),
    (i.prototype.close = function() {
      const e = this;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.me.visible = !1;
        })
      );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Entrance_Maintenance = e;
})(uiscript || (uiscript = {}));