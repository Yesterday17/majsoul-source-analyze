var game;
!(function(t) {
  var e = (function() {
    function e() {}
    return (
      Object.defineProperty(e, 'version', {
        get: function() {
          return this._version;
        },
        enumerable: true,
        configurable: true
      }),
      (e.init = function(e) {
        (this._manifest = {}),
          t.LoadMgr.httpload(
            'version.json',
            'json',
            true,
            Laya.Handler.create(this, this.onManifestLoaded, [e])
          ),
          (Laya.URL.customFormat = this.formatURL);
      }),
      (e.onManifestLoaded = function(e, i) {
        if (i.success) {
          app.Log.log('version.json加载成功');
          var n = i.data;
          (this._version = n.version),
            t.LoadMgr.httpload(
              'resversion' + this._version + '.json',
              'json',
              false,
              Laya.Handler.create(this, this.onResVersionLoaded, [e])
            );
        } else app.Log.log('version.json加载失败'), e.run();
      }),
      (e.onResVersionLoaded = function(t, e) {
        if (e.success) {
          app.Log.log('Resversion.json加载成功');
          var i = e.data;
          for (var n in i.res) this._manifest[n] = i.res[n].prefix;
        } else app.Log.log('Resversion.json加载失败');
        t.run();
      }),
      (e.formatURL = function(t) {
        return e._manifest.hasOwnProperty(t) ? e._manifest[t] + '/' + t : t;
      }),
      (e._manifest = {}),
      (e._version = '0.0.0'),
      e
    );
  })();
  t.ResourceVersion = e;
})(game || (game = {}));