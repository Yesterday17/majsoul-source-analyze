let caps;
!(t => {
  const e = (t => {
    function e(e) {
      const i = t.call(this, e) || this;
      return (
        (i.cull = 2),
        (i.blend = 1),
        (i.srcBlend = 770),
        (i.dstBlend = 771),
        (i.alphaTest = true),
        (i.depthWrite = true),
        (i.renderQueue = 2),
        i
      );
    }
    return __extends(e, t), e;
  })(t.BaseMaterial);
  t.Material_Clip = e;
})(caps || (caps = {}));