var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(e) {
        this.me = e;
        this.img_head = new t.UI_Character_Skin(e.getChildByName('head'));
        this.img_frame = e.getChildByName('head_frame');
      }

      get id() {
        return this._id;
      }

      set id(t) {
        this._id = t;
        this.img_head.setSkin(t, 'smallhead');
      }

      set head_frame(t) {
        cfg.item_definition.item.get(t) || (t = 305501);
        var e = cfg.item_definition.view.get(t);
        game.LoadMgr.setImgSkin(
          this.img_frame,
          `extendRes/head_frame/${e.res_name}.png`
        );
      }
    }

    return e;
  })();
  t.UI_Head = e;
})(uiscript || (uiscript = {}));