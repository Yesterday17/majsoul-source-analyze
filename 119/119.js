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
        var t = e.call(this, new ui.entrance.maintenanceUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;

        this.root = this.me
          .getChildByName('maintenance')
          .getChildByName('container');

        this.info = this.root.getChildByName('text');
        this.me.visible = !1;
        this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            () => {
              t.close();
            },
            null,
            !1
          );
      }

      show(e) {
        this.info.text = e;
        this.me.visible = !0;
        t.UIBase.anim_pop_out(this.root, null);
      }

      close() {
        var e = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.me.visible = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Entrance_Maintenance = e;
})(uiscript || (uiscript = {}));