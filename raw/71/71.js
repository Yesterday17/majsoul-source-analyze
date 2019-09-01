var capsui;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = t.call(this) || this;
      return (
        (e._total_count = 0),
        (e._func_load = null),
        (e._loading = null),
        (e._duringLoading = false),
        (e._load_id = 0),
        e
      );
    }
    return (
      __extends(e, t),
      Object.defineProperty(e.prototype, 'total_count', {
        get: function() {
          return this._total_count;
        },
        set: function(t) {
          (this._total_count = t), this._pendingLoad();
        },
        enumerable: true,
        configurable: true
      }),
      (e.prototype.reset = function() {
        (this._load_id = 0),
          (this._total_count = 0),
          (this._duringLoading = false),
          (this._loading.visible = false),
          t.prototype.reset.call(this);
      }),
      (e.prototype.onCreate = function() {
        (this._loading = this.me.getChildByName('loading')),
          (this._loading.visible = false),
          t.prototype.onCreate.call(this);
      }),
      (e.prototype.init_nolimitlist = function(t, e) {
        (this._func_load = t), this.init_scrollview(e);
      }),
      (e.prototype._onRateChange = function(e) {
        t.prototype._onRateChange.call(this, e), this._pendingLoad();
      }),
      (e.prototype._pendingLoad = function() {
        var t = this;
        if (
          !this._duringLoading &&
          this._total_count > this.value_count &&
          (1 - this.rate) * this.value_count <= 3 &&
          this._func_load
        ) {
          (this._duringLoading = true), this._load_id++;
          var e = this._load_id;
          this._func_load.runWith(this.value_count),
            Laya.timer.once(700, this, function() {
              t._duringLoading && e == t._load_id && (t._loading.visible = true);
            });
        }
      }),
      (e.prototype.loadOver = function(t, e) {
        this._duringLoading &&
          ((this._duringLoading = false),
          this._loading && (this._loading.visible = false),
          t ? this.addItem(e) : (this._total_count = this.value_count));
      }),
      (e.prototype.popItem = function() {
        this._total_count--, t.prototype.popItem.call(this);
      }),
      e
    );
  })(t.CScrollView);
  t.NoLimitList = e;
})(capsui || (capsui = {}));