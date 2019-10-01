var app;
!(t => {
  var e = (() => {
    class t {
      static _init() {
        if (null == this._tmpCookie) {
          this._tmpCookie = {};
          for (var t = document.cookie.split(';'), e = 0; e < t.length; e++) {
            var i = t[e].split('=');
            if (i && i.length >= 2) {
              for (var n = i[0]; ' ' == n.charAt(0); ) n = n.substring(1);
              this._tmpCookie[n] = i[1];
            }
          }
        }
      }

      static setCookie(t, e) {
        this._init();
        new Date();
        document.cookie = `${t}=${e};max-age=${(2592e3).toString()}`;
        this._tmpCookie[t] = e;
      }

      static getCookie(t) {
        this._init();
        return this._tmpCookie.hasOwnProperty(t) ? this._tmpCookie[t] : '';
      }
    }

    t._tmpCookie = null;
    return t;
  })();
  t.CookieMgr = e;
})(app || (app = {}));