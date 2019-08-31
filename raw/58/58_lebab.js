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