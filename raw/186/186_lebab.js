const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.obUI()) || this;
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
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.container_top = this.me.getChildByName('top')),
        (this.container_top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e._locking ||
              e.hide(
                Laya.Handler.create(e, () => {
                  t.UIMgr.Inst.showLobby();
                })
              );
          },
          null,
          !1
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
          () => {
            e._locking || e.dropdown0.locking || e.dropdown0.down();
          },
          null,
          !1
        )),
        (this.root.getChildByName(
          'btn_dropdown1'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e._locking || e.dropdown1.locking || e.dropdown1.down();
          },
          null,
          !1
        )),
        this.scrollview.init_scrollview(
          Laya.Handler.create(this, this.render_scrollview, null, !1)
        ),
        this.dropdown0.init(
          Laya.Handler.create(this, this.render_dropdown0, null, !1),
          Laya.Handler.create(this, this.onDropdown0Change, null, !1)
        ),
        this.dropdown1.init(
          Laya.Handler.create(this, this.render_dropdown1, null, !1),
          Laya.Handler.create(this, this.onDropdown1Change, null, !1)
        ),
        (this.modes = []),
        (this.mode_index = 0),
        cfg.game_live.select_filters.forEach(t => {
          if (1 == t.open) {
            1 == t.initial && (e.mode_index = e.modes.length);
            const i = cfg.desktop.matchmode.get(t.mode_id);
            e.modes.push({
              id: t.id,
              name0: t[`name1_${GameMgr.client_language}`],
              name1: t[`name2_${GameMgr.client_language}`],
              sima: !i || i.mode < 10
            });
          }
        }),
        (this.btn_fresh = this.root.getChildByName('btn_refresh')),
        (this.btn_fresh.clickHandler = Laya.Handler.create(
          this,
          () => {
            e._locking ||
              (game.Tools.setGrayDisable(e.btn_fresh, !0),
              e.refresh_content(),
              Laya.timer.once(2e3, e, () => {
                game.Tools.setGrayDisable(e.btn_fresh, !1);
              }));
          },
          null,
          !1
        )),
        (this.check_friend = this.root
          .getChildByName('check_friend')
          .getChildByName('checkbox')),
        (this.check_friend.visible = !1),
        (this.root.getChildByName(
          'check_friend'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e._locking ||
              ((e.check_friend.visible = !e.check_friend.visible),
              e.onShowDataChange());
          },
          null,
          !1
        )),
        (this.noinfo = this.root.getChildByName('noinfo')),
        (this.noinfo.visible = !1);
    }),
    (i.prototype.show = function() {
      const e = this;
      game.Scene_Lobby.Inst.change_bg('indoor', !1),
        (this._locking = !0),
        (this.enable = !0),
        game.Tools.setGrayDisable(this.btn_fresh, !1),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_in(this.root, { y: 30 }, 150, 0),
        Laya.timer.once(150, this, () => {
          e._locking = !1;
        }),
        -1 == this.mode_index && (this.mode_index = 0);
      const i = this.modes[this.mode_index].name0;
      const n = this.modes[this.mode_index].name1;
      (this.mode0_list = []), (this.mode1_list = []);
      for (var a = 0, r = 0, s = 0; s < this.modes.length; s++) {
        for (var o = !1, l = 0; l < this.mode0_list.length; l++)
          if (this.mode0_list[l] == this.modes[s].name0) {
            o = !0;
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
      const i = this;
      (this._locking = !0),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_out(this.root, { y: 30 }, 150, 0),
        Laya.timer.clearAll(this),
        Laya.timer.once(150, this, () => {
          (i._locking = !1), (i.enable = !1), e && e.run();
        });
    }),
    (i.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (i.prototype.render_dropdown0 = function({index, container}) {
      const e = index;
      container.getChildAt(0).text = this.mode0_list[e];
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
    (i.prototype.render_dropdown1 = function({index, container}) {
      const e = index;
      container.getChildAt(0).text = this.mode1_list[e];
    }),
    (i.prototype.onDropdown1Change = function(t) {
      this.refresh_content();
    }),
    (i.prototype.render_scrollview = function({index, container, cache_data}) {
      const i = this;
      const n = index;
      const a = container;
      const r = cache_data;
      const s = this.live_show_datas[n];
      a.getChildByName('mode').text =
        `${this.modes[this.mode_index].name0}·${this.modes[this.mode_index].name1}`;
      const o = new Date(1e3 * s.start_time);
      let l = `${o.getHours()}:`;
      o.getMinutes() < 10 && (l += '0'),
        (l += o.getMinutes().toString()),
        (a.getChildByName('time').text = l);
      for (
        let h = this.modes[this.mode_index].sima, c = h ? 4 : 3, u = 0;
        u < 4;
        u++
      ) {
        const _ = `p${u}`;
        const d = a.getChildByName(_);
        if (!r[_]) {
          const f = {};
          (f.level = new t.UI_Level(d.getChildByName('rank'))),
            (f.title = new t.UI_PlayerTitle(d.getChildByName('title'))),
            (f.name = d.getChildByName('name')),
            (r[_] = f);
        }
        if (u >= c) d.visible = !1;
        else if (((d.visible = !0), u < s.players.length)) {
          const p = s.players[u];
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
        () => {
          i._locking ||
            (t.UI_PiPeiYuYue.Inst.enable
              ? t.UI_Popout.PopOutNoTitle(
                  game.Tools.strOfLocalization(204),
                  null
                )
              : t.UI_Live_Broadcast.fetchInfo(
                  s.uuid,
                  Laya.Handler.create(i, ({success, data}) => {
                    success &&
                      t.UI_Live_Broadcast.goToWatch(
                        s.uuid,
                        data,
                        s.players[0].account_id
                      );
                  })
                ));
        },
        null,
        !1
      );
    }),
    (i.prototype.onShowDataChange = function() {
      this.scrollview.reset(), (this.live_show_datas = []);
      for (let t = 0; t < this.live_datas.length; t++)
        if (this.check_friend.visible) {
          for (var e = !1, i = 0; i < 4; i++)
            if (!(i >= this.live_datas[t].players.length)) {
              const n = this.live_datas[t].players[i].account_id;
              if (game.FriendMgr.find(n)) {
                e = !0;
                break;
              }
            }
          e && this.live_show_datas.push(this.live_datas[t]);
        } else this.live_show_datas.push(this.live_datas[t]);
      0 == this.live_show_datas.length
        ? (this.noinfo.visible = !0)
        : ((this.noinfo.visible = !1),
          this.scrollview.addItem(this.live_show_datas.length));
    }),
    (i.prototype.refresh_content = function() {
      const e = this;
      this.scrollview.reset(), (this.live_datas = []), (this.mode_index = 0);
      for (
        let i = this.mode0_list[this.dropdown0.choosed_index], n = this.mode1_list[this.dropdown1.choosed_index], a = 0;
        a < this.modes.length;
        a++
      )
        this.modes[a].name0 == i &&
          this.modes[a].name1 == n &&
          (this.mode_index = a);
      const r = 1e5 * Math.random();
      (this.fetch_id = r),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchGameLiveList',
          { filter_id: this.modes[this.mode_index].id },
          (i, n) => {
            if (i || n.error)
              t.UIMgr.Inst.showNetReqError('fetchGameLiveList', i, n);
            else {
              if (e.fetch_id != r) return;
              e.live_datas = [];
              for (let a = 0; a < n.live_list.length; a++)
                e.live_datas.push(n.live_list[a]);
              e.onShowDataChange();
            }
          }
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Ob = e;
})(uiscript || (uiscript = {}));