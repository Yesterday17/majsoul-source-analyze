class Character_Emo {
  constructor(t) {
    this.change_id = 0;
    this.skin_path = "";
    this.loaded = false;
    this.me = t;
    this.me.skin = "";
  }

  setSkin(t, type) {
    let _this = this;
    let character = cfg.item_definition.character.get(t);
    if (character) {
      let skin_path = `${character.emo}/${type.toString()}.png`;
      if (this.skin_path != skin_path) {
        this.skin_path = skin_path;
        this.change_id++;

        let change_id = this.change_id;
        let resImgSkin = game.LoadMgr.getResImageSkin(skin_path);
        if (resImgSkin == "") {
          this.me.skin = game.LoadMgr.getResImageSkin(
            "extendRes/emo/default.png"
          );
          this.loaded = false;
          game.LoadMgr.loadResImage(
            [this.skin_path],
            Laya.Handler.create(this, () => {
              if (_this.change_id == change_id) {
                _this.loaded = true;
                _this.me.skin = game.LoadMgr.getResImageSkin(_this.skin_path);
              }
            })
          );
        } else {
          this.loaded = true;
          this.me.skin = resImgSkin;
        }
      }
    } else this.clear();
  }

  clear() {
    this.change_id++;
    if (this.loaded && this.skin_path != "") {
      Laya.loader.clearTextureRes(this.skin_path);
      this.loaded = false;
      this.skin_path = "";
    }
  }
}

export default uiscript => (uiscript.UI_Character_Emo = Character_Emo);
