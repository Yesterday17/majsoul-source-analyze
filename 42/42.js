var game;
!(t => {
  var e = (() => {
    function e() {}

    e.setItem = (e, i) => {
      var n = t.Tools.eeesss(`e__${e}`);
      Laya.LocalStorage.setItem(e, 'FKU!!!');
      Laya.LocalStorage.setItem(n, t.Tools.eeesss(i));
    };

    e.getItem = e => {
      var i = t.Tools.eeesss(`e__${e}`);
      var n = Laya.LocalStorage.getItem(e);
      Laya.LocalStorage.setItem(e, 'FKU!!!');
      Laya.LocalStorage.setItem(i, t.Tools.eeesss(n));

      null != (n = Laya.LocalStorage.getItem(i)) &&
            (n = t.Tools.dddsss(n));

      return null != n && 'FKU!!!' != n
        ? (n)
        : (n);
    };

    return e;
  })();
  t.LocalStorage = e;
})(game || (game = {}));