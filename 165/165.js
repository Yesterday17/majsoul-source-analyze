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
        var t = e.call(this, new ui.mj.gamestopUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        this.blackbg = this.me.getChildByName('blackbg');
        this.root = this.me.getChildByName('root');
        this.label_dots = this.root.getChildByName('dots');
      }

      show() {
        var e = this;
        if (!this.enable) {
          this.enable = !0;
          this.blackbg.visible = !0;
          this.blackbg.alpha = 0;

          view.DesktopMgr.Inst.mode == view.EMJMode.play
            ? (Laya.Tween.to(this.blackbg, { alpha: 0.3 }, 200))
            : (this.blackbg.visible = !1);

          this.root.scaleX = this.root.scaleY = 1;
          t.UIBase.anim_pop_out(this.root, null);
          Laya.timer.clearAll(this);
          var i = 0;
          Laya.timer.loop(1e3, this, () => {
            for (var t = '', n = 0; n < i; n++) t += '.';
            i = (i + 1) % 4;
            e.label_dots.text = t;
          });
        }
      }

      close() {
        this.enable = !1;
        Laya.timer.clearAll(this);
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_GameStop = e;
})(uiscript || (uiscript = {}));