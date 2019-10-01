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
        var i = t.call(this, new ui.both_ui.fly_tipsUI()) || this;
        i.templete = null;
        i.clone = null;
        i.last_tips = null;
        e.Inst = i;
        return i;
      }

      static ShowTips(t) {
        this.Inst && this.Inst._fly_tips(t);
      }

      onCreate() {
        this.templete = this.me.getChildByName('templete');
        this.templete.visible = !1;
        this.clone = this.templete.scriptMap['capsui.UICopy'];
      }

      _fly_tips(t) {
        var e = this;
        this.enable = !0;
        var i = this.clone.getNodeClone();
        i.text = t;
        var n = 540;
        this.last_tips && (n = Math.max(n, this.last_tips.y + 50));
        i.y = n;
        i.visible = !0;
        this.last_tips = i;
        Laya.Tween.to(
          i,
          { y: n - 150, alpha: 0 },
          1500,
          Laya.Ease.linearNone,
          Laya.Handler.create(this, () => {
            e.last_tips.destroy(!0);
            e.last_tips = null;
            e.last_tips === i &&
              ((e.enable = !1));
          })
        );
      }
    }

    __extends(e, t);

    return e;
  })(t.UIBase);
  t.UI_FlyTips = e;
})(uiscript || (uiscript = {}));