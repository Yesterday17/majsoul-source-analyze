module.exports = function(uiscript) {
  var playerTitle = (function() {
    function title(item) {
      this.change_id = 0;
      this.skin_path = "";
      this.loaded = false;
      this.me = item;
      this.img = item;
    }
    Object.defineProperty(title.prototype, "id", {
      set: function(t) {
        let title = cfg.item_definition.title.get(t);
        let titleImagePath = title ? title.icon : "extendRes/title/notitle.png";
        if (titleImagePath != this.skin_path) {
          this.skin_path = titleImagePath;
          this.change_id++;

          let change_id = this.change_id;
          let titleResImageSkin = game.LoadMgr.getResImageSkin(titleImagePath);
          if (titleResImageSkin == "") {
            this.img.skin = "";
            this.loaded = false;
            game.LoadMgr.loadResImage(
              [this.skin_path],
              Laya.Handler.create(this, function() {
                change_id == this.change_id &&
                  ((this.loaded = !0),
                  (this.img.skin = game.LoadMgr.getResImageSkin(
                    this.skin_path
                  )));
              })
            );
          } else {
            this.loaded = true;
            this.img.skin = titleResImageSkin;
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    title.prototype.clear = function() {
      this.change_id++;
      if (this.loaded && this.skin_path != "") {
        Laya.loader.clearTextureRes(this.skin_path);
        this.loaded = false;
        this.skin_path = "";
      }
    };

    return title;
  })();
  uiscript.UI_PlayerTitle = playerTitle;
};
