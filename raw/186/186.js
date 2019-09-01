var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.obUI()) || this;
      return (
        (t.modes = []),
        (t.mode_index = 0),
        (t.mode0_list = []),
        (t.mode1_list = []),
        (t.live_datas = []),
        (t.live_show_datas = []),
        (t.fetch_id = 0),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.container_top = this.me.getChildByName('top')),
          (this.container_top.getChildByName(
            'btn_back'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e._locking ||
                e.hide(
                  Laya.Handler.create(e, function() {
                    t.UIMgr.Inst.showLobby();
                  })
                );
            },
            null,
            false
          )),
          (this.root = this.me.getChildByName('root')),
          (this.scrollview = this.root.getChildByName('scrollview').scriptMap[
            'capsui.CScrollView'
          ]),
          (this.dropdown0 = this.root.getChildByName('dropdown0').scriptMap[
            'capsui.CDropdown'
          ]),
          (this.dropdown1 = this.root.getChildByName('dropdown1').scriptMap[
            'capsui.CDropdown'
          ]),
          (this.root.getChildByName(
            'btn_dropdown0'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e._locking || e.dropdown0.locking || e.dropdown0.down();
            },
            null,
            false
          )),
          (this.root.getChildByName(
            'btn_dropdown1'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e._locking || e.dropdown1.locking || e.dropdown1.down();
            },
            null,
            false
          )),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_scrollview, null, false)
          ),
          this.dropdown0.init(
            Laya.Handler.create(this, this.render_dropdown0, null, false),
            Laya.Handler.create(this, this.onDropdown0Change, null, false)
          ),
          this.dropdown1.init(
            Laya.Handler.create(this, this.render_dropdown1, null, false),
            Laya.Handler.create(this, this.onDropdown1Change, null, false)
          ),
          (this.modes = []),
          (this.mode_index = 0),
          cfg.game_live.select_filters.forEach(function(t) {
            if (1 == t.open) {
              1 == t.initial && (e.mode_index = e.modes.length);
              var i = cfg.desktop.matchmode.get(t.mode_id);
              e.modes.push({
                id: t.id,
                name0: t['name1_' + GameMgr.client_language],
                name1: t['name2_' + GameMgr.client_language],
                sima: !i || i.mode < 10
              });
            }
          }),
          (this.btn_fresh = this.root.getChildByName('btn_refresh')),
          (this.btn_fresh.clickHandler = Laya.Handler.create(
            this,
            function() {
              e._locking ||
                (game.Tools.setGrayDisable(e.btn_fresh, true),
                e.refresh_content(),
                Laya.timer.once(2e3, e, function() {
                  game.Tools.setGrayDisable(e.btn_fresh, false);
                }));
            },
            null,
            false
          )),
          (this.check_friend = this.root
            .getChildByName('check_friend')
            .getChildByName('checkbox')),
          (this.check_friend.visible = false),
          (this.root.getChildByName(
            'check_friend'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e._locking ||
                ((e.check_friend.visible = !e.check_friend.visible),
                e.onShowDataChange());
            },
            null,
            false
          )),
          (this.noinfo = this.root.getChildByName('noinfo')),
          (this.noinfo.visible = false);
      }),
      (i.prototype.show = function() {
        var e = this;
        game.Scene_Lobby.Inst.change_bg('indoor', false),
          (this._locking = true),
          (this.enable = true),
          game.Tools.setGrayDisable(this.btn_fresh, false),
          t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
          t.UIBase.anim_alpha_in(this.root, { y: 30 }, 150, 0),
          Laya.timer.once(150, this, function() {
            e._locking = false;
          }),
          -1 == this.mode_index && (this.mode_index = 0);
        var i = this.modes[this.mode_index].name0,
          n = this.modes[this.mode_index].name1;
        (this.mode0_list = []), (this.mode1_list = []);
        for (var a = 0, r = 0, s = 0; s < this.modes.length; s++) {
          for (var o = false, l = 0; l < this.mode0_list.length; l++)
            if (this.mode0_list[l] == this.modes[s].name0) {
              o = true;
              break;
            }
          o ||
            (this.modes[s].name0 == i && (a = this.mode0_list.length),
            this.mode0_list.push(this.modes[s].name0)),
            this.modes[s].name0 == i &&
              (this.modes[s].name1 == n && (r = this.mode1_list.length),
              this.mode1_list.push(this.modes[s].name1));
        }
        this.dropdown0.reset_show(a, this.mode0_list.length),
          this.dropdown1.reset_show(r, this.mode1_list.length),
          this.refresh_content();
      }),
      (i.prototype.hide = function(e) {
        var i = this;
        (this._locking = true),
          t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
          t.UIBase.anim_alpha_out(this.root, { y: 30 }, 150, 0),
          Laya.timer.clearAll(this),
          Laya.timer.once(150, this, function() {
            (i._locking = false), (i.enable = false), e && e.run();
          });
      }),
      (i.prototype.onDisable = function() {
        Laya.timer.clearAll(this);
      }),
      (i.prototype.render_dropdown0 = function(t) {
        var e = t.index;
        t.container.getChildAt(0).text = this.mode0_list[e];
      }),
      (i.prototype.onDropdown0Change = function(t) {
        for (
          var e = [],
            i = this.mode0_list[t],
            n = this.mode1_list[this.dropdown1.choosed_index],
            a = 0;
          a < this.modes.length;
          a++
        )
          this.modes[a].name0 == i && e.push(this.modes[a].name1);
        this.mode1_list = e;
        for (var r = -1, a = 0; a < e.length; a++)
          if (e[a] == n) {
            r = a;
            break;
          }
        -1 == r && (r = 0),
          this.dropdown1.reset_show(r, this.mode1_list.length),
          this.refresh_content();
      }),
      (i.prototype.render_dropdown1 = function(t) {
        var e = t.index;
        t.container.getChildAt(0).text = this.mode1_list[e];
      }),
      (i.prototype.onDropdown1Change = function(t) {
        this.refresh_content();
      }),
      (i.prototype.render_scrollview = function(e) {
        var i = this,
          n = e.index,
          a = e.container,
          r = e.cache_data,
          s = this.live_show_datas[n];
        a.getChildByName('mode').text =
          this.modes[this.mode_index].name0 +
          '·' +
          this.modes[this.mode_index].name1;
        var o = new Date(1e3 * s.start_time),
          l = o.getHours() + ':';
        o.getMinutes() < 10 && (l += '0'),
          (l += o.getMinutes().toString()),
          (a.getChildByName('time').text = l);
        for (
          var h = this.modes[this.mode_index].sima, c = h ? 4 : 3, u = 0;
          u < 4;
          u++
        ) {
          var _ = 'p' + u,
            d = a.getChildByName(_);
          if (!r[_]) {
            var f = {};
            (f.level = new t.UI_Level(d.getChildByName('rank'))),
              (f.title = new t.UI_PlayerTitle(d.getChildByName('title'))),
              (f.name = d.getChildByName('name')),
              (r[_] = f);
          }
          if (u >= c) d.visible = false;
          else if (((d.visible = true), u < s.players.length)) {
            var p = s.players[u];
            (r[_].level.id = p[h ? 'level' : 'level3'].id),
              (r[_].title.id = game.Tools.titleLocalization(
                p.account_id,
                p.title
              )),
              (r[_].name.text = p.nickname);
          } else
            (r[_].level.id = h ? 10101 : 20101),
              (r[_].title.id = 0),
              (r[_].name.text = game.Tools.strOfLocalization(2133));
        }
        a.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          function() {
            i._locking ||
              (t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : t.UI_Live_Broadcast.fetchInfo(
                    s.uuid,
                    Laya.Handler.create(i, function(e) {
                      e.success &&
                        t.UI_Live_Broadcast.goToWatch(
                          s.uuid,
                          e.data,
                          s.players[0].account_id
                        );
                    })
                  ));
          },
          null,
          false
        );
      }),
      (i.prototype.onShowDataChange = function() {
        this.scrollview.reset(), (this.live_show_datas = []);
        for (var t = 0; t < this.live_datas.length; t++)
          if (this.check_friend.visible) {
            for (var e = false, i = 0; i < 4; i++)
              if (!(i >= this.live_datas[t].players.length)) {
                var n = this.live_datas[t].players[i].account_id;
                if (game.FriendMgr.find(n)) {
                  e = true;
                  break;
                }
              }
            e && this.live_show_datas.push(this.live_datas[t]);
          } else this.live_show_datas.push(this.live_datas[t]);
        0 == this.live_show_datas.length
          ? (this.noinfo.visible = true)
          : ((this.noinfo.visible = false),
            this.scrollview.addItem(this.live_show_datas.length));
      }),
      (i.prototype.refresh_content = function() {
        var e = this;
        this.scrollview.reset(), (this.live_datas = []), (this.mode_index = 0);
        for (
          var i = this.mode0_list[this.dropdown0.choosed_index],
            n = this.mode1_list[this.dropdown1.choosed_index],
            a = 0;
          a < this.modes.length;
          a++
        )
          this.modes[a].name0 == i &&
            this.modes[a].name1 == n &&
            (this.mode_index = a);
        var r = 1e5 * Math.random();
        (this.fetch_id = r),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchGameLiveList',
            { filter_id: this.modes[this.mode_index].id },
            function(i, n) {
              if (i || n.error)
                t.UIMgr.Inst.showNetReqError('fetchGameLiveList', i, n);
              else {
                if (e.fetch_id != r) return;
                e.live_datas = [];
                for (var a = 0; a < n.live_list.length; a++)
                  e.live_datas.push(n.live_list[a]);
                e.onShowDataChange();
              }
            }
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Ob = e;
})(uiscript || (uiscript = {}));