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
    class e {
      constructor(t) {
        var e = this;
        this.friends = [];
        this.sortlist = [];
        this.me = t;
        this.me.visible = !1;
        this.blackbg = t.getChildByName('blackbg');

        this.blackbg.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            !1
          );

        this.root = t.getChildByName('root');
        this.scrollview = this.root.scriptMap['capsui.CScrollView'];

        this.scrollview.init_scrollview(
          Laya.Handler.create(this, this.render_item, null, !1)
        );

        this.noinfo = this.root.getChildByName('noinfo');
      }

      show() {
        var e = this;
        this.locking = !0;
        this.me.visible = !0;
        this.scrollview.reset();
        this.friends = [];
        this.sortlist = [];
        for (var i = game.FriendMgr.friend_list, n = 0; n < i.length; n++)
          this.sortlist.push(n);
        this.sortlist = this.sortlist.sort((t, e) => {
          var n = i[t],
            a = 0;
          if (n.state.is_online) {
            a +=
              '' != (o = game.Tools.playState2Desc(n.state.playing))
                ? 3e10
                : 6e10;

            a += -n.state.login_time;
          } else a += n.state.logout_time;
          var r = i[e],
            s = 0;
          if (r.state.is_online) {
            var o = game.Tools.playState2Desc(r.state.playing);
            s += '' != o ? 3e10 : 6e10;
            s += -r.state.login_time;
          } else s += r.state.logout_time;
          return s - a;
        });
        for (n = 0; n < i.length; n++)
          this.friends.push({ f: i[n], invited: !1 });
        this.noinfo.visible = 0 == this.friends.length;
        this.scrollview.addItem(this.friends.length);
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.me.visible = !1;
          })
        );
      }

      render_item({index, container, cache_data}) {
        var n = index,
          a = container,
          r = cache_data;
        r.head = new t.UI_Head(a.getChildByName('head'));
        r.name = a.getChildByName('label_name');
        r.state = a.getChildByName('label_state');
        r.btn = a.getChildByName('btn_invite');
        r.head ||
          ((r.invited = a.getChildByName('invited')));
        var s = this.friends[this.sortlist[n]];
        r.head.id = s.f.base.avatar_id;
        r.head.head_frame = s.f.base.avatar_frame;
        r.name.text = s.f.base.nickname;
        var o = !1;
        r.state.text = game.Tools.strOfLocalization(2072);
        r.state.color = '#8c8c8c';
        if (s.f.state.is_online) {
          var l = game.Tools.playState2Desc(s.f.state.playing);
          r.state.text = game.Tools.strOfLocalization(2069, [l]);
          r.state.color = '#a9d94d';
          r.state.text = game.Tools.strOfLocalization(2071);
          r.state.color = '#58c4db';
          r.name.color = '#58c4db';
          '' != l
            ? (r.name.color = '#a9d94d')
            : (o = !0);
        } else
          r.name.color = '#8c8c8c';
        r.btn.visible = !1;
        r.btn.visible = !0;
        r.invited.visible = !1;
        game.Tools.setGrayDisable(r.btn, !o);
        s.invited
          ? (r.invited.visible = !0)
          : (o &&
          (r.btn.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(r.btn, !0);
              var e = {
                room_id: i.Inst.room_id,
                mode: i.Inst.room_mode,
                nickname: GameMgr.Inst.account_data.nickname,
                account_id: GameMgr.Inst.account_id
              };
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'sendClientMessage',
                {
                  target_id: s.f.base.account_id,
                  type: game.EFriendMsgType.room_invite,
                  content: JSON.stringify(e)
                },
                (e, i) => {
                  game.Tools.setGrayDisable(r.btn, !1);
                  r.btn.visible = !1;
                  r.invited.visible = !0;
                  e || i.error
                    ? (t.UIMgr.Inst.showNetReqError(
                    'sendClientMessage',
                    e,
                    i
                  ))
                    : (s.invited = !0);
                }
              );
            },
            null,
            !1
          )));
      }
    }

    return e;
  })();

  var i = (i => {
    class n {
      constructor() {
        var e = i.call(this, new ui.lobby.waitingroomUI()) || this;
        e.skin_ready = 'myres/room/btn_ready.png';
        e.skin_cancel = 'myres/room/btn_cancel.png';
        e.skin_start = 'myres/room/btn_start.png';
        e.skin_start_no = 'myres/room/btn_start_no.png';
        e.label_rommid = null;
        e.player_cells = [];
        e.btn_ok = null;
        e.btn_invite_friend = null;
        e.btn_add_robot = null;
        e.beReady = !1;
        e.room_id = -1;
        e.owner_id = -1;
        e.tournament_id = 0;
        e.max_player_count = 0;
        e.players = [];
        e.container_rules = null;
        e.container_top = null;
        e.container_right = null;
        e.locking = !1;
        e.mousein_copy = !1;
        e.popout = null;
        e.room_link = null;
        e.btn_copy_link = null;
        e.last_start_room = 0;
        e.invitefriend = null;
        e.pre_choose = null;
        e.ai_name = game.Tools.strOfLocalization(2003);
        n.Inst = e;

        app.NetAgent.AddListener2Lobby(
          'NotifyRoomPlayerReady',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyRoomPlayerReady:${JSON.stringify(t)}`);
            e.onReadyChange(t.account_id, t.ready);
          })
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyRoomPlayerUpdate',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyRoomPlayerUpdate:${JSON.stringify(t)}`);
            e.onPlayerChange(t);
          })
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyRoomGameStart',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyRoomGameStart:${JSON.stringify(t)}`);
            e.enable &&
              (e.onGameStart(t));
          })
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyRoomKickOut',
          Laya.Handler.create(e, t => {
            app.Log.log(`NotifyRoomKickOut:${JSON.stringify(t)}`);
            e.onBeKictOut();
          })
        );

        game.LobbyNetMgr.Inst.add_connect_listener(
          Laya.Handler.create(
            e,
            () => {
              e.enable &&
                e.hide(
                  Laya.Handler.create(e, () => {
                    t.UI_Lobby.Inst.enable = !0;
                  })
                );
            },
            null,
            !1
          )
        );

        return e;
      }

      get inRoom() {
        return -1 != this.room_id;
      }

      get robot_count() {
        for (var t = 0, e = 0; e < this.players.length; e++)
          2 == this.players[e].category && t++;
        return t;
      }

      resetData() {
        this.room_id = -1;
        this.owner_id = -1;
        this.room_mode = {};
        this.max_player_count = 0;
        this.players = [];
      }

      updateData(t) {
        if (t) {
          this.room_id = t.room_id;
          this.owner_id = t.owner_id;
          this.room_mode = t.mode;
          this.public_live = t.public_live;
          this.tournament_id = 0;
          t.tournament_id && (this.tournament_id = t.tournament_id);
          this.ai_name = game.Tools.strOfLocalization(2003);

          1 === this.room_mode.detail_rule.ai_level &&
              (this.ai_name = game.Tools.strOfLocalization(2003));

          this.room_mode.detail_rule &&
            ((2 === this.room_mode.detail_rule.ai_level && (this.ai_name = game.Tools.strOfLocalization(2004))));

          this.max_player_count = t.max_player_count;
          this.players = [];
          for (i = 0; i < t.persons.length; i++) {
            var e = t.persons[i];
            e.ready = !1;
            e.cell_index = -1;
            e.category = 1;
            this.players.push(e);
          }
          for (i = 0; i < t.robot_count; i++)
            this.players.push({
              category: 2,
              cell_index: -1,
              account_id: 0,
              level: { id: 10101, score: 0 },
              level3: { id: 20101, score: 0 },
              nickname: this.ai_name,
              ready: !0,
              title: 0,
              avatar_id: 400101
            });
          for (var i = 0; i < t.ready_list.length; i++)
            for (var n = 0; n < this.players.length; n++)
              if (this.players[n].account_id == t.ready_list[i]) {
                this.players[n].ready = !0;
                break;
              }
        } else this.resetData();
      }

      onReadyChange(t, e) {
        for (var i = 0; i < this.players.length; i++)
          if (this.players[i].account_id == t) {
            this.players[i].ready = e;
            this._onPlayerReadyChange(this.players[i]);
            break;
          }
      }

      onPlayerChange(t) {
        t = t.toJSON();
        for (var e = [], i = 0; i < this.players.length; i++)
          0 != this.players[i].category && e.push(this.players[i]);
        this.players = e;
        if ((t.update_list))
          for (i = 0; i < t.update_list.length; i++) {
            for (
              var n = t.update_list[i], a = n.account_id, r = !0, s = 0;
              s < this.players.length;
              s++
            )
              if (this.players[s] && this.players[s].account_id == a) {
                n.avatar_id && (this.players[s].avatar_id = n.avatar_id);
                n.title && (this.players[s].avatar_id = n.title);
                n.nickname && (this.players[s].avatar_id = n.nickname);
                n.level && (this.players[s].level = n.level);
                this._refreshPlayerInfo(this.players[s]);
                r = !1;
                break;
              }
            if (r) {
              var o = -1;
              if (this.enable) {
                for (
                  var l = [!1, !1, !1, !1], h = 0;
                  h < this.players.length;
                  h++
                )
                  l[this.players[h].cell_index] = !0;
                for (s = 0; s < this.max_player_count; s++)
                  if (!l[s]) {
                    o = s;
                    break;
                  }
              }
              n.cell_index = o;
              n.ready = !1;
              n.category = 1;
              this.players.push(n);
              this._refreshPlayerInfo(
                this.players[this.players.length - 1]
              );
            }
          }
        if (t.remove_list)
          for (i = 0; i < t.remove_list.length; i++)
            for (
              var a = t.remove_list[i], s = 0;
              s < this.players.length;
              s++
            )
              if (this.players[s] && this.players[s].account_id == a) {
                for (
                  var c = this.players[s].cell_index, u = s;
                  u < this.players.length - 1;
                  u++
                )
                  this.players[u] = this.players[u + 1];
                this.players.pop();
                this._clearCell(c);
                break;
              }
        if (null != t.robot_count && void 0 != t.robot_count) {
          var _ = t.robot_count;
          this.pre_choose.category = 0;
          this._clearCell(this.pre_choose.cell_index);
          _ < this.robot_count &&
            this.pre_choose &&
            2 == this.pre_choose.category &&
            ((this.pre_choose = null));
          for (i = 0; i < this.players.length; i++) {
            var d = this.players[i];
            this.players[i].category = 0;
            2 == d.category &&
              (0 == _
                ? (this._clearCell(d.cell_index))
                : _--);
          }
          for (; _ > 0; ) {
            for (var f = -1, i = 0; i < this.players.length; i++)
              if (0 == this.players[i].category) {
                f = i;
                break;
              }
            _--;
            this.players[f].category = 2;
            this.players[f].cell_index = f;
            this.players[f].account_id = 0;
            this.players[f].level = { id: 10101, score: 0 };
            this.players[f].level3 = { id: 20101, score: 0 };
            this.players[f].nickname = this.ai_name;
            this.players[f].ready = !0;
            this.players[f].title = 0;
            this.players[f].avatar_id = 400101;
            if (-1 == f) {
              if (!(this.players.length < this.max_player_count)) {
                app.Log.Error('同步机器人数量有问题');
                break;
              }
              _--;
              for (
                var c = -1, l = [!1, !1, !1, !1], i = 0;
                i < this.players.length;
                i++
              )
                l[this.players[i].cell_index] = !0;
              for (s = 0; s < this.max_player_count; s++)
                if (!l[s]) {
                  c = s;
                  break;
                }

              this.players.push({
                category: 2,
                cell_index: c,
                account_id: 0,
                level: { id: 10101, score: 0 },
                level3: { id: 20101, score: 0 },
                nickname: this.ai_name,
                ready: !0,
                title: 0,
                avatar_id: 400101
              });

              this._refreshPlayerInfo(
                this.players[this.players.length - 1]
              );
            } else
              this._refreshPlayerInfo(this.players[f]);
          }
        }
        if (t.owner_id) {
          this.owner_id = t.owner_id;
          if ((this.enable))
            if (this.owner_id == GameMgr.Inst.account_id)
              this.refreshAsOwner();
            else
              for (s = 0; s < this.players.length; s++)
                if (
                  this.players[s] &&
                  this.players[s].account_id == this.owner_id
                ) {
                  this._refreshPlayerInfo(this.players[s]);
                  break;
                }
        } else if (this.enable)
          if (this.owner_id == GameMgr.Inst.account_id) this.refreshAsOwner();
          else
            for (s = 0; s < this.players.length; s++)
              if (
                this.players[s] &&
                this.players[s].account_id == this.owner_id
              ) {
                this._refreshPlayerInfo(this.players[s]);
                break;
              }
      }

      onBeKictOut() {
        this.resetData();
        this.enable = !1;
        t.UI_Lobby.Inst.enable = !0;
        this.enable &&
          (t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(52)));
      }

      onCreate() {
        var i = this;
        this.last_start_room = 0;
        var n = this.me.getChildByName('root');
        this.container_top = n.getChildByName('top');
        this.container_right = n.getChildByName('right');
        this.label_rommid = this.container_top.getChildByName(
            'label_roomid'
          );
        for (
          var a = e => {
            var a = n.getChildByName(`player_${e.toString()}`),
              s = {};
            s.index = e;
            s.container = a;
            s.container_flag = a.getChildByName('flag');
            s.container_name = a.getChildByName('container_name');

            s.name = a
                .getChildByName('container_name')
                .getChildByName('label_name');

            s.btn_t = a.getChildByName('btn_t');
            s.container_illust = a.getChildByName('container_illust');

            s.illust = new t.UI_Character_Skin(
                a
                  .getChildByName('container_illust')
                  .getChildByName('illust')
              );

            s.host = a.getChildByName('host');

            s.title = new t.UI_PlayerTitle(
                a.getChildByName('container_name').getChildByName('title')
              );

            s.rank = new t.UI_Level(
                a.getChildByName('container_name').getChildByName('rank')
              );

            s.is_robot = !1;
            var o = 0;

            s.btn_t.clickHandler = Laya.Handler.create(
              r,
              () => {
                if (!(i.locking || Laya.timer.currTimer < o)) {
                  o = Laya.timer.currTimer + 500;
                  for (var t = 0; t < i.players.length; t++)
                    if (i.players[t].cell_index == e) {
                      i.kickPlayer(t);
                      break;
                    }
                }
              },
              null,
              !1
            );

            s.btn_info = a.getChildByName('btn_info');

            s.btn_info.clickHandler = Laya.Handler.create(
                r,
                () => {
                  if (!i.locking)
                    for (var n = 0; n < i.players.length; n++)
                      if (i.players[n].cell_index == e) {
                        i.players[n].account_id &&
                          i.players[n].account_id > 0 &&
                          t.UI_OtherPlayerInfo.Inst.show(
                            i.players[n].account_id,
                            i.room_mode.mode < 10 ? 1 : 2
                          );
                        break;
                      }
                },
                null,
                !1
              );

            r.player_cells.push(s);
          },
            r = this,
            s = 0;
          s < 4;
          s++
        )
          a(s);
        this.btn_ok = n.getChildByName('btn_ok');
        var o = 0;
        this.btn_ok.clickHandler = Laya.Handler.create(
          this,
          () => {
            o = Laya.timer.currTimer;
            Laya.timer.currTimer < o + 500 ||
              ((i.owner_id == GameMgr.Inst.account_id ? i.getStart() : i.switchReady()));
          },
          null,
          !1
        );
        var l = 0;

        this.container_top.getChildByName(
          'btn_leave'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            l = Laya.timer.currTimer;
            Laya.timer.currTimer < l + 500 ||
              (i.leaveRoom());
          },
          null,
          !1
        );

        this.btn_invite_friend = this.container_right.getChildByName(
            'btn_friend'
          );

        this.btn_invite_friend.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.invitefriend.show();
            },
            null,
            !1
          );

        this.btn_add_robot = this.container_right.getChildByName(
            'btn_robot'
          );
        var h = 0;

        this.btn_add_robot.clickHandler = Laya.Handler.create(
          this,
          () => {
            h = Laya.timer.currTimer + 1e3;
            i.locking ||
              Laya.timer.currTimer < h ||
              (app.NetAgent.sendReq2Lobby(
              'Lobby',
              'modifyRoom',
              { robot_count: i.robot_count + 1 },
              (e, i) => {
                (e || (i.error && 1111 != i.error.code)) &&
                  t.UIMgr.Inst.showNetReqError('modifyRoom_add', e, i);

                h = 0;
              }
            ));
          },
          null,
          !1
        );

        this.container_right.getChildByName(
            'btn_help'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || t.UI_Rules.Inst.show();
            },
            null,
            !1
          );
        var c = this.container_right.getChildByName('btn_copy');

        c.on('mouseover', this, () => {
          i.mousein_copy = !0;
        });

        c.on('mouseout', this, () => {
          i.mousein_copy = !1;
        });

        c.clickHandler = Laya.Handler.create(
            this,
            () => {
              GameMgr.Inst.BehavioralStatistics(12);
              i.popout.visible = !0;
              i.popout.visible ||
                (t.UIBase.anim_pop_out(i.popout, null));
            },
            null,
            !1
          );

        this.container_rules = this.container_right.getChildByName(
            'container_rules'
          );

        this.container_rules.visible = !0;
        this.popout = this.me.getChildByName('pop');

        this.room_link = this.popout
            .getChildByName('input')
            .getChildByName('txtinput');

        this.room_link.editable = !1;
        this.btn_copy_link = this.popout.getChildByName('btn_copy');
        this.btn_copy_link.visible = !1;
        this.btn_copy_link.visible = !0;
        this.btn_copy_link.visible = !0;

        GameMgr.inConch
          ? (this.btn_copy_link.clickHandler = Laya.Handler.create(
              this,
              () => {
                Laya.PlatformClass.createClass(
                  'layaair.majsoul.mjmgr'
                ).call('setSysClipboardText', i.room_link.text);

                t.UIBase.anim_pop_hide(
                  i.popout,
                  Laya.Handler.create(i, () => {
                    i.popout.visible = !1;
                  })
                );

                t.UI_FlyTips.ShowTips(game.Tools.strOfLocalization(2125));
              },
              null,
              !1
            ))
          : GameMgr.iniOSWebview &&
            ((this.btn_copy_link.clickHandler = Laya.Handler.create(
              this,
              () => {
                Laya.Browser.window.wkbridge.callNative(
                  'copy2clip',
                  i.room_link.text,
                  () => {}
                );

                t.UIBase.anim_pop_hide(
                  i.popout,
                  Laya.Handler.create(i, () => {
                    i.popout.visible = !1;
                  })
                );

                t.UI_FlyTips.ShowTips(game.Tools.strOfLocalization(2125));
              },
              null,
              !1
            )));

        this.popout.visible = !1;

        this.popout.getChildByName(
            'btn_cancel'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UIBase.anim_pop_hide(
                i.popout,
                Laya.Handler.create(i, () => {
                  i.popout.visible = !1;
                })
              );
            },
            null,
            !1
          );

        this.invitefriend = new e(
            this.me.getChildByName('invite_friend')
          );
      }

      show() {
        var e = this;
        game.Scene_Lobby.Inst.change_bg('indoor', !1);
        this.mousein_copy = !1;
        this.beReady = !1;
        this.invitefriend.me.visible = !1;
        this.btn_add_robot.visible = !1;
        this.btn_invite_friend.visible = !1;
        this.pre_choose = null;
        for (h = 0; h < 4; h++)
          this.player_cells[h].container.visible = h < this.max_player_count;
        for (h = 0; h < this.max_player_count; h++) this._clearCell(h);
        this.players[h].cell_index = h;
        for (h = 0; h < this.players.length; h++)
          this._refreshPlayerInfo(this.players[h]);
        this.btn_ok.skin = game.Tools.localUISrc(this.skin_start);
        this.btn_ok.skin = game.Tools.localUISrc(this.skin_ready);

        this.owner_id == GameMgr.Inst.account_id
          ? (this.refreshAsOwner())
          : (game.Tools.setGrayDisable(this.btn_ok, !1));

        'en' == GameMgr.client_language
          ? (this.label_rommid.text = `#${this.room_id.toString()}`)
          : (this.label_rommid.text = this.room_id.toString());

        this.container_rules.visible = !0;
        for (h = 0; h < this.container_rules.numChildren; h++)
          this.container_rules.getChildAt(h).visible = !1;
        var i = [];
        i.push(game.Tools.room_mode_desc(this.room_mode.mode));
        var n = this.room_mode.detail_rule;
        if (n) {
          var a = 5,
            r = 20;
          null != n.time_fixed && (a = n.time_fixed);
          null != n.time_add && (r = n.time_add);

          i.push(
            `${a.toString()}+${r.toString()}${game.Tools.strOfLocalization(2019)}`
          );

          if (
            (0 != this.tournament_id)
          ) {
            var s = cfg.tournament.tournaments.get(this.tournament_id);
            s && i.push(s.name);
          }

          null != n.init_point &&
              i.push(game.Tools.strOfLocalization(2199) + n.init_point);

          null != n.fandian &&
            i.push(`${game.Tools.strOfLocalization(2094)}:${n.fandian}`);

          if (
            (null != n.dora_count)
          )
            switch (n.dora_count) {
              case 0:
                i.push(game.Tools.strOfLocalization(2044));
                break;
              case 2:
                i.push(game.Tools.strOfLocalization(2047));
                break;
              case 3:
                i.push(game.Tools.strOfLocalization(2045));
                break;
              case 4:
                i.push(game.Tools.strOfLocalization(2046));
            }

          null != n.shiduan &&
            1 != n.shiduan &&
            i.push(game.Tools.strOfLocalization(2137));

          2 === n.fanfu && i.push(game.Tools.strOfLocalization(2763));
          4 === n.fanfu && i.push(game.Tools.strOfLocalization(2764));

          null != n.bianjietishi &&
            1 != n.bianjietishi &&
            i.push(game.Tools.strOfLocalization(2200));

          this.room_mode.mode >= 10 &&
            this.room_mode.mode <= 14 &&
            (null != n.have_zimosun && 1 != n.have_zimosun
              ? i.push(game.Tools.strOfLocalization(2202))
              : i.push(game.Tools.strOfLocalization(2203)));
        }
        this.public_live && i.push(game.Tools.strOfLocalization(2220));
        for (h = 0; h < i.length; h++) {
          var o = this.container_rules.getChildAt(h);
          o.visible = !0;
          o.x = 6;
          o.y = 334 - 68 * (i.length - 1 - h);
          var l = o.getChildAt(0);
          l.fontSize = 40;

          i[h].length <= 5
            ? (l.fontSize = 40)
            : i[h].length <= 9
            ? (l.fontSize = 52.5 - 2.5 * i[h].length)
            : (l.fontSize = 30);

          l.text = i[h];
        }
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200);
        for (var h = 0; h < this.player_cells.length; h++)
          t.UIBase.anim_alpha_in(
            this.player_cells[h].container,
            { x: 80 },
            150,
            150 + 50 * h,
            null,
            Laya.Ease.backOut
          );
        t.UIBase.anim_alpha_in(this.btn_ok, {}, 100, 600);
        t.UIBase.anim_alpha_in(this.container_right, { x: 20 }, 100, 500);
        Laya.timer.once(600, this, () => {
          e.locking = !1;
        });
        var c = game.Tools.room_mode_desc(this.room_mode.mode);

        this.room_link.text = game.Tools.strOfLocalization(2221, [
          this.room_id.toString()
        ]);

        '' != c && (this.room_link.text += `(${c})`);
        this.room_link.text +=
            `: ${GameMgr.Inst.link_url}?room=${this.room_id}`;
      }

      leaveRoom() {
        var e = this;
        this.locking ||
          app.NetAgent.sendReq2Lobby('Lobby', 'leaveRoom', {}, (i, n) => {
            i || n.error
              ? t.UIMgr.Inst.showNetReqError('leaveRoom', i, n)
              : e.hide(
                  Laya.Handler.create(e, () => {
                    t.UI_Lobby.Inst.enable = !0;
                  })
                );
          });
      }

      tryToClose(e) {
        var i = this;
        app.NetAgent.sendReq2Lobby('Lobby', 'leaveRoom', {}, (n, a) => {
          t.UIMgr.Inst.showNetReqError('leaveRoom', n, a);
          i.enable = !1;
          n || a.error
            ? (e.runWith(!1))
            : (e.runWith(!0));
        });
      }

      hide(e) {
        var i = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150);
        for (var n = 0; n < this.player_cells.length; n++)
          t.UIBase.anim_alpha_out(
            this.player_cells[n].container,
            { x: 80 },
            150,
            0,
            null
          );
        t.UIBase.anim_alpha_out(this.btn_ok, {}, 150);
        t.UIBase.anim_alpha_out(this.container_right, { x: 20 }, 150);

        Laya.timer.once(200, this, () => {
          i.locking = !1;
          i.enable = !1;
          e && e.run();
        });

        document.getElementById('layaCanvas').onclick = null;
      }

      onDisbale() {
        Laya.timer.clearAll(this);
        for (var t = 0; t < this.player_cells.length; t++)
          Laya.loader.clearTextureRes(this.player_cells[t].illust.skin);
        document.getElementById('layaCanvas').onclick = null;
      }

      switchReady() {
        this.beReady = !this.beReady;

        this.btn_ok.skin = game.Tools.localUISrc(
            this.beReady ? this.skin_cancel : this.skin_ready
          );

        this.owner_id != GameMgr.Inst.account_id &&
          (app.NetAgent.sendReq2Lobby(
          'Lobby',
          'readyPlay',
          { ready: this.beReady },
          (t, e) => {}
        ));
      }

      getStart() {
        this.last_start_room = Laya.timer.currTimer;
        this.owner_id == GameMgr.Inst.account_id &&
          (Laya.timer.currTimer < this.last_start_room + 2e3 ||
            (app.NetAgent.sendReq2Lobby('Lobby', 'startRoom', {}, (e, i) => {
          (e || i.error) &&
            t.UIMgr.Inst.showNetReqError('startRoom', e, i);
        })));
      }

      kickPlayer(e) {
        if (this.owner_id == GameMgr.Inst.account_id) {
          var i = this.players[e];
          this.pre_choose = i;
          1 == i.category
            ? app.NetAgent.sendReq2Lobby(
                'Lobby',
                'kickPlayer',
                { account_id: this.players[e].account_id },
                (t, e) => {}
              )
            : 2 == i.category &&
              (app.NetAgent.sendReq2Lobby(
            'Lobby',
            'modifyRoom',
            { robot_count: this.robot_count - 1 },
            (e, i) => {
              (e || i.error) &&
                t.UIMgr.Inst.showNetReqError('modifyRoom_minus', e, i);
            }
          ));
        }
      }

      _clearCell(t) {
        if (!(t < 0 || t >= this.player_cells.length)) {
          var e = this.player_cells[t];
          e.container_flag.visible = !1;
          e.container_illust.visible = !1;
          e.name.visible = !1;
          e.container_name.visible = !1;
          e.btn_t.visible = !1;
          e.host.visible = !1;
        }
      }

      _refreshPlayerInfo(t) {
        var e = t.cell_index;
        if (!(e < 0 || e >= this.player_cells.length)) {
          var i = this.player_cells[e];
          i.container_illust.visible = !0;
          i.container_name.visible = !0;
          i.name.visible = !0;
          i.name.text = t.nickname;

          i.btn_t.visible =
              this.owner_id == GameMgr.Inst.account_id &&
              t.account_id != GameMgr.Inst.account_id;

          i.container_flag.visible = !0;

          this.owner_id == t.account_id &&
            ((i.host.visible = !0));

          i.illust.setSkin(t.avatar_id, 'waitingroom');

          i.title.id = game.Tools.titleLocalization(
              t.account_id,
              t.title
            );

          i.rank.id = t[this.room_mode.mode < 10 ? 'level' : 'level3'].id;
          this._onPlayerReadyChange(t);
        }
      }

      _onPlayerReadyChange({cell_index, account_id, ready}) {
        var e = cell_index;
        if (!(e < 0 || e >= this.player_cells.length)) {
          var i = this.player_cells[e];

          this.owner_id == account_id
            ? (i.container_flag.visible = !0)
            : (i.container_flag.visible = ready);

          this.refreshStart();
        }
      }

      refreshAsOwner() {
        if (this.owner_id == GameMgr.Inst.account_id) {
          this._refreshPlayerInfo(this.players[e]);
          for (var t = 0, e = 0; e < this.players.length; e++)
            0 != this.players[e].category &&
              (t++);
          this.btn_add_robot.visible = !0;
          this.btn_invite_friend.visible = !0;

          game.Tools.setGrayDisable(
            this.btn_add_robot,
            t == this.max_player_count
          );

          this.refreshStart();
        }
      }

      refreshStart() {
        if (this.owner_id == GameMgr.Inst.account_id) {
          this.btn_ok.skin = game.Tools.localUISrc(this.skin_start);
          for (var t = 0, e = 0; e < this.players.length; e++)
            if (
              0 != this.players[e].category &&
              (!this.players[e] ||
                this.players[e].account_id != this.owner_id)
            ) {
              if (
                !this.players[e] ||
                null == this.players[e].ready ||
                void 0 == this.players[e].ready ||
                !this.players[e].ready
              )
                return void game.Tools.setGrayDisable(this.btn_ok, !0);
              t++;
            }
          game.Tools.setGrayDisable(
            this.btn_ok,
            t + 1 != this.max_player_count
          );
        }
      }

      onGameStart({connect_token, game_uuid, location}) {
        game.Tools.setGrayDisable(this.btn_ok, !0);
        this.enable = !1;
        game.MJNetMgr.Inst.OpenConnect(
          connect_token,
          game_uuid,
          location,
          !1,
          null
        );
      }
    }

    __extends(n, i);

    n.Inst = null;
    return n;
  })(t.UIBase);

  t.UI_WaitingRoom = i;
})(uiscript || (uiscript = {}));