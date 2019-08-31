let caps;
!(t => {
  const e = (() => {
    function e() {
      (this._init_state = 0), (this._items = []), (this._loading_num = 0);
    }
    return (e.filterString = t => {
      for (var e = '', i = 0; i < t.length; ) {
        const n = t.indexOf('\r', i);
        if (-1 == n) {
          e += t.substring(i, t.length);
          break;
        }
        i < n && (e += t.substring(i, n)), (i = n + 1);
      }
      return e;
    }),
    (e.prototype.init = function(e) {
      (this._complete = e),
        2 != this._init_state
          ? 0 == this._init_state &&
            ((this._init_state = 1),
            (this._loading_num = 0),
            this._init(
              t.Shader_RanShao.filename,
              t.Shader_RanShao.attributeMap,
              t.Shader_RanShao.uniformMap
            ),
            this._init(
              t.Cartoon.filename,
              t.Cartoon.attributeMap,
              t.Cartoon.uniformMap
            ),
            this._init(
              t.Outline.filename,
              t.Outline.attributeMap,
              t.Outline.uniformMap
            ))
          : this._complete && this._complete.run();
    }),
    (e.prototype._create_complete = function(t) {
      this._loading_num--,
        0 == this._loading_num &&
          ((this._init_state = 2), this._complete && this._complete.run());
    }),
    (e.prototype._init = function(t, i, n) {
      function a() {
        if (null != o && null != l) {
          const e = Laya.Shader3D.nameKey.add(t);
          Laya.ShaderCompile3D.add(e, l, o, i, n), s._create_complete(t);
        }
      }
      const r = this;
      var s = this;
      var o = null;
      var l = null;
      this._loading_num++;
      const h = `shader/${t}/${t}.vs`;
      Laya.loader.load(
        h,
        Laya.Handler.create(this, () => {
          Laya.timer.frameOnce(1, r, () => {
            (l = e.filterString(Laya.loader.getRes(h))), a();
          });
        })
      );
      const c = `shader/${t}/${t}.ps`;
      Laya.loader.load(
        c,
        Laya.Handler.create(this, () => {
          Laya.timer.frameOnce(1, r, () => {
            (o = e.filterString(Laya.loader.getRes(c))), a();
          });
        })
      );
    }),
    e
  ;
  })();
  t.ShaderInitor = e;
})(caps || (caps = {}));