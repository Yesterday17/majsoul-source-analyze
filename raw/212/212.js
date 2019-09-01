var uiscript;
!(function(t) {
  var e = (function() {
      function e(t, e) {
        var i = this;
        (this.scale = 1),
          (this.during_move = false),
          (this.mouse_start_x = 0),
          (this.mouse_start_y = 0),
          (this.me = t),
          (this.container_illust = e),
          (this.illust = this.container_illust.getChildByName('illust')),
          (this.container_move = t.getChildByName('move')),
          this.container_move.on('mousedown', this, function() {
            (i.during_move = true),
              (i.mouse_start_x = i.container_move.mouseX),
              (i.mouse_start_y = i.container_move.mouseY);
          }),
          this.container_move.on('mousemove', this, function() {
            i.during_move &&
              (i.move(
                i.container_move.mouseX - i.mouse_start_x,
                i.container_move.mouseY - i.mouse_start_y
              ),
              (i.mouse_start_x = i.container_move.mouseX),
              (i.mouse_start_y = i.container_move.mouseY));
          }),
          this.container_move.on('mouseup', this, function() {
            i.during_move = false;
          }),
          this.container_move.on('mouseout', this, function() {
            i.during_move = false;
          }),
          (this.btn_big = t.getChildByName('btn_big')),
          (this.btn_big.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.bigger();
            },
            null,
            false
          )),
          (this.btn_small = t.getChildByName('btn_small')),
          (this.btn_small.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.smaller();
            },
            null,
            false
          )),
          (this.btn_close = t.getChildByName('btn_close')),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.close();
            },
            null,
            false
          ));
      }
      return (
        (e.prototype.show = function(e) {
          var n = this;
          (this.locking = true),
            (this.when_close = e),
            (this.illust_start_x = this.illust.x),
            (this.illust_start_y = this.illust.y),
            (this.illust_center_x = this.illust.x + 984 - 446),
            (this.illust_center_y = this.illust.y + 11 - 84),
            (this.container_illust.getChildByName(
              'container_name'
            ).visible = false),
            (this.container_illust.getChildByName(
              'container_name_en'
            ).visible = false),
            (this.container_illust.getChildByName('btn').visible = false),
            i.Inst.stopsay(),
            (this.scale = 1),
            Laya.Tween.to(
              this.illust,
              { x: this.illust_center_x, y: this.illust_center_y },
              200
            ),
            t.UIBase.anim_pop_out(this.btn_big, null),
            t.UIBase.anim_pop_out(this.btn_small, null),
            t.UIBase.anim_pop_out(this.btn_close, null),
            (this.during_move = false),
            Laya.timer.once(250, this, function() {
              n.locking = false;
            }),
            (this.me.visible = true);
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = true),
            'chs' == GameMgr.client_language
              ? (this.container_illust.getChildByName(
                  'container_name'
                ).visible = true)
              : (this.container_illust.getChildByName(
                  'container_name_en'
                ).visible = true),
            (this.container_illust.getChildByName('btn').visible = true),
            Laya.Tween.to(
              this.illust,
              {
                x: this.illust_start_x,
                y: this.illust_start_y,
                scaleX: 1,
                scaleY: 1
              },
              200
            ),
            t.UIBase.anim_pop_hide(this.btn_big, null),
            t.UIBase.anim_pop_hide(this.btn_small, null),
            t.UIBase.anim_pop_hide(this.btn_close, null),
            Laya.timer.once(250, this, function() {
              (e.locking = false), (e.me.visible = false), e.when_close.run();
            });
        }),
        (e.prototype.bigger = function() {
          1.1 * this.scale > 1.5 ||
            ((this.scale *= 1.1),
            Laya.Tween.to(
              this.illust,
              { scaleX: this.scale, scaleY: this.scale },
              100,
              null,
              null,
              0,
              true,
              true
            ));
        }),
        (e.prototype.smaller = function() {
          this.scale / 1.1 < 0.5 ||
            ((this.scale /= 1.1),
            Laya.Tween.to(
              this.illust,
              { scaleX: this.scale, scaleY: this.scale },
              100,
              null,
              null,
              0,
              true,
              true
            ));
        }),
        (e.prototype.move = function(t, e) {
          var i = this.illust.x + t,
            n = this.illust.y + e;
          i < this.illust_center_x - 600
            ? (i = this.illust_center_x - 600)
            : i > this.illust_center_x + 600 &&
              (i = this.illust_center_x + 600),
            n < this.illust_center_y - 1200
              ? (n = this.illust_center_y - 1200)
              : n > this.illust_center_y + 800 &&
                (n = this.illust_center_y + 800),
            (this.illust.x = i),
            (this.illust.y = n);
        }),
        e
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.lobby.susheUI()) || this;
        return (
          (t.contianer_illust = null),
          (t.illust = null),
          (t.container_name = null),
          (t.label_name = null),
          (t.label_cv = null),
          (t.container_page = null),
          (t.container_look_illust = null),
          (t.page_select_character = null),
          (t.page_visit_character = null),
          (t.origin_illust_x = 0),
          (t.chat_id = 0),
          (t.select_index = 0),
          (t.container_chat = null),
          (t.sound_channel = null),
          (t.chat_block = null),
          (n.Inst = t),
          t
        );
      }
      return (
        __extends(n, i),
        (n.init = function(e) {
          var i = this;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchCharacterInfo',
            {},
            function(n, a) {
              if (n || a.error)
                t.UIMgr.Inst.showNetReqError('fetchCharacterInfo', n, a);
              else {
                if (
                  (app.Log.log('fetchCharacterInfo: ' + JSON.stringify(a)),
                  (a = JSON.parse(JSON.stringify(a))).main_character_id &&
                    a.characters)
                ) {
                  if (((i.characters = []), a.characters))
                    for (r = 0; r < a.characters.length; r++)
                      i.characters.push(a.characters[r]);
                  if (((i.skin_map = {}), a.skins))
                    for (var r = 0; r < a.skins.length; r++)
                      i.skin_map[a.skins[r]] = 1;
                  i.main_character_id = a.main_character_id;
                } else
                  (i.characters = []),
                    i.characters.push({
                      charid: 200001,
                      level: 0,
                      exp: 0,
                      views: [],
                      skin: 400101,
                      is_upgraded: false,
                      extra_emoji: []
                    }),
                    i.characters.push({
                      charid: 200002,
                      level: 0,
                      exp: 0,
                      views: [],
                      skin: 400201,
                      is_upgraded: false,
                      extra_emoji: []
                    }),
                    (i.skin_map[400101] = 1),
                    (i.skin_map[400201] = 1),
                    (i.main_character_id = 200001);
                (i.send_gift_count = 0),
                  (i.send_gift_limit = 0),
                  a.send_gift_count && (i.send_gift_count = a.send_gift_count),
                  a.send_gift_limit && (i.send_gift_limit = a.send_gift_limit),
                  e.run();
              }
            }
          );
        }),
        (n.on_data_updata = function(e) {
          if (e.character) {
            var i = JSON.parse(JSON.stringify(e.character));
            if (i.characters)
              for (var n = i.characters, a = 0; a < n.length; a++) {
                for (var r = false, s = 0; s < this.characters.length; s++)
                  if (this.characters[s].charid == n[a].charid) {
                    (this.characters[s] = n[a]),
                      t.UI_Sushe_Visit.Inst &&
                        t.UI_Sushe_Visit.Inst.chara_info &&
                        t.UI_Sushe_Visit.Inst.chara_info.charid ==
                          this.characters[s].charid &&
                        (t.UI_Sushe_Visit.Inst.chara_info = this.characters[s]),
                      (r = true);
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
        }),
        (n.chara_owned = function(t) {
          for (var e = 0; e < this.characters.length; e++)
            if (this.characters[e].charid == t) return true;
          return false;
        }),
        (n.skin_owned = function(t) {
          return this.skin_map.hasOwnProperty(t.toString());
        }),
        (n.add_skin = function(t) {
          this.skin_map[t] = 1;
        }),
        Object.defineProperty(n, 'main_chara_info', {
          get: function() {
            for (var t = 0; t < this.characters.length; t++)
              if (this.characters[t].charid == this.main_character_id)
                return this.characters[t];
            return null;
          },
          enumerable: true,
          configurable: true
        }),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.contianer_illust = this.me.getChildByName('illust')),
            (this.illust = new t.UI_Character_Skin(
              this.contianer_illust
                .getChildByName('illust')
                .getChildByName('illust')
            )),
            (this.container_chat = this.contianer_illust.getChildByName(
              'chat'
            )),
            (this.chat_block = new t.UI_Character_Chat(this.container_chat)),
            (this.contianer_illust.getChildByName(
              'btn'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                (i.page_visit_character.me.visible &&
                  i.page_visit_character.cannot_click_say) ||
                  (i.sound_channel ? i.stopsay() : i.say('lobby_normal'));
              },
              null,
              false
            )),
            (this.container_name = null),
            'chs' == GameMgr.client_language
              ? ((this.container_name = this.contianer_illust.getChildByName(
                  'container_name'
                )),
                (this.contianer_illust.getChildByName(
                  'container_name_en'
                ).visible = false))
              : ((this.container_name = this.contianer_illust.getChildByName(
                  'container_name_en'
                )),
                (this.contianer_illust.getChildByName(
                  'container_name'
                ).visible = false)),
            (this.label_name = this.container_name.getChildByName(
              'label_name'
            )),
            (this.label_cv = this.container_name.getChildByName('label_CV')),
            (this.origin_illust_x = this.contianer_illust.x),
            (this.container_page = this.me.getChildByName('container_page')),
            (this.page_select_character = new t.UI_Sushe_Select()),
            this.container_page.addChild(this.page_select_character.me),
            (this.page_visit_character = new t.UI_Sushe_Visit()),
            this.container_page.addChild(this.page_visit_character.me),
            (this.container_look_illust = new e(
              this.me.getChildByName('look_illust'),
              this.contianer_illust
            ));
        }),
        (n.prototype.show = function() {
          GameMgr.Inst.BehavioralStatistics(15),
            game.Scene_Lobby.Inst.change_bg('indoor', false),
            (this.enable = true),
            (this.page_visit_character.me.visible = false);
          for (var t = 0, e = 0; e < n.characters.length; e++)
            if (n.characters[e].charid == n.main_character_id) {
              t = e;
              break;
            }
          this.change_select(t),
            this.show_page_select(),
            (this.container_look_illust.me.visible = false);
        }),
        (n.prototype.starup_back = function() {
          (this.enable = true),
            this.change_select(this.select_index),
            this.show_page_visit(true);
        }),
        (n.prototype.go2Lobby = function() {
          this.close(
            Laya.Handler.create(this, function() {
              t.UIMgr.Inst.showLobby();
            })
          );
        }),
        (n.prototype.close = function(e) {
          var i = this;
          t.UIBase.anim_alpha_out(this.contianer_illust, { x: -30 }, 150, 0),
            Laya.timer.once(150, this, function() {
              (i.enable = false), e.run();
            });
        }),
        (n.prototype.onDisable = function() {
          this.illust.clear(),
            this.stopsay(),
            this.container_look_illust.me.visible &&
              this.container_look_illust.close();
        }),
        (n.prototype.show_page_select = function() {
          this.page_select_character.show(this.select_index);
        }),
        (n.prototype.show_page_visit = function(t) {
          this.page_visit_character.show(n.characters[this.select_index], t);
        }),
        (n.prototype.change_select = function(e) {
          (this.select_index = e), this.illust.clear();
          var i = n.characters[e];
          (this.label_name.text = cfg.item_definition.character.get(i.charid)[
            'name_' + GameMgr.client_language
          ]),
            'chs' == GameMgr.client_language
              ? (this.label_cv.text =
                  'CV' +
                  cfg.item_definition.character.get(i.charid)[
                    'desc_cv_' + GameMgr.client_language
                  ])
              : (this.label_cv.text =
                  'CV:' +
                  cfg.item_definition.character.get(i.charid)[
                    'desc_cv_' + GameMgr.client_language
                  ]),
            this.illust.setSkin(i.skin, 'full'),
            Laya.Tween.clearAll(this.contianer_illust),
            (this.contianer_illust.x = this.origin_illust_x),
            (this.contianer_illust.alpha = 1),
            t.UIBase.anim_alpha_in(this.contianer_illust, { x: -30 }, 230),
            this.stopsay();
        }),
        (n.prototype.onChangeSkin = function(t) {
          (n.characters[this.select_index].skin = t),
            this.change_select(this.select_index),
            n.characters[this.select_index].charid == n.main_character_id &&
              (GameMgr.Inst.account_data.avatar_id = t),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'changeCharacterSkin',
              { character_id: n.characters[this.select_index].charid, skin: t },
              function(t, e) {}
            );
        }),
        (n.prototype.say = function(t) {
          var e = this,
            i = n.characters[this.select_index];
          this.chat_id++;
          var a = this.chat_id,
            r = view.AudioMgr.PlayCharactorSound(
              i,
              t,
              Laya.Handler.create(this, function() {
                Laya.timer.once(1e3, e, function() {
                  a == e.chat_id && e.stopsay();
                });
              })
            );
          r && (this.chat_block.show(r.words), (this.sound_channel = r.sound));
        }),
        (n.prototype.stopsay = function() {
          this.chat_block.close(false),
            this.sound_channel &&
              (this.sound_channel.stop(),
              Laya.SoundManager.removeChannel(this.sound_channel),
              (this.sound_channel = null));
        }),
        (n.prototype.to_look_illust = function() {
          var t = this;
          this.container_look_illust.show(
            Laya.Handler.create(this, function() {
              t.page_select_character.show(t.select_index);
            })
          );
        }),
        (n.characters = []),
        (n.skin_map = {}),
        (n.main_character_id = 0),
        (n.send_gift_count = 0),
        (n.send_gift_limit = 0),
        (n.Inst = null),
        n
      );
    })(t.UIBase);
  t.UI_Sushe = i;
})(uiscript || (uiscript = {}));