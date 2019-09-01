var uiscript;
!(function(t) {
  var e = (function() {
      function t(e) {
        (this.me = null),
          (this._container_c0 = null),
          (this._img_countdown_c0 = []),
          (this._container_c1 = null),
          (this._img_countdown_c1 = []),
          (this._img_countdown_plus = null),
          (this._img_countdown_add = []),
          (this._start = 0),
          (this._pre_sec = 0),
          (this._fix = 0),
          (this._add = 0),
          (this._pre_time = 0),
          (t.Inst = this),
          (this.me = e),
          (this._container_c0 = this.me.getChildByName('c0'));
        for (i = 0; i < 2; i++)
          this._img_countdown_c0.push(
            this._container_c0.getChildByName('num' + i)
          );
        this._container_c1 = this.me.getChildByName('c1');
        for (i = 0; i < 2; i++)
          this._img_countdown_c1.push(
            this._container_c1.getChildByName('num' + i)
          );
        for (var i = 0; i < 2; i++)
          this._img_countdown_add.push(
            this.me.getChildByName('plus').getChildByName('add_' + i)
          );
        (this._img_countdown_plus = this.me.getChildByName('plus')),
          (this.me.visible = false);
      }
      return (
        Object.defineProperty(t.prototype, 'timeuse', {
          get: function() {
            return this.me.visible
              ? Math.floor((Laya.timer.currTimer - this._start) / 1e3)
              : 0;
          },
          enumerable: true,
          configurable: true
        }),
        (t.prototype.reset = function() {
          (this.me.visible = false), Laya.timer.clearAll(this);
        }),
        (t.prototype.showCD = function(t, e) {
          var i = this;
          (this.me.visible = true),
            (this._start = Laya.timer.currTimer),
            (this._fix = Math.floor(t / 1e3)),
            (this._add = Math.floor(e / 1e3)),
            (this._pre_sec = -1),
            (this._pre_time = Laya.timer.currTimer),
            this._show(),
            Laya.timer.frameLoop(1, this, function() {
              var t = Laya.timer.currTimer - i._pre_time;
              (i._pre_time = Laya.timer.currTimer),
                view.DesktopMgr.Inst.timestoped ? (i._start += t) : i._show();
            });
        }),
        (t.prototype.close = function() {
          this.reset();
        }),
        (t.prototype._show = function() {
          var t = this._fix + this._add - this.timeuse;
          if (t <= 0)
            return view.DesktopMgr.Inst.OperationTimeOut(), void this.reset();
          if (t != this._pre_sec) {
            if (((this._pre_sec = t), t > this._add)) {
              for (
                var e = (t - this._add).toString(), i = 0;
                i < this._img_countdown_c0.length;
                i++
              ) {
                a = this._img_countdown_c0[i];
                i < e.length
                  ? ((a.visible = true),
                    (a.skin = game.Tools.localUISrc(
                      'myres/mjdesktop/t_' + e[e.length - i - 1] + '.png'
                    )))
                  : (a.visible = false);
              }
              if (0 != this._add) {
                this._img_countdown_plus.visible = true;
                for (
                  var n = this._add.toString(), i = 0;
                  i < this._img_countdown_add.length;
                  i++
                ) {
                  a = this._img_countdown_add[i];
                  i < n.length
                    ? ((a.visible = true),
                      (a.skin = game.Tools.localUISrc(
                        'myres/mjdesktop/at_' + n[i] + '.png'
                      )))
                    : (a.visible = false);
                }
              } else {
                this._img_countdown_plus.visible = false;
                for (i = 0; i < this._img_countdown_add.length; i++)
                  this._img_countdown_add[i].visible = false;
              }
            } else {
              this._img_countdown_plus.visible = false;
              for (
                var e = t.toString(), i = 0;
                i < this._img_countdown_c0.length;
                i++
              ) {
                var a = this._img_countdown_c0[i];
                i < e.length
                  ? ((a.visible = true),
                    (a.skin = game.Tools.localUISrc(
                      'myres/mjdesktop/at_' + e[e.length - 1 - i] + '.png'
                    )))
                  : (a.visible = false);
              }
            }
            if (t > 3) {
              this._container_c1.visible = false;
              for (i = 0; i < this._img_countdown_c0.length; i++)
                this._img_countdown_c0[i].alpha = 1;
              (this._img_countdown_plus.alpha = 1),
                (this._container_c0.alpha = 1),
                (this._container_c1.alpha = 1);
            } else {
              view.AudioMgr.PlayAudio(205), (this._container_c1.visible = true);
              for (i = 0; i < this._img_countdown_c0.length; i++)
                this._img_countdown_c0[i].alpha = 1;
              (this._img_countdown_plus.alpha = 1),
                (this._container_c0.alpha = 1),
                (this._container_c1.alpha = 1);
              for (i = 0; i < this._img_countdown_c1.length; i++)
                (this._img_countdown_c1[i].visible = this._img_countdown_c0[
                  i
                ].visible),
                  (this._img_countdown_c1[i].skin = game.Tools.localUISrc(
                    this._img_countdown_c0[i].skin
                  ));
              r.Inst.me.cd1.play(0, false);
            }
          }
        }),
        (t.Inst = null),
        t
      );
    })(),
    i = (function() {
      function t(t) {
        (this.timer_id = 0), (this.last_returned = false), (this.me = t);
      }
      return (
        (t.prototype.begin_refresh = function() {
          this.timer_id && clearTimeout(this.timer_id),
            (this.last_returned = true),
            this._loop_refresh_delay(),
            Laya.timer.clearAll(this),
            Laya.timer.loop(100, this, this._loop_show);
        }),
        (t.prototype.close_refresh = function() {
          this.timer_id && (clearTimeout(this.timer_id), (this.timer_id = 0)),
            (this.last_returned = false),
            Laya.timer.clearAll(this);
        }),
        (t.prototype._loop_refresh_delay = function() {
          var t = this,
            e = 2e3;
          if (
            game.MJNetMgr.Inst.connect_state == game.EConnectState.connecting &&
            this.last_returned
          ) {
            var i = app.NetAgent.mj_network_delay;
            (e = i < 300 ? 2e3 : i < 800 ? 2500 + i : 4e3 + 0.5 * i),
              app.NetAgent.sendReq2MJ(
                'FastTest',
                'checkNetworkDelay',
                {},
                function() {
                  t.last_returned = true;
                }
              ),
              (this.last_returned = false);
          } else e = 1e3;
          this.timer_id = setTimeout(this._loop_refresh_delay.bind(this), e);
        }),
        (t.prototype._loop_show = function() {
          if (game.MJNetMgr.Inst.connect_state != game.EConnectState.connecting)
            this.me.skin = game.Tools.localUISrc(
              'myres/mjdesktop/signal_bad.png'
            );
          else {
            var t = app.NetAgent.mj_network_delay;
            this.me.skin =
              t < 300
                ? game.Tools.localUISrc('myres/mjdesktop/signal_good.png')
                : t < 800
                ? game.Tools.localUISrc('myres/mjdesktop/signal_normal.png')
                : game.Tools.localUISrc('myres/mjdesktop/signal_bad.png');
          }
        }),
        t
      );
    })(),
    n = (function() {
      function t(t, e) {
        var i = this;
        (this.enable = false),
          (this.emj_banned = false),
          (this.locking = false),
          (this.localposition = e),
          (this.me = t),
          (this.btn_banemj = t.getChildByName('btn_banemj')),
          (this.btn_banemj_origin_x = this.btn_banemj.x),
          (this.btn_banemj_origin_y = this.btn_banemj.y),
          (this.img_bannedemj = this.btn_banemj.getChildByName('banned')),
          (this.btn_seeinfo = t.getChildByName('btn_seeinfo')),
          (this.btn_seeinfo_origin_x = this.btn_seeinfo.x),
          (this.btn_seeinfo_origin_y = this.btn_seeinfo.y),
          (this.btn_change = t.getChildByName('btn_change')),
          (this.btn_change_origin_x = this.btn_change.x),
          (this.btn_change_origin_y = this.btn_change.y),
          (this.btn_banemj.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking ||
                ((i.emj_banned = !i.emj_banned),
                (i.img_bannedemj.visible = !i.emj_banned),
                i.close());
            },
            null,
            false
          )),
          (this.btn_seeinfo.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || (i.close(), r.Inst.btn_seeinfo(i.localposition));
            },
            null,
            false
          )),
          (this.btn_change.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking ||
                (i.close(),
                view.DesktopMgr.Inst.changeMainbody(
                  view.DesktopMgr.Inst.localPosition2Seat(i.localposition)
                ));
            },
            null,
            false
          )),
          (this.me.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.switch();
            },
            null,
            false
          ));
      }
      return (
        (t.prototype.reset = function(t, e, i) {
          Laya.timer.clearAll(this),
            (this.locking = false),
            (this.enable = false),
            (this.showinfo = t),
            (this.showemj = e),
            (this.showchange = i),
            (this.emj_banned = false),
            (this.btn_banemj.visible = false),
            (this.btn_seeinfo.visible = false),
            (this.img_bannedemj.visible = !this.emj_banned),
            (this.btn_change.visible = false);
        }),
        (t.prototype.onChangeSeat = function(t, e, i) {
          (this.showinfo = t),
            (this.showemj = e),
            (this.showchange = i),
            (this.enable = false),
            (this.btn_banemj.visible = false),
            (this.btn_seeinfo.visible = false),
            (this.btn_change.visible = false);
        }),
        (t.prototype.switch = function() {
          var t = this;
          this.locking ||
            (this.enable
              ? this.close()
              : ((this.enable = true),
                (this.locking = true),
                this.showinfo
                  ? ((this.btn_seeinfo.visible = true),
                    (this.btn_seeinfo.scaleX = this.btn_seeinfo.scaleY = 1),
                    (this.btn_seeinfo.x = this.btn_seeinfo_origin_x),
                    (this.btn_seeinfo.y = this.btn_seeinfo_origin_y),
                    (this.btn_seeinfo.alpha = 1),
                    Laya.Tween.from(
                      this.btn_seeinfo,
                      { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
                      150,
                      Laya.Ease.backOut
                    ))
                  : (this.btn_seeinfo.visible = false),
                this.showemj
                  ? ((this.img_bannedemj.visible = !this.emj_banned),
                    (this.btn_banemj.visible = true),
                    (this.btn_banemj.scaleX = this.btn_banemj.scaleY = 1),
                    (this.btn_banemj.x = this.btn_banemj_origin_x),
                    (this.btn_banemj.y = this.btn_banemj_origin_y),
                    (this.btn_banemj.alpha = 1),
                    Laya.Tween.from(
                      this.btn_banemj,
                      { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
                      150,
                      Laya.Ease.backOut
                    ))
                  : (this.btn_banemj.visible = false),
                this.showchange
                  ? ((this.btn_change.visible = true),
                    (this.btn_change.scaleX = this.btn_change.scaleY = 1),
                    (this.btn_change.x = this.btn_change_origin_x),
                    (this.btn_change.y = this.btn_change_origin_y),
                    (this.btn_change.alpha = 1),
                    Laya.Tween.from(
                      this.btn_change,
                      { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
                      150,
                      Laya.Ease.backOut
                    ))
                  : (this.btn_change.visible = false),
                Laya.timer.once(150, this, function() {
                  t.locking = false;
                })));
        }),
        (t.prototype.close = function() {
          var t = this;
          (this.enable = false),
            (this.locking = true),
            Laya.Tween.to(
              this.btn_banemj,
              { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
              150,
              Laya.Ease.backOut
            ),
            Laya.Tween.to(
              this.btn_seeinfo,
              { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
              150,
              Laya.Ease.backOut
            ),
            Laya.Tween.to(
              this.btn_change,
              { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
              150,
              Laya.Ease.backOut
            ),
            Laya.timer.once(150, this, function() {
              (t.locking = false),
                (t.btn_banemj.visible = false),
                (t.btn_seeinfo.visible = false),
                (t.btn_change.visible = false);
            });
        }),
        t
      );
    })(),
    a = (function() {
      function t(t) {
        var e = this;
        (this.btn_emos = []),
          (this.emos = []),
          (this.allgray = false),
          (this.me = t),
          (this.btn_chat = this.me.getChildByName('btn_chat')),
          (this.btn_chat.clickHandler = new Laya.Handler(this, function() {
            e.switchShow();
          })),
          (this.scrollbar = this.me.getChildByName('scrollbar_light').scriptMap[
            'capsui.CScrollBar'
          ]),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            new Laya.Handler(this, this.render_item),
            -1,
            3
          ),
          this.scrollview.reset(),
          this.scrollbar.init(null),
          this.scrollview.me.on('ratechange', this, function() {
            e.scrollview.total_height > 0
              ? e.scrollbar.setVal(
                  e.scrollview.rate,
                  e.scrollview.view_height / e.scrollview.total_height
                )
              : e.scrollbar.setVal(0, 1);
          }),
          'chs' != GameMgr.client_language
            ? ((t.getChildAt(5).visible = false), (t.getChildAt(6).visible = true))
            : ((t.getChildAt(5).visible = true), (t.getChildAt(6).visible = false));
      }
      return (
        (t.prototype.initRoom = function() {
          var t = view.DesktopMgr.Inst.main_role_character_info,
            e = cfg.item_definition.character.find(t.charid);
          this.emos = [];
          for (i = 0; i < 9; i++)
            this.emos.push({ path: e.emo + '/' + i + '.png', sub_id: i });
          if (t.extra_emoji)
            for (var i = 0; i < t.extra_emoji.length; i++)
              this.emos.push({
                path: e.emo + '/' + t.extra_emoji[i] + '.png',
                sub_id: t.extra_emoji[i]
              });
          (this.allgray = false),
            this.scrollbar.reset(),
            this.scrollview.reset(),
            this.scrollview.addItem(this.emos.length),
            (this.btn_chat.disabled = false),
            (this.me.x = 1903);
        }),
        (t.prototype.render_item = function(t) {
          var e = this,
            i = t.index,
            n = t.container,
            a = this.emos[i],
            r = n.getChildByName('btn');
          (r.skin = game.LoadMgr.getResImageSkin(a.path)),
            this.allgray
              ? game.Tools.setGrayDisable(r, true)
              : (game.Tools.setGrayDisable(r, false),
                (r.clickHandler = Laya.Handler.create(
                  this,
                  function() {
                    GameMgr.Inst.BehavioralStatistics(22),
                      app.NetAgent.sendReq2MJ(
                        'FastTest',
                        'broadcastInGame',
                        {
                          content: JSON.stringify({ emo: a.sub_id }),
                          except_self: false
                        },
                        function(t, e) {}
                      ),
                      e.change_all_gray(true),
                      Laya.timer.once(4e3, e, function() {
                        e.change_all_gray(false);
                      }),
                      e.switchShow();
                  },
                  null,
                  false
                )));
        }),
        (t.prototype.change_all_gray = function(t) {
          (this.allgray = t), this.scrollview.wantToRefreshAll();
        }),
        (t.prototype.switchShow = function() {
          var t = this,
            e = 0;
          (e = this.me.x < 1600 ? 1903 : 1382),
            Laya.Tween.to(
              this.me,
              { x: e },
              200,
              Laya.Ease.strongOut,
              Laya.Handler.create(this, function() {
                t.btn_chat.disabled = false;
              }),
              0,
              true,
              true
            ),
            (this.btn_chat.disabled = true);
        }),
        t
      );
    })(),
    r = (function(r) {
      function s() {
        var t = r.call(this, new ui.mj.desktopInfoUI()) || this;
        return (
          (t.container_doras = null),
          (t.doras = []),
          (t.label_md5 = null),
          (t.container_gamemode = null),
          (t.label_gamemode = null),
          (t.btn_auto_moqie = null),
          (t.btn_auto_nofulu = null),
          (t.btn_auto_hule = null),
          (t.img_zhenting = null),
          (t.btn_double_pass = null),
          (t._network_delay = null),
          (t._timecd = null),
          (t._player_infos = []),
          (t._container_fun = null),
          (t.showscoredeltaing = false),
          (t.arrow = null),
          (t._btn_leave = null),
          (t._btn_fanzhong = null),
          (t.block_emo = null),
          app.NetAgent.AddListener2MJ(
            'NotifyGameBroadcast',
            Laya.Handler.create(t, function(e) {
              t.onGameBroadcast(e);
            })
          ),
          app.NetAgent.AddListener2MJ(
            'NotifyPlayerConnectionState',
            Laya.Handler.create(t, function(e) {
              t.onPlayerConnectionState(e);
            })
          ),
          t
        );
      }
      return (
        __extends(s, r),
        (s.prototype.onCreate = function() {
          var r = this;
          (s.Inst = this), (this.doras = new Array());
          var o = this.me.getChildByName('container_lefttop'),
            l = o.getChildByName('container_doras');
          (this.container_doras = l),
            (this.container_gamemode = o.getChildByName('gamemode')),
            (this.label_gamemode = this.container_gamemode.getChildByName(
              'lb_mode'
            )),
            (this.label_md5 = o.getChildByName('MD5')),
            (o.getChildByName(
              'btn_md5change'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                if (r.label_md5.visible)
                  Laya.timer.clearAll(r.label_md5),
                    (r.label_md5.visible = false),
                    (r.container_doras.visible = true);
                else {
                  (r.label_md5.visible = true),
                    (r.label_md5.text =
                      game.Tools.strOfLocalization(2048) +
                      view.DesktopMgr.Inst.md5),
                    (r.container_doras.visible = false);
                  var t = r;
                  Laya.timer.once(5e3, r.label_md5, function() {
                    (t.label_md5.visible = false),
                      (t.container_doras.visible = true);
                  });
                }
              },
              null,
              false
            ));
          for (h = 0; h < l.numChildren; h++) this.doras.push(l.getChildAt(h));
          for (var h = 0; h < 4; h++) {
            var c = this.me.getChildByName('container_player_' + h),
              u = {};
            (u.container = c),
              (u.head = new t.UI_Head(c.getChildByName('head'))),
              (u.face = c
                .getChildByName('head')
                .getChildAt(0)
                .getChildAt(0)),
              (u.face.visible = false),
              (u.name = c
                .getChildByName('container_name')
                .getChildByName('label_name')),
              (u.container_shout = c.getChildByName('container_shout')),
              (u.container_shout.visible = false),
              (u.illust = u.container_shout
                .getChildByName('illust')
                .getChildByName('illust')),
              (u.illustrect = t.UIRect.CreateFromSprite(u.illust)),
              (u.shout_origin_x = u.container_shout.x),
              (u.shout_origin_y = u.container_shout.y),
              (u.container_emo = c.getChildByName('chat_bubble')),
              (u.emo = new t.UI_Character_Emo(
                u.container_emo.getChildByName('content')
              )),
              (u.container_emo.visible = false),
              (u.disconnect = c
                .getChildByName('head')
                .getChildAt(0)
                .getChildByName('disconnect')),
              (u.disconnect.visible = false),
              (u.title = new t.UI_PlayerTitle(c.getChildByName('title'))),
              0 == h
                ? (c.getChildByName(
                    'btn_seeinfo'
                  ).clickHandler = Laya.Handler.create(
                    this,
                    function() {
                      r.btn_seeinfo(0);
                    },
                    null,
                    false
                  ))
                : (u.headbtn = new n(c.getChildByName('btn_head'), h)),
              this._player_infos.push(u);
          }
          (this._timecd = new e(this.me.getChildByName('container_countdown'))),
            (this.img_zhenting = this.me.getChildByName('img_zhenting')),
            (this.img_zhenting.visible = false),
            this._initFunc(),
            (this.block_emo = new a(
              this.me.getChildByName('container_chat_choose')
            )),
            (this.me.getChildByName(
              'btn_change_score'
            ).clickHandler = Laya.Handler.create(
              this,
              this.onBtnShowScoreDelta,
              null,
              false
            )),
            (this._btn_leave = this.me
              .getChildByName('container_righttop')
              .getChildByName('btn_leave')),
            (this.me
              .getChildByName('container_righttop')
              .getChildByName('btn_leave').clickHandler = Laya.Handler.create(
              this,
              function() {
                view.DesktopMgr.Inst.mode == view.EMJMode.play
                  ? view.DesktopMgr.Inst.gameing &&
                    t.UI_SecondConfirm.Inst.show(
                      game.Tools.strOfLocalization(21),
                      Laya.Handler.create(r, function() {
                        if (view.DesktopMgr.Inst.gameing) {
                          for (
                            var t = 0, e = 0;
                            e < view.DesktopMgr.Inst.player_datas.length;
                            e++
                          ) {
                            var i = view.DesktopMgr.Inst.player_datas[e];
                            i &&
                              null != i.account_id &&
                              0 != i.account_id &&
                              t++;
                          }
                          1 == t
                            ? app.NetAgent.sendReq2MJ(
                                'FastTest',
                                'terminateGame',
                                {},
                                function(t, e) {
                                  game.Scene_MJ.Inst.GameEnd();
                                }
                              )
                            : game.Scene_MJ.Inst.ForceOut();
                        }
                      })
                    )
                  : game.Scene_MJ.Inst.ForceOut();
              },
              null,
              false
            )),
            (this.me
              .getChildByName('container_righttop')
              .getChildByName('btn_set').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_Config.Inst.show();
              },
              null,
              false
            )),
            (this._btn_fanzhong = this.me
              .getChildByName('container_righttop')
              .getChildByName('btn_fanzhong')),
            (this._btn_fanzhong.clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_Rules.Inst.show();
              },
              null,
              false
            )),
            (this.btn_double_pass = this.me.getChildByName('btn_double_pass')),
            (this.btn_double_pass.visible = false);
          var _ = 0;
          (this.btn_double_pass.clickHandler = Laya.Handler.create(
            this,
            function() {
              if (view.DesktopMgr.double_click_pass) {
                var e = Laya.timer.currTimer;
                if (_ + 300 > e) {
                  if (t.UI_ChiPengHu.Inst.enable)
                    t.UI_ChiPengHu.Inst.onDoubleClick();
                  else {
                    var i = view.DesktopMgr.Inst.mainrole.can_discard;
                    t.UI_LiQiZiMo.Inst.enable &&
                      (i = t.UI_LiQiZiMo.Inst.onDoubleClick(i)),
                      i && view.DesktopMgr.Inst.mainrole.onDoubleClick();
                  }
                  _ = 0;
                } else _ = e;
              }
            },
            null,
            false
          )),
            (this._network_delay = new i(this.me.getChildByName('img_signal')));
        }),
        (s.prototype.onGameBroadcast = function(t) {
          app.Log.log('NotifyGameBroadcast ' + JSON.stringify(t));
          var e = view.DesktopMgr.Inst.seat2LocalPosition(t.seat),
            i = JSON.parse(t.content);
          null != i.emo && undefined != i.emo && this.onShowEmo(e, i.emo);
        }),
        (s.prototype.onPlayerConnectionState = function(t) {
          app.Log.log('NotifyPlayerConnectionState msg: ' + JSON.stringify(t));
          var e = t.seat;
          if (
            (view.DesktopMgr.player_link_state ||
              (view.DesktopMgr.player_link_state = [
                view.ELink_State.NULL,
                view.ELink_State.NULL,
                view.ELink_State.NULL,
                view.ELink_State.NULL
              ]),
            view.DesktopMgr.player_link_state &&
              e < view.DesktopMgr.player_link_state.length &&
              (view.DesktopMgr.player_link_state[e] = t.state),
            this.enable)
          ) {
            var i = view.DesktopMgr.Inst.seat2LocalPosition(e);
            this._player_infos[i].disconnect.visible =
              t.state != view.ELink_State.READY;
          }
        }),
        (s.prototype._initFunc = function() {
          var t = this;
          this._container_fun = this.me.getChildByName('container_func');
          var e = this._container_fun.getChildByName('btn_func'),
            i = this._container_fun.getChildByName('btn_func2');
          e.clickHandler = i.clickHandler = new Laya.Handler(
            this,
            function() {
              var i = 0;
              t._container_fun.x < -400
                ? ((i = -274), (t.arrow.scaleX = 1))
                : ((i = -528), (t.arrow.scaleX = -1)),
                Laya.Tween.to(
                  t._container_fun,
                  { x: i },
                  200,
                  Laya.Ease.strongOut,
                  Laya.Handler.create(t, function() {
                    e.disabled = false;
                  }),
                  0,
                  true,
                  true
                ),
                (e.disabled = true);
            },
            null,
            false
          );
          var n = this._container_fun.getChildByName('btn_autolipai'),
            a = this._container_fun.getChildByName('btn_autolipai2');
          this.refreshFuncBtnShow(n, true),
            (n.clickHandler = a.clickHandler = Laya.Handler.create(
              this,
              function() {
                view.DesktopMgr.Inst.setAutoLiPai(
                  !view.DesktopMgr.Inst.auto_liqi
                ),
                  t.refreshFuncBtnShow(n, view.DesktopMgr.Inst.auto_liqi),
                  Laya.LocalStorage.setItem(
                    'autolipai',
                    view.DesktopMgr.Inst.auto_liqi ? 'true' : 'false'
                  );
              },
              null,
              false
            ));
          var r = this._container_fun.getChildByName('btn_autohu'),
            s = this._container_fun.getChildByName('btn_autohu2');
          this.refreshFuncBtnShow(r, false),
            (r.clickHandler = s.clickHandler = Laya.Handler.create(
              this,
              function() {
                view.DesktopMgr.Inst.setAutoHule(
                  !view.DesktopMgr.Inst.auto_hule
                ),
                  t.refreshFuncBtnShow(r, view.DesktopMgr.Inst.auto_hule);
              },
              null,
              false
            ));
          var o = this._container_fun.getChildByName('btn_autonoming'),
            l = this._container_fun.getChildByName('btn_autonoming2');
          this.refreshFuncBtnShow(o, false),
            (o.clickHandler = l.clickHandler = Laya.Handler.create(
              this,
              function() {
                view.DesktopMgr.Inst.setAutoNoFulu(
                  !view.DesktopMgr.Inst.auto_nofulu
                ),
                  t.refreshFuncBtnShow(o, view.DesktopMgr.Inst.auto_nofulu);
              },
              null,
              false
            ));
          var h = this._container_fun.getChildByName('btn_automoqie'),
            c = this._container_fun.getChildByName('btn_automoqie2');
          this.refreshFuncBtnShow(h, false),
            (h.clickHandler = c.clickHandler = Laya.Handler.create(
              this,
              function() {
                view.DesktopMgr.Inst.setAutoMoQie(
                  !view.DesktopMgr.Inst.auto_moqie
                ),
                  t.refreshFuncBtnShow(h, view.DesktopMgr.Inst.auto_moqie);
              },
              null,
              false
            )),
            Laya.Browser.onPC && !GameMgr.inConch
              ? ((e.visible = false),
                (s.visible = true),
                (a.visible = true),
                (l.visible = true),
                (c.visible = true))
              : ((e.visible = true),
                (s.visible = false),
                (a.visible = false),
                (l.visible = false),
                (c.visible = false)),
            (this.arrow = this._container_fun.getChildByName('arrow')),
            (this.arrow.scaleX = -1);
        }),
        (s.prototype.noAutoLipai = function() {
          var t = this._container_fun.getChildByName('btn_autolipai');
          (view.DesktopMgr.Inst.auto_liqi = true), t.clickHandler.run();
        }),
        (s.prototype.resetFunc = function() {
          var t = Laya.LocalStorage.getItem('autolipai'),
            e = true;
          e = !t || '' == t || 'true' == t;
          var i = this._container_fun.getChildByName('btn_autolipai');
          this.refreshFuncBtnShow(i, e),
            Laya.LocalStorage.setItem('autolipai', e ? 'true' : 'false'),
            view.DesktopMgr.Inst.setAutoLiPai(e);
          var n = this._container_fun.getChildByName('btn_autohu');
          this.refreshFuncBtnShow(n, view.DesktopMgr.Inst.auto_hule);
          var a = this._container_fun.getChildByName('btn_autonoming');
          this.refreshFuncBtnShow(a, view.DesktopMgr.Inst.auto_nofulu);
          var r = this._container_fun.getChildByName('btn_automoqie');
          this.refreshFuncBtnShow(r, view.DesktopMgr.Inst.auto_moqie),
            (this._container_fun.x = -528),
            (this.arrow.scaleX = -1);
        }),
        (s.prototype.setDora = function(t, e) {
          if (t < 0 || t >= this.doras.length) console.error('setDora pos错误');
          else {
            var i = 'myres2/mjp/' + GameMgr.Inst.mjp_view + '/ui/';
            this.doras[t].skin = game.Tools.localUISrc(
              i + e.toString() + '.png'
            );
          }
        }),
        (s.prototype.initRoom = function() {
          var t = this;
          if (
            view.DesktopMgr.Inst.mode == view.EMJMode.play ||
            view.DesktopMgr.Inst.mode == view.EMJMode.live_broadcast
          ) {
            for (
              var e = {}, i = 0;
              i < view.DesktopMgr.Inst.player_datas.length;
              i++
            ) {
              for (
                var n = view.DesktopMgr.Inst.player_datas[i].character,
                  a = n.charid,
                  r = cfg.item_definition.character.find(a).emo,
                  s = 0;
                s < 9;
                s++
              ) {
                e[(o = r + '/' + s.toString() + '.png')] = 1;
              }
              if (n.extra_emoji)
                for (s = 0; s < n.extra_emoji.length; s++) {
                  var o = r + '/' + n.extra_emoji[s].toString() + '.png';
                  e[o] = 1;
                }
            }
            var l = [];
            for (var h in e) l.push(h);
            game.LoadMgr.loadResImage(
              l,
              Laya.Handler.create(this, function() {
                t.block_emo.initRoom();
              })
            );
          }
          if (
            ((this._btn_leave.visible = true),
            (this._btn_fanzhong.visible = false),
            view.DesktopMgr.Inst.mode == view.EMJMode.play)
          ) {
            for (
              var c = 0, i = 0;
              i < view.DesktopMgr.Inst.player_datas.length;
              i++
            ) {
              (u = view.DesktopMgr.Inst.player_datas[i]) &&
                null != u.account_id &&
                0 != u.account_id &&
                c++;
            }
            (c > 1 || 4 == view.DesktopMgr.Inst.game_config.category) &&
              ((this._btn_leave.visible = false),
              (this._btn_fanzhong.visible = true));
          }
          for (i = 0; i < view.DesktopMgr.Inst.player_datas.length; i++) {
            var u = view.DesktopMgr.Inst.player_datas[i];
            u && null != u.account_id && 0 != u.account_id && 0;
          }
          if (
            ((this.block_emo.me.visible =
              view.DesktopMgr.Inst.mode == view.EMJMode.play),
            (this._container_fun.visible =
              view.DesktopMgr.Inst.mode == view.EMJMode.play),
            (this.enable = true),
            this.setLiqibang(0),
            this.setBen(0),
            view.DesktopMgr.Inst.game_config)
          ) {
            var _ = view.DesktopMgr.Inst.game_config,
              d = game.Tools.get_room_desc(_);
            (this.label_gamemode.text = d.text),
              (this.container_gamemode.visible = true);
          } else this.container_gamemode.visible = false;
          (this.btn_double_pass.visible =
            view.DesktopMgr.Inst.mode == view.EMJMode.play),
            view.DesktopMgr.Inst.mode == view.EMJMode.play
              ? (this._network_delay.begin_refresh(),
                (this._network_delay.me.visible = true))
              : (this._network_delay.me.visible = false);
        }),
        (s.prototype.onCloseRoom = function() {
          this._network_delay.close_refresh();
        }),
        (s.prototype.refreshSeat = function(t) {
          undefined === t && (t = false);
          view.DesktopMgr.Inst.seat;
          for (var e = view.DesktopMgr.Inst.player_datas, i = 0; i < 4; i++) {
            var n = view.DesktopMgr.Inst.localPosition2Seat(i),
              a = this._player_infos[i];
            if (n < 0) a.container.visible = false;
            else {
              if (
                ((a.container.visible = true),
                (a.name.text = e[n].nickname),
                (a.head.id = e[n].avatar_id),
                (a.avatar = e[n].avatar_id),
                a.head.setEmo(''),
                0 != i)
              ) {
                var r =
                    e[n].account_id &&
                    0 != e[n].account_id &&
                    view.DesktopMgr.Inst.mode != view.EMJMode.paipu,
                  s =
                    e[n].account_id &&
                    0 != e[n].account_id &&
                    view.DesktopMgr.Inst.mode == view.EMJMode.play,
                  o = view.DesktopMgr.Inst.mode != view.EMJMode.play;
                t ? a.headbtn.onChangeSeat(r, s, o) : a.headbtn.reset(r, s, o);
              }
              e[n].title
                ? (a.title.id = game.Tools.titleLocalization(
                    e[n].account_id,
                    e[n].title
                  ))
                : (a.title.id = 0);
            }
          }
        }),
        (s.prototype.refreshLinks = function() {
          view.DesktopMgr.Inst.seat;
          for (var t = 0; t < 4; t++) {
            var e = view.DesktopMgr.Inst.localPosition2Seat(t);
            view.DesktopMgr.Inst.mode == view.EMJMode.play
              ? (this._player_infos[t].disconnect.visible =
                  -1 != e &&
                  0 != t &&
                  view.DesktopMgr.player_link_state[e] !=
                    view.ELink_State.READY)
              : view.DesktopMgr.Inst.mode == view.EMJMode.live_broadcast
              ? -1 == e || 0 == view.DesktopMgr.Inst.player_datas[e].account_id
                ? (this._player_infos[t].disconnect.visible = false)
                : (this._player_infos[t].disconnect.visible =
                    view.DesktopMgr.player_link_state[e] !=
                    view.ELink_State.READY)
              : view.DesktopMgr.Inst.mode == view.EMJMode.paipu &&
                (this._player_infos[t].disconnect.visible = false);
          }
        }),
        (s.prototype.setBen = function(t) {
          t > 99 && (t = 99);
          var e = this.me.getChildByName('container_lefttop'),
            i = e.getChildByName('num_ben_0'),
            n = e.getChildByName('num_ben_1');
          t >= 10
            ? ((i.skin = game.Tools.localUISrc(
                'myres/mjdesktop/w_' + Math.floor(t / 10).toString() + '.png'
              )),
              (n.skin = game.Tools.localUISrc(
                'myres/mjdesktop/w_' + (t % 10).toString() + '.png'
              )),
              (n.visible = true))
            : ((i.skin = game.Tools.localUISrc(
                'myres/mjdesktop/w_' + (t % 10).toString() + '.png'
              )),
              (n.visible = false));
        }),
        (s.prototype.setLiqibang = function(t) {
          t > 99 && (t = 99);
          var e = this.me.getChildByName('container_lefttop'),
            i = e.getChildByName('num_lizhi_0'),
            n = e.getChildByName('num_lizhi_1');
          t >= 10
            ? ((n.skin = game.Tools.localUISrc(
                'myres/mjdesktop/w_' + (t % 10).toString() + '.png'
              )),
              (i.skin = game.Tools.localUISrc(
                'myres/mjdesktop/w_' + Math.floor(t / 10).toString() + '.png'
              )),
              (n.visible = true))
            : ((i.skin = game.Tools.localUISrc(
                'myres/mjdesktop/w_' + t.toString() + '.png'
              )),
              (n.visible = false));
        }),
        (s.prototype.reset_rounds = function() {
          this.closeCountDown(),
            (this.showscoredeltaing = false),
            view.DesktopMgr.Inst.setScoreDelta(false);
          for (
            var t = 'myres2/mjp/' + GameMgr.Inst.mjp_view + '/ui/', e = 0;
            e < this.doras.length;
            e++
          )
            this.doras[e].skin = game.Tools.localUISrc(t + 'back.png');
          for (e = 0; e < 4; e++)
            (this._player_infos[e].container_emo.visible = false),
              this._player_infos[e].head.setEmo('');
          this._timecd.reset(),
            Laya.timer.clearAll(this),
            Laya.timer.clearAll(this.label_md5),
            (this.container_doras.visible = true),
            (this.label_md5.visible = false);
        }),
        (s.prototype.showCountDown = function(t, e) {
          this._timecd.showCD(t, e);
        }),
        (s.prototype.setZhenting = function(t) {
          this.img_zhenting.visible = t;
        }),
        (s.prototype.shout = function(t, e, i) {
          app.Log.log('shout:' + t + ' type:' + e);
          try {
            var n = this._player_infos[t],
              a = n.container_shout,
              r = a.getChildByName('img_content'),
              s = a.getChildByName('illust').getChildByName('illust');
            '' == e
              ? (r.visible = false)
              : ((r.visible = true),
                (r.skin = game.Tools.localUISrc(
                  'myres/mjdesktop/shout_' + e + '.png'
                ))),
              game.Tools.charaPart(i.avatar_id, s, 'half', n.illustrect, true);
            var o = 0,
              l = 0;
            switch (t) {
              case 0:
                (o = -105), (l = 0);
                break;
              case 1:
                (o = 500), (l = 0);
                break;
              case 2:
                (o = 0), (l = -300);
                break;
              default:
                (o = -500), (l = 0);
            }
            (a.visible = true),
              (a.alpha = 0),
              (a.x = n.shout_origin_x + o),
              (a.y = n.shout_origin_y + l),
              Laya.Tween.to(
                a,
                { alpha: 1, x: n.shout_origin_x, y: n.shout_origin_y },
                70
              ),
              Laya.Tween.to(a, { alpha: 0 }, 150, null, null, 600),
              Laya.timer.once(800, this, function() {
                Laya.loader.clearTextureRes(s.skin), (a.visible = false);
              });
          } catch (t) {
            var h = {};
            (h.error = t.message),
              (h.stack = t.stack),
              (h.method = 'shout'),
              (h.class = 'UI_DesktopInfos'),
              GameMgr.Inst.onFatalError(h);
          }
        }),
        (s.prototype.closeCountDown = function() {
          this._timecd.close();
        }),
        (s.prototype.refreshFuncBtnShow = function(t, e) {
          var i = t.getChildByName('img_choosed');
          (t.getChildByName('out').color = e ? '#3bd647' : '#7992b3'),
            (i.visible = e);
        }),
        (s.prototype.onShowEmo = function(t, e) {
          var i = this._player_infos[t];
          if (0 == t || !i.headbtn.emj_banned) {
            var n = i.container_emo,
              a =
                view.DesktopMgr.Inst.player_datas[
                  view.DesktopMgr.Inst.localPosition2Seat(t)
                ].character.charid;
            i.emo.setSkin(a, e),
              (n.visible = true),
              (n.scaleX = n.scaleY = 0),
              Laya.Tween.to(
                n,
                { scaleX: 1, scaleY: 1 },
                120,
                null,
                null,
                0,
                true,
                true
              ),
              Laya.timer.once(3e3, this, function() {
                Laya.Tween.to(
                  n,
                  { scaleX: 0, scaleY: 0 },
                  120,
                  null,
                  null,
                  0,
                  true,
                  true
                );
              }),
              Laya.timer.once(3500, this, function() {
                n.visible = false;
              });
          }
        }),
        (s.prototype.changeHeadEmo = function(t, e, i) {
          var n = view.DesktopMgr.Inst.seat2LocalPosition(t);
          this._player_infos[n];
        }),
        (s.prototype.onBtnShowScoreDelta = function() {
          var t = this;
          this.showscoredeltaing ||
            ((this.showscoredeltaing = true),
            view.DesktopMgr.Inst.setScoreDelta(true),
            Laya.timer.once(5e3, this, function() {
              (t.showscoredeltaing = false),
                view.DesktopMgr.Inst.setScoreDelta(false);
            }));
        }),
        (s.prototype.btn_seeinfo = function(e) {
          if (
            view.DesktopMgr.Inst.mode != view.EMJMode.paipu &&
            view.DesktopMgr.Inst.gameing
          ) {
            var i =
              view.DesktopMgr.Inst.player_datas[
                view.DesktopMgr.Inst.localPosition2Seat(e)
              ].account_id;
            0 != i &&
              (view.DesktopMgr.Inst.game_config,
              t.UI_OtherPlayerInfo.Inst.show(
                i,
                view.DesktopMgr.Inst.game_config.mode.mode < 10 ? 1 : 2
              ));
          }
        }),
        (s.Inst = null),
        s
      );
    })(t.UIBase);
  t.UI_DesktopInfo = r;
})(uiscript || (uiscript = {}));