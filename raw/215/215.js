var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function() {
      function e(e, i) {
        var n = this;
        (this.me = e),
          (this.effect_root = i),
          (this.btn_next = e.getChildByName('btn_next')),
          (this.btn_next.clickHandler = Laya.Handler.create(
            this,
            this.close,
            [!1],
            !1
          )),
          (this.bg_sakura = e.getChildByName('bg_sakura')),
          (this.container_item = e.getChildByName('item'));
        var a = this.container_item.getChildByName('btn');
        (a.clickHandler = Laya.Handler.create(
          this,
          function() {
            t.UI_ItemDetail.Inst.show(n.item_id);
          },
          null,
          !1
        )),
          (this.icon = new t.UI_Item_Skin(a.getChildByName('icon_origin'))),
          (this.label_count = this.icon.me.getChildByName('count')),
          (this.label_name = this.container_item.getChildByName('name_origin'));
      }
      return (
        (e.prototype.show = function(e, i) {
          var n = this;
          this.item_id = e;
          var r = cfg.item_definition.item.get(e);
          this.icon.setSkin(r.icon),
            r.category == t.EItemCategory.common_view ||
            r.category == t.EItemCategory.character_view
              ? ((this.bg_sakura.visible = !0),
                Laya.timer.once(250, this, function() {
                  var t = game.FrontEffect.Inst.create_ui_effect(
                    n.effect_root,
                    'scene/effect_get_zhuangban.lh',
                    new Laya.Point(0, 0),
                    1
                  );
                  Laya.timer.once(2e3, null, function() {
                    t.destory();
                  }),
                    view.AudioMgr.PlayAudio(110);
                }))
              : ((this.bg_sakura.visible = !1),
                Laya.timer.once(250, this, function() {
                  view.AudioMgr.PlayAudio(109);
                })),
            i > 1
              ? ((this.label_count.visible = !0),
                (this.label_count.text = i.toString()))
              : (this.label_count.visible = !1),
            (this.label_name.text = r['name_' + GameMgr.client_language]),
            (this.me.visible = !0),
            (this.me.alpha = 1),
            (this.me.y = 574),
            a.Inst.me.WPin.play(0, !1),
            (this.btn_next.visible = !1),
            Laya.timer.once((10 / 24) * 1e3 + 200, this, function() {
              (n.btn_next.visible = !0),
                (a.Inst.btn_pass.visible = !0),
                (a.Inst.btn_pass.clickHandler = Laya.Handler.create(
                  n,
                  function() {
                    (a.Inst.btn_pass.visible = !1), n.close(!0);
                  },
                  null,
                  !1
                ));
            });
        }),
        (e.prototype.close = function(t) {
          var e = this;
          (a.Inst.btn_pass.visible = !1),
            (this.btn_next.visible = !1),
            a.Inst.me.WPout.play(0, !1),
            Laya.timer.once((5 / 24) * 1e3 + 500, this, function() {
              (e.me.visible = !1),
                t ? a.Inst.show_result() : a.Inst.show_next();
            });
        }),
        e
      );
    })(),
    i = (function() {
      function e(e, i) {
        (this.me = e),
          (this.effect_root = i),
          (this.btn_next = this.me.getChildByName('btn_next')),
          (this.btn_next.clickHandler = Laya.Handler.create(
            this,
            this.close,
            [!1],
            !1
          ));
        var n = e.getChildByName('jianying');
        (this.jianying_girl = n.getChildByName('jianying_girl')),
          (this.jianying_boy = n.getChildByName('jianying_boy'));
        var a = e.getChildByName('container_illust');
        this.illust = new t.UI_Character_Skin(a.getChildByName('illust'));
        var r = null;
        'chs' == GameMgr.client_language
          ? ((r = a.getChildByName('container_name_chs')),
            (a.getChildByName('container_name_en').visible = !1))
          : ((r = a.getChildByName('container_name_en')),
            (a.getChildByName('container_name_chs').visible = !1)),
          (this.label_name = r.getChildByName('label_name')),
          (this.label_cv = r.getChildByName('label_cv')),
          (this.chat = new t.UI_Character_Chat(a.getChildByName('chat')));
      }
      return (
        (e.prototype.close_sound = function() {
          this.sound_channel &&
            (this.sound_channel.stop(),
            Laya.SoundManager.removeChannel(this.sound_channel),
            (this.sound_channel = null));
        }),
        (e.prototype.show = function(t) {
          var e = this;
          this.character_id = t;
          var i = cfg.item_definition.character.get(t);
          this.illust.setSkin(i.init_skin, 'full'),
            (this.label_name.text = i['name_' + GameMgr.client_language]),
            (this.label_cv.text =
              'cv:' + i['desc_cv_' + GameMgr.client_language]),
            this.chat.close(!0),
            (this.jianying_boy.visible = 2 == i.sex),
            (this.jianying_girl.visible = 1 == i.sex),
            this.close_sound(),
            (this.btn_next.visible = !1),
            (this.illust.me.parent.alpha = 1),
            (this.illust.me.parent.y = -8),
            (this.me.visible = !0),
            a.Inst.me.JSin.play(0, !1),
            Laya.timer.once((100 / 24) * 1e3, this, function() {
              (e.effect = game.FrontEffect.Inst.create_ui_effect(
                e.effect_root,
                'scene/effect_get_character.lh',
                new Laya.Point(0, 0),
                1
              )),
                view.AudioMgr.PlayAudio(107);
            }),
            Laya.timer.once(6450, this, function() {
              var t = '',
                n = '',
                r = 0;
              if (
                (cfg.voice.sound.getGroup(i.sound).forEach(function(e) {
                  'lobby_selfintro' == e.type &&
                    ((t = e.path),
                    (n = e['words_' + GameMgr.client_language]),
                    (r = e.time_length));
                }),
                '' != t)
              ) {
                var s = i.sound_volume;
                view.AudioMgr.yuyinMuted
                  ? (s = 0)
                  : (s *= view.AudioMgr.yuyinVolume),
                  view.AudioMgr.getCVmute(i.id)
                    ? (s = 0)
                    : (s *= view.AudioMgr.getCVvolume(i.id)),
                  (e.sound_channel = view.AudioMgr.PlaySound(
                    t,
                    s,
                    Laya.Handler.create(e, function() {
                      e.sound_channel = null;
                    })
                  ));
              }
              '' != n && e.chat.show(n),
                (e.btn_next.visible = !0),
                (a.Inst.btn_pass.visible = !0),
                (a.Inst.btn_pass.clickHandler = Laya.Handler.create(
                  e,
                  function() {
                    (a.Inst.btn_pass.visible = !1), e.close(!0);
                  },
                  null,
                  !1
                ));
            });
        }),
        (e.prototype.close = function(t) {
          var e = this;
          (a.Inst.btn_pass.visible = !1),
            (this.btn_next.visible = !1),
            a.Inst.me.JSout.play(0, !1),
            this.chat.close(!1),
            this.close_sound(),
            Laya.timer.once(800, this, function() {
              (e.me.visible = !1),
                e.illust.clear(),
                t ? a.Inst.show_result() : a.Inst.show_next();
            }),
            this.effect && (this.effect.destory(), (this.effect = null));
        }),
        e
      );
    })(),
    n = (function() {
      function e(t) {
        var e = this;
        (this.effects = []), (this.me = t);
        var i = t.getChildByName('tubiao');
        (this.single_item = i.getChildByName('item1')),
          (this.container10 = i.getChildByName('container10')),
          (this.btn_confirm = t.getChildByName('confirm')),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close(), a.Inst.close();
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function(t) {
          if ((Laya.timer.clearAll(this), 1 == t.length))
            (this.single_item.visible = !0),
              (this.container10.visible = !1),
              this.render_item(t[0], this.single_item);
          else {
            (this.single_item.visible = !1), (this.container10.visible = !0);
            for (var e = 0; e < this.container10.numChildren; e++) {
              var i = this.container10.getChildAt(e);
              e < t.length
                ? ((i.visible = !0), this.render_item(t[e], i))
                : (i.visible = !1);
            }
          }
          (this.me.visible = !0), a.Inst.me.XMJGin.play(0, !1);
        }),
        (e.prototype.close = function() {
          Laya.timer.clearAll(this), (this.me.visible = !1);
          for (var t = 0; t < this.effects.length; t++)
            this.effects[t].destory();
          this.effects = [];
        }),
        (e.prototype.render_item = function(e, i) {
          var n = this,
            a = i.getChildByName('btn');
          a.clickHandler = Laya.Handler.create(
            this,
            function() {
              30 == Math.floor(e.reward.id / 1e4) &&
                t.UI_ItemDetail.Inst.show(e.reward.id);
            },
            null,
            !1
          );
          var r = a.getChildByName('icon_origin'),
            s = a.getChildByName('icon_final'),
            o = i.getChildByName('name_orgin'),
            l = i.getChildByName('name_final'),
            h = a.getChildByName('gold_bg');
          if (((h.visible = !1), 20 == Math.floor(e.reward.id / 1e4))) {
            var c = cfg.item_definition.character.get(e.reward.id),
              u = cfg.item_definition.skin.get(c.init_skin);
            game.LoadMgr.setImgSkin(r, u.path + '/smallhead.png'),
              (r.getChildByName('count').visible = !1),
              (o.text = c['name_' + GameMgr.client_language]),
              Laya.timer.once((10 / 24) * 1e3, this, function() {
                (h.visible = !0),
                  n.effects.push(
                    game.FrontEffect.Inst.create_ui_effect(
                      h,
                      n.container10.visible
                        ? 'scene/effect_item_shine.lh'
                        : 'scene/effect_item_shine_big.lh',
                      new Laya.Point(0, 0),
                      1,
                      !0
                    )
                  );
              });
          } else {
            _ = cfg.item_definition.item.get(e.reward.id);
            game.LoadMgr.setImgSkin(r, _.icon);
            d = r.getChildByName('count');
            e.reward.count > 1
              ? ((d.visible = !0), (d.text = e.reward.count.toString()))
              : (d.visible = !1),
              (o.text = _['name_' + GameMgr.client_language]),
              (h.visible = !1);
          }
          if (e.replace) {
            if (
              ((s.visible = !0),
              (l.visible = !0),
              20 == Math.floor(e.replace.id / 1e4))
            ) {
              var c = cfg.item_definition.character.get(e.replace.id),
                u = cfg.item_definition.skin.get(c.init_skin);
              game.LoadMgr.setImgSkin(s, u.path + '/smallhead.png'),
                (s.getChildByName('count').visible = !1),
                (l.text = c['name_' + GameMgr.client_language]);
            } else {
              var _ = cfg.item_definition.item.get(e.replace.id);
              game.LoadMgr.setImgSkin(s, _.icon);
              var d = s.getChildByName('count');
              e.replace.count > 1
                ? ((d.visible = !0), (d.text = e.replace.count.toString()))
                : (d.visible = !1),
                (l.text = _['name_' + GameMgr.client_language]);
            }
            var f = Laya.timer.currTimer;
            (r.alpha = o.alpha = 1),
              (s.alpha = l.alpha = 0),
              Laya.timer.frameLoop(1, this, function() {
                var t = Laya.timer.currTimer - f;
                if ((t -= 2600 * Math.floor(t / 2600)) < 800)
                  (r.alpha = o.alpha = 1), (s.alpha = l.alpha = 0);
                else if (t < 1300) {
                  e = (t - 800) / 500;
                  (r.alpha = o.alpha = 1 - e), (s.alpha = l.alpha = e);
                } else if (t < 2100)
                  (r.alpha = o.alpha = 0), (s.alpha = l.alpha = 1);
                else {
                  var e = (t - 800 - 500 - 800) / 500;
                  (r.alpha = o.alpha = e), (s.alpha = l.alpha = 1 - e);
                }
              });
          } else
            (s.visible = !1), (l.visible = !1), (r.alpha = 1), (o.alpha = 1);
        }),
        e
      );
    })(),
    a = (function(a) {
      function r() {
        var t = a.call(this, new ui.lobby.tangfang1UI()) || this;
        return (r.Inst = t), t;
      }
      return (
        __extends(r, a),
        (r.prototype.onCreate = function() {
          var t = this;
          (this.btn_next = this.me.getChildByName('btn_next')),
            (this.btn_next.clickHandler = Laya.Handler.create(
              this,
              function() {
                t.show_next();
              },
              null,
              !1
            )),
            (this.tf_wupin = new e(
              this.me.getChildByName('tanfang_wupin'),
              this.me.getChildByName('effect_wuping')
            )),
            (this.tf_juese = new i(
              this.me.getChildByName('tanfang_juese'),
              this.me.getChildByName('effect_juese')
            )),
            (this.btn_pass = this.me.getChildByName('btn_pass')),
            (this.btn_pass.clickHandler = Laya.Handler.create(
              this,
              function() {
                t.show_result();
              },
              null,
              !1
            )),
            (this.final_result = new n(
              this.me.getChildByName('container_final_info')
            )),
            (this.left_tree = this.me.getChildByName('left_tree')),
            (this.right_tree = this.me.getChildByName('right_tree')),
            (this.container_liuxing = this.me
              .getChildByName('container_scene')
              .getChildByName('liuxing')),
            (this.container_jianying_sakura = this.me
              .getChildByName('tanfang_juese')
              .getChildByName('jianying')
              .getChildByName('scene_jianying_sakura'));
        }),
        (r.prototype.show = function(t) {
          var e = this;
          this.results = t;
          for (r = 1; r < this.results.length; r++) {
            var i = Math.floor(Math.random() * (r + 1)),
              n = this.results[r];
            (this.results[r] = this.results[i]), (this.results[i] = n);
          }
          for (var a = !1, r = 0; r < this.results.length; r++)
            if (20 == Math.floor(this.results[r].reward.id / 1e4)) {
              a = !0;
              break;
            }
          if (
            ((this.enable = !0),
            (this.tf_wupin.me.visible = !1),
            (this.tf_juese.me.visible = !1),
            (this.final_result.me.visible = !1),
            (this.left_tree.visible = !0),
            (this.right_tree.visible = !0),
            (this.btn_next.visible = !1),
            (this.btn_pass.visible = !1),
            (this.index = 0),
            this.me.XMin_new.play(0, !1),
            Laya.timer.once(1250, this, function() {
              (e.btn_next.visible = !0), (e.btn_pass.visible = !0);
            }),
            Laya.timer.once((20 / 24) * 1e3, this, function() {
              view.AudioMgr.PlayAudio(108);
            }),
            (this.me
              .getChildByName('container_scene')
              .getChildByName('light').visible = !1),
            Laya.timer.once(1200, this, function() {
              (e.me
                .getChildByName('container_scene')
                .getChildByName('light').visible = !0),
                e.me.light.play(0, !0);
            }),
            a && Math.random() < 0.8)
          ) {
            var s = 'scene/scene_tanfang_liuxing.ls';
            Laya.loader.create(
              s,
              Laya.Handler.create(this, function() {
                Laya.timer.once(1500, e, function() {
                  (e._scene_liuxing = Laya.loader.getRes(s)),
                    e.container_liuxing.addChild(e._scene_liuxing),
                    (e._scene_liuxing.visible = !0);
                });
              })
            );
          }
          var o = 'scene/scene_jianying_sakura.ls';
          Laya.loader.create(
            o,
            Laya.Handler.create(this, function() {
              (e._scene_jianying_sakura = Laya.loader.getRes(o)),
                e.container_jianying_sakura.addChild(e._scene_jianying_sakura),
                (e._scene_jianying_sakura.visible = !1);
            })
          );
        }),
        (r.prototype.close = function() {
          (this.enable = !1),
            t.UI_TanfangRoot.Inst.close(),
            this._scene_liuxing &&
              (this._scene_liuxing.destroy(!0), (this._scene_liuxing = null)),
            this._scene_jianying_sakura &&
              (this._scene_jianying_sakura.destroy(!0),
              (this._scene_jianying_sakura = null)),
            this.me.light.stop(),
            t.UI_Treasure.Inst.refresh_show();
        }),
        (r.prototype.show_next = function() {
          var t = this;
          (this.btn_next.visible = !1),
            (this.btn_pass.visible = !1),
            this.index < this.results.length
              ? (20 == Math.floor(this.results[this.index].reward.id / 1e4)
                  ? (this.tf_juese.show(this.results[this.index].reward.id),
                    Laya.timer.once(400, this, function() {
                      t._scene_jianying_sakura &&
                        ((t._scene_jianying_sakura.visible = !0),
                        Laya.timer.once(2500, t, function() {
                          t._scene_jianying_sakura.visible = !1;
                        }));
                    }))
                  : this.tf_wupin.show(
                      this.results[this.index].reward.id,
                      this.results[this.index].reward.count
                    ),
                this.index++)
              : this.show_result();
        }),
        (r.prototype.show_result = function() {
          (this.btn_next.visible = !1),
            (this.btn_pass.visible = !1),
            (this.index = this.results.length),
            this.final_result.show(this.results);
        }),
        r
      );
    })(t.UIBase);
  t.UI_Tanfang = a;
})(uiscript || (uiscript = {}));