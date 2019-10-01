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
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.rankUI()) || this;
      return (
        (t.root = null),
        (t.title = null),
        (t.tabs = []),
        (t.nolimitlist = null),
        (t.locking = !1),
        (t.usedskin = []),
        (t.container_self = null),
        (t.self_head = null),
        (t.self_level = null),
        (t.self_title = null),
        (t.self_name = null),
        (t.tab_index = 0),
        (t.datas = []),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.nolimitlist = this.root.getChildByName('content').scriptMap[
            'capsui.NoLimitList'
          ]),
          this.nolimitlist.init_nolimitlist(
            Laya.Handler.create(this, this._loadInfo, null, !1),
            Laya.Handler.create(
              this,
              function(t) {
                e.setItemValue(t.index, t.container, t.cache_data);
              },
              null,
              !1
            )
          ),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close(null);
            },
            null,
            !1
          )),
          (this.container_self = this.root.getChildByName('self')),
          (this.self_head = new t.UI_Head(
            this.container_self.getChildByName('self').getChildByName('head')
          )),
          (this.self_level = new t.UI_Level(
            this.container_self.getChildByName('self').getChildByName('rank')
          )),
          (this.self_title = new t.UI_PlayerTitle(
            this.container_self.getChildByName('self').getChildByName('title')
          )),
          (this.self_name = this.container_self
            .getChildByName('self')
            .getChildByName('name')),
          (this.container_self.visible = !1),
          this.datas.push({
            items: [],
            self_rank: 0,
            fetch_time: -1e8,
            version: 0
          }),
          this.datas.push({
            items: [],
            self_rank: 0,
            fetch_time: -1e8,
            version: 0
          });
        for (
          var i = function(t) {
              var i = n.root.getChildByName('tabs').getChildAt(t);
              (i.clickHandler = new Laya.Handler(n, function() {
                e.locking || (e.tab_index != t && e.change_tab(t));
              })),
                n.tabs.push({ btn: i, label: i.getChildAt(0) });
            },
            n = this,
            a = 0;
          a < 2;
          a++
        )
          i(a);
        this.title = this.root.getChildByName('title');
      }),
      (i.prototype.setItemValue = function(e, i, n) {
        var a = this;
        if (this.enable) {
          var r = i.getChildByName('rank_img'),
            s = i.getChildByName('rankno');
          e < 3
            ? ((s.visible = !1),
              (r.visible = !0),
              (r.skin = game.Tools.localUISrc(
                'myres/lobby/rank_' + (e + 1).toString() + '.png'
              )))
            : ((s.visible = !0),
              (r.visible = !1),
              (s.text = (e + 1).toString()));
          var o = this.datas[this.tab_index].items[e].detail;
          n.hasOwnProperty('head') ||
            (n.head = new t.UI_Head(i.getChildByName('head'))),
            (n.head.id = o.avatar_id),
            (n.head.head_frame = o.avatar_frame),
            this._addusedskin(n.head.img_head.skin),
            n.hasOwnProperty('rank') ||
              (n.level = new t.UI_Level(i.getChildByName('rank'))),
            (n.level.id = o[0 == this.tab_index ? 'level' : 'level3'].id),
            this._addusedskin(n.level.icon.skin),
            n.hasOwnProperty('title') ||
              (n.title = new t.UI_PlayerTitle(i.getChildByName('title'))),
            (n.title.id = game.Tools.titleLocalization(o.account_id, o.title)),
            this._addusedskin(n.title.img.skin);
          var l = i.getChildByName('rankscore');
          (l.text = o[
            0 == this.tab_index ? 'level' : 'level3'
          ].score.toString()),
            (i.getChildByName('pt').x =
              l.x + l.scaleX * l.textField.textWidth + 10),
            (i.getChildByName('name').text = o.nickname),
            (i.getChildByName('btn_see').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_OtherPlayerInfo.Inst.show(o.account_id, a.tab_index + 1);
              },
              null,
              !1
            ));
        }
      }),
      (i.prototype.show = function() {
        var e = this;
        this.nolimitlist.reset(),
          (this.enable = !0),
          (this.locking = !0),
          (this.usedskin = []),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              e.locking = !1;
            })
          ),
          this.change_tab(0);
      }),
      (i.prototype.close = function(e) {
        var i = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (i.locking = !1), (i.enable = !1), e && e.run();
            })
          );
      }),
      (i.prototype.onDisable = function() {
        for (var t = 0; t < this.usedskin.length; t++)
          Laya.loader.clearTextureRes(this.usedskin[t]);
        this.usedskin = [];
      }),
      (i.prototype.change_tab = function(e) {
        var i = this;
        (this.tab_index = e),
          (this.title.text = game.Tools.strOfLocalization(
            0 == this.tab_index ? 2796 : 2795
          )),
          this.nolimitlist.reset(),
          (this.container_self.visible = !1);
        for (var n = 0; n < this.tabs.length; n++)
          (this.tabs[n].btn.mouseEnabled = e != n),
            (this.tabs[n].btn.skin = game.Tools.localUISrc(
              e == n
                ? 'myres/bothui/info_tabheng_chosen.png'
                : 'myres/bothui/info_tabheng_dark.png'
            )),
            (this.tabs[n].label.color = e == n ? '#d9b263' : '#8cb65f');
        Laya.timer.currTimer > this.datas[e].fetch_time + 5e3
          ? ((this.datas[e].fetch_time = Laya.timer.currTimer),
            (this.datas[e].items = []),
            this.datas[e].version++,
            (this.datas[e].during_load = !1),
            (this.datas[e].load_index = 0),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchLevelLeaderboard',
              { type: e + 1 },
              function(n, a) {
                if (n || a.error)
                  t.UIMgr.Inst.showNetReqError('fetchLevelLeaderboard', n, a);
                else {
                  for (var r = a.items.length, s = 0; s < r; s++)
                    i.datas[e].items.push(a.items[s]);
                  (i.datas[e].self_rank = a.self_rank),
                    i.tab_index == e &&
                      ((i.nolimitlist.total_count = i.datas[e].items.length),
                      i.setMeRank(),
                      (i.container_self.visible = !0));
                }
              }
            ))
          : ((this.nolimitlist.total_count = this.datas[e].items.length),
            this.setMeRank(),
            (this.container_self.visible = !0));
      }),
      (i.prototype._loadInfo = function(e) {
        var i = this;
        if (e >= this.datas[this.tab_index].items.length)
          this.nolimitlist.loadOver(!1, 0);
        else {
          var n = this.datas[this.tab_index];
          if (!n.during_load) {
            var a = [],
              r = n.load_index,
              s = e + 20;
            if ((s > n.items.length && (s = n.items.length), s <= r))
              this.nolimitlist.loadOver(!0, s - e);
            else {
              for (var o = r; o < s; o++)
                o >= n.load_index && a.push(n.items[o].account_id);
              var l = n.version;
              (n.during_load = !0),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'fetchMultiAccountBrief',
                  { account_id_list: a },
                  function(e, a) {
                    if (e || a.error)
                      t.UIMgr.Inst.showNetReqError(
                        'fetchMultiAccountBrief',
                        e,
                        a
                      ),
                        i.nolimitlist.loadOver(!1, 0);
                    else {
                      if (n.version != l) return;
                      n.during_load = !1;
                      for (
                        var s = -1, o = a.players.length, h = 0;
                        h < o;
                        h++
                      ) {
                        if (
                          n.items[r + h].account_id != a.players[h].account_id
                        ) {
                          s = h;
                          break;
                        }
                        n.items[r + h].detail = a.players[h];
                      }
                      -1 != s
                        ? (t.UIMgr.Inst.ShowErrorInfo(
                            game.Tools.strOfLocalization(2074, [
                              (s + 1).toString()
                            ])
                          ),
                          i.nolimitlist.loadOver(!1, 0))
                        : ((n.load_index += o), i.nolimitlist.loadOver(!0, o));
                    }
                  }
                );
            }
          }
        }
      }),
      (i.prototype._addusedskin = function(t) {
        for (var e = !1, i = 0; i < this.usedskin.length; i++)
          if (t == this.usedskin[i]) {
            e = !0;
            break;
          }
        e || this.usedskin.push(t);
      }),
      (i.prototype.setMeRank = function() {
        if (this.enable) {
          this.container_self.visible = !0;
          var t = this.container_self
              .getChildByName('self')
              .getChildByName('rank_img'),
            e = this.container_self
              .getChildByName('self')
              .getChildByName('rankno'),
            i = this.datas[this.tab_index].self_rank;
          i <= 0
            ? ((e.visible = !1), (t.visible = !1))
            : i <= 3
            ? ((e.visible = !1),
              (t.visible = !0),
              (t.skin = game.Tools.localUISrc(
                'myres/lobby/rank_' + i.toString() + '.png'
              )))
            : i <= 999
            ? ((e.visible = !0),
              (t.visible = !1),
              (e.text = i.toString()),
              (e.fontSize = 60))
            : ((e.visible = !0),
              (t.visible = !1),
              (e.text = '999+'),
              (e.fontSize = 45)),
            (this.self_head.id = GameMgr.Inst.account_data.avatar_id),
            (this.self_head.head_frame =
              GameMgr.Inst.account_data.avatar_frame),
            (this.self_level.id =
              GameMgr.Inst.account_data[
                0 == this.tab_index ? 'level' : 'level3'
              ].id),
            (this.self_title.id = GameMgr.Inst.account_data.title),
            (this.self_name.text = GameMgr.Inst.account_data.nickname);
          var n = this.container_self
            .getChildByName('self')
            .getChildByName('rankscore');
          (n.text = GameMgr.Inst.account_data[
            0 == this.tab_index ? 'level' : 'level3'
          ].score.toString()),
            (this.container_self.getChildByName('self').getChildByName('pt').x =
              n.x + n.scaleX * n.textField.textWidth + 10);
        }
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_Rank = e;
})(uiscript || (uiscript = {}));