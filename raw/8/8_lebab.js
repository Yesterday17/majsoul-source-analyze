let uiscript;
!(t => {
  const e = (() => {
    function e(e) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = !1),
        (this.me = e),
        (this.img = e),
        (this.origin_rect = t.UIRect.CreateFromSprite(this.img)),
        (this.img.skin = '');
    }
    return (e.prototype.setSkin = function(t, e) {
      const i = this;
      const n = cfg.item_definition.skin.get(t);
      if (n) {
        const a = `${n.path}/${e}.png`;
        if (a != this.skin_path) {
          (this.skin_path = a), this.change_id++;
          const r = this.change_id;
          if ('' == game.LoadMgr.getResImageSkin(a)) {
            1 == cfg.item_definition.character.get(n.character_id).sex
              ? this._setLoadedTexture(4e5, e)
              : this._setLoadedTexture(400001, e),
              (this.loaded = !1),
              game.LoadMgr.loadResImage(
                [this.skin_path],
                Laya.Handler.create(this, () => {
                  r == i.change_id &&
                    ((i.loaded = !0), i._setLoadedTexture(t, e));
                })
              );
          } else (this.loaded = !0), this._setLoadedTexture(t, e);
        }
      } else this.clear();
    }),
    (e.prototype.clear = function() {
      this.change_id++,
        this.loaded &&
          '' != this.skin_path &&
          (Laya.loader.clearTextureRes(
            game.LoadMgr.getResImageSkin(this.skin_path)
          ),
          (this.loaded = !1),
          (this.skin_path = ''));
    }),
    (e.prototype._setLoadedTexture = function(t, e) {
      const i = cfg.item_definition.skin.get(t);
      'full' == e || 'half' == e
        ? game.Tools.charaPart(t, this.img, e, this.origin_rect)
        : (this.img.skin = game.LoadMgr.getResImageSkin(
            `${i.path}/${e}.png`
          ));
    }),
    e
  ;
  })();
  t.UI_Character_Skin = e;
})(uiscript || (uiscript = {}));