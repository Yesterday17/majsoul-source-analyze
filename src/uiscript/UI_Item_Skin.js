module.exports = function(uiscript) {
  let newItemSkin = (function() {
    function itemskin(t) {
      this.change_id = 0;
      this.skin_path = "";
      this.loaded = false;
      this.me = t;
      this.img = t;
      this.img.skin = "";
    }

    itemskin.prototype.setSkin = function(skin) {
      let _this = this;
      if (skin != "") {
        if (skin != this.skin_path) {
          this.skin_path = skin;
          this.change_id++;
          let id = this.change_id,
            res_skin = game.LoadMgr.getResImageSkin(skin);
          if (res_skin == "") {
            this.img.skin = game.LoadMgr.getResImageSkin(
              "extendRes/items/default.jpg"
            );
            this.loaded = false;
            game.LoadMgr.loadResImage(
              [this.skin_path],
              Laya.Handler.create(this, function() {
                if (id == _this.change_id) {
                  _this.loaded = true;
                  _this.img.skin = game.LoadMgr.getResImageSkin(
                    _this.skin_path
                  );
                }
              })
            );
          } else {
            this.loaded = true;
            this.img.skin = res_skin;
          }
        }
      } else {
        this.clear();
      }
    };

    itemskin.prototype.clear = function() {
      this.change_id++;
      if (this.loaded && this.skin_path != "") {
        Laya.loader.clearTextureRes(this.skin_path);
        this.loaded = false;
        this.skin_path = "";
      }
    };
    return itemskin;
  })();
  uiscript.UI_Item_Skin = newItemSkin;
};
