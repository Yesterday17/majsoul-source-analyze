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
    function e(t) {
      var e = this;
      this.locking = !1;
      this.match_id = 0;
      this.contest_id = 0;
      this.me = t;
      this.root = t.getChildByName('root');
      this.label_name = this.root.getChildByName('name');
      this.label_starttime = this.root.getChildByName('starttime');
      var i = this.root.getChildByName('infos');
      this.panel = i.getChildByName('content');
      this.panel.vScrollBarSkin = '';
      this.label_info = this.panel.getChildByName('label_info');
      this.scrollbar = i.getChildByName('scrollbar');
      this.scrollpoint = this.scrollbar.getChildByName('scrollpoint');

      this.panel.vScrollBar.on('change', this, () => {
        e.refresh_scrollbar();
      });

      this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        );

      this.root.getChildByName(
          'btn_close1'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        );

      this.root.getChildByName(
          'btn_enter'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.close();
            e.locking ||
              (n.Inst.enter_match(e.match_id, e.contest_id));
          },
          null,
          !1
        );
    }

    e.prototype.show = function(e) {
      var i = this;
      this.locking = !0;
      this.me.visible = !0;

      t.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, () => {
          i.locking = !1;
        })
      );

      this.label_name.text = e.contest_name;

      this.label_starttime.text =
          `${game.Tools.time2YearMounthDate(e.start_time)} ${game.Tools.time2HourMinute(e.start_time, !0)} ${game.Tools.strOfLocalization(2081)} ${game.Tools.time2YearMounthDate(e.finish_time)} ${game.Tools.time2HourMinute(e.finish_time, !0)}`;

      this.match_id = e.unique_id;
      this.contest_id = e.contest_id;

      this.label_info.text = game.Tools.strWithoutForbidden(
          e.public_notice
        );

      this.label_info.height = this.label_info.textField.textHeight;
      this.panel.vScrollBar.value = 0;
      this.panel.refresh();

      this.scrollbar.visible =
          this.label_info.height > this.panel.height;

      this.refresh_scrollbar();
    };

    e.prototype.close = function() {
      var e = this;
      this.locking = !0;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.locking = !1;
          e.me.visible = !1;
        })
      );
    };

    e.prototype.refresh_scrollbar = function() {
      if (this.label_info.height > this.panel.height) {
        var t = this.panel.vScrollBar.value / this.panel.vScrollBar.max;

        this.scrollpoint.height =
          (this.scrollbar.height * this.panel.height) /
          this.label_info.height;

        this.scrollpoint.y =
            t *
            this.scrollbar.height *
            (1 - this.panel.height / this.label_info.height);

        this.scrollbar.visible = !0;
      } else this.scrollbar.visible = !1;
    };

    return e;
  })();

  var i = (() => {
    class e {
      constructor(e) {
        var i = this;
        this.have_data = !1;
        this.match_infos = {};
        this.match_ids = [];
        this.only_follow = !1;
        this.all_match_list = [];
        this.follow_changed = !1;
        this.me = e;

        e
            .getChildByName('input')
            .getChildByName(
              'btn_checkmatchID'
            ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_NumberInput.Inst.show(
                game.Tools.strOfLocalization(2082),
                Laya.Handler.create(i, e => {
                  for (var a = -1, r = 0; r < i.all_match_list.length; r++)
                    if (i.match_infos[i.all_match_list[r]].contest_id == e) {
                      a = i.all_match_list[r];
                      break;
                    }
                  -1 != a
                    ? n.Inst.enter_match(a, e)
                    : app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'fetchCustomizedContestByContestId',
                        { contest_id: e },
                        (i, a) => {
                          i || a.error
                            ? t.UIMgr.Inst.showNetReqError(
                                'fetchCustomizedContestByContestId',
                                i,
                                a
                              )
                            : a.contest_info
                            ? n.Inst.enter_match(a.contest_info.unique_id, e)
                            : t.UIMgr.Inst.ShowErrorInfo(
                                game.Tools.strOfLocalization(2083) + e
                              );
                        }
                      );
                })
              );
            },
            null,
            !1
          );

        this.input = e.getChildByName('input').getChildByName('txtinput');

        e
            .getChildByName('input')
            .getChildByName(
              'btn_searchname'
            ).clickHandler = Laya.Handler.create(
            this,
            () => {
              i.refresh_match_list(-1, i.input.text);
            },
            null,
            !1
          );

        this.input.on(laya.events.Event.KEY_DOWN, this, ({keyCode}) => {
          keyCode == Laya.Keyboard.ENTER &&
            i.refresh_match_list(-1, i.input.text);
        });

        this.check_follow = e
            .getChildByName('check_follow')
            .getChildByName('check');

        e.getChildByName('check_follow').clickHandler = Laya.Handler.create(
            this,
            () => {
              i.check_follow.visible = !i.check_follow.visible;
              i.only_follow = i.check_follow.visible;
              i.refresh_match_list();
            },
            null,
            !1
          );

        this.noinfo = this.me.getChildByName('noinfo');
        this.nolimitlist = e.scriptMap['capsui.NoLimitList'];

        this.nolimitlist.init_nolimitlist(
          new Laya.Handler(this, this.load_info),
          new Laya.Handler(this, this.render_item)
        );

        this.label_id = this.me.getChildByName('id').getChildByName('id');
        this.clearData();
      }

      onShow() {
        var e = this;

        this.have_data
          ? this.only_follow && this.follow_changed
            ? this.refresh_match_list()
            : this.nolimitlist.wantToRefreshAll()
          : app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchCustomizedContestList',
              { start: 0, count: 100 },
              (i, n) => {
                if (i || n.error)
                  t.UIMgr.Inst.showNetReqError(
                    'fetchCustomizedContestList',
                    i,
                    n
                  );
                else {
                  app.Log.log(JSON.stringify(n));
                  n = JSON.parse(JSON.stringify(n));
                  e.have_data = !0;
                  if (
                    (n.contests)
                  )
                    for (a = 0; a < n.contests.length; a++) {
                      r = n.contests[a];
                      e.all_match_list.push(r.unique_id);

                      e.match_infos[r.unique_id] ||
                        ((e.match_infos[r.unique_id] = r));

                      e.match_infos[r.unique_id].follow = !1;
                    }
                  if (n.follow_contests)
                    for (var a = 0; a < n.follow_contests.length; a++) {
                      var r = n.follow_contests[a];
                      e.all_match_list.push(r.unique_id);

                      e.match_infos[r.unique_id] ||
                        ((e.match_infos[r.unique_id] = r));

                      e.match_infos[r.unique_id].follow = !0;
                    }
                  e.refresh_match_list();
                }
              }
            );

        this.follow_changed = !1;
        this.label_id.text = game.Tools.encode_account_id2(
            GameMgr.Inst.account_id
          ).toString();
      }

      clearData() {
        this.have_data = !1;
        this.match_infos = {};
        this.all_match_list = [];
        this.match_ids = [];
        this.only_follow = !1;
        this.check_follow.visible = !1;
        this.follow_changed = !1;
        this.nolimitlist.reset();
      }

      load_info(e) {
        for (
          var i = this, n = [], a = 0, r = 0;
          r < 20 && r + e < this.match_ids.length;
          r++
        ) {
          var s = this.match_ids[r + e];
          null == this.match_infos[s].public_notice && n.push(s);
          a++;
        }
        0 == n.length
          ? this.nolimitlist.loadOver(!0, a)
          : app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchCustomizedContestExtendInfo',
              { uid_list: n },
              (e, a) => {
                t.UIMgr.Inst.showNetReqError(
                  'fetchCustomizedContestExtendInfo',
                  e,
                  a.error
                );

                if (e || a.error)
                  i.nolimitlist.loadOver(!1, 0);
                else {
                  app.Log.log(JSON.stringify(a));
                  var r = 0;
                  if (a.extend_list)
                    for (var s = 0; s < a.extend_list.length; s++) {
                      var o = a.extend_list[s];

                      i.match_infos[o.unique_id].public_notice =
                        o.public_notice;

                      r++;
                    }
                  i.nolimitlist.loadOver(!1, 0);
                  r != n.length
                    ? (t.UIMgr.Inst.ShowErrorInfo(
                    game.Tools.strOfLocalization(2084)
                  ))
                    : i.nolimitlist.loadOver(!0, r);
                }
              }
            );
      }

      refresh_match_list(t, e) {
        var i = this;
        void 0 === t && (t = -1);
        void 0 === e && (e = '');
        this.match_ids = [];
        if (
          (-1 != t)
        )
          this.match_ids.push(t);
        else
          for (var n = 0; n < this.all_match_list.length; n++) {
            var a = this.all_match_list[n],
              r = this.match_infos[a];
            if (!this.only_follow || r.follow) {
              var s = !0;
              if ('' != e) {
                var o = r.contest_name;
                game.Tools.stringContainerSub(o, e) || (s = !1);
              }
              s && this.match_ids.push(a);
            }
          }

        this.match_ids = this.match_ids.sort((t, e) => {
          var n = i.match_infos[t],
            a = i.match_infos[e];
          if (n.state == a.state)
            return 1 == n.state
              ? n.start_time - a.start_time
              : 2 == n.state
              ? n.finish_time - a.finish_time
              : a.finish_time - n.finish_time;
          return (
            (2 == n.state ? -1 : n.state) - (2 == a.state ? -1 : a.state)
          );
        });

        this.nolimitlist.reset();
        this.nolimitlist.total_count = this.match_ids.length;
        0 == this.match_ids.length
          ? -1 != t
            ? this.show_noinfo(game.Tools.strOfLocalization(2083) + t)
            : this.only_follow
            ? this.show_noinfo(game.Tools.strOfLocalization(2085))
            : this.show_noinfo(game.Tools.strOfLocalization(2086))
          : (this.noinfo.visible = !1);
      }

      render_item({index, container}) {
        var e = index,
          i = container,
          a = this.match_ids[e],
          r = this.match_infos[a];
        i.getChildByName('follow').visible = r.follow;
        i.getChildByName('name').text = game.Tools.strWithoutForbidden(
            r.contest_name
          );
        var s = i.getChildByName('content'),
          o = game.Tools.strWithoutForbidden(r.public_notice);
        if (o && o.length > 0) {
          s.text = o;
          if ((s.textField.textHeight > 110)) {
            c = (l + h) / 2;
            s.text = `${o.substring(0, c)}...`;
            for (
              var l = 0, h = 200 < o.length ? 200 : o.length, c = 0;
              l < h;

            )
              s.textField.textHeight <= 110 ? (l = c + 1) : (h = c);
            s.text = `${o.substring(0, c - 1)}...`;
          }
        } else s.text = '';
        i.getChildByName('prepare').visible = !1;
        i.getChildByName('start').visible = !1;
        i.getChildByName('end').visible = !1;
        i.getChildByName('id').text = `ID:${r.contest_id}`;
        var u,
          _ = 0;
        u = i.getChildByName('prepare');
        u = i.getChildByName('start');
        u = i.getChildByName('end');
        switch (r.state) {
          case 1:
            _ = r.start_time;
            break;
          case 2:
            _ = r.finish_time;
            break;
          case 3:
            _ = r.finish_time;
        }
        u.visible = !0;

        u &&
          ((u.getChildByName('time').text = `${game.Tools.time2YearMounthDate(_)} ${game.Tools.time2HourMinute(_, !0)}`));

        i.getChildByName('check').clickHandler = Laya.Handler.create(
            this,
            () => {
              n.Inst.pop_out_notice(r);
            },
            null,
            !1
          );

        i.getChildByName('btn_enter').clickHandler = Laya.Handler.create(
            this,
            () => {
              n.Inst.enter_match(a, r.contest_id);
            },
            null,
            !1
          );
      }

      change_match_follow(t, e) {
        this.match_infos[t].follow = e;
        this.match_infos[t] &&
          ((this.follow_changed = !0));
      }

      show_noinfo(t) {
        this.noinfo.text = t;
        this.noinfo.visible = !0;
      }

      get_match_data(t) {
        return this.match_infos[t];
      }
    }

    return e;
  })();

  var n = (n => {
    class a {
      constructor() {
        var t = n.call(this, new ui.lobby.match_lobbyUI()) || this;
        t.locking = !1;
        a.Inst = t;
        return t;
      }

      onCreate() {
        var n = this;
        this.container_top = this.me.getChildByName('top');

        this.container_top.getChildByName(
            'btn_back'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              n.content.clearData();
              n.close();
              n.locking ||
                (Laya.timer.once(200, n, () => {
                t.UI_Lobby.Inst.enable = !0;
              }));
            },
            null,
            !1
          );

        this.content = new i(this.me.getChildByName('root'));
        this.pop_info = new e(this.me.getChildByName('pop_info'));
      }

      show() {
        var e = this;
        game.Scene_Lobby.Inst.change_bg('indoor', !1);
        this.locking = !0;
        this.enable = !0;
        this.pop_info.me.visible = !1;
        this.content.onShow();
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150);
        t.UIBase.anim_alpha_in(this.content.me, { y: 30 }, 150);
        Laya.timer.once(200, this, () => {
          e.locking = !1;
        });
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150);
        t.UIBase.anim_alpha_out(this.content.me, { y: 30 }, 150);
        Laya.timer.once(200, this, () => {
          e.locking = !1;
          e.enable = !1;
        });
      }

      enter_match(e, i) {
        this.close();
        Laya.timer.once(200, this, () => {
          t.UI_Match_Room.Inst.show(e);
        });
      }

      change_match_follow(t, e) {
        this.content.change_match_follow(t, e);
      }

      clear_data() {
        this.content.clearData();
      }

      pop_out_notice(t) {
        this.pop_info.show(t);
      }
    }

    __extends(a, n);

    return a;
  })(t.UIBase);

  t.UI_Match_Lobby = n;
})(uiscript || (uiscript = {}));