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
    class t {
      constructor(t, e, i) {
        this.me = t;
        this.anim_in = e;
        this.anim_out = i;
        this.img_title = this.me.getChildByName('img_title');
      }

      show(t) {
        this.img_title.skin = game.LoadMgr.getResImageSkin(
          cfg.achievement.achievement.find(t).icon
        );

        this.anim_in && this.anim_in.play(0, !1);
      }

      hide() {
        this.anim_out.play(0, !1);
      }
    }

    return t;
  })();

  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.mj.gameendUI()) || this;
        t.btn_next = null;
        t.players = [];
        t.root = null;
        t.illust = null;
        t.origin_illust_rect = null;
        t.step = 0;
        t.second_step = 0;
        t.locking = !1;
        t.page_gettitle = null;
        t.newachievements = [];
        t.duringshowing = !1;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var i = this;
        this.root = this.me.getChildByName('root');
        this.illust = this.root.getChildByName('illust');
        this.origin_illust_rect = t.UIRect.CreateFromSprite(this.illust);
        this.btn_next = this.root.getChildByName('btn_next');
        this.btn_next.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.onConfirm();
            },
            null,
            !1
          );
        for (var n = 0; n < 4; n++) {
          var a = this.me
            .getChildByName('root')
            .getChildByName(`p${n.toString()}`);
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
      }

      show() {
        var e = this,
          i = view.DesktopMgr.Inst.gameEndResult;
        t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2077));
        if (null == i)
          return void game.Scene_MJ.Inst.GameEnd();
        this.duringshowing = !0;
        this.page_gettitle.me.visible = !1;
        this.root.alpha = 0;
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
        );

        view.DesktopMgr.Inst.mode == view.EMJMode.play &&
          a.character &&
          Laya.timer.once(1800 + 800 * n.length - 500, this, () => {
            view.AudioMgr.PlayCharactorSound(a.character, 'game_top');
          });
        for (
          var r = e => {
            var i = n[e],
              a = s.players[e];
            a.label_g0.text = `+${i.gold}`;
            a.label_g0.text = i.gold.toString();

            i.gold >= 0
              ? (a.label_g0.color = '#4ea583')
              : (a.label_g0.color = '#ff3451');

            a.label_g1.text = `+${i.grading_score}`;
            a.label_g1.text = i.grading_score;

            i.grading_score >= 0
              ? (a.label_g1.color = '#4ea583')
              : (a.label_g1.color = '#ff3451');

            a.label_g1.text =
                (i.grading_score >= 0 ? '+' : '') + i.grading_score;

            a.label_name.text =
                view.DesktopMgr.Inst.player_datas[i.seat].nickname;

            a.head.id =
                view.DesktopMgr.Inst.player_datas[i.seat].avatar_id;

            a.head.head_frame =
                view.DesktopMgr.Inst.player_datas[i.seat].avatar_frame;
            var r = i.total_point / 1e3;
            a.label_score.text = `+${r.toString()}`;
            a.label_score.text = r.toString();
            r > 0
              ? (a.label_score.color = '#45c36a')
              : (a.label_score.color = '#f94538');
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

              c.skin =
                '-' == u
                  ? game.Tools.localUISrc('myres/mjdesktop/ww_minus.png')
                  : game.Tools.localUISrc(
                      `myres/mjdesktop/ww_${u}.png`
                    );

              c.visible = !0;
            }
            a.root.visible = !1;
            a.img_mySelf.visible = i.seat == view.DesktopMgr.Inst.seat;

            i.seat == view.DesktopMgr.Inst.seat &&
              (view.DesktopMgr.Inst.ptchange = i.grading_score);

            Laya.timer.once(1800 + 800 * e, s, () => {
              a.root.visible = !0;

              t.UIBase.anim_alpha_in(
                a.root,
                { x: -200 },
                200,
                0,
                null,
                Laya.Ease.strongIn
              );

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
        this.locking = !0;
        this.btn_next.visible = !1;

        Laya.timer.once(1800 + 800 * n.length, this, () => {
          e.locking = !1;
          e.btn_next.visible = !0;
        });

        this.enable = !0;
        Laya.timer.once(3500, this, GameMgr.Inst.updateAccountInfo);

        4 == view.DesktopMgr.Inst.game_config.category &&
          Laya.timer.once(1100, this, () => {
            GameMgr.Inst.custom_match_id =
              view.DesktopMgr.Inst.game_config.meta.contest_uid;
          });

        view.DesktopMgr.Inst.mode == view.EMJMode.play &&
          (t.UI_PaiPu.reset());

        this.step = 0;
      }

      onConfirm() {
        var e = this;
        this.step = 30;
        this.step = 50;
        t.UI_RankChange.Inst.close();
        this.step = 50;
        this.btn_next.visible = !1;
        this.step = 60;
        t.UI_MJReward.Inst.close();
        this.step = 60;
        this.step = 81;
        this.enable = !1;
        Laya.loader.clearTextureRes(this.illust.skin);
        if (!this.locking)
          if (0 == this.step) this.onConfirm();
          else if (30 == this.step)
            if (view.DesktopMgr.Inst.levelchangeinfo) {
              var i = !1,
                n = view.DesktopMgr.Inst.game_config;
              if (2 == n.category) {
                var a = n.meta;
                if (a) {
                  var r = cfg.desktop.matchmode.get(a.mode_id);
                  r && (i = 100 == r.room || 200 == r.room);
                }
              }
              this.step = 50;
              this.btn_next.visible = !1;
              i
                ? (this.onConfirm())
                : (this.closeRankList(
                Laya.Handler.create(this, () => {
                  t.UI_RankChange.Inst.show(
                    Laya.Handler.create(e, () => {
                      e.step = 31;
                      e.btn_next.visible = !0;
                    })
                  );
                })
              ));
            } else this.onConfirm();
          else if (31 == this.step)
            this.onConfirm();
          else if (50 == this.step)
            view.DesktopMgr.Inst.rewardinfo &&
            view.DesktopMgr.Inst.rewardinfo.match_chest
              ? (this.closeRankList(
              Laya.Handler.create(this, () => {
                t.UI_MJReward.Inst.show(
                  Laya.Handler.create(e, () => {
                    e.step = 51;
                    e.btn_next.visible = !0;
                  })
                );
              })
            ))
              : (this.onConfirm());
          else if (51 == this.step)
            this.onConfirm();
          else if (60 == this.step) {
            var s = t.UI_MJTask_Progress.needShow();
            app.Log.log(`pengding need show lst:${s.length}`);
            this.step = 70;
            if (
              (s.length > 0)
            ) {
              var o = 0,
                l = this,
                h = () => {
                  l.btn_next.visible = !1;
                  l.closeRankList(
                    Laya.Handler.create(l, () => {
                      o = t.UI_MJTask_Progress.Inst.show(
                        s,
                        o,
                        Laya.Handler.create(l, () => {
                          l.btn_next.visible = !0;
                          l.step = 70;
                          o < s.length
                            ? (l.btn_next.clickHandler = new Laya.Handler(
                                l,
                                () => {
                                  h();
                                }
                              ))
                            : (l.btn_next.clickHandler = new Laya.Handler(
                                l,
                                () => {
                                  l.onConfirm();
                                }
                              ));
                        })
                      );
                    })
                  );
                };
              h();
            } else this.onConfirm();
          } else if (70 == this.step) {
            var c = view.DesktopMgr.Inst.activity_reward;
            this.btn_next.visible = !1;
            this.step = 80;
            c && c.activity_reward && c.activity_reward.length > 0
              ? (this.closeRankList(
              Laya.Handler.create(this, () => {
                t.UI_MJReward_Activity.Inst.show(
                  c,
                  Laya.Handler.create(e, () => {
                    e.step = 80;
                    e.btn_next.visible = !0;
                  })
                );
              })
            ))
              : (this.onConfirm());
          } else
            80 == this.step
              ? (this.onConfirm())
              : 81 == this.step &&
                (game.Scene_MJ.Inst.GameEnd());
      }

      forceclose() {
        this.enable = !1;
        Laya.timer.clearAll(this);
      }

      closeRankList(e) {
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
            Laya.Handler.create(this, () => {
              Laya.loader.clearTextureRes(i.illust.skin);

              game.Tools.charaPart(
                GameMgr.Inst.account_data.avatar_id,
                i.illust,
                'full',
                i.origin_illust_rect
              );

              i.illust.getChildAt(0).visible = !1;
              t.UIBase.anim_alpha_in(i.illust, {}, 200, 100);
            })
          );

          view.AudioMgr.PlayAudio(228);
          Laya.timer.once(500, this, () => {
            e.run();
          });
        } else e.run();
      }
    }

    __extends(n, i);

    n.Inst = null;
    return n;
  })(t.UIBase);

  t.UI_GameEnd = i;
})(uiscript || (uiscript = {}));