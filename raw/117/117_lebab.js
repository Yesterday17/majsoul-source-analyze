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
      const t = e.call(this, new ui.entrance.account_prohibitionUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me
        .getChildByName('Prohibition')
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
    (i.prototype.show = function({u32_params, str_params}) {
      let i = `${game.Tools.strOfLocalization(2064)}\n`;
      if (u32_params && u32_params.length >= 2)
        if (0 == u32_params[1])
          i += `${game.Tools.strOfLocalization(2065)}\n`;
        else {
          const n = u32_params[0] + u32_params[1];
          i +=
            `${game.Tools.strOfLocalization(2066) +
game.Tools.time2YearMounthDate(n)} ${game.Tools.time2HourMinute(n)}\n`;
        }
      str_params &&
        str_params.length > 0 &&
        (i += game.Tools.strOfLocalization(2067) + str_params[0]),
        (this.info.text = i),
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
  t.UI_Entrance_Prohibition = e;
})(uiscript || (uiscript = {}));