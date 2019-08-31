let uiscript;
!(t => {
  const e = (() => {
    function t() {}
    return (t.CreateFromSprite = ({x, y, width, height}) => {
      const i = new t();
      return (i.x = x),
      (i.y = y),
      (i.width = width),
      (i.height = height),
      i
    ;
    }),
    t
  ;
  })();
  t.UIRect = e;
})(uiscript || (uiscript = {}));