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
  const e = (() => (function(t) {
    this.me = t;
  }))();

  const i = (t => {
    function e(e, i, n) {
      const a = t.call(this, e) || this;
      (a._on_change = null),
        (a._current_index = 0),
        (a._toggles = []),
        (a._on_change = n),
        (a._current_index = i);
      for (
        let s = t => {
                const e = o.me.getChildByName(`toggle_${t}`);
                if (!e) return 'break';
                e.clickHandler = Laya.Handler.create(
                  o,
                  () => {
                    a.change_index(t);
                  },
                  null,
                  !1
                );
                const i = e.getChildAt(0);
                t == o._current_index
                  ? ((e.skin = game.Tools.localUISrc(r.skin_choosed)),
                    (i.color = r.color_choosed))
                  : ((e.skin = game.Tools.localUISrc(r.skin_unchoose)),
                    (i.color = r.color_unchoose)),
                  o._toggles.push({ btn: e, label: i });
              },
            o = this,
            l = 0;
        l < 6;
        l++
      ) {
        if ('break' === s(l)) break;
      }
      return a;
    }
    return __extends(e, t),
    Object.defineProperty(e.prototype, 'index', {
      get() {
        return this._current_index;
      },
      enumerable: !0,
      configurable: !0
    }),
    (e.prototype.change_index = function(t) {
      if (this._current_index != t) {
        for (let e = 0; e < this._toggles.length; e++)
          e == t
            ? ((this._toggles[e].btn.skin = game.Tools.localUISrc(
                r.skin_choosed
              )),
              (this._toggles[e].label.color = r.color_choosed))
            : ((this._toggles[e].btn.skin = game.Tools.localUISrc(
                r.skin_unchoose
              )),
              (this._toggles[e].label.color = r.color_unchoose));
        (this._current_index = t),
          this._on_change && this._on_change.runWith(t);
      }
    }),
    (e.prototype.setTexts = function(t) {
      for (let e = 0; e < this._toggles.length; e++)
        e < t.length
          ? ((this._toggles[e].label.text = t[e]),
            (this._toggles[e].btn.visible = !0))
          : (this._toggles[e].btn.visible = !1);
    }),
    e
  ;
  })(e);

  const n = (t => {
    function e(...args) {
      return (null !== t && t.apply(this, args)) || this;
    }
    return __extends(e, t), e;
  })(e);

  const a = (e => {
    function i(i, n, a) {
      const r = e.call(this, i) || this;
      (r._on_change = null),
        (r._label = null),
        (r._current_num = 0),
        (r._on_change = a);
      const s = r.me.getChildByName('btn');
      return (s.clickHandler = Laya.Handler.create(
        r,
        () => {
          t.UI_NumberInput.Inst.show(
            game.Tools.strOfLocalization(2043),
            Laya.Handler.create(r, t => {
              0 != t &&
                t != r._current_num &&
                r._on_change &&
                r._on_change.runWith(t);
            }),
            null
          );
        },
        null,
        !1
      )),
      (r._label = s.getChildAt(1)),
      r.change_num(n),
      r
    ;
    }
    return __extends(i, e),
    Object.defineProperty(i.prototype, 'num', {
      get() {
        return this._current_num;
      },
      enumerable: !0,
      configurable: !0
    }),
    (i.prototype.change_num = function(t) {
      (this._current_num = t), (this._label.text = t.toString());
    }),
    i
  ;
  })(e);

  var r = (e => {
    function r() {
      const t = e.call(this, new ui.lobby.create_roomUI()) || this;
      return (
        (t.__moshi = null),
        (t.__jushu = null),
        (t.__time = null),
        (t.__test_paipu = null),
        (t.__test_paicount = null),
        (t.__gaojishezhi = null),
        (t.__split_line = null),
        (t.__qishidianshu = null),
        (t.__fandian = null),
        (t.__zimosun = null),
        (t.__chibaopai = null),
        (t.__shiduan = null),
        (t.__fanfu = null),
        (t.__bianjietishi = null),
        (t.__guanzhan = null),
        (t.__ailevel = null),
        (t.container_top = null),
        (t.container_content = null),
        (t.panel = null),
        (t._scrollbar = null),
        (t._scrollpoint = null),
        (t.locking = !1),
        (t._btn_create_cd = 0),
        (t.tournament_id = 0),
        (t._blocks = []),
        (t._drag_scroll = !1),
        (r.Inst = t),
        t
      );
    }
    return __extends(r, e),
    (r.Show = function() {
      this.Inst.show();
    }),
    (r.prototype.onCreate = function() {
      const e = this, r = this.me.getChildByName('container_create_room');
      (this.container_top = r.getChildByName('top')),
        (this.container_content = r.getChildByName('content')),
        (this.panel = this.container_content.getChildByName('panel')),
        (this.__moshi = new i(
          this.panel.getChildByName('moshi'),
          0,
          Laya.Handler.create(
            this,
            t => {
              0 == t
                ? (e.__qishidianshu.change_num(25e3),
                  e.__fandian.change_num(3e4),
                  e.__chibaopai.setTexts([
                    game.Tools.strOfLocalization(2044),
                    game.Tools.strOfLocalization(2045),
                    game.Tools.strOfLocalization(2046)
                  ]))
                : (e.__qishidianshu.change_num(35e3),
                  e.__fandian.change_num(4e4),
                  e.__chibaopai.setTexts([
                    game.Tools.strOfLocalization(2044),
                    game.Tools.strOfLocalization(2047)
                  ]),
                  e.__chibaopai.index > 1 && e.__chibaopai.change_index(1)),
                (e.__zimosun.me.visible =
                  0 != e.__gaojishezhi.index && 1 == e.__moshi.index),
                e._refreshShow();
            },
            null,
            !1
          )
        )),
        (this.__jushu = new i(
          this.panel.getChildByName('jushu'),
          2,
          Laya.Handler.create(this, t => {}, null, !1)
        )),
        (this.__time = new i(this.panel.getChildByName('time'), 2, null)),
        (this.__test_paipu = new i(
          this.panel.getChildByName('test_paipu'),
          0,
          null
        )),
        (this.__test_paicount = new i(
          this.panel.getChildByName('test_paicount'),
          0,
          null
        )),
        (this.__gaojishezhi = new i(
          this.panel.getChildByName('gaojishezhi'),
          0,
          Laya.Handler.create(
            this,
            t => {
              e.__qishidianshu.change_num(
                0 == e.__moshi.index ? 25e3 : 35e3
              ),
                e.__fandian.change_num(0 == e.__moshi.index ? 3e4 : 4e4),
                e.__chibaopai.change_index(1),
                e.__chibaopai.setTexts(
                  0 == e.__moshi.index
                    ? [
                        game.Tools.strOfLocalization(2044),
                        game.Tools.strOfLocalization(2045),
                        game.Tools.strOfLocalization(2046)
                      ]
                    : [
                        game.Tools.strOfLocalization(2044),
                        game.Tools.strOfLocalization(2047)
                      ]
                ),
                e.__shiduan.change_index(0),
                e.__bianjietishi.change_index(0),
                e.__ailevel.change_index(0),
                e.__guanzhan.change_index(0),
                e.__zimosun.change_index(0),
                e.__fanfu.change_index(0),
                (e.__split_line.me.visible = 0 != t),
                (e.__qishidianshu.me.visible = 0 != t),
                (e.__fandian.me.visible = 0 != t),
                (e.__zimosun.me.visible = 0 != t && 1 == e.__moshi.index),
                (e.__chibaopai.me.visible = 0 != t),
                (e.__shiduan.me.visible = 0 != t),
                (e.__bianjietishi.me.visible = 0 != t),
                (e.__guanzhan.me.visible = !1),
                (e.__ailevel.me.visible = 0 != t),
                (e.__fanfu.me.visible = 0 != t),
                e._refreshShow();
            },
            null,
            !1
          )
        )),
        (this.__split_line = new n(
          this.panel.getChildByName('split_line')
        )),
        (this.__qishidianshu = new a(
          this.panel.getChildByName('qishidianshu'),
          25e3,
          Laya.Handler.create(
            this,
            t => {
              (t = 100 * Math.ceil(t / 100)) < 100 && (t = 100),
                t >= 2e5 && (t = 2e5),
                t > e.__fandian.num && e.__fandian.change_num(t),
                e.__qishidianshu.change_num(t);
            },
            null,
            !1
          )
        )),
        (this.__fandian = new a(
          this.panel.getChildByName('fandian'),
          3e4,
          Laya.Handler.create(
            this,
            t => {
              (t = 100 * Math.ceil(t / 100)) < 100 && (t = 100),
                t >= 2e5 && (t = 2e5),
                t < e.__qishidianshu.num && (t = e.__qishidianshu.num),
                e.__fandian.change_num(t);
            },
            null,
            !1
          )
        )),
        (this.__zimosun = new i(
          this.panel.getChildByName('zimosun'),
          0,
          null
        )),
        (this.__chibaopai = new i(
          this.panel.getChildByName('chibaopai'),
          1,
          null
        )),
        (this.__shiduan = new i(
          this.panel.getChildByName('shiduan'),
          0,
          null
        )),
        (this.__fanfu = new i(this.panel.getChildByName('fanfu'), 0, null)),
        (this.__bianjietishi = new i(
          this.panel.getChildByName('bianjietishi'),
          0,
          null
        )),
        (this.__guanzhan = new i(
          this.panel.getChildByName('guanzhan'),
          0,
          Laya.Handler.create(
            this,
            t => {
              1 != t ||
                (0 != e.__jushu.index && 3 != e.__jushu.index) ||
                e.__guanzhan.change_index(0);
            },
            null,
            !1
          )
        )),
        (this.__ailevel = new i(
          this.panel.getChildByName('ailevel'),
          0,
          Laya.Handler.create(this, t => {}, null, !1)
        )),
        (this.__shiduan.me.getChildByName(
          'what'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(54));
          },
          null,
          !1
        )),
        (this.__bianjietishi.me.getChildByName(
          'what'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(53));
          },
          null,
          !1
        )),
        (this.panel
          .getChildByName('moshi')
          .getChildByName('what').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(57));
          },
          null,
          !1
        )),
        (this.panel
          .getChildByName('zimosun')
          .getChildByName('what').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(63));
          },
          null,
          !1
        ));
      for (let s = 2; s < this.panel.numChildren; s++) {
        const o = this.panel.getChildAt(s), l = o.getChildByName('what');
        l &&
          ((l.x = 106 - o.getChildByName('img_info').displayWidth - 30),
          (l.y = o.getChildByName('img_info').y));
      }
      this._blocks.push(this.__moshi),
        this._blocks.push(this.__jushu),
        this._blocks.push(this.__time),
        this._blocks.push(this.__test_paipu),
        this._blocks.push(this.__test_paicount),
        this._blocks.push(this.__gaojishezhi),
        this._blocks.push(this.__split_line),
        this._blocks.push(this.__qishidianshu),
        this._blocks.push(this.__fandian),
        this._blocks.push(this.__zimosun),
        this._blocks.push(this.__chibaopai),
        this._blocks.push(this.__shiduan),
        this._blocks.push(this.__fanfu),
        this._blocks.push(this.__bianjietishi),
        this._blocks.push(this.__guanzhan),
        this._blocks.push(this.__ailevel),
        (this.__test_paipu.me.visible = !1),
        (this.__test_paicount.me.visible = !1),
        (this.__split_line.me.visible = !1),
        (this.__qishidianshu.me.visible = !1),
        (this.__fandian.me.visible = !1),
        (this.__zimosun.me.visible = !1),
        (this.__chibaopai.me.visible = !1),
        (this.__shiduan.me.visible = !1),
        (this.__fanfu.me.visible = !1),
        (this.__bianjietishi.me.visible = !1),
        (this.__guanzhan.me.visible = !1),
        (this.__ailevel.me.visible = !1),
        (this.panel.vScrollBar.visible = !1),
        (this.container_top.getChildByName(
          'btn_cancel'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              e.hide(
                Laya.Handler.create(e, () => {
                  t.UIMgr.Inst.showLobby();
                })
              );
          },
          null,
          !1
        )),
        (this.container_content.getChildByName(
          'btn_create'
        ).clickHandler = Laya.Handler.create(
          this,
          this._btnCreateRoom,
          null,
          !1
        )),
        (this._scrollbar = this.container_content.getChildByName(
          'scrollbar'
        )),
        (this._scrollpoint = this._scrollbar.getChildByName('scrollpoint')),
        this._scrollbar &&
          (this._scrollbar.on('mousedown', this, () => {
            e._drag_scroll = !0;
            const t = e._scrollbar.mouseY / e._scrollbar.height;
            e.panel.vScrollBar.value = e.panel.vScrollBar.max * t;
          }),
          this._scrollbar.on('mousemove', this, () => {
            if (e._drag_scroll) {
              const t = e._scrollbar.mouseY / e._scrollbar.height;
              e.panel.vScrollBar.value = e.panel.vScrollBar.max * t;
            }
          }),
          this._scrollbar.on('mouseup', this, () => {
            e._drag_scroll = !1;
          }),
          this._scrollbar.on('mouseout', this, () => {
            e._drag_scroll = !1;
          })),
        Laya.timer.frameLoop(1, this, () => {
          if (e.enable && e._scrollbar.visible) {
            const t =
              e.panel.vScrollBar.max > 0
                ? e.panel.vScrollBar.value / e.panel.vScrollBar.max
                : 0;
            e._scrollpoint.y = e._scrollbar.height * t;
          }
        });
    }),
    (r.prototype.show = function() {
      const e = this;
      (this.tournament_id = 0),
        (this._drag_scroll = !1),
        this.panel.vScrollBar.stopScroll(),
        cfg.tournament.tournaments.forEach(({game_ticket_id, id}) => {
          if (0 == e.tournament_id) {
            const n = t.UI_Bag.find_item(game_ticket_id);
            n && n.count > 0 && (e.tournament_id = id);
          }
        }),
        this._refreshShow(),
        (this.enable = !0),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_in(this.container_content, { y: 30 }, 150),
        (this.locking = !0),
        Laya.timer.once(200, this, () => {
          (e.locking = !1), (e._btn_create_cd = 0);
        });
    }),
    (r.prototype.hide = function(e) {
      const i = this;
      void 0 === e && (e = null),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_out(this.container_content, { y: 30 }, 150),
        (this.locking = !0),
        Laya.timer.once(200, this, () => {
          (i.locking = !1), (i.enable = !1), e && e.run();
        });
    }),
    (r.prototype._btnCreateRoom = function() {
      const e = this;
      if (!(this.locking || Laya.timer.currTimer < this._btn_create_cd)) {
        let i = 10 * this.__moshi.index + this.__jushu.index;
        0 == this.__jushu.index && (i += 4),
          (this._btn_create_cd = Laya.timer.currTimer + 5e3);
        let n = 0;
        switch (i) {
          case 0:
          case 1:
          case 2:
            n = 4;
            break;
          case 3:
            n = 1;
            break;
          case 4:
            n = 4;
            break;
          case 10:
          case 11:
          case 12:
            n = 3;
            break;
          case 13:
            n = 1;
            break;
          case 14:
            n = 3;
        }
        const a = {};
        switch (
          ((a.init_point = this.__qishidianshu.num),
          (a.fandian = this.__fandian.num),
          0 == this.__moshi.index
            ? (a.dora_count =
                0 == this.__chibaopai.index
                  ? 0
                  : 1 == this.__chibaopai.index
                  ? 3
                  : 4)
            : (a.dora_count =
                0 == this.__chibaopai.index
                  ? 0
                  : 1 == this.__chibaopai.index
                  ? 2
                  : 3),
          (a.shiduan = 0 == this.__shiduan.index),
          (a.fanfu =
            2 == this.__fanfu.index ? 4 : 1 == this.__fanfu.index ? 2 : 1),
          (a.bianjietishi = 0 == this.__bianjietishi.index),
          this.__time.index)
        ) {
          case 0:
            (a.time_fixed = 3), (a.time_add = 5);
            break;
          case 1:
            (a.time_fixed = 5), (a.time_add = 10);
            break;
          case 2:
            (a.time_fixed = 5), (a.time_add = 20);
            break;
          case 3:
            (a.time_fixed = 60), (a.time_add = 0);
        }
        (a.ai_level = this.__ailevel.index + 1),
          1 == this.__moshi.index &&
            (a.have_zimosun = 0 == this.__zimosun.index);
        GameMgr.inRelease;
        !0;
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'createRoom',
          {
            player_count: n,
            mode: {
              mode: i,
              ai: !0,
              detail_rule: a,
              testing_environment: {}
            },
            public_live: !1
          },
          (i, n) => {
            (e._btn_create_cd = Laya.timer.currTimer),
              i || n.error
                ? t.UIMgr.Inst.showNetReqError('createRoom', i, n)
                : e.hide(
                    Laya.Handler.create(e, () => {
                      t.UI_WaitingRoom.Inst.updateData(n.room),
                        t.UIMgr.Inst.ShowWaitingRoom();
                    })
                  );
          }
        );
      }
    }),
    (r.prototype._refreshShow = function() {
      for (
        var t =
            this.panel.vScrollBar.max > 0
              ? this.panel.vScrollBar.value / this.panel.vScrollBar.max
              : 0,
          e = 0,
          i = 0;
        i < this._blocks.length;
        i++
      )
        this._blocks[i].me.visible
          ? ((this._blocks[i].me.y = e), (e += this._blocks[i].me.height))
          : (this._blocks[i].me.y = 0);
      this.panel.refresh(),
        e < this.panel.height
          ? ((this.panel.vScrollBar.value = 0),
            (this._scrollbar.visible = !1))
          : ((this.panel.vScrollBar.value = this.panel.vScrollBar.max * t),
            (this._scrollbar.visible = !0));
    }),
    (r.Inst = null),
    (r.skin_unchoose = 'myres/room/btn_choosen_no.png'),
    (r.skin_choosed = 'myres/room/btn_choosen.png'),
    (r.color_unchoose = '#c1ac8b'),
    (r.color_choosed = '#894b4b'),
    r
  ;
  })(t.UIBase);

  t.UI_Create_Room = r;
})(uiscript || (uiscript = {}));