var game;
!(function(t) {
  var e = (function() {
    function e() {}
    return (
      (e.setItem = function(e, i) {
        var n = t.Tools.eeesss('e__' + e);
        Laya.LocalStorage.setItem(e, 'FKU!!!'),
          Laya.LocalStorage.setItem(n, t.Tools.eeesss(i));
      }),
      (e.getItem = function(e) {
        var i = t.Tools.eeesss('e__' + e),
          n = Laya.LocalStorage.getItem(e);
        return null != n && 'FKU!!!' != n
          ? (Laya.LocalStorage.setItem(e, 'FKU!!!'),
            Laya.LocalStorage.setItem(i, t.Tools.eeesss(n)),
            n)
          : (null != (n = Laya.LocalStorage.getItem(i)) &&
              (n = t.Tools.dddsss(n)),
            n);
      }),
      e
    );
  })();
  t.LocalStorage = e;
})(game || (game = {}));