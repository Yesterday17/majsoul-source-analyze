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
      constructor(e, i) {
        var n = t.call(this, i) || this;
        n.__activity_name = e;
        return n;
      }

      get activity_name() {
        return this.__activity_name;
      }

      isopen() {
        return !1;
      }

      haveRedPoint() {
        return !1;
      }

      need_popout() {
        return !1;
      }

      show() {}
      hide() {}
    }

    __extends(e, t);

    return e;
  })(t.UIBase);
  t.UI_ActivityBase = e;
})(uiscript || (uiscript = {}));