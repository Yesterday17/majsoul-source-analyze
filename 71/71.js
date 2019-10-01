var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var capsui;
!(t => {
  var e = (t => {
    class e {
      constructor() {
        var e = t.call(this) || this;
        e._total_count = 0;
        e._func_load = null;
        e._loading = null;
        e._duringLoading = !1;
        e._load_id = 0;
        return e;
      }

      get total_count() {
        return this._total_count;
      }

      set total_count(t) {
        this._total_count = t;
        this._pendingLoad();
      }

      reset() {
        this._load_id = 0;
        this._total_count = 0;
        this._duringLoading = !1;
        this._loading.visible = !1;
        t.prototype.reset.call(this);
      }

      onCreate() {
        this._loading = this.me.getChildByName('loading');
        this._loading.visible = !1;
        t.prototype.onCreate.call(this);
      }

      init_nolimitlist(t, e) {
        this._func_load = t;
        this.init_scrollview(e);
      }

      _onRateChange(e) {
        t.prototype._onRateChange.call(this, e);
        this._pendingLoad();
      }

      _pendingLoad() {
        var t = this;
        if (
          !this._duringLoading &&
          this._total_count > this.value_count &&
          (1 - this.rate) * this.value_count <= 3 &&
          this._func_load
        ) {
          this._duringLoading = !0;
          this._load_id++;
          var e = this._load_id;
          this._func_load.runWith(this.value_count);
          Laya.timer.once(700, this, () => {
            t._duringLoading && e == t._load_id && (t._loading.visible = !0);
          });
        }
      }

      loadOver(t, e) {
        this._duringLoading = !1;
        this._loading && (this._loading.visible = !1);
        this._duringLoading &&
          ((t ? this.addItem(e) : this._total_count = this.value_count));
      }

      popItem() {
        this._total_count--;
        t.prototype.popItem.call(this);
      }
    }

    __extends(e, t);

    return e;
  })(t.CScrollView);
  t.NoLimitList = e;
})(capsui || (capsui = {}));