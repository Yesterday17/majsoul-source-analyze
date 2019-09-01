let uiscript;
!(t => {
  const e = (() => {
      function e(t) {
        const e = this;
        (this.locking = false),
          (this.match_id = 0),
          (this.contest_id = 0),
          (this.me = t),
          (this.root = t.getChildByName('root')),
          (this.label_name = this.root.getChildByName('name')),
          (this.label_starttime = this.root.getChildByName('starttime'));
        const i = this.root.getChildByName('infos');
        (this.panel = i.getChildByName('content')),
          (this.panel.vScrollBarSkin = ''),
          (this.label_info = this.panel.getChildByName('label_info')),
          (this.scrollbar = i.getChildByName('scrollbar')),
          (this.scrollpoint = this.scrollbar.getChildByName('scrollpoint')),
          this.panel.vScrollBar.on('change', this, () => {
            e.refresh_scrollbar();
          }),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            false
          )),
          (this.root.getChildByName(
            'btn_close1'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            false
          )),
          (this.root.getChildByName(
            'btn_enter'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking ||
                (e.close(), n.Inst.enter_match(e.match_id, e.contest_id));
            },
            null,
            false
          ));
      }
      return (e.prototype.show = function(e) {
        const i = this;
        (this.locking = true),
          (this.me.visible = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, () => {
              i.locking = false;
            })
          ),
          (this.label_name.text = e.contest_name),
          (this.label_starttime.text =
            `${game.Tools.time2YearMounthDate(e.start_time)} ${game.Tools.time2HourMinute(e.start_time, true)} ${game.Tools.strOfLocalization(2081)} ${game.Tools.time2YearMounthDate(e.finish_time)} ${game.Tools.time2HourMinute(e.finish_time, true)}`),
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
        const e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, () => {
              (e.locking = false), (e.me.visible = false);
            })
          );
      }),
      (e.prototype.refresh_scrollbar = function() {
        if (this.label_info.height > this.panel.height) {
          const t = this.panel.vScrollBar.value / this.panel.vScrollBar.max;
          (this.scrollpoint.height =
            (this.scrollbar.height * this.panel.height) /
            this.label_info.height),
            (this.scrollpoint.y =
              t *
              this.scrollbar.height *
              (1 - this.panel.height / this.label_info.height)),
            (this.scrollbar.visible = true);
        } else this.scrollbar.visible = false;
      }),
      e
    ;
    })();

  const i = (() => {
    function e(e) {
      const i = this;
      (this.have_data = false),
        (this.match_infos = {}),
        (this.match_ids = []),
        (this.only_follow = false),
        (this.all_match_list = []),
        (this.follow_changed = false),
        (this.me = e),
        (e.getChildByName(
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
          false
        )),
        (this.input = e.getChildByName('input').getChildByName('txtinput')),
        (e
          .getChildByName('input')
          .getChildByName(
            'btn_searchname'
          ).clickHandler = Laya.Handler.create(
          this,
          () => {
            i.refresh_match_list(-1, i.input.text);
          },
          null,
          false
        )),
        this.input.on(laya.events.Event.KEY_DOWN, this, ({keyCode}) => {
          keyCode == Laya.Keyboard.ENTER &&
            i.refresh_match_list(-1, i.input.text);
        }),
        (this.check_follow = e
          .getChildByName('check_follow')
          .getChildByName('check')),
        (e.getChildByName('check_follow').clickHandler = Laya.Handler.create(
          this,
          () => {
            (i.check_follow.visible = !i.check_follow.visible),
              (i.only_follow = i.check_follow.visible),
              i.refresh_match_list();
          },
          null,
          false
        )),
        (this.noinfo = this.me.getChildByName('noinfo')),
        (this.nolimitlist = e.scriptMap['capsui.NoLimitList']),
        this.nolimitlist.init_nolimitlist(
          new Laya.Handler(this, this.load_info),
          new Laya.Handler(this, this.render_item)
        ),
        this.clearData();
    }
    return (e.prototype.onShow = function() {
      const e = this;
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
                if (
                  (app.Log.log(JSON.stringify(n)),
                  (n = JSON.parse(JSON.stringify(n))),
                  (e.have_data = true),
                  n.contests)
                )
                  for (a = 0; a < n.contests.length; a++) {
                    r = n.contests[a];
                    e.match_infos[r.unique_id] ||
                      (e.all_match_list.push(r.unique_id),
                      (e.match_infos[r.unique_id] = r)),
                      (e.match_infos[r.unique_id].follow = false);
                  }
                if (n.follow_contests)
                  for (var a = 0; a < n.follow_contests.length; a++) {
                    var r = n.follow_contests[a];
                    e.match_infos[r.unique_id] ||
                      (e.all_match_list.push(r.unique_id),
                      (e.match_infos[r.unique_id] = r)),
                      (e.match_infos[r.unique_id].follow = true);
                  }
                e.refresh_match_list();
              }
            }
          ),
        (this.follow_changed = false);
    }),
    (e.prototype.clearData = function() {
      (this.have_data = false),
        (this.match_infos = {}),
        (this.all_match_list = []),
        (this.match_ids = []),
        (this.only_follow = false),
        (this.check_follow.visible = false),
        (this.follow_changed = false),
        this.nolimitlist.reset();
    }),
    (e.prototype.load_info = function(e) {
      for (
        var i = this, n = [], a = 0, r = 0;
        r < 20 && r + e < this.match_ids.length;
        r++
      ) {
        const s = this.match_ids[r + e];
        null == this.match_infos[s].public_notice && n.push(s), a++;
      }
      0 == n.length
        ? this.nolimitlist.loadOver(true, a)
        : app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchCustomizedContestExtendInfo',
            { uid_list: n },
            (e, a) => {
              if (e || a.error)
                t.UIMgr.Inst.showNetReqError(
                  'fetchCustomizedContestExtendInfo',
                  e,
                  a.error
                ),
                  i.nolimitlist.loadOver(false, 0);
              else {
                app.Log.log(JSON.stringify(a));
                let r = 0;
                if (a.extend_list)
                  for (let s = 0; s < a.extend_list.length; s++) {
                    const o = a.extend_list[s];
                    (i.match_infos[o.unique_id].public_notice =
                      o.public_notice),
                      r++;
                  }
                r != n.length
                  ? (i.nolimitlist.loadOver(false, 0),
                    t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2084)
                    ))
                  : i.nolimitlist.loadOver(true, r);
              }
            }
          );
    }),
    (e.prototype.refresh_match_list = function(t, e) {
      const i = this;
      if (
        (undefined === t && (t = -1),
        undefined === e && (e = ''),
        (this.match_ids = []),
        -1 != t)
      )
        this.match_ids.push(t);
      else
        for (let n = 0; n < this.all_match_list.length; n++) {
          const a = this.all_match_list[n], r = this.match_infos[a];
          if (!this.only_follow || r.follow) {
            let s = true;
            if ('' != e) {
              const o = r.contest_name;
              game.Tools.stringContainerSub(o, e) || (s = false);
            }
            s && this.match_ids.push(a);
          }
        }
      (this.match_ids = this.match_ids.sort((t, e) => {
        const n = i.match_infos[t], a = i.match_infos[e];
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
            (this.noinfo.visible = false));
    }),
    (e.prototype.render_item = function({index, container}) {
      const e = index, i = container, a = this.match_ids[e], r = this.match_infos[a];
      (i.getChildByName('follow').visible = r.follow),
        (i.getChildByName('name').text = game.Tools.strWithoutForbidden(
          r.contest_name
        ));
      const s = i.getChildByName('content'), o = game.Tools.strWithoutForbidden(r.public_notice);
      if (o && o.length > 0) {
        if (((s.text = o), s.textField.textHeight > 110)) {
          for (
            var l = 0, h = 200 < o.length ? 200 : o.length, c = 0;
            l < h;

          )
            (c = (l + h) / 2),
              (s.text = `${o.substring(0, c)}...`),
              s.textField.textHeight <= 110 ? (l = c + 1) : (h = c);
          s.text = `${o.substring(0, c - 1)}...`;
        }
      } else s.text = '';
      (i.getChildByName('prepare').visible = false),
        (i.getChildByName('start').visible = false),
        (i.getChildByName('end').visible = false),
        (i.getChildByName('id').text = `ID:${r.contest_id}`);
      let u, _ = 0;
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
        ((u.visible = true),
        (u.getChildByName('time').text =
          `${game.Tools.time2YearMounthDate(_)} ${game.Tools.time2HourMinute(_, true)}`)),
        (i.getChildByName('check').clickHandler = Laya.Handler.create(
          this,
          () => {
            n.Inst.pop_out_notice(r);
          },
          null,
          false
        )),
        (i.getChildByName('btn_enter').clickHandler = Laya.Handler.create(
          this,
          () => {
            n.Inst.enter_match(a, r.contest_id);
          },
          null,
          false
        ));
    }),
    (e.prototype.change_match_follow = function(t, e) {
      this.match_infos[t] &&
        ((this.match_infos[t].follow = e), (this.follow_changed = true));
    }),
    (e.prototype.show_noinfo = function(t) {
      (this.noinfo.text = t), (this.noinfo.visible = true);
    }),
    (e.prototype.get_match_data = function(t) {
      return this.match_infos[t];
    }),
    e
  ;
  })();

  var n = (n => {
    function a() {
      const t = n.call(this, new ui.lobby.match_lobbyUI()) || this;
      return (t.locking = false), (a.Inst = t), t;
    }
    return __extends(a, n),
    (a.prototype.onCreate = function() {
      const n = this;
      (this.container_top = this.me.getChildByName('top')),
        (this.container_top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            n.locking ||
              (n.content.clearData(),
              n.close(),
              Laya.timer.once(200, n, () => {
                t.UI_Lobby.Inst.enable = true;
              }));
          },
          null,
          false
        )),
        (this.content = new i(this.me.getChildByName('root'))),
        (this.pop_info = new e(this.me.getChildByName('pop_info')));
    }),
    (a.prototype.show = function() {
      const e = this;
      game.Scene_Lobby.Inst.change_bg('indoor', false),
        (this.locking = true),
        (this.enable = true),
        (this.pop_info.me.visible = false),
        this.content.onShow(),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_in(this.content.me, { y: 30 }, 150),
        Laya.timer.once(200, this, () => {
          e.locking = false;
        });
    }),
    (a.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_out(this.content.me, { y: 30 }, 150),
        Laya.timer.once(200, this, () => {
          (e.locking = false), (e.enable = false);
        });
    }),
    (a.prototype.enter_match = function(e, i) {
      this.close(),
        Laya.timer.once(200, this, () => {
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
  ;
  })(t.UIBase);

  t.UI_Match_Lobby = n;
})(uiscript || (uiscript = {}));