let uiscript;
!(t => {
  const e = (() => {
      function e(t) {
        const e = this;
        (this.cells = []),
          (this.fun_change = null),
          (this.noinfo = null),
          (this.sortlist = []),
          (this.count_limit = null),
          (this.me = t);
        const i = this.me.getChildByName('scrollview');
        (this.nolimitlist = i.scriptMap['capsui.NoLimitList']),
          this.nolimitlist.init_nolimitlist(
            Laya.Handler.create(this, this._loadInfo, null, false),
            Laya.Handler.create(
              this,
              ({index, container}) => {
                e.setItem(index, container);
              },
              null,
              false
            )
          ),
          this.nolimitlist.reset(),
          (this.fun_change = Laya.Handler.create(
            this,
            this.onListenerMsg,
            null,
            false
          )),
          (this.noinfo = this.me.getChildByName('noinfo')),
          (this.cells = []),
          (this.count_limit = this.me.getChildByName('count_limit')),
          (this.count_limit.text = '--/--');
      }
      return (e.prototype.show = function() {
        (this.me.visible = true),
          game.FriendMgr.addListener(this.fun_change),
          this.refresh();
      }),
      (e.prototype.close = function() {
        game.FriendMgr.removeListener(this.fun_change),
          (this.me.visible = false);
      }),
      (e.prototype.findcell = function(t) {
        for (let e = 0; e < this.cells.length; e++)
          if (this.cells[e].container === t) return this.cells[e];
        return null;
      }),
      (e.prototype.setItem = function(e, i) {
        const n = this;
        if (this.me.visible) {
          let r = this.findcell(i);
          null == r &&
            ((r = {
              container: i,
              head: new t.UI_Head(i.getChildByName('head')),
              level: new t.UI_Level(i.getChildByName('rank')),
              level3: new t.UI_Level(i.getChildByName('rank3')),
              title: new t.UI_PlayerTitle(i.getChildByName('title')),
              btn_check: i.getChildByName('check'),
              btn_delete: i.getChildByName('delete'),
              btn_ob: i.getChildByName('ob'),
              name: i.getChildByName('name'),
              state: i.getChildByName('state'),
              account_id: 0
            }),
            this.cells.push(r));
          const s = game.FriendMgr.friend_list[this.sortlist[e]];
          r.head.id = s.base.avatar_id;
          const o = s.base.level || { id: 10101, score: 0 };
          r.level.id = o.id;
          const l = s.base.level3 || { id: 20101, score: 0 };
          (r.level3.id = l.id),
            (r.title.id = s.base.title),
            (r.name.text = s.base.nickname);
          const h = r.state;
          let c = '';
          if (s.state.is_online) {
            const u = game.Tools.playState2Desc(s.state.playing);
            '' != u
              ? ((h.text = game.Tools.strOfLocalization(2069, [u])),
                (h.color = '#a9d94d'),
                (c = s.state.playing.game_uuid))
              : ((h.text = game.Tools.strOfLocalization(2071)),
                (h.color = '#58c4db'));
          } else
            (h.text =
              game.Tools.time2Desc(s.state.logout_time) +
              game.Tools.strOfLocalization(2072)),
              (h.color = '#8c8c8c');
          const _ = s.base.account_id;
          (r.account_id = s.base.account_id),
            (r.btn_check.clickHandler = Laya.Handler.create(
              this,
              () => {
                t.UI_OtherPlayerInfo.Inst.show(_);
              },
              null,
              false
            )),
            game.Tools.setGrayDisable(r.btn_delete, false),
            (r.btn_delete.clickHandler = Laya.Handler.create(
              this,
              () => {
                game.Tools.setGrayDisable(r.btn_delete, true),
                  t.UI_SecondConfirm.Inst.show(
                    game.Tools.strOfLocalization(2073, [s.base.nickname]),
                    Laya.Handler.create(n, () => {
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'removeFriend',
                        { target_id: _ },
                        (e, i) => {
                          game.Tools.setGrayDisable(r.btn_delete, false),
                            e || i.error
                              ? t.UIMgr.Inst.showNetReqError(
                                  'removeFriend',
                                  e,
                                  i
                                )
                              : game.FriendMgr.removeFriend(_);
                        }
                      );
                    }),
                    Laya.Handler.create(
                      n,
                      () => {
                        game.Tools.setGrayDisable(r.btn_delete, false);
                      },
                      null,
                      false
                    ),
                    1111,
                    560
                  );
              },
              null,
              false
            ));
          const d = r.btn_ob;
          if ('' != c) {
            let f = 0;
            (d.clickHandler = Laya.Handler.create(
              this,
              () => {
                t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : Laya.timer.currTimer < f ||
                    ((f = Laya.timer.currTimer + 1e3),
                    t.UI_Live_Broadcast.fetchInfo(
                      c,
                      Laya.Handler.create(
                        n,
                        ({success, data}) => {
                          (f = 0),
                            success &&
                              a.Inst.close(
                                Laya.Handler.create(n, () => {
                                  t.UI_Live_Broadcast.goToWatch(c, data, _);
                                })
                              );
                        },
                        null,
                        false
                      )
                    ));
              },
              null,
              false
            )),
              game.Tools.setGrayDisable(d, false);
          } else game.Tools.setGrayDisable(d, true);
        }
      }),
      (e.prototype.onListenerMsg = function(t) {
        const e = this.nolimitlist.rate;
        this.refresh(), (this.nolimitlist.rate = e);
      }),
      (e.prototype._loadInfo = function(t) {
        this.nolimitlist.loadOver(
          true,
          game.FriendMgr.friend_list.length - this.nolimitlist.value_count
        );
      }),
      (e.prototype.refresh = function() {
        this.sortlist = [];
        for (var t = game.FriendMgr.friend_list, e = 0; e < t.length; e++)
          this.sortlist.push(e);
        (this.sortlist = this.sortlist.sort((e, i) => {
          const n = t[e];
          let a = 0;
          if (n.state.is_online) {
            (a +=
              '' != (o = game.Tools.playState2Desc(n.state.playing))
                ? 6e10
                : 3e10),
              (a += -n.state.login_time);
          } else a += n.state.logout_time;
          const r = t[i];
          let s = 0;
          if (r.state.is_online) {
            var o = game.Tools.playState2Desc(r.state.playing);
            (s += '' != o ? 6e10 : 3e10), (s += -r.state.login_time);
          } else s += r.state.logout_time;
          return s - a;
        })),
          this.nolimitlist.reset(),
          (this.nolimitlist.total_count = game.FriendMgr.friend_list.length),
          (this.noinfo.visible = 0 == this.nolimitlist.total_count),
          300 == game.FriendMgr.friend_max_count
            ? (this.count_limit.visible = false)
            : ((this.count_limit.text =
                `${t.length}/${game.FriendMgr.friend_max_count}`),
              (this.count_limit.visible = true));
      }),
      e
    ;
    })();

  const i = (() => {
    function e(t) {
      const e = this;
      (this.playerinfos = []), (this.me = t);
      const i = this.me.getChildByName('scrollview');
      (this.nolimitlist = i.scriptMap['capsui.NoLimitList']),
        this.nolimitlist.init_nolimitlist(
          Laya.Handler.create(this, this._loadInfo, null, false),
          Laya.Handler.create(
            this,
            ({index, container, cache_data}) => {
              e.setItem(index, container, cache_data);
            },
            null,
            false
          )
        ),
        this.nolimitlist.reset(),
        (this.noinfo = this.me.getChildByName('noinfo'));
    }
    return (e.prototype.onEnable = function() {
      (this.me.visible = true), this.refresh();
    }),
    (e.prototype.onDisable = function() {
      this.me.visible = false;
    }),
    (e.prototype.setItem = function(e, i, n) {
      const a = this;
      if (this.me.visible) {
        n.hasOwnProperty('name') ||
          ((n.head = new t.UI_Head(i.getChildByName('head'))),
          (n.level = new t.UI_Level(i.getChildByName('rank'))),
          (n.level3 = new t.UI_Level(i.getChildByName('rank3'))),
          (n.name = i.getChildByName('name')),
          (n.state = i.getChildByName('state')),
          (n.btn_check = i.getChildByName('check')),
          (n.btn_agree = i.getChildByName('agree')),
          (n.btn_reject = i.getChildByName('reject')),
          (n.title = new t.UI_PlayerTitle(i.getChildByName('title'))));
        const r = this.playerinfos[e];
        (n.head.id = r.info.avatar_id), (n.level.id = r.info.level.id);
        const s = r.info.level3 || { id: 20101, score: 0 };
        (n.level3.id = s.id),
          (n.name.text = r.info.nickname),
          (n.title.id = r.info.title);
        const o = r.account_id;
        (n.state.text = game.Tools.time2Desc(r.apply_time)),
          (n.btn_check.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_OtherPlayerInfo.Inst.show(o);
            },
            null,
            false
          )),
          game.Tools.setGrayDisable(n.btn_agree, false),
          (n.btn_agree.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(n.btn_agree, true),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'handleFriendApply',
                  { target_id: o, method: 1 },
                  (e, i) => {
                    game.Tools.setGrayDisable(n.btn_agree, false),
                      e || i.error
                        ? t.UIMgr.Inst.showNetReqError(
                            'handleFriendApply',
                            e,
                            i
                          )
                        : a.removeItem(o);
                  }
                );
            },
            null,
            false
          )),
          game.Tools.setGrayDisable(n.btn_reject, false),
          (n.btn_reject.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(n.btn_reject, true),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'handleFriendApply',
                  { target_id: o, method: 2 },
                  (e, i) => {
                    game.Tools.setGrayDisable(n.btn_reject, false),
                      e || i.error
                        ? t.UIMgr.Inst.showNetReqError(
                            'handleFriendApply',
                            e,
                            i
                          )
                        : a.removeItem(o);
                  }
                );
            },
            null,
            false
          ));
      }
    }),
    (e.prototype.removeItem = function(t) {
      for (var e = -1, i = 0; i < this.playerinfos.length; i++)
        if (this.playerinfos[i].account_id == t) {
          e = i;
          for (let n = i; n < this.playerinfos.length - 1; n++)
            this.playerinfos[n] = this.playerinfos[n + 1];
          this.playerinfos.pop();
          break;
        }
      game.FriendMgr.delFriendApply(t),
        -1 != e && this.nolimitlist.delItem(e),
        a.Inst.refreshRedpoint(),
        (this.noinfo.visible = 0 == this.playerinfos.length);
    }),
    (e.prototype._loadInfo = function(e) {
      for (
        var i = this, n = [], a = 0;
        a < 20 && a + e < this.playerinfos.length;
        a++
      )
        n.push(this.playerinfos[e + a].account_id);
      0 == n.length
        ? (game.Tools.debugFetchMultiAccountBrief(
            'apply_friend',
            e,
            this.nolimitlist.total_count,
            this.nolimitlist.value_count
          ),
          this.nolimitlist.loadOver(false, 0))
        : app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchMultiAccountBrief',
            { account_id_list: n },
            (n, a) => {
              if (n || a.error)
                t.UIMgr.Inst.showNetReqError(
                  'fetchMultiAccountBrief',
                  n,
                  a
                ),
                  i.nolimitlist.loadOver(false, 0);
              else {
                for (var r = -1, s = 0; s < a.players.length; s++) {
                  if (
                    ((i.playerinfos[e + s].info = a.players[s]),
                    i.playerinfos[e + s].account_id !=
                      a.players[s].account_id)
                  ) {
                    r = e + s;
                    break;
                  }
                  i.playerinfos[e + s].info = a.players[s];
                }
                -1 != r
                  ? (t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2074, [
                        (r + 1).toString()
                      ])
                    ),
                    i.nolimitlist.loadOver(false, 0))
                  : i.nolimitlist.loadOver(true, a.players.length);
              }
            }
          );
    }),
    (e.prototype.refresh = function() {
      this.nolimitlist.reset(),
        (this.playerinfos = []),
        (this.noinfo.visible = false);
      for (let t = 0; t < game.FriendMgr.friendapply_list.length; t++)
        this.playerinfos.push({
          account_id: game.FriendMgr.friendapply_list[t].account_id,
          apply_time: game.FriendMgr.friendapply_list[t].apply_time
        });
      (this.playerinfos = this.playerinfos.sort(({apply_time}, {apply_time}) => apply_time - apply_time)),
        (this.nolimitlist.total_count = this.playerinfos.length),
        (this.noinfo.visible = 0 == this.playerinfos.length);
    }),
    e
  ;
  })();

  const n = (() => {
    function e(t) {
      const e = this;
      (this.playerinfos = []),
        (this.searchend = false),
        (this.timecd = {}),
        (this.searchnext = false),
        (this.me = t);
      const i = this.me.getChildByName('scrollview');
      (this.nolimitlist = i.scriptMap['capsui.NoLimitList']),
        this.nolimitlist.init_nolimitlist(
          Laya.Handler.create(this, this._loadInfo, null, false),
          Laya.Handler.create(
            this,
            ({index, container, cache_data}) => {
              e.setItem(index, container, cache_data);
            },
            null,
            false
          )
        ),
        this.nolimitlist.reset(),
        (this.input = this.me.getChildByName('input').getChildAt(0)),
        (this.btn_search = this.me.getChildByName('search')),
        (this.btn_search.clickHandler = Laya.Handler.create(
          this,
          () => {
            '' != e.input.text &&
              ((e.playerinfos = []),
              e.nolimitlist.reset(),
              (e.searchnext = false),
              (e.searchend = false),
              (e.nolimitlist.total_count = 1),
              game.Tools.setGrayDisable(e.btn_search, true),
              Laya.timer.once(3e3, e, () => {
                game.Tools.setGrayDisable(e.btn_search, false);
              }));
          },
          null,
          false
        ));
    }
    return (e.prototype.onEnable = function() {
      (this.me.visible = true),
        this.nolimitlist.reset(),
        (this.playerinfos = []),
        (this.input.text = ''),
        (this.searchend = true),
        (this.timecd = {}),
        game.Tools.setGrayDisable(this.btn_search, false);
    }),
    (e.prototype.onDisable = function() {
      this.me.visible = false;
    }),
    (e.prototype.setItem = function(e, i, n) {
      const a = this;
      if (this.me.visible)
        for (
          let r = r => {
                  const o = `p${r}`;
                  if (!n.hasOwnProperty(o)) {
                    const l = {
                      container: i.getChildByName(o),
                      head: new t.UI_Head(
                        i.getChildByName(o).getChildByName('head')
                      ),
                      add_1: i.getChildByName(o).getChildByName('add_1'),
                      btn_add: i.getChildByName(o).getChildByName('add'),
                      name: i.getChildByName(o).getChildByName('name'),
                      title: new t.UI_PlayerTitle(
                        i.getChildByName(o).getChildByName('title')
                      )
                    };
                    n[o] = l;
                  }
                  const h = n[o], c = 2 * e + r;
                  if (c >= s.playerinfos.length) h.container.visible = false;
                  else {
                    h.container.visible = true;
                    const u = s.playerinfos[c];
                    (h.head.id = u.info.avatar_id),
                      (h.name.text = u.info.nickname),
                      (h.title.id = u.info.title);
                    const _ = u.account_id;
                    if (game.FriendMgr.find(_))
                      (h.add_1.visible = true),
                        (h.add_1.text = game.Tools.strOfLocalization(2075)),
                        (h.btn_add.visible = false);
                    else if (u.info.added)
                      (h.add_1.visible = true),
                        (h.add_1.text = game.Tools.strOfLocalization(2076)),
                        (h.btn_add.visible = false);
                    else {
                      (h.add_1.visible = false), (h.btn_add.visible = true);
                      let d = 0;
                      s.timecd.hasOwnProperty(_.toString()) &&
                        (d =
                          s.timecd[_.toString()] + 1e4 - Laya.timer.currTimer) <
                          0 &&
                        (d = 0);
                      const f = h.btn_add;
                      Laya.timer.clearAll(f),
                        d > 0 &&
                          (game.Tools.setGrayDisable(f, true),
                          Laya.timer.once(d, f, () => {
                            game.Tools.setGrayDisable(f, false);
                          })),
                        game.Tools.setGrayDisable(f, false),
                        (f.clickHandler = Laya.Handler.create(
                          s,
                          () => {
                            (a.timecd[_.toString()] = Laya.timer.currTimer),
                              app.NetAgent.sendReq2Lobby(
                                'Lobby',
                                'applyFriend',
                                { target_id: _ },
                                (e, i) => {
                                  (e || i.error) &&
                                    t.UIMgr.Inst.showNetReqError(
                                      'applyFriend',
                                      e,
                                      i
                                    );
                                }
                              ),
                              (h.add_1.visible = true),
                              (h.add_1.text = game.Tools.strOfLocalization(
                                2076
                              )),
                              (h.btn_add.visible = false),
                              (u.info.added = true);
                          },
                          null,
                          false
                        ));
                    }
                  }
                },
              s = this,
              o = 0;
          o < 2;
          o++
        )
          r(o);
    }),
    (e.prototype._loadInfo = function(e) {
      const i = this;
      e >= 50
        ? this.nolimitlist.loadOver(false, 0)
        : app.NetAgent.sendReq2Lobby(
            'Lobby',
            'searchAccountByPattern',
            { search_next: this.searchnext, pattern: this.input.text },
            (n, a) => {
              if (n || a.error)
                return (
                  t.UIMgr.Inst.showNetReqError(
                    'searchAccountByPattern',
                    n,
                    a
                  ),
                  void i.nolimitlist.loadOver(false, 0)
                );
              const r = i.playerinfos.length;
              if (
                ((i.searchend = a.is_finished),
                i.searchend
                  ? (i.nolimitlist.total_count = Math.ceil(
                      i.playerinfos.length / 2
                    ))
                  : ((i.nolimitlist.total_count =
                      Math.ceil(i.playerinfos.length / 2) + 1),
                    (i.searchnext = true)),
                (a.match_accounts && 0 != a.match_accounts.length) ||
                  a.decode_id)
              ) {
                const s = [];
                if (
                  (0 == i.nolimitlist.value_count &&
                    a.decode_id &&
                    a.decode_id != GameMgr.Inst.account_id &&
                    s.push(a.decode_id),
                  a.match_accounts)
                )
                  for (let o = 0; o < a.match_accounts.length; o++)
                    s.push(a.match_accounts[o]);
                0 == s.length
                  ? (game.Tools.debugFetchMultiAccountBrief(
                      'search_friend',
                      e,
                      i.nolimitlist.total_count,
                      i.nolimitlist.value_count
                    ),
                    i.nolimitlist.loadOver(false, 0))
                  : app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'fetchMultiAccountBrief',
                      { account_id_list: s },
                      (e, n) => {
                        if (e || n.error)
                          t.UIMgr.Inst.showNetReqError(
                            'fetchMultiAccountBrief',
                            e,
                            n
                          ),
                            i.nolimitlist.loadOver(false, 0);
                        else {
                          for (
                            var a = -1, o = 0;
                            o < n.players.length;
                            o++
                          ) {
                            if (s[o] != n.players[o].account_id) {
                              a = r + o;
                              break;
                            }
                            i.playerinfos.push({
                              account_id: s[o],
                              info: n.players[o]
                            });
                          }
                          -1 != a
                            ? (t.UIMgr.Inst.ShowErrorInfo(
                                game.Tools.strOfLocalization(2074, [
                                  (a + 1).toString()
                                ])
                              ),
                              i.nolimitlist.loadOver(false, 0))
                            : i.nolimitlist.loadOver(
                                true,
                                Math.ceil(i.playerinfos.length / 2) -
                                  i.nolimitlist.value_count
                              );
                        }
                      }
                    );
              } else i.nolimitlist.loadOver(true, 0);
            }
          );
    }),
    e
  ;
  })();

  var a = (a => {
    function r() {
      const t = a.call(this, new ui.lobby.friendUI()) || this;
      return (
        (t.page_friend = null),
        (t.page_apply = null),
        (t.page_search = null),
        (t.root = null),
        (t.top = null),
        (t.tabs = []),
        (t.redpoint = null),
        (t.label_id = null),
        (t.currentpage = -1),
        (t.locking = false),
        (r.Inst = t),
        t
      );
    }
    return __extends(r, a),
    (r.prototype.onCreate = function() {
      const a = this;
      (this.top = this.me.getChildByName('top')),
        (this.root = this.me.getChildByName('root')),
        (this.page_friend = new e(this.root.getChildByName('page_friend'))),
        (this.page_apply = new i(this.root.getChildByName('page_apply'))),
        (this.page_search = new n(this.root.getChildByName('page_find')));
      for (
        let r = 0;
        r < this.root.getChildByName('tabs').numChildren;
        r++
      ) {
        const s = this.root.getChildByName('tabs').getChildAt(r);
        (s.clickHandler = Laya.Handler.create(
          this,
          this.showpage,
          [r],
          false
        )),
          this.tabs.push(s);
      }
      (this.redpoint = this.root
        .getChildByName('tabs')
        .getChildByName('btn_applylist')
        .getChildByName('redpoint')),
        (this.redpoint.visible = false),
        (this.page_friend.me.visible = false),
        (this.page_apply.me.visible = false),
        (this.page_search.me.visible = false),
        (this.top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            a.locking ||
              a.close(
                Laya.Handler.create(a, () => {
                  t.UIMgr.Inst.showLobby();
                })
              );
          },
          null,
          false
        )),
        (this.label_id = this.root
          .getChildByName('id')
          .getChildByName('id'));
    }),
    (r.prototype.show = function() {
      const e = this;
      game.Scene_Lobby.Inst.change_bg('indoor', false),
        (this.currentpage = -1),
        (this.locking = true),
        (this.enable = true),
        t.UIBase.anim_alpha_in(this.top, { y: -30 }, 200),
        t.UIBase.anim_alpha_in(this.root, { y: 30 }, 200),
        Laya.timer.once(200, this, () => {
          (e.locking = false), e.showpage(0);
        }),
        this.refreshRedpoint(),
        (this.label_id.text = game.Tools.encode_account_id2(
          GameMgr.Inst.account_id
        ).toString());
    }),
    (r.prototype.refreshRedpoint = function() {
      this.redpoint.visible =
        game.FriendMgr.friendapply_list &&
        game.FriendMgr.friendapply_list.length > 0;
    }),
    (r.prototype.close = function(e) {
      const i = this;
      (this.locking = true),
        t.UIBase.anim_alpha_out(this.top, { y: -30 }, 200),
        t.UIBase.anim_alpha_out(this.root, { y: 30 }, 200),
        Laya.timer.once(200, this, () => {
          (i.locking = false), (i.enable = false), e && e.run();
        });
    }),
    (r.prototype.onDisable = function() {
      this.currentpage &&
        ((this.tabs[this.currentpage].skin = game.Tools.localUISrc(
          'myres/shop/tab_unchoose.png'
        )),
        (this.currentpage = -1)),
        this.page_friend.close(),
        this.page_apply.onDisable(),
        this.page_search.onDisable();
    }),
    (r.prototype.showpage = function(t) {
      if (this.currentpage != t) {
        if (-1 != this.currentpage)
          switch (
            ((this.tabs[this.currentpage].skin = game.Tools.localUISrc(
              'myres/shop/tab_unchoose.png'
            )),
            this.currentpage)
          ) {
            case 0:
              this.page_friend.close();
              break;
            case 1:
              this.page_apply.onDisable();
              break;
            case 2:
              this.page_search.onDisable();
          }
        switch (
          ((this.currentpage = t),
          (this.tabs[this.currentpage].skin = game.Tools.localUISrc(
            'myres/shop/tab_choose.png'
          )),
          this.currentpage)
        ) {
          case 0:
            this.page_friend.show();
            break;
          case 1:
            this.page_apply.onEnable();
            break;
          case 2:
            this.page_search.onEnable();
        }
      }
    }),
    r
  ;
  })(t.UIBase);

  t.UI_Friend = a;
})(uiscript || (uiscript = {}));