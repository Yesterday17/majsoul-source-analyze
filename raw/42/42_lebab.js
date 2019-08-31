let game;
!(t => {
  const e = (() => {
    function e() {}
    return (e.setItem = (e, i) => {
      const n = t.Tools.eeesss(`e__${e}`);
      Laya.LocalStorage.setItem(e, 'FKU!!!'),
        Laya.LocalStorage.setItem(n, t.Tools.eeesss(i));
    }),
    (e.getItem = e => {
      const i = t.Tools.eeesss(`e__${e}`);
      let n = Laya.LocalStorage.getItem(e);
      return null != n && 'FKU!!!' != n
        ? (Laya.LocalStorage.setItem(e, 'FKU!!!'),
          Laya.LocalStorage.setItem(i, t.Tools.eeesss(n)),
          n)
        : (null != (n = Laya.LocalStorage.getItem(i)) &&
            (n = t.Tools.dddsss(n)),
          n);
    }),
    e
  ;
  })();
  t.LocalStorage = e;
})(game || (game = {}));