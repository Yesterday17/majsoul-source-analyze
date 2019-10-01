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
        var t = e.call(this, new ui.mj.hangup_warnUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;
        this.blackbg = this.me.getChildByName('blackbg');
        this.root = this.me.getChildByName('root');
        this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = new Laya.Handler(this, () => {
          view.DesktopMgr.Inst.hangupCount = 0;
          t.locking || (t.close());
        });
      }

      show() {
        var e = this;
        this.locking = !0;
        this.enable = !0;
        this.blackbg.alpha = 0;
        Laya.Tween.to(this.blackbg, { alpha: 0.3 }, 150);
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
        Laya.Tween.to(this.blackbg, { alpha: 0 }, 150);
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
  t.UI_Hangup_Warn = e;
})(uiscript || (uiscript = {}));