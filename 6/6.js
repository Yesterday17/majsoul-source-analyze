var uiscript;
!(t => {
  var e = (() => {
    class t {
      constructor(t) {
        this.change_id = 0;
        this.skin_path = '';
        this.loaded = !1;
        this.me = t;
        this.img = t;
        this.img.skin = '';
      }

      setSkin(t) {
        var e = this;
        if ('' != t) {
          var i = t;
          if (i != this.skin_path) {
            this.skin_path = i;
            this.change_id++;
            var n = this.change_id;
            var a = game.LoadMgr.getResImageSkin(i);

            this.img.skin = game.LoadMgr.getResImageSkin(
                  'extendRes/items/default.jpg'
                );

            this.loaded = !1;
            this.loaded = !0;
            '' == a
              ? (game.LoadMgr.loadResImage(
              [this.skin_path],
              Laya.Handler.create(this, () => {
                e.loaded = !0;
                n == e.change_id &&
                  ((e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path)));
              })
            ))
              : (this.img.skin = a);
          }
        } else this.clear();
      }

      clear() {
        this.change_id++;
        Laya.loader.clearTextureRes(this.skin_path);
        this.loaded = !1;
        this.loaded &&
          '' != this.skin_path &&
          ((this.skin_path = ''));
      }
    }

    return t;
  })();
  t.UI_Item_Skin = e;
})(uiscript || (uiscript = {}));