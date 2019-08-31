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
      function t(t, e, i) {
        (this.me = t),
          (this.anim_in = e),
          (this.anim_out = i),
          (this.img_title = this.me.getChildByName('img_title'));
      }
      return (
        (t.prototype.show = function(t) {
          (this.img_title.skin = game.LoadMgr.getResImageSkin(
            cfg.achievement.achievement.find(t).icon
          )),
            this.anim_in && this.anim_in.play(0, !1);
        }),
        (t.prototype.hide = function() {
          this.anim_out.play(0, !1);
        }),
        t
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.mj.gameendUI()) || this;
        return (
          (t.btn_next = null),
          (t.players = []),
          (t.root = null),
          (t.illust = null),
          (t.origin_illust_rect = null),
          (t.step = 0),
          (t.second_step = 0),
          (t.locking = !1),
          (t.page_gettitle = null),
          (t.newachievements = []),
          (t.duringshowing = !1),
          (n.Inst = t),
          t
        );
      }
      return (
        __extends(n, i),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.root = this.me.getChildByName('root')),
            (this.illust = this.root.getChildByName('illust')),
            (this.origin_illust_rect = t.UIRect.CreateFromSprite(this.illust)),
            (this.btn_next = this.root.getChildByName('btn_next')),
            (this.btn_next.clickHandler = Laya.Handler.create(
              this,
              function() {
                i.onConfirm();
              },
              null,
              !1
            ));
          for (var n = 0; n < 4; n++) {
            var a = this.me
              .getChildByName('root')
              .getChildByName('p' + n.toString());
            this.players.push({
              root: a,
              label_name: a.getChildByName('label_name'),
              label_score: a.getChildByName('val'),
              container_score: a.getChildByName('container_score'),
              label_g0: a.getChildByName('img_g0').getChildByName('val'),
              label_g1: a.getChildByName('img_g1').getChildByName('val'),
              x: a.x,
              img_mySelf: a.getChildByName('myself'),
              head: new t.UI_Head(a.getChildByName('head'))
            });
          }
          this.page_gettitle = new e(
            this.root.getChildByName('gettitle'),
            this.me.title_in,
            this.me.title_out
          );
        }),
        (n.prototype.show = function() {
          var e = this,
            i = view.DesktopMgr.Inst.gameEndResult;
          if (null == i)
            return (
              t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2077)),
              void game.Scene_MJ.Inst.GameEnd()
            );
          (this.duringshowing = !0),
            (this.page_gettitle.me.visible = !1),
            (this.root.alpha = 0),
            Laya.Tween.to(this.root, { alpha: 1 }, 1e3);
          for (o = 0; o < this.players.length; o++)
            this.players[o].root.visible = !1;
          var n = [];
          n = i.players;
          var a = view.DesktopMgr.Inst.player_datas[n[0].seat];
          game.Tools.charaPart(
            a.avatar_id,
            this.illust,
            'full',
            this.origin_illust_rect
          ),
            view.DesktopMgr.Inst.mode == view.EMJMode.play &&
              a.character &&
              Laya.timer.once(1800 + 800 * n.length - 500, this, function() {
                view.AudioMgr.PlayCharactorSound(a.character, 'game_top');
              });
          for (
            var r = function(e) {
                var i = n[e],
                  a = s.players[e];
                i.gold >= 0
                  ? ((a.label_g0.text = '+' + i.gold),
                    (a.label_g0.color = '#4ea583'))
                  : ((a.label_g0.text = i.gold.toString()),
                    (a.label_g0.color = '#ff3451')),
                  i.grading_score >= 0
                    ? ((a.label_g1.text = '+' + i.grading_score),
                      (a.label_g1.color = '#4ea583'))
                    : ((a.label_g1.text = i.grading_score),
                      (a.label_g1.color = '#ff3451')),
                  (a.label_g1.text =
                    (i.grading_score >= 0 ? '+' : '') + i.grading_score),
                  (a.label_name.text =
                    view.DesktopMgr.Inst.player_datas[i.seat].nickname),
                  (a.head.id =
                    view.DesktopMgr.Inst.player_datas[i.seat].avatar_id);
                var r = i.total_point / 1e3;
                r > 0
                  ? ((a.label_score.text = '+' + r.toString()),
                    (a.label_score.color = '#45c36a'))
                  : ((a.label_score.text = r.toString()),
                    (a.label_score.color = '#f94538'));
                for (
                  var o = i.part_point_1.toString(), l = 0;
                  l < a.container_score.numChildren;
                  l++
                )
                  a.container_score.getChildAt(l).visible = !1;
                for (
                  var h = 0;
                  h < o.length && h < a.container_score.numChildren;
                  h++
                ) {
                  var c = a.container_score.getChildByName(
                      (a.container_score.numChildren - 1 - h).toString()
                    ),
                    u = o.charAt(h);
                  (c.skin =
                    '-' == u
                      ? game.Tools.localUISrc('myres/mjdesktop/ww_minus.png')
                      : game.Tools.localUISrc(
                          'myres/mjdesktop/ww_' + u + '.png'
                        )),
                    (c.visible = !0);
                }
                (a.root.visible = !1),
                  (a.img_mySelf.visible = i.seat == view.DesktopMgr.Inst.seat),
                  i.seat == view.DesktopMgr.Inst.seat &&
                    (view.DesktopMgr.Inst.ptchange = i.grading_score),
                  Laya.timer.once(1800 + 800 * e, s, function() {
                    (a.root.visible = !0),
                      t.UIBase.anim_alpha_in(
                        a.root,
                        { x: -200 },
                        200,
                        0,
                        null,
                        Laya.Ease.strongIn
                      ),
                      0 == e
                        ? view.AudioMgr.PlayAudio(218)
                        : view.AudioMgr.PlayAudio(219);
                  });
              },
              s = this,
              o = 0;
            o < n.length;
            o++
          )
            r(o);
          (this.locking = !0),
            (this.btn_next.visible = !1),
            Laya.timer.once(1800 + 800 * n.length, this, function() {
              (e.locking = !1), (e.btn_next.visible = !0);
            }),
            (this.enable = !0),
            view.DesktopMgr.Inst.mode == view.EMJMode.play &&
              (Laya.timer.once(3500, this, GameMgr.Inst.updateAccountInfo),
              4 == view.DesktopMgr.Inst.game_config.category &&
                Laya.timer.once(1100, this, function() {
                  GameMgr.Inst.custom_match_id =
                    view.DesktopMgr.Inst.game_config.meta.contest_uid;
                }),
              t.UI_PaiPu.reset()),
            (this.step = 0);
        }),
        (n.prototype.onConfirm = function() {
          var e = this;
          if (!this.locking)
            if (0 == this.step) (this.step = 30), this.onConfirm();
            else if (30 == this.step)
              view.DesktopMgr.Inst.levelchangeinfo
                ? ((this.btn_next.visible = !1),
                  this.closeRankList(
                    Laya.Handler.create(this, function() {
                      t.UI_RankChange.Inst.show(
                        Laya.Handler.create(e, function() {
                          (e.step = 31), (e.btn_next.visible = !0);
                        })
                      );
                    })
                  ))
                : ((this.step = 50), this.onConfirm());
            else if (31 == this.step)
              t.UI_RankChange.Inst.close(), (this.step = 50), this.onConfirm();
            else if (50 == this.step)
              view.DesktopMgr.Inst.rewardinfo &&
              view.DesktopMgr.Inst.rewardinfo.match_chest
                ? ((this.btn_next.visible = !1),
                  this.closeRankList(
                    Laya.Handler.create(this, function() {
                      t.UI_MJReward.Inst.show(
                        Laya.Handler.create(e, function() {
                          (e.step = 51), (e.btn_next.visible = !0);
                        })
                      );
                    })
                  ))
                : ((this.step = 60), this.onConfirm());
            else if (51 == this.step)
              t.UI_MJReward.Inst.close(), (this.step = 60), this.onConfirm();
            else if (60 == this.step) {
              var i = t.UI_MJTask_Progress.needShow();
              app.Log.log('pengding need show lst:' + i.length),
                i.length > 0
                  ? ((this.btn_next.visible = !1),
                    this.closeRankList(
                      Laya.Handler.create(this, function() {
                        t.UI_MJTask_Progress.Inst.show(
                          i,
                          Laya.Handler.create(e, function() {
                            (e.step = 70), (e.btn_next.visible = !0);
                          })
                        );
                      })
                    ))
                  : ((this.step = 70), this.onConfirm());
            } else if (70 == this.step) {
              var n = view.DesktopMgr.Inst.activity_reward;
              n && n.activity_reward && n.activity_reward.length > 0
                ? ((this.btn_next.visible = !1),
                  this.closeRankList(
                    Laya.Handler.create(this, function() {
                      t.UI_MJReward_Activity.Inst.show(
                        n,
                        Laya.Handler.create(e, function() {
                          (e.step = 80), (e.btn_next.visible = !0);
                        })
                      );
                    })
                  ))
                : ((this.step = 80), this.onConfirm());
            } else
              80 == this.step
                ? ((this.step = 81), this.onConfirm())
                : 81 == this.step &&
                  ((this.enable = !1),
                  Laya.loader.clearTextureRes(this.illust.skin),
                  game.Scene_MJ.Inst.GameEnd());
        }),
        (n.prototype.forceclose = function() {
          (this.enable = !1), Laya.timer.clearAll(this);
        }),
        (n.prototype.closeRankList = function(e) {
          var i = this;
          if (this.duringshowing) {
            this.duringshowing = !1;
            for (var n = 0; n < this.players.length; n++)
              t.UIBase.anim_alpha_out(
                this.players[n].root,
                { x: 100 },
                200,
                0,
                null,
                Laya.Ease.backIn
              );
            t.UIBase.anim_alpha_out(
              this.illust,
              {},
              200,
              0,
              Laya.Handler.create(this, function() {
                Laya.loader.clearTextureRes(i.illust.skin),
                  game.Tools.charaPart(
                    GameMgr.Inst.account_data.avatar_id,
                    i.illust,
                    'full',
                    i.origin_illust_rect
                  ),
                  (i.illust.getChildAt(0).visible = !1),
                  t.UIBase.anim_alpha_in(i.illust, {}, 200, 100);
              })
            ),
              view.AudioMgr.PlayAudio(228),
              Laya.timer.once(500, this, function() {
                e.run();
              });
          } else e.run();
        }),
        (n.Inst = null),
        n
      );
    })(t.UIBase);
  t.UI_GameEnd = i;
})(uiscript || (uiscript = {}));