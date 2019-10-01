var capsui;
!(t => {
  var e = (() => {
    class t {
      constructor() {
        this._me = null;
        this._root_view = null;
      }

      get me() {
        return this._me;
      }

      get root_view() {
        return this._root_view;
      }

      set owner(t) {
        var e = this;
        this._me = t;
        this._me.frameOnce(2, this, () => {
          for (var t = e._me; t && !(t instanceof Laya.View); )
            t = t.parent;
          e._root_view = t;
          e._root_view.on('onenable', e, e._onEnable);

          e._root_view &&
            (e._root_view.on('ondisable', e, e._onDisable));

          e.onCreate();
        });
      }

      _onEnable() {
        !this.me || this.me.destroyed ? this.onDestroy() : this.onEnable();
      }

      _onDisable() {
        !this.me || this.me.destroyed ? this.onDestroy() : this.onDisable();
      }

      onCreate() {}
      onEnable() {}
      onDisable() {}

      onDestroy() {
        this._root_view.off('onenable', this, this._onEnable);
        this._root_view &&
          (this._root_view.off('ondisable', this, this._onDisable));
      }
    }

    return t;
  })();
  t.UIComponent = e;
})(capsui || (capsui = {}));