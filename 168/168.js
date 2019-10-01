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
  var e = (t => {
    class e {
      constructor() {
        var i = t.call(this, new ui.both_ui.gettitleUI()) || this;
        e.Inst = i;
        return i;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.icon = this.root.getChildByName('icon');
        this.btn_close = this.me.getChildByName('btn_close');
        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );
      }

      show(t, e) {
        var i = this;
        this.enable = !0;
        this.complete = e;

        this.icon.skin = game.LoadMgr.getResImageSkin(
            cfg.item_definition.title.get(t).icon
          );

        this.btn_close.visible = !1;
        this.root.alpha = 1;
        this.locking = !0;
        this.me.in.play(0, !1);
        Laya.timer.once(1e3, this, () => {
          i.locking = !1;
          i.btn_close.visible = !0;
        });
      }

      close() {
        var t = this;
        this.locking = !0;
        this.me.out.play(0, !1);
        Laya.timer.once(200, this, () => {
          t.locking = !1;
          t.enable = !1;
          t.complete && t.complete.run();
        });
      }
    }

    __extends(e, t);

    e.Inst = null;
    return e;
  })(t.UIBase);
  t.UI_Gettitle = e;
})(uiscript || (uiscript = {}));