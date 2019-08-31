var uiscript;
!(function(t) {
  var e = (function() {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = !1),
        (this.me = t),
        (this.img = t),
        (this.img.skin = '');
    }
    return (
      (t.prototype.setSkin = function(t) {
        var e = this;
        if ('' != t) {
          var i = t;
          if (i != this.skin_path) {
            (this.skin_path = i), this.change_id++;
            var n = this.change_id,
              a = game.LoadMgr.getResImageSkin(i);
            '' == a
              ? ((this.img.skin = game.LoadMgr.getResImageSkin(
                  'extendRes/items/default.jpg'
                )),
                (this.loaded = !1),
                game.LoadMgr.loadResImage(
                  [this.skin_path],
                  Laya.Handler.create(this, function() {
                    n == e.change_id &&
                      ((e.loaded = !0),
                      (e.img.skin = game.LoadMgr.getResImageSkin(e.skin_path)));
                  })
                ))
              : ((this.loaded = !0), (this.img.skin = a));
          }
        } else this.clear();
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
  t.UI_Item_Skin = e;
})(uiscript || (uiscript = {}));