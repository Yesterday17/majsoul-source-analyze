var uiscript;
!(function(t) {
  var e = (function() {
    function e(e) {
      (this.me = e),
        (this.img_head = new t.UI_Character_Skin(e.getChildByName('head'))),
        (this.img_frame = e.getChildByName('head_frame'));
    }
    return (
      Object.defineProperty(e.prototype, 'id', {
        get: function() {
          return this._id;
        },
        set: function(t) {
          (this._id = t), this.img_head.setSkin(t, 'smallhead');
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(e.prototype, 'head_frame', {
        set: function(t) {
          cfg.item_definition.item.get(t) || (t = 305501);
          var e = cfg.item_definition.view.get(t);
          game.LoadMgr.setImgSkin(
            this.img_frame,
            'extendRes/head_frame/' + e.res_name + '.png'
          );
        },
        enumerable: !0,
        configurable: !0
      }),
      e
    );
  })();
  t.UI_Head = e;
})(uiscript || (uiscript = {}));