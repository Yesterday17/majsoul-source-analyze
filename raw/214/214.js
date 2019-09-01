var uiscript;
!(function(t) {
  var e = (function() {
      function t(t) {
        var e = this;
        (this.speed = 0.001),
          (this.hearts = []),
          (this.heart_masks = []),
          (this.exp_limits = []),
          (this.preframe_time = 0),
          (this.heart_count = 5),
          (this.during_change = false),
          (this.btn_heart = null),
          (this.label_val = null),
          (this.is_upgraded = false),
          (this.val_show_starttime = -1),
          (this.me = t),
          (this.container_hearts = this.me.getChildByName('hearts'));
        for (n = 0; n < 5; n++) {
          var i = this.container_hearts.getChildByName('h' + n);
          this.hearts.push(i),
            this.heart_masks.push(i.getChildByName('v').mask);
        }
        (this.bg_hearts = this.me.getChildByName('bg_hearts')),
          (this.exp_limits = []);
        for (var n = 0; n < 5; n++)
          this.exp_limits.push(cfg.level_definition.character.find(n + 1).exp);
        (this.btn_heart = this.me.getChildByName('btn_heart')),
          (this.label_val = this.container_hearts.getChildByName('heartval')),
          (this.btn_heart.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.is_upgraded ||
                (e.label_val.visible
                  ? (e.label_val.visible = false)
                  : ((e.label_val.visible = true),
                    (e.val_show_starttime = Laya.timer.currTimer)));
            },
            null,
            false
          ));
      }
      return (
        (t.prototype.show = function(t) {
          Laya.timer.clearAll(this),
            t.is_upgraded
              ? (this.bg_hearts.skin = game.Tools.localUISrc(
                  'myres/sushe/heart_full.png'
                ))
              : (this.bg_hearts.skin = game.Tools.localUISrc(
                  'myres/sushe/heart_normal.png'
                )),
            (this.current_level = t.level),
            (this.current_exp_rate =
              t.exp / this.exp_limits[this.current_level]),
            (this.isupgrad = t.is_upgraded),
            (this.label_val.visible = false),
            this.refresh_heart(
              this.current_level,
              this.current_exp_rate,
              t.is_upgraded
            ),
            (this.during_change = false),
            (this.preframe_time = Laya.timer.currTimer),
            Laya.timer.frameLoop(1, this, this.update);
        }),
        (t.prototype.update = function() {
          if (this.label_val.visible) {
            Laya.timer.currTimer - this.val_show_starttime >= 5e3 &&
              (this.label_val.visible = false);
          }
          var t = Laya.timer.currTimer - this.preframe_time;
          (this.preframe_time = Laya.timer.currTimer),
            this.during_change &&
              (this.target_level != this.current_level
                ? ((this.during_change = false),
                  (this.current_level = this.target_level),
                  (this.current_exp_rate = this.target_exp_rate),
                  this.refresh_heart(
                    this.target_level,
                    this.target_exp_rate,
                    this.isupgrad
                  ))
                : ((this.current_exp_rate += t * this.speed),
                  this.target_exp_rate < this.current_exp_rate
                    ? ((this.during_change = false),
                      (this.current_level = this.target_level),
                      (this.current_exp_rate = this.target_exp_rate),
                      this.refresh_heart(
                        this.target_level,
                        this.target_exp_rate,
                        this.isupgrad
                      ))
                    : this.refresh_heart(
                        this.target_level,
                        this.current_exp_rate,
                        this.isupgrad
                      )));
        }),
        (t.prototype.refresh_heart = function(t, e, i) {
          this.is_upgraded = i;
          for (var n = 0; n < this.heart_count; n++) {
            var a = this.heart_masks[n];
            this.current_level > n
              ? (a.scaleY = 1)
              : this.current_level == n
              ? ((a.scaleY = 0.82 * e + 0.1),
                (this.label_val.x = this.hearts[n].x),
                (this.label_val.text =
                  Math.ceil(e * this.exp_limits[n]).toString() +
                  '/' +
                  this.exp_limits[n].toString()))
              : (a.scaleY = 0),
              (this.hearts[n].getChildByName('v').getChildByName('h').skin = i
                ? game.Tools.localUISrc('myres/bothui/heart_gold.png')
                : game.Tools.localUISrc('myres/bothui/bf_heart.png'));
          }
        }),
        (t.prototype.close = function() {
          Laya.timer.clearAll(this);
        }),
        (t.prototype.after_give = function(t, e) {
          var i = this,
            n = t.exp / this.exp_limits[t.level],
            a = game.FrontEffect.Inst.create_ui_effect(
              this.hearts[this.current_level],
              e ? 'scene/effect_heartup_favor.lh' : 'scene/effect_heartup.lh',
              new Laya.Point(0, 0),
              1
            );
          if (
            (Laya.timer.once(2e3, null, function() {
              a.destory();
            }),
            t.level > this.current_level)
          ) {
            (this.target_level = this.current_level),
              (this.target_exp_rate = 1),
              (this.during_change = true);
            var r = (1 - this.current_exp_rate) / this.speed;
            Laya.timer.once(r + 200, this, function() {
              var t = game.FrontEffect.Inst.create_ui_effect(
                i.hearts[i.current_level],
                'scene/effect_heartlevelup.lh',
                new Laya.Point(0, 0),
                1
              );
              Laya.timer.once(2e3, null, function() {
                t.destory();
              }),
                view.AudioMgr.PlayAudio(111);
            });
          } else
            t.level == this.current_level && n > this.current_exp_rate
              ? ((this.target_level = t.level),
                (this.target_exp_rate = n),
                (this.during_change = true))
              : Laya.timer.once(500, this, function() {
                  (i.target_level = t.level),
                    (i.target_exp_rate = n),
                    (i.during_change = true);
                });
        }),
        t
      );
    })(),
    i = (function() {
      function e(t, e, i) {
        var n = this;
        (this.items = []),
          (this.tab_index = 0),
          (this.gift_choose_index = -1),
          (this.content_inshow = false),
          (this.give_cd = 0),
          (this.sound_channel = null),
          (this.content = t),
          (this.block_exp = i),
          (this.container_tabs = e),
          (this.btn_gift = this.container_tabs.getChildByName('send')),
          (this.btn_gift.clickHandler = Laya.Handler.create(
            this,
            function() {
              2 != n.tab_index && n.change_tab(2);
            },
            null,
            false
          )),
          (this.btn_qiyue = this.container_tabs.getChildByName('sign')),
          (this.btn_qiyue.clickHandler = Laya.Handler.create(
            this,
            function() {
              1 != n.tab_index && n.change_tab(1);
            },
            null,
            false
          )),
          (this.scrollview = this.content.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, false),
            -1,
            4
          ),
          (this.container_qiyue = this.content.getChildByName('page_qiyue')),
          (this.container_gift = this.content.getChildByName('page_gift')),
          (this.content.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              n.change_tab(0);
            },
            null,
            false
          ));
      }
      return (
        (e.prototype.reset = function() {
          (this.content.visible = false),
            (this.content_inshow = false),
            (this.tab_index = 0),
            (this.gift_choose_index = -1);
        }),
        (e.prototype.show = function(t) {
          this.reset(),
            (this.chara_info = t),
            (this.btn_gift.visible = t.level < 5);
          var e = cfg.item_definition.character.get(t.charid);
          (this.btn_qiyue.visible = !t.is_upgraded && e.can_marry > 0),
            game.Tools.child_align_center(this.container_tabs, [7]),
            this.change_tab(0);
        }),
        (e.prototype.change_tab = function(e) {
          var i = this;
          if (
            ((this.items = []),
            this.scrollview.reset(),
            (this.container_gift.visible = false),
            (this.container_qiyue.visible = false),
            (this.tab_index = e),
            1 == e)
          ) {
            (this.btn_qiyue.getChildByName('chosen').visible = true),
              (this.btn_qiyue.getChildByName('label').color = '#000000');
            for (
              var n = cfg.item_definition.character
                  .get(this.chara_info.charid)
                  .star_5_material.split(','),
                a = true,
                r = 0;
              r < n.length;
              r++
            ) {
              for (
                var s = n[r].split('-'),
                  o = s[0].split('|'),
                  l = 0,
                  h = 0,
                  u = 0;
                u < o.length;
                u++
              )
                (l = parseInt(o[u])), (h += t.UI_Bag.get_item_count(l));
              var _ = parseInt(s[1]);
              _ > h && (a = false), this.items.push({ id: l, need: _, count: h });
            }
            if (
              ((this.container_qiyue.visible = true), this.chara_info.level >= 5)
            ) {
              this.container_qiyue.getChildByName('nomet').visible = false;
              var d = this.container_qiyue.getChildByName('container_tupo_btn'),
                f = d.getChildByName('send');
              (f.clickHandler = Laya.Handler.create(
                this,
                this._tupo,
                null,
                false
              )),
                a
                  ? game.Tools.setGrayDisable(f, false)
                  : game.Tools.setGrayDisable(f, true),
                (d.visible = true);
            } else
              (this.container_qiyue.getChildByName(
                'container_tupo_btn'
              ).visible = false),
                (this.container_qiyue.getChildByName('nomet').visible = true);
          } else
            (this.btn_qiyue.getChildByName('chosen').visible = false),
              (this.btn_qiyue.getChildByName('label').color = '#cfcdcc');
          if (2 == e) {
            (this.btn_gift.getChildByName('chosen').visible = true),
              (this.btn_gift.getChildByName('label').color = '#000000'),
              (this.items = t.UI_Bag.find_items_by_category(
                t.EItemCategory.gift
              )),
              (this.container_gift.visible = true);
            (this.container_gift.getChildByName(
              'send'
            ).clickHandler = Laya.Handler.create(
              this,
              this._send_gift,
              null,
              false
            )),
              (this.gift_choose_index = -1),
              this.refresh_gift_bottom_btns();
          } else
            (this.btn_gift.getChildByName('chosen').visible = false),
              (this.btn_gift.getChildByName('label').color = '#cfcdcc'),
              this.sound_channel &&
                (this.sound_channel.stop(),
                Laya.SoundManager.removeChannel(this.sound_channel),
                (this.sound_channel = null)),
              c.Inst.closechat(false);
          this.scrollview.addItem(this.items.length),
            1 == e || 2 == e
              ? this.content_inshow ||
                ((this.content_inshow = true),
                (this.content.visible = true),
                Laya.Tween.clearAll(this.content),
                t.UIBase.anim_alpha_in(
                  this.content,
                  { y: -50 },
                  150,
                  0,
                  null,
                  Laya.Ease.strongIn
                ))
              : this.content_inshow &&
                ((this.content_inshow = false),
                Laya.Tween.clearAll(this.content),
                t.UIBase.anim_alpha_out(
                  this.content,
                  { y: -50 },
                  150,
                  0,
                  Laya.Handler.create(this, function() {
                    i.content.visible = false;
                  }),
                  Laya.Ease.strongIn
                ));
        }),
        (e.prototype.render_item = function(t) {
          var e = t.index,
            i = t.container;
          2 == this.tab_index
            ? this.render_item_gift(e, i)
            : 1 == this.tab_index && this.render_item_qiyue(e, i);
        }),
        (e.prototype.render_item_qiyue = function(e, i) {
          var n = this.items[e],
            a = cfg.item_definition.item.get(n.id);
          i.getChildByName('name').visible = false;
          var r = i.getChildByName('counts');
          (r.visible = true),
            (r.getChildByName('count_need').text = '/' + n.need.toString());
          var s = r.getChildByName('count_have');
          (s.text = n.count.toString()),
            (s.color = n.count >= n.need ? '#00ff00' : '#ff0000'),
            game.Tools.child_align_center(r);
          var o = i.getChildByName('btn');
          (o.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_ItemDetail.Inst.show(n.id);
            },
            null,
            false
          )),
            (o.getChildByName('choosed').visible = false),
            game.LoadMgr.setImgSkin(o.getChildByName('icon'), a.icon),
            (o.getChildByName('num').visible = false);
        }),
        (e.prototype.render_item_gift = function(e, i) {
          var n = this,
            a = this.items[e].item_id,
            r = cfg.item_definition.item.get(a),
            s = i.getChildByName('name');
          (s.text = r['name_' + GameMgr.client_language]),
            (s.visible = true),
            (i.getChildByName('counts').visible = false);
          var o = i.getChildByName('btn'),
            l = o.getChildByName('choosed');
          (l.visible = this.gift_choose_index == e),
            (o.clickHandler = Laya.Handler.create(
              this,
              function() {
                if (n.gift_choose_index != e) {
                  var i = n.gift_choose_index;
                  (n.gift_choose_index = e),
                    (l.visible = true),
                    i >= 0 &&
                      i < n.items.length &&
                      n.scrollview.wantToRefreshItem(i),
                    n.refresh_gift_bottom_btns();
                } else t.UI_ItemDetail.Inst.show(a);
              },
              null,
              false
            )),
            game.LoadMgr.setImgSkin(o.getChildByName('icon'), r.icon);
          var h = o.getChildByName('num');
          this.items[e].count > 1
            ? ((h.text = this.items[e].count.toString()), (h.visible = true))
            : (h.visible = false);
        }),
        (e.prototype.refresh_gift_bottom_btns = function() {
          var e = t.UI_Sushe.send_gift_limit - t.UI_Sushe.send_gift_count;
          e < 0 && (e = 0),
            (this.container_gift.getChildByName('count').text = e.toString());
          var i = this.container_gift.getChildByName('send');
          game.Tools.setGrayDisable(i, false),
            game.Tools.sprite_align_center(
              [
                this.container_gift.getChildByName('label_send'),
                this.container_gift.getChildByName('count')
              ],
              450,
              [10]
            );
        }),
        (e.prototype._tupo = function() {
          var e = this;
          if (t.UI_PiPeiYuYue.Inst.enable)
            t.UI_Popout.PopOutNoTitle(game.Tools.strOfLocalization(204), null);
          else {
            var i = this.container_qiyue
              .getChildByName('container_tupo_btn')
              .getChildByName('send');
            game.Tools.setGrayDisable(i, true),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'upgradeCharacter',
                { character_id: this.chara_info.charid },
                function(n, a) {
                  n || a.error
                    ? (t.UIMgr.Inst.showNetReqError('upgradeCharacter', n, a),
                      game.Tools.setGrayDisable(i, false))
                    : (c.Inst.close(),
                      Laya.timer.once(150, e, function() {
                        if (
                          ((e.chara_info.is_upgraded = true),
                          t.UI_Character_star_up.Inst.show(
                            e.chara_info,
                            Laya.Handler.create(e, function() {
                              t.UI_Sushe.Inst.starup_back();
                            })
                          ),
                          a.character)
                        ) {
                          var i = a.character;
                          if (i.extra_emoji) {
                            e.chara_info.extra_emoji = [];
                            for (var n = 0; n < i.extra_emoji.length; n++)
                              e.chara_info.extra_emoji.push(i.extra_emoji[n]);
                          }
                        }
                      }));
                }
              );
          }
        }),
        (e.prototype.close_audio = function() {
          this.sound_channel &&
            (this.sound_channel.stop(),
            Laya.SoundManager.removeChannel(this.sound_channel),
            (this.sound_channel = null)),
            c.Inst.closechat(false);
        }),
        (e.prototype._send_gift = function() {
          var e = this;
          if (t.UI_PiPeiYuYue.Inst.enable)
            t.UI_Popout.PopOutNoTitle(game.Tools.strOfLocalization(204), null);
          else if (
            !(
              this.gift_choose_index < 0 ||
              this.gift_choose_index >= this.items.length ||
              Laya.timer.currTimer < this.give_cd
            )
          ) {
            var i = this.chara_info.charid,
              n = this.items[this.gift_choose_index].item_id;
            if (
              99 != cfg.item_definition.item.get(n).type &&
              t.UI_Sushe.send_gift_limit - t.UI_Sushe.send_gift_count <= 0
            )
              t.UI_Popout.PopOutNoTitle(
                game.Tools.strOfLocalization(2213),
                null
              );
            else {
              this.give_cd = Laya.timer.currTimer + 1e4;
              var a = this.container_gift.getChildByName('send');
              game.Tools.setGrayDisable(a, true),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'sendGiftToCharacter',
                  { character_id: i, gifts: [{ item_id: n, count: 1 }] },
                  function(r, s) {
                    if (r || s.error)
                      game.Tools.setGrayDisable(a, false),
                        (e.give_cd = 0),
                        t.UIMgr.Inst.showNetReqError(
                          'sendGiftToCharacter',
                          r,
                          s
                        );
                    else {
                      if (
                        (app.Log.log(
                          'sendGiftToCharacter: ' + JSON.stringify(s)
                        ),
                        e.chara_info.charid == i)
                      ) {
                        if (2 == e.tab_index)
                          for (_ = 0; _ < e.items.length; _++)
                            if (e.items[_].item_id == n) {
                              if (e.items[_].count <= 1) {
                                for (var o = _; o < e.items.length - 1; o++)
                                  e.items[o] = e.items[o + 1];
                                e.items.pop(),
                                  (e.gift_choose_index = -1),
                                  e.scrollview.reset(),
                                  e.scrollview.addItem(e.items.length);
                              } else
                                e.items[_].count--,
                                  e.scrollview.wantToRefreshItem(_);
                              break;
                            }
                        var l =
                          cfg.item_definition.item.get(n).type ==
                          cfg.item_definition.character.get(i).favorite;
                        if (s.level > e.block_exp.current_level) {
                          c.Inst.locking = true;
                          var h =
                            (1 - e.block_exp.current_exp_rate) /
                            e.block_exp.speed;
                          e.block_exp.after_give(s, l),
                            Laya.timer.once(h + 600, e, function() {
                              (e.chara_info.level = s.level),
                                (e.chara_info.exp = s.exp),
                                t.UI_Character_star_up.Inst.show(
                                  e.chara_info,
                                  Laya.Handler.create(e, function() {
                                    t.UI_Sushe.Inst.starup_back();
                                  })
                                ),
                                Laya.timer.once(600, e, function() {
                                  c.Inst.close();
                                }),
                                (e.give_cd = 0);
                            });
                          for (
                            var u = function(i) {
                                var n = 50 * (i + 1);
                                Laya.timer.once(n + h + 600, e, function() {
                                  e.sound_channel &&
                                    (e.sound_channel.volume *= 0.5),
                                    3 == i &&
                                      (t.UI_Sushe.Inst.stopsay(),
                                      c.Inst.closechat(true));
                                });
                              },
                              _ = 0;
                            _ < 4;
                            _++
                          )
                            u(_);
                        } else {
                          if (
                            (e.block_exp.after_give(s, l),
                            (e.give_cd = 0),
                            game.Tools.setGrayDisable(a, false),
                            !e.sound_channel)
                          ) {
                            var d = '';
                            d =
                              cfg.item_definition.character.get(i).favorite ==
                              cfg.item_definition.item.get(n).type
                                ? 'lobby_gift_favor'
                                : 'lobby_gift';
                            var f = view.AudioMgr.PlayCharactorSound(
                              e.chara_info,
                              d,
                              Laya.Handler.create(e, function() {
                                (e.sound_channel = null), c.Inst.closechat(false);
                              })
                            );
                            c.Inst.chat(f.words),
                              (e.sound_channel = f.sound),
                              t.UI_Sushe.Inst.stopsay();
                          }
                          e.chara_info.exp = s.exp;
                        }
                      } else {
                        for (_ = 0; _ < t.UI_Sushe.characters.length; _++)
                          if (t.UI_Sushe.characters[_].charid == i) {
                            (t.UI_Sushe.characters[_].level = s.level),
                              (t.UI_Sushe.characters[_].exp = s.exp);
                            break;
                          }
                        e.give_cd = 0;
                      }
                      99 != cfg.item_definition.item.get(n).type &&
                        t.UI_Sushe.send_gift_count++,
                        e.refresh_gift_bottom_btns();
                    }
                  }
                );
            }
          }
        }),
        e
      );
    })(),
    n = (function() {
      function n(n) {
        var a = this;
        (this.head = null),
          (this.emos = []),
          (this._scrollbar = null),
          (this._scrollpoint = null),
          (this._drag_scroll = false),
          (this.me = n),
          (this.me.visible = false),
          (this.block_exp = new e(n.getChildByName('container_heart'))),
          (this.block_gift = new i(
            n.getChildByName('container_gift'),
            n.getChildByName('tabs'),
            this.block_exp
          )),
          (this.container_intro = n.getChildByName('intro')),
          (this.content = this.container_intro.getChildByName('content')),
          (this.content.vScrollBarSkin = ''),
          (this.head = new t.UI_Character_Skin(
            this.container_intro
              .getChildByName('content')
              .getChildByName('container_head')
              .getChildByName('head')
          ));
        var r = this.content
          .getChildByName('container_emj')
          .getChildByName('container')
          .getChildByName('emo_templete');
        r.visible = false;
        for (var s = 0; s < 20; s++)
          this.emos.push(
            new t.UI_Character_Emo(r.scriptMap['capsui.UICopy'].getNodeClone())
          ),
            (this.emos[s].me.x = (s % 4) * 184),
            (this.emos[s].me.y = 184 * Math.floor(s / 4));
        (this.content.getChildByName('container_emj').height = 652),
          (this.content
            .getChildByName('container_head')
            .getChildByName('btn_skin').clickHandler = Laya.Handler.create(
            this,
            function() {
              c.Inst.open_skin(new Laya.Handler(a, a.change_skin));
            },
            null,
            false
          )),
          (this._scrollbar = this.container_intro.getChildByName('scrollbar')),
          (this._scrollpoint = this._scrollbar.getChildByName('scrollpoint')),
          this._scrollbar &&
            (this._scrollbar.on('mousedown', this, function() {
              a._drag_scroll = true;
              var t = a._scrollbar.mouseY / a._scrollbar.height;
              a.content.vScrollBar.value = a.content.vScrollBar.max * t;
            }),
            this._scrollbar.on('mousemove', this, function() {
              if (a._drag_scroll) {
                var t = a._scrollbar.mouseY / a._scrollbar.height;
                a.content.vScrollBar.value = a.content.vScrollBar.max * t;
              }
            }),
            this._scrollbar.on('mouseup', this, function() {
              a._drag_scroll = false;
            }),
            this._scrollbar.on('mouseout', this, function() {
              a._drag_scroll = false;
            }),
            this.content.vScrollBar.on('change', this, function() {
              var t = a.content.vScrollBar.value / a.content.vScrollBar.max;
              a._scrollpoint.y = a._scrollbar.height * t;
            }));
      }
      return (
        (n.prototype.show = function(t) {
          var e = this.content.getChildByName('container_text'),
            i = cfg.item_definition.character.get(t.charid);
          if (
            ((e.getChildByName('height').text =
              i['desc_stature_' + GameMgr.client_language]),
            (e.getChildByName('birth').text =
              i['desc_birth_' + GameMgr.client_language]),
            (e.getChildByName('age').text =
              i['desc_age_' + GameMgr.client_language]),
            (e.getChildByName('bloodtype').text = i.desc_bloodtype),
            (e.getChildByName('cv').text =
              i['desc_cv_' + GameMgr.client_language]),
            (e.getChildByName('hobby').text =
              i['desc_hobby_' + GameMgr.client_language]),
            (e.getChildByName('desc').text =
              i['desc_' + GameMgr.client_language]),
            'en' == GameMgr.client_language)
          ) {
            var n = [
              new Laya.ColorFilter([
                0.7,
                0,
                0,
                0,
                0,
                0,
                0.7,
                0,
                0,
                0,
                0,
                0,
                0.7,
                0,
                0,
                0,
                0,
                0,
                1,
                0
              ])
            ];
            (e.getChildByName('height').font = 'en_shuhun'),
              (e.getChildByName('height').filters = n),
              (e.getChildByName('birth').font = 'en_shuhun'),
              (e.getChildByName('birth').filters = n),
              (e.getChildByName('age').font = 'en_shuhun'),
              (e.getChildByName('age').filters = n),
              (e.getChildByName('bloodtype').font = 'en_shuhun'),
              (e.getChildByName('bloodtype').filters = n),
              (e.getChildByName('cv').font = 'en_shuhun'),
              (e.getChildByName('cv').filters = n),
              (e.getChildByName('hobby').font = 'en_shuhun'),
              (e.getChildByName('hobby').filters = n),
              (e.getChildByName('desc').font = 'en_shuhun'),
              (e.getChildByName('desc').filters = n);
          }
          for (o = 0; o < 12; o += 2) {
            var a = e.getChildAt(o);
            e.getChildAt(o + 1).x = a.textField.textWidth * a.scaleX + a.x + 10;
          }
          this.head.setSkin(t.skin, 'bighead');
          this.content.getChildByName('container_emj').y =
            e.getChildByName('desc').textField.textHeight *
              e.getChildByName('desc').scaleY +
            561 -
            194;
          for (var r = [], s = {}, o = 0; o < 9; o++)
            r.push({
              sub_id: o,
              unlock_desc: '',
              time_limit: false,
              after_unlock_desc: ''
            }),
              (s[o] = 1);
          if (t.extra_emoji && t.extra_emoji.length > 0)
            for (o = 0; o < t.extra_emoji.length; o++) s[t.extra_emoji[o]] = 1;
          var l = cfg.character.emoji.getGroup(t.charid);
          if (l)
            for (o = 0; o < l.length; o++) {
              var h = l[o];
              1 == h.unlock_type
                ? r.push({
                    sub_id: h.sub_id,
                    unlock_desc: h['unlock_desc_' + GameMgr.client_language],
                    time_limit: false,
                    after_unlock_desc: ''
                  })
                : 2 == h.unlock_type &&
                  s[h.sub_id] &&
                  r.push({
                    sub_id: h.sub_id,
                    unlock_desc: h['unlock_desc_' + GameMgr.client_language],
                    time_limit: true,
                    after_unlock_desc: h.after_unlock_desc
                  });
            }
          this.content.getChildByName('container_emj').height =
            100 + 184 * Math.ceil(r.length / 4);
          for (o = 0; o < this.emos.length; o++)
            if (o >= r.length) this.emos[o].me.visible = false;
            else {
              var c = r[o],
                u = c.sub_id;
              (this.emos[o].me.visible = true),
                this.emos[o].setSkin(t.charid, u),
                s.hasOwnProperty(u.toString())
                  ? ((this.emos[o].me.getChildByName('lock').visible = false),
                    (this.emos[o].me.getChildByName('time_limit').visible =
                      c.time_limit),
                    c.after_unlock_desc
                      ? ((this.emos[o].me.getChildByName('info').visible = true),
                        (this.emos[o].me
                          .getChildByName('info')
                          .getChildByName('info').text = c.after_unlock_desc))
                      : (this.emos[o].me.getChildByName('info').visible = false))
                  : ((this.emos[o].me.getChildByName('lock').visible = true),
                    (this.emos[o].me.getChildByName('info').visible = true),
                    (this.emos[o].me
                      .getChildByName('info')
                      .getChildByName('info').text = c.unlock_desc),
                    (this.emos[o].me.getChildByName('time_limit').visible =
                      c.time_limit));
            }
          this.content.refresh(),
            (this._drag_scroll = false),
            this.block_exp.show(t),
            this.block_gift.show(t),
            (this.me.visible = true);
        }),
        (n.prototype.change_skin = function(e) {
          t.UI_Sushe.Inst.onChangeSkin(e), this.head.setSkin(e, 'bighead');
        }),
        (n.prototype.close = function() {
          this.me.visible = false;
          for (var t = 0; t < this.emos.length; t++) this.emos[t].clear();
        }),
        n
      );
    })(),
    a = (function() {
      function t(t) {
        var e = this;
        (this.solts = [1, 2, 3, 4, 5]),
          (this.slot_bg = [
            'myres/sushe/slot_liqibang.jpg',
            'myres/sushe/slot_hule.jpg',
            'myres/sushe/slot_liqi.jpg',
            'myres/sushe/slot_hand.jpg',
            'myres/sushe/slot_bgm.jpg'
          ]),
          (this.solt_btns = []),
          (this.chara_info = null),
          (this.me = t),
          (this.me.visible = false);
        for (
          var i = function(t) {
              var i = n.me.getChildByName('slot' + t);
              n.solt_btns.push(i),
                (i.clickHandler = Laya.Handler.create(
                  n,
                  function() {
                    t < 4
                      ? c.Inst.pop_effect_choose(
                          1 + t,
                          Laya.Handler.create(e, function(i) {
                            e.on_change_view(1 + t, i);
                          })
                        )
                      : c.Inst.show_pop_bgm(
                          Laya.Handler.create(e, function(t) {
                            e.on_change_view(5, t);
                          })
                        );
                  },
                  null,
                  false
                ));
            },
            n = this,
            a = 0;
          a < 5;
          a++
        )
          i(a);
      }
      return (
        (t.prototype.render_item = function(t) {
          var e = this.solts[t],
            i = -1;
          if (this.chara_info.views)
            for (var n = 0; n < this.chara_info.views.length; n++)
              if (this.chara_info.views[n].slot == e) {
                i = this.chara_info.views[n].item_id;
                break;
              }
          var a = this.solt_btns[t];
          -1 == i || 0 == i
            ? ((a.getChildByName('icon').skin = game.Tools.localUISrc(
                this.slot_bg[t]
              )),
              (a.getChildByName('desc').text = game.Tools.strOfLocalization(
                411 + t
              )))
            : (game.LoadMgr.setImgSkin(
                a.getChildByName('icon'),
                cfg.item_definition.item.get(i).icon
              ),
              (a.getChildByName('desc').text = cfg.item_definition.item.get(i)[
                'name_' + GameMgr.client_language
              ]));
        }),
        (t.prototype.on_change_view = function(t, e) {
          var i = false;
          if (this.chara_info.views)
            for (n = 0; n < this.chara_info.views.length; n++)
              if (this.chara_info.views[n].slot == t) {
                (i = true),
                  this.chara_info.views[n].item_id == e
                    ? ((this.chara_info.views[n].item_id = 0), (e = 0))
                    : (this.chara_info.views[n].item_id = e);
                break;
              }
          i ||
            (this.chara_info.views || (this.chara_info.views = []),
            this.chara_info.views.push({ slot: t, item_id: e })),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'changeCharacterView',
              { character_id: this.chara_info.charid, slot: t, item_id: e },
              function(t, e) {}
            );
          for (var n = 0; n < this.solts.length; n++) this.render_item(n);
        }),
        (t.prototype.show = function(t) {
          this.chara_info = t;
          for (var e = 0; e < 5; e++) this.render_item(e);
          this.me.visible = true;
        }),
        (t.prototype.close = function() {
          this.me.visible = false;
        }),
        t
      );
    })(),
    r = (function() {
      function e(t) {
        (this.sounds = []),
          (this.chara_info = null),
          (this.current_play_index = -1),
          (this.current_soundchannel = null),
          (this.volume_fixed = 0),
          (this.me = t),
          (this.me.visible = false),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, false)
          );
      }
      return (
        (e.prototype.show = function(e) {
          (this.chara_info = e), (this.sounds = []);
          for (
            var i = cfg.voice.sound.getGroup(
                cfg.item_definition.character.get(e.charid).sound
              ),
              n = 0;
            n < i.length;
            n++
          )
            this.sounds.push(i[n]);
          (this.volume_fixed = cfg.item_definition.character.get(
            e.charid
          ).sound_volume),
            this.scrollview.reset(),
            this.scrollview.addItem(this.sounds.length),
            (this.me.visible = true),
            view.AudioMgr.refresh_music_volume(true),
            (this.current_play_index = -1),
            t.UI_Sushe.Inst.stopsay();
        }),
        (e.prototype.close = function() {
          this.me.visible &&
            ((this.me.visible = false),
            view.AudioMgr.refresh_music_volume(false),
            this.current_soundchannel &&
              (this.current_soundchannel.stop(),
              Laya.SoundManager.removeChannel(this.current_soundchannel),
              (this.current_soundchannel = null),
              (this.current_play_index = -1),
              c.Inst.closechat(false)));
        }),
        (e.prototype.render_item = function(t) {
          var e = this,
            i = t.index,
            n = t.container,
            a = this.sounds[i];
          n.getChildByName('desc').text = a['name_' + GameMgr.client_language];
          var r = n.getChildByName('btn_play'),
            s = r.getChildByName('img');
          (s.skin = game.Tools.localUISrc(
            this.current_play_index == i
              ? 'myres/bothui/bf_pause.png'
              : 'myres/bothui/bf_play.png'
          )),
            (r.clickHandler = Laya.Handler.create(
              this,
              function() {
                if (e.current_play_index == i)
                  e.current_soundchannel &&
                    (e.current_soundchannel.stop(),
                    Laya.SoundManager.removeChannel(e.current_soundchannel),
                    (e.current_soundchannel = null)),
                    c.Inst.closechat(false),
                    (s.skin = game.Tools.localUISrc(
                      'myres/bothui/bf_play.png'
                    )),
                    (e.current_play_index = -1);
                else {
                  var t = e.current_play_index;
                  (e.current_play_index = i),
                    t >= 0 &&
                      t < e.sounds.length &&
                      e.scrollview.wantToRefreshItem(t),
                    e.current_soundchannel &&
                      (Laya.SoundManager.removeChannel(e.current_soundchannel),
                      e.current_soundchannel.stop(),
                      (e.current_soundchannel = null)),
                    (s.skin = game.Tools.localUISrc(
                      'myres/bothui/bf_pause.png'
                    ));
                  var n = Laya.timer.currTimer,
                    r = Laya.SoundManager.playSound(
                      a.path + view.AudioMgr.suffix,
                      1,
                      new Laya.Handler(e, function() {
                        var t = n + 2e3 - Laya.timer.currTimer;
                        t < 0 && (t = 0),
                          Laya.timer.once(t, e, function() {
                            if (e.current_soundchannel == r) {
                              e.current_soundchannel = null;
                              var t = e.current_play_index;
                              (e.current_play_index = -1),
                                t >= 0 &&
                                  t < e.sounds.length &&
                                  e.scrollview.wantToRefreshItem(t),
                                c.Inst.closechat(false);
                            }
                          });
                      })
                    );
                  (e.current_soundchannel = r),
                    view.AudioMgr.getCVmute(e.chara_info.charid)
                      ? (e.current_soundchannel.volume = 0)
                      : (e.current_soundchannel.volume =
                          e.volume_fixed *
                          view.AudioMgr.getCVvolume(e.chara_info.charid)),
                    view.AudioMgr.yuyinMuted
                      ? (e.current_soundchannel.volume = 0)
                      : (e.current_soundchannel.volume *=
                          view.AudioMgr.yuyinVolume),
                    c.Inst.chat(a['words_' + GameMgr.client_language]);
                }
              },
              null,
              false
            ));
          var o = n.getChildByName('lock');
          this.chara_info.level >= a.level_limit
            ? ((o.visible = false), (r.visible = true))
            : ((o.visible = true),
              (r.visible = false),
              (o.getChildByName('info').text = game.Tools.strOfLocalization(
                2192,
                [a.level_limit.toString()]
              )));
        }),
        e
      );
    })(),
    s = (function() {
      function e(t) {
        var e = this;
        (this.items = []),
          (this.current_using_item_id = -1),
          (this.me = t),
          (this.root = t.getChildByName('root')),
          (this.title = this.root.getChildByName('title')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            false
          )),
          (this.scrollview = this.root.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, false),
            -1,
            3
          );
      }
      return (
        (e.prototype.show = function(e, i, n) {
          (this.me.visible = true),
            (this.root.scaleX = this.root.scaleY = 1),
            t.UIBase.anim_pop_out(this.root, null),
            (this.chara_info = e),
            (this.slot_id = i),
            (this.when_change = n),
            (this.items = []);
          for (
            var a = t.UI_Bag.find_items_by_category(
                t.EItemCategory.character_view
              ),
              r = 0;
            r < a.length;
            r++
          ) {
            cfg.item_definition.item.get(a[r].item_id).type == i &&
              this.items.push(a[r].item_id);
          }
          if (((this.current_using_item_id = -1), e.views))
            for (r = 0; r < e.views.length; r++)
              if (e.views[r].slot == this.slot_id) {
                this.current_using_item_id = e.views[r].item_id;
                break;
              }
          switch (((this.title.text = ''), i)) {
            case 1:
              this.title.text = game.Tools.strOfLocalization(2193);
              break;
            case 2:
              this.title.text = game.Tools.strOfLocalization(2194);
              break;
            case 3:
              this.title.text = game.Tools.strOfLocalization(2195);
              break;
            case 4:
              this.title.text = game.Tools.strOfLocalization(2214);
          }
          (this.root.getChildByName('no_info').visible =
            0 == this.items.length),
            this.scrollview.reset(),
            this.scrollview.addItem(this.items.length);
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.when_change = null),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                e.me.visible = false;
              })
            );
        }),
        (e.prototype.render_item = function(e) {
          var i = this,
            n = e.index,
            a = e.container,
            r = e.cache_data,
            s = a.getChildByName('btn');
          (s.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.when_change && i.when_change.runWith(i.items[n]), i.close();
            },
            null,
            false
          )),
            r.icon || (r.icon = new t.UI_Item_Skin(s.getChildByName('icon'))),
            r.icon.setSkin(cfg.item_definition.item.get(this.items[n]).icon);
          a.getChildByName('using').visible =
            this.current_using_item_id == this.items[n];
        }),
        e
      );
    })(),
    o = (function() {
      function e(t) {
        var e = this;
        (this.items = []),
          (this.current_using_item_id = -1),
          (this.current_listening = -1),
          (this.me = t),
          (this.root = t.getChildByName('root')),
          (this.title = this.root.getChildByName('title')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            false
          )),
          (this.scrollview = this.root.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, false),
            -1,
            3
          );
      }
      return (
        (e.prototype.show = function(e, i) {
          (this.me.visible = true),
            (this.root.scaleX = this.root.scaleY = 1),
            t.UIBase.anim_pop_out(this.root, null),
            (this.chara_info = e),
            (this.when_change = i),
            (this.items = []);
          for (
            var n = t.UI_Bag.find_items_by_category(
                t.EItemCategory.character_view
              ),
              a = 0;
            a < n.length;
            a++
          ) {
            cfg.item_definition.item.get(n[a].item_id).type ==
              game.EPlayerView.liqi_bgm && this.items.push(n[a].item_id);
          }
          if (((this.current_using_item_id = -1), e.views))
            for (a = 0; a < e.views.length; a++)
              if (e.views[a].slot == game.EPlayerView.liqi_bgm) {
                this.current_using_item_id = e.views[a].item_id;
                break;
              }
          (this.current_listening = -1),
            (this.root.getChildByName('no_info').visible =
              0 == this.items.length),
            this.scrollview.reset(),
            this.scrollview.addItem(this.items.length);
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.when_change = null),
            this.current_listening >= 0 &&
              (view.BgmListMgr.stopBgm(0), view.BgmListMgr.PlayLobbyBgm()),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                e.me.visible = false;
              })
            );
        }),
        (e.prototype.render_item = function(t) {
          var e = this,
            i = t.index,
            n = t.container,
            a = n.getChildByName('btn');
          a.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.when_change && e.when_change.runWith(e.items[i]), e.close();
            },
            null,
            false
          );
          var r = a.getChildByName('icon'),
            s = cfg.item_definition.item.get(this.items[i]);
          game.LoadMgr.setImgSkin(r, s.icon);
          a.getChildByName('using').visible =
            this.current_using_item_id == this.items[i];
          var o = a.getChildByName('img_play');
          i == this.current_listening
            ? (o.skin = game.Tools.localUISrc('myres/bothui/bf_pause.png'))
            : (o.skin = game.Tools.localUISrc('myres/bothui/bf_play.png'));
          (n.getChildByName('btn_play').clickHandler = Laya.Handler.create(
            this,
            function() {
              i == e.current_listening
                ? ((e.current_listening = -1),
                  view.BgmListMgr.stopBgm(0),
                  view.BgmListMgr.PlayLobbyBgm())
                : ((e.current_listening = i),
                  view.AudioMgr.PlayLiqiBgm(s.sargs[0])),
                e.scrollview.wantToRefreshAll();
            },
            null,
            false
          )),
            (a.getChildByName('label_name').text =
              s['name_' + GameMgr.client_language]);
        }),
        e
      );
    })(),
    l = (function() {
      function e(t) {
        var e = this;
        (this.skins = []),
          (this.me = t),
          (this.root = t.getChildByName('root')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            false
          )),
          (this.scrollview = this.root.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, false),
            -1,
            3
          );
      }
      return (
        (e.prototype.show = function(e, i) {
          var n = this;
          (this.me.visible = true),
            t.UIBase.anim_pop_out(this.root, null),
            (this.chara_info = e),
            (this.when_change = i),
            (this.skins = []);
          var a = cfg.item_definition.character.get(e.charid);
          if (
            (this.skins.push(a.init_skin),
            a.can_marry && this.skins.push(a.full_fetter_skin),
            a.skin_lib)
          )
            for (var r = 0; r < a.skin_lib.length; r++)
              a.skin_lib[r] && this.skins.push(a.skin_lib[r]);
          cfg.item_definition.skin.forEach(function(t) {
            0 != t.type &&
              1 != t.type &&
              t.character_id == e.charid &&
              n.skins.push(t.id);
          }),
            this.scrollview.reset(),
            this.scrollview.addItem(this.skins.length);
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.when_change = null),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                e.me.visible = false;
              })
            );
        }),
        (e.prototype.render_item = function(e) {
          var i = this,
            n = e.index,
            a = e.container,
            r = e.cache_data,
            s = a.getChildByName('btn');
          r.skin ||
            (r.skin = new t.UI_Character_Skin(s.getChildByName('icon')));
          a.getChildByName('using').visible =
            this.skins[n] == this.chara_info.skin;
          var o = cfg.item_definition.skin.get(this.skins[n]);
          r.skin.setSkin(this.skins[n], 'bighead');
          var l = s.getChildByName('locked');
          t.UI_Sushe.skin_owned(this.skins[n])
            ? ((l.visible = false),
              (s.clickHandler = Laya.Handler.create(
                this,
                function() {
                  i.skins[n] != i.chara_info.skin &&
                    i.when_change &&
                    i.when_change.runWith(i.skins[n]),
                    i.close();
                },
                null,
                false
              )))
            : ((l.visible = true),
              (l.getChildByName('info').text =
                o['lock_tips_' + GameMgr.client_language]),
              (s.clickHandler = null));
        }),
        e
      );
    })(),
    h = (function() {
      function t(t) {
        var e = this;
        (this.locking = false),
          (this.me = t),
          (this.info = this.me.getChildByName('info')),
          this.me.on('mousedown', this, function() {
            e.locking || e.close();
          });
      }
      return (
        (t.prototype.show = function(t) {
          var e = this;
          (this.info.text = t),
            (this.me.height = 120 + this.info.textField.textHeight),
            (this.me.visible = true),
            (this.locking = true),
            (this.me.scaleY = 0),
            Laya.timer.clearAll(this),
            Laya.Tween.to(
              this.me,
              { scaleY: 1 },
              150,
              null,
              Laya.Handler.create(this, function() {
                e.locking = false;
              })
            ),
            Laya.timer.once(3e3, this, function() {
              e.close();
            });
        }),
        (t.prototype.close = function() {
          var t = this;
          (this.locking = true),
            Laya.timer.clearAll(this),
            Laya.Tween.to(
              this.me,
              { scaleY: 0 },
              150,
              null,
              Laya.Handler.create(this, function() {
                (t.locking = false), (t.me.visible = false);
              })
            );
        }),
        t
      );
    })(),
    c = (function(e) {
      function i() {
        var t = e.call(this, new ui.lobby.visitUI()) || this;
        return (
          (t.tabs = []),
          (t.page_intro = null),
          (t.page_effect = null),
          (t.page_sound = null),
          (t.block_chat = null),
          (t.pop_effect = null),
          (t.pop_bgm = null),
          (t.pop_skin = null),
          (t.locking = false),
          (t.current_page = -1),
          (t.chara_info = null),
          (t.tab_img_dark = ''),
          (t.tab_img_chosen = ''),
          (i.Inst = t),
          t
        );
      }
      return (
        __extends(i, e),
        Object.defineProperty(i.prototype, 'cannot_click_say', {
          get: function() {
            return (
              1 == this.current_page ||
              null != this.page_intro.block_gift.sound_channel
            );
          },
          enumerable: true,
          configurable: true
        }),
        (i.prototype.onCreate = function() {
          var e = this;
          (this.container_top = this.me.getChildByName('top')),
            (this.container_top.getChildByName(
              'btn_back'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                e.locking || e.back2select();
              },
              null,
              false
            )),
            'chs' == GameMgr.client_language
              ? ((this.tab_img_chosen = game.Tools.localUISrc(
                  'myres/sushe/bf_chosen.png'
                )),
                (this.tab_img_dark = game.Tools.localUISrc(
                  'myres/sushe/bf_unchooesd.png'
                )))
              : ((this.tab_img_chosen = game.Tools.localUISrc(
                  'myres/sushe/bf_chosen_en.png'
                )),
                (this.tab_img_dark = game.Tools.localUISrc(
                  'myres/sushe/bf_unchooesd_en.png'
                ))),
            (this.container_right = this.me.getChildByName('right'));
          for (
            var i = function(t) {
                'chs' == GameMgr.client_language
                  ? (c.tabs.push(
                      c.container_right.getChildByName('btn_page' + t)
                    ),
                    (c.container_right.getChildByName(
                      'btn_page' + t + '_en'
                    ).visible = false))
                  : ((c.container_right.getChildByName(
                      'btn_page' + t
                    ).visible = false),
                    c.tabs.push(
                      c.container_right.getChildByName('btn_page' + t + '_en')
                    )),
                  (c.tabs[t].clickHandler = Laya.Handler.create(
                    c,
                    function() {
                      e.locking || (e.current_page != t && e.change_page(t));
                    },
                    null,
                    false
                  ));
              },
              c = this,
              u = 0;
            u < 3;
            u++
          )
            i(u);
          (this.page_intro = new n(
            this.container_right.getChildByName('page_intro')
          )),
            (this.page_effect = new a(
              this.container_right.getChildByName('effect')
            )),
            (this.page_sound = new r(
              this.container_right.getChildByName('sound')
            )),
            (this.block_chat = new t.UI_Character_Chat(
              this.me.getChildByName('chat')
            )),
            (this.block_chat.me.visible = false),
            (this.pop_effect = new s(this.me.getChildByName('pop_effect'))),
            (this.pop_bgm = new o(this.me.getChildByName('pop_bgm'))),
            (this.pop_skin = new l(this.me.getChildByName('pop_skin'))),
            (this.info_levelup = new h(this.me.getChildByName('levelup')));
        }),
        (i.prototype.show = function(e, i) {
          var n = this;
          this.chara_info = e;
          for (var a = 0; a < this.tabs.length; a++)
            this.tabs[a].skin = this.tab_img_dark;
          this.page_intro.close(),
            this.page_effect.close(),
            this.page_sound.close(),
            (this.current_page = -1),
            this.change_page(0),
            (this.block_chat.me.visible = false),
            (this.pop_effect.me.visible = false),
            (this.pop_bgm.me.visible = false),
            (this.pop_skin.me.visible = false),
            (this.info_levelup.me.visible = false),
            (this.me.visible = true),
            (this.locking = true),
            t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
            t.UIBase.anim_alpha_in(this.container_right, { x: 30 }, 150),
            t.UIBase.anim_alpha_in(this.block_chat.me, { y: 30 }, 150),
            Laya.timer.once(150, this, function() {
              n.locking = false;
            }),
            i &&
              Laya.timer.once(150, this, function() {
                n.chara_info.is_upgraded
                  ? n.info_levelup.show(game.Tools.strOfLocalization(2196))
                  : n.info_levelup.show(
                      cfg.level_definition.character.get(n.chara_info.level)[
                        'unlock_desc_' + GameMgr.client_language
                      ]
                    );
              });
        }),
        (i.prototype.close = function() {
          var e = this;
          (this.locking = true),
            t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
            t.UIBase.anim_alpha_out(this.container_right, { x: 30 }, 150),
            t.UIBase.anim_alpha_out(this.block_chat.me, { y: 30 }, 150),
            Laya.timer.once(150, this, function() {
              (e.locking = false),
                (e.me.visible = false),
                e.page_sound.me.visible && e.page_sound.close(),
                e.pop_bgm.me.visible && e.pop_bgm.close(),
                e.page_intro.block_gift.close_audio();
            });
        }),
        (i.prototype.back2select = function() {
          this.close(),
            Laya.timer.once(150, this, function() {
              t.UI_Sushe.Inst.show_page_select();
            });
        }),
        (i.prototype.change_page = function(t) {
          if (this.current_page >= 0)
            switch (
              ((this.tabs[this.current_page].skin = this.tab_img_dark),
              this.current_page)
            ) {
              case 0:
                this.page_intro.close();
                break;
              case 1:
                this.page_sound.close();
                break;
              case 2:
                this.page_effect.close();
            }
          if (((this.current_page = t), this.current_page >= 0))
            switch (
              ((this.tabs[this.current_page].skin = this.tab_img_chosen),
              this.current_page)
            ) {
              case 0:
                this.page_intro.show(this.chara_info);
                break;
              case 1:
                this.page_sound.show(this.chara_info);
                break;
              case 2:
                this.page_effect.show(this.chara_info);
            }
        }),
        (i.prototype.open_skin = function(t) {
          this.pop_skin.show(this.chara_info, t);
        }),
        (i.prototype.pop_effect_choose = function(t, e) {
          this.pop_effect.show(this.chara_info, t, e);
        }),
        (i.prototype.show_pop_bgm = function(t) {
          this.pop_bgm.show(this.chara_info, t);
        }),
        (i.prototype.chat = function(t) {
          this.block_chat.show(t);
        }),
        (i.prototype.closechat = function(t) {
          this.block_chat.close(t);
        }),
        i
      );
    })(t.UIBase);
  t.UI_Sushe_Visit = c;
})(uiscript || (uiscript = {}));