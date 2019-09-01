let uiscript;
!(t => {
  const e = (() => {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = false),
        (this.me = t),
        (this.img = t),
        (this.img.skin = '');
    }
    return (t.prototype.setSkin = function(t) {
      const e = this;
      if ('' != t) {
        const i = t;
        if (i != this.skin_path) {
          (this.skin_path = i), this.change_id++;
          const n = this.change_id;
          const a = game.LoadMgr.getResImageSkin(i);
          '' == a
            ? ((this.img.skin = game.LoadMgr.getResImageSkin(
                'extendRes/items/default.jpg'
              )),
              (this.loaded = false),
              game.LoadMgr.loadResImage(
                [this.skin_path],
                Laya.Handler.create(this, () => {
                  n == e.change_id &&
                    ((e.loaded = true),
                    (e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path)));
                })
              ))
            : ((this.loaded = true), (this.img.skin = a));
        }
      } else this.clear();
    }),
    (t.prototype.clear = function() {
      this.change_id++,
        this.loaded &&
          '' != this.skin_path &&
          (Laya.loader.clearTextureRes(this.skin_path),
          (this.loaded = false),
          (this.skin_path = ''));
    }),
    t
  ;
  })();
  t.UI_Item_Skin = e;
})(uiscript || (uiscript = {}));