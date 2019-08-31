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
      const t = e.call(this, new ui.mj.hangup_warnUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.blackbg = this.me.getChildByName('blackbg')),
        (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = new Laya.Handler(this, () => {
          t.locking || ((view.DesktopMgr.Inst.hangupCount = 0), t.close());
        }));
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.locking = !0),
        (this.enable = !0),
        (this.blackbg.alpha = 0),
        Laya.Tween.to(this.blackbg, { alpha: 0.3 }, 150),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        Laya.Tween.to(this.blackbg, { alpha: 0 }, 150),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Hangup_Warn = e;
})(uiscript || (uiscript = {}));