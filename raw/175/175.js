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
      function e(e) {
        var i = this;
        (this.money = null),
          (this.rank = null),
          (this.small_rank = null),
          (this.rank_show_type = 0),
          (this.me = e);
        var n = e.getChildByName('container_name');
        (this.label_name = n.getChildByName('label_name')),
          (this.rank = new t.UI_Level(n.getChildByName('rank'))),
          (this.title = new t.UI_PlayerTitle(n.getChildByName('img_title'))),
          (this.small_rank = new t.UI_Level(
            n.getChildByName('btn_small_rank')
          )),
          (this.money = new t.UI_Money(
            e,
            Laya.Handler.create(h.Inst, h.Inst.Hide, null, !1),
            Laya.Handler.create(
              this,
              function() {
                return h.Inst.locking;
              },
              null,
              !1
            )
          )),
          (n.getChildByName('btn_info').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_PlayerInfo.Inst.show(),
                GameMgr.Inst.BehavioralStatistics(13);
            },
            null,
            !1
          )),
          (e.getChildByName('btn_activity').clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking ||
                (t.UI_Activity.Inst.show(),
                GameMgr.Inst.BehavioralStatistics(18));
            },
            null,
            !1
          )),
          (e.getChildByName('btn_rank').clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking ||
                (t.UI_Rank.Inst.show(), GameMgr.Inst.BehavioralStatistics(18));
            },
            null,
            !1
          )),
          (e.getChildByName('btn_info').clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking || t.UI_Info.Inst.show();
            },
            null,
            !1
          )),
          (e.getChildByName('btn_set').clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking || t.UI_Config.Inst.show();
            },
            null,
            !1
          )),
          (e.getChildByName('btn_help').clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking || t.UI_Rules.Inst.show();
            },
            null,
            !1
          )),
          (e.getChildByName(
            'btn_xinshouyindao'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking ||
                (t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : h.Inst.Hide(
                      Laya.Handler.create(i, function() {
                        t.UI_XinShouYinDao.Inst.show(
                          0,
                          Laya.Handler.create(i, function() {
                            h.Inst.enable = !0;
                          })
                        );
                      })
                    ));
            },
            null,
            !1
          )),
          (n.getChildByName('btn_small_rank').clickHandler = new Laya.Handler(
            this,
            function() {
              h.Inst.locking ||
                (0 == i.rank_show_type
                  ? (i.rank_show_type = 1)
                  : (i.rank_show_type = 0),
                i.show_rank(),
                Laya.LocalStorage.setItem(
                  'rank_show_type',
                  i.rank_show_type.toString()
                ));
            }
          ));
        var a = Laya.LocalStorage.getItem('rank_show_type');
        this.rank_show_type = '1' == a ? 1 : 0;
      }
      return (
        (e.prototype.refresh = function() {
          var t = GameMgr.Inst.account_data;
          (this.label_name.text = t.nickname),
            (this.title.id = t.title),
            this.show_rank(),
            this.money.onEnable(),
            this.refreshRedpoint();
        }),
        (e.prototype.refreshRedpoint = function() {
          (this.me
            .getChildByName('btn_activity')
            .getChildByName('redpoint').visible =
            t.UI_Mail.haveRedPoint || t.UI_Activity.haveRedPoint),
            (this.me
              .getChildByName('btn_info')
              .getChildByName('redpoint').visible = t.UI_Info.haveRedPoint);
        }),
        (e.prototype.show_rank = function() {
          var t = 'level',
            e = 'level3';
          1 == this.rank_show_type && ((t = 'level3'), (e = 'level')),
            (this.rank.id = GameMgr.Inst.account_data[t].id),
            (this.small_rank.id = GameMgr.Inst.account_data[e].id);
        }),
        e
      );
    })(),
    i = (function() {
      function e(e) {
        (this.me = e),
          (this.btn_dajiangsai = e.getChildByName('btn_dajiangsai')),
          (this.btn_yibanchang = e.getChildByName('btn_yibanchang')),
          (this.btn_yourenfang = e.getChildByName('btn_yourenfang')),
          (this.btn_yibanchang.clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.setPage(1), GameMgr.Inst.BehavioralStatistics(1);
            },
            null,
            !1
          )),
          (this.btn_yourenfang.clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.setPage(2), GameMgr.Inst.BehavioralStatistics(2);
            },
            null,
            !1
          )),
          (this.btn_dajiangsai.clickHandler = Laya.Handler.create(
            this,
            function() {
              GameMgr.Inst.BehavioralStatistics(3),
                h.Inst.setPage(3),
                t.UI_Activity.activity_is_running(1011) &&
                  Laya.LocalStorage.setItem(
                    'art0_1011_' + GameMgr.Inst.account_id,
                    Date.now().toString()
                  );
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.onEnable = function(e) {
          var i = this;
          (this.btn_yibanchang.visible = !1),
            (this.btn_dajiangsai.visible = !1),
            (this.btn_yourenfang.visible = !1),
            (this.btn_yibanchang.alpha = 1),
            (this.btn_dajiangsai.alpha = 1),
            (this.btn_yourenfang.alpha = 1),
            Laya.timer.once(e, this, function() {
              view.AudioMgr.PlayAudio(104),
                (i.btn_yibanchang.x = 700),
                (i.btn_yibanchang.y = 405),
                (i.btn_yibanchang.scaleX = 0.2),
                (i.btn_yibanchang.scaleY = 0.2),
                (i.btn_yibanchang.visible = !0),
                (i.btn_yibanchang.alpha = 0),
                Laya.Tween.to(
                  i.btn_yibanchang,
                  { x: 1183, y: 368, scaleX: 1.2, scaleY: 1.2, alpha: 1 },
                  233,
                  function(t, e, i, n) {
                    return Laya.Ease.backOut(t, e, i, n, 1);
                  }
                );
            }),
            Laya.timer.once(e + 100, this, function() {
              view.AudioMgr.PlayAudio(104),
                (i.btn_dajiangsai.x = 700),
                (i.btn_dajiangsai.y = 530),
                (i.btn_dajiangsai.scaleX = 0.2),
                (i.btn_dajiangsai.scaleY = 0.2),
                (i.btn_dajiangsai.visible = !0),
                (i.btn_dajiangsai.alpha = 0),
                Laya.Tween.to(
                  i.btn_dajiangsai,
                  { x: 1110, y: 547, scaleX: 1.2, scaleY: 1.2, alpha: 1 },
                  233,
                  function(t, e, i, n) {
                    return Laya.Ease.backOut(t, e, i, n, 1);
                  }
                );
            }),
            Laya.timer.once(e + 200, this, function() {
              view.AudioMgr.PlayAudio(104),
                (i.btn_yourenfang.x = 700),
                (i.btn_yourenfang.y = 634),
                (i.btn_yourenfang.scaleX = 0.2),
                (i.btn_yourenfang.scaleY = 0.2),
                (i.btn_yourenfang.visible = !0),
                (i.btn_yourenfang.alpha = 0),
                Laya.Tween.to(
                  i.btn_yourenfang,
                  { x: 1123, y: 736, scaleX: 1.2, scaleY: 1.2, alpha: 1 },
                  233,
                  function(t, e, i, n) {
                    return Laya.Ease.backOut(t, e, i, n, 1);
                  }
                );
            });
          var n = !1;
          if (t.UI_Activity.activity_is_running(1011)) {
            var a = Laya.LocalStorage.getItem(
                'art0_1011_' + GameMgr.Inst.account_id
              ),
              r = 0;
            a && '' != a && (r = parseInt(a)), (n = Date.now() > r + 864e6);
          }
          (this.btn_dajiangsai.getChildByName('redpoint').visible = n),
            (this.me.visible = !0);
        }),
        (e.prototype.onDisable = function(e) {
          var i = this;
          t.UIBase.anim_alpha_out(
            this.btn_yibanchang,
            { x: -500, y: 450, scaleX: -1, scaleY: -1 },
            200,
            e,
            null,
            Laya.Ease.backIn
          ),
            t.UIBase.anim_alpha_out(
              this.btn_dajiangsai,
              { x: -500, y: 150, scaleX: -1, scaleY: -1 },
              200,
              e,
              null,
              Laya.Ease.backIn
            ),
            t.UIBase.anim_alpha_out(
              this.btn_yourenfang,
              { x: -500, y: -150, scaleX: -1, scaleY: -1 },
              200,
              e,
              null,
              Laya.Ease.backIn
            ),
            Laya.timer.once(200 + e, this, function() {
              i.me.visible = !1;
            });
        }),
        e
      );
    })(),
    n = (function() {
      function t(t) {
        var e = this;
        (this.me = t),
          (this.me.visible = !1),
          (this.btn_back = t.getChildByName('btn_back')),
          (this.btn_back.clickHandler = new Laya.Handler(this, function() {
            e.func_back && e.func_back.run();
          })),
          (this.title = t.getChildByName('title'));
      }
      return (
        (t.prototype.show = function(t, e) {
          (this.title.text = t),
            game.Tools.labelLocalizationPosition(
              this.title,
              345,
              this.title.width,
              !0
            ),
            (this.func_back = e),
            this.me.visible ||
              ((this.me.visible = !0), h.Inst.me.page_title_in.play(0, !1)),
            Laya.timer.clearAll(this);
        }),
        (t.prototype.close = function() {
          var t = this;
          this.me.visible &&
            (h.Inst.me.page_title_out.play(0, !1),
            Laya.timer.once(200, this, function() {
              t.me.visible = !1;
            }));
        }),
        t
      );
    })(),
    a = (function() {
      function e(e) {
        var i = this;
        (this.locking = !1),
          (this.me = e),
          (this.me.visible = !1),
          (this.p0 = e.getChildByName('p0')),
          (this.p0.getChildByName('content').vScrollBar.visible = !1),
          (this.content0 = this.p0.getChildByName('content'));
        for (
          var n = GameMgr.Inst.account_data,
            a = function(e) {
              var a = r.p0.getChildByName('content').getChildByName('btn' + e),
                s = a.getChildByName('container'),
                o = s.getChildByName('btn'),
                l = a.getChildByName('stop'),
                c = 0;
              c = e < 4 ? 1 + 3 * e : 15;
              var u = cfg.desktop.matchmode.find(c);
              u.is_open
                ? ((o.mouseEnabled = !0),
                  (s.filters = []),
                  (l.visible = !1),
                  (o.clickHandler = Laya.Handler.create(
                    r,
                    function() {
                      if (!i.locking) {
                        var a = !0,
                          r = '';
                        a &&
                          !u.is_open &&
                          ((a = !1), (r = game.Tools.strOfLocalization(1306)));
                        var s = !0,
                          o = !0,
                          l = !0,
                          c = !0,
                          _ = !0,
                          d = !0,
                          f = n.level.id,
                          p = n.level3.id,
                          m = n.gold;
                        cfg.desktop.matchmode.forEach(function(t) {
                          var i = e + 1;
                          5 == i && (i = 6),
                            t.room == i &&
                              ((!t.glimit_floor || m >= t.glimit_floor) &&
                                (_ = !1),
                              (-1 == t.glimit_ceil || m <= t.glimit_ceil) &&
                                (d = !1),
                              t.mode < 10
                                ? ((!t.level_limit || f >= t.level_limit) &&
                                    (s = !1),
                                  (!t.level_limit_ceil ||
                                    f <= t.level_limit_ceil) &&
                                    (o = !1))
                                : ((!t.level_limit || p >= t.level_limit) &&
                                    (l = !1),
                                  (!t.level_limit_ceil ||
                                    p <= t.level_limit_ceil) &&
                                    (c = !1)));
                        }),
                          (s || o) && (l || c)
                            ? ((a = !1),
                              (r = game.Tools.strOfLocalization(103)))
                            : _
                            ? ((a = !1),
                              (r = game.Tools.strOfLocalization(101)))
                            : d &&
                              ((a = !1),
                              (r = game.Tools.strOfLocalization(102))),
                          a
                            ? (i.close(),
                              Laya.timer.once(100, i, function() {
                                h.Inst.page_east_north.show(u.room);
                              }))
                            : t.UIMgr.Inst.ShowErrorInfo(r);
                      }
                    },
                    null,
                    !1
                  )))
                : ((o.mouseEnabled = !1),
                  (s.filters = [new Laya.ColorFilter(t.GRAY_FILTER)]),
                  (l.visible = !0)),
                (s.getChildByName(
                  'btn_tips'
                ).clickHandler = Laya.Handler.create(
                  r,
                  function() {
                    i.locking ||
                      t.UI_InfoLite.Inst.show(
                        game.Tools.strOfLocalization(e < 4 ? 4 + e : 64)
                      );
                  },
                  null,
                  !1
                ));
            },
            r = this,
            s = 0;
          s < 5;
          s++
        )
          a(s);
      }
      return (
        (e.prototype.show = function() {
          var t = this;
          (this.content0.vScrollBar.value = 0),
            view.AudioMgr.PlayAudio(102),
            (this.me.visible = !0),
            (this.locking = !0),
            h.Inst.page_title.show(
              game.Tools.strOfLocalization(2079),
              Laya.Handler.create(
                this,
                function() {
                  t.locking || h.Inst.setPage(0);
                },
                null,
                !1
              )
            ),
            (this.p0.alpha = 1),
            (this.p0.visible = !1);
          for (var e = 0; e < 5; e++)
            this.p0
              .getChildByName('content')
              .getChildByName('btn' + e).alpha = 1;
          Laya.timer.once(100, this, function() {
            (t.p0.visible = !0), h.Inst.me.rank_in.play(0, !1);
          }),
            Laya.timer.once(300, this, function() {
              t.locking = !1;
            });
        }),
        (e.prototype.close = function() {
          var t = this;
          this.me.visible &&
            ((this.locking = !0),
            h.Inst.me.rank_out.play(0, !1),
            Laya.timer.once(200, this, function() {
              (t.me.visible = !1), (t.locking = !1), Laya.timer.clearAll(t);
            }));
        }),
        e
      );
    })(),
    r = (function() {
      function e(e) {
        var i = this;
        (this.locking = !1),
          (this.me = e),
          (this.me.visible = !1),
          (this.btn_create_room = e
            .getChildByName('content')
            .getChildByName('btn0')
            .getChildByName('btn')),
          (e
            .getChildByName('content')
            .getChildByName('btn0')
            .getChildByName('btn_tips').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(8)),
                GameMgr.Inst.BehavioralStatistics(10);
            },
            null,
            !1
          )),
          (this.btn_add_room = e
            .getChildByName('content')
            .getChildByName('btn1')
            .getChildByName('btn')),
          (e
            .getChildByName('content')
            .getChildByName('btn1')
            .getChildByName('btn_tips').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(9));
            },
            null,
            !1
          )),
          (this.btn_create_room.clickHandler = Laya.Handler.create(
            this,
            function() {
              h.Inst.locking ||
                (t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : h.Inst.Hide(
                      Laya.Handler.create(i, function() {
                        t.UI_Create_Room.Show();
                      })
                    ));
            },
            null,
            !1
          )),
          (this.btn_add_room.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : (t.UI_NumberInput.Inst.show(
                    game.Tools.strOfLocalization(2080),
                    Laya.Handler.create(i, function(e) {
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'joinRoom',
                        { room_id: e },
                        function(e, i) {
                          e || i.error
                            ? t.UIMgr.Inst.showNetReqError('joinRoom', e, i)
                            : ((h.Inst.enable = !1),
                              t.UI_WaitingRoom.Inst.updateData(i.room),
                              t.UIMgr.Inst.ShowWaitingRoom());
                        }
                      );
                    }),
                    null
                  ),
                  GameMgr.Inst.BehavioralStatistics(11));
            },
            null,
            !1
          )),
          'chs' != GameMgr.client_language &&
            ((e
              .getChildByName('content')
              .getChildByName('btn0')
              .getChildByName('del').visible = !1),
            (e
              .getChildByName('content')
              .getChildByName('btn1')
              .getChildByName('del').visible = !1));
      }
      return (
        (e.prototype.show = function() {
          var t = this;
          h.Inst.page_title.show(
            game.Tools.strOfLocalization(2023),
            Laya.Handler.create(
              this,
              function() {
                t.locking || h.Inst.setPage(0);
              },
              null,
              !1
            )
          ),
            (this.btn_add_room.alpha = 1),
            (this.btn_create_room.alpha = 1),
            (this.btn_create_room.visible = !0),
            (this.btn_add_room.visible = !0),
            (this.me.visible = !0),
            view.AudioMgr.PlayAudio(102),
            h.Inst.me.friend_in.play(0, !1),
            Laya.timer.once(150, this, function() {
              t.locking = !1;
            });
        }),
        (e.prototype.close = function() {
          var t = this;
          this.me.visible &&
            ((this.locking = !0),
            h.Inst.me.friend_out.play(0, !1),
            Laya.timer.once(200, this, function() {
              (t.locking = !1), (t.me.visible = !1);
            }));
        }),
        e
      );
    })(),
    s = (function() {
      function e(e) {
        var i = this;
        (this.btns = []),
          (this.me = e),
          (e.visible = !1),
          (this.content = e.getChildByName('content'));
        for (
          var n = function(e) {
              var n = a.content.getChildByName('btn' + e);
              a.btns.push(n),
                (n
                  .getChildByName('container')
                  .getChildByName('btn').clickHandler = Laya.Handler.create(
                  a,
                  function() {
                    if (!h.Inst.locking && !i.locking)
                      if (0 == e) {
                        if (t.UI_PiPeiYuYue.Inst.enable)
                          return void t.UI_Popout.PopOutNoTitle(
                            game.Tools.strOfLocalization(204),
                            null
                          );
                        h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_Match_Lobby.Inst.show();
                          })
                        );
                      } else
                        1 == e &&
                          (i.close(),
                          h.Inst.page_east_north.show(5),
                          Laya.LocalStorage.setItem(
                            'art1_1011_' + GameMgr.Inst.account_id,
                            Date.now().toString()
                          ));
                  },
                  null,
                  !1
                )),
                (n
                  .getChildByName('container')
                  .getChildByName(
                    'btn_tips'
                  ).clickHandler = Laya.Handler.create(
                  a,
                  function() {
                    h.Inst.locking ||
                      i.locking ||
                      (0 == e
                        ? t.UI_InfoLite.Inst.show(
                            game.Tools.strOfLocalization(56)
                          )
                        : 1 == e &&
                          t.UI_InfoLite.Inst.show(
                            game.Tools.strOfLocalization(2775)
                          ));
                  },
                  null,
                  !1
                ));
            },
            a = this,
            r = 0;
          r < 2;
          r++
        )
          n(r);
      }
      return (
        (e.prototype.show = function() {
          var e = this;
          h.Inst.page_title.show(
            game.Tools.strOfLocalization(2025),
            Laya.Handler.create(
              this,
              function() {
                e.locking || h.Inst.setPage(0);
              },
              null,
              !1
            )
          );
          for (var i = 0; i < this.btns.length; i++) this.btns[i].alpha = 1;
          var n = !1;
          if (t.UI_Activity.activity_is_running(1011)) {
            this.btns[1].visible = !0;
            var a = Laya.LocalStorage.getItem(
                'art1_1011_' + GameMgr.Inst.account_id
              ),
              r = 0;
            a && '' != a && (r = parseInt(a)),
              (n = Date.now() > r + 864e6),
              (this.btns[1].getChildByName('redpoint').visible = n);
          } else this.btns[1].visible = !1;
          (this.locking = !0),
            view.AudioMgr.PlayAudio(102),
            (this.me.visible = !0),
            h.Inst.me.match_in.play(0, !1),
            Laya.timer.once(150, this, function() {
              e.locking = !1;
            });
        }),
        (e.prototype.close = function() {
          var t = this;
          this.me.visible &&
            (h.Inst.me.match_out.play(0, !1),
            Laya.timer.once(200, this, function() {
              t.me.visible = !1;
            }));
        }),
        e
      );
    })(),
    o = (function() {
      function e(e) {
        var i = this;
        (this.locking = !1),
          (this.room_type = -1),
          (this.list_mode = []),
          (this._last_fetch_time = 0),
          (this._last_fetch_success = !1),
          (this.me = e),
          (this.me.visible = !1);
        GameMgr.Inst.account_data;
        (this.p1 = e.getChildByName('p1')),
          (this.p1.getChildByName('content').vScrollBar.visible = !1),
          (this.content1 = this.p1.getChildByName('content'));
        for (
          var n = function(e) {
              (a.p1
                .getChildByName('content')
                .getChildByName('btn' + e)
                .getChildByName('btn').clickHandler = Laya.Handler.create(
                a,
                function() {
                  if (!i.locking && i.list_mode[e].met) {
                    var n = i.p1
                      .getChildByName('content')
                      .getChildByName('btn' + e)
                      .getChildByName('flag_yuyue');
                    t.UI_PiPeiYuYue.Inst.matchYuYued(i.list_mode[e].id)
                      ? t.UI_PiPeiYuYue.Inst.cancelPiPei(i.list_mode[e].id)
                      : (t.UI_PiPeiYuYue.Inst.addMatch(i.list_mode[e].id),
                        (n.visible = !0)),
                      GameMgr.Inst.BehavioralStatistics(8 + e);
                  }
                },
                null,
                !1
              )),
                (a.p1
                  .getChildByName('content')
                  .getChildByName('btn' + e)
                  .getChildByName(
                    'btn_tips'
                  ).clickHandler = Laya.Handler.create(
                  a,
                  function() {
                    if (!i.locking) {
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
                      t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(n));
                    }
                  },
                  null,
                  !1
                ));
            },
            a = this,
            r = 0;
          r < 4;
          r++
        )
          n(r);
        t.UI_PiPeiYuYue.Inst.me.on('cancelPiPei', this, function(t) {
          for (var e = 0; e < 4; e++)
            i.list_mode[e].id == t &&
              (i.p1
                .getChildByName('content')
                .getChildByName('btn' + e)
                .getChildByName('flag_yuyue').visible = !1);
        }),
          t.UI_PiPeiYuYue.Inst.me.on('pipeiover', this, function() {
            for (var t = 0; t < 4; t++)
              i.p1
                .getChildByName('content')
                .getChildByName('btn' + t)
                .getChildByName('flag_yuyue').visible = !1;
          });
      }
      return (
        (e.prototype.show = function(e) {
          var i = this;
          Laya.timer.clearAll(this);
          var n = '';
          cfg.desktop.matchmode.forEach(function(t) {
            t.room == e && (n = t['room_name_' + GameMgr.client_language]);
          }),
            h.Inst.page_title.show(
              n,
              Laya.Handler.create(
                this,
                function() {
                  i.locking ||
                    (i.close(),
                    5 == e
                      ? h.Inst.page_match.show()
                      : h.Inst.page_rank.show());
                },
                null,
                !1
              )
            ),
            (this.room_type = e),
            (this.content1.vScrollBar.value = 0),
            view.AudioMgr.PlayAudio(102),
            (this.me.visible = !0),
            (this.locking = !0);
          for (a = 0; a < 4; a++)
            (this.p1
              .getChildByName('content')
              .getChildByName('btn' + a)
              .getChildByName('count').text = '--'),
              (this.p1
                .getChildByName('content')
                .getChildByName('btn' + a).alpha = 1);
          h.Inst.me.east_north_in.play(0, !1),
            Laya.timer.once(150, this, function() {
              i.locking = !1;
            }),
            Laya.timer.loop(1e3, this, this._fetchPlayerCount),
            (this.content1.vScrollBar.value = 0),
            (this.list_mode = []),
            cfg.desktop.matchmode.forEach(function(t, e) {
              if (0 != t.mode && i.room_type == t.room) {
                var n = !0,
                  a =
                    GameMgr.Inst.account_data[t.mode < 10 ? 'level' : 'level3']
                      .id;
                t.level_limit && a < t.level_limit && (n = !1),
                  t.level_limit_ceil && a > t.level_limit_ceil && (n = !1),
                  i.list_mode.push({ mode: t.mode, id: t.id, met: n });
              }
            }),
            (this._last_fetch_time = 0),
            (this._last_fetch_success = !0),
            this._fetchPlayerCount();
          for (var a = 0; a < this.list_mode.length; a++) {
            var r = this.p1.getChildByName('content').getChildByName('btn' + a);
            (r.getChildByName(
              'flag_yuyue'
            ).visible = t.UI_PiPeiYuYue.Inst.matchYuYued(this.list_mode[a].id)),
              (r.getChildByName('unmet').visible = !this.list_mode[a].met),
              (r.getChildByName('btn').mouseEnabled = this.list_mode[a].met);
          }
        }),
        (e.prototype.close = function() {
          var t = this;
          this.me.visible &&
            ((this.locking = !0),
            h.Inst.me.east_north_out.play(0, !1),
            Laya.timer.once(200, this, function() {
              (t.me.visible = !1), (t.locking = !1), Laya.timer.clearAll(t);
            }));
        }),
        (e.prototype._fetchPlayerCount = function() {
          var e = this;
          if (
            game.LobbyNetMgr.Inst.isOK &&
            this._last_fetch_success &&
            !(Laya.timer.currTimer < this._last_fetch_time + 7e3)
          ) {
            this._last_fetch_time = Laya.timer.currTimer;
            for (var i = [], n = 0; n < this.list_mode.length; n++)
              this.list_mode[n].met && i.push(this.list_mode[n].id);
            (this._last_fetch_success = !1),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'fetchCurrentMatchInfo',
                { mode_list: i },
                function(i, n) {
                  if (i || n.error) {
                    t.UIMgr.Inst.showNetReqError('fetchCurrentMatchInfo', i, n);
                    for (a = 0; a < 4; a++)
                      e.p1
                        .getChildByName('content')
                        .getChildByName('btn' + a)
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
                            .getChildByName('btn' + o)
                            .getChildByName('count').text = s.toString());
                      }
                      e._last_fetch_success = !0;
                    } catch (i) {}
                }
              );
          }
        }),
        e
      );
    })(),
    l = (function() {
      function e(e) {
        var i = this;
        this.me = e;
        for (
          var n = function(n) {
              e.getChildAt(n).clickHandler = Laya.Handler.create(
                a,
                function() {
                  h.Inst.locking ||
                    (0 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_Sushe.Inst.show();
                          })
                        )
                      : 5 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_Shop.Inst.show();
                          })
                        )
                      : 3 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_PaiPu.Inst.show();
                          })
                        )
                      : 1 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_Friend.Inst.show();
                          })
                        )
                      : 2 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_Ob.Inst.show();
                          })
                        )
                      : 4 == n
                      ? h.Inst.Hide(
                          Laya.Handler.create(i, function() {
                            t.UI_Bag.Inst.show();
                          })
                        )
                      : 6 == n &&
                        h.Inst.Hide(
                          Laya.Handler.create(i, function() {
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
      return (
        (e.prototype.onEnable = function() {
          (this.me.getChildAt(1).getChildByName('redpoint').visible =
            game.FriendMgr.friendapply_list &&
            game.FriendMgr.friendapply_list.length > 0),
            (this.me.getChildAt(5).getChildByName('redpoint').visible =
              t.UI_Shop.Inst && t.UI_Shop.Inst.have_red_point()),
            (this.me.getChildAt(4).getChildByName('redpoint').visible =
              t.UI_Bag.Inst && t.UI_Bag.Inst.have_red_point()),
            (this.me.getChildAt(6).getChildByName('redpoint').visible =
              t.UI_Treasure.Inst && t.UI_Treasure.Inst.have_red_point());
        }),
        e
      );
    })(),
    h = (function(h) {
      function c() {
        var t = h.call(this, new ui.lobby.lobbyUI()) || this;
        return (
          (t.top = null),
          (t.page0 = null),
          (t.page_rank = null),
          (t.page_friend = null),
          (t.page_match = null),
          (t.page_east_north = null),
          (t.btns = null),
          (t.page_title = null),
          (t.chat_id = 0),
          (t.container_chat = null),
          (t.chat_block = null),
          (t.character_skin = null),
          (t.nowpage = 0),
          (t.locking = !1),
          (t.sound_channel = null),
          (t.firstIn = !0),
          (c.Inst = t),
          t
        );
      }
      return (
        __extends(c, h),
        (c.prototype.onCreate = function() {
          var h = this;
          (this.top = new e(this.me.getChildByName('container_top'))),
            (this.page0 = new i(this.me.getChildByName('page0'))),
            (this.page_rank = new a(
              this.me
                .getChildByName('container_pages')
                .getChildByName('page_rank')
            )),
            (this.page_friend = new r(
              this.me
                .getChildByName('container_pages')
                .getChildByName('page_friend')
            )),
            (this.page_match = new s(
              this.me
                .getChildByName('container_pages')
                .getChildByName('page_match')
            )),
            (this.page_east_north = new o(
              this.me
                .getChildByName('container_pages')
                .getChildByName('page_east_north')
            )),
            (this.page_title = new n(
              this.me
                .getChildByName('container_pages')
                .getChildByName('container_title')
            )),
            (this.btns = new l(this.me.getChildByName('container_btns'))),
            (this.character_skin = new t.UI_Character_Skin(
              this.me.getChildByName('illust').getChildByName('illust')
            )),
            (this.container_chat = this.me
              .getChildByName('illust')
              .getChildByName('chat')),
            (this.container_chat.visible = !1),
            (this.chat_block = new t.UI_Character_Chat(this.container_chat)),
            (this.me
              .getChildByName('illust')
              .getChildByName('btn').clickHandler = Laya.Handler.create(
              this,
              function() {
                c.login_helloed &&
                  (h.sound_channel ? h.stopsay() : h.say('lobby_normal'));
              },
              null,
              !1
            ));
        }),
        (c.prototype.onEnable = function() {
          this.showEnter(),
            t.UI_TanfangRoot.Inst.beginload(),
            (t.UI_Invite.Inst.enable = !0),
            0 ==
              app.PlayerBehaviorStatistic.get_val(
                app.EBehaviorType.XinShouYinDao
              ) &&
              (app.PlayerBehaviorStatistic.update_val(
                app.EBehaviorType.XinShouYinDao,
                2
              ),
              app.PlayerBehaviorStatistic.google_trace_pending(
                app.EBehaviorType.G_tutorial_jump,
                1
              ),
              app.PlayerBehaviorStatistic.tw_trace_pending(
                app.EBehaviorType.TW_Tutorial_Completed,
                1
              )),
            app.PlayerBehaviorStatistic.fb_trace_pending(
              app.EBehaviorType.Purchase,
              app.PlayerBehaviorStatistic.recharged_count
            ),
            app.PlayerBehaviorStatistic.google_trace_pending(
              app.EBehaviorType.G_tutorial_complete,
              1
            ),
            app.PlayerBehaviorStatistic.google_trace_pending(
              app.EBehaviorType.G_Purchase,
              app.PlayerBehaviorStatistic.recharged_count
            ),
            app.PlayerBehaviorStatistic.recharged_count > 0 &&
              app.PlayerBehaviorStatistic.google_trace_pending(
                app.EBehaviorType.G_Purchase_first,
                1
              ),
            app.PlayerBehaviorStatistic.tw_trace_pending(
              app.EBehaviorType.TW_Purchase,
              app.PlayerBehaviorStatistic.recharged_count
            ),
            this.firstIn && ((this.firstIn = !1), t.UI_PaiPu.init());
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
            ),
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
          Laya.timer.once(2e3, this, function() {
            t.UI_Create_Room.Inst.enable ||
              t.UI_WaitingRoom.Inst.enable ||
              Laya.loader.clearTextureRes(
                'res/atlas/' + game.Tools.localUISrc('myres/room.atlas')
              );
          });
        }),
        (c.prototype.onDisable = function() {
          this.page0.onDisable(0),
            this.page_rank.close(),
            this.page_friend.close(),
            this.page_match.close(),
            this.page_title.close(),
            this.page_east_north.close(),
            this.character_skin.clear(),
            this.stopsay();
        }),
        (c.prototype.showEnter = function() {
          var t = this;
          this.refreshInfo(),
            (this.page0.me.visible = !0),
            (this.page_rank.me.visible = !1),
            (this.page_friend.me.visible = !1),
            (this.page_match.me.visible = !1),
            (this.page_title.me.visible = !1),
            (this.page_east_north.me.visible = !1),
            (this.nowpage = 0),
            (this.locking = !0),
            this.me.in.play(0, !1),
            this.page0.onEnable(567),
            this.btns.onEnable(),
            Laya.timer.once(700, this, function() {
              t.locking = !1;
            }),
            game.Scene_Lobby.Inst.change_bg('yard', !1),
            c.login_helloed ||
              Laya.timer.once(500, this, function() {
                (c.login_helloed = !0), t.say('lobby_playerlogin');
              });
        }),
        (c.prototype.refreshInfo = function() {
          GameMgr.Inst.account_data;
          this.top.refresh(),
            this.character_skin.setSkin(
              GameMgr.Inst.account_data.avatar_id,
              'full'
            ),
            (this.character_skin.me.visible = !0);
        }),
        (c.prototype.Hide = function(t) {
          var e = this;
          switch (((this.locking = !0), this.nowpage)) {
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
          this.page_east_north.close(),
            this.page_title.close(),
            this.me.out.play(0, !1),
            Laya.timer.once(250, this, function() {
              (e.locking = !1), (e.enable = !1), t && t.run();
            });
        }),
        (c.prototype.setPage = function(t) {
          var e = this;
          if (!this.locking && this.nowpage != t) {
            switch (((this.locking = !0), this.nowpage)) {
              case 0:
                this.page0.onDisable(0);
                break;
              case 1:
                this.page_rank.close(), this.page_title.close();
                break;
              case 2:
                this.page_friend.close(), this.page_title.close();
                break;
              case 3:
                this.page_match.close(), this.page_title.close();
            }
            this.nowpage = t;
            var i = 750;
            Laya.timer.once(200, this, function() {
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
                  e.page_match.show(), (i = 500);
              }
            }),
              Laya.timer.once(i, this, function() {
                e.locking = !1;
              });
          }
        }),
        (c.prototype.say = function(e) {
          var i = this,
            n = t.UI_Sushe.main_chara_info;
          this.chat_id++;
          var a = this.chat_id,
            r = view.AudioMgr.PlayCharactorSound(
              n,
              e,
              Laya.Handler.create(this, function() {
                Laya.timer.once(1e3, i, function() {
                  i.chat_id == a && i.stopsay();
                });
              })
            );
          r && (this.chat_block.show(r.words), (this.sound_channel = r.sound));
        }),
        (c.prototype.stopsay = function() {
          this.chat_block.close(!1),
            this.sound_channel &&
              (this.sound_channel.stop(),
              Laya.SoundManager.removeChannel(this.sound_channel),
              (this.sound_channel = null));
        }),
        (c.Inst = null),
        (c.login_helloed = !1),
        c
      );
    })(t.UIBase);
  t.UI_Lobby = h;
})(uiscript || (uiscript = {}));