const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.get_characterUI()) || this;
      i.Inst = t;
      return (t.atlas_url = 'res/atlas/'),
      'chs' != GameMgr.client_language &&
        (t.atlas_url += `${GameMgr.client_language}/`),
      (t.atlas_url += 'myres/get_character.atlas'),
      t
    ;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      const i = this.me.getChildByName('root');
      (this.bg = i.getChildByName('bg')),
        (this.btn_next = i.getChildByName('btn_next')),
        (this.btn_next.clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        }));
      const n = i.getChildByName('container_illust');
      this.illust = new t.UI_Character_Skin(n.getChildByName('illust'));
      let a = null;
      'chs' == GameMgr.client_language
        ? ((a = n.getChildByName('container_name_chs')),
          (n.getChildByName('container_name_en').visible = !1))
        : ((a = n.getChildByName('container_name_en')),
          (n.getChildByName('container_name_chs').visible = !1)),
        (this.label_name = a.getChildByName('label_name')),
        (this.label_cv = a.getChildByName('label_cv')),
        (this.chat = new t.UI_Character_Chat(n.getChildByName('chat'))),
        (this.container_effect = this.me.getChildByName('effect')),
        Laya.timer.once(2e3, this, () => {
          Laya.loader.clearTextureRes(
            `res/atlas/${game.Tools.localUISrc('myres/get_character.atlas')}`
          );
        });
    }),
    (i.prototype.close_sound = function() {
      this.sound_channel &&
        (this.sound_channel.stop(),
        Laya.SoundManager.removeChannel(this.sound_channel),
        (this.sound_channel = null));
    }),
    (i.prototype.show = function(t) {
      const e = this;
      (this.bg.skin = game.Tools.localUISrc('myres/star_up/bg.jpg')),
        (this.character_id = t);
      const i = cfg.item_definition.character.get(t);
      this.illust.setSkin(i.init_skin, 'full'),
        (this.label_name.text = i[`name_${GameMgr.client_language}`]),
        (this.label_cv.text =
          `cv:${i[`desc_cv_${GameMgr.client_language}`]}`),
        this.chat.close(!0),
        this.close_sound(),
        (this.btn_next.visible = !1),
        (this.illust.me.parent.alpha = 1),
        (this.illust.me.parent.y = -8),
        (this.enable = !0),
        (this.locking = !0),
        this.me.JSin.play(0, !1),
        Laya.timer.once((70 / 24) * 1e3, this, () => {
          (e.effect = game.FrontEffect.Inst.create_ui_effect(
            e.container_effect,
            'scene/effect_get_character.lh',
            new Laya.Point(0, 0),
            1
          )),
            view.AudioMgr.PlayAudio(107);
        }),
        Laya.timer.once(5200, this, () => {
          let t = '';
          let n = '';
          let a = 0;
          if (
            (cfg.voice.sound.getGroup(i.sound).forEach(e => {
              'lobby_selfintro' == e.type &&
                ((t = e.path),
                (n = e[`words_${GameMgr.client_language}`]),
                (a = e.time_length));
            }),
            '' != t)
          ) {
            let r = i.sound_volume;
            view.AudioMgr.yuyinMuted
              ? (r = 0)
              : (r *= view.AudioMgr.yuyinVolume),
              view.AudioMgr.getCVmute(i.id)
                ? (r = 0)
                : (r *= view.AudioMgr.getCVvolume(i.id)),
              (e.sound_channel = view.AudioMgr.PlaySound(
                t,
                r,
                Laya.Handler.create(e, () => {
                  e.sound_channel = null;
                })
              ));
          }
          '' != n && e.chat.show(n),
            Laya.timer.once(1e3, e, () => {
              (e.locking = !1), (e.btn_next.visible = !0);
            });
        });
    }),
    (i.prototype.close = function() {
      const t = this;
      (this.locking = !0),
        (this.btn_next.visible = !1),
        this.me.JSout.play(0, !1),
        this.chat.close(!1),
        this.close_sound(),
        Laya.timer.once(800, this, () => {
          (t.locking = !1), (t.enable = !1);
        }),
        this.effect && (this.effect.destory(), (this.effect = null));
    }),
    (i.prototype.onDisable = function() {
      this.illust.clear(),
        Laya.loader.clearTextureRes(
          game.Tools.localUISrc('myres/star_up/bg.jpg')
        ),
        Laya.loader.clearTextureRes(this.atlas_url),
        this.effect && (this.effect.destory(), (this.effect = null));
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Get_Character = e;
})(uiscript || (uiscript = {}));