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
        var i = t.call(this, new ui.entrance.remind_newUI()) || this;
        i.process = null;
        i._created = !1;
        i._v = 0;
        e.Inst = i;
        return i;
      }

      onCreate() {
        this.process = this.me.getChildByName('process');
        this.process.text = `${this._v.toString()}/10`;
        this._created = !0;
      }

      setprocess(t) {
        this._v = t;
        this._created && (this.process.text = `${t.toString()}/10`);
      }
    }

    __extends(e, t);

    e.Inst = null;
    return e;
  })(t.UIBase);
  t.UI_Remind = e;
})(uiscript || (uiscript = {}));