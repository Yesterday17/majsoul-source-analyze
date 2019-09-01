let lqc;
!(t => {
  function e(t, e) {
    const i = new Error(e);
    throw ((i.code = t), i);
  }
  const i = (() => {
    function t(t, e, i, n) {
      const a = this;
      (this.table_ = t),
        (this.sheet_ = e),
        (this.rows_ = i || []),
        (this.map_ = {}),
        (this.minKey_ = null),
        (this.maxKey_ = null),
        i.sort((t, e) => t[n] - e[n]),
        i.length > 0 &&
          ((this.minKey_ = i[0][n]), (this.maxKey_ = i[i.length - 1][n])),
        i.forEach(t => {
          const e = t[n];
          a.map_[e] = t;
        });
    }
    return (t.prototype.get = function(t) {
      return this.map_[t];
    }),
    (t.prototype.find = function(t) {
      return this.map_[t] ||
        e(
          'ERR_CONFIG_ROW_NOT_FIND',
          `[unique] ${this.table_}.${this.sheet_}#${t}`
        ),
      this.map_[t]
    ;
    }),
    (t.prototype.forEach = function(t) {
      this.rows_.forEach(t);
    }),
    Object.defineProperty(t.prototype, 'table', {
      get() {
        return this.table_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'sheet', {
      get() {
        return this.sheet_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'count', {
      get() {
        return this.rows_.length;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'minKey', {
      get() {
        return this.minKey_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'maxKey', {
      get() {
        return this.maxKey_;
      },
      enumerable: true,
      configurable: true
    }),
    t
  ;
  })();
  t.UniqueSheet = i;
  const n = (() => {
    function t(t, e, i) {
      (this.table_ = t), (this.sheet_ = e), (this.rows_ = i || []);
    }
    return (t.prototype.forEach = function(t) {
      this.rows_.forEach(t);
    }),
    Object.defineProperty(t.prototype, 'table', {
      get() {
        return this.table_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'sheet', {
      get() {
        return this.sheet_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'count', {
      get() {
        return this.rows_.length;
      },
      enumerable: true,
      configurable: true
    }),
    t
  ;
  })();
  t.NoKeySheet = n;
  const a = (() => {
    function t(t, e, i, n) {
      const a = this;
      (this.table_ = t),
        (this.sheet_ = e),
        (this.rows_ = i || []),
        (this.groups_ = {}),
        this.rows_.forEach(t => {
          const e = t[n];
          a.groups_[e] || (a.groups_[e] = []);
          a.groups_[e].push(t);
        });
    }
    return (t.prototype.getGroup = function(t) {
      return this.groups_[t];
    }),
    (t.prototype.findGroup = function(t) {
      return this.groups_[t] ||
        e(
          'ERR_CONFIG_ROW_NOT_FIND',
          `[unique] ${this.table_}.${this.sheet_}#${t}`
        ),
      this.groups_[t]
    ;
    }),
    (t.prototype.forEach = function(t) {
      this.rows_.forEach(t);
    }),
    (t.prototype.forEachGroup = function(t) {
      const e = this;
      Object.keys(this.groups_).forEach(i => {
        t(e.groups_[i], i);
      });
    }),
    Object.defineProperty(t.prototype, 'table', {
      get() {
        return this.table_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'sheet', {
      get() {
        return this.sheet_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'count', {
      get() {
        return this.rows_.length;
      },
      enumerable: true,
      configurable: true
    }),
    t
  ;
  })();
  t.GroupSheet = a;
  const r = (() => {
    function t(t) {
      (this.value_ = t), (this.ref_ = null);
    }
    return (t.prototype.resolve = function(t) {
      this.ref_ = t;
    }),
    Object.defineProperty(t.prototype, 'value', {
      get() {
        return this.value_;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'ref', {
      get() {
        return this.ref_;
      },
      enumerable: true,
      configurable: true
    }),
    t
  ;
  })();
  t.ReferenceField = r;
})(lqc || (lqc = {}));