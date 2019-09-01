let uiscript;
!(t => {
  const e = (() => {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = false),
        (this.me = t),
        (this.me.skin = '');
    }
    return (t.prototype.setSkin = function(t, e) {
      const i = this;
      const n = cfg.item_definition.character.get(t);
      if (n) {
        const a = `${n.emo}/${e.toString()}.png`;
        if (a != this.skin_path) {
          (this.skin_path = a), this.change_id++;
          const r = this.change_id;
          const s = game.LoadMgr.getResImageSkin(a);
          '' == s
            ? ((this.me.skin = game.LoadMgr.getResImageSkin(
                'extendRes/emo/default.png'
              )),
              (this.loaded = false),
              game.LoadMgr.loadResImage(
                [this.skin_path],
                Laya.Handler.create(this, () => {
                  r == i.change_id &&
                    ((i.loaded = true),
                    (i.me.skin = game.LoadMgr.getResImageSkin(i.skin_path)));
                })
              ))
            : ((this.loaded = true), (this.me.skin = s));
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
          (this.loaded = false),
          (this.skin_path = ''));
    }),
    t
  ;
  })();
  t.UI_Character_Emo = e;
})(uiscript || (uiscript = {}));