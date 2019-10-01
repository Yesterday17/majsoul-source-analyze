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
  var e = (e => {
    function i(i) {
      var n = e.call(this, i) || this;
      n.cull = t.BaseMaterial.CULL_FRONT;
      n.blend = 1;
      n.srcBlend = 770;
      n.dstBlend = 771;
      n.alphaTest = !0;
      n.depthWrite = !0;
      n.renderQueue = 2;
      return n;
    }
    __extends(i, e);
    return i;
  })(t.BaseMaterial);
  t.Material_Outline = e;
})(caps || (caps = {}));