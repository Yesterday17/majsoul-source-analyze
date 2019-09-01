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
      enumerable: true,
      configurable: true
    }),
    (e.prototype.isopen = () => false),
    (e.prototype.haveRedPoint = () => false),
    (e.prototype.need_popout = () => false),
    (e.prototype.show = () => {}),
    (e.prototype.hide = () => {}),
    e
  ;
  })(t.UIBase);
  t.UI_ActivityBase = e;
})(uiscript || (uiscript = {}));