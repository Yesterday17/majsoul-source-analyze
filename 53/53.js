var cfg = (() => {
  function t() {}

  t.load = function(t) {
    var e = this,
      i = {};

    t.forEach(t => {
      i[t.table] || (i[t.table] = {});
      var e = [];
      t.rows.forEach(i => {
        var n = {};

        t.header.forEach(({field_name}) => {
          n[field_name] = i[field_name];
        });

        e.push(n);
      });
      var n = null;
      n = {};
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
          e.forEach(e => {
            var i = e[t.meta.key];
            n[i] = e;
          });
      }
      n && (i[t.table][t.sheet] = n);
    });

    Object.keys(i).forEach(t => {
      e[t] = i[t];
    });
  };

  return t;
})();

var bin;
!(t => {
  var e = (() => {
    function t() {}

    t.prototype.mini_info = function() {
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
    };

    return t;
  })();

  var i = (() => (function(t) {
    this.name = t;
    this.sheets = [];
  }))();

  var n = (() => (function(t) {
    this.name = t;
    this.sheets = {};
  }))();

  var a = (() => {
    function t() {
      this.root = new protobuf.Root();
      this.schemas = [];
      this.datas = [];
    }

    t.pb_classname = (t, e) => `${t}_${e}`;

    t.prototype.parseSync = function(a, r) {
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
            for (var M = 0, T = I.data; M < T.length; M++) {
              var L = T[M];
              b[S].push(f.decode(L));
            }
          }
        }
      }
      for (var E = 0, D = o; E < D.length; E++) {
        var u = (O = D[E]).name,
          N = new i(u);
        this.schemas.push(N);
        for (
          var A = ({name, meta, fields}) => {
            var n = name,
              a = t.pb_classname(u, n),
              r = new e();
            r.table = u;
            r.sheet = n;
            r.meta = meta;

            r.fields = fields.map(({field_name, array_length, pb_type}) => ({
              field_name: field_name,
              array_length: array_length,
              pb_type: pb_type,
              comment: null
            }));

            if (
              ('kv' === r.meta.category)
            ) {
              var s = b[a];
              s &&
                (r.kvs = s.map(t => t[r.meta.key]));
            }
            N.sheets.push(r);
          },
            B = 0,
            R = O.sheets;
          B < R.length;
          B++
        ) {
          A((F = R[B]));
        }
      }
      for (var k = 0, P = o; k < P.length; k++) {
        var O = P[k],
          u = O.name,
          N = new n(u);
        this.datas.push(N);
        for (var U = 0, V = O.sheets; U < V.length; U++) {
          var F = V[U],
            C = F.name,
            S = t.pb_classname(u, C);
          N[C] = b[S];
        }
      }
    };

    t.prototype.exportSchema = function() {
      return this.schemas;
    };

    t.prototype.exportData = function() {
      return this.datas;
    };

    return t;
  })();

  t.BinParser = a;
  var r = (() => {
    class t {
      constructor(t, e) {
        var i = this;
        this.schema = {};
        this.data = {};

        t.forEach(t => {
          i.schema[t.name] = t;
        });

        e.forEach(t => {
          i.data[t.name] = t;
        });
      }

      toFormat() {
        var t = this;
        var e = [];

        Object.keys(this.schema).forEach(i => {
          var n = t.schema[i];
          var a = t.data[i];
          a &&
            n.sheets.forEach(({table, sheet, meta, fields}) => {
              var i = {};
              i.table = table;
              i.sheet = sheet;
              i.meta = meta;

              i.header = fields.map(({field_name, array_length, pb_type}) => ({
                field_name: field_name,
                array_length: array_length,
                pb_type: pb_type
              }));

              i.rows = a[sheet];
              e.push(i);
            });
        });

        return e;
      }
    }

    return t;
  })();
  t.TSDataFormat = r;
})(bin || (bin = {}));