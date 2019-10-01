var uiscript;
!(t => {
  var e = (() => {
    function t() {}

    t.CreateFromSprite = ({x, y, width, height}) => {
      var i = new t();
      i.x = x;
      i.y = y;
      i.width = width;
      i.height = height;
      return i;
    };

    return t;
  })();
  t.UIRect = e;
})(uiscript || (uiscript = {}));