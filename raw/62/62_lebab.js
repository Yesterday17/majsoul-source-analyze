let capsui;
!(t => {
  const e = (() => {
    function t() {
      (this._me = null), (this._root_view = null);
    }
    return Object.defineProperty(t.prototype, 'me', {
      get() {
        return this._me;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(t.prototype, 'root_view', {
      get() {
        return this._root_view;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(t.prototype, 'owner', {
      set(t) {
        const e = this;
        (this._me = t),
          this._me.frameOnce(2, this, () => {
            for (var t = e._me; t && !(t instanceof Laya.View); )
              t = t.parent;
            (e._root_view = t),
              e._root_view &&
                (e._root_view.on('onenable', e, e._onEnable),
                e._root_view.on('ondisable', e, e._onDisable)),
              e.onCreate();
          });
      },
      enumerable: !0,
      configurable: !0
    }),
    (t.prototype._onEnable = function() {
      !this.me || this.me.destroyed ? this.onDestroy() : this.onEnable();
    }),
    (t.prototype._onDisable = function() {
      !this.me || this.me.destroyed ? this.onDestroy() : this.onDisable();
    }),
    (t.prototype.onCreate = () => {}),
    (t.prototype.onEnable = () => {}),
    (t.prototype.onDisable = () => {}),
    (t.prototype.onDestroy = function() {
      this._root_view &&
        (this._root_view.off('onenable', this, this._onEnable),
        this._root_view.off('ondisable', this, this._onDisable));
    }),
    t
  ;
  })();
  t.UIComponent = e;
})(capsui || (capsui = {}));