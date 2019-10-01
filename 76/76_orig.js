var view;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t.play = function(t) {}),
      (t.fastplay = function(t, e) {}),
      (t.record = function(t, e) {
        return void 0 === e && (e = 0), 0;
      }),
      (t.fastrecord = function(t, e) {
        void 0 === e && (e = -1);
      }),
      t
    );
  })();
  t.ActionBase = e;
})(view || (view = {}));