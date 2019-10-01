var uiscript;
!(t => {
  var e = (() => {
    class t {
      constructor(t) {
        this.change_id = 0;
        this.skin_path = '';
        this.loaded = !1;
        this.effect = null;
        this.me = t;
        this.me.skin = '';
      }

      setSkin(t, e, i) {
        var n = this;
        void 0 === i && (i = !1);
        var a = cfg.item_definition.character.get(t);
        if (a) {
          var r = `${a.emo}/${e.toString()}.png`;
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
            this.skin_path = '';
            this.me.skin = '';
            if ('' != l)
              Laya.timer.once(300, this, () => {
                n.change_id == s &&
                  (n.effect = game.FrontEffect.Inst.create_ui_effect(
                    n.me,
                    `scene/${l}.lh`,
                    new Laya.Point(0, 0),
                    1
                  ));
              });
            else {
              this.skin_path = r;
              var c = game.LoadMgr.getResImageSkin(r);

              this.me.skin = game.LoadMgr.getResImageSkin(
                    'extendRes/emo/default.png'
                  );

              this.loaded = !1;
              this.loaded = !0;
              '' == c
                ? (game.LoadMgr.loadResImage(
                [this.skin_path],
                Laya.Handler.create(this, () => {
                  n.loaded = !0;
                  s == n.change_id &&
                    ((n.me.skin = game.LoadMgr.getResImageSkin(
                      n.skin_path
                    )));
                })
              ))
                : (this.me.skin = c);
            }
          }
        } else this.clear();
      }

      clear() {
        this.change_id++;

        Laya.loader.clearTextureRes(
            game.LoadMgr.getResImageSkin(this.skin_path)
          );

        this.loaded = !1;

        this.loaded &&
          '' != this.skin_path &&
          ((this.skin_path = ''));

        this.effect.destory();
        this.effect && ((this.effect = null));
      }
    }

    return t;
  })();
  t.UI_Character_Emo = e;
})(uiscript || (uiscript = {}));