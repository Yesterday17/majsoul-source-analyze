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
      const t = e.call(this, new ui.both_ui.need_bind_mailUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        })),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking ||
            (e.close(),
            GameMgr.Inst.sociotype >= 1
              ? t.UI_Bind_Mail0.Inst.show()
              : t.UI_Bind_Mail1.Inst.show());
        }));
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.locking = !0),
        (this.enable = !0),
        (this.root.getChildByName('info').text = game.Tools.strOfLocalization(
          2808
        )),
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
    i
  ;
  })(t.UIBase);
  t.UI_Need_Bind_Mail = e;
})(uiscript || (uiscript = {}));