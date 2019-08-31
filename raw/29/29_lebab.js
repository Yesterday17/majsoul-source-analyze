let app;
!(t => {
  const e = (() => {
    function t() {}
    return (t._getDate = () => {
      const t = new Date();
      return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}.${t.getMilliseconds()}`;
    }),
    (t._insertCacheLog = function(t) {
      this._cache_logs.length < 40
        ? this._cache_logs.push(t)
        : (this._cache_logs[this._ceche_index++] = t);
    }),
    (t.log = function(t) {
      const e =
        `[${this._getDate()} f:${Laya.timer.currFrame}]log: ${t}`;
      this._insertCacheLog(e);
    }),
    (t.info = function(t) {
      const e =
        `[${this._getDate()} f:${Laya.timer.currFrame}]info: ${t}`;
      this._insertCacheLog(e);
    }),
    (t.Error = function(t) {
      const e =
        `[${this._getDate()} f:${Laya.timer.currFrame}]error: ${t}`;
      this._insertCacheLog(e);
    }),
    (t.info_net = function(t) {
      this._getDate(), Laya.timer.currFrame;
    }),
    (t.getCacheLog = function() {
      if (0 == this._cache_logs.length) return 'nolog';
      for (var t = '', e = 0; e < this._cache_logs.length; e++) {
        const i = (this._ceche_index + e) % this._cache_logs.length;
        0 != e && (t += '\n'), (t += this._cache_logs[i]);
      }
      return t;
    }),
    (t.getFunctionName = t => {
      if ('function' == typeof t || 'object' == typeof t)
        const e = (`${t}`).match(/function\s*([\w\$]*)\s*\(/);
      return e && e[1];
    }),
    (t.trace = function(...args) {
      for (var t = '', e = args.callee.caller, i = 10; e && i > 0; )
        '' != t && (t += '\n'), (t += e.toString()), (e = e.caller), i--;
      return t;
    }),
    (t._cache_logs = []),
    (t._ceche_index = 0),
    t
  ;
  })();
  t.Log = e;
})(app || (app = {}));