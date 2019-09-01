let basic;
!(t => {
  const e = (t => {
    function e() {
      return t.call(this) || this;
    }
    return __extends(e, t),
    (e.prototype.Clone = function() {
      for (var t = new e(), i = 0; i < this.length; i++) t.push(this[i]);
      return t;
    }),
    (e.prototype.RemoveAt = function(t) {
      if (!(t < 0 || t >= this.length)) {
        const e = this[t];
        return (
          (this[t] = this[this.length - 1]),
          (this[this.length - 1] = e),
          this.pop()
        );
      }
    }),
    (e.prototype.RemoveX = function(t) {
      for (let e = 0; e < this.length; e++)
        if (this[e] === t) {
          this.RemoveAt(e);
          break;
        }
      return this;
    }),
    e
  ;
  })(Array);
  t.Seq = e;
})(basic || (basic = {}));