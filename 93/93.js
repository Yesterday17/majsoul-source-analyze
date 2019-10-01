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

var caps;
!(t => {
  var e = (t => {
    class e {
      constructor(e) {
        var i = t.call(this) || this;
        '' != e && i.setShaderName(e);
        return i;
      }

      setInt(t, e) {
        this._setInt(t, e);
      }

      getInt(t) {
        return this._getInt(t);
      }

      setNumber(t, e) {
        this._setNumber(t, e);
      }

      getNumber(t) {
        return this._getNumber(t);
      }

      setBool(t, e) {
        this._setBool(t, e);
      }

      getBool(t) {
        return this._getBool(t);
      }

      setVector2(t, e) {
        this._setVector2(t, e);
      }

      getVector2(t) {
        return this._getVector2(t);
      }

      setColor(t, e) {
        this._setColor(t, e);
      }

      getColor(t) {
        return this._getColor(t);
      }

      setTexture(t, e) {
        this._setTexture(t, e);
      }

      getTexture(t) {
        return this._getTexture(t);
      }
    }

    __extends(e, t);

    return e;
  })(Laya.BaseMaterial);
  t.BaseMaterial = e;
})(caps || (caps = {}));