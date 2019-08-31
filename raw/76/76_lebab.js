let view;
!(t => {
  const e = (() => {
    function t() {}
    return (t.play = t => {}),
    (t.fastplay = (t, e) => {}),
    (t.record = (t, e) => (void 0 === e && (e = 0), 0)),
    (t.fastrecord = (t, e) => {
      void 0 === e && (e = -1);
    }),
    t
  ;
  })();
  t.ActionBase = e;
})(view || (view = {}));