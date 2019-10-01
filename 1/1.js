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
      }

      set id(t) {
        var e = this;
        var i = cfg.item_definition.title.get(t);
        var n = '';
        if (
          (n = i ? i.icon : 'extendRes/title/notitle.png') != this.skin_path
        ) {
          this.skin_path = n;
          this.change_id++;
          var a = this.change_id;
          var r = game.LoadMgr.getResImageSkin(n);
          this.img.skin = '';
          this.loaded = !1;
          this.loaded = !0;
          '' == r
            ? (game.LoadMgr.loadResImage(
            [this.skin_path],
            Laya.Handler.create(this, () => {
              e.loaded = !0;
              a == e.change_id &&
                ((e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path)));
            })
          ))
            : (this.img.skin = r);
        }
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
  t.UI_PlayerTitle = e;
})(uiscript || (uiscript = {}));