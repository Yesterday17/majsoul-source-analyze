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
      this.cells = [];
      this.fun_change = null;
      this.noinfo = null;
      this.sortlist = [];
      this.count_limit = null;
      this.me = t;
      var i = this.me.getChildByName('scrollview');
      this.nolimitlist = i.scriptMap['capsui.NoLimitList'];

      this.nolimitlist.init_nolimitlist(
        Laya.Handler.create(this, this._loadInfo, null, !1),
        Laya.Handler.create(
          this,
          ({index, container}) => {
            e.setItem(index, container);
          },
          null,
          !1
        )
      );

      this.nolimitlist.reset();

      this.fun_change = Laya.Handler.create(
          this,
          this.onListenerMsg,
          null,
          !1
        );

      this.noinfo = this.me.getChildByName('noinfo');
      this.cells = [];
      this.count_limit = this.me.getChildByName('count_limit');
      this.count_limit.text = '--/--';
    }

    e.prototype.show = function() {
      this.me.visible = !0;
      game.FriendMgr.addListener(this.fun_change);
      this.refresh();
    };

    e.prototype.close = function() {
      game.FriendMgr.removeListener(this.fun_change);
      this.me.visible = !1;
    };

    e.prototype.findcell = function(t) {
      for (var e = 0; e < this.cells.length; e++)
        if (this.cells[e].container === t) return this.cells[e];
      return null;
    };

    e.prototype.setItem = function(e, i) {
      var n = this;
      if (this.me.visible) {
        var r = this.findcell(i);

        r = {
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
          };

        null == r &&
          (this.cells.push(r));
        var s = game.FriendMgr.friend_list[this.sortlist[e]];
        r.head.id = s.base.avatar_id;
        r.head.head_frame = s.base.avatar_frame;
        var o = s.base.level || { id: 10101, score: 0 };
        r.level.id = o.id;
        var l = s.base.level3 || { id: 20101, score: 0 };
        r.level3.id = l.id;
        r.title.id = s.base.title;
        r.name.text = s.base.nickname;
        var h = r.state,
          c = '';

        h.text =
          game.Tools.time2Desc(s.state.logout_time) +
          game.Tools.strOfLocalization(2072);

        if (s.state.is_online) {
          var u = game.Tools.playState2Desc(s.state.playing);
          h.text = game.Tools.strOfLocalization(2069, [u]);
          h.color = '#a9d94d';
          h.text = game.Tools.strOfLocalization(2071);
          '' != u
            ? (c = s.state.playing.game_uuid)
            : (h.color = '#58c4db');
        } else
          h.color = '#8c8c8c';
        var _ = s.base.account_id;
        r.account_id = s.base.account_id;

        r.btn_check.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_OtherPlayerInfo.Inst.show(_);
            },
            null,
            !1
          );

        game.Tools.setGrayDisable(r.btn_delete, !1);
        r.btn_delete.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(r.btn_delete, !0);
              t.UI_SecondConfirm.Inst.show(
                game.Tools.strOfLocalization(2073, [s.base.nickname]),
                Laya.Handler.create(n, () => {
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'removeFriend',
                    { target_id: _ },
                    (e, i) => {
                      game.Tools.setGrayDisable(r.btn_delete, !1);
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
                    game.Tools.setGrayDisable(r.btn_delete, !1);
                  },
                  null,
                  !1
                ),
                1111,
                560
              );
            },
            null,
            !1
          );
        var d = r.btn_ob;
        if ('' != c) {
          var f = 0;

          d.clickHandler = Laya.Handler.create(
            this,
            () => {
              f = Laya.timer.currTimer + 1e3;
              t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : Laya.timer.currTimer < f ||
                  (t.UI_Live_Broadcast.fetchInfo(
                c,
                Laya.Handler.create(
                  n,
                  ({success, data}) => {
                    f = 0;
                    success &&
                      a.Inst.close(
                        Laya.Handler.create(n, () => {
                          t.UI_Live_Broadcast.goToWatch(c, data, _);
                        })
                      );
                  },
                  null,
                  !1
                )
              ));
            },
            null,
            !1
          );

          game.Tools.setGrayDisable(d, !1);
        } else game.Tools.setGrayDisable(d, !0);
      }
    };

    e.prototype.onListenerMsg = function(t) {
      var e = this.nolimitlist.rate;
      this.refresh();
      this.nolimitlist.rate = e;
    };

    e.prototype._loadInfo = function(t) {
      this.nolimitlist.loadOver(
        !0,
        game.FriendMgr.friend_list.length - this.nolimitlist.value_count
      );
    };

    e.prototype.refresh = function() {
      this.sortlist = [];
      for (var t = game.FriendMgr.friend_list, e = 0; e < t.length; e++)
        this.sortlist.push(e);

      this.sortlist = this.sortlist.sort((e, i) => {
        var n = t[e],
          a = 0;
        if (n.state.is_online) {
          a +=
            '' != (o = game.Tools.playState2Desc(n.state.playing))
              ? 6e10
              : 3e10;

          a += -n.state.login_time;
        } else a += n.state.logout_time;
        var r = t[i],
          s = 0;
        if (r.state.is_online) {
          var o = game.Tools.playState2Desc(r.state.playing);
          s += '' != o ? 6e10 : 3e10;
          s += -r.state.login_time;
        } else s += r.state.logout_time;
        return s - a;
      });

      this.nolimitlist.reset();
      this.nolimitlist.total_count = game.FriendMgr.friend_list.length;
      this.noinfo.visible = 0 == this.nolimitlist.total_count;

      this.count_limit.text =
            `${t.length}/${game.FriendMgr.friend_max_count}`;

      300 == game.FriendMgr.friend_max_count
        ? (this.count_limit.visible = !1)
        : (this.count_limit.visible = !0);
    };

    return e;
  })();

  var i = (() => {
    function e(t) {
      var e = this;
      this.playerinfos = [];
      this.me = t;
      var i = this.me.getChildByName('scrollview');
      this.nolimitlist = i.scriptMap['capsui.NoLimitList'];

      this.nolimitlist.init_nolimitlist(
        Laya.Handler.create(this, this._loadInfo, null, !1),
        Laya.Handler.create(
          this,
          ({index, container, cache_data}) => {
            e.setItem(index, container, cache_data);
          },
          null,
          !1
        )
      );

      this.nolimitlist.reset();
      this.noinfo = this.me.getChildByName('noinfo');
    }

    e.prototype.onEnable = function() {
      this.me.visible = !0;
      this.refresh();
    };

    e.prototype.onDisable = function() {
      this.me.visible = !1;
    };

    e.prototype.setItem = function(e, i, n) {
      var a = this;
      if (this.me.visible) {
        n.head = new t.UI_Head(i.getChildByName('head'));
        n.level = new t.UI_Level(i.getChildByName('rank'));
        n.level3 = new t.UI_Level(i.getChildByName('rank3'));
        n.name = i.getChildByName('name');
        n.state = i.getChildByName('state');
        n.btn_check = i.getChildByName('check');
        n.btn_agree = i.getChildByName('agree');
        n.btn_reject = i.getChildByName('reject');
        n.hasOwnProperty('name') ||
          ((n.title = new t.UI_PlayerTitle(i.getChildByName('title'))));
        var r = this.playerinfos[e];
        n.head.id = r.info.avatar_id;
        n.head.head_frame = r.info.avatar_frame;
        n.level.id = r.info.level.id;
        var s = r.info.level3 || { id: 20101, score: 0 };
        n.level3.id = s.id;
        n.name.text = r.info.nickname;
        n.title.id = r.info.title;
        var o = r.account_id;
        n.state.text = game.Tools.time2Desc(r.apply_time);

        n.btn_check.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_OtherPlayerInfo.Inst.show(o);
            },
            null,
            !1
          );

        game.Tools.setGrayDisable(n.btn_agree, !1);

        n.btn_agree.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(n.btn_agree, !0);
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'handleFriendApply',
                { target_id: o, method: 1 },
                (e, i) => {
                  game.Tools.setGrayDisable(n.btn_agree, !1);
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
            !1
          );

        game.Tools.setGrayDisable(n.btn_reject, !1);
        n.btn_reject.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(n.btn_reject, !0);
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'handleFriendApply',
                { target_id: o, method: 2 },
                (e, i) => {
                  game.Tools.setGrayDisable(n.btn_reject, !1);
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
            !1
          );
      }
    };

    e.prototype.removeItem = function(t) {
      for (var e = -1, i = 0; i < this.playerinfos.length; i++)
        if (this.playerinfos[i].account_id == t) {
          e = i;
          for (var n = i; n < this.playerinfos.length - 1; n++)
            this.playerinfos[n] = this.playerinfos[n + 1];
          this.playerinfos.pop();
          break;
        }
      game.FriendMgr.delFriendApply(t);
      -1 != e && this.nolimitlist.delItem(e);
      a.Inst.refreshRedpoint();
      this.noinfo.visible = 0 == this.playerinfos.length;
    };

    e.prototype._loadInfo = function(e) {
      for (
        var i = this, n = [], a = 0;
        a < 20 && a + e < this.playerinfos.length;
        a++
      )
        n.push(this.playerinfos[e + a].account_id);

      game.Tools.debugFetchMultiAccountBrief(
            'apply_friend',
            e,
            this.nolimitlist.total_count,
            this.nolimitlist.value_count
          );

      0 == n.length
        ? (this.nolimitlist.loadOver(!1, 0))
        : app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchMultiAccountBrief',
            { account_id_list: n },
            (n, a) => {
              t.UIMgr.Inst.showNetReqError(
                'fetchMultiAccountBrief',
                n,
                a
              );

              if (n || a.error)
                i.nolimitlist.loadOver(!1, 0);
              else {
                for (var r = -1, s = 0; s < a.players.length; s++) {
                  i.playerinfos[e + s].info = a.players[s];
                  if (
                    (i.playerinfos[e + s].account_id !=
                    a.players[s].account_id)
                  ) {
                    r = e + s;
                    break;
                  }
                  i.playerinfos[e + s].info = a.players[s];
                }

                t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2074, [
                        (r + 1).toString()
                      ])
                    );

                -1 != r
                  ? (i.nolimitlist.loadOver(!1, 0))
                  : i.nolimitlist.loadOver(!0, a.players.length);
              }
            }
          );
    };

    e.prototype.refresh = function() {
      this.nolimitlist.reset();
      this.playerinfos = [];
      this.noinfo.visible = !1;
      for (var t = 0; t < game.FriendMgr.friendapply_list.length; t++)
        this.playerinfos.push({
          account_id: game.FriendMgr.friendapply_list[t].account_id,
          apply_time: game.FriendMgr.friendapply_list[t].apply_time
        });

      this.playerinfos = this.playerinfos.sort(({apply_time}, {apply_time}) => apply_time - apply_time);

      this.nolimitlist.total_count = this.playerinfos.length;
      this.noinfo.visible = 0 == this.playerinfos.length;
    };

    return e;
  })();

  var n = (() => {
    class e {
      constructor(t) {
        var e = this;
        this.playerinfos = [];
        this.searchend = !1;
        this.timecd = {};
        this.searchnext = !1;
        this.me = t;
        var i = this.me.getChildByName('scrollview');
        this.nolimitlist = i.scriptMap['capsui.NoLimitList'];

        this.nolimitlist.init_nolimitlist(
          Laya.Handler.create(this, this._loadInfo, null, !1),
          Laya.Handler.create(
            this,
            ({index, container, cache_data}) => {
              e.setItem(index, container, cache_data);
            },
            null,
            !1
          )
        );

        this.nolimitlist.reset();
        this.input = this.me.getChildByName('input').getChildAt(0);
        this.btn_search = this.me.getChildByName('search');
        this.btn_search.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.playerinfos = [];
              e.nolimitlist.reset();
              e.searchnext = !1;
              e.searchend = !1;
              e.nolimitlist.total_count = 1;
              game.Tools.setGrayDisable(e.btn_search, !0);
              '' != e.input.text &&
                (Laya.timer.once(3e3, e, () => {
                game.Tools.setGrayDisable(e.btn_search, !1);
              }));
            },
            null,
            !1
          );
      }

      onEnable() {
        this.me.visible = !0;
        this.nolimitlist.reset();
        this.playerinfos = [];
        this.input.text = '';
        this.searchend = !0;
        this.timecd = {};
        game.Tools.setGrayDisable(this.btn_search, !1);
      }

      onDisable() {
        this.me.visible = !1;
      }

      setItem(e, i, n) {
        var a = this;
        if (this.me.visible)
          for (
            var r = r => {
                var o = `p${r}`;
                if (!n.hasOwnProperty(o)) {
                  var l = {
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
                var h = n[o],
                  c = 2 * e + r;
                if (c >= s.playerinfos.length) h.container.visible = !1;
                else {
                  h.container.visible = !0;
                  var u = s.playerinfos[c];
                  h.head.id = u.info.avatar_id;
                  h.head.head_frame = u.info.avatar_frame;
                  h.name.text = u.info.nickname;
                  h.title.id = u.info.title;
                  var _ = u.account_id;
                  h.add_1.visible = !0;
                  h.add_1.text = game.Tools.strOfLocalization(2075);
                  h.add_1.visible = !0;
                  h.add_1.text = game.Tools.strOfLocalization(2076);
                  if (game.FriendMgr.find(_))
                    h.btn_add.visible = !1;
                  else if (u.info.added)
                    h.btn_add.visible = !1;
                  else {
                    h.add_1.visible = !1;
                    h.btn_add.visible = !0;
                    var d = 0;
                    s.timecd.hasOwnProperty(_.toString()) &&
                      (d =
                        s.timecd[_.toString()] + 1e4 - Laya.timer.currTimer) <
                        0 &&
                      (d = 0);
                    var f = h.btn_add;
                    Laya.timer.clearAll(f);
                    game.Tools.setGrayDisable(f, !0);

                    d > 0 &&
                      (Laya.timer.once(d, f, () => {
                      game.Tools.setGrayDisable(f, !1);
                    }));

                    game.Tools.setGrayDisable(f, !1);
                    f.clickHandler = Laya.Handler.create(
                        s,
                        () => {
                          a.timecd[_.toString()] = Laya.timer.currTimer;

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
                          );

                          h.add_1.visible = !0;

                          h.add_1.text = game.Tools.strOfLocalization(
                              2076
                            );

                          h.btn_add.visible = !1;
                          u.info.added = !0;
                        },
                        null,
                        !1
                      );
                  }
                }
              },
              s = this,
              o = 0;
            o < 2;
            o++
          )
            r(o);
      }

      _loadInfo(e) {
        var i = this;
        e >= 50
          ? this.nolimitlist.loadOver(!1, 0)
          : app.NetAgent.sendReq2Lobby(
              'Lobby',
              'searchAccountByPattern',
              { search_next: this.searchnext, pattern: this.input.text },
              (n, a) => {
                t.UIMgr.Inst.showNetReqError(
                  'searchAccountByPattern',
                  n,
                  a
                );

                if (n || a.error)
                  return void i.nolimitlist.loadOver(!1, 0);
                var r = i.playerinfos.length;
                i.searchend = a.is_finished;

                i.nolimitlist.total_count =
                      Math.ceil(i.playerinfos.length / 2) + 1;

                i.searchend
                  ? (i.nolimitlist.total_count = Math.ceil(
                      i.playerinfos.length / 2
                    ))
                  : (i.searchnext = !0);

                if (
                  ((a.match_accounts && 0 != a.match_accounts.length) ||
                  a.decode_id)
                ) {
                  var s = [];

                  0 == i.nolimitlist.value_count &&
                      a.decode_id &&
                      a.decode_id != GameMgr.Inst.account_id &&
                      s.push(a.decode_id);

                  if (
                    (a.match_accounts)
                  )
                    for (var o = 0; o < a.match_accounts.length; o++)
                      s.push(a.match_accounts[o]);

                  game.Tools.debugFetchMultiAccountBrief(
                        'search_friend',
                        e,
                        i.nolimitlist.total_count,
                        i.nolimitlist.value_count
                      );

                  0 == s.length
                    ? (i.nolimitlist.loadOver(!1, 0))
                    : app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'fetchMultiAccountBrief',
                        { account_id_list: s },
                        (e, n) => {
                          t.UIMgr.Inst.showNetReqError(
                            'fetchMultiAccountBrief',
                            e,
                            n
                          );

                          if (e || n.error)
                            i.nolimitlist.loadOver(!1, 0);
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

                            t.UIMgr.Inst.ShowErrorInfo(
                                  game.Tools.strOfLocalization(2074, [
                                    (a + 1).toString()
                                  ])
                                );

                            -1 != a
                              ? (i.nolimitlist.loadOver(!1, 0))
                              : i.nolimitlist.loadOver(
                                  !0,
                                  Math.ceil(i.playerinfos.length / 2) -
                                    i.nolimitlist.value_count
                                );
                          }
                        }
                      );
                } else i.nolimitlist.loadOver(!0, 0);
              }
            );
      }
    }

    return e;
  })();

  var a = (a => {
    class r {
      constructor() {
        var t = a.call(this, new ui.lobby.friendUI()) || this;
        t.page_friend = null;
        t.page_apply = null;
        t.page_search = null;
        t.root = null;
        t.top = null;
        t.tabs = [];
        t.redpoint = null;
        t.label_id = null;
        t.currentpage = -1;
        t.locking = !1;
        r.Inst = t;
        return t;
      }

      onCreate() {
        var a = this;
        this.top = this.me.getChildByName('top');
        this.root = this.me.getChildByName('root');
        this.page_friend = new e(this.root.getChildByName('page_friend'));
        this.page_apply = new i(this.root.getChildByName('page_apply'));
        this.page_search = new n(this.root.getChildByName('page_find'));
        for (
          var r = 0;
          r < this.root.getChildByName('tabs').numChildren;
          r++
        ) {
          var s = this.root.getChildByName('tabs').getChildAt(r);

          s.clickHandler = Laya.Handler.create(
            this,
            this.showpage,
            [r],
            !1
          );

          this.tabs.push(s);
        }

        this.redpoint = this.root
          .getChildByName('tabs')
          .getChildByName('btn_applylist')
          .getChildByName('redpoint');

        this.redpoint.visible = !1;
        this.page_friend.me.visible = !1;
        this.page_apply.me.visible = !1;
        this.page_search.me.visible = !1;

        this.top.getChildByName(
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
            !1
          );

        this.label_id = this.root
            .getChildByName('id')
            .getChildByName('id');
      }

      show() {
        var e = this;
        game.Scene_Lobby.Inst.change_bg('indoor', !1);
        this.currentpage = -1;
        this.locking = !0;
        this.enable = !0;
        t.UIBase.anim_alpha_in(this.top, { y: -30 }, 200);
        t.UIBase.anim_alpha_in(this.root, { y: 30 }, 200);

        Laya.timer.once(200, this, () => {
          e.locking = !1;
          e.showpage(0);
        });

        this.refreshRedpoint();
        this.label_id.text = game.Tools.encode_account_id2(
            GameMgr.Inst.account_id
          ).toString();
      }

      refreshRedpoint() {
        this.redpoint.visible =
          game.FriendMgr.friendapply_list &&
          game.FriendMgr.friendapply_list.length > 0;
      }

      close(e) {
        var i = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.top, { y: -30 }, 200);
        t.UIBase.anim_alpha_out(this.root, { y: 30 }, 200);
        Laya.timer.once(200, this, () => {
          i.locking = !1;
          i.enable = !1;
          e && e.run();
        });
      }

      onDisable() {
        this.tabs[this.currentpage].skin = game.Tools.localUISrc(
            'myres/shop/tab_unchoose.png'
          );

        this.currentpage &&
          ((this.currentpage = -1));

        this.page_friend.close();
        this.page_apply.onDisable();
        this.page_search.onDisable();
      }

      showpage(t) {
        if (this.currentpage != t) {
          this.tabs[this.currentpage].skin = game.Tools.localUISrc(
              'myres/shop/tab_unchoose.png'
            );

          if (-1 != this.currentpage)
            switch (
              (this.currentpage)
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
          this.currentpage = t;

          this.tabs[this.currentpage].skin = game.Tools.localUISrc(
              'myres/shop/tab_choose.png'
            );

          switch (
            (this.currentpage)
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
      }
    }

    __extends(r, a);

    return r;
  })(t.UIBase);

  t.UI_Friend = a;
})(uiscript || (uiscript = {}));