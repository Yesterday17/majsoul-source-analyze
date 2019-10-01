var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(e) {
        this.change_id = 0;
        this.skin_path = '';
        this.loaded = !1;
        this.me = e;
        this.img = e;
        this.origin_rect = t.UIRect.CreateFromSprite(this.img);
        this.img.skin = '';
      }

      setSkin(t, e) {
        var i = this;
        var n = cfg.item_definition.skin.get(t);
        if (n) {
          var a = `${n.path}/${e}.png`;
          if (a != this.skin_path) {
            this.skin_path = a;
            this.change_id++;
            var r = this.change_id;
            this.loaded = !0;
            if ('' == game.LoadMgr.getResImageSkin(a)) {
              1 == cfg.item_definition.character.get(n.character_id).sex
                ? this._setLoadedTexture(4e5, e)
                : this._setLoadedTexture(400001, e);

              this.loaded = !1;
              game.LoadMgr.loadResImage(
                [this.skin_path],
                Laya.Handler.create(this, () => {
                  i.loaded = !0;
                  r == i.change_id &&
                    (i._setLoadedTexture(t, e));
                })
              );
            } else this._setLoadedTexture(t, e);
          }
        } else this.clear();
      }

      clear() {
        this.change_id++;

        Laya.loader.clearTextureRes(
            game.LoadMgr.getResImageSkin(this.skin_path)
          );

        this.loaded = !1;
        this.loaded &&
          '' != this.skin_path &&
          ((this.skin_path = ''));
      }

      _setLoadedTexture(t, e) {
        var i = cfg.item_definition.skin.get(t);
        'full' == e || 'half' == e
          ? game.Tools.charaPart(t, this.img, e, this.origin_rect)
          : (this.img.skin = game.LoadMgr.getResImageSkin(
              `${i.path}/${e}.png`
            ));
      }
    }

    return e;
  })();
  t.UI_Character_Skin = e;
})(uiscript || (uiscript = {}));