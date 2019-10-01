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
        var t = e.call(this, new ui.entrance.error_infoUI()) || this;
        t.locking = !1;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;

        this.root = this.me
          .getChildByName('error')
          .getChildByName('container');

        this.info = this.root.getChildByName('text');
        this.me.visible = !1;
        this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );
      }

      show(e, i) {
        var n = this;
        this.info.text = e;

        this.root.getChildByName('einfo').text = i
            ? app.Log.getCacheLog()
            : '';

        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.enable = !1;
            e.locking = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Entrance_Error = e;
})(uiscript || (uiscript = {}));