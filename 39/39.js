var game;
!(t => {
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.loading = 1)] = 'loading';
    t[(t.loaded = 2)] = 'loaded';
  })(e = t.E_LoadState || (t.E_LoadState = {}));
  var i = (() => {
    class t {
      constructor() {
        this._active = !1;
        this._load_state = e.none;
      }

      get active() {
        return this._active;
      }

      set active(t) {
        this._active = t;
        this._active ? this.onEnable() : this.onDisable();
      }

      get load_state() {
        return this._load_state;
      }
    }

    return t;
  })();
  t.SceneBase = i;
})(game || (game = {}));