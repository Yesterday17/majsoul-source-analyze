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

let caps;
!(t => {
  const e = (e => {
    function i(i) {
      const n = e.call(this, i) || this;
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