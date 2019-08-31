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
      const t = e.call(this, new ui.common.closeappUI()) || this;
      return (t.locking = !1), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              (e.close(),
              Laya.Browser.window.conch &&
                Laya.Browser.window.conch.exit &&
                Laya.Browser.window.conch.exit());
          },
          null,
          !1
        )),
        (this.root.getChildByName(
          'btn_cancel'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
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
        (this.desc.text = game.Tools.strOfLocalization(22)),
        (this.locking = !1),
        GameMgr.inConch &&
          Laya.Browser.window.conch.setOnBackPressedFunction &&
          Laya.Browser.window.conch.setOnBackPressedFunction(() => {
            e.locking || t.UI_CloseApp.Inst.show();
          });
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.locking = !0),
        (this.enable = !0),
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
  t.UI_CloseApp = e;
})(uiscript || (uiscript = {}));