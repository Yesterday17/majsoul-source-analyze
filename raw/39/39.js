var game;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.loading = 1)] = 'loading'),
      (t[(t.loaded = 2)] = 'loaded');
  })((e = t.E_LoadState || (t.E_LoadState = {})));
  var i = (function() {
    function t() {
      (this._active = false), (this._load_state = e.none);
    }
    return (
      Object.defineProperty(t.prototype, 'active', {
        get: function() {
          return this._active;
        },
        set: function(t) {
          (this._active = t), this._active ? this.onEnable() : this.onDisable();
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(t.prototype, 'load_state', {
        get: function() {
          return this._load_state;
        },
        enumerable: true,
        configurable: true
      }),
      t
    );
  })();
  t.SceneBase = i;
})(game || (game = {}));