var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(t, e) {
        var i = this;
        this.scale = 1;
        this.during_move = !1;
        this.mouse_start_x = 0;
        this.mouse_start_y = 0;
        this.me = t;
        this.container_illust = e;
        this.illust = this.container_illust.getChildByName('illust');
        this.container_move = t.getChildByName('move');

        this.container_move.on('mousedown', this, () => {
          i.during_move = !0;
          i.mouse_start_x = i.container_move.mouseX;
          i.mouse_start_y = i.container_move.mouseY;
        });

        this.container_move.on('mousemove', this, () => {
          i.move(
              i.container_move.mouseX - i.mouse_start_x,
              i.container_move.mouseY - i.mouse_start_y
            );

          i.mouse_start_x = i.container_move.mouseX;
          i.during_move &&
            ((i.mouse_start_y = i.container_move.mouseY));
        });

        this.container_move.on('mouseup', this, () => {
          i.during_move = !1;
        });

        this.container_move.on('mouseout', this, () => {
          i.during_move = !1;
        });

        this.btn_big = t.getChildByName('btn_big');

        this.btn_big.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.bigger();
            },
            null,
            !1
          );

        this.btn_small = t.getChildByName('btn_small');

        this.btn_small.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.smaller();
            },
            null,
            !1
          );

        this.btn_close = t.getChildByName('btn_close');
        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.close();
            },
            null,
            !1
          );
      }

      show(e) {
        var n = this;
        this.locking = !0;
        this.when_close = e;
        this.illust_start_x = this.illust.x;
        this.illust_start_y = this.illust.y;
        this.illust_center_x = this.illust.x + 984 - 446;
        this.illust_center_y = this.illust.y + 11 - 84;

        this.container_illust.getChildByName(
            'container_name'
          ).visible = !1;

        this.container_illust.getChildByName(
            'container_name_en'
          ).visible = !1;

        this.container_illust.getChildByName('btn').visible = !1;
        i.Inst.stopsay();
        this.scale = 1;

        Laya.Tween.to(
          this.illust,
          { x: this.illust_center_x, y: this.illust_center_y },
          200
        );

        t.UIBase.anim_pop_out(this.btn_big, null);
        t.UIBase.anim_pop_out(this.btn_small, null);
        t.UIBase.anim_pop_out(this.btn_close, null);
        this.during_move = !1;

        Laya.timer.once(250, this, () => {
          n.locking = !1;
        });

        this.me.visible = !0;
      }

      close() {
        var e = this;
        this.locking = !0;

        'chs' == GameMgr.client_language
          ? (this.container_illust.getChildByName(
              'container_name'
            ).visible = !0)
          : (this.container_illust.getChildByName(
              'container_name_en'
            ).visible = !0);

        this.container_illust.getChildByName('btn').visible = !0;

        Laya.Tween.to(
          this.illust,
          {
            x: this.illust_start_x,
            y: this.illust_start_y,
            scaleX: 1,
            scaleY: 1
          },
          200
        );

        t.UIBase.anim_pop_hide(this.btn_big, null);
        t.UIBase.anim_pop_hide(this.btn_small, null);
        t.UIBase.anim_pop_hide(this.btn_close, null);
        Laya.timer.once(250, this, () => {
          e.locking = !1;
          e.me.visible = !1;
          e.when_close.run();
        });
      }

      bigger() {
        this.scale *= 1.1;
        1.1 * this.scale > 1.5 ||
          (Laya.Tween.to(
          this.illust,
          { scaleX: this.scale, scaleY: this.scale },
          100,
          null,
          null,
          0,
          !0,
          !0
        ));
      }

      smaller() {
        this.scale /= 1.1;
        this.scale / 1.1 < 0.5 ||
          (Laya.Tween.to(
          this.illust,
          { scaleX: this.scale, scaleY: this.scale },
          100,
          null,
          null,
          0,
          !0,
          !0
        ));
      }

      move(t, e) {
        var i = this.illust.x + t,
          n = this.illust.y + e;

        i < this.illust_center_x - 600
          ? (i = this.illust_center_x - 600)
          : i > this.illust_center_x + 600 &&
            (i = this.illust_center_x + 600);

        n < this.illust_center_y - 1200
          ? (n = this.illust_center_y - 1200)
          : n > this.illust_center_y + 800 &&
            (n = this.illust_center_y + 800);

        this.illust.x = i;
        this.illust.y = n;
      }
    }

    return e;
  })();

  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.lobby.susheUI()) || this;
        t.contianer_illust = null;
        t.illust = null;
        t.container_name = null;
        t.label_name = null;
        t.label_cv = null;
        t.container_page = null;
        t.container_look_illust = null;
        t.page_select_character = null;
        t.page_visit_character = null;
        t.origin_illust_x = 0;
        t.chat_id = 0;
        t.select_index = 0;
        t.container_chat = null;
        t.sound_channel = null;
        t.chat_block = null;
        n.Inst = t;
        return t;
      }

      static init(e) {
        var i = this;
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchCharacterInfo',
          {},
          (n, a) => {
            if (n || a.error)
              t.UIMgr.Inst.showNetReqError('fetchCharacterInfo', n, a);
            else {
              app.Log.log(`fetchCharacterInfo: ${JSON.stringify(a)}`);
              i.characters = [];

              i.characters.push({
                charid: 200001,
                level: 0,
                exp: 0,
                views: [],
                skin: 400101,
                is_upgraded: !1,
                extra_emoji: []
              });

              i.characters.push({
                charid: 200002,
                level: 0,
                exp: 0,
                views: [],
                skin: 400201,
                is_upgraded: !1,
                extra_emoji: []
              });

              i.skin_map[400101] = 1;
              i.skin_map[400201] = 1;
              if (
                ((a = JSON.parse(JSON.stringify(a))).main_character_id &&
                a.characters)
              ) {
                i.characters = [];
                if ((a.characters))
                  for (r = 0; r < a.characters.length; r++)
                    i.characters.push(a.characters[r]);
                i.skin_map = {};
                if ((a.skins))
                  for (var r = 0; r < a.skins.length; r++)
                    i.skin_map[a.skins[r]] = 1;
                i.main_character_id = a.main_character_id;
              } else
                i.main_character_id = 200001;
              i.send_gift_count = 0;
              i.send_gift_limit = 0;
              a.send_gift_count && (i.send_gift_count = a.send_gift_count);
              a.send_gift_limit && (i.send_gift_limit = a.send_gift_limit);
              e.run();
            }
          }
        );
      }

      static on_data_updata({character}) {
        if (character) {
          var i = JSON.parse(JSON.stringify(character));
          if (i.characters)
            for (var n = i.characters, a = 0; a < n.length; a++) {
              for (var r = !1, s = 0; s < this.characters.length; s++)
                if (this.characters[s].charid == n[a].charid) {
                  this.characters[s] = n[a];

                  t.UI_Sushe_Visit.Inst &&
                    t.UI_Sushe_Visit.Inst.chara_info &&
                    t.UI_Sushe_Visit.Inst.chara_info.charid ==
                      this.characters[s].charid &&
                    (t.UI_Sushe_Visit.Inst.chara_info = this.characters[s]);

                  r = !0;
                  break;
                }
              r || this.characters.push(n[a]);
            }
          if (i.skins) {
            for (var o = i.skins, a = 0; a < o.length; a++)
              this.skin_map[o[a]] = 1;
            t.UI_Bag.Inst.on_skin_change();
          }
        }
      }

      static chara_owned(t) {
        for (var e = 0; e < this.characters.length; e++)
          if (this.characters[e].charid == t) return !0;
        return !1;
      }

      static skin_owned(t) {
        return this.skin_map.hasOwnProperty(t.toString());
      }

      static add_skin(t) {
        this.skin_map[t] = 1;
      }

      onCreate() {
        var i = this;
        this.contianer_illust = this.me.getChildByName('illust');

        this.illust = new t.UI_Character_Skin(
            this.contianer_illust
              .getChildByName('illust')
              .getChildByName('illust')
          );

        this.container_chat = this.contianer_illust.getChildByName(
            'chat'
          );

        this.chat_block = new t.UI_Character_Chat(this.container_chat);

        this.contianer_illust.getChildByName(
            'btn'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              (i.page_visit_character.me.visible &&
                i.page_visit_character.cannot_click_say) ||
                (i.sound_channel ? i.stopsay() : i.say('lobby_normal'));
            },
            null,
            !1
          );

        this.container_name = null;

        this.container_name = this.contianer_illust.getChildByName(
              'container_name'
            );

        this.container_name = this.contianer_illust.getChildByName(
              'container_name_en'
            );

        'chs' == GameMgr.client_language
          ? (this.contianer_illust.getChildByName(
              'container_name_en'
            ).visible = !1)
          : (this.contianer_illust.getChildByName(
              'container_name'
            ).visible = !1);

        this.label_name = this.container_name.getChildByName(
            'label_name'
          );

        this.label_cv = this.container_name.getChildByName('label_CV');
        this.origin_illust_x = this.contianer_illust.x;
        this.container_page = this.me.getChildByName('container_page');
        this.page_select_character = new t.UI_Sushe_Select();
        this.container_page.addChild(this.page_select_character.me);
        this.page_visit_character = new t.UI_Sushe_Visit();
        this.container_page.addChild(this.page_visit_character.me);
        this.container_look_illust = new e(
            this.me.getChildByName('look_illust'),
            this.contianer_illust
          );
      }

      show() {
        GameMgr.Inst.BehavioralStatistics(15);
        game.Scene_Lobby.Inst.change_bg('indoor', !1);
        this.enable = !0;
        this.page_visit_character.me.visible = !1;
        for (var t = 0, e = 0; e < n.characters.length; e++)
          if (n.characters[e].charid == n.main_character_id) {
            t = e;
            break;
          }
        this.change_select(t);
        this.show_page_select();
        this.container_look_illust.me.visible = !1;
      }

      starup_back() {
        this.enable = !0;
        this.change_select(this.select_index);
        this.show_page_visit(!0);
      }

      go2Lobby() {
        this.close(
          Laya.Handler.create(this, () => {
            t.UIMgr.Inst.showLobby();
          })
        );
      }

      close(e) {
        var i = this;
        t.UIBase.anim_alpha_out(this.contianer_illust, { x: -30 }, 150, 0);
        Laya.timer.once(150, this, () => {
          i.enable = !1;
          e.run();
        });
      }

      onDisable() {
        this.illust.clear();
        this.stopsay();
        this.container_look_illust.me.visible &&
          this.container_look_illust.close();
      }

      show_page_select() {
        this.page_select_character.show(this.select_index);
      }

      show_page_visit(t) {
        this.page_visit_character.show(n.characters[this.select_index], t);
      }

      change_select(e) {
        this.select_index = e;
        this.illust.clear();
        var i = n.characters[e];

        this.label_name.text = cfg.item_definition.character.get(i.charid)[
          `name_${GameMgr.client_language}`
        ];

        'chs' == GameMgr.client_language
          ? (this.label_cv.text =
              `CV${cfg.item_definition.character.get(i.charid)[
  `desc_cv_${GameMgr.client_language}`
]}`)
          : (this.label_cv.text =
              `CV:${cfg.item_definition.character.get(i.charid)[
  `desc_cv_${GameMgr.client_language}`
]}`);

        this.illust.setSkin(i.skin, 'full');
        Laya.Tween.clearAll(this.contianer_illust);
        this.contianer_illust.x = this.origin_illust_x;
        this.contianer_illust.alpha = 1;
        t.UIBase.anim_alpha_in(this.contianer_illust, { x: -30 }, 230);
        this.stopsay();
      }

      onChangeSkin(t) {
        n.characters[this.select_index].skin = t;
        this.change_select(this.select_index);

        n.characters[this.select_index].charid == n.main_character_id &&
          (GameMgr.Inst.account_data.avatar_id = t);

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'changeCharacterSkin',
          { character_id: n.characters[this.select_index].charid, skin: t },
          (t, e) => {}
        );
      }

      say(t) {
        var e = this,
          i = n.characters[this.select_index];
        this.chat_id++;
        var a = this.chat_id,
          r = view.AudioMgr.PlayCharactorSound(
            i,
            t,
            Laya.Handler.create(this, () => {
              Laya.timer.once(1e3, e, () => {
                a == e.chat_id && e.stopsay();
              });
            })
          );
        this.chat_block.show(r.words);
        r && ((this.sound_channel = r.sound));
      }

      stopsay() {
        this.chat_block.close(!1);
        this.sound_channel.stop();
        Laya.SoundManager.removeChannel(this.sound_channel);
        this.sound_channel &&
          ((this.sound_channel = null));
      }

      to_look_illust() {
        var t = this;
        this.container_look_illust.show(
          Laya.Handler.create(this, () => {
            t.page_select_character.show(t.select_index);
          })
        );
      }
    }

    __extends(n, i);

    Object.defineProperty(n, 'main_chara_info', {
      get() {
        for (var t = 0; t < this.characters.length; t++)
          if (this.characters[t].charid == this.main_character_id)
            return this.characters[t];
        return null;
      },
      enumerable: !0,
      configurable: !0
    });

    n.characters = [];
    n.skin_map = {};
    n.main_character_id = 0;
    n.send_gift_count = 0;
    n.send_gift_limit = 0;
    n.Inst = null;
    return n;
  })(t.UIBase);

  t.UI_Sushe = i;
})(uiscript || (uiscript = {}));