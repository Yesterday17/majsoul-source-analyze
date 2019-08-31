var cfg = (function() {
    function t() {}
    return (
      (t.load = function(t) {
        var e = this,
          i = {};
        t.forEach(function(t) {
          i[t.table] || (i[t.table] = {});
          var e = [];
          t.rows.forEach(function(i) {
            var n = {};
            t.header.forEach(function(t) {
              n[t.field_name] = i[t.field_name];
            }),
              e.push(n);
          });
          var n = null;
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
                e.forEach(function(e) {
                  var i = e[t.meta.key];
                  n[i] = e;
                });
          }
          n && (i[t.table][t.sheet] = n);
        }),
          Object.keys(i).forEach(function(t) {
            e[t] = i[t];
          });
      }),
      t
    );
  })(),
  bin;
!(function(t) {
  var e = (function() {
      function t() {}
      return (
        (t.prototype.mini_info = function() {
          return {
            table: this.table,
            sheet: this.sheet,
            meta: this.meta,
            fields: this.fields.map(function(t) {
              return {
                field_name: t.field_name,
                pb_type: t.pb_type,
                array_length: t.array_length
              };
            }),
            kvs: this.kvs
          };
        }),
        t
      );
    })(),
    i = (function() {
      return function(t) {
        (this.name = t), (this.sheets = []);
      };
    })(),
    n = (function() {
      return function(t) {
        (this.name = t), (this.sheets = {});
      };
    })(),
    a = (function() {
      function t() {
        (this.root = new protobuf.Root()),
          (this.schemas = []),
          (this.datas = []);
      }
      return (
        (t.pb_classname = function(t, e) {
          return t + '_' + e;
        }),
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
                var g = m[p],
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
            var I = x[w],
              u = I.table,
              C = I.sheet,
              S = t.pb_classname(u, C);
            if ((f = this.root.lookupType(S))) {
              if (l[S]) {
                b[S] || (b[S] = []);
                for (var T = 0, M = I.data; T < M.length; T++) {
                  var E = M[T];
                  b[S].push(f.decode(E));
                }
              }
            }
          }
          for (var L = 0, D = o; L < D.length; L++) {
            var u = (O = D[L]).name,
              A = new i(u);
            this.schemas.push(A);
            for (
              var N = function(i) {
                  var n = i.name,
                    a = t.pb_classname(u, n),
                    r = new e();
                  if (
                    ((r.table = u),
                    (r.sheet = n),
                    (r.meta = i.meta),
                    (r.fields = i.fields.map(function(t) {
                      return {
                        field_name: t.field_name,
                        array_length: t.array_length,
                        pb_type: t.pb_type,
                        comment: null
                      };
                    })),
                    'kv' === r.meta.category)
                  ) {
                    var s = b[a];
                    s &&
                      (r.kvs = s.map(function(t) {
                        return t[r.meta.key];
                      }));
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
          for (var k = 0, P = o; k < P.length; k++) {
            var O = P[k],
              u = O.name,
              A = new n(u);
            this.datas.push(A);
            for (var U = 0, V = O.sheets; U < V.length; U++) {
              var F = V[U],
                C = F.name,
                S = t.pb_classname(u, C);
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
      );
    })();
  t.BinParser = a;
  var r = (function() {
    function t(t, e) {
      var i = this;
      (this.schema = {}),
        (this.data = {}),
        t.forEach(function(t) {
          i.schema[t.name] = t;
        }),
        e.forEach(function(t) {
          i.data[t.name] = t;
        });
    }
    return (
      (t.prototype.toFormat = function() {
        var t = this,
          e = [];
        return (
          Object.keys(this.schema).forEach(function(i) {
            var n = t.schema[i],
              a = t.data[i];
            a &&
              n.sheets.forEach(function(t) {
                var i = {};
                (i.table = t.table),
                  (i.sheet = t.sheet),
                  (i.meta = t.meta),
                  (i.header = t.fields.map(function(t) {
                    return {
                      field_name: t.field_name,
                      array_length: t.array_length,
                      pb_type: t.pb_type
                    };
                  })),
                  (i.rows = a[t.sheet]),
                  e.push(i);
              });
          }),
          e
        );
      }),
      t
    );
  })();
  t.TSDataFormat = r;
})(bin || (bin = {}));