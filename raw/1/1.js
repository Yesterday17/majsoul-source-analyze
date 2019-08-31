var uiscript;
!(function(t) {
  var e = (function() {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = !1),
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
                (this.loaded = !1),
                game.LoadMgr.loadResImage(
                  [this.skin_path],
                  Laya.Handler.create(this, function() {
                    a == e.change_id &&
                      ((e.loaded = !0),
                      (e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path)));
                  })
                ))
              : ((this.loaded = !0), (this.img.skin = r));
          }
        },
        enumerable: !0,
        configurable: !0
      }),
      (t.prototype.clear = function() {
        this.change_id++,
          this.loaded &&
            '' != this.skin_path &&
            (Laya.loader.clearTextureRes(this.skin_path),
            (this.loaded = !1),
            (this.skin_path = ''));
      }),
      t
    );
  })();
  t.UI_PlayerTitle = e;
})(uiscript || (uiscript = {}));