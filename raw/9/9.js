var uiscript;
!(function(t) {
  var e = (function() {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = !1),
        (this.me = t),
        (this.me.skin = '');
    }
    return (
      (t.prototype.setSkin = function(t, e) {
        var i = this,
          n = cfg.item_definition.character.get(t);
        if (n) {
          var a = n.emo + '/' + e.toString() + '.png';
          if (a != this.skin_path) {
            (this.skin_path = a), this.change_id++;
            var r = this.change_id,
              s = game.LoadMgr.getResImageSkin(a);
            '' == s
              ? ((this.me.skin = game.LoadMgr.getResImageSkin(
                  'extendRes/emo/default.png'
                )),
                (this.loaded = !1),
                game.LoadMgr.loadResImage(
                  [this.skin_path],
                  Laya.Handler.create(this, function() {
                    r == i.change_id &&
                      ((i.loaded = !0),
                      (i.me.skin = game.LoadMgr.getResImageSkin(i.skin_path)));
                  })
                ))
              : ((this.loaded = !0), (this.me.skin = s));
          }
        } else this.clear();
      }),
      (t.prototype.clear = function() {
        this.change_id++,
          this.loaded &&
            '' != this.skin_path &&
            (Laya.loader.clearTextureRes(
              game.LoadMgr.getResImageSkin(this.skin_path)
            ),
            (this.loaded = !1),
            (this.skin_path = ''));
      }),
      t
    );
  })();
  t.UI_Character_Emo = e;
})(uiscript || (uiscript = {}));