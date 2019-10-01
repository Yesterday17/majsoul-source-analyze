var capsui;
!(t => {
  var e = (() => {
    class t {
      static _dfs_idmap(t, {compId, child}, i) {
        compId && (i[compId] = t);
        if ((child))
          for (var n = 0; n < child.length; n++) {
            var a = child[n];
            if (a.props && a.props.name) {
              var r = t.getChildByName(a.props.name);
              r && this._dfs_idmap(r, a, i);
            }
          }
      }

      static createFrameAnimation(t, e, i, n) {
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
        var s = {};
        var o = e;
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
        _._setUp(s, r);
        _.stop();
        return _;
      }
    }

    return t;
  })();
  t.UIAnim = e;
})(capsui || (capsui = {}));