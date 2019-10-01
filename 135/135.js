var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.lobby.agesuccessUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;

        this.root = this.me
          .getChildByName('agepending')
          .getChildByName('root');

        this.btn_confirm = this.root.getChildByName('btn_confirm');
        this.btn_close = this.root.getChildByName('btn_close');

        this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );

        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );
      }

      show() {
        var e = this;
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Agesuccess = e;
})(uiscript || (uiscript = {}));