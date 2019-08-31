var uiscript;
!(function(t) {
  var e = (function() {
      function t(t, e, i) {
        var n = this;
        (this.me = t),
          (this._get_on = e),
          (this._set_on = i),
          (this.btn = this.me.getChildByName('checkbox').getChildByName('btn')),
          (this.check = this.me
            .getChildByName('checkbox')
            .getChildByName('checkbox')),
          (this.label = this.me
            .getChildByName('checkbox')
            .getChildByName('label')),
          (this.btn.clickHandler = new Laya.Handler(this, function() {
            n._set_on.run();
          }));
      }
      return (
        (t.prototype.refresh = function() {
          var t = this._get_on.run();
          (this.check.visible = t),
            this.label && (this.label.color = t ? '#cad4f7' : '#9ba1b2');
        }),
        t
      );
    })(),
    i = (function() {
      function i(t, i) {
        var n = this;
        (this.cells = []),
          (this.modes = []),
          (this.id_list = []),
          (this._h = 0),
          (this.me = t),
          (this.is_lobby = i);
        for (o = 0; o < 5; o++) {
          var a = this.me.getChildByName('cell' + o);
          this.cells.push({
            bgm: '',
            me: a,
            flag: a.getChildByName('flag'),
            name: a.getChildByName('name'),
            btn_play: a.getChildByName('btn_play'),
            lock: a.getChildByName('lock')
          });
        }
        this.container_modes = this.me.getChildByName('modes');
        for (
          var r = function(t) {
              return n.is_lobby
                ? 0 == t
                  ? 'list' == view.BgmListMgr.bgm_lobby_mode
                  : 'list' != view.BgmListMgr.bgm_lobby_mode
                : 0 == t
                ? 'list' == view.BgmListMgr.bgm_mj_mode
                : 'list' != view.BgmListMgr.bgm_mj_mode;
            },
            s = function(t) {
              n.is_lobby
                ? ((view.BgmListMgr.bgm_lobby_mode = 0 == t ? 'list' : 'rand'),
                  Laya.LocalStorage.setItem(
                    game.Tools.eeesss(
                      'bgm_lobby_mode' + GameMgr.Inst.account_id
                    ),
                    view.BgmListMgr.bgm_lobby_mode
                  ))
                : ((view.BgmListMgr.bgm_mj_mode = 0 == t ? 'list' : 'rand'),
                  Laya.LocalStorage.setItem(
                    game.Tools.eeesss('bgm_mj_mode' + GameMgr.Inst.account_id),
                    view.BgmListMgr.bgm_mj_mode
                  ));
              for (var e = 0; e < n.modes.length; e++) n.modes[e].refresh();
            },
            o = 0;
          o < 2;
          o++
        )
          this.modes.push(
            new e(
              this.container_modes.getChildAt(o),
              new Laya.Handler(this, r, [o]),
              new Laya.Handler(this, s, [o])
            )
          );
      }
      return (
        Object.defineProperty(i.prototype, 'h', {
          get: function() {
            return this._h;
          },
          enumerable: !0,
          configurable: !0
        }),
        (i.prototype.show = function() {
          var e = 0;
          this._h = 0;
          for (var i = 0; i < this.cells.length; i++)
            (this.cells[i].me.visible = !1), (this.cells[i].bgm = '');
          var n = this;
          cfg.audio.bgm.forEach(function(i) {
            if (
              !(e >= n.cells.length) &&
              ((n.is_lobby && 'lobby' == i.type) ||
                (!n.is_lobby && 'mj' == i.type))
            ) {
              var a = e,
                r = n.cells[e];
              (r.bgm = i.path),
                (r.me.y = (r.me.height + 10) * e),
                (r.me.x = 230),
                (r.me.visible = !0),
                (r.name.text = i['name_' + GameMgr.client_language]),
                !n.is_lobby || (t.UI_Lobby.Inst && t.UI_Lobby.Inst.enable)
                  ? game.Tools.setGrayDisable(r.me, !1)
                  : game.Tools.setGrayDisable(r.me, !0),
                i.unlock_item && 0 == t.UI_Bag.get_item_count(i.unlock_item)
                  ? ((r.flag.visible = !1),
                    (r.lock.visible = !0),
                    (r.btn_play.visible = !1),
                    (r.lock.getChildByName('info').text =
                      i['unlock_desc_' + GameMgr.client_language]),
                    (r.me.getChildByName('btn_choose').visible = !1))
                  : ((r.flag.visible = !1),
                    (r.lock.visible = !1),
                    (r.btn_play.visible = !0),
                    (r.btn_play.clickHandler = Laya.Handler.create(
                      n,
                      function() {
                        view.BgmListMgr.playing_bgm == i.path
                          ? view.BgmListMgr.onHandStop()
                          : view.BgmListMgr.tryPlayBgm(i.path);
                      },
                      null,
                      !1
                    )),
                    (r.me.getChildByName('btn_choose').visible = !0),
                    (r.me.getChildByName(
                      'btn_choose'
                    ).clickHandler = Laya.Handler.create(
                      n,
                      function() {
                        if (n.is_lobby) {
                          if (
                            (i = view.BgmListMgr.findIndexInLobby(r.bgm)) >= 0
                          ) {
                            (s = view.BgmListMgr.baned_bgm_lobby_list).push(
                              n.cells[a].bgm
                            ),
                              (view.BgmListMgr.baned_bgm_lobby_list = s),
                              view.BgmListMgr.playing_bgm == r.bgm &&
                                view.BgmListMgr.onHandStop(),
                              (r.name.color = '#414A70');
                          } else {
                            for (
                              var t = [], e = 0;
                              e < view.BgmListMgr.baned_bgm_lobby_list.length;
                              e++
                            )
                              view.BgmListMgr.baned_bgm_lobby_list[e] !=
                                n.cells[a].bgm &&
                                t.push(view.BgmListMgr.baned_bgm_lobby_list[e]);
                            (view.BgmListMgr.baned_bgm_lobby_list = t),
                              (r.name.color = '#a2fb4d');
                          }
                        } else {
                          var i = view.BgmListMgr.findIndexInMJ(r.bgm);
                          if (i >= 0) {
                            var s = view.BgmListMgr.baned_bgm_mj_list;
                            s.push(n.cells[a].bgm),
                              (view.BgmListMgr.baned_bgm_mj_list = s),
                              view.BgmListMgr.playing_bgm == r.bgm &&
                                view.BgmListMgr.onHandStop(),
                              (r.name.color = '#414A70');
                          } else {
                            for (
                              var t = [], e = 0;
                              e < view.BgmListMgr.baned_bgm_mj_list.length;
                              e++
                            )
                              view.BgmListMgr.baned_bgm_mj_list[e] !=
                                n.cells[a].bgm &&
                                t.push(view.BgmListMgr.baned_bgm_mj_list[e]);
                            (view.BgmListMgr.baned_bgm_mj_list = t),
                              (r.name.color = '#a2fb4d');
                          }
                        }
                        view.BgmListMgr.saveConfig();
                      },
                      null,
                      !1
                    ))),
                e++,
                (n._h = r.me.y + r.me.height + 10);
            }
          }),
            (this.container_modes.y = this._h),
            (this._h += 80),
            this.refresh();
        }),
        (i.prototype.refresh = function() {
          for (t = 0; t < this.modes.length; t++) this.modes[t].refresh();
          for (var t = 0; t < this.cells.length; t++) {
            var e = this.cells[t];
            if (e.me.visible) {
              var i =
                  '' != view.BgmListMgr.playing_bgm &&
                  view.BgmListMgr.playing_bgm == e.bgm,
                n = !1;
              this.is_lobby &&
                (n = view.BgmListMgr.findIndexInLobby(e.bgm) >= 0),
                this.is_lobby ||
                  (n = view.BgmListMgr.findIndexInMJ(e.bgm) >= 0),
                (e.flag.visible = i),
                (e.btn_play.getChildByName('img').skin = game.Tools.localUISrc(
                  i ? 'myres/bothui/bf_pause.png' : 'myres/bothui/bf_play.png'
                )),
                (e.name.color = n ? '#a2fb4d' : '#414A70');
            }
          }
        }),
        i
      );
    })();
  t.UI_Bgm_List = i;
})(uiscript || (uiscript = {}));