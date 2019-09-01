var uiscript;
!(function(t) {
  var e = (function() {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = false),
        (this.me = t),
        (this.img = t);
    }
    return (
      Object.defineProperty(t.prototype, 'id', {
        set: function(t) {
          var e = this,
            i = cfg.item_definition.title.get(t),
            n = '';
          if (
            (n = i ? i.icon : 'extendRes/title/notitle.png') != this.skin_path
          ) {
            (this.skin_path = n), this.change_id++;
            var a = this.change_id,
              r = game.LoadMgr.getResImageSkin(n);
            '' == r
              ? ((this.img.skin = ''),
                (this.loaded = false),
                game.LoadMgr.loadResImage(
                  [this.skin_path],
                  Laya.Handler.create(this, function() {
                    a == e.change_id &&
                      ((e.loaded = true),
                      (e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path)));
                  })
                ))
              : ((this.loaded = true), (this.img.skin = r));
          }
        },
        enumerable: true,
        configurable: true
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
    );
  })();
  t.UI_PlayerTitle = e;
})(uiscript || (uiscript = {}));