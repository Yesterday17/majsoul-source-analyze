var uiscript;
!(function(t) {
  var e = (function() {
    function t(t) {
      (this.change_id = 0),
        (this.skin_path = ''),
        (this.loaded = !1),
        (this.effect = null),
        (this.me = t),
        (this.me.skin = '');
    }
    return (
      (t.prototype.setSkin = function(t, e, i) {
        var n = this;
        void 0 === i && (i = !1);
        var a = cfg.item_definition.character.get(t);
        if (a) {
          var r = a.emo + '/' + e.toString() + '.png';
          if (r != this.skin_path) {
            this.change_id++;
            for (
              var s = this.change_id,
                o = cfg.character.emoji.getGroup(t),
                l = '',
                h = 0;
              h < o.length;
              h++
            )
              if (o[h].sub_id == e) {
                2 == o[h].type && i && (l = o[h].view);
                break;
              }
            if ('' != l)
              (this.skin_path = ''),
                (this.me.skin = ''),
                Laya.timer.once(300, this, function() {
                  n.change_id == s &&
                    (n.effect = game.FrontEffect.Inst.create_ui_effect(
                      n.me,
                      'scene/' + l + '.lh',
                      new Laya.Point(0, 0),
                      1
                    ));
                });
            else {
              this.skin_path = r;
              var c = game.LoadMgr.getResImageSkin(r);
              '' == c
                ? ((this.me.skin = game.LoadMgr.getResImageSkin(
                    'extendRes/emo/default.png'
                  )),
                  (this.loaded = !1),
                  game.LoadMgr.loadResImage(
                    [this.skin_path],
                    Laya.Handler.create(this, function() {
                      s == n.change_id &&
                        ((n.loaded = !0),
                        (n.me.skin = game.LoadMgr.getResImageSkin(
                          n.skin_path
                        )));
                    })
                  ))
                : ((this.loaded = !0), (this.me.skin = c));
            }
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
            (this.skin_path = '')),
          this.effect && (this.effect.destory(), (this.effect = null));
      }),
      t
    );
  })();
  t.UI_Character_Emo = e;
})(uiscript || (uiscript = {}));