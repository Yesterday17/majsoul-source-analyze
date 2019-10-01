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

var basic;
!(t => {
  var e = (t => {
    class e {
      constructor() {
        return t.call(this) || this;
      }

      Clone() {
        for (var t = new e(), i = 0; i < this.length; i++) t.push(this[i]);
        return t;
      }

      RemoveAt(t) {
        if (!(t < 0 || t >= this.length)) {
          var e = this[t];
          this[t] = this[this.length - 1];
          this[this.length - 1] = e;
          return this.pop();
        }
      }

      RemoveX(t) {
        for (var e = 0; e < this.length; e++)
          if (this[e] === t) {
            this.RemoveAt(e);
            break;
          }
        return this;
      }
    }

    __extends(e, t);

    return e;
  })(Array);
  t.Seq = e;
})(basic || (basic = {}));