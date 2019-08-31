// 1

let uiscript;
!(t => {
  class UI_PlayerTitle {
    constructor(t) {
      this.change_id = 0;
      this.skin_path = "";
      this.loaded = false;
      this.me = t;
      this.img = t;
    }

    set id(t) {
      const e = this;
      const i = cfg.item_definition.title.get(t);
      let n = "";
      if ((n = i ? i.icon : "extendRes/title/notitle.png") != this.skin_path) {
        this.skin_path = n;
        this.change_id++;
        const a = this.change_id;
        const r = game.LoadMgr.getResImageSkin(n);
        if (r == "") {
          this.img.skin = "";
          this.loaded = false;
          game.LoadMgr.loadResImage(
            [this.skin_path],
            Laya.Handler.create(this, () => {
              if (a == e.change_id) {
                e.loaded = true;
                e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path);
              }
            })
          );
        } else {
          this.loaded = true;
          this.img.skin = r;
        }
      }
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
  t.UI_PlayerTitle = UI_PlayerTitle;
})(uiscript || (uiscript = {}));
