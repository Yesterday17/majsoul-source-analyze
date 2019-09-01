let game;
!(t => {
  const e = (() => {
    function e() {}
    return Object.defineProperty(e, 'version', {
      get() {
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
    (e.onManifestLoaded = function(e, {success, data}) {
      if (success) {
        app.Log.log('version.json加载成功');
        const n = data;
        (this._version = n.version),
          t.LoadMgr.httpload(
            `resversion${this._version}.json`,
            'json',
            false,
            Laya.Handler.create(this, this.onResVersionLoaded, [e])
          );
      } else app.Log.log('version.json加载失败'), e.run();
    }),
    (e.onResVersionLoaded = function(t, {success, data}) {
      if (success) {
        app.Log.log('Resversion.json加载成功');
        const i = data;
        for (const n in i.res) this._manifest[n] = i.res[n].prefix;
      } else app.Log.log('Resversion.json加载失败');
      t.run();
    }),
    (e.formatURL = t => e._manifest.hasOwnProperty(t) ? `${e._manifest[t]}/${t}` : t),
    (e._manifest = {}),
    (e._version = '0.0.0'),
    e
  ;
  })();
  t.ResourceVersion = e;
})(game || (game = {}));