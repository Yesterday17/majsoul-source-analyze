const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (t => {
    function e(e, i) {
      const n = t.call(this, i) || this;
      return (n.__activity_name = e), n;
    }
    return __extends(e, t),
    Object.defineProperty(e.prototype, 'activity_name', {
      get() {
        return this.__activity_name;
      },
      enumerable: !0,
      configurable: !0
    }),
    (e.prototype.isopen = () => !1),
    (e.prototype.haveRedPoint = () => !1),
    (e.prototype.need_popout = () => !1),
    (e.prototype.show = () => {}),
    (e.prototype.hide = () => {}),
    e
  ;
  })(t.UIBase);
  t.UI_ActivityBase = e;
})(uiscript || (uiscript = {}));