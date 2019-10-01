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
    function e() {
      var i = t.call(this, new ui.lobby.payment.loadingUI()) || this;
      e.Inst = i;
      return i;
    }
    __extends(e, t);
    return e;
  })(t.UIBase);
  t.UI_Payment_Loading = e;
})(uiscript || (uiscript = {}));