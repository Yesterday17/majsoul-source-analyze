var capsui;
!(t => {
  var e = (() => {
    class t {
      constructor() {
        this._data = null;
        this._me = null;
        this.active = !1;
      }

      get me() {
        return this._me;
      }

      set owner(t) {
        this._me = t;
      }

      set copydata(t) {
        this._data = t;
      }

      getNodeClone() {
        var t = Laya.View.createComp(this._data);
        this.me.parent.addChild(t);
        return t;
      }
    }

    return t;
  })();
  t.UICopy = e;
})(capsui || (capsui = {}));