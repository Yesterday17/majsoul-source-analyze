let uiscript;
!(t => {
  const e = (() => {
      function t(t) {
        (this.me = t),
          (this.title = t.getChildByName('title')),
          (this.bar_v = t.getChildByName('bar').getChildByName('v').mask),
          (this.label_add = t.getChildByName('bar').getChildByName('num')),
          (this.icon = t.getChildByName('icon'));
      }
      return (t.prototype.show = function() {
        const t = view.DesktopMgr.Inst.rewardinfo.match_chest, e = cfg.desktop.chest.get(t.chest_id);
        (this.bar_v.width = (384 * t.origin) / e.exp_step),
          (this.label_add.text = ''),
          (this.title.text = e[`name_${GameMgr.client_language}`]),
          game.LoadMgr.setImgSkin(this.icon, e.icon),
          (this.me.visible = true);
      }),
      (t.prototype.doanim = function(t) {
        const e = this, i = view.DesktopMgr.Inst.rewardinfo.match_chest, n = cfg.desktop.chest.get(i.chest_id), a = i.final - i.origin + (i.is_graded ? n.exp_step : 0);
        (this.label_add.text = `+${a.toString()}`),
          (this.label_add.scaleX = this.label_add.scaleY = 0),
          Laya.Tween.to(
            this.label_add,
            { scaleX: 1, scaleY: 1 },
            200,
            Laya.Ease.backOut
          );
        const r = i.is_graded ? 1 : i.final / n.exp_step;
        Laya.timer.once(500, this, () => {
          const a = (r - i.origin / n.exp_step) / 0.001;
          Laya.Tween.to(e.bar_v, { width: 384 * r }, a),
            Laya.timer.once(a + 500, e, () => {
              i.is_graded
                ? game.Tools.showRewards(
                    i,
                    Laya.Handler.create(e, () => {
                      e.bar_v.width = 0;
                      const a = i.final / n.exp_step, r = a / 0.001;
                      Laya.Tween.to(e.bar_v, { width: 384 * a }, r),
                        Laya.timer.once(r + 200, e, () => {
                          t.run();
                        });
                    })
                  )
                : t.run();
            });
        });
      }),
      (t.prototype.close = function() {
        (this.me.visible = false), game.LoadMgr.clearImgSkin(this.icon);
      }),
      t
    ;
    })();

  const i = (() => {
    function e(e) {
      (this.me = e),
        (this.title = e.getChildByName('title')),
        (this.bar_v = e.getChildByName('bar').getChildByName('v').mask),
        (this.label_add = e.getChildByName('bar').getChildByName('num')),
        (this.icon = e.getChildByName('icon')),
        (this.container_gift = e.getChildByName('gift')),
        (this.container_gift.visible = false),
        (this.container_item = this.container_gift.getChildByName('item')),
        (this.icon_gift = this.container_item.getChildByName('icon')),
        (this.gift_num = this.container_gift.getChildByName('num')),
        (this.container_item.getChildByName(
          'btn'
        ).clickHandler = new Laya.Handler(this, () => {
          t.UI_ItemDetail.Inst.show(
            cfg.desktop.settings.account_friendship_bar_reward_id.int_value
          );
        }));
    }
    return (e.prototype.show = function() {
      const t = view.DesktopMgr.Inst.rewardinfo.character_gift;
      (this.bar_v.width =
        (384 * t.origin) /
        cfg.desktop.settings.account_friendship_bar_length.int_value),
        (this.label_add.text = '');
      const e =
                cfg.desktop.settings.account_friendship_bar_reward_id.int_value,
            i = cfg.item_definition.item.find(e);
      game.LoadMgr.setImgSkin(this.icon, i.icon_transparent),
        game.LoadMgr.setImgSkin(this.icon_gift, i.icon),
        (this.container_gift.visible = false),
        (this.me.visible = true);
    }),
    (e.prototype.doanim = function(e) {
      const i = this, n = view.DesktopMgr.Inst.rewardinfo.character_gift;
      (this.label_add.text = `+${n.add}`),
        (this.label_add.scaleX = this.label_add.scaleY = 0),
        Laya.Tween.to(
          this.label_add,
          { scaleX: 1, scaleY: 1 },
          200,
          Laya.Ease.backOut
        );
      const a = cfg.desktop.settings.account_friendship_bar_length.int_value, r = n.is_graded ? 1 : n.final / a;
      Laya.timer.once(500, this, () => {
        const s = (r - n.origin / a) / 0.001;
        Laya.Tween.to(i.bar_v, { width: 384 * r }, s),
          Laya.timer.once(s + 500, i, () => {
            n.is_graded
              ? ((i.container_gift.x = i.icon.x),
                (i.container_gift.y = i.icon.y),
                (i.container_gift.alpha = 1),
                (i.container_gift.visible = true),
                (i.container_item.scaleX = 1),
                (i.container_item.scaleY = 1),
                (i.container_item.alpha = 0),
                (i.gift_num.alpha = 0),
                Laya.Tween.to(
                  i.container_item,
                  { alpha: 1 },
                  300,
                  null,
                  Laya.Handler.create(i, () => {
                    Laya.timer.once(300, i, () => {
                      Laya.Tween.to(
                        i.container_gift,
                        { x: i.icon.x + 200 },
                        200
                      ),
                        Laya.Tween.to(
                          i.container_item,
                          { scaleX: 0.7, scaleY: 0.7 },
                          200,
                          null,
                          Laya.Handler.create(i, () => {
                            t.UIBase.anim_pop_out(
                              i.gift_num,
                              Laya.Handler.create(i, () => {
                                Laya.timer.once(500, i, () => {
                                  i.bar_v.width = 0;
                                  const t = n.final / a, r = t / 0.001;
                                  Laya.Tween.to(
                                    i.bar_v,
                                    { width: 384 * t },
                                    r
                                  ),
                                    Laya.timer.once(r + 200, i, () => {
                                      e.run();
                                    });
                                });
                              })
                            );
                          })
                        );
                    });
                  })
                ))
              : e.run();
          });
      });
    }),
    (e.prototype.close = function() {
      (this.me.visible = false), game.LoadMgr.clearImgSkin(this.icon);
    }),
    e
  ;
  })();

  const n = (() => {
    function e(t) {
      (this.hearts = []),
        (this.me = t),
        (this.container_hearts = t.getChildByName('hearts'));
      for (let e = 0; e < this.container_hearts.numChildren; e++) {
        const i = this.container_hearts.getChildAt(e);
        this.hearts.push({ me: i, mask: i.getChildByName('v').mask });
      }
      this.label_num = t.getChildByName('num');
    }
    return (e.prototype.show = function() {
      this.me.visible = true;
      const e = view.DesktopMgr.Inst.rewardinfo;
      (this.target_level = e.main_character.level),
        (this.target_exp = e.main_character.exp);
      const i = t.UI_Sushe.main_chara_info;
      (this.chara_info = i),
        (this.current_exp = i.exp),
        (this.current_level = i.level);
      for (let n = 0; n < this.hearts.length; n++)
        n < i.level
          ? (this.hearts[n].mask.scaleY = 1)
          : n == i.level
          ? (this.hearts[n].mask.scaleY =
              (i.exp /
                cfg.level_definition.character.get(i.level + 1).exp) *
                0.82 +
              0.1)
          : (this.hearts[n].mask.scaleY = 0),
          this.chara_info.is_upgraded
            ? (this.hearts[n].me
                .getChildByName('v')
                .getChildByName('h').skin = game.Tools.localUISrc(
                'myres/bothui/heart_gold.png'
              ))
            : (this.hearts[n].me
                .getChildByName('v')
                .getChildByName('h').skin = game.Tools.localUISrc(
                'myres/bothui/bf_heart.png'
              ));
      game.Tools.child_align_center(this.container_hearts, [
        10,
        10,
        10,
        10
      ]),
        (this.label_num.text = ''),
        (this.chara_info.level = this.target_level),
        (this.chara_info.exp = this.target_exp);
    }),
    (e.prototype.doanim = function(t) {
      const e = this, i = view.DesktopMgr.Inst.rewardinfo.main_character;
      i
        ? (this.current_level < 5
            ? (this.label_num.text = `+${i.add.toString()}`)
            : (this.label_num.text = ''),
          (this.label_num.scaleX = this.label_num.scaleY = 0),
          Laya.Tween.to(
            this.label_num,
            { scaleX: 1, scaleY: 1 },
            200,
            Laya.Ease.backOut
          ),
          i.level < this.current_level
            ? t.run()
            : i.level == this.current_level && i.exp < this.current_exp
            ? t.run()
            : ((this.anim_complete = t),
              this.current_level < 5
                ? Laya.timer.once(300, this, () => {
                    e._exp_up();
                  })
                : this.anim_complete && this.anim_complete.run()))
        : t.run();
    }),
    (e.prototype._exp_up = function() {
      const e = this;
      const i = this.current_level;

      const n =
        this.current_exp / cfg.level_definition.character.get(i + 1).exp;

      let a = 0;
      a =
        i != this.target_level
          ? 1
          : this.target_exp /
            cfg.level_definition.character.get(this.target_level + 1).exp;
      const r = this.hearts[i];
      r.mask.scaleY = n;
      const s = (a - n) / 0.0015;
      Laya.Tween.to(
        r.mask,
        { scaleY: 0.82 * a + 0.1 },
        s,
        null,
        Laya.Handler.create(this, () => {
          e.me.visible &&
            (i != e.target_level
              ? Laya.timer.once(500, e, () => {
                  t.UI_Character_star_up.Inst.show(e.chara_info, null),
                    Laya.timer.once(500, e, () => {
                      for (let t = 0; t < e.hearts.length; t++)
                        t < e.target_level
                          ? (e.hearts[t].mask.scaleY = 1)
                          : t == e.target_level
                          ? (e.hearts[t].mask.scaleY =
                              (e.target_exp /
                                cfg.level_definition.character.get(
                                  e.target_level + 1
                                ).exp) *
                              0.92)
                          : (e.hearts[t].mask.scaleY = 0);
                      e.anim_complete && e.anim_complete.run();
                    });
                })
              : e.anim_complete && e.anim_complete.run());
        })
      );
    }),
    (e.prototype.close = function() {
      this.me.visible = false;
    }),
    e
  ;
  })();

  const a = (a => {
    function r() {
      const t = a.call(this, new ui.mj.rewardprogressUI()) || this;
      return (r.Inst = t), t;
    }
    return __extends(r, a),
    (r.prototype.onCreate = function() {
      (this.page_box = new e(this.me.getChildByName('container_box'))),
        (this.page_jiban_gift = new i(
          this.me.getChildByName('container_jibanliwu')
        )),
        (this.page_jiban = new n(
          this.me.getChildByName('container_jiban')
        ));
    }),
    (r.prototype.show = function(e) {
      const i = this, n = view.DesktopMgr.Inst.rewardinfo;
      (this.page_jiban.me.visible = false),
        (this.page_jiban_gift.me.visible = false),
        (this.complete = e),
        this.page_box.show(),
        t.UIBase.anim_alpha_in(this.page_box.me, { x: -50 }, 150),
        n.main_character
          ? (this.page_jiban.show(),
            t.UIBase.anim_alpha_in(this.page_jiban.me, { x: -50 }, 150, 60))
          : n.character_gift &&
            (this.page_jiban_gift.show(),
            t.UIBase.anim_alpha_in(
              this.page_jiban_gift.me,
              { x: -50 },
              150,
              60
            )),
        Laya.timer.once(600, this, () => {
          i.page_box.doanim(
            Laya.Handler.create(i, () => {
              Laya.timer.once(500, i, () => {
                n.main_character
                  ? i.page_jiban.doanim(
                      Laya.Handler.create(i, () => {
                        e.run();
                      })
                    )
                  : n.character_gift
                  ? i.page_jiban_gift.doanim(
                      Laya.Handler.create(i, () => {
                        e.run();
                      })
                    )
                  : e.run();
              });
            })
          );
        }),
        (this.enable = true);
    }),
    (r.prototype.close = function() {
      this.page_box.close(),
        this.page_jiban_gift.close(),
        this.page_jiban.close(),
        (this.enable = false);
    }),
    r
  ;
  })(t.UIBase);

  t.UI_MJReward = a;
})(uiscript || (uiscript = {}));