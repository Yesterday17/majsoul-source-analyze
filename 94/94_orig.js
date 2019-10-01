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
  var e = (function(t) {
    function e(e) {
      var i = t.call(this, e) || this;
      return (
        (i.cull = 2),
        (i.blend = 1),
        (i.srcBlend = 770),
        (i.dstBlend = 771),
        (i.alphaTest = !0),
        (i.depthWrite = !0),
        (i.renderQueue = 2),
        i
      );
    }
    return __extends(e, t), e;
  })(t.BaseMaterial);
  t.Material_Clip = e;
})(caps || (caps = {}));