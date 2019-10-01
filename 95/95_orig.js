var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  caps;
!(function(t) {
  var e = (function(e) {
    function i(i) {
      var n = e.call(this, i) || this;
      return (
        (n.cull = t.BaseMaterial.CULL_FRONT),
        (n.blend = 1),
        (n.srcBlend = 770),
        (n.dstBlend = 771),
        (n.alphaTest = !0),
        (n.depthWrite = !0),
        (n.renderQueue = 2),
        n
      );
    }
    return __extends(i, e), i;
  })(t.BaseMaterial);
  t.Material_Outline = e;
})(caps || (caps = {}));