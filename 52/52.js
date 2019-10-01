var lqc;
!(t => {
  function e(t, e) {
    var i = new Error(e);
    i.code = t;
    throw (i);
  }
  var i = (() => {
    function t(t, e, i, n) {
      var a = this;
      this.table_ = t;
      this.sheet_ = e;
      this.rows_ = i || [];
      this.map_ = {};
      this.minKey_ = null;
      this.maxKey_ = null;

      i.sort((t, e) => t[n] - e[n]);

      this.minKey_ = i[0][n];

      i.length > 0 &&
        ((this.maxKey_ = i[i.length - 1][n]));

      i.forEach(t => {
        var e = t[n];
        a.map_[e] = t;
      });
    }

    t.prototype.get = function(t) {
      return this.map_[t];
    };

    t.prototype.find = function(t) {
      this.map_[t] ||
        e(
          'ERR_CONFIG_ROW_NOT_FIND',
          `[unique] ${this.table_}.${this.sheet_}#${t}`
        );

      return this.map_[t];
    };

    t.prototype.forEach = function(t) {
      this.rows_.forEach(t);
    };

    Object.defineProperty(t.prototype, 'table', {
      get() {
        return this.table_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'sheet', {
      get() {
        return this.sheet_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'count', {
      get() {
        return this.rows_.length;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'minKey', {
      get() {
        return this.minKey_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'maxKey', {
      get() {
        return this.maxKey_;
      },
      enumerable: !0,
      configurable: !0
    });

    return t;
  })();
  t.UniqueSheet = i;
  var n = (() => {
    function t(t, e, i) {
      this.table_ = t;
      this.sheet_ = e;
      this.rows_ = i || [];
    }

    t.prototype.forEach = function(t) {
      this.rows_.forEach(t);
    };

    Object.defineProperty(t.prototype, 'table', {
      get() {
        return this.table_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'sheet', {
      get() {
        return this.sheet_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'count', {
      get() {
        return this.rows_.length;
      },
      enumerable: !0,
      configurable: !0
    });

    return t;
  })();
  t.NoKeySheet = n;
  var a = (() => {
    function t(t, e, i, n) {
      var a = this;
      this.table_ = t;
      this.sheet_ = e;
      this.rows_ = i || [];
      this.groups_ = {};
      this.rows_.forEach(t => {
        var e = t[n];
        a.groups_[e] || (a.groups_[e] = []);
        a.groups_[e].push(t);
      });
    }

    t.prototype.getGroup = function(t) {
      return this.groups_[t];
    };

    t.prototype.findGroup = function(t) {
      this.groups_[t] ||
        e(
          'ERR_CONFIG_ROW_NOT_FIND',
          `[unique] ${this.table_}.${this.sheet_}#${t}`
        );

      return this.groups_[t];
    };

    t.prototype.forEach = function(t) {
      this.rows_.forEach(t);
    };

    t.prototype.forEachGroup = function(t) {
      var e = this;
      Object.keys(this.groups_).forEach(i => {
        t(e.groups_[i], i);
      });
    };

    Object.defineProperty(t.prototype, 'table', {
      get() {
        return this.table_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'sheet', {
      get() {
        return this.sheet_;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t.prototype, 'count', {
      get() {
        return this.rows_.length;
      },
      enumerable: !0,
      configurable: !0
    });

    return t;
  })();
  t.GroupSheet = a;
  var r = (() => {
    class t {
      constructor(t) {
        this.value_ = t;
        this.ref_ = null;
      }

      resolve(t) {
        this.ref_ = t;
      }

      get value() {
        return this.value_;
      }

      get ref() {
        return this.ref_;
      }
    }

    return t;
  })();
  t.ReferenceField = r;
})(lqc || (lqc = {}));