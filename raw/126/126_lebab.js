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
      return e.call(this, new ui.mj.alUI()) || this;
    }
    return __extends(i, e),
    (i.Show = function() {
      const e = new i();
      t.UIMgr.Inst.AddMJUI(e),
        Laya.timer.frameOnce(5, this, () => {
          e.show();
        });
    }),
    (i.prototype.show = function() {
      const t = this;
      (this.me.visible = !0),
        this.me.start.play(0, !1),
        Laya.timer.once(1300, this, () => {
          (t.me.visible = !1), t.me.destroy(!0);
        });
    }),
    i
  ;
  })(t.UIBase);
  t.UI_AL = e;
})(uiscript || (uiscript = {}));