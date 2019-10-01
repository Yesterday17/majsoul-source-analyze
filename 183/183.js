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
        var i = t.call(this, new ui.both_ui.light_tipsUI()) || this;
        i.locking = !1;
        e.Inst = i;
        return i;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.info = this.root.getChildByName('info');
        this.me.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );
      }

      show(t) {
        var e = this;
        this.info.text = t;
        this.root.height = 120 + this.info.textField.textHeight;
        this.enable = !0;
        this.locking = !0;
        this.root.scaleY = 0;
        Laya.timer.clearAll(this);

        Laya.Tween.to(
          this.root,
          { scaleY: 1 },
          150,
          null,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );

        Laya.timer.once(3e3, this, () => {
          e.close();
        });
      }

      close() {
        var t = this;
        this.locking = !0;
        Laya.timer.clearAll(this);
        Laya.Tween.to(
          this.root,
          { scaleY: 0 },
          150,
          null,
          Laya.Handler.create(this, () => {
            t.locking = !1;
            t.enable = !1;
          })
        );
      }
    }

    __extends(e, t);

    return e;
  })(t.UIBase);
  t.UI_LightTips = e;
})(uiscript || (uiscript = {}));