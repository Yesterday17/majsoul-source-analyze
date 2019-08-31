let capsui;
!(t => {
  const e = (() => {
    function t() {}
    return (t._dfs_idmap = function(t, {compId, child}, i) {
      if ((compId && (i[compId] = t), child))
        for (let n = 0; n < child.length; n++) {
          const a = child[n];
          if (a.props && a.props.name) {
            const r = t.getChildByName(a.props.name);
            r && this._dfs_idmap(r, a, i);
          }
        }
    }),
    (t.createFrameAnimation = function(t, e, i, n) {
      const a = e;
      if (!a.animations || 0 == a.animations.length) return null;
      let r = null;
      if ('' == n) r = a.animations[0];
      else
        for (c = 0; c < a.animations.length; c++)
          if (a.animations[c].name == n) {
            r = a.animations[c];
            break;
          }
      if (null == r) return null;
      const s = {};
      let o = e;
      if ('' != i)
        for (let l = i.split('/'), h = 0; h < l.length; h++) {
          if (!o.child) return null;
          for (var c = 0; c < o.child.length; c++) {
            const u = o.child[c];
            u.props && u.props.name && u.props.name == l[h] && (o = u);
          }
        }
      this._dfs_idmap(t, o, s);
      const _ = new Laya.FrameAnimation();
      return _._setUp(s, r), _.stop(), _;
    }),
    t
  ;
  })();
  t.UIAnim = e;
})(capsui || (capsui = {}));