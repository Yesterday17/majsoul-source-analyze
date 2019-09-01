var caps;
!(function(t) {
  var e = (function(t) {
    function e(e) {
      var i = t.call(this) || this;
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