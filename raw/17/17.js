var uiscript;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t.CreateFromSprite = function(e) {
        var i = new t();
        return (
          (i.x = e.x),
          (i.y = e.y),
          (i.width = e.width),
          (i.height = e.height),
          i
        );
      }),
      t
    );
  })();
  t.UIRect = e;
})(uiscript || (uiscript = {}));