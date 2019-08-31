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

let caps;
!(t => {
  const e = (t => {
    function e(e) {
      const i = t.call(this) || this;
      return '' != e && i.setShaderName(e), i;
    }
    return (
      __extends(e, t),
      (e.prototype.setInt = function(t, e) {
        this._setInt(t, e);
      }),
      (e.prototype.getInt = function(t) {
        return this._getInt(t);
      }),
      (e.prototype.setNumber = function(t, e) {
        this._setNumber(t, e);
      }),
      (e.prototype.getNumber = function(t) {
        return this._getNumber(t);
      }),
      (e.prototype.setBool = function(t, e) {
        this._setBool(t, e);
      }),
      (e.prototype.getBool = function(t) {
        return this._getBool(t);
      }),
      (e.prototype.setVector2 = function(t, e) {
        this._setVector2(t, e);
      }),
      (e.prototype.getVector2 = function(t) {
        return this._getVector2(t);
      }),
      (e.prototype.setColor = function(t, e) {
        this._setColor(t, e);
      }),
      (e.prototype.getColor = function(t) {
        return this._getColor(t);
      }),
      (e.prototype.setTexture = function(t, e) {
        this._setTexture(t, e);
      }),
      (e.prototype.getTexture = function(t) {
        return this._getTexture(t);
      }),
      e
    );
  })(Laya.BaseMaterial);
  t.BaseMaterial = e;
})(caps || (caps = {}));