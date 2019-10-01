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
    function e(e) {
      var i = t.call(this, e) || this;
      i.cull = 2;
      i.blend = 1;
      i.srcBlend = 770;
      i.dstBlend = 771;
      i.alphaTest = !0;
      i.depthWrite = !0;
      i.renderQueue = 2;
      return i;
    }
    __extends(e, t);
    return e;
  })(t.BaseMaterial);
  t.Material_Clip = e;
})(caps || (caps = {}));