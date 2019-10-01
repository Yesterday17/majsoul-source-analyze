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
      function t(t) {
        (this.stars = []),
          (this.me = t),
          (this.container_rank = t.getChildByName('rank')),
          (this.icon_new = this.container_rank.getChildByName('icon_new')),
          (this.icon_old = this.container_rank.getChildByName('icon_old'));
        for (var e = 1; e <= 3; e++)
          this.stars.push(
            this.container_rank.getChildByName('star' + e).getChildAt(0)
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
      return (
        (t.prototype.reset = function() {
          (this.icon_new.alpha = 1),
            (this.icon_new.visible = !1),
            (this.icon_old.alpha = 1),
            (this.icon_old.visible = !1);
          for (var t = 0; t < this.stars.length; t++)
            (this.stars[t].scaleX = this.stars[t].scaleY = 1),
              (this.stars[t].alpha = 1),
              (this.stars[t].visible = !1);
          (this.barshine.visible = !1),
            (this.barshine.alpha = 1),
            (this.f_jinji.visible = !1),
            (this.f_jiangduan.visible = !1),
            (this.f_shengduan.visible = !1),
            (this.scores.visible = !1);
        }),
        (t.prototype.showInit = function() {
          this.reset(), (this.me.visible = !0);
          var t = view.DesktopMgr.Inst.levelchangeinfo,
            e = t.origin.id,
            i = t.origin.score,
            a = t.final.id;
          t.final.score;
          this.container_bar.visible = 10601 != e && 20601 != e;
          var r = cfg.level_definition.level_definition.find(e),
            s = cfg.level_definition.level_definition.find(a),
            o = (i / r.end_point) * 0.78;
          n.Inst.me, this.barval;
          if (
            ((this.barval.scaleY = o),
            (this.icon_old.visible = !0),
            (this.icon_old.skin = game.LoadMgr.getResImageSkin(r.primary_icon)),
            10601 == e || 20601 == e)
          )
            for (l = 0; l < this.stars.length; l++)
              this.stars[l].parent.visible = !1;
          else
            for (var l = 0; l < this.stars.length; l++)
              (this.stars[l].parent.visible = !0),
                (this.stars[l].visible = !0),
                (this.stars[l].alpha = l < r.secondary_level ? 1 : 0);
          (this.icon_new.visible = !1),
            (this.icon_new.skin = game.LoadMgr.getResImageSkin(s.primary_icon)),
            (this.icon_old.scaleX = this.icon_old.scaleY = 1),
            (this.continue_add.visible = !1),
            (this.continue_minus.visible = !1);
        }),
        (t.prototype.showLevelChange = function() {
          var t = this,
            e = view.DesktopMgr.Inst.levelchangeinfo,
            i = e.origin.id,
            a = e.origin.score,
            r = e.final.id,
            s = e.final.score,
            o = cfg.level_definition.level_definition.find(i),
            l = cfg.level_definition.level_definition.find(r),
            h = (a / o.end_point) * 0.78,
            c = (s / l.end_point) * 0.78,
            u = n.Inst.me,
            _ = this.barval,
            d = 0;
          if (
            ((this.scores.text =
              10601 == i || 20601 == i || 10601 == r || 20601 == r
                ? s.toString()
                : s.toString() + '/' + l.end_point.toString()),
            (this.scores.visible = !0),
            (this.scores.alpha = 0),
            (_.scaleY = h),
            i == r)
          ) {
            var f = Math.abs(h - c) / 3e-4;
            f > 50 &&
              (Laya.timer.once(d, this, function() {
                Laya.Tween.to(_, { scaleY: c }, f), t.play_exp_audio(f);
              }),
              (d += f)),
              (d += 100);
          } else if (o.primary_level < l.primary_level) {
            var p = (0.78 - h) / 3e-4;
            Laya.timer.once(d, this, function() {
              Laya.Tween.to(_, { scaleY: 0.78 }, p), t.play_exp_audio(p);
            }),
              (d += p),
              Laya.timer.once(d, this, function() {
                (t.barshine.visible = !0), u.ani0.play(0, !1);
              }),
              (d += u.ani0.count * u.ani0.interval),
              Laya.timer.once(d, this, function() {
                n.Inst.ShengDuan();
              }),
              (d = -1);
          } else if (o.primary_level > l.primary_level) {
            (this.icon_new.visible = !0),
              (this.icon_new.alpha = 0),
              (this.icon_new.skin = game.LoadMgr.getResImageSkin(
                l.primary_icon
              ));
            var m = h / 3e-4;
            Laya.timer.once(d, this, function() {
              Laya.Tween.to(_, { scaleY: 0 }, m), t.play_exp_audio(m);
            }),
              (d += m),
              Laya.timer.once(d, this, function() {
                var e = t.stars[0],
                  i = game.FrontEffect.Inst.create_ui_effect(
                    e.parent,
                    'scene/effect_losestar.lh',
                    new Laya.Point(0, 0),
                    1
                  );
                Laya.timer.once(100, t, function() {
                  e.alpha = 0;
                }),
                  Laya.timer.once(2e3, t, function() {
                    i.destory();
                  });
              }),
              (d += 1200),
              Laya.timer.once(d, this, function() {
                (t.f_jiangduan.visible = !0), u.ani_jiangduan.play(0, !1);
              }),
              (d += 2300);
            var g = (0.78 - c) / 3e-4;
            Laya.timer.once(d, this, function() {
              (_.scaleY = 0.78),
                Laya.Tween.to(_, { scaleY: c }, g),
                t.play_exp_audio(g);
            }),
              (d += g);
          } else if (o.secondary_level < l.secondary_level) {
            var y = (0.78 - h) / 3e-4;
            Laya.timer.once(d, this, function() {
              Laya.Tween.to(_, { scaleY: 0.78 }, y), t.play_exp_audio(y);
            }),
              (d += y),
              Laya.timer.once(d, this, function() {
                (t.barshine.visible = !0), u.ani0.play(0, !1);
              }),
              (d += u.ani0.interval * u.ani0.count),
              Laya.timer.once(d, this, function() {
                t.f_jinji.visible = !0;
                var e = 2 == l.secondary_level ? t.stars[1] : t.stars[2],
                  i = game.FrontEffect.Inst.create_ui_effect(
                    e.parent,
                    'scene/effect_getstar.lh',
                    new Laya.Point(-0.5, 0),
                    1.2
                  );
                view.AudioMgr.PlayAudio(218),
                  Laya.timer.once(100, t, function() {
                    e.alpha = 1;
                  }),
                  Laya.timer.once(1e3, t, function() {
                    i.destory();
                  });
              }),
              (d += 1200);
            var v = c / 3e-4;
            Laya.timer.once(d, this, function() {
              (t.barshine.visible = !1),
                (_.scaleY = 0),
                Laya.Tween.to(_, { scaleY: c }, v),
                t.play_exp_audio(v);
            }),
              (d += v);
          } else if (o.secondary_level > l.secondary_level) {
            var b = h / 3e-4;
            Laya.timer.once(d, this, function() {
              Laya.Tween.to(_, { scaleY: 0 }, b), t.play_exp_audio(b);
            }),
              (d += b),
              Laya.timer.once(d, this, function() {
                t.f_shengduan.visible = !0;
                var e = 2 == l.secondary_level ? t.stars[2] : t.stars[1],
                  i = game.FrontEffect.Inst.create_ui_effect(
                    e.parent,
                    'scene/effect_losestar.lh',
                    new Laya.Point(-0.5, 0),
                    1.2
                  );
                Laya.timer.once(100, t, function() {
                  e.alpha = 0;
                }),
                  Laya.timer.once(2e3, t, function() {
                    i.destory();
                  });
              }),
              (d += 1800);
            var w = (0.78 - c) / 3e-4;
            Laya.timer.once(d, this, function() {
              (_.scaleY = 0.78),
                Laya.Tween.to(_, { scaleY: c }, w),
                t.play_exp_audio(w);
            }),
              (d += w);
          }
          return (
            d >= 0 &&
              (Laya.timer.once(d, this, function() {
                Laya.Tween.to(t.scores, { alpha: 1 }, 150),
                  view.DesktopMgr.Inst.ptchange > 0 &&
                    ((t.label_add.text = view.DesktopMgr.Inst.ptchange.toString()),
                    (t.continue_add.visible = !0),
                    (t.continue_add.alpha = 0),
                    Laya.Tween.to(t.continue_add, { alpha: 1 }, 150)),
                  view.DesktopMgr.Inst.ptchange < 0 &&
                    ((t.label_minus.text = view.DesktopMgr.Inst.ptchange.toString()),
                    (t.continue_minus.visible = !0),
                    (t.continue_minus.alpha = 0),
                    Laya.Tween.to(t.continue_minus, { alpha: 1 }, 150));
              }),
              (d += 150)),
            d
          );
        }),
        (t.prototype.shengduanOver = function() {
          var t = view.DesktopMgr.Inst.levelchangeinfo,
            e = t.origin.id,
            i = t.origin.score,
            a = t.final.id,
            r = t.final.score,
            s = cfg.level_definition.level_definition.find(e),
            o = cfg.level_definition.level_definition.find(a),
            l = (s.end_point, (r / o.end_point) * 0.78);
          n.Inst.me, this.barval;
          if (
            ((this.f_jinji.visible = !1),
            (this.icon_old.visible = !0),
            (this.barshine.visible = !1),
            (this.icon_old.skin = game.LoadMgr.getResImageSkin(o.primary_icon)),
            10601 == a || 20601 == a)
          ) {
            for (h = 0; h < this.stars.length; h++)
              this.stars[h].parent.visible = !1;
            this.container_bar.visible = !1;
          } else {
            for (var h = 0; h < this.stars.length; h++)
              (this.stars[h].parent.visible = !0),
                (this.stars[h].visible = !0),
                (this.stars[h].alpha = h < o.secondary_level ? 1 : 0);
            this.container_bar.visible = !0;
          }
          (this.icon_new.visible = !1),
            (this.barval.scaleY = l),
            (this.scores.alpha = 1);
        }),
        (t.prototype.play_exp_audio = function(t) {
          var e = this;
          t < 0 ||
            (view.AudioMgr.PlayAudio(220),
            Laya.timer.once(150, this, function() {
              e.play_exp_audio(t - 150);
            }));
        }),
        t
      );
    })(),
    i = (function() {
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
      return (
        (t.prototype.show = function() {
          var t = this;
          (this.me.visible = !0),
            (this.black.visible = !0),
            (this.black.alpha = 0),
            this._ui.ani1.play(0, !1),
            (this.btn_open.visible = !1),
            Laya.timer.once(500, this, function() {
              view.AudioMgr.PlayAudio(105);
            }),
            Laya.timer.once(625, this, function() {
              (t.btn_open.visible = !0),
                (t._effect_book = game.FrontEffect.Inst.create_ui_effect(
                  t.book_shine,
                  'scene/effect_juanzhou.lh',
                  new Laya.Point(0, 0),
                  1
                )),
                Laya.timer.once(1e3, t, function() {
                  t.btn_open.clickHandler = Laya.Handler.create(t, t.openBook);
                });
            });
        }),
        (t.prototype.openBook = function() {
          var t = this;
          this._effect_book && this._effect_book.destory(),
            (this.container_main.visible = !0);
          var e = view.DesktopMgr.Inst.levelchangeinfo,
            i = e.final.id,
            n = (e.final.score, new Date());
          this.label_time.text =
            n.getFullYear() +
            '.' +
            (n.getMonth() + 1).toString() +
            '.' +
            n.getDate();
          var a = cfg.level_definition.level_definition.find(i),
            r = GameMgr.Inst.account_data.nickname;
          (this.label_name.text = r),
            (this.contianer_name.width =
              this.label_name.x + this.label_name.textWidth + 34),
            (this.call.x =
              30 + this.contianer_name.x + this.contianer_name.width),
            (this.rank.skin = game.LoadMgr.getResImageSkin(a.primary_icon)),
            this._ui.ani2.play(0, !1),
            (this.btn_close.clickHandler = null),
            Laya.timer.once((8 / 24) * 1e3, this, function() {
              view.AudioMgr.PlayAudio(228);
            });
          for (var s = [29, 43, 56, 104], o = 0; o < s.length; o++)
            Laya.timer.once((s[o] / 24) * 1e3, this, function() {
              view.AudioMgr.PlayAudio(104);
            });
          Laya.timer.once((88 / 24) * 1e3, this, function() {
            var e = game.FrontEffect.Inst.create_ui_effect(
              t.rank.parent,
              'scene/effect_queshi_bang.lh',
              new Laya.Point(0, 0),
              0
            );
            view.AudioMgr.PlayAudio(229),
              Laya.timer.once(1e3, t, function() {
                e.destory();
              });
          }),
            Laya.timer.once(
              this._ui.ani2.interval * this._ui.ani2.count,
              this,
              function() {
                t.btn_close.clickHandler = Laya.Handler.create(
                  t,
                  t.closeBook,
                  null,
                  !0
                );
              }
            );
        }),
        (t.prototype.closeBook = function() {
          var t = this;
          view.AudioMgr.PlayAudio(228),
            n.Inst.pagerank.shengduanOver(),
            (this.btn_close.visible = !1),
            this._ui.ani3.play(0, !1),
            Laya.timer.once(
              this._ui.ani3.interval * this._ui.ani3.count,
              this,
              function() {
                (t.me.visible = !1), n.Inst.AnimOver();
              }
            );
        }),
        t
      );
    })(),
    n = (function(n) {
      function a() {
        var t = n.call(this, new ui.mj.rankchangeUI()) || this;
        return (
          (t.atlas = 'res/atlas/myres/mjdesktop/shengduan.atlas'),
          (a.Inst = t),
          t
        );
      }
      return (
        __extends(a, n),
        (a.prototype.onCreate = function() {
          (this.pagerank = new e(this.me.getChildByName('rank_change'))),
            (this.pagerankup = new i(this.me.getChildByName('rankup'))),
            (this.pagerank.me.visible = !1),
            (this.pagerankup.me.visible = !1),
            Laya.loader.clearTextureRes(this.atlas);
        }),
        (a.prototype.show = function(e) {
          var i = this;
          (this.complete = e),
            (this.enable = !0),
            this.pagerank.showInit(),
            (this.pagerankup.me.visible = !1),
            Laya.timer.clearAll(this),
            t.UIBase.anim_alpha_in(this.pagerank.me, { x: 0 }, 100, 0),
            Laya.timer.once(500, this, function() {
              var t = i.pagerank.showLevelChange();
              t > 0 &&
                Laya.timer.once(t, i, function() {
                  i.AnimOver();
                });
            });
        }),
        (a.prototype.close = function() {
          (this.enable = !1), Laya.loader.clearTextureRes(this.atlas);
        }),
        (a.prototype.ShengDuan = function() {
          this.pagerankup.show();
        }),
        (a.prototype.AnimOver = function() {
          Laya.loader.clearTextureRes(this.atlas), this.complete.run();
        }),
        (a.Inst = null),
        a
      );
    })(t.UIBase);
  t.UI_RankChange = n;
})(uiscript || (uiscript = {}));