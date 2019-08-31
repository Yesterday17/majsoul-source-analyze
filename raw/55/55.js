var capsui;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t._dfs_idmap = function(t, e, i) {
        if ((e.compId && (i[e.compId] = t), e.child))
          for (var n = 0; n < e.child.length; n++) {
            var a = e.child[n];
            if (a.props && a.props.name) {
              var r = t.getChildByName(a.props.name);
              r && this._dfs_idmap(r, a, i);
            }
          }
      }),
      (t.createFrameAnimation = function(t, e, i, n) {
        var a = e;
        if (!a.animations || 0 == a.animations.length) return null;
        var r = null;
        if ('' == n) r = a.animations[0];
        else
          for (c = 0; c < a.animations.length; c++)
            if (a.animations[c].name == n) {
              r = a.animations[c];
              break;
            }
        if (null == r) return null;
        var s = {},
          o = e;
        if ('' != i)
          for (var l = i.split('/'), h = 0; h < l.length; h++) {
            if (!o.child) return null;
            for (var c = 0; c < o.child.length; c++) {
              var u = o.child[c];
              u.props && u.props.name && u.props.name == l[h] && (o = u);
            }
          }
        this._dfs_idmap(t, o, s);
        var _ = new Laya.FrameAnimation();
        return _._setUp(s, r), _.stop(), _;
      }),
      t
    );
  })();
  t.UIAnim = e;
})(capsui || (capsui = {}));