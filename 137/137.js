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
        return e.call(this, new ui.mj.alUI()) || this;
      }

      static Show() {
        var e = new i();
        t.UIMgr.Inst.AddMJUI(e);
        Laya.timer.frameOnce(5, this, () => {
          e.show();
        });
      }

      show() {
        var t = this;
        this.me.visible = !0;
        this.me.start.play(0, !1);
        Laya.timer.once(1300, this, () => {
          t.me.visible = !1;
          t.me.destroy(!0);
        });
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_AL = e;
})(uiscript || (uiscript = {}));