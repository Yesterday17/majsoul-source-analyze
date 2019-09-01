let uiscript;
!(t => {
  const e = (() => {
      function t(t) {
        (this.stars = []),
          (this.me = t),
          (this.container_rank = t.getChildByName('rank')),
          (this.icon_new = this.container_rank.getChildByName('icon_new')),
          (this.icon_old = this.container_rank.getChildByName('icon_old'));
        for (let e = 1; e <= 3; e++)
          this.stars.push(
            this.container_rank.getChildByName(`star${e}`).getChildAt(0)
          );
        (this.container_bar = this.me.getChildByName('bar')),
          (this.barshine = this.container_bar.getChildByName('fullshine')),
          (this.barval = this.container_bar.getChildByName('container').mask),
          (this.scores = this.me.getChildByName('score')),
          (this.f_jinji = this.me.getChildByName('f_jinji')),
          (this.f_jiangduan = this.me.getChildByName('f_jiangduan')),
          (this.f_shengduan = this.me.getChildByName('f_shengduan')),
          (this.continue_add = this.me.getChildByName('+')),
          (this.label_add = this.continue_add.getChildByName('score')),
          (this.continue_minus = this.me.getChildByName('-')),
          (this.label_minus = this.continue_minus.getChildByName('score'));
      }
      return (t.prototype.reset = function() {
        (this.icon_new.alpha = 1),
          (this.icon_new.visible = false),
          (this.icon_old.alpha = 1),
          (this.icon_old.visible = false);
        for (let t = 0; t < this.stars.length; t++)
          (this.stars[t].scaleX = this.stars[t].scaleY = 1),
            (this.stars[t].alpha = 1),
            (this.stars[t].visible = false);
        (this.barshine.visible = false),
          (this.barshine.alpha = 1),
          (this.f_jinji.visible = false),
          (this.f_jiangduan.visible = false),
          (this.f_shengduan.visible = false),
          (this.scores.visible = false);
      }),
      (t.prototype.showInit = function() {
        this.reset(), (this.me.visible = true);
        const t = view.DesktopMgr.Inst.levelchangeinfo, e = t.origin.id, i = t.origin.score, a = t.final.id;
        t.final.score;
        this.container_bar.visible = 10601 != e && 20601 != e;
        const r = cfg.level_definition.level_definition.find(e), s = cfg.level_definition.level_definition.find(a), o = (i / r.end_point) * 0.78;
        n.Inst.me, this.barval;
        if (
          ((this.barval.scaleY = o),
          (this.icon_old.visible = true),
          (this.icon_old.skin = game.LoadMgr.getResImageSkin(r.primary_icon)),
          10601 == e || 20601 == e)
        )
          for (l = 0; l < this.stars.length; l++)
            this.stars[l].parent.visible = false;
        else
          for (var l = 0; l < this.stars.length; l++)
            (this.stars[l].parent.visible = true),
              (this.stars[l].visible = true),
              (this.stars[l].alpha = l < r.secondary_level ? 1 : 0);
        (this.icon_new.visible = false),
          (this.icon_new.skin = game.LoadMgr.getResImageSkin(s.primary_icon)),
          (this.icon_old.scaleX = this.icon_old.scaleY = 1),
          (this.continue_add.visible = false),
          (this.continue_minus.visible = false);
      }),
      (t.prototype.showLevelChange = function() {
        const t = this;
        const e = view.DesktopMgr.Inst.levelchangeinfo;
        const i = e.origin.id;
        const a = e.origin.score;
        const r = e.final.id;
        const s = e.final.score;
        const o = cfg.level_definition.level_definition.find(i);
        const l = cfg.level_definition.level_definition.find(r);
        const h = (a / o.end_point) * 0.78;
        const c = (s / l.end_point) * 0.78;
        const u = n.Inst.me;
        const _ = this.barval;
        let d = 0;
        if (
          ((this.scores.text =
            10601 == i || 20601 == i || 10601 == r || 20601 == r
              ? s.toString()
              : `${s.toString()}/${l.end_point.toString()}`),
          (this.scores.visible = true),
          (this.scores.alpha = 0),
          (_.scaleY = h),
          i == r)
        ) {
          const f = Math.abs(h - c) / 3e-4;
          f > 50 &&
            (Laya.timer.once(d, this, () => {
              Laya.Tween.to(_, { scaleY: c }, f), t.play_exp_audio(f);
            }),
            (d += f)),
            (d += 100);
        } else if (o.primary_level < l.primary_level) {
          const p = (0.78 - h) / 3e-4;
          Laya.timer.once(d, this, () => {
            Laya.Tween.to(_, { scaleY: 0.78 }, p), t.play_exp_audio(p);
          }),
            (d += p),
            Laya.timer.once(d, this, () => {
              (t.barshine.visible = true), u.ani0.play(0, false);
            }),
            (d += u.ani0.count * u.ani0.interval),
            Laya.timer.once(d, this, () => {
              n.Inst.ShengDuan();
            }),
            (d = -1);
        } else if (o.primary_level > l.primary_level) {
          (this.icon_new.visible = true),
            (this.icon_new.alpha = 0),
            (this.icon_new.skin = game.LoadMgr.getResImageSkin(
              l.primary_icon
            ));
          const m = h / 3e-4;
          Laya.timer.once(d, this, () => {
            Laya.Tween.to(_, { scaleY: 0 }, m), t.play_exp_audio(m);
          }),
            (d += m),
            Laya.timer.once(d, this, () => {
              const e = t.stars[0],
                    i = game.FrontEffect.Inst.create_ui_effect(
                      e.parent,
                      'scene/effect_losestar.lh',
                      new Laya.Point(0, 0),
                      1
                    );
              Laya.timer.once(100, t, () => {
                e.alpha = 0;
              }),
                Laya.timer.once(2e3, t, () => {
                  i.destory();
                });
            }),
            (d += 1200),
            Laya.timer.once(d, this, () => {
              (t.f_jiangduan.visible = true), u.ani_jiangduan.play(0, false);
            }),
            (d += 2300);
          const g = (0.78 - c) / 3e-4;
          Laya.timer.once(d, this, () => {
            (_.scaleY = 0.78),
              Laya.Tween.to(_, { scaleY: c }, g),
              t.play_exp_audio(g);
          }),
            (d += g);
        } else if (o.secondary_level < l.secondary_level) {
          const y = (0.78 - h) / 3e-4;
          Laya.timer.once(d, this, () => {
            Laya.Tween.to(_, { scaleY: 0.78 }, y), t.play_exp_audio(y);
          }),
            (d += y),
            Laya.timer.once(d, this, () => {
              (t.barshine.visible = true), u.ani0.play(0, false);
            }),
            (d += u.ani0.interval * u.ani0.count),
            Laya.timer.once(d, this, () => {
              t.f_jinji.visible = true;
              const e = 2 == l.secondary_level ? t.stars[1] : t.stars[2],
                    i = game.FrontEffect.Inst.create_ui_effect(
                      e.parent,
                      'scene/effect_getstar.lh',
                      new Laya.Point(-0.5, 0),
                      1.2
                    );
              view.AudioMgr.PlayAudio(218),
                Laya.timer.once(100, t, () => {
                  e.alpha = 1;
                }),
                Laya.timer.once(1e3, t, () => {
                  i.destory();
                });
            }),
            (d += 1200);
          const v = c / 3e-4;
          Laya.timer.once(d, this, () => {
            (t.barshine.visible = false),
              (_.scaleY = 0),
              Laya.Tween.to(_, { scaleY: c }, v),
              t.play_exp_audio(v);
          }),
            (d += v);
        } else if (o.secondary_level > l.secondary_level) {
          const b = h / 3e-4;
          Laya.timer.once(d, this, () => {
            Laya.Tween.to(_, { scaleY: 0 }, b), t.play_exp_audio(b);
          }),
            (d += b),
            Laya.timer.once(d, this, () => {
              t.f_shengduan.visible = true;
              const e = 2 == l.secondary_level ? t.stars[2] : t.stars[1],
                    i = game.FrontEffect.Inst.create_ui_effect(
                      e.parent,
                      'scene/effect_losestar.lh',
                      new Laya.Point(-0.5, 0),
                      1.2
                    );
              Laya.timer.once(100, t, () => {
                e.alpha = 0;
              }),
                Laya.timer.once(2e3, t, () => {
                  i.destory();
                });
            }),
            (d += 1800);
          const w = (0.78 - c) / 3e-4;
          Laya.timer.once(d, this, () => {
            (_.scaleY = 0.78),
              Laya.Tween.to(_, { scaleY: c }, w),
              t.play_exp_audio(w);
          }),
            (d += w);
        }
        return d >= 0 &&
          (Laya.timer.once(d, this, () => {
            Laya.Tween.to(t.scores, { alpha: 1 }, 150),
              view.DesktopMgr.Inst.ptchange > 0 &&
                ((t.label_add.text = view.DesktopMgr.Inst.ptchange.toString()),
                (t.continue_add.visible = true),
                (t.continue_add.alpha = 0),
                Laya.Tween.to(t.continue_add, { alpha: 1 }, 150)),
              view.DesktopMgr.Inst.ptchange < 0 &&
                ((t.label_minus.text = view.DesktopMgr.Inst.ptchange.toString()),
                (t.continue_minus.visible = true),
                (t.continue_minus.alpha = 0),
                Laya.Tween.to(t.continue_minus, { alpha: 1 }, 150));
          }),
          (d += 150)),
        d
      ;
      }),
      (t.prototype.shengduanOver = function() {
        const t = view.DesktopMgr.Inst.levelchangeinfo, e = t.origin.id, i = t.origin.score, a = t.final.id, r = t.final.score, s = cfg.level_definition.level_definition.find(e), o = cfg.level_definition.level_definition.find(a), l = (s.end_point, (r / o.end_point) * 0.78);
        n.Inst.me, this.barval;
        if (
          ((this.f_jinji.visible = false),
          (this.icon_old.visible = true),
          (this.barshine.visible = false),
          (this.icon_old.skin = game.LoadMgr.getResImageSkin(o.primary_icon)),
          10601 == a || 20601 == a)
        ) {
          for (h = 0; h < this.stars.length; h++)
            this.stars[h].parent.visible = false;
          this.container_bar.visible = false;
        } else {
          for (var h = 0; h < this.stars.length; h++)
            (this.stars[h].parent.visible = true),
              (this.stars[h].visible = true),
              (this.stars[h].alpha = h < o.secondary_level ? 1 : 0);
          this.container_bar.visible = true;
        }
        (this.icon_new.visible = false),
          (this.barval.scaleY = l),
          (this.scores.alpha = 1);
      }),
      (t.prototype.play_exp_audio = function(t) {
        const e = this;
        t < 0 ||
          (view.AudioMgr.PlayAudio(220),
          Laya.timer.once(150, this, () => {
            e.play_exp_audio(t - 150);
          }));
      }),
      t
    ;
    })();

  const i = (() => {
    function t(t) {
      (this._effect_book = null),
        (this.me = t),
        (this._ui = n.Inst.me),
        (this.black = this.me.getChildByName('black')),
        (this.shine = this.me.getChildByName('shine')),
        (this.book_shine = this.me.getChildByName('book_shine')),
        (this.btn_open = this.me.getChildByName('btn_open')),
        (this.container_main = this.me.getChildByName('main')),
        (this.call = this.container_main.getChildByName('call')),
        (this.contianer_name = this.container_main.getChildByName('name')),
        (this.label_name = this.contianer_name.getChildByName('name')),
        (this.label_time = this.container_main.getChildByName('time')),
        (this.btn_close = this.container_main.getChildByName('btn_close')),
        (this.rank = this.container_main
          .getChildByName('rankbg')
          .getChildByName('rank'));
    }
    return (t.prototype.show = function() {
      const t = this;
      (this.me.visible = true),
        (this.black.visible = true),
        (this.black.alpha = 0),
        this._ui.ani1.play(0, false),
        (this.btn_open.visible = false),
        Laya.timer.once(500, this, () => {
          view.AudioMgr.PlayAudio(105);
        }),
        Laya.timer.once(625, this, () => {
          (t.btn_open.visible = true),
            (t._effect_book = game.FrontEffect.Inst.create_ui_effect(
              t.book_shine,
              'scene/effect_juanzhou.lh',
              new Laya.Point(0, 0),
              1
            )),
            Laya.timer.once(1e3, t, () => {
              t.btn_open.clickHandler = Laya.Handler.create(t, t.openBook);
            });
        });
    }),
    (t.prototype.openBook = function() {
      const t = this;
      this._effect_book && this._effect_book.destory(),
        (this.container_main.visible = true);
      const e = view.DesktopMgr.Inst.levelchangeinfo, i = e.final.id, n = (e.final.score, new Date());
      this.label_time.text =
        `${n.getFullYear()}.${(n.getMonth() + 1).toString()}.${n.getDate()}`;
      const a = cfg.level_definition.level_definition.find(i), r = GameMgr.Inst.account_data.nickname;
      (this.label_name.text = r),
        (this.contianer_name.width =
          this.label_name.x + this.label_name.textWidth + 34),
        (this.call.x =
          30 + this.contianer_name.x + this.contianer_name.width),
        (this.rank.skin = game.LoadMgr.getResImageSkin(a.primary_icon)),
        this._ui.ani2.play(0, false),
        (this.btn_close.clickHandler = null),
        Laya.timer.once((8 / 24) * 1e3, this, () => {
          view.AudioMgr.PlayAudio(228);
        });
      for (let s = [29, 43, 56, 104], o = 0; o < s.length; o++)
        Laya.timer.once((s[o] / 24) * 1e3, this, () => {
          view.AudioMgr.PlayAudio(104);
        });
      Laya.timer.once((88 / 24) * 1e3, this, () => {
        const e = game.FrontEffect.Inst.create_ui_effect(
          t.rank.parent,
          'scene/effect_queshi_bang.lh',
          new Laya.Point(0, 0),
          0
        );
        view.AudioMgr.PlayAudio(229),
          Laya.timer.once(1e3, t, () => {
            e.destory();
          });
      }),
        Laya.timer.once(
          this._ui.ani2.interval * this._ui.ani2.count,
          this,
          () => {
            t.btn_close.clickHandler = Laya.Handler.create(
              t,
              t.closeBook,
              null,
              true
            );
          }
        );
    }),
    (t.prototype.closeBook = function() {
      const t = this;
      view.AudioMgr.PlayAudio(228),
        n.Inst.pagerank.shengduanOver(),
        (this.btn_close.visible = false),
        this._ui.ani3.play(0, false),
        Laya.timer.once(
          this._ui.ani3.interval * this._ui.ani3.count,
          this,
          () => {
            (t.me.visible = false), n.Inst.AnimOver();
          }
        );
    }),
    t
  ;
  })();

  var n = (n => {
    function a() {
      const t = n.call(this, new ui.mj.rankchangeUI()) || this;
      return (
        (t.atlas = 'res/atlas/myres/mjdesktop/shengduan.atlas'),
        (a.Inst = t),
        t
      );
    }
    return __extends(a, n),
    (a.prototype.onCreate = function() {
      (this.pagerank = new e(this.me.getChildByName('rank_change'))),
        (this.pagerankup = new i(this.me.getChildByName('rankup'))),
        (this.pagerank.me.visible = false),
        (this.pagerankup.me.visible = false),
        Laya.loader.clearTextureRes(this.atlas);
    }),
    (a.prototype.show = function(e) {
      const i = this;
      (this.complete = e),
        (this.enable = true),
        this.pagerank.showInit(),
        (this.pagerankup.me.visible = false),
        Laya.timer.clearAll(this),
        t.UIBase.anim_alpha_in(this.pagerank.me, { x: 0 }, 100, 0),
        Laya.timer.once(500, this, () => {
          const t = i.pagerank.showLevelChange();
          t > 0 &&
            Laya.timer.once(t, i, () => {
              i.AnimOver();
            });
        });
    }),
    (a.prototype.close = function() {
      (this.enable = false), Laya.loader.clearTextureRes(this.atlas);
    }),
    (a.prototype.ShengDuan = function() {
      this.pagerankup.show();
    }),
    (a.prototype.AnimOver = function() {
      Laya.loader.clearTextureRes(this.atlas), this.complete.run();
    }),
    (a.Inst = null),
    a
  ;
  })(t.UIBase);

  t.UI_RankChange = n;
})(uiscript || (uiscript = {}));