class Character_Skin {
  constructor(e) {
    this.change_id = 0;
    this.skin_path = "";
    this.loaded = false;
    this.me = e;
    this.img = e;
    this.origin_rect = uiscript.UIRect.CreateFromSprite(this.img);
    this.img.skin = "";
  }

  setSkin(t, type) {
    const _this = this;
    const skin = cfg.item_definition.skin.get(t);

    if (skin) {
      let skin_path = `${skin.path}/${type}.png`;
      if (this.skin_path != skin_path) {
        this.skin_path = skin_path;
        this.change_id++;

        let change_id = this.change_id;
        if (game.LoadMgr.getResImageSkin(skin_path) == "") {
          this._setLoadedTexture(4e5, type);
          this.loaded = false;
          game.LoadMgr.loadResImage(
            [this.skin_path],
            Laya.Handler.create(this, () => {
              if (_this.change_id == change_id) {
                _this.loaded = true;
                _this._setLoadedTexture(t, type);
              }
            })
          );
        } else {
          this.loaded = true;
          this._setLoadedTexture(t, type);
        }
      }
    } else this.clear();
  }

  clear() {
    this.change_id++;
    if (this.loaded && this.skin_path != "") {
      Laya.loader.clearTextureRes(game.LoadMgr.getResImageSkin(this.skin_path));
      this.loaded = false;
      this.skin_path = "";
    }
  }

  _setLoadedTexture(t, type) {
    let skin = cfg.item_definition.skin.get(t);
    switch (type) {
      case "full":
      case "half":
        game.Tools.charaPart(t, this.img, type, this.origin_rect);
        break;
      default:
        this.img.skin = game.LoadMgr.getResImageSkin(
          `${skin.path}/${type}.png`
        );
        break;
    }
  }
}

export default uiscript => (uiscript.UI_Character_Skin = Character_Skin);
