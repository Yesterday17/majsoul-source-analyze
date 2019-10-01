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
      function e(t) {
        var e = this;
        (this.locking = !1),
          (this.match_id = 0),
          (this.contest_id = 0),
          (this.me = t),
          (this.root = t.getChildByName('root')),
          (this.label_name = this.root.getChildByName('name')),
          (this.label_starttime = this.root.getChildByName('starttime'));
        var i = this.root.getChildByName('infos');
        (this.panel = i.getChildByName('content')),
          (this.panel.vScrollBarSkin = ''),
          (this.label_info = this.panel.getChildByName('label_info')),
          (this.scrollbar = i.getChildByName('scrollbar')),
          (this.scrollpoint = this.scrollbar.getChildByName('scrollpoint')),
          this.panel.vScrollBar.on('change', this, function() {
            e.refresh_scrollbar();
          }),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            !1
          )),
          (this.root.getChildByName(
            'btn_close1'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            !1
          )),
          (this.root.getChildByName(
            'btn_enter'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.close(), n.Inst.enter_match(e.match_id, e.contest_id));
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function(e) {
          var i = this;
          (this.locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                i.locking = !1;
              })
            ),
            (this.label_name.text = e.contest_name),
            (this.label_starttime.text =
              game.Tools.time2YearMounthDate(e.start_time) +
              ' ' +
              game.Tools.time2HourMinute(e.start_time, !0) +
              ' ' +
              game.Tools.strOfLocalization(2081) +
              ' ' +
              game.Tools.time2YearMounthDate(e.finish_time) +
              ' ' +
              game.Tools.time2HourMinute(e.finish_time, !0)),
            (this.match_id = e.unique_id),
            (this.contest_id = e.contest_id),
            (this.label_info.text = game.Tools.strWithoutForbidden(
              e.public_notice
            )),
            (this.label_info.height = this.label_info.textField.textHeight),
            (this.panel.vScrollBar.value = 0),
            this.panel.refresh(),
            (this.scrollbar.visible =
              this.label_info.height > this.panel.height),
            this.refresh_scrollbar();
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.me.visible = !1);
              })
            );
        }),
        (e.prototype.refresh_scrollbar = function() {
          if (this.label_info.height > this.panel.height) {
            var t = this.panel.vScrollBar.value / this.panel.vScrollBar.max;
            (this.scrollpoint.height =
              (this.scrollbar.height * this.panel.height) /
              this.label_info.height),
              (this.scrollpoint.y =
                t *
                this.scrollbar.height *
                (1 - this.panel.height / this.label_info.height)),
              (this.scrollbar.visible = !0);
          } else this.scrollbar.visible = !1;
        }),
        e
      );
    })(),
    i = (function() {
      function e(e) {
        var i = this;
        (this.have_data = !1),
          (this.match_infos = {}),
          (this.match_ids = []),
          (this.only_follow = !1),
          (this.all_match_list = []),
          (this.follow_changed = !1),
          (this.me = e),
          (e
            .getChildByName('input')
            .getChildByName(
              'btn_checkmatchID'
            ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_NumberInput.Inst.show(
                game.Tools.strOfLocalization(2082),
                Laya.Handler.create(i, function(e) {
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
                        function(i, a) {
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
          )),
          (this.input = e.getChildByName('input').getChildByName('txtinput')),
          (e
            .getChildByName('input')
            .getChildByName(
              'btn_searchname'
            ).clickHandler = Laya.Handler.create(
            this,
            function() {
              i.refresh_match_list(-1, i.input.text);
            },
            null,
            !1
          )),
          this.input.on(laya.events.Event.KEY_DOWN, this, function(t) {
            t.keyCode == Laya.Keyboard.ENTER &&
              i.refresh_match_list(-1, i.input.text);
          }),
          (this.check_follow = e
            .getChildByName('check_follow')
            .getChildByName('check')),
          (e.getChildByName('check_follow').clickHandler = Laya.Handler.create(
            this,
            function() {
              (i.check_follow.visible = !i.check_follow.visible),
                (i.only_follow = i.check_follow.visible),
                i.refresh_match_list();
            },
            null,
            !1
          )),
          (this.noinfo = this.me.getChildByName('noinfo')),
          (this.nolimitlist = e.scriptMap['capsui.NoLimitList']),
          this.nolimitlist.init_nolimitlist(
            new Laya.Handler(this, this.load_info),
            new Laya.Handler(this, this.render_item)
          ),
          (this.label_id = this.me.getChildByName('id').getChildByName('id')),
          this.clearData();
      }
      return (
        (e.prototype.onShow = function() {
          var e = this;
          this.have_data
            ? this.only_follow && this.follow_changed
              ? this.refresh_match_list()
              : this.nolimitlist.wantToRefreshAll()
            : app.NetAgent.sendReq2Lobby(
                'Lobby',
                'fetchCustomizedContestList',
                { start: 0, count: 100 },
                function(i, n) {
                  if (i || n.error)
                    t.UIMgr.Inst.showNetReqError(
                      'fetchCustomizedContestList',
                      i,
                      n
                    );
                  else {
                    if (
                      (app.Log.log(JSON.stringify(n)),
                      (n = JSON.parse(JSON.stringify(n))),
                      (e.have_data = !0),
                      n.contests)
                    )
                      for (a = 0; a < n.contests.length; a++) {
                        r = n.contests[a];
                        e.match_infos[r.unique_id] ||
                          (e.all_match_list.push(r.unique_id),
                          (e.match_infos[r.unique_id] = r)),
                          (e.match_infos[r.unique_id].follow = !1);
                      }
                    if (n.follow_contests)
                      for (var a = 0; a < n.follow_contests.length; a++) {
                        var r = n.follow_contests[a];
                        e.match_infos[r.unique_id] ||
                          (e.all_match_list.push(r.unique_id),
                          (e.match_infos[r.unique_id] = r)),
                          (e.match_infos[r.unique_id].follow = !0);
                      }
                    e.refresh_match_list();
                  }
                }
              ),
            (this.follow_changed = !1),
            (this.label_id.text = game.Tools.encode_account_id2(
              GameMgr.Inst.account_id
            ).toString());
        }),
        (e.prototype.clearData = function() {
          (this.have_data = !1),
            (this.match_infos = {}),
            (this.all_match_list = []),
            (this.match_ids = []),
            (this.only_follow = !1),
            (this.check_follow.visible = !1),
            (this.follow_changed = !1),
            this.nolimitlist.reset();
        }),
        (e.prototype.load_info = function(e) {
          for (
            var i = this, n = [], a = 0, r = 0;
            r < 20 && r + e < this.match_ids.length;
            r++
          ) {
            var s = this.match_ids[r + e];
            null == this.match_infos[s].public_notice && n.push(s), a++;
          }
          0 == n.length
            ? this.nolimitlist.loadOver(!0, a)
            : app.NetAgent.sendReq2Lobby(
                'Lobby',
                'fetchCustomizedContestExtendInfo',
                { uid_list: n },
                function(e, a) {
                  if (e || a.error)
                    t.UIMgr.Inst.showNetReqError(
                      'fetchCustomizedContestExtendInfo',
                      e,
                      a.error
                    ),
                      i.nolimitlist.loadOver(!1, 0);
                  else {
                    app.Log.log(JSON.stringify(a));
                    var r = 0;
                    if (a.extend_list)
                      for (var s = 0; s < a.extend_list.length; s++) {
                        var o = a.extend_list[s];
                        (i.match_infos[o.unique_id].public_notice =
                          o.public_notice),
                          r++;
                      }
                    r != n.length
                      ? (i.nolimitlist.loadOver(!1, 0),
                        t.UIMgr.Inst.ShowErrorInfo(
                          game.Tools.strOfLocalization(2084)
                        ))
                      : i.nolimitlist.loadOver(!0, r);
                  }
                }
              );
        }),
        (e.prototype.refresh_match_list = function(t, e) {
          var i = this;
          if (
            (void 0 === t && (t = -1),
            void 0 === e && (e = ''),
            (this.match_ids = []),
            -1 != t)
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
          (this.match_ids = this.match_ids.sort(function(t, e) {
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
          })),
            this.nolimitlist.reset(),
            0 == this.match_ids.length
              ? -1 != t
                ? this.show_noinfo(game.Tools.strOfLocalization(2083) + t)
                : this.only_follow
                ? this.show_noinfo(game.Tools.strOfLocalization(2085))
                : this.show_noinfo(game.Tools.strOfLocalization(2086))
              : ((this.nolimitlist.total_count = this.match_ids.length),
                (this.noinfo.visible = !1));
        }),
        (e.prototype.render_item = function(t) {
          var e = t.index,
            i = t.container,
            a = this.match_ids[e],
            r = this.match_infos[a];
          (i.getChildByName('follow').visible = r.follow),
            (i.getChildByName('name').text = game.Tools.strWithoutForbidden(
              r.contest_name
            ));
          var s = i.getChildByName('content'),
            o = game.Tools.strWithoutForbidden(r.public_notice);
          if (o && o.length > 0) {
            if (((s.text = o), s.textField.textHeight > 110)) {
              for (
                var l = 0, h = 200 < o.length ? 200 : o.length, c = 0;
                l < h;

              )
                (c = (l + h) / 2),
                  (s.text = o.substring(0, c) + '...'),
                  s.textField.textHeight <= 110 ? (l = c + 1) : (h = c);
              s.text = o.substring(0, c - 1) + '...';
            }
          } else s.text = '';
          (i.getChildByName('prepare').visible = !1),
            (i.getChildByName('start').visible = !1),
            (i.getChildByName('end').visible = !1),
            (i.getChildByName('id').text = 'ID:' + r.contest_id);
          var u,
            _ = 0;
          switch (r.state) {
            case 1:
              (u = i.getChildByName('prepare')), (_ = r.start_time);
              break;
            case 2:
              (u = i.getChildByName('start')), (_ = r.finish_time);
              break;
            case 3:
              (u = i.getChildByName('end')), (_ = r.finish_time);
          }
          u &&
            ((u.visible = !0),
            (u.getChildByName('time').text =
              game.Tools.time2YearMounthDate(_) +
              ' ' +
              game.Tools.time2HourMinute(_, !0))),
            (i.getChildByName('check').clickHandler = Laya.Handler.create(
              this,
              function() {
                n.Inst.pop_out_notice(r);
              },
              null,
              !1
            )),
            (i.getChildByName('btn_enter').clickHandler = Laya.Handler.create(
              this,
              function() {
                n.Inst.enter_match(a, r.contest_id);
              },
              null,
              !1
            ));
        }),
        (e.prototype.change_match_follow = function(t, e) {
          this.match_infos[t] &&
            ((this.match_infos[t].follow = e), (this.follow_changed = !0));
        }),
        (e.prototype.show_noinfo = function(t) {
          (this.noinfo.text = t), (this.noinfo.visible = !0);
        }),
        (e.prototype.get_match_data = function(t) {
          return this.match_infos[t];
        }),
        e
      );
    })(),
    n = (function(n) {
      function a() {
        var t = n.call(this, new ui.lobby.match_lobbyUI()) || this;
        return (t.locking = !1), (a.Inst = t), t;
      }
      return (
        __extends(a, n),
        (a.prototype.onCreate = function() {
          var n = this;
          (this.container_top = this.me.getChildByName('top')),
            (this.container_top.getChildByName(
              'btn_back'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                n.locking ||
                  (n.content.clearData(),
                  n.close(),
                  Laya.timer.once(200, n, function() {
                    t.UI_Lobby.Inst.enable = !0;
                  }));
              },
              null,
              !1
            )),
            (this.content = new i(this.me.getChildByName('root'))),
            (this.pop_info = new e(this.me.getChildByName('pop_info')));
        }),
        (a.prototype.show = function() {
          var e = this;
          game.Scene_Lobby.Inst.change_bg('indoor', !1),
            (this.locking = !0),
            (this.enable = !0),
            (this.pop_info.me.visible = !1),
            this.content.onShow(),
            t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
            t.UIBase.anim_alpha_in(this.content.me, { y: 30 }, 150),
            Laya.timer.once(200, this, function() {
              e.locking = !1;
            });
        }),
        (a.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
            t.UIBase.anim_alpha_out(this.content.me, { y: 30 }, 150),
            Laya.timer.once(200, this, function() {
              (e.locking = !1), (e.enable = !1);
            });
        }),
        (a.prototype.enter_match = function(e, i) {
          this.close(),
            Laya.timer.once(200, this, function() {
              t.UI_Match_Room.Inst.show(e);
            });
        }),
        (a.prototype.change_match_follow = function(t, e) {
          this.content.change_match_follow(t, e);
        }),
        (a.prototype.clear_data = function() {
          this.content.clearData();
        }),
        (a.prototype.pop_out_notice = function(t) {
          this.pop_info.show(t);
        }),
        a
      );
    })(t.UIBase);
  t.UI_Match_Lobby = n;
})(uiscript || (uiscript = {}));