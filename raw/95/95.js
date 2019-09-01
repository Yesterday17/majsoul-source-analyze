var caps;
!(function(t) {
  var e = (function(e) {
    function i(i) {
      var n = e.call(this, i) || this;
      return (
        (n.cull = t.BaseMaterial.CULL_FRONT),
        (n.blend = 1),
        (n.srcBlend = 770),
        (n.dstBlend = 771),
        (n.alphaTest = true),
        (n.depthWrite = true),
        (n.renderQueue = 2),
        n
      );
    }
    return __extends(i, e), i;
  })(t.BaseMaterial);
  t.Material_Outline = e;
})(caps || (caps = {}));