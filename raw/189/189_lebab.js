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
  let e;

  const i = (() => {
    function e(t) {
      const e = this;
      (this.me = t),
        (this.title = this.me.getChildByName('title')),
        (this.input = this.me
          .getChildByName('input')
          .getChildByName('txtinput')),
        (this.btn_confirm = this.me.getChildByName('btn_confirm')),
        (this.btn_cancel = this.me.getChildByName('btn_cancel')),
        (this.me.visible = !1),
        (this.btn_cancel.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.hide(null);
          },
          null,
          !1
        ));
    }
    return (e.prototype.show_share = function(e) {
      const i = this;
      (this.title.text = game.Tools.strOfLocalization(2124)),
        GameMgr.inConch
          ? ((this.btn_confirm.visible = !0),
            (this.btn_confirm.clickHandler = Laya.Handler.create(
              this,
              () => {
                Laya.PlatformClass.createClass(
                  'layaair.majsoul.mjmgr'
                ).call('setSysClipboardText', i.input.text),
                  i.hide(null),
                  t.UI_FlyTips.ShowTips(game.Tools.strOfLocalization(2125));
              },
              null,
              !1
            )))
          : GameMgr.iniOSWebview
          ? ((this.btn_confirm.visible = !0),
            (this.btn_confirm.clickHandler = Laya.Handler.create(
              this,
              () => {
                Laya.Browser.window.wkbridge.callNative(
                  'copy2clip',
                  i.input.text,
                  () => {}
                ),
                  i.hide(null),
                  t.UI_FlyTips.ShowTips(game.Tools.strOfLocalization(2125));
              },
              null,
              !1
            )))
          : ((this.btn_confirm.visible = !1),
            (this.btn_confirm.clickHandler = Laya.Handler.create(
              this,
              () => {},
              null,
              !1
            ))),
        (this.input.editable = !1);
      const n = game.Tools.encode_account_id(GameMgr.Inst.account_id);
      (this.input.text =
        `${game.Tools.strOfLocalization(2126)}: ${GameMgr.Inst.link_url}?paipu=${e}_a${n}`),
        (this.me.visible = !0),
        (this.locking = !0),
        (this.btn_confirm.getChildAt(0).text = game.Tools.strOfLocalization(
          2127
        )),
        t.UIBase.anim_pop_out(
          this.me,
          Laya.Handler.create(this, () => {
            i.locking = !1;
          })
        );
    }),
    (e.prototype.show_check = function() {
      const e = this;
      t.UI_PiPeiYuYue.Inst.enable
        ? t.UI_Popout.PopOutNoTitle(game.Tools.strOfLocalization(204), null)
        : ((this.title.text = game.Tools.strOfLocalization(2128)),
          (this.btn_confirm.visible = !0),
          (this.btn_confirm.getChildAt(
            0
          ).text = game.Tools.strOfLocalization(2129)),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.hide(
                Laya.Handler.create(e, () => {
                  const t = e.input.text.split('=');
                  const i = t[t.length - 1].split('_');
                  let n = 0;
                  i.length > 1 &&
                    (n =
                      'a' == i[1].charAt(0)
                        ? game.Tools.decode_account_id(
                            parseInt(i[1].substr(1))
                          )
                        : parseInt(i[1]));
                  let a = 0;
                  if (i.length > 2) {
                    const r = parseInt(i[2]);
                    r && (a = r);
                  }
                  GameMgr.Inst.checkPaiPu(i[0], n, a);
                })
              );
            },
            null,
            !1
          )),
          (this.input.editable = !0),
          (this.input.text = ''),
          (this.me.visible = !0),
          (this.locking = !0),
          t.UIBase.anim_pop_out(
            this.me,
            Laya.Handler.create(this, () => {
              e.locking = !1;
            })
          ));
    }),
    (e.prototype.hide = function(e) {
      const i = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.me,
          Laya.Handler.create(this, () => {
            (i.locking = !1), (i.me.visible = !1), e && e.run();
          })
        );
    }),
    e
  ;
  })();

  const n = (() => {
    function e(t) {
      const e = this;
      (this.me = t),
        (this.blackbg = t.getChildByName('blackbg')),
        (this.root = t.getChildByName('root')),
        (this.input = this.root
          .getChildByName('input')
          .getChildByName('txtinput')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        })),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking ||
            (game.Tools.calu_word_length(e.input.text) > 30
              ? (e.toolong.visible = !0)
              : (e.close(),
                r.addCollect(
                  e.uuid,
                  e.start_time,
                  e.end_time,
                  e.input.text
                )));
        })),
        (this.toolong = this.root.getChildByName('toolong'));
    }
    return (e.prototype.show = function(e, i, n) {
      const a = this;
      (this.uuid = e),
        (this.start_time = i),
        (this.end_time = n),
        (this.me.visible = !0),
        (this.locking = !0),
        (this.input.text = ''),
        (this.toolong.visible = !1),
        (this.blackbg.alpha = 0),
        Laya.Tween.to(this.blackbg, { alpha: 0.5 }, 150),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            a.locking = !1;
          })
        );
    }),
    (e.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        Laya.Tween.to(this.blackbg, { alpha: 0 }, 150),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        );
    }),
    e
  ;
  })();

  !(t => {
    (t[(t.ALL = 0)] = 'ALL'),
      (t[(t.FRIEND = 1)] = 'FRIEND'),
      (t[(t.RANK = 2)] = 'RANK'),
      (t[(t.MATCH = 4)] = 'MATCH'),
      (t[(t.COLLECT = 100)] = 'COLLECT');
  })(e || (e = {}));

  const a = (() => {
      function i(t) {
        (this.uuid_list = []), (this.type = t), this.reset();
      }
      return (i.prototype.reset = function() {
        (this.count = 0),
          (this.true_count = 0),
          (this.have_more_paipu = !0),
          (this.uuid_list = []),
          (this.duringload = !1);
      }),
      (i.prototype.loadList = function() {
        const i = this;
        if (!this.duringload && this.have_more_paipu) {
          if (((this.duringload = !0), this.type == e.COLLECT)) {
            for (var n = [], a = 0, s = 0; s < 10; s++) {
              const o = this.count + s;
              if (o >= r.collect_lsts.length) break;
              a++;
              const l = r.collect_lsts[o];
              r.record_map[l] || n.push(l), this.uuid_list.push(l);
            }
            n.length > 0
              ? app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'fetchGameRecordsDetail',
                  { uuid_list: n },
                  (e, s) => {
                    if (
                      ((i.duringload = !1),
                      r.Inst.onLoadStateChange(i.type, !1),
                      e || s.error)
                    )
                      t.UIMgr.Inst.showNetReqError(
                        'fetchGameRecordsDetail',
                        e,
                        s
                      );
                    else if (
                      (app.Log.log(JSON.stringify(s)),
                      s.record_list && s.record_list.length == n.length)
                    ) {
                      for (let o = 0; o < s.record_list.length; o++) {
                        const l = s.record_list[o].uuid;
                        r.record_map[l] ||
                          (r.record_map[l] = s.record_list[o]);
                      }
                      (i.count += a),
                        i.count >= r.collect_lsts.length &&
                          ((i.have_more_paipu = !1),
                          r.Inst.onLoadOver(i.type)),
                        r.Inst.onLoadMoreLst(i.type, a);
                    } else
                      (i.have_more_paipu = !1), r.Inst.onLoadOver(i.type);
                  }
                )
              : ((this.duringload = !1),
                (this.count += a),
                this.count >= r.collect_lsts.length &&
                  ((this.have_more_paipu = !1), r.Inst.onLoadOver(this.type)),
                r.Inst.onLoadMoreLst(this.type, a));
          } else
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchGameRecordList',
              { start: this.true_count, count: 10, type: this.type },
              (n, a) => {
                if (
                  ((i.duringload = !1),
                  r.Inst.onLoadStateChange(i.type, !1),
                  n || a.error)
                )
                  t.UIMgr.Inst.showNetReqError('fetchGameRecordList', n, a);
                else if (
                  (app.Log.log(JSON.stringify(a)),
                  a.record_list && a.record_list.length > 0)
                ) {
                  for (
                    var s = a.record_list, o = 0, l = 0;
                    l < s.length;
                    l++
                  ) {
                    const h = s[l].uuid;
                    if (i.type == e.RANK && s[l].config && s[l].config.meta) {
                      const c = s[l].config.meta;
                      if (c) {
                        const u = cfg.desktop.matchmode.get(c.mode_id);
                        if (u && 5 == u.room) continue;
                      }
                    }
                    o++,
                      i.uuid_list.push(h),
                      r.record_map[h] || (r.record_map[h] = s[l]);
                  }
                  (i.count += o),
                    (i.true_count += s.length),
                    r.Inst.onLoadMoreLst(i.type, o),
                    (i.have_more_paipu = !0);
                } else (i.have_more_paipu = !1), r.Inst.onLoadOver(i.type);
              }
            );
          Laya.timer.once(700, this, () => {
            i.duringload && r.Inst.onLoadStateChange(i.type, !0);
          });
        }
      }),
      (i.prototype.removeAt = function(t) {
        for (let e = 0; e < this.uuid_list.length - 1; e++)
          e >= t && (this.uuid_list[e] = this.uuid_list[e + 1]);
        this.uuid_list.pop(), this.count--, this.true_count--;
      }),
      i
    ;
    })();

  var r = (r => {
    function s() {
      const t = r.call(this, new ui.lobby.paipuUI()) || this;
      return (
        (t.top = null),
        (t.container_scrollview = null),
        (t.scrollview = null),
        (t.loading = null),
        (t.tabs = []),
        (t.pop_otherpaipu = null),
        (t.pop_collectinput = null),
        (t.label_collect_count = null),
        (t.noinfo = null),
        (t.locking = !1),
        (t.current_type = e.ALL),
        (s.Inst = t),
        t
      );
    }
    return __extends(s, r),
    (s.init = function() {
      const t = this;
      (this.paipuLst[e.ALL] = new a(e.ALL)),
        (this.paipuLst[e.FRIEND] = new a(e.FRIEND)),
        (this.paipuLst[e.RANK] = new a(e.RANK)),
        (this.paipuLst[e.MATCH] = new a(e.MATCH)),
        (this.paipuLst[e.COLLECT] = new a(e.COLLECT)),
        (this.collect_lsts = []),
        (this.record_map = {}),
        (this.collect_info = {}),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchCollectedGameRecordList',
          {},
          (e, {error, record_list, record_collect_limit}) => {
            if (e || error);
            else {
              if (record_list) {
                for (let n = record_list, a = 0; a < n.length; a++) {
                  const r = {
                    uuid: n[a].uuid,
                    time: n[a].end_time,
                    remarks: n[a].remarks
                  };
                  t.collect_lsts.push(r.uuid), (t.collect_info[r.uuid] = r);
                }
                t.collect_lsts = t.collect_lsts.sort((e, i) => t.collect_info[i].time - t.collect_info[e].time);
              }
              record_collect_limit &&
                (t.collect_limit = record_collect_limit);
            }
          }
        );
    }),
    (s.onAccountUpdate = function() {
      this.Inst &&
        this.Inst.enable &&
        (this.Inst.label_collect_count.text =
          `${this.collect_lsts.length.toString()}/${this.collect_limit.toString()}`);
    }),
    (s.reset = function() {
      this.paipuLst[e.ALL] && this.paipuLst[e.ALL].reset(),
        this.paipuLst[e.FRIEND] && this.paipuLst[e.FRIEND].reset(),
        this.paipuLst[e.RANK] && this.paipuLst[e.RANK].reset(),
        this.paipuLst[e.MATCH] && this.paipuLst[e.MATCH].reset();
    }),
    (s.addCollect = function(e, i, n, a) {
      const r = this;
      if (!this.collect_info[e])
        if (this.collect_lsts.length + 1 > this.collect_limit)
          t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2767));
        else {
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'addCollectedGameRecord',
            { uuid: e, remarks: a, start_time: i, end_time: n },
            (t, e) => {}
          );
          const o = { uuid: e, remarks: a, time: n };
          (this.collect_info[e] = o),
            this.collect_lsts.push(e),
            (this.collect_lsts = this.collect_lsts.sort((t, e) => r.collect_info[e].time - r.collect_info[t].time)),
            s.Inst.onCollectChange(e, -1);
        }
    }),
    (s.removeCollect = function(t) {
      const e = this;
      if (this.collect_info[t]) {
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'removeCollectedGameRecord',
          { uuid: t },
          (t, e) => {}
        ),
          delete this.collect_info[t];
        for (var i = -1, n = 0; n < this.collect_lsts.length; n++)
          if (this.collect_lsts[n] == t) {
            (this.collect_lsts[n] = this.collect_lsts[
              this.collect_lsts.length - 1
            ]),
              (i = n);
            break;
          }
        this.collect_lsts.pop(),
          (this.collect_lsts = this.collect_lsts.sort((t, i) => e.collect_info[i].time - e.collect_info[t].time)),
          s.Inst.onCollectChange(t, i);
      }
    }),
    (s.prototype.onCreate = function() {
      const e = this;
      (this.top = this.me.getChildByName('top')),
        (this.top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              e.close(
                Laya.Handler.create(e, () => {
                  t.UIMgr.Inst.showLobby();
                })
              );
          },
          null,
          !1
        )),
        (this.container_scrollview = this.me.getChildByName('scrollview')),
        (this.scrollview = this.container_scrollview.scriptMap[
          'capsui.CScrollView'
        ]),
        this.scrollview.init_scrollview(
          Laya.Handler.create(
            this,
            ({index, container}) => {
              e.setItemValue(index, container);
            },
            null,
            !1
          )
        ),
        this.container_scrollview.on('ratechange', this, () => {
          const t = s.paipuLst[e.current_type];
          (1 - e.scrollview.rate) * t.count < 3 &&
            (t.duringload ||
              (t.have_more_paipu
                ? t.loadList()
                : 0 == t.count && (e.noinfo.visible = !0)));
        }),
        (this.loading = this.container_scrollview.getChildByName(
          'loading'
        )),
        (this.loading.visible = !1),
        (this.container_scrollview.getChildByName(
          'checkother'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.pop_otherpaipu.me.visible || e.pop_otherpaipu.show_check();
          },
          null,
          !1
        )),
        (this.tabs = []);
      for (let a = 0; a < 5; a++)
        this.tabs.push(
          this.container_scrollview.getChildByName('tabs').getChildAt(a)
        ),
          (this.tabs[a].clickHandler = new Laya.Handler(
            this,
            this.changeTab,
            [a, !1]
          ));
      (this.pop_otherpaipu = new i(
        this.me.getChildByName('pop_otherpaipu')
      )),
        (this.pop_collectinput = new n(
          this.me.getChildByName('pop_collect')
        )),
        (this.label_collect_count = this.container_scrollview
          .getChildByName('collect_limit')
          .getChildByName('value')),
        (this.label_collect_count.text = '0/20'),
        (this.noinfo = this.container_scrollview.getChildByName('noinfo'));
    }),
    (s.prototype.show = function() {
      const e = this;
      GameMgr.Inst.BehavioralStatistics(20),
        game.Scene_Lobby.Inst.change_bg('indoor', !1),
        (this.enable = !0),
        (this.pop_otherpaipu.me.visible = !1),
        (this.pop_collectinput.me.visible = !1),
        t.UIBase.anim_alpha_in(this.top, { y: -30 }, 200),
        t.UIBase.anim_alpha_in(this.container_scrollview, { y: 30 }, 200),
        (this.locking = !0),
        (this.loading.visible = !1),
        Laya.timer.once(200, this, () => {
          e.locking = !1;
        }),
        this.changeTab(0, !0),
        (this.label_collect_count.text =
          `${s.collect_lsts.length.toString()}/${s.collect_limit.toString()}`);
    }),
    (s.prototype.close = function(e) {
      const i = this;
      (this.locking = !0),
        t.UIBase.anim_alpha_out(this.top, { y: -30 }, 150),
        t.UIBase.anim_alpha_out(this.container_scrollview, { y: 30 }, 150),
        Laya.timer.once(150, this, () => {
          (i.locking = !1), (i.enable = !1), e && e.run();
        });
    }),
    (s.prototype.changeTab = function(t, i) {
      const n = [e.ALL, e.RANK, e.FRIEND, e.MATCH, e.COLLECT];
      if (i || n[t] != this.current_type) {
        if (
          ((this.loading.visible = !1),
          (this.noinfo.visible = !1),
          (this.current_type = n[t]),
          this.current_type == e.COLLECT &&
            s.paipuLst[this.current_type].reset(),
          this.scrollview.reset(),
          this.current_type != e.COLLECT)
        ) {
          const a = s.paipuLst[this.current_type].count;
          a > 0 && this.scrollview.addItem(a);
        }
        for (let r = 0; r < this.tabs.length; r++) {
          const o = this.tabs[r];
          (o.getChildByName('img').skin = game.Tools.localUISrc(
            t == r
              ? 'myres/shop/tab_choose.png'
              : 'myres/shop/tab_unchoose.png'
          )),
            (o.getChildByName('label_name').color =
              t == r ? '#d9b263' : '#8cb65f');
        }
      }
    }),
    (s.prototype.setItemValue = function(e, i) {
      const n = this;
      if (this.enable) {
        const a = s.paipuLst[this.current_type];
        if (a || !(e >= a.uuid_list.length)) {
          for (var r = s.record_map[a.uuid_list[e]], o = 0; o < 4; o++) {
            const l = i.getChildByName(`p${o.toString()}`);
            if (o < r.result.players.length) {
              l.visible = !0;
              const h = l.getChildByName('chosen'), c = l.getChildByName('rank'), u = l.getChildByName('rank_word'), _ = l.getChildByName('name'), d = l.getChildByName('score'), f = r.result.players[o];
              d.text = f.part_point_1 || '0';
              for (
                var p = game.Tools.strOfLocalization(2133), m = !1, g = 0;
                g < r.accounts.length;
                g++
              )
                if (r.accounts[g].seat == f.seat) {
                  (p = r.accounts[g].nickname),
                    (m =
                      r.accounts[g].account_id == GameMgr.Inst.account_id);
                  break;
                }
              (_.text = p),
                (h.visible = m),
                (d.color = m ? '#ffc458' : '#b98930'),
                (_.color = m ? '#dfdfdf' : '#a0a0a0'),
                (u.color = c.color = m ? '#57bbdf' : '#489dbc');
              const y = l.getChildByName('rank_word');
              if ('en' == GameMgr.client_language)
                switch (o) {
                  case 0:
                    y.text = 'st';
                    break;
                  case 1:
                    y.text = 'nd';
                    break;
                  case 2:
                    y.text = 'rd';
                    break;
                  case 3:
                    y.text = 'th';
                }
            } else l.visible = !1;
          }
          const v = new Date(1e3 * r.end_time);
          let b = '';
          (b += `${v.getFullYear()}/`),
            (b +=
              `${(v.getMonth() < 9 ? '0' : '') +
(v.getMonth() + 1).toString()}/`),
            (b += `${(v.getDate() < 10 ? '0' : '') + v.getDate()} `),
            (b += `${(v.getHours() < 10 ? '0' : '') + v.getHours()}:`),
            (b += (v.getMinutes() < 10 ? '0' : '') + v.getMinutes()),
            (i.getChildByName('date').text = b),
            (i.getChildByName('check').clickHandler = Laya.Handler.create(
              this,
              () => {
                n.locking ||
                  (t.UI_PiPeiYuYue.Inst.enable
                    ? t.UI_Popout.PopOutNoTitle(
                        game.Tools.strOfLocalization(204),
                        null
                      )
                    : GameMgr.Inst.checkPaiPu(
                        r.uuid,
                        GameMgr.Inst.account_id,
                        0
                      ));
              },
              null,
              !1
            )),
            (i.getChildByName('share').clickHandler = Laya.Handler.create(
              this,
              () => {
                n.locking ||
                  n.pop_otherpaipu.me.visible ||
                  (n.pop_otherpaipu.show_share(r.uuid),
                  GameMgr.Inst.BehavioralStatistics(21));
              },
              null,
              !1
            ));
          const w = i.getChildByName('room'), x = game.Tools.get_room_desc(r.config);
          w.text = x.text;
          let I = '';
          if (1 == r.config.category)
            I = game.Tools.strOfLocalization(2023);
          else if (4 == r.config.category)
            I = game.Tools.strOfLocalization(2025);
          else if (2 == r.config.category) {
            const C = r.config.meta;
            if (C) {
              const S = cfg.desktop.matchmode.get(C.mode_id);
              S && (I = S[`room_name_${GameMgr.client_language}`]);
            }
          }
          if (s.collect_info[r.uuid]) {
            const T = s.collect_info[r.uuid];
            const M = i.getChildByName('remarks_info');
            const E = i.getChildByName('input');
            const L = E.getChildByName('txtinput');
            const D = i.getChildByName('btn_input');
            let A = !1;

            const N = () => {
              A
                ? ((M.visible = !1),
                  (E.visible = !0),
                  (L.text = M.text),
                  (D.visible = !1))
                : (T.remarks && '' != T.remarks
                    ? (M.text = game.Tools.strWithoutForbidden(T.remarks))
                    : (M.text = I),
                  (M.visible = !0),
                  (E.visible = !1),
                  (D.visible = !0));
            };

            N(),
              (D.clickHandler = Laya.Handler.create(
                this,
                () => {
                  (A = !0), N();
                },
                null,
                !1
              )),
              L.on('blur', this, () => {
                A &&
                  (game.Tools.calu_word_length(L.text) > 30
                    ? t.UIMgr.Inst.ShowErrorInfo(
                        game.Tools.strOfLocalization(2765)
                      )
                    : L.text != T.remarks &&
                      ((T.remarks = L.text),
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'changeCollectedGameRecordRemarks',
                        { uuid: r.uuid, remarks: L.text },
                        (t, e) => {}
                      ))),
                  (A = !1),
                  N();
              });
            ((R = i.getChildByName(
              'collect'
            )).clickHandler = Laya.Handler.create(
              this,
              () => {
                s.removeCollect(r.uuid);
              },
              null,
              !1
            )),
              (R.getChildByName('img').skin = game.Tools.localUISrc(
                'myres/lobby/collect_star.png'
              ));
          } else {
            (i.getChildByName('input').visible = !1),
              (i.getChildByName('btn_input').visible = !1),
              (i.getChildByName('remarks_info').visible = !0),
              (i.getChildByName('remarks_info').text = I);
            var R = i.getChildByName('collect');
            (R.clickHandler = Laya.Handler.create(
              this,
              () => {
                n.pop_collectinput.show(r.uuid, r.start_time, r.end_time);
              },
              null,
              !1
            )),
              (R.getChildByName('img').skin = game.Tools.localUISrc(
                'myres/lobby/collect_star_gray.png'
              ));
          }
        }
      }
    }),
    (s.prototype.onLoadStateChange = function(t, e) {
      this.current_type == t && (this.loading.visible = e);
    }),
    (s.prototype.onLoadMoreLst = function(t, e) {
      this.current_type == t && this.scrollview.addItem(e);
    }),
    (s.prototype.onLoadOver = function(t) {
      if (this.current_type == t) {
        0 == s.paipuLst[this.current_type].count &&
          (this.noinfo.visible = !0);
      }
    }),
    (s.prototype.onCollectChange = function(t, i) {
      if (this.current_type == e.COLLECT)
        i >= 0 &&
          (s.paipuLst[e.COLLECT].removeAt(i), this.scrollview.delItem(i));
      else
        for (
          let n = s.paipuLst[this.current_type].uuid_list, a = 0;
          a < n.length;
          a++
        )
          if (n[a] == t) {
            this.scrollview.wantToRefreshItem(a);
            break;
          }
      this.label_collect_count.text =
        `${s.collect_lsts.length.toString()}/${s.collect_limit.toString()}`;
    }),
    (s.Inst = null),
    (s.paipuLst = {}),
    (s.collect_lsts = []),
    (s.record_map = {}),
    (s.collect_info = {}),
    (s.collect_limit = 20),
    s
  ;
  })(t.UIBase);

  t.UI_PaiPu = r;
})(uiscript || (uiscript = {}));