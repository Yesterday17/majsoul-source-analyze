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
        var t = e.call(this, new ui.both_ui.need_bind_mailUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            e.locking || e.close();
          });

        this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = new Laya.Handler(this, () => {
          e.close();
          e.locking ||
            ((GameMgr.Inst.sociotype >= 1 ? t.UI_Bind_Mail0.Inst.show() : t.UI_Bind_Mail1.Inst.show()));
        });
      }

      show() {
        var e = this;
        this.locking = !0;
        this.enable = !0;

        this.root.getChildByName('info').text = game.Tools.strOfLocalization(
            2808
          );

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
  t.UI_Need_Bind_Mail = e;
})(uiscript || (uiscript = {}));