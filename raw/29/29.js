var app;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t._getDate = function() {
        var t = new Date();
        return (
          t.getFullYear() +
          '/' +
          (t.getMonth() + 1) +
          '/' +
          t.getDate() +
          ' ' +
          t.getHours() +
          ':' +
          t.getMinutes() +
          ':' +
          t.getSeconds() +
          '.' +
          t.getMilliseconds()
        );
      }),
      (t._insertCacheLog = function(t) {
        this._cache_logs.length < 40
          ? this._cache_logs.push(t)
          : (this._cache_logs[this._ceche_index++] = t);
      }),
      (t.log = function(t) {
        var e =
          '[' + this._getDate() + ' f:' + Laya.timer.currFrame + ']log: ' + t;
        this._insertCacheLog(e);
      }),
      (t.info = function(t) {
        var e =
          '[' + this._getDate() + ' f:' + Laya.timer.currFrame + ']info: ' + t;
        this._insertCacheLog(e);
      }),
      (t.Error = function(t) {
        var e =
          '[' + this._getDate() + ' f:' + Laya.timer.currFrame + ']error: ' + t;
        this._insertCacheLog(e);
      }),
      (t.info_net = function(t) {
        this._getDate(), Laya.timer.currFrame;
      }),
      (t.getCacheLog = function() {
        if (0 == this._cache_logs.length) return 'nolog';
        for (var t = '', e = 0; e < this._cache_logs.length; e++) {
          var i = (this._ceche_index + e) % this._cache_logs.length;
          0 != e && (t += '\n'), (t += this._cache_logs[i]);
        }
        return t;
      }),
      (t.getFunctionName = function(t) {
        if ('function' == typeof t || 'object' == typeof t)
          var e = ('' + t).match(/function\s*([\w\$]*)\s*\(/);
        return e && e[1];
      }),
      (t.trace = function() {
        for (var t = '', e = arguments.callee.caller, i = 10; e && i > 0; )
          '' != t && (t += '\n'), (t += e.toString()), (e = e.caller), i--;
        return t;
      }),
      (t._cache_logs = []),
      (t._ceche_index = 0),
      t
    );
  })();
  t.Log = e;
})(app || (app = {}));