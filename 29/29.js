var app;
!(t => {
  var e = (() => {
    class t {
      static _insertCacheLog(t) {
        this._cache_logs.length < 40
          ? this._cache_logs.push(t)
          : (this._cache_logs[this._ceche_index++] = t);
      }

      static log(t) {
        var e =
          `[${this._getDate()} f:${Laya.timer.currFrame}]log: ${t}`;
        this._insertCacheLog(e);
      }

      static info(t) {
        var e =
          `[${this._getDate()} f:${Laya.timer.currFrame}]info: ${t}`;
        this._insertCacheLog(e);
      }

      static Error(t) {
        var e =
          `[${this._getDate()} f:${Laya.timer.currFrame}]error: ${t}`;
        this._insertCacheLog(e);
      }

      static info_net(t) {
        this._getDate();
        Laya.timer.currFrame;
      }

      static getCacheLog() {
        if (0 == this._cache_logs.length) return 'nolog';
        for (var t = '', e = 0; e < this._cache_logs.length; e++) {
          var i = (this._ceche_index + e) % this._cache_logs.length;
          0 != e && (t += '\n');
          t += this._cache_logs[i];
        }
        return t;
      }

      static trace(...args) {
        '' != t && (t += '\n');
        t += e.toString();
        e = e.caller;
        for (var t = '', e = args.callee.caller, i = 10; e && i > 0; )
          i--;
        return t;
      }
    }

    t._getDate = () => {
      var t = new Date();
      return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}.${t.getMilliseconds()}`;
    };

    t.getFunctionName = t => {
      if ('function' == typeof t || 'object' == typeof t)
        var e = (`${t}`).match(/function\s*([\w\$]*)\s*\(/);
      return e && e[1];
    };

    t._cache_logs = [];
    t._ceche_index = 0;
    return t;
  })();
  t.Log = e;
})(app || (app = {}));