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
    function t(e) {
      this.me = null;
      this._container_c0 = null;
      this._img_countdown_c0 = [];
      this._container_c1 = null;
      this._img_countdown_c1 = [];
      this._img_countdown_plus = null;
      this._img_countdown_add = [];
      this._start = 0;
      this._pre_sec = 0;
      this._fix = 0;
      this._add = 0;
      this._pre_time = 0;
      t.Inst = this;
      this.me = e;
      this._container_c0 = this.me.getChildByName('c0');
      for (i = 0; i < 2; i++)
        this._img_countdown_c0.push(
          this._container_c0.getChildByName(`num${i}`)
        );
      this._container_c1 = this.me.getChildByName('c1');
      for (i = 0; i < 2; i++)
        this._img_countdown_c1.push(
          this._container_c1.getChildByName(`num${i}`)
        );
      for (var i = 0; i < 2; i++)
        this._img_countdown_add.push(
          this.me.getChildByName('plus').getChildByName(`add_${i}`)
        );
      this._img_countdown_plus = this.me.getChildByName('plus');
      this.me.visible = !1;
    }

    Object.defineProperty(t.prototype, 'timeuse', {
      get() {
        return this.me.visible
          ? Math.floor((Laya.timer.currTimer - this._start) / 1e3)
          : 0;
      },
      enumerable: !0,
      configurable: !0
    });

    t.prototype.reset = function() {
      this.me.visible = !1;
      Laya.timer.clearAll(this);
    };

    t.prototype.showCD = function(t, e) {
      var i = this;
      this.me.visible = !0;
      this._start = Laya.timer.currTimer;
      this._fix = Math.floor(t / 1e3);
      this._add = Math.floor(e / 1e3);
      this._pre_sec = -1;
      this._pre_time = Laya.timer.currTimer;
      this._show();
      Laya.timer.frameLoop(1, this, () => {
        var t = Laya.timer.currTimer - i._pre_time;
        i._pre_time = Laya.timer.currTimer;
        view.DesktopMgr.Inst.timestoped ? (i._start += t) : i._show();
      });
    };

    t.prototype.close = function() {
      this.reset();
    };

    t.prototype._show = function() {
      var t = this._fix + this._add - this.timeuse;
      view.DesktopMgr.Inst.OperationTimeOut();
      if (t <= 0)
        return void this.reset();
      if (t != this._pre_sec) {
        this._pre_sec = t;
        if ((t > this._add)) {
          for (
            var e = (t - this._add).toString(), i = 0;
            i < this._img_countdown_c0.length;
            i++
          ) {
            a = this._img_countdown_c0[i];
            a.visible = !0;
            i < e.length
              ? (a.skin = game.Tools.localUISrc(
                  `myres/mjdesktop/t_${e[e.length - i - 1]}.png`
                ))
              : (a.visible = !1);
          }
          if (0 != this._add) {
            this._img_countdown_plus.visible = !0;
            for (
              var n = this._add.toString(), i = 0;
              i < this._img_countdown_add.length;
              i++
            ) {
              a = this._img_countdown_add[i];
              a.visible = !0;
              i < n.length
                ? (a.skin = game.Tools.localUISrc(
                    `myres/mjdesktop/at_${n[i]}.png`
                  ))
                : (a.visible = !1);
            }
          } else {
            this._img_countdown_plus.visible = !1;
            for (i = 0; i < this._img_countdown_add.length; i++)
              this._img_countdown_add[i].visible = !1;
          }
        } else {
          this._img_countdown_plus.visible = !1;
          for (
            var e = t.toString(), i = 0;
            i < this._img_countdown_c0.length;
            i++
          ) {
            var a = this._img_countdown_c0[i];
            a.visible = !0;
            i < e.length
              ? (a.skin = game.Tools.localUISrc(
                  `myres/mjdesktop/at_${e[e.length - 1 - i]}.png`
                ))
              : (a.visible = !1);
          }
        }
        if (t > 3) {
          this._container_c1.visible = !1;
          for (i = 0; i < this._img_countdown_c0.length; i++)
            this._img_countdown_c0[i].alpha = 1;
          this._img_countdown_plus.alpha = 1;
          this._container_c0.alpha = 1;
          this._container_c1.alpha = 1;
        } else {
          view.AudioMgr.PlayAudio(205);
          this._container_c1.visible = !0;
          for (i = 0; i < this._img_countdown_c0.length; i++)
            this._img_countdown_c0[i].alpha = 1;
          this._img_countdown_plus.alpha = 1;
          this._container_c0.alpha = 1;
          this._container_c1.alpha = 1;

          this._img_countdown_c1[i].visible = this._img_countdown_c0[
            i
          ].visible;

          for (i = 0; i < this._img_countdown_c1.length; i++)
            this._img_countdown_c1[i].skin = game.Tools.localUISrc(
                this._img_countdown_c0[i].skin
              );
          s.Inst.me.cd1.play(0, !1);
        }
      }
    };

    t.Inst = null;
    return t;
  })();

  var i = (() => {
    function t(t) {
      this.timer_id = 0;
      this.last_returned = !1;
      this.me = t;
    }

    t.prototype.begin_refresh = function() {
      this.timer_id && clearTimeout(this.timer_id);
      this.last_returned = !0;
      this._loop_refresh_delay();
      Laya.timer.clearAll(this);
      Laya.timer.loop(100, this, this._loop_show);
    };

    t.prototype.close_refresh = function() {
      clearTimeout(this.timer_id);
      this.timer_id && ((this.timer_id = 0));
      this.last_returned = !1;
      Laya.timer.clearAll(this);
    };

    t.prototype._loop_refresh_delay = function() {
      var t = this,
        e = 2e3;
      if (
        game.MJNetMgr.Inst.connect_state == game.EConnectState.connecting &&
        this.last_returned
      ) {
        var i = app.NetAgent.mj_network_delay;
        e = i < 300 ? 2e3 : i < 800 ? 2500 + i : 4e3 + 0.5 * i;

        app.NetAgent.sendReq2MJ(
          'FastTest',
          'checkNetworkDelay',
          {},
          () => {
            t.last_returned = !0;
          }
        );

        this.last_returned = !1;
      } else e = 1e3;
      this.timer_id = setTimeout(this._loop_refresh_delay.bind(this), e);
    };

    t.prototype._loop_show = function() {
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
    };

    return t;
  })();

  var n = (() => {
    function t(t, e) {
      var i = this;
      this.enable = !1;
      this.emj_banned = !1;
      this.locking = !1;
      this.localposition = e;
      this.me = t;
      this.btn_banemj = t.getChildByName('btn_banemj');
      this.btn_banemj_origin_x = this.btn_banemj.x;
      this.btn_banemj_origin_y = this.btn_banemj.y;
      this.img_bannedemj = this.btn_banemj.getChildByName('banned');
      this.btn_seeinfo = t.getChildByName('btn_seeinfo');
      this.btn_seeinfo_origin_x = this.btn_seeinfo.x;
      this.btn_seeinfo_origin_y = this.btn_seeinfo.y;
      this.btn_change = t.getChildByName('btn_change');
      this.btn_change_origin_x = this.btn_change.x;
      this.btn_change_origin_y = this.btn_change.y;

      this.btn_banemj.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.emj_banned = !i.emj_banned;
            i.img_bannedemj.visible = !i.emj_banned;
            i.locking ||
              (i.close());
          },
          null,
          !1
        );

      this.btn_seeinfo.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.close();
            i.locking || (s.Inst.btn_seeinfo(i.localposition));
          },
          null,
          !1
        );

      this.btn_change.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.close();
            i.locking ||
              (view.DesktopMgr.Inst.changeMainbody(
              view.DesktopMgr.Inst.localPosition2Seat(i.localposition)
            ));
          },
          null,
          !1
        );

      this.me.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking || i.switch();
          },
          null,
          !1
        );
    }

    t.prototype.reset = function(t, e, i) {
      Laya.timer.clearAll(this);
      this.locking = !1;
      this.enable = !1;
      this.showinfo = t;
      this.showemj = e;
      this.showchange = i;
      this.emj_banned = !1;
      this.btn_banemj.visible = !1;
      this.btn_seeinfo.visible = !1;
      this.img_bannedemj.visible = !this.emj_banned;
      this.btn_change.visible = !1;
    };

    t.prototype.onChangeSeat = function(t, e, i) {
      this.showinfo = t;
      this.showemj = e;
      this.showchange = i;
      this.enable = !1;
      this.btn_banemj.visible = !1;
      this.btn_seeinfo.visible = !1;
      this.btn_change.visible = !1;
    };

    t.prototype.switch = function() {
      var t = this;
      this.enable = !0;
      this.locking = !0;
      this.btn_seeinfo.visible = !0;
      this.btn_seeinfo.scaleX = this.btn_seeinfo.scaleY = 1;
      this.btn_seeinfo.x = this.btn_seeinfo_origin_x;
      this.btn_seeinfo.y = this.btn_seeinfo_origin_y;
      this.btn_seeinfo.alpha = 1;

      this.showinfo
        ? (Laya.Tween.from(
        this.btn_seeinfo,
        { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
        150,
        Laya.Ease.backOut
      ))
        : (this.btn_seeinfo.visible = !1);

      this.img_bannedemj.visible = !this.emj_banned;
      this.btn_banemj.visible = !0;
      this.btn_banemj.scaleX = this.btn_banemj.scaleY = 1;
      this.btn_banemj.x = this.btn_banemj_origin_x;
      this.btn_banemj.y = this.btn_banemj_origin_y;
      this.btn_banemj.alpha = 1;

      this.showemj
        ? (Laya.Tween.from(
        this.btn_banemj,
        { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
        150,
        Laya.Ease.backOut
      ))
        : (this.btn_banemj.visible = !1);

      this.btn_change.visible = !0;
      this.btn_change.scaleX = this.btn_change.scaleY = 1;
      this.btn_change.x = this.btn_change_origin_x;
      this.btn_change.y = this.btn_change_origin_y;
      this.btn_change.alpha = 1;

      this.showchange
        ? (Laya.Tween.from(
        this.btn_change,
        { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
        150,
        Laya.Ease.backOut
      ))
        : (this.btn_change.visible = !1);

      this.locking ||
        (this.enable
          ? this.close()
          : (Laya.timer.once(150, this, () => {
        t.locking = !1;
      })));
    };

    t.prototype.close = function() {
      var t = this;
      this.enable = !1;
      this.locking = !0;

      Laya.Tween.to(
        this.btn_banemj,
        { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
        150,
        Laya.Ease.backOut
      );

      Laya.Tween.to(
        this.btn_seeinfo,
        { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
        150,
        Laya.Ease.backOut
      );

      Laya.Tween.to(
        this.btn_change,
        { x: 80, y: 80, scaleX: 0, scaleY: 0, alpha: 0 },
        150,
        Laya.Ease.backOut
      );

      Laya.timer.once(150, this, () => {
        t.locking = !1;
        t.btn_banemj.visible = !1;
        t.btn_seeinfo.visible = !1;
        t.btn_change.visible = !1;
      });
    };

    return t;
  })();

  var a = (() => {
    class t {
      constructor(t) {
        var e = this;
        this.btn_emos = [];
        this.emos = [];
        this.allgray = !1;
        this.me = t;
        this.btn_chat = this.me.getChildByName('btn_chat');

        this.btn_chat.clickHandler = new Laya.Handler(this, () => {
            e.switchShow();
          });

        this.scrollbar = this.me.getChildByName('scrollbar_light').scriptMap[
            'capsui.CScrollBar'
          ];

        this.scrollview = this.me.scriptMap['capsui.CScrollView'];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          3
        );

        this.scrollview.reset();
        this.scrollbar.init(null);

        this.scrollview.me.on('ratechange', this, () => {
          e.scrollview.total_height > 0
            ? e.scrollbar.setVal(
                e.scrollview.rate,
                e.scrollview.view_height / e.scrollview.total_height
              )
            : e.scrollbar.setVal(0, 1);
        });

        t.getChildAt(5).visible = !1;
        t.getChildAt(5).visible = !0;
        'chs' != GameMgr.client_language
          ? (t.getChildAt(6).visible = !0)
          : (t.getChildAt(6).visible = !1);
      }

      initRoom() {
        var t = view.DesktopMgr.Inst.main_role_character_info,
          e = cfg.item_definition.character.find(t.charid);
        this.emos = [];
        for (i = 0; i < 9; i++)
          this.emos.push({ path: `${e.emo}/${i}.png`, sub_id: i });
        if (t.extra_emoji)
          for (var i = 0; i < t.extra_emoji.length; i++)
            this.emos.push({
              path: `${e.emo}/${t.extra_emoji[i]}.png`,
              sub_id: t.extra_emoji[i]
            });
        this.allgray = !1;
        this.scrollbar.reset();
        this.scrollview.reset();
        this.scrollview.addItem(this.emos.length);
        this.btn_chat.disabled = !1;
        this.me.x = 1903;
      }

      render_item({index, container}) {
        var e = this,
          i = index,
          n = container,
          a = this.emos[i],
          r = n.getChildByName('btn');
        r.skin = game.LoadMgr.getResImageSkin(a.path);
        game.Tools.setGrayDisable(r, !1);
        this.allgray
          ? game.Tools.setGrayDisable(r, !0)
          : (r.clickHandler = Laya.Handler.create(
              this,
              () => {
                GameMgr.Inst.BehavioralStatistics(22);

                app.NetAgent.sendReq2MJ(
                  'FastTest',
                  'broadcastInGame',
                  {
                    content: JSON.stringify({ emo: a.sub_id }),
                    except_self: !1
                  },
                  (t, e) => {}
                );

                e.change_all_gray(!0);

                Laya.timer.once(5e3, e, () => {
                  e.change_all_gray(!1);
                });

                e.switchShow();
              },
              null,
              !1
            ));
      }

      change_all_gray(t) {
        this.allgray = t;
        this.scrollview.wantToRefreshAll();
      }

      switchShow() {
        var t = this,
          e = 0;
        e = this.me.x < 1600 ? 1903 : 1382;

        Laya.Tween.to(
          this.me,
          { x: e },
          200,
          Laya.Ease.strongOut,
          Laya.Handler.create(this, () => {
            t.btn_chat.disabled = !1;
          }),
          0,
          !0,
          !0
        );

        this.btn_chat.disabled = !0;
      }
    }

    return t;
  })();

  var r = (() => {
    class e {
      constructor(e) {
        this.effect = null;
        this.container_emo = e.getChildByName('chat_bubble');

        this.emo = new t.UI_Character_Emo(
            this.container_emo.getChildByName('content')
          );

        this.root_effect = e.getChildByName('root_effect');
        this.container_emo.visible = !1;
      }

      show(t, e) {
        for (
          var i = this,
            n =
              view.DesktopMgr.Inst.player_datas[
                view.DesktopMgr.Inst.localPosition2Seat(t)
              ].character.charid,
            a = cfg.character.emoji.getGroup(n),
            r = '',
            s = 0;
          s < a.length;
          s++
        )
          if (a[s].sub_id == e) {
            2 == a[s].type && (r = a[s].view);
            break;
          }
        this.effect.destory();
        this.effect && ((this.effect = null));

        this.effect = game.FrontEffect.Inst.create_ui_effect(
              this.root_effect,
              `scene/${r}.lh`,
              new Laya.Point(0, 0),
              1,
              !0
            );

        Laya.timer.once(3500, this, () => {
          i.effect.destory();
          i.effect = null;
        });

        this.emo.setSkin(n, e);
        this.container_emo.visible = !0;
        this.container_emo.scaleX = this.container_emo.scaleY = 0;

        Laya.Tween.to(
          this.container_emo,
          { scaleX: 1, scaleY: 1 },
          120,
          null,
          null,
          0,
          !0,
          !0
        );

        Laya.timer.once(3e3, this, () => {
          i.emo.clear();
          Laya.Tween.to(
            i.container_emo,
            { scaleX: 0, scaleY: 0 },
            120,
            null,
            null,
            0,
            !0,
            !0
          );
        });

        r
          ? (view.AudioMgr.PlayAudio(242))
          : (Laya.timer.once(3500, this, () => {
          i.container_emo.visible = !1;
        }));
      }

      reset() {
        Laya.timer.clearAll(this);
        this.emo.clear();
        this.container_emo.visible = !1;
        this.effect.destory();
        this.effect && ((this.effect = null));
      }
    }

    return e;
  })();

  var s = (s => {
    class o {
      constructor() {
        var t = s.call(this, new ui.mj.desktopInfoUI()) || this;
        t.container_doras = null;
        t.doras = [];
        t.label_md5 = null;
        t.container_gamemode = null;
        t.label_gamemode = null;
        t.btn_auto_moqie = null;
        t.btn_auto_nofulu = null;
        t.btn_auto_hule = null;
        t.img_zhenting = null;
        t.btn_double_pass = null;
        t._network_delay = null;
        t._timecd = null;
        t._player_infos = [];
        t._container_fun = null;
        t.showscoredeltaing = !1;
        t.arrow = null;
        t._btn_leave = null;
        t._btn_fanzhong = null;
        t.block_emo = null;

        app.NetAgent.AddListener2MJ(
          'NotifyGameBroadcast',
          Laya.Handler.create(t, e => {
            t.onGameBroadcast(e);
          })
        );

        app.NetAgent.AddListener2MJ(
          'NotifyPlayerConnectionState',
          Laya.Handler.create(t, e => {
            t.onPlayerConnectionState(e);
          })
        );

        return t;
      }

      onCreate() {
        var s = this;
        o.Inst = this;
        this.doras = new Array();
        var l = this.me.getChildByName('container_lefttop'),
          h = l.getChildByName('container_doras');
        this.container_doras = h;
        this.container_gamemode = l.getChildByName('gamemode');

        this.label_gamemode = this.container_gamemode.getChildByName(
            'lb_mode'
          );

        this.label_md5 = l.getChildByName('MD5');
        l.getChildByName(
            'btn_md5change'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              Laya.timer.clearAll(s.label_md5);
              s.label_md5.visible = !1;
              if (s.label_md5.visible)
                s.container_doras.visible = !0;
              else {
                s.label_md5.visible = !0;

                s.label_md5.text =
                    game.Tools.strOfLocalization(2048) +
                    view.DesktopMgr.Inst.md5;

                s.container_doras.visible = !1;
                var t = s;
                Laya.timer.once(5e3, s.label_md5, () => {
                  t.label_md5.visible = !1;
                  t.container_doras.visible = !0;
                });
              }
            },
            null,
            !1
          );
        for (c = 0; c < h.numChildren; c++) this.doras.push(h.getChildAt(c));
        for (var c = 0; c < 4; c++) {
          var u = this.me.getChildByName(`container_player_${c}`),
            _ = {};
          _.container = u;
          _.head = new t.UI_Head(u.getChildByName('head'));

          _.name = u
              .getChildByName('container_name')
              .getChildByName('label_name');

          _.container_shout = u.getChildByName('container_shout');
          _.container_shout.visible = !1;

          _.illust = _.container_shout
              .getChildByName('illust')
              .getChildByName('illust');

          _.illustrect = t.UIRect.CreateFromSprite(_.illust);
          _.shout_origin_x = _.container_shout.x;
          _.shout_origin_y = _.container_shout.y;
          _.emo = new r(u);

          _.disconnect = u
              .getChildByName('head')
              .getChildByName('head')
              .getChildByName('disconnect');

          _.disconnect.visible = !1;
          _.title = new t.UI_PlayerTitle(u.getChildByName('title'));

          0 == c
            ? (u.getChildByName(
                'btn_seeinfo'
              ).clickHandler = Laya.Handler.create(
                this,
                () => {
                  s.btn_seeinfo(0);
                },
                null,
                !1
              ))
            : (_.headbtn = new n(u.getChildByName('btn_head'), c));

          this._player_infos.push(_);
        }
        this._timecd = new e(this.me.getChildByName('container_countdown'));
        this.img_zhenting = this.me.getChildByName('img_zhenting');
        this.img_zhenting.visible = !1;
        this._initFunc();

        this.block_emo = new a(
            this.me.getChildByName('container_chat_choose')
          );

        this.me.getChildByName(
            'btn_change_score'
          ).clickHandler = Laya.Handler.create(
            this,
            this.onBtnShowScoreDelta,
            null,
            !1
          );

        this._btn_leave = this.me
            .getChildByName('container_righttop')
            .getChildByName('btn_leave');

        this.me
            .getChildByName('container_righttop')
            .getChildByName('btn_leave').clickHandler = Laya.Handler.create(
            this,
            () => {
              view.DesktopMgr.Inst.mode == view.EMJMode.play
                ? view.DesktopMgr.Inst.gameing &&
                  t.UI_SecondConfirm.Inst.show(
                    game.Tools.strOfLocalization(21),
                    Laya.Handler.create(s, () => {
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
                              (t, e) => {
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
            !1
          );

        this.me
            .getChildByName('container_righttop')
            .getChildByName('btn_set').clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_Config.Inst.show();
            },
            null,
            !1
          );

        this._btn_fanzhong = this.me
            .getChildByName('container_righttop')
            .getChildByName('btn_fanzhong');

        this._btn_fanzhong.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_Rules.Inst.show();
            },
            null,
            !1
          );

        this.btn_double_pass = this.me.getChildByName('btn_double_pass');
        this.btn_double_pass.visible = !1;
        var d = 0;

        this.btn_double_pass.clickHandler = Laya.Handler.create(
          this,
          () => {
            if (view.DesktopMgr.double_click_pass) {
              var e = Laya.timer.currTimer;
              if (d + 300 > e) {
                if (t.UI_ChiPengHu.Inst.enable)
                  t.UI_ChiPengHu.Inst.onDoubleClick();
                else {
                  var i = view.DesktopMgr.Inst.mainrole.can_discard;

                  t.UI_LiQiZiMo.Inst.enable &&
                    (i = t.UI_LiQiZiMo.Inst.onDoubleClick(i));

                  i && view.DesktopMgr.Inst.mainrole.onDoubleClick();
                }
                d = 0;
              } else d = e;
            }
          },
          null,
          !1
        );

        this._network_delay = new i(this.me.getChildByName('img_signal'));
      }

      onGameBroadcast(t) {
        app.Log.log(`NotifyGameBroadcast ${JSON.stringify(t)}`);
        var e = view.DesktopMgr.Inst.seat2LocalPosition(t.seat),
          i = JSON.parse(t.content);
        null != i.emo && void 0 != i.emo && this.onShowEmo(e, i.emo);
      }

      onPlayerConnectionState(t) {
        app.Log.log(`NotifyPlayerConnectionState msg: ${JSON.stringify(t)}`);
        var e = t.seat;

        view.DesktopMgr.player_link_state ||
            (view.DesktopMgr.player_link_state = [
              view.ELink_State.NULL,
              view.ELink_State.NULL,
              view.ELink_State.NULL,
              view.ELink_State.NULL
            ]);

        view.DesktopMgr.player_link_state &&
          e < view.DesktopMgr.player_link_state.length &&
          (view.DesktopMgr.player_link_state[e] = t.state);

        if (
          (this.enable)
        ) {
          var i = view.DesktopMgr.Inst.seat2LocalPosition(e);
          this._player_infos[i].disconnect.visible =
            t.state != view.ELink_State.READY;
        }
      }

      _initFunc() {
        var t = this;
        this._container_fun = this.me.getChildByName('container_func');
        var e = this._container_fun.getChildByName('btn_func'),
          i = this._container_fun.getChildByName('btn_func2');
        e.clickHandler = i.clickHandler = new Laya.Handler(
          this,
          () => {
            var i = 0;
            i = -274;
            i = -528;

            t._container_fun.x < -400
              ? (t.arrow.scaleX = 1)
              : (t.arrow.scaleX = -1);

            Laya.Tween.to(
              t._container_fun,
              { x: i },
              200,
              Laya.Ease.strongOut,
              Laya.Handler.create(t, () => {
                e.disabled = !1;
              }),
              0,
              !0,
              !0
            );

            e.disabled = !0;
          },
          null,
          !1
        );
        var n = this._container_fun.getChildByName('btn_autolipai'),
          a = this._container_fun.getChildByName('btn_autolipai2');
        this.refreshFuncBtnShow(n, !0);
        n.clickHandler = a.clickHandler = Laya.Handler.create(
            this,
            () => {
              view.DesktopMgr.Inst.setAutoLiPai(
                !view.DesktopMgr.Inst.auto_liqi
              );

              t.refreshFuncBtnShow(n, view.DesktopMgr.Inst.auto_liqi);
              Laya.LocalStorage.setItem(
                'autolipai',
                view.DesktopMgr.Inst.auto_liqi ? 'true' : 'false'
              );
            },
            null,
            !1
          );
        var r = this._container_fun.getChildByName('btn_autohu'),
          s = this._container_fun.getChildByName('btn_autohu2');
        this.refreshFuncBtnShow(r, !1);
        r.clickHandler = s.clickHandler = Laya.Handler.create(
            this,
            () => {
              view.DesktopMgr.Inst.setAutoHule(
                !view.DesktopMgr.Inst.auto_hule
              );

              t.refreshFuncBtnShow(r, view.DesktopMgr.Inst.auto_hule);
            },
            null,
            !1
          );
        var o = this._container_fun.getChildByName('btn_autonoming'),
          l = this._container_fun.getChildByName('btn_autonoming2');
        this.refreshFuncBtnShow(o, !1);
        o.clickHandler = l.clickHandler = Laya.Handler.create(
            this,
            () => {
              view.DesktopMgr.Inst.setAutoNoFulu(
                !view.DesktopMgr.Inst.auto_nofulu
              );

              t.refreshFuncBtnShow(o, view.DesktopMgr.Inst.auto_nofulu);
            },
            null,
            !1
          );
        var h = this._container_fun.getChildByName('btn_automoqie'),
          c = this._container_fun.getChildByName('btn_automoqie2');
        this.refreshFuncBtnShow(h, !1);

        h.clickHandler = c.clickHandler = Laya.Handler.create(
            this,
            () => {
              view.DesktopMgr.Inst.setAutoMoQie(
                !view.DesktopMgr.Inst.auto_moqie
              );

              t.refreshFuncBtnShow(h, view.DesktopMgr.Inst.auto_moqie);
            },
            null,
            !1
          );

        e.visible = !1;
        s.visible = !0;
        a.visible = !0;
        l.visible = !0;
        e.visible = !0;
        s.visible = !1;
        a.visible = !1;
        l.visible = !1;

        Laya.Browser.onPC && !GameMgr.inConch
          ? (c.visible = !0)
          : (c.visible = !1);

        this.arrow = this._container_fun.getChildByName('arrow');
        this.arrow.scaleX = -1;
      }

      noAutoLipai() {
        var t = this._container_fun.getChildByName('btn_autolipai');
        view.DesktopMgr.Inst.auto_liqi = !0;
        t.clickHandler.run();
      }

      resetFunc() {
        var t = Laya.LocalStorage.getItem('autolipai'),
          e = !0;
        e = !t || '' == t || 'true' == t;
        var i = this._container_fun.getChildByName('btn_autolipai');
        this.refreshFuncBtnShow(i, e);
        Laya.LocalStorage.setItem('autolipai', e ? 'true' : 'false');
        view.DesktopMgr.Inst.setAutoLiPai(e);
        var n = this._container_fun.getChildByName('btn_autohu');
        this.refreshFuncBtnShow(n, view.DesktopMgr.Inst.auto_hule);
        var a = this._container_fun.getChildByName('btn_autonoming');
        this.refreshFuncBtnShow(a, view.DesktopMgr.Inst.auto_nofulu);
        var r = this._container_fun.getChildByName('btn_automoqie');
        this.refreshFuncBtnShow(r, view.DesktopMgr.Inst.auto_moqie);
        this._container_fun.x = -528;
        this.arrow.scaleX = -1;
      }

      setDora(t, e) {
        if (t < 0 || t >= this.doras.length) console.error('setDora pos错误');
        else {
          var i = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`;
          this.doras[t].skin = game.Tools.localUISrc(
            `${i + e.toString()}.png`
          );
        }
      }

      initRoom() {
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
              e[(o = `${r}/${s.toString()}.png`)] = 1;
            }
            if (n.extra_emoji)
              for (s = 0; s < n.extra_emoji.length; s++) {
                var o = `${r}/${n.extra_emoji[s].toString()}.png`;
                e[o] = 1;
              }
          }
          var l = [];
          for (var h in e) l.push(h);
          game.LoadMgr.loadResImage(
            l,
            Laya.Handler.create(this, () => {
              t.block_emo.initRoom();
            })
          );
        }
        this._btn_leave.visible = !0;
        this._btn_fanzhong.visible = !1;
        if (
          (view.DesktopMgr.Inst.mode == view.EMJMode.play)
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
          this._btn_leave.visible = !1;
          (c > 1 || 4 == view.DesktopMgr.Inst.game_config.category) &&
            ((this._btn_fanzhong.visible = !0));
        }
        for (i = 0; i < view.DesktopMgr.Inst.player_datas.length; i++) {
          var u = view.DesktopMgr.Inst.player_datas[i];
          u && null != u.account_id && 0 != u.account_id && 0;
        }

        this.block_emo.me.visible =
            view.DesktopMgr.Inst.mode == view.EMJMode.play;

        this._container_fun.visible =
            view.DesktopMgr.Inst.mode == view.EMJMode.play;

        this.enable = !0;
        this.setLiqibang(0);
        this.setBen(0);
        if (
          (view.DesktopMgr.Inst.game_config)
        ) {
          var _ = view.DesktopMgr.Inst.game_config,
            d = game.Tools.get_room_desc(_);
          this.label_gamemode.text = d.text;
          this.container_gamemode.visible = !0;
        } else this.container_gamemode.visible = !1;

        this.btn_double_pass.visible =
          view.DesktopMgr.Inst.mode == view.EMJMode.play;

        this._network_delay.begin_refresh();
        view.DesktopMgr.Inst.mode == view.EMJMode.play
          ? (this._network_delay.me.visible = !0)
          : (this._network_delay.me.visible = !1);
      }

      onCloseRoom() {
        this._network_delay.close_refresh();
      }

      refreshSeat(t) {
        void 0 === t && (t = !1);
        view.DesktopMgr.Inst.seat;
        for (var e = view.DesktopMgr.Inst.player_datas, i = 0; i < 4; i++) {
          var n = view.DesktopMgr.Inst.localPosition2Seat(i),
            a = this._player_infos[i];
          if (n < 0) a.container.visible = !1;
          else {
            a.container.visible = !0;
            a.name.text = e[n].nickname;
            a.head.id = e[n].avatar_id;
            a.head.head_frame = e[n].avatar_frame;
            a.avatar = e[n].avatar_id;
            if (
              (0 != i)
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
      }

      refreshLinks() {
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
              ? (this._player_infos[t].disconnect.visible = !1)
              : (this._player_infos[t].disconnect.visible =
                  view.DesktopMgr.player_link_state[e] !=
                  view.ELink_State.READY)
            : view.DesktopMgr.Inst.mode == view.EMJMode.paipu &&
              (this._player_infos[t].disconnect.visible = !1);
        }
      }

      setBen(t) {
        t > 99 && (t = 99);
        var e = this.me.getChildByName('container_lefttop'),
          i = e.getChildByName('num_ben_0'),
          n = e.getChildByName('num_ben_1');

        i.skin = game.Tools.localUISrc(
              `myres/mjdesktop/w_${Math.floor(t / 10).toString()}.png`
            );

        n.skin = game.Tools.localUISrc(
              `myres/mjdesktop/w_${(t % 10).toString()}.png`
            );

        i.skin = game.Tools.localUISrc(
              `myres/mjdesktop/w_${(t % 10).toString()}.png`
            );

        t >= 10
          ? (n.visible = !0)
          : (n.visible = !1);
      }

      setLiqibang(t) {
        t > 99 && (t = 99);
        var e = this.me.getChildByName('container_lefttop'),
          i = e.getChildByName('num_lizhi_0'),
          n = e.getChildByName('num_lizhi_1');

        n.skin = game.Tools.localUISrc(
              `myres/mjdesktop/w_${(t % 10).toString()}.png`
            );

        i.skin = game.Tools.localUISrc(
              `myres/mjdesktop/w_${Math.floor(t / 10).toString()}.png`
            );

        i.skin = game.Tools.localUISrc(
              `myres/mjdesktop/w_${t.toString()}.png`
            );

        t >= 10
          ? (n.visible = !0)
          : (n.visible = !1);
      }

      reset_rounds() {
        this.closeCountDown();
        this.showscoredeltaing = !1;
        view.DesktopMgr.Inst.setScoreDelta(!1);
        for (
          var t = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`, e = 0;
          e < this.doras.length;
          e++
        )
          this.doras[e].skin = game.Tools.localUISrc(`${t}back.png`);
        for (e = 0; e < 4; e++) this._player_infos[e].emo.reset();
        this._timecd.reset();
        Laya.timer.clearAll(this);
        Laya.timer.clearAll(this.label_md5);
        this.container_doras.visible = !0;
        this.label_md5.visible = !1;
      }

      showCountDown(t, e) {
        this._timecd.showCD(t, e);
      }

      setZhenting(t) {
        this.img_zhenting.visible = t;
      }

      shout(t, e, {avatar_id}) {
        app.Log.log(`shout:${t} type:${e}`);
        try {
          var n = this._player_infos[t],
            a = n.container_shout,
            r = a.getChildByName('img_content'),
            s = a.getChildByName('illust').getChildByName('illust');
          r.visible = !0;

          '' == e
            ? (r.visible = !1)
            : (r.skin = game.Tools.localUISrc(
                `myres/mjdesktop/shout_${e}.png`
              ));

          game.Tools.charaPart(avatar_id, s, 'half', n.illustrect, !0);
          var o = 0,
            l = 0;
          o = -105;
          o = 500;
          o = 0;
          o = -500;
          switch (t) {
            case 0:
              l = 0;
              break;
            case 1:
              l = 0;
              break;
            case 2:
              l = -300;
              break;
            default:
              l = 0;
          }
          a.visible = !0;
          a.alpha = 0;
          a.x = n.shout_origin_x + o;
          a.y = n.shout_origin_y + l;

          Laya.Tween.to(
            a,
            { alpha: 1, x: n.shout_origin_x, y: n.shout_origin_y },
            70
          );

          Laya.Tween.to(a, { alpha: 0 }, 150, null, null, 600);
          Laya.timer.once(800, this, () => {
            Laya.loader.clearTextureRes(s.skin);
            a.visible = !1;
          });
        } catch (t) {
          var h = {};
          h.error = t.message;
          h.stack = t.stack;
          h.method = 'shout';
          h.class = 'UI_DesktopInfos';
          GameMgr.Inst.onFatalError(h);
        }
      }

      closeCountDown() {
        this._timecd.close();
      }

      refreshFuncBtnShow(t, e) {
        var i = t.getChildByName('img_choosed');
        t.getChildByName('out').color = e ? '#3bd647' : '#7992b3';
        i.visible = e;
      }

      onShowEmo(t, e) {
        var i = this._player_infos[t];
        (0 != t && i.headbtn.emj_banned) || i.emo.show(t, e);
      }

      changeHeadEmo(t, e, i) {
        var n = view.DesktopMgr.Inst.seat2LocalPosition(t);
        this._player_infos[n];
      }

      onBtnShowScoreDelta() {
        var t = this;
        this.showscoredeltaing = !0;
        view.DesktopMgr.Inst.setScoreDelta(!0);
        this.showscoredeltaing ||
          (Laya.timer.once(5e3, this, () => {
          t.showscoredeltaing = !1;
          view.DesktopMgr.Inst.setScoreDelta(!1);
        }));
      }

      btn_seeinfo(e) {
        if (
          view.DesktopMgr.Inst.mode != view.EMJMode.paipu &&
          view.DesktopMgr.Inst.gameing
        ) {
          var i =
            view.DesktopMgr.Inst.player_datas[
              view.DesktopMgr.Inst.localPosition2Seat(e)
            ].account_id;
          view.DesktopMgr.Inst.game_config;
          0 != i &&
            (t.UI_OtherPlayerInfo.Inst.show(
            i,
            view.DesktopMgr.Inst.game_config.mode.mode < 10 ? 1 : 2
          ));
        }
      }

      openDora3BeginEffect() {
        var t = game.FrontEffect.Inst.create_ui_effect(
          this.me
            .getChildByName('container_effects')
            .getChildByName('dora3_begin'),
          `scene/effect_dora3_begin_${GameMgr.client_language}.lh`,
          new Laya.Point(0, 0),
          1
        );
        view.AudioMgr.PlayAudio(243);
        Laya.timer.once(5e3, t, () => {
          t.destory();
        });
      }

      openDora3BeginShine() {
        var t = game.FrontEffect.Inst.create_ui_effect(
          this.me
            .getChildByName('container_effects')
            .getChildByName('dora3_shine'),
          'scene/effect_dora3_shine.lh',
          new Laya.Point(0, 0),
          1
        );
        view.AudioMgr.PlayAudio(244);
        Laya.timer.once(5e3, t, () => {
          t.destory();
        });
      }
    }

    __extends(o, s);

    o.Inst = null;
    return o;
  })(t.UIBase);

  t.UI_DesktopInfo = s;
})(uiscript || (uiscript = {}));