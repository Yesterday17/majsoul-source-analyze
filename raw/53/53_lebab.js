const cfg = (() => {
    function t() {}
    return (t.load = function(t) {
      const e = this, i = {};
      t.forEach(t => {
        i[t.table] || (i[t.table] = {});
        const e = [];
        t.rows.forEach(i => {
          const n = {};
          t.header.forEach(({field_name}) => {
            n[field_name] = i[field_name];
          }),
            e.push(n);
        });
        let n = null;
        switch (t.meta.category) {
          case 'unique':
            n = new lqc.UniqueSheet(t.table, t.sheet, e, t.meta.key);
            break;
          case 'nokey':
            n = new lqc.NoKeySheet(t.table, t.sheet, e);
            break;
          case 'group':
            n = new lqc.GroupSheet(t.table, t.sheet, e, t.meta.key);
            break;
          case 'kv':
            (n = {}),
              e.forEach(e => {
                const i = e[t.meta.key];
                n[i] = e;
              });
        }
        n && (i[t.table][t.sheet] = n);
      }),
        Object.keys(i).forEach(t => {
          e[t] = i[t];
        });
    }),
    t
  ;
  })();

let bin;
!(t => {
  const e = (() => {
      function t() {}
      return (t.prototype.mini_info = function() {
        return {
          table: this.table,
          sheet: this.sheet,
          meta: this.meta,
          fields: this.fields.map(({field_name, pb_type, array_length}) => ({
            field_name: field_name,
            pb_type: pb_type,
            array_length: array_length
          })),
          kvs: this.kvs
        };
      }),
      t
    ;
    })();

  const i = (() => (function(t) {
    (this.name = t), (this.sheets = []);
  }))();

  const n = (() => (function(t) {
    (this.name = t), (this.sheets = {});
  }))();

  const a = (() => {
    function t() {
      (this.root = new protobuf.Root()),
        (this.schemas = []),
        (this.datas = []);
    }
    return (t.pb_classname = (t, e) => `${t}_${e}`),
    (t.prototype.parseSync = function(a, r) {
      this.root = protobuf.parse(a, { keepCase: !0 }).root;
      for (
        var s = this.root.lookupType('lq.config.ConfigTables').decode(r),
          o = s.schemas,
          l = {},
          h = 0,
          c = o;
        h < c.length;
        h++
      )
        for (
          var u = (O = c[h]).name, _ = 0, d = O.sheets;
          _ < d.length;
          _++
        ) {
          C = (F = d[_]).name;
          l[(S = t.pb_classname(u, C))] = F;
          for (
            var f = new protobuf.Type(S), p = 0, m = F.fields;
            p < m.length;
            p++
          ) {
            const g = m[p],
                  y = g.array_length > 0 ? 'repeated' : 'optional',
                  v = new protobuf.Field(
                    g.field_name,
                    g.pb_index,
                    g.pb_type,
                    y
                  );
            f.add(v);
          }
          this.root.add(f);
        }
      for (var b = {}, w = 0, x = s.datas; w < x.length; w++) {
        const I = x[w];
        const u = I.table;
        var C = I.sheet;
        var S = t.pb_classname(u, C);
        if ((f = this.root.lookupType(S))) {
          if (l[S]) {
            b[S] || (b[S] = []);
            for (let T = 0, M = I.data; T < M.length; T++) {
              const E = M[T];
              b[S].push(f.decode(E));
            }
          }
        }
      }
      for (let L = 0, D = o; L < D.length; L++) {
        const u = (O = D[L]).name;
        var A = new i(u);
        this.schemas.push(A);
        for (
          let N = ({name, meta, fields}) => {
                  const n = name, a = t.pb_classname(u, n), r = new e();
                  if (
                    ((r.table = u),
                    (r.sheet = n),
                    (r.meta = meta),
                    (r.fields = fields.map(({field_name, array_length, pb_type}) => ({
                    field_name: field_name,
                    array_length: array_length,
                    pb_type: pb_type,
                    comment: null
                  }))),
                    'kv' === r.meta.category)
                  ) {
                    const s = b[a];
                    s &&
                      (r.kvs = s.map(t => t[r.meta.key]));
                  }
                  A.sheets.push(r);
                },
              R = 0,
              B = O.sheets;
          R < B.length;
          R++
        ) {
          N((F = B[R]));
        }
      }
      for (let k = 0, P = o; k < P.length; k++) {
        var O = P[k];
        const u = O.name;
        const A = new n(u);
        this.datas.push(A);
        for (let U = 0, V = O.sheets; U < V.length; U++) {
          var F = V[U];
          const C = F.name;
          const S = t.pb_classname(u, C);
          A[C] = b[S];
        }
      }
    }),
    (t.prototype.exportSchema = function() {
      return this.schemas;
    }),
    (t.prototype.exportData = function() {
      return this.datas;
    }),
    t
  ;
  })();

  t.BinParser = a;
  const r = (() => {
    function t(t, e) {
      const i = this;
      (this.schema = {}),
        (this.data = {}),
        t.forEach(t => {
          i.schema[t.name] = t;
        }),
        e.forEach(t => {
          i.data[t.name] = t;
        });
    }
    return (t.prototype.toFormat = function() {
      const t = this;
      const e = [];
      return Object.keys(this.schema).forEach(i => {
        const n = t.schema[i];
        const a = t.data[i];
        a &&
          n.sheets.forEach(({table, sheet, meta, fields}) => {
            const i = {};
            (i.table = table),
              (i.sheet = sheet),
              (i.meta = meta),
              (i.header = fields.map(({field_name, array_length, pb_type}) => ({
              field_name: field_name,
              array_length: array_length,
              pb_type: pb_type
            }))),
              (i.rows = a[sheet]),
              e.push(i);
          });
      }),
      e
    ;
    }),
    t
  ;
  })();
  t.TSDataFormat = r;
})(bin || (bin = {}));