let capsui;
!(t => {
  const e = (() => {
    function t() {
      (this._data = null), (this._me = null), (this.active = !1);
    }
    return Object.defineProperty(t.prototype, 'me', {
      get() {
        return this._me;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(t.prototype, 'owner', {
      set(t) {
        this._me = t;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(t.prototype, 'copydata', {
      set(t) {
        this._data = t;
      },
      enumerable: !0,
      configurable: !0
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