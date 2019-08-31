let app;
!(t => {
  const e = (() => {
    function t() {}
    return (t._init = function() {
      if (null == this._tmpCookie) {
        this._tmpCookie = {};
        for (let t = document.cookie.split(';'), e = 0; e < t.length; e++) {
          const i = t[e].split('=');
          if (i && i.length >= 2) {
            for (var n = i[0]; ' ' == n.charAt(0); ) n = n.substring(1);
            this._tmpCookie[n] = i[1];
          }
        }
      }
    }),
    (t.setCookie = function(t, e) {
      this._init();
      new Date();
      (document.cookie = `${t}=${e};max-age=${(2592e3).toString()}`),
        (this._tmpCookie[t] = e);
    }),
    (t.getCookie = function(t) {
      return (
        this._init(),
        this._tmpCookie.hasOwnProperty(t) ? this._tmpCookie[t] : ''
      );
    }),
    (t._tmpCookie = null),
    t
  ;
  })();
  t.CookieMgr = e;
})(app || (app = {}));