let capsui;
!(t => {
  const e = (() => {
    function t() {
      (this._data = null), (this._me = null), (this.active = false);
    }
    return Object.defineProperty(t.prototype, 'me', {
      get() {
        return this._me;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'owner', {
      set(t) {
        this._me = t;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'copydata', {
      set(t) {
        this._data = t;
      },
      enumerable: true,
      configurable: true
    }),
    (t.prototype.getNodeClone = function() {
      const t = Laya.View.createComp(this._data);
      return this.me.parent.addChild(t), t;
    }),
    t
  ;
  })();
  t.UICopy = e;
})(capsui || (capsui = {}));