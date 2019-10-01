var view;
!(t => {
  var e = (() => {
    function t() {}
    t.play = t => {};
    t.fastplay = (t, e) => {};

    t.record = (t, e) => {
      void 0 === e && (e = 0);
      return 0;
    };

    t.fastrecord = (t, e) => {
      void 0 === e && (e = -1);
    };

    return t;
  })();
  t.ActionBase = e;
})(view || (view = {}));