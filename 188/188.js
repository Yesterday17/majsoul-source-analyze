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
    function e(e) {
      var i = this;
      this.money = null;
      this.rank = null;
      this.small_rank = null;
      this.rank_show_type = 0;
      this.me = e;
      var n = e.getChildByName('container_name');
      this.label_name = n.getChildByName('label_name');
      this.rank = new t.UI_Level(n.getChildByName('rank'));
      this.title = new t.UI_PlayerTitle(n.getChildByName('img_title'));

      this.small_rank = new t.UI_Level(
          n.getChildByName('btn_small_rank')
        );

      this.money = new t.UI_Money(
          e,
          Laya.Handler.create(h.Inst, h.Inst.Hide, null, !1),
          Laya.Handler.create(
            this,
            () => h.Inst.locking,
            null,
            !1
          )
        );

      n.getChildByName('btn_info').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_PlayerInfo.Inst.show();
            GameMgr.Inst.BehavioralStatistics(13);
          },
          null,
          !1
        );

      e.getChildByName('btn_activity').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_Activity.Inst.show();
            h.Inst.locking ||
              (GameMgr.Inst.BehavioralStatistics(18));
          },
          null,
          !1
        );

      e.getChildByName('btn_rank').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_Rank.Inst.show();
            h.Inst.locking ||
              (GameMgr.Inst.BehavioralStatistics(18));
          },
          null,
          !1
        );

      e.getChildByName('btn_info').clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.locking || t.UI_Info.Inst.show();
          },
          null,
          !1
        );

      e.getChildByName('btn_set').clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.locking || t.UI_Config.Inst.show();
          },
          null,
          !1
        );

      e.getChildByName('btn_help').clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.locking || t.UI_Rules.Inst.show();
          },
          null,
          !1
        );

      e.getChildByName(
          'btn_xinshouyindao'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.locking ||
              (t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : h.Inst.Hide(
                    Laya.Handler.create(i, () => {
                      t.UI_XinShouYinDao.Inst.show(
                        0,
                        Laya.Handler.create(i, () => {
                          h.Inst.enable = !0;
                        })
                      );
                    })
                  ));
          },
          null,
          !1
        );

      n.getChildByName('btn_small_rank').clickHandler = new Laya.Handler(
          this,
          () => {
            0 == i.rank_show_type
                ? (i.rank_show_type = 1)
                : (i.rank_show_type = 0);

            i.show_rank();
            h.Inst.locking ||
              (Laya.LocalStorage.setItem(
              'rank_show_type',
              i.rank_show_type.toString()
            ));
          }
        );
      var a = Laya.LocalStorage.getItem('rank_show_type');
      this.rank_show_type = '1' == a ? 1 : 0;
    }

    e.prototype.refresh = function() {
      var t = GameMgr.Inst.account_data;
      this.label_name.text = t.nickname;
      this.title.id = t.title;
      this.show_rank();
      this.money.onEnable();
      this.refreshRedpoint();
    };

    e.prototype.refreshRedpoint = function() {
      this.me
        .getChildByName('btn_activity')
        .getChildByName('redpoint').visible =
        t.UI_Mail.haveRedPoint || t.UI_Activity.haveRedPoint;

      this.me
          .getChildByName('btn_info')
          .getChildByName('redpoint').visible = t.UI_Info.haveRedPoint;

      this.me
          .getChildByName('btn_set')
          .getChildByName(
            'redpoint'
          ).visible = t.UI_Config.have_redpoint();
    };

    e.prototype.show_rank = function() {
      var t = 'level',
        e = 'level3';
      t = 'level3';
      1 == this.rank_show_type && ((e = 'level'));
      this.rank.id = GameMgr.Inst.account_data[t].id;
      this.small_rank.id = GameMgr.Inst.account_data[e].id;
    };

    return e;
  })();

  var i = (() => {
    function e(t) {
      this.me = t;
      this.btn_dajiangsai = t.getChildByName('btn_dajiangsai');
      this.btn_yibanchang = t.getChildByName('btn_yibanchang');
      this.btn_yourenfang = t.getChildByName('btn_yourenfang');

      this.btn_yibanchang.clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.setPage(1);
            GameMgr.Inst.BehavioralStatistics(1);
          },
          null,
          !1
        );

      this.btn_yourenfang.clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.setPage(2);
            GameMgr.Inst.BehavioralStatistics(2);
          },
          null,
          !1
        );

      this.btn_dajiangsai.clickHandler = Laya.Handler.create(
          this,
          () => {
            GameMgr.Inst.BehavioralStatistics(3);
            h.Inst.setPage(3);
          },
          null,
          !1
        );
    }

    e.prototype.onEnable = function(e) {
      var i = this;
      this.btn_yibanchang.visible = !1;
      this.btn_dajiangsai.visible = !1;
      this.btn_yourenfang.visible = !1;
      this.btn_yibanchang.alpha = 1;
      this.btn_dajiangsai.alpha = 1;
      this.btn_yourenfang.alpha = 1;

      Laya.timer.once(e, this, () => {
        view.AudioMgr.PlayAudio(104);
        i.btn_yibanchang.x = 700;
        i.btn_yibanchang.y = 405;
        i.btn_yibanchang.scaleX = 0.2;
        i.btn_yibanchang.scaleY = 0.2;
        i.btn_yibanchang.visible = !0;
        i.btn_yibanchang.alpha = 0;
        Laya.Tween.to(
          i.btn_yibanchang,
          { x: 1183, y: 368, scaleX: 1.2, scaleY: 1.2, alpha: 1 },
          233,
          (t, e, i, n) => Laya.Ease.backOut(t, e, i, n, 1)
        );
      });

      Laya.timer.once(e + 100, this, () => {
        view.AudioMgr.PlayAudio(104);
        i.btn_dajiangsai.x = 700;
        i.btn_dajiangsai.y = 530;
        i.btn_dajiangsai.scaleX = 0.2;
        i.btn_dajiangsai.scaleY = 0.2;
        i.btn_dajiangsai.visible = !0;
        i.btn_dajiangsai.alpha = 0;
        Laya.Tween.to(
          i.btn_dajiangsai,
          { x: 1110, y: 547, scaleX: 1.2, scaleY: 1.2, alpha: 1 },
          233,
          (t, e, i, n) => Laya.Ease.backOut(t, e, i, n, 1)
        );
      });

      Laya.timer.once(e + 200, this, () => {
        view.AudioMgr.PlayAudio(104);
        i.btn_yourenfang.x = 700;
        i.btn_yourenfang.y = 634;
        i.btn_yourenfang.scaleX = 0.2;
        i.btn_yourenfang.scaleY = 0.2;
        i.btn_yourenfang.visible = !0;
        i.btn_yourenfang.alpha = 0;
        Laya.Tween.to(
          i.btn_yourenfang,
          { x: 1123, y: 736, scaleX: 1.2, scaleY: 1.2, alpha: 1 },
          233,
          (t, e, i, n) => Laya.Ease.backOut(t, e, i, n, 1)
        );
      });
      var n = !1,
        a = cfg.desktop.matchmode.get(33);
      if (t.UI_Activity.activity_is_running(a.activity_id)) {
        var r = Laya.LocalStorage.getItem(
            `art0_10133_${GameMgr.Inst.account_id}`
          ),
          s = 0;
        r && '' != r && (s = parseInt(r));
        n = Date.now() > s + 864e6;
      }
      this.btn_dajiangsai.getChildByName('redpoint').visible = n;
      this.me.visible = !0;
    };

    e.prototype.onDisable = function(e) {
      var i = this;

      t.UIBase.anim_alpha_out(
        this.btn_yibanchang,
        { x: -500, y: 450, scaleX: -1, scaleY: -1 },
        200,
        e,
        null,
        Laya.Ease.backIn
      );

      t.UIBase.anim_alpha_out(
        this.btn_dajiangsai,
        { x: -500, y: 150, scaleX: -1, scaleY: -1 },
        200,
        e,
        null,
        Laya.Ease.backIn
      );

      t.UIBase.anim_alpha_out(
        this.btn_yourenfang,
        { x: -500, y: -150, scaleX: -1, scaleY: -1 },
        200,
        e,
        null,
        Laya.Ease.backIn
      );

      Laya.timer.once(200 + e, this, () => {
        i.me.visible = !1;
      });
    };

    return e;
  })();

  var n = (() => {
    class t {
      constructor(t) {
        var e = this;
        this.me = t;
        this.me.visible = !1;
        this.btn_back = t.getChildByName('btn_back');

        this.btn_back.clickHandler = new Laya.Handler(this, () => {
            e.func_back && e.func_back.run();
          });

        this.title = t.getChildByName('title');
      }

      show(t, e) {
        this.title.text = t;

        game.Tools.labelLocalizationPosition(
          this.title,
          345,
          this.title.width,
          !0
        );

        this.func_back = e;
        this.me.visible = !0;

        this.me.visible ||
          (h.Inst.me.page_title_in.play(0, !1));

        Laya.timer.clearAll(this);
      }

      close() {
        var t = this;
        h.Inst.me.page_title_out.play(0, !1);
        this.me.visible &&
          (Laya.timer.once(200, this, () => {
          t.me.visible = !1;
        }));
      }
    }

    return t;
  })();

  var a = (() => {
    function e(e) {
      var i = this;
      this.locking = !1;
      this.me = e;
      this.me.visible = !1;
      this.p0 = e.getChildByName('p0');
      this.p0.getChildByName('content').vScrollBar.visible = !1;
      this.content0 = this.p0.getChildByName('content');
      for (
        var n = GameMgr.Inst.account_data,
          a = e => {
            var a = r.p0.getChildByName('content').getChildByName(`btn${e}`),
              s = a.getChildByName('container'),
              o = s.getChildByName('btn'),
              l = a.getChildByName('stop'),
              c = 0;
            c = e < 4 ? 1 + 3 * e : 15;
            var u = cfg.desktop.matchmode.find(c);
            o.mouseEnabled = !0;
            s.filters = [];
            l.visible = !1;
            o.mouseEnabled = !1;
            s.filters = [new Laya.ColorFilter(t.GRAY_FILTER)];

            u.is_open
              ? (o.clickHandler = Laya.Handler.create(
                  r,
                  () => {
                    if (!i.locking) {
                      var a = !0,
                        r = '';
                      a = !1;
                      a &&
                        !u.is_open &&
                        ((r = game.Tools.strOfLocalization(1306)));
                      var s = !0,
                        o = !0,
                        l = !0,
                        c = !0,
                        _ = !0,
                        d = !0,
                        f = n.level.id,
                        p = n.level3.id,
                        m = n.gold;

                      cfg.desktop.matchmode.forEach(t => {
                        var i = e + 1;
                        5 == i && (i = 6);

                        (!t.glimit_floor || m >= t.glimit_floor) &&
                            (_ = !1);

                        (-1 == t.glimit_ceil || m <= t.glimit_ceil) &&
                          (d = !1);

                        (!t.level_limit || f >= t.level_limit) &&
                              (s = !1);

                        (!t.level_limit || p >= t.level_limit) &&
                              (l = !1);

                        t.room == i &&
                          ((t.mode < 10 ? (!t.level_limit_ceil ||
                          f <= t.level_limit_ceil) &&
                          (o = !1) : (!t.level_limit_ceil ||
                          p <= t.level_limit_ceil) &&
                          (c = !1)));
                      });

                      a = !1;
                      a = !1;
                      a = !1;

                      (s || o) && (l || c)
                        ? (r = game.Tools.strOfLocalization(103))
                        : _
                        ? (r = game.Tools.strOfLocalization(101))
                        : d &&
                          ((r = game.Tools.strOfLocalization(102)));

                      i.close();
                      a
                        ? (Laya.timer.once(100, i, () => {
                        h.Inst.page_east_north.show(u.room);
                      }))
                        : t.UIMgr.Inst.ShowErrorInfo(r);
                    }
                  },
                  null,
                  !1
                ))
              : (l.visible = !0);

            s.getChildByName(
                'btn_tips'
              ).clickHandler = Laya.Handler.create(
                r,
                () => {
                  i.locking ||
                    t.UI_InfoLite.Inst.show(
                      game.Tools.strOfLocalization(e < 4 ? 4 + e : 64)
                    );
                },
                null,
                !1
              );
          },
          r = this,
          s = 0;
        s < 5;
        s++
      )
        a(s);
    }

    e.prototype.show = function() {
      var t = this;
      this.content0.vScrollBar.value = 0;
      view.AudioMgr.PlayAudio(102);
      this.me.visible = !0;
      this.locking = !0;

      h.Inst.page_title.show(
        game.Tools.strOfLocalization(2079),
        Laya.Handler.create(
          this,
          () => {
            t.locking || h.Inst.setPage(0);
          },
          null,
          !1
        )
      );

      this.p0.alpha = 1;
      this.p0.visible = !1;
      for (var e = 0; e < 5; e++)
        this.p0
          .getChildByName('content')
          .getChildByName(`btn${e}`).alpha = 1;

      Laya.timer.once(100, this, () => {
        t.p0.visible = !0;
        h.Inst.me.rank_in.play(0, !1);
      });

      Laya.timer.once(300, this, () => {
        t.locking = !1;
      });
    };

    e.prototype.close = function() {
      var t = this;
      this.locking = !0;
      h.Inst.me.rank_out.play(0, !1);
      this.me.visible &&
        (Laya.timer.once(200, this, () => {
        t.me.visible = !1;
        t.locking = !1;
        Laya.timer.clearAll(t);
      }));
    };

    return e;
  })();

  var r = (() => {
    function e(e) {
      var i = this;
      this.locking = !1;
      this.me = e;
      this.me.visible = !1;

      this.btn_create_room = e
          .getChildByName('content')
          .getChildByName('btn0')
          .getChildByName('btn');

      e
          .getChildByName('content')
          .getChildByName('btn0')
          .getChildByName('btn_tips').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(8));
            GameMgr.Inst.BehavioralStatistics(10);
          },
          null,
          !1
        );

      this.btn_add_room = e
          .getChildByName('content')
          .getChildByName('btn1')
          .getChildByName('btn');

      e
          .getChildByName('content')
          .getChildByName('btn1')
          .getChildByName('btn_tips').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(9));
          },
          null,
          !1
        );

      this.btn_create_room.clickHandler = Laya.Handler.create(
          this,
          () => {
            h.Inst.locking ||
              (t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : h.Inst.Hide(
                    Laya.Handler.create(i, () => {
                      t.UI_Create_Room.Show();
                    })
                  ));
          },
          null,
          !1
        );

      this.btn_add_room.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_NumberInput.Inst.show(
                  game.Tools.strOfLocalization(2080),
                  Laya.Handler.create(i, e => {
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'joinRoom',
                      { room_id: e },
                      (e, i) => {
                        h.Inst.enable = !1;
                        t.UI_WaitingRoom.Inst.updateData(i.room);
                        e || i.error
                          ? t.UIMgr.Inst.showNetReqError('joinRoom', e, i)
                          : (t.UIMgr.Inst.ShowWaitingRoom());
                      }
                    );
                  }),
                  null
                );

            t.UI_PiPeiYuYue.Inst.enable
              ? t.UI_Popout.PopOutNoTitle(
                  game.Tools.strOfLocalization(204),
                  null
                )
              : (GameMgr.Inst.BehavioralStatistics(11));
          },
          null,
          !1
        );

      e
          .getChildByName('content')
          .getChildByName('btn0')
          .getChildByName('del').visible = !1;

      'chs' != GameMgr.client_language &&
        ((e
          .getChildByName('content')
          .getChildByName('btn1')
          .getChildByName('del').visible = !1));
    }

    e.prototype.show = function() {
      var t = this;

      h.Inst.page_title.show(
        game.Tools.strOfLocalization(2023),
        Laya.Handler.create(
          this,
          () => {
            t.locking || h.Inst.setPage(0);
          },
          null,
          !1
        )
      );

      this.btn_add_room.alpha = 1;
      this.btn_create_room.alpha = 1;
      this.btn_create_room.visible = !0;
      this.btn_add_room.visible = !0;
      this.me.visible = !0;
      view.AudioMgr.PlayAudio(102);
      h.Inst.me.friend_in.play(0, !1);
      Laya.timer.once(150, this, () => {
        t.locking = !1;
      });
    };

    e.prototype.close = function() {
      var t = this;
      this.locking = !0;
      h.Inst.me.friend_out.play(0, !1);
      this.me.visible &&
        (Laya.timer.once(200, this, () => {
        t.locking = !1;
        t.me.visible = !1;
      }));
    };

    return e;
  })();

  var s = (() => {
    function e(t) {
      var e = this;
      this.btns = [];
      this.infos = [];
      this.me = t;
      t.visible = !1;
      this.content = t.getChildByName('content');
      for (
        var i = t => {
          var i = n.content.getChildByName(`btn${t}`);
          n.btns.push(i);

          i
              .getChildByName('container')
              .getChildByName('btn').clickHandler = Laya.Handler.create(
              n,
              () => {
                e.onClickAt(t);
                h.Inst.locking ||
                  e.locking ||
                  ((i.getChildByName('redpoint').visible = !1));
              },
              null,
              !1
            );

          i
              .getChildByName('container')
              .getChildByName(
                'btn_tips'
              ).clickHandler = Laya.Handler.create(
              n,
              () => {
                h.Inst.locking || e.locking || e.onShowInfo(t);
              },
              null,
              !1
            );
        },
          n = this,
          a = 0;
        a < 4;
        a++
      )
        i(a);
    }

    e.prototype.show = function() {
      var e = this;

      h.Inst.page_title.show(
        game.Tools.strOfLocalization(2025),
        Laya.Handler.create(
          this,
          () => {
            e.locking || h.Inst.setPage(0);
          },
          null,
          !1
        )
      );

      this.infos = [];
      this.infos.push('dahuishi');
      this.infos.push('xiuxianchang');
      o = cfg.desktop.matchmode.get(33);
      t.UI_Activity.activity_is_running(o.activity_id) &&
        this.infos.push('dora3');
      for (var i = 0; i < this.btns.length; i++)
        if (i < this.infos.length) {
          this.btns[i].alpha = 1;
          this.btns[i].visible = !0;
          var n = this.btns[i].getChildByName('redpoint'),
            a = this.btns[i]
              .getChildByName('container')
              .getChildByName('tips'),
            r = this.btns[i]
              .getChildByName('container')
              .getChildByName('name');
          n.visible = !1;
          a.text = game.Tools.strOfLocalization(2471);
          n.visible = !1;
          a.text = game.Tools.strOfLocalization(2471);
          if ('dahuishi' == this.infos[i])
            r.skin = game.Tools.localUISrc(
                'myres/lobby/w_saishidating.png'
              );
          else if ('xiuxianchang' == this.infos[i])
            r.skin = game.Tools.localUISrc('myres/lobby/w_xiuxian.png');
          else if ('dora3' == this.infos[i]) {
            var s = !1,
              o = cfg.desktop.matchmode.get(33);
            if (t.UI_Activity.activity_is_running(o.activity_id)) {
              var l = Laya.LocalStorage.getItem(
                  `art0_10133_${GameMgr.Inst.account_id}`
                ),
                c = 0;
              l && '' != l && (c = parseInt(l));
              s = Date.now() > c + 864e6;
            }
            n.visible = s;
            a.text = game.Tools.strOfLocalization(2774);
            r.skin = game.Tools.localUISrc('myres/lobby/w_dora3.png');
          }
        } else this.btns[i].visible = !1;
      this.locking = !0;
      view.AudioMgr.PlayAudio(102);
      this.me.visible = !0;
      h.Inst.me[`match_in${this.infos.length}`].play(0, !1);
      Laya.timer.once(150, this, () => {
        e.locking = !1;
      });
    };

    e.prototype.close = function() {
      var t = this;
      h.Inst.me.match_out.play(0, !1);
      this.me.visible &&
        (Laya.timer.once(200, this, () => {
        t.me.visible = !1;
      }));
    };

    e.prototype.onClickAt = function(e) {
      var i = this.infos[e];
      if ('dahuishi' == i) {
        if (t.UI_PiPeiYuYue.Inst.enable)
          return void t.UI_Popout.PopOutNoTitle(
            game.Tools.strOfLocalization(204),
            null
          );
        h.Inst.Hide(
          Laya.Handler.create(this, () => {
            t.UI_Match_Lobby.Inst.show();
          })
        );
      } else if ('xiuxianchang' == i) {
        var n = cfg.desktop.matchmode.find(29),
          a = GameMgr.Inst.account_data,
          r = '';
        g = !1;
        (g = !0) &&
          !n.is_open &&
          ((r = game.Tools.strOfLocalization(1306)));
        var s = !0,
          o = !0,
          l = !0,
          c = !0,
          u = !0,
          _ = !0,
          d = a.level.id,
          f = a.level3.id,
          p = a.gold;

        cfg.desktop.matchmode.forEach(t => {
          (!t.glimit_floor || p >= t.glimit_floor) && (u = !1);
          (-1 == t.glimit_ceil || p <= t.glimit_ceil) && (_ = !1);
          (!t.level_limit || d >= t.level_limit) && (s = !1);
          (!t.level_limit || f >= t.level_limit) && (l = !1);
          100 == t.room &&
            ((t.mode < 10 ? (!t.level_limit_ceil || d <= t.level_limit_ceil) &&
            (o = !1) : (!t.level_limit_ceil || f <= t.level_limit_ceil) &&
            (c = !1)));
        });

        g = !1;
        g = !1;
        g = !1;

        (s || o) && (l || c)
          ? (r = game.Tools.strOfLocalization(103))
          : u
          ? (r = game.Tools.strOfLocalization(101))
          : _ && ((r = game.Tools.strOfLocalization(102)));

        this.close();
        g
          ? (Laya.timer.once(100, this, () => {
          h.Inst.page_east_north.show(n.room);
        }))
          : t.UIMgr.Inst.ShowErrorInfo(r);
      } else if ('dora3' == i) {
        a.level3.id;
        var m = cfg.desktop.matchmode.find(33),
          g = !0,
          r = '',
          y = !0,
          v = !0,
          b = !0,
          w = !0,
          x = (a = GameMgr.Inst.account_data).level.id,
          I = (a.gold);

        cfg.desktop.matchmode.forEach(t => {
          (!t.glimit_floor || I >= t.glimit_floor) && (b = !1);
          (-1 == t.glimit_ceil || I <= t.glimit_ceil) && (w = !1);
          (!t.level_limit || x >= t.level_limit) && (y = !1);
          100 == t.room &&
            ((t.mode < 10 && ((!t.level_limit_ceil || x <= t.level_limit_ceil) && (v = !1))));
        });

        g = !1;
        g = !1;
        g = !1;

        y || v
          ? (r = game.Tools.strOfLocalization(103))
          : b
          ? (r = game.Tools.strOfLocalization(101))
          : w && ((r = game.Tools.strOfLocalization(102)));

        g = !1;

        g &&
          !m.is_open &&
          ((r = game.Tools.strOfLocalization(1306)));

        this.close();

        g
          ? (Laya.timer.once(100, this, () => {
          h.Inst.page_east_north.show(m.room);
        }))
          : t.UIMgr.Inst.ShowErrorInfo(r);

        Laya.LocalStorage.setItem(
          `art0_10133_${GameMgr.Inst.account_id}`,
          Date.now().toString()
        );
      }
    };

    e.prototype.onShowInfo = function(e) {
      var i = this.infos[e];
      'dahuishi' == i
        ? t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(56))
        : 'xiuxianchang' == i
        ? t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(2841))
        : 'dora3' == i &&
          t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(2850));
    };

    return e;
  })();

  var o = (() => {
    function e(e) {
      var i = this;
      this.btns = [];
      this.locking = !1;
      this.room_type = -1;
      this.list_mode = [];
      this._last_fetch_time = 0;
      this._last_fetch_success = !1;
      this.me = e;
      this.me.visible = !1;
      GameMgr.Inst.account_data;
      this.p1 = e.getChildByName('p1');
      this.p1.getChildByName('content').vScrollBar.visible = !1;
      this.content1 = this.p1.getChildByName('content');
      for (
        var n = e => {
          var n = a.p1.getChildByName('content').getChildByName(`btn${e}`);

          n.getChildByName('btn').clickHandler = Laya.Handler.create(
            a,
            () => {
              if (!i.locking && i.list_mode[e].met) {
                var n = i.p1
                  .getChildByName('content')
                  .getChildByName(`btn${e}`)
                  .getChildByName('flag_yuyue');
                t.UI_PiPeiYuYue.Inst.addMatch(i.list_mode[e].id);

                t.UI_PiPeiYuYue.Inst.matchYuYued(i.list_mode[e].id)
                  ? t.UI_PiPeiYuYue.Inst.cancelPiPei(i.list_mode[e].id)
                  : (n.visible = !0);

                GameMgr.Inst.BehavioralStatistics(8 + e);
              }
            },
            null,
            !1
          );

          n.getChildByName(
              'btn_tips'
            ).clickHandler = Laya.Handler.create(
              a,
              () => {
                if (!i.locking)
                  if (200 == i.room_type)
                    t.UI_InfoLite.Inst.show(
                      game.Tools.strOfLocalization(2851)
                    );
                  else {
                    var n = 0;
                    switch (e) {
                      case 0:
                        n = 2;
                        break;
                      case 1:
                        n = 3;
                        break;
                      case 2:
                        n = 24;
                        break;
                      case 3:
                        n = 25;
                    }
                    t.UI_InfoLite.Inst.show(
                      game.Tools.strOfLocalization(n)
                    );
                  }
              },
              null,
              !1
            );

          a.btns.push(n);
        },
          a = this,
          r = 0;
        r < 4;
        r++
      )
        n(r);

      t.UI_PiPeiYuYue.Inst.me.on('cancelPiPei', this, t => {
        for (var e = 0; e < i.list_mode.length; e++)
          i.list_mode[e].id == t &&
            (i.p1
              .getChildByName('content')
              .getChildByName(`btn${e}`)
              .getChildByName('flag_yuyue').visible = !1);
      });

      t.UI_PiPeiYuYue.Inst.me.on('pipeiover', this, () => {
        for (var t = 0; t < 4; t++)
          i.p1
            .getChildByName('content')
            .getChildByName(`btn${t}`)
            .getChildByName('flag_yuyue').visible = !1;
      });
    }

    e.prototype.show = function(e) {
      var i = this;
      Laya.timer.clearAll(this);
      var n = '';

      cfg.desktop.matchmode.forEach(t => {
        t.room == e && (n = t[`room_name_${GameMgr.client_language}`]);
      });

      h.Inst.page_title.show(
        n,
        Laya.Handler.create(
          this,
          () => {
            i.close();
            i.locking ||
              ((5 == e || 100 == e || 200 == e ? h.Inst.page_match.show() : h.Inst.page_rank.show()));
          },
          null,
          !1
        )
      );

      this.room_type = e;
      this.content1.vScrollBar.value = 0;
      view.AudioMgr.PlayAudio(102);
      this.me.visible = !0;
      this.locking = !0;

      this.p1
        .getChildByName('content')
        .getChildByName(`btn${a}`)
        .getChildByName('count').text = '--';

      for (a = 0; a < 4; a++)
        this.p1
            .getChildByName('content')
            .getChildByName(`btn${a}`).alpha = 1;

      Laya.timer.once(150, this, () => {
        i.locking = !1;
      });

      Laya.timer.loop(1e3, this, this._fetchPlayerCount);
      this.content1.vScrollBar.value = 0;
      this.list_mode = [];

      cfg.desktop.matchmode.forEach((t, e) => {
        if (0 != t.mode && i.room_type == t.room) {
          var n = !0,
            a =
              GameMgr.Inst.account_data[t.mode < 10 ? 'level' : 'level3']
                .id;
          t.level_limit && a < t.level_limit && (n = !1);
          t.level_limit_ceil && a > t.level_limit_ceil && (n = !1);
          i.list_mode.push({ mode: t.mode, id: t.id, met: n });
        }
      });

      this._last_fetch_time = 0;
      this._last_fetch_success = !0;
      this._fetchPlayerCount();
      for (var a = 0; a < this.btns.length; a++) {
        var r = this.btns[a];
        if (a < this.list_mode.length) {
          r.visible = !0;

          r.getChildByName(
              'flag_yuyue'
            ).visible = t.UI_PiPeiYuYue.Inst.matchYuYued(
              this.list_mode[a].id
            );

          r.getChildByName('unmet').visible = !this.list_mode[a].met;
          r.getChildByName('btn').mouseEnabled = this.list_mode[a].met;
          var s = '';
          switch (this.list_mode[a].mode) {
            case 1:
              s = game.Tools.localUISrc('myres/lobby/w_sirendong.png');
              break;
            case 2:
              s = game.Tools.localUISrc('myres/lobby/w_sirennan.png');
              break;
            case 11:
              s = game.Tools.localUISrc('myres/lobby/w_sanrendong.png');
              break;
            case 12:
              s = game.Tools.localUISrc('myres/lobby/w_sanrennan.png');
          }
          r.getChildByName('img').skin = s;
        } else r.visible = !1;
      }
      h.Inst.me[`east_north_in${this.list_mode.length}`].play(0, !1);
    };

    e.prototype.close = function() {
      var t = this;
      this.locking = !0;
      h.Inst.me.east_north_out.play(0, !1);
      this.me.visible &&
        (Laya.timer.once(200, this, () => {
        t.me.visible = !1;
        t.locking = !1;
        Laya.timer.clearAll(t);
      }));
    };

    e.prototype._fetchPlayerCount = function() {
      var e = this;
      if (
        game.LobbyNetMgr.Inst.isOK &&
        this._last_fetch_success &&
        !(Laya.timer.currTimer < this._last_fetch_time + 7e3)
      ) {
        this._last_fetch_time = Laya.timer.currTimer;
        for (var i = [], n = 0; n < this.list_mode.length; n++)
          this.list_mode[n].met && i.push(this.list_mode[n].id);
        this._last_fetch_success = !1;
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchCurrentMatchInfo',
          { mode_list: i },
          (i, n) => {
            if (i || n.error) {
              t.UIMgr.Inst.showNetReqError('fetchCurrentMatchInfo', i, n);
              for (a = 0; a < 4; a++)
                e.p1
                  .getChildByName('content')
                  .getChildByName(`btn${a}`)
                  .getChildByName('count').text = '--';
              e._last_fetch_success = !1;
            } else
              try {
                app.Log.log(JSON.stringify(n));
                for (var a = 0; a < n.matches.length; a++) {
                  for (
                    var r = n.matches[a].mode_id,
                      s = n.matches[a].playing_count,
                      o = -1,
                      l = 0;
                    l < e.list_mode.length;
                    l++
                  )
                    if (e.list_mode[l].id == r) {
                      o = l;
                      break;
                    }
                  -1 != o &&
                    (e.p1
                      .getChildByName('content')
                      .getChildByName(`btn${o}`)
                      .getChildByName('count').text = s.toString());
                }
                e._last_fetch_success = !0;
              } catch (i) {}
          }
        );
      }
    };

    return e;
  })();

  var l = (() => {
    class e {
      constructor(e) {
        var i = this;
        this.me = e;
        for (
          var n = n => {
              e.getChildAt(n).clickHandler = Laya.Handler.create(
                a,
                () => {
                  h.Inst.locking ||
                    (0 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_Sushe.Inst.show();
                          })
                        )
                      : 5 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_Shop.Inst.show();
                          })
                        )
                      : 3 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_PaiPu.Inst.show();
                          })
                        )
                      : 1 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_Friend.Inst.show();
                          })
                        )
                      : 2 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_Ob.Inst.show();
                          })
                        )
                      : 4 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_Bag.Inst.show();
                          })
                        )
                      : 6 == n &&
                        h.Inst.Hide(
                          Laya.Handler.create(i, () => {
                            t.UI_Treasure.Inst.show();
                          })
                        ));
                },
                null,
                !1
              );
            },
            a = this,
            r = 0;
          r < 7;
          r++
        )
          n(r);
      }

      onEnable() {
        this.me.getChildAt(1).getChildByName('redpoint').visible =
          game.FriendMgr.friendapply_list &&
          game.FriendMgr.friendapply_list.length > 0;

        this.me.getChildAt(5).getChildByName('redpoint').visible =
            t.UI_Shop.Inst && t.UI_Shop.Inst.have_red_point();

        this.me.getChildAt(4).getChildByName('redpoint').visible =
            t.UI_Bag.Inst && t.UI_Bag.Inst.have_red_point();

        this.me.getChildAt(6).getChildByName('redpoint').visible =
            t.UI_Treasure.Inst && t.UI_Treasure.Inst.have_red_point();
      }
    }

    return e;
  })();

  var h = (h => {
    class c {
      constructor() {
        var t = h.call(this, new ui.lobby.lobbyUI()) || this;
        t.top = null;
        t.page0 = null;
        t.page_rank = null;
        t.page_friend = null;
        t.page_match = null;
        t.page_east_north = null;
        t.btns = null;
        t.page_title = null;
        t.chat_id = 0;
        t.container_chat = null;
        t.chat_block = null;
        t.character_skin = null;
        t.nowpage = 0;
        t.locking = !1;
        t.sound_channel = null;
        t.firstIn = !0;
        c.Inst = t;
        return t;
      }

      onCreate() {
        var h = this;
        this.top = new e(this.me.getChildByName('container_top'));
        this.page0 = new i(this.me.getChildByName('page0'));

        this.page_rank = new a(
            this.me
              .getChildByName('container_pages')
              .getChildByName('page_rank')
          );

        this.page_friend = new r(
            this.me
              .getChildByName('container_pages')
              .getChildByName('page_friend')
          );

        this.page_match = new s(
            this.me
              .getChildByName('container_pages')
              .getChildByName('page_match')
          );

        this.page_east_north = new o(
            this.me
              .getChildByName('container_pages')
              .getChildByName('page_east_north')
          );

        this.page_title = new n(
            this.me
              .getChildByName('container_pages')
              .getChildByName('container_title')
          );

        this.btns = new l(this.me.getChildByName('container_btns'));

        this.character_skin = new t.UI_Character_Skin(
            this.me.getChildByName('illust').getChildByName('illust')
          );

        this.container_chat = this.me
            .getChildByName('illust')
            .getChildByName('chat');

        this.container_chat.visible = !1;
        this.chat_block = new t.UI_Character_Chat(this.container_chat);
        this.me
            .getChildByName('illust')
            .getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            () => {
              c.login_helloed &&
                (h.sound_channel ? h.stopsay() : h.say('lobby_normal'));
            },
            null,
            !1
          );
      }

      onEnable() {
        this.showEnter();
        t.UI_TanfangRoot.Inst.beginload();
        t.UI_Invite.Inst.enable = !0;

        app.PlayerBehaviorStatistic.update_val(
            app.EBehaviorType.XinShouYinDao,
            2
          );

        app.PlayerBehaviorStatistic.google_trace_pending(
          app.EBehaviorType.G_tutorial_jump,
          1
        );

        0 ==
          app.PlayerBehaviorStatistic.get_val(
            app.EBehaviorType.XinShouYinDao
          ) &&
          (app.PlayerBehaviorStatistic.tw_trace_pending(
          app.EBehaviorType.TW_Tutorial_Completed,
          1
        ));

        app.PlayerBehaviorStatistic.fb_trace_pending(
          app.EBehaviorType.Purchase,
          app.PlayerBehaviorStatistic.recharged_count
        );

        app.PlayerBehaviorStatistic.google_trace_pending(
          app.EBehaviorType.G_tutorial_complete,
          1
        );

        app.PlayerBehaviorStatistic.google_trace_pending(
          app.EBehaviorType.G_Purchase,
          app.PlayerBehaviorStatistic.recharged_count
        );

        app.PlayerBehaviorStatistic.recharged_count > 0 &&
          app.PlayerBehaviorStatistic.google_trace_pending(
            app.EBehaviorType.G_Purchase_first,
            1
          );

        app.PlayerBehaviorStatistic.tw_trace_pending(
          app.EBehaviorType.TW_Purchase,
          app.PlayerBehaviorStatistic.recharged_count
        );

        this.firstIn = !1;
        t.UI_PaiPu.init();

        game.Tools.CannotPay() &&
          this.Hide(
            Laya.Handler.create(this, () => {
              t.UI_Recharge.Inst.show('huiyu');
            })
          );

        this.firstIn &&
          (app.NetAgent.sendReq2Lobby(
          'Lobby',
          'loginBeat',
          { contract: 'DF2vkXCnfeXp4WoGrBGNcJBufZiMN3uP' },
          (t, e) => {}
        ));
        var e = 0;
        switch (GameMgr.Inst.account_data.level.id) {
          case 10101:
            e = 1;
            break;
          case 10102:
            e = 2;
            break;
          case 10103:
            e = 3;
            break;
          case 10201:
            e = 4;
            break;
          case 10202:
            e = 5;
            break;
          case 10203:
            e = 6;
            break;
          case 10301:
            e = 7;
            break;
          case 10302:
            e = 8;
            break;
          case 10303:
            e = 9;
            break;
          case 10401:
            e = 10;
            break;
          case 10402:
            e = 11;
            break;
          case 10403:
            e = 12;
            break;
          case 10501:
            e = 13;
            break;
          case 10502:
            e = 14;
            break;
          case 10503:
            e = 15;
            break;
          case 10601:
            e = 16;
        }

        10102 === GameMgr.Inst.account_data.level.id &&
          app.PlayerBehaviorStatistic.fb_trace_pending(
            app.EBehaviorType.Level_2,
            1
          );

        10103 === GameMgr.Inst.account_data.level.id &&
          app.PlayerBehaviorStatistic.fb_trace_pending(
            app.EBehaviorType.Level_3,
            1
          );
        for (var i = 0; i < e; i++)
          app.PlayerBehaviorStatistic.google_trace_pending(
            app.EBehaviorType.G_Role_level_1 + i,
            1
          );
        Laya.timer.once(2e3, this, () => {
          t.UI_Create_Room.Inst.enable ||
            t.UI_WaitingRoom.Inst.enable ||
            Laya.loader.clearTextureRes(
              `res/atlas/${game.Tools.localUISrc('myres/room.atlas')}`
            );

          t.UI_Activity.Inst.enable ||
            Laya.loader.clearTextureRes(
              `res/atlas/${game.Tools.localUISrc('myres/yueka.atlas')}`
            );
        });
      }

      onDisable() {
        this.page0.onDisable(0);
        this.page_rank.close();
        this.page_friend.close();
        this.page_match.close();
        this.page_title.close();
        this.page_east_north.close();
        this.character_skin.clear();
        this.stopsay();
      }

      showEnter() {
        var t = this;
        this.refreshInfo();
        this.page0.me.visible = !0;
        this.page_rank.me.visible = !1;
        this.page_friend.me.visible = !1;
        this.page_match.me.visible = !1;
        this.page_title.me.visible = !1;
        this.page_east_north.me.visible = !1;
        this.nowpage = 0;
        this.locking = !0;
        this.me.in.play(0, !1);
        this.page0.onEnable(567);
        this.btns.onEnable();

        Laya.timer.once(700, this, () => {
          t.locking = !1;
        });

        game.Scene_Lobby.Inst.change_bg('yard', !1);
        c.login_helloed ||
          Laya.timer.once(500, this, () => {
            c.login_helloed = !0;
            t.say('lobby_playerlogin');
          });
      }

      refreshInfo() {
        GameMgr.Inst.account_data;
        this.top.refresh();

        this.character_skin.setSkin(
          GameMgr.Inst.account_data.avatar_id,
          'full'
        );

        this.character_skin.me.visible = !0;
      }

      Hide(t) {
        var e = this;
        this.locking = !0;
        switch ((this.nowpage)) {
          case 0:
            this.page0.onDisable(0);
            break;
          case 1:
            this.page_rank.close();
            break;
          case 2:
            this.page_friend.close();
            break;
          case 3:
            this.page_match.close();
        }
        this.page_east_north.close();
        this.page_title.close();
        this.me.out.play(0, !1);
        Laya.timer.once(250, this, () => {
          e.locking = !1;
          e.enable = !1;
          t && t.run();
        });
      }

      setPage(t) {
        var e = this;
        if (!this.locking && this.nowpage != t) {
          this.locking = !0;
          this.page_rank.close();
          this.page_friend.close();
          this.page_match.close();
          switch ((this.nowpage)) {
            case 0:
              this.page0.onDisable(0);
              break;
            case 1:
              this.page_title.close();
              break;
            case 2:
              this.page_title.close();
              break;
            case 3:
              this.page_title.close();
          }
          this.nowpage = t;
          var i = 750;

          Laya.timer.once(200, this, () => {
            e.page_match.show();
            switch (e.nowpage) {
              case 0:
                e.page0.onEnable(0);
                break;
              case 1:
                e.page_rank.show();
                break;
              case 2:
                e.page_friend.show();
                break;
              case 3:
                i = 500;
            }
          });

          Laya.timer.once(i, this, () => {
            e.locking = !1;
          });
        }
      }

      say(e) {
        var i = this,
          n = t.UI_Sushe.main_chara_info;
        this.chat_id++;
        var a = this.chat_id,
          r = view.AudioMgr.PlayCharactorSound(
            n,
            e,
            Laya.Handler.create(this, () => {
              Laya.timer.once(1e3, i, () => {
                i.chat_id == a && i.stopsay();
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
    }

    __extends(c, h);

    c.Inst = null;
    c.login_helloed = !1;
    return c;
  })(t.UIBase);

  t.UI_Lobby = h;
})(uiscript || (uiscript = {}));