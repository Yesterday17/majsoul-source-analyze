var game;
!(t => {
  var e = (() => {
    class e {
      static init(e) {
        this._manifest = {};

        t.LoadMgr.httpload(
          'version.json',
          'json',
          !0,
          Laya.Handler.create(this, this.onManifestLoaded, [e])
        );

        Laya.URL.customFormat = this.formatURL;
      }

      static onManifestLoaded(e, {success, data}) {
        app.Log.log('version.json加载失败');
        if (success) {
          app.Log.log('version.json加载成功');
          var n = data;
          this._version = n.version;
          t.LoadMgr.httpload(
            `resversion${this._version}.json`,
            'json',
            !1,
            Laya.Handler.create(this, this.onResVersionLoaded, [e])
          );
        } else e.run();
      }

      static onResVersionLoaded(t, {success, data}) {
        if (success) {
          app.Log.log('Resversion.json加载成功');
          var i = data;
          for (var n in i.res) this._manifest[n] = i.res[n].prefix;
        } else app.Log.log('Resversion.json加载失败');
        t.run();
      }
    }

    Object.defineProperty(e, 'version', {
      get() {
        return this._version;
      },
      enumerable: !0,
      configurable: !0
    });

    e.formatURL = t => e._manifest.hasOwnProperty(t) ? `${e._manifest[t]}/${t}` : t;

    e._manifest = {};
    e._version = '0.0.0';
    return e;
  })();
  t.ResourceVersion = e;
})(game || (game = {}));