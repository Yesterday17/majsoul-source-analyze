let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.both_ui.character_star_upUI()) || this;
      return (
        (t.ress = []),
        (t.effect_path = 'scene/scene_shengjiban.ls'),
        (t.locking = false),
        (i.Inst = t),
        (t.ress = []),
        t.ress.push(game.Tools.localUISrc('myres/star_up/levelup.png')),
        t.ress.push(game.Tools.localUISrc('myres/star_up/bg.jpg')),
        t.ress.push(game.Tools.localUISrc('myres/star_up/bang_heart.png')),
        Laya.loader.load(t.ress, null, null, 'image'),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.blackbg = this.me.getChildByName('blackbg')),
        (this.btn_bigclose = this.me.getChildByName('bigclose')),
        (this.btn_bigclose.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          false
        )),
        (this.root = this.me.getChildByName('root')),
        (this.container_avatar = this.root.getChildByName(
          'container_avatar'
        )),
        (this.avatar0 = new t.UI_Character_Skin(
          this.container_avatar.getChildByName('avatar0')
        )),
        (this.avatar1 = new t.UI_Character_Skin(
          this.container_avatar.getChildByName('avatar1')
        )),
        (this.avatar1.me.visible = false),
        (this.bg = this.root.getChildByName('bg')),
        (this.img_word = this.root
          .getChildByName('container_hearts')
          .getChildByName('img_word')),
        (this.container_hearts = this.root.getChildByName(
          'container_hearts'
        )),
        (this.hearts = []);
      for (i = 0; i < 5; i++)
        this.hearts.push(this.container_hearts.getChildByName(`heart${i}`));
      (this.bang = this.container_hearts.getChildByName('bang')),
        (this.bang_imgs = []);
      for (var i = 0; i < 5; i++)
        this.bang_imgs.push(this.bang.getChildAt(i));
      (this.btn_close = this.root.getChildByName('btn_close')),
        (this.btn_close.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          false
        )),
        (this.block_chat = new t.UI_Character_Chat(
          this.me.getChildByName('chat')
        )),
        (this.container_effect = this.me.getChildByName('container_effect'));
    }),
    (i.prototype.show = function(t, e) {
      const i = this;
      (this.locking = true),
        Laya.timer.once(2e3, this, () => {
          i.locking = false;
        }),
        this.reset(),
        (this.enable = true),
        (this.chara_info = t),
        (this.back_func = e);
      const n = cfg.item_definition.skin.get(this.chara_info.skin);
      (this.avatar1.me.visible = false),
        n && this.avatar0.setSkin(this.chara_info.skin, 'full');
      for (let a = 0; a < this.hearts.length; a++)
        if (a >= 5)
          (this.hearts[a].visible = false), (this.bang_imgs[a].visible = false);
        else {
          (this.hearts[a].visible = true),
            (this.hearts[a].x = 314 + 107 * a - 214),
            (this.bang_imgs[a].visible = true);
          const r = this.hearts[a].getChildByName('v').mask;
          a < this.chara_info.level ? (r.scaleY = 1) : (r.scaleY = 0),
            t.is_upgraded
              ? (this.hearts[a]
                  .getChildByName('v')
                  .getChildByName('full').skin = game.Tools.localUISrc(
                  'myres/bothui/heart_gold.png'
                ))
              : (this.hearts[a]
                  .getChildByName('v')
                  .getChildByName('full').skin = game.Tools.localUISrc(
                  'myres/bothui/bf_heart.png'
                ));
        }
      if (
        ((this.bang.visible = false),
        (this.img_word.visible = true),
        (this.container_hearts.visible = true),
        this.me.in.play(0, false),
        (this.block_chat.me.visible = false),
        (this.btn_bigclose.visible = false),
        view.AudioMgr.refresh_music_volume(true),
        Laya.loader.create(this.effect_path),
        this.chara_info.is_upgraded)
      ) {
        const s = cfg.item_definition.character.get(this.chara_info.charid)
          .full_fetter_skin;
        game.LoadMgr.loadResImage([
          `${cfg.item_definition.skin.get(s).path}/full.png`
        ]);
      }
      Laya.timer.once(1400, this, () => {
        (i.bang.visible = true),
          i.me.bang.play(0, false),
          Laya.timer.once(1550, i, () => {
            (i.bang.visible = false),
              i.chara_info.is_upgraded
                ? i.change_full_fetter_skin()
                : i.when_over();
          }),
          i.chara_info.is_upgraded ||
            Laya.timer.once(500, i, () => {
              const t = Laya.loader.getRes(i.effect_path);
              t && (i.container_effect.addChild(t), (t.visible = true)),
                view.AudioMgr.PlayAudio(113);
            });
      });
    }),
    (i.prototype.reset = function() {
      (this.bg.skin = ''),
        (this.img_word.skin = ''),
        (this.bg.skin = game.Tools.localUISrc('myres/star_up/bg.jpg')),
        (this.img_word.skin = game.Tools.localUISrc(
          'myres/star_up/levelup.png'
        ));
      for (let t = 0; t < this.bang_imgs.length; t++)
        (this.bang_imgs[t].skin = ''),
          (this.bang_imgs[t].skin = game.Tools.localUISrc(
            'myres/star_up/bang_heart.png'
          ));
    }),
    (i.prototype.change_full_fetter_skin = function() {
      const t = this;
      if (this.enable) {
        const e = cfg.item_definition.character.get(this.chara_info.charid);
        if (e) {
          cfg.item_definition.skin.get(e.full_fetter_skin) &&
            (this.avatar1.setSkin(this.chara_info.skin, 'full'),
            (this.avatar1.me.visible = true),
            (this.avatar1.me.filters = [
              new Laya.ColorFilter([
                0,
                0,
                0,
                0,
                255,
                0,
                0,
                0,
                0,
                255,
                0,
                0,
                0,
                0,
                255,
                0,
                0,
                0,
                1,
                0
              ])
            ]),
            (this.avatar1.me.alpha = 0),
            Laya.Tween.to(
              this.avatar1.me,
              { alpha: 1 },
              1e3,
              null,
              Laya.Handler.create(this, () => {
                t.enable &&
                  (Laya.timer.once(1e3, t, () => {
                    t.avatar0.setSkin(e.full_fetter_skin, 'full'),
                      (t.avatar1.me.visible = false),
                      Laya.timer.once(500, t, () => {
                        t.when_over();
                      });
                  }),
                  Laya.timer.once(1e3, t, () => {
                    const e = Laya.loader.getRes(t.effect_path);
                    e && (t.container_effect.addChild(e), (e.visible = true)),
                      view.AudioMgr.PlayAudio(113);
                  }));
              })
            ));
        }
      }
    }),
    (i.prototype.when_over = function() {
      const t = this;
      let e = '';
      if (this.chara_info.is_upgraded) e = 'lobby_qiyue';
      else
        switch (this.chara_info.level) {
          case 1:
            e = 'lobby_levelup0';
            break;
          case 2:
            e = 'lobby_levelup1';
            break;
          case 3:
            e = 'lobby_levelup2';
            break;
          case 4:
            e = 'lobby_levelup3';
            break;
          case 5:
            e = 'lobby_levelmax';
        }
      const i = cfg.item_definition.character.get(this.chara_info.charid);
      const n = cfg.voice.sound.getGroup(i.sound);
      let a = 0;
      if ('' != e) {
        for (var r = '', s = '', o = 0; o < n.length; o++)
          if (n[o].type == e) {
            (r = n[o][`words_${GameMgr.client_language}`]),
              (s = n[o].path),
              (a = n[o].time_length);
            break;
          }
        if ('' != s) {
          this.block_chat.show(r);
          let l = i.sound_volume;
          view.AudioMgr.yuyinMuted
            ? (l = 0)
            : (l *= view.AudioMgr.yuyinVolume),
            view.AudioMgr.getCVmute(i.id)
              ? (l = 0)
              : (l *= view.AudioMgr.getCVvolume(i.id)),
            (this.sound_channel = view.AudioMgr.PlaySound(s, l)),
            (this.img_word.visible = false),
            (this.container_hearts.visible = false);
        }
      }
      Laya.timer.once(a + 2e3, this, () => {
        t.btn_bigclose.visible = true;
      });
    }),
    (i.prototype.onDisable = function() {
      view.AudioMgr.refresh_music_volume(false);
      for (e = 0; e < this.ress.length; e++)
        Laya.loader.clearTextureRes(this.ress[e]);
      if (
        (this.avatar0.clear(),
        this.avatar1.clear(),
        this.chara_info.is_upgraded)
      )
        for (var e = 0; e < t.UI_Sushe.characters.length; e++)
          if (t.UI_Sushe.characters[e].charid == this.chara_info.charid) {
            (t.UI_Sushe.characters[e].level = 5),
              (t.UI_Sushe.characters[e].exp = 0),
              (t.UI_Sushe.characters[
                e
              ].skin = cfg.item_definition.character.get(
                this.chara_info.charid
              ).full_fetter_skin),
              t.UI_Sushe.main_character_id == this.chara_info.charid &&
                (GameMgr.Inst.account_data.avatar_id =
                  t.UI_Sushe.characters[e].skin);
            break;
          }
      (this.chara_info = null),
        Laya.timer.clearAll(this),
        this.sound_channel &&
          (this.sound_channel.stop(),
          Laya.SoundManager.removeChannel(this.sound_channel),
          (this.sound_channel = null));
      const i = Laya.loader.getRes(this.effect_path);
      i && i.destroy(true);
    }),
    (i.prototype.close = function() {
      (this.locking = true),
        (this.enable = false),
        this.back_func && this.back_func.run();
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Character_star_up = e;
})(uiscript || (uiscript = {}));