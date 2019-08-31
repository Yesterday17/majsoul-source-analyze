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
  const e = (() => {
      function e(t) {
        const e = this;
        (this.rounds = []),
          (this.locking = !1),
          (this.enable = !1),
          (this.me = t),
          (this.me.visible = !1),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.renderInfo, null, !1)
          ),
          (this.btn_up = this.me.getChildByName('up')),
          (this.btn_down = this.me.getChildByName('down')),
          (this.btn_up.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.scrollview.scrollDelta(-100);
            },
            null,
            !1
          )),
          (this.btn_down.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.scrollview.scrollDelta(100);
            },
            null,
            !1
          )),
          this.scrollview.me.on('ratechange', this, () => {
            (e.btn_up.visible = e.scrollview.rate > 0),
              (e.btn_down.visible =
                e.scrollview.need_scroll && e.scrollview.rate < 1);
          }),
          (this.enable = !1);
      }
      return (e.prototype.show = function(e) {
        const i = this;
        (this.enable = !0),
          (this.locking = !0),
          (this.me.visible = !0),
          this.scrollview.reset(),
          (this.rounds = e);
        for (let n = 0; n < e.length; n++) {
          const a = this.caluH(e[n]);
          a, this.scrollview.addItem(1, a);
        }
        t.UIBase.anim_alpha_in(
          this.me,
          { y: 30 },
          120,
          0,
          Laya.Handler.create(this, () => {
            i.locking = !1;
          })
        ),
          (this.btn_up.visible = !1),
          (this.btn_down.visible = this.scrollview.need_scroll);
      }),
      (e.prototype.close = function() {
        const e = this;
        (this.enable = !1),
          (this.locking = !0),
          t.UIBase.anim_alpha_out(
            this.me,
            { y: 30 },
            120,
            0,
            Laya.Handler.create(this, () => {
              (e.locking = !1), (e.me.visible = !1);
            })
          );
      }),
      (e.prototype.caluH = ({actions}) => {
        const e = actions[actions.length - 1];
        if ('RecordNoTile' == e.name) {
          for (
            var i = e.data, n = [], a = 0;
            a < view.DesktopMgr.Inst.player_count;
            a++
          )
            n.push({ old_score: i.scores[0].old_scores[a], delta: 0 });
          for (a = 0; a < i.scores.length; a++)
            for (let r = 0; r < view.DesktopMgr.Inst.player_count; r++)
              n[r].delta += i.scores[a].delta_scores[r];
          for (var s = [], a = 0; a < n.length; a++)
            n[a].delta > 0 && s.push(a);
          return 120 + (0 == s.length ? 0 : 40 * (s.length - 1));
        }
        return 'RecordLiuJu' == e.name
          ? 120
          : e.data.hules[0].zimo
          ? 120
          : 180 + 40 * (e.data.hules.length - 1);
      }),
      (e.prototype.renderInfo = function({index, container}) {
        for (
          var e = this,
            i = index,
            n = container,
            a = this.rounds[i],
            s = 0;
          s < a.actions.length;
          s++
        )
          if ('RecordNewRound' == a.actions[s].name) {
            let o = void 0;
            (o =
              'chs' == GameMgr.client_language
                ? ['东', '南', '西', '北']
                : 'jp' == GameMgr.client_language
                ? ['東', '南', '西', '北']
                : ['East', 'South', 'West', 'North']),
              (n
                .getChildByName('container_title')
                .getChildByName('chang').text =
                o[a.actions[s].data.chang % 4]),
              (n
                .getChildByName('container_title')
                .getChildByName('ju').text = (
                a.actions[s].data.ju + 1
              ).toString()),
              (n
                .getChildByName('container_title')
                .getChildByName('ben').text = a.actions[
                s
              ].data.ben.toString());
            for (
              var l = 0,
                h = n.getChildByName('container_title'),
                c = [3, 3, 50, 3, 0],
                u = 0;
              u < h.numChildren;
              u++
            ) {
              (l += (f = h.getChildAt(u)).textField.textWidth * f.scaleX),
                (l += c[u]);
            }
            for (let _ = h.width / 2 - l / 2, d = 0; d < h.numChildren; d++) {
              var f = h.getChildAt(d);
              (f.x = _),
                (_ += f.textField.textWidth * f.scaleX + c[d]),
                'haolong' == f.font ? (f.y = 34) : (f.y = 31);
            }
            break;
          }
        const p = a.actions[a.actions.length - 1], m = p.data, g = n, y = n.getChildByName('line'), v = n.getChildByName('liuju'), b = n.getChildByName('win'), w = n.getChildByName('lose');
        if (
          ((y.visible = !1),
          (v.visible = !1),
          (b.visible = !1),
          (w.visible = !1),
          'RecordNoTile' == p.name)
        ) {
          for (var x = [], s = 0; s < view.DesktopMgr.Inst.player_count; s++)
            x.push({ old_score: m.scores[0].old_scores[s], delta: 0 });
          for (s = 0; s < m.scores.length; s++)
            for (L = 0; L < view.DesktopMgr.Inst.player_count; L++)
              x[L].delta += m.scores[s].delta_scores[L];
          for (var I = [], s = 0; s < x.length; s++)
            x[s].delta > 0 && I.push(s);
          if (
            ((g.height = 120 + (0 == I.length ? 0 : 40 * (I.length - 1))),
            m.liujumanguan)
          ) {
            b.visible = !0;
            ((T = b.getChildByName(
              'info'
            )).text = game.Tools.strOfLocalization(2170)),
              (T.color = '#8d8fac');
            for (
              var C = b.getChildByName('player'), s = 0;
              s < C.numChildren;
              s++
            ) {
              M = C.getChildAt(s);
              s < I.length
                ? ((M.visible = !0),
                  (M.getChildByName(
                    'name'
                  ).text = view.DesktopMgr.Inst.getPlayerName(I[s])),
                  (M.getChildByName('point').text =
                    `+${x[I[s]].delta.toString()}`))
                : (M.visible = !1);
            }
          } else if (
            ((b.visible = !0),
            (b.getChildByName('info').text = ''),
            (v.visible = !0),
            (v.text = game.Tools.strOfLocalization(2171)),
            m.scores)
          )
            for (
              var C = b.getChildByName('player'), s = 0;
              s < C.numChildren;
              s++
            ) {
              M = C.getChildAt(s);
              s < I.length
                ? ((M.visible = !0),
                  (M.getChildByName(
                    'name'
                  ).text = view.DesktopMgr.Inst.getPlayerName(I[s])),
                  (M.getChildByName('point').text =
                    `+${x[I[s]].delta.toString()}`))
                : (M.visible = !1);
            }
        } else if ('RecordLiuJu' == p.name) {
          const S = [
            '',
            game.Tools.strOfLocalization(2172),
            game.Tools.strOfLocalization(2173),
            game.Tools.strOfLocalization(2174),
            game.Tools.strOfLocalization(2175),
            game.Tools.strOfLocalization(2176)
          ];
          (v.visible = !0), (v.text = S[m.type]), (g.height = 120);
        } else if (p.data.hules[0].zimo) {
          b.visible = !0;
          ((T = b.getChildByName('info')).text = game.Tools.strOfLocalization(
            2177
          )),
            (T.color = '#ea3694');
          for (
            var C = b.getChildByName('player'), s = 0;
            s < C.numChildren;
            s++
          ) {
            M = C.getChildAt(s);
            if (0 == s) {
              M.visible = !0;
              E = m.hules[0].seat;
              M.getChildByName(
                'name'
              ).text = view.DesktopMgr.Inst.getPlayerName(E);
              D = m.delta_scores[E];
              M.getChildByName('point').text = `+${D.toString()}`;
            } else M.visible = !1;
          }
          g.height = 120;
        } else {
          b.visible = !0;
          ((T = b.getChildByName('info')).text = game.Tools.strOfLocalization(
            2178
          )),
            (T.color = '#ef3538');
          for (
            var C = b.getChildByName('player'), s = 0;
            s < C.numChildren;
            s++
          ) {
            M = C.getChildAt(s);
            if (s < m.hules.length) {
              M.visible = !0;
              E = m.hules[s].seat;
              M.getChildByName(
                'name'
              ).text = view.DesktopMgr.Inst.getPlayerName(E);
              D = m.delta_scores[E];
              M.getChildByName('point').text = `+${D.toString()}`;
            } else M.visible = !1;
          }
          (y.visible = !0),
            (y.y = 80 + 40 * m.hules.length),
            (w.visible = !0),
            (w.y = 83 + 40 * m.hules.length);
          for (
            var T = w.getChildByName('info'),
              C = w.getChildByName('player'),
              s = 0;
            s < C.numChildren;
            s++
          ) {
            var M = C.getChildAt(s);
            if (0 == s) {
              M.visible = !0;
              for (var E = 0, L = 0; L < m.delta_scores.length; L++)
                m.delta_scores[L] < m.delta_scores[E] && (E = L);
              M.getChildByName(
                'name'
              ).text = view.DesktopMgr.Inst.getPlayerName(E);
              var D = m.delta_scores[E];
              M.getChildByName('point').text = D.toString();
            } else M.visible = !1;
          }
          g.height = 180 + 40 * (p.data.hules.length - 1);
        }
        (g.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || (r.Inst.jumpRound(i), e.close());
          },
          null,
          !1
        )),
          (n.getChildByName('bg').height = n.height - 4);
      }),
      e
    ;
    })();

  const i = (() => {
    function e(t) {
      const e = this;
      (this.locking = !1),
        (this.enable = !1),
        (this.have0 = !1),
        (this.me = t),
        (this.me.visible = !1),
        (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
        this.scrollview.init_scrollview(
          Laya.Handler.create(this, this.renderInfo, null, !1)
        ),
        (this.btn_up = this.me.getChildByName('up')),
        (this.btn_down = this.me.getChildByName('down')),
        (this.btn_up.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.scrollview.scrollDelta(-100);
          },
          null,
          !1
        )),
        (this.btn_down.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.scrollview.scrollDelta(100);
          },
          null,
          !1
        )),
        this.scrollview.me.on('ratechange', this, () => {
          (e.btn_up.visible = e.scrollview.rate > 0),
            (e.btn_down.visible =
              e.scrollview.need_scroll && e.scrollview.rate < 1);
        }),
        (this.enable = !1);
    }
    return (e.prototype.show = function(e, i) {
      const n = this;
      (this.enable = !0),
        (this.locking = !0),
        (this.have0 = i),
        (this.me.visible = !0),
        this.scrollview.reset(),
        this.scrollview.addItem(e + (i ? 1 : 0)),
        t.UIBase.anim_alpha_in(
          this.me,
          { y: 30 },
          100,
          0,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        ),
        (this.btn_up.visible = !1),
        (this.btn_down.visible = this.scrollview.need_scroll);
    }),
    (e.prototype.close = function() {
      const e = this;
      (this.enable = !1),
        (this.locking = !0),
        t.UIBase.anim_alpha_out(
          this.me,
          { y: 30 },
          100,
          0,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        );
    }),
    (e.prototype.renderInfo = function({index, container}) {
      const e = this, i = index, n = container;
      (n.getChildByName('num').text = (
        i + (this.have0 ? 0 : 1)
      ).toString()),
        (n.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || (r.Inst.jumpXun(i + (e.have0 ? 0 : 1)), e.close());
          },
          null,
          !1
        ));
      const a = n, s = [];
      'en' == GameMgr.client_language
        ? (s.push(a.getChildByName('xun')), s.push(a.getChildByName('num')))
        : (s.push(a.getChildByName('num')),
          s.push(a.getChildByName('xun'))),
        game.Tools.sprite_align_center(s, 115, [10]);
      for (let o = 1; o < a.numChildren; o++) {
        const l = a.getChildAt(o);
        'haolong' == l.font ? (l.y = 42) : (l.y = 39);
      }
    }),
    e
  ;
  })();

  const n = (() => {
    function t(t) {
      const e = this;
      (this._show_hand = !1),
        (this._show_paopai = !1),
        (this.me = t),
        (this._btn_out = this.me.getChildByName('btn_out')),
        (this._btn_out.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.switch();
          },
          null,
          !1
        )),
        (this.me.getChildByName(
          'btn_shoupai'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            (e._show_hand = !e._show_hand),
              (e._choosed_show_hand.visible = e._show_hand),
              view.DesktopMgr.Inst.onShowHandChange(e._show_hand);
          },
          null,
          !1
        )),
        (this._choosed_show_paopai = this.me
          .getChildByName('btn_paopai')
          .getChildByName('choosed')),
        (this.me.getChildByName(
          'btn_paopai'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            (e._show_paopai = !e._show_paopai),
              (e._choosed_show_paopai.visible = e._show_paopai),
              view.DesktopMgr.Inst.onShowPaopaiChange(e._show_paopai);
          },
          null,
          !1
        )),
        (this._choosed_show_hand = this.me
          .getChildByName('btn_shoupai')
          .getChildByName('choosed')),
        (this._choosed_show_paopai = this.me
          .getChildByName('btn_paopai')
          .getChildByName('choosed')),
        (this.me.getChildByName('label_word').visible =
          'chs' == GameMgr.client_language),
        (this.me.getChildByName('img_set').visible =
          'chs' != GameMgr.client_language);
    }
    return (t.prototype.reset = function() {
      Laya.Tween.clearAll(this),
        (this._show_hand = !0),
        (this.me.x = -258),
        (this._btn_out.disabled = !1),
        (this._choosed_show_hand.visible = this._show_hand),
        (this._show_paopai = !0),
        (this._choosed_show_paopai.visible = this._show_paopai);
    }),
    (t.prototype.switch = function() {
      const t = this;
      let e = -258;
      this.me.x < -100 && (e = -5),
        (this._btn_out.disabled = !0),
        Laya.Tween.to(
          this.me,
          { x: e },
          200,
          Laya.Ease.strongOut,
          Laya.Handler.create(this, () => {
            t._btn_out.disabled = !1;
          }),
          0,
          !0,
          !0
        );
    }),
    t
  ;
  })();

  const a = (() => {
    function e(e) {
      const i = this;
      (this.tiles = []),
        (this.container_input = null),
        (this.tile_count = 0),
        (this.gray_filter = null),
        (this.dora_filter = null),
        (this.lidora_filter = null),
        (this.noinfo = !0),
        (this.locking = !1),
        (this.enable = !1),
        (this.me = e),
        (this.root = e.getChildByName('root')),
        (this.content = this.root.getChildByName('content')),
        (this.content.vScrollBarSkin = '');
      const n = this.content.getChildByName('tile_templete');
      n.visible = !1;
      for (let a = 0; a < 100; a++) {
        const r = n.scriptMap['capsui.UICopy'].getNodeClone();
        (r.visible = !1), this.tiles.push(r);
      }
      (this.container_input = this.content.getChildByName('input')),
        (this.gray_filter = new Laya.ColorFilter([
          0.6,
          0,
          0,
          0,
          0,
          0,
          0.6,
          0,
          0,
          0,
          0,
          0,
          0.6,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ])),
        (this.dora_filter = new Laya.ColorFilter([
          0.35,
          0,
          0,
          0,
          0,
          0,
          0.77,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ])),
        (this.lidora_filter = new Laya.ColorFilter([
          1,
          0,
          0,
          0,
          0,
          0,
          0.64,
          0,
          0,
          0,
          0,
          0,
          0.44,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ])),
        (this.container_input.getChildByName(
          'btn_what'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking || t.UI_Info_MD5.Inst.show();
          },
          null,
          !1
        ));
    }
    return (e.prototype.setTiles = function(t) {
      this.tile_count = Math.floor(t.length / 2);
      for (
        var e = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`, i = 0;
        2 * i + 1 < t.length;
        i++
      )
        (this.tiles[i].skin = game.Tools.localUISrc(
          `${e + t.charAt(2 * i) + t.charAt(2 * i + 1)}.png`
        )),
          (this.tiles[i].visible = !0);
      for (i = this.tile_count; i < this.tiles.length; i++)
        this.tiles[i].visible = !1;
      (this.noinfo = !1),
        (this.container_input.getChildByName('txtinput').text = t);
    }),
    (e.prototype.refresh = function() {
      this.me.visible && (this.noinfo || this.setInfo());
    }),
    (e.prototype.setInfo = function() {
      if (!this.noinfo) {
        const t = view.DesktopMgr.Inst.left_tile_count;
        const e = view.DesktopMgr.Inst.dora.length;

        let i =
          view.DesktopMgr.Inst.get_gang_count() +
          view.DesktopMgr.Inst.get_babei_count();

        i > 0 && view.DesktopMgr.Inst.waiting_lingshang_deal_tile && i--;
        let n = this.tile_count - i - 14;
        n < 0 && (n = 0);
        for (
          var a = this.tiles[0].width, r = this.tiles[0].height + 10, s = 0;
          s < n;
          s++
        ) {
          let o = 0;
          view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi3
            ? (o = (s % 12) * a + 5 * Math.floor((s % 12) / 3))
            : (o += 2 + (s % 12) * a + 5 * Math.floor((s % 12) / 4)),
            (this.tiles[s].x = o),
            (this.tiles[s].y = Math.floor(s / 12) * r),
            (this.tiles[s].filters = n - s <= t ? [] : [this.gray_filter]);
        }
        for (
          var l = Math.ceil(n / 12) * r + 20, s = n;
          s < this.tile_count;
          s++
        ) {
          const h = this.tiles[s];
          (h.x = ((s - n) % 12) * a),
            (h.y = Math.floor((s - n) / 12) * r + l),
            (h.filters = []);
        }
        for (
          const c =
                    view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi3
                      ? 8
                      : 4,
                s = 0;
          s < e;
          s++
        )
          (this.tiles[this.tile_count - c - 1 - 2 * s].filters = [
            this.dora_filter
          ]),
            (this.tiles[this.tile_count - c - 2 - 2 * s].filters = [
              this.lidora_filter
            ]);
        for (s = 0; s < i; s++)
          this.tiles[this.tile_count - 1 - s].filters = [this.gray_filter];
        (l += Math.ceil((this.tile_count - n) / 12) * r),
          (this.container_input.y = l + 80),
          this.content.refresh();
      }
    }),
    (e.prototype.setNoInfo = function() {
      this.noinfo = !0;
    }),
    (e.prototype.show = function() {
      const e = this;
      this.locking ||
        (this.noinfo
          ? t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2179))
          : ((this.locking = !0),
            (this.me.visible = !0),
            this.refresh(),
            t.UIBase.anim_alpha_in(
              this.me,
              { y: 30 },
              120,
              0,
              Laya.Handler.create(this, () => {
                e.locking = !1;
              })
            )));
    }),
    (e.prototype.close = function() {
      const e = this;
      this.locking ||
        ((this.locking = !0),
        t.UIBase.anim_alpha_out(
          this.me,
          { y: 30 },
          120,
          0,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        ));
    }),
    e
  ;
  })();

  var r = (r => {
    function s() {
      const t = r.call(this, new ui.mj.replayUI()) || this;
      return (
        (t.label_chang = null),
        (t.label_ju = null),
        (t.label_xun = null),
        (t.img_play = null),
        (t.img_stop = null),
        (t.btn_preround = null),
        (t.btn_nextround = null),
        (t.page_chang = null),
        (t.page_xun = null),
        (t.btn_change_score = null),
        (t.paipuconfig = null),
        (t.page_paishan = null),
        (t.data = null),
        (t.gameResult = null),
        (t.rounds = []),
        (t.round_index = 0),
        (t.action_index = 0),
        (t.locking_time = 0),
        (t._auto_play = !1),
        (s.Inst = t),
        t
      );
    }
    return __extends(s, r),
    Object.defineProperty(s.prototype, 'auto_play', {
      get() {
        return this._auto_play;
      },
      set(t) {
        (this._auto_play = t),
          (this.img_play.visible = !t),
          (this.img_stop.visible = t);
      },
      enumerable: !0,
      configurable: !0
    }),
    (s.prototype.onCreate = function() {
      const r = this, s = this.me.getChildByName('root').getChildByName('round');
      (s.clickHandler = Laya.Handler.create(
        this,
        () => {
          r.page_chang.locking ||
            (r.auto_play && (r.auto_play = !1),
            r.page_xun.enable && r.page_xun.close(),
            r.page_paishan.me.visible && r.page_paishan.close(),
            r.page_chang.enable
              ? r.page_chang.close()
              : r.page_chang.show(r.rounds));
        },
        null,
        !1
      )),
        (this.label_chang = s.getChildByName('chang')),
        (this.label_ju = s.getChildByName('ju'));
      const o = this.me.getChildByName('root').getChildByName('turn');
      (this.label_xun = o.getChildByName('xun')),
        (o.clickHandler = Laya.Handler.create(
          this,
          () => {
            r.page_xun.locking ||
              (r.auto_play && (r.auto_play = !1),
              r.page_chang.enable && r.page_chang.close(),
              r.page_paishan.me.visible && r.page_paishan.close(),
              r.page_xun.enable
                ? r.page_xun.close()
                : r.page_xun.show(
                    r.rounds[r.round_index].xun.length,
                    0 != r.rounds[r.round_index].xun[0]
                  ));
          },
          null,
          !1
        )),
        (this.me
          .getChildByName('root')
          .getChildByName('paishan').clickHandler = Laya.Handler.create(
          this,
          () => {
            r.page_paishan.locking ||
              (r.auto_play && (r.auto_play = !1),
              r.page_chang.enable && r.page_chang.close(),
              r.page_xun.enable && r.page_xun.close(),
              r.page_paishan.me.visible
                ? r.page_paishan.close()
                : r.page_paishan.show());
          },
          null,
          !1
        )),
        (this.page_chang = new e(this.me.getChildByName('info_chang'))),
        (this.page_xun = new i(this.me.getChildByName('info_xun'))),
        (this.page_paishan = new a(this.me.getChildByName('info_paishan'))),
        (this.me
          .getChildByName('root')
          .getChildByName('play').clickHandler = Laya.Handler.create(
          this,
          () => {
            r.auto_play = !r.auto_play;
          },
          null,
          !1
        )),
        (this.me
          .getChildByName('root')
          .getChildByName('nextstep').clickHandler = Laya.Handler.create(
          this,
          () => {
            r.locking_time > Laya.timer.currTimer
              ? r.auto_play && (r.auto_play = !1)
              : r.nextStep();
          },
          null,
          !1
        )),
        (this.me
          .getChildByName('root')
          .getChildByName('prestep').clickHandler = Laya.Handler.create(
          this,
          () => {
            r.preStep();
          },
          null,
          !1
        )),
        (this.me
          .getChildByName('root')
          .getChildByName('nextturn').clickHandler = Laya.Handler.create(
          this,
          () => {
            r.nextXun();
          },
          null,
          !1
        )),
        (this.me
          .getChildByName('root')
          .getChildByName('preturn').clickHandler = Laya.Handler.create(
          this,
          () => {
            r.preXun();
          },
          null,
          !1
        )),
        (this.btn_preround = this.me
          .getChildByName('root')
          .getChildByName('preround')),
        (this.btn_preround.clickHandler = Laya.Handler.create(
          this,
          () => {
            r.preRound();
          },
          null,
          !1
        )),
        (this.btn_nextround = this.me
          .getChildByName('root')
          .getChildByName('nextround')),
        (this.btn_nextround.clickHandler = Laya.Handler.create(
          this,
          () => {
            r.nextRound();
          },
          null,
          !1
        )),
        (this.img_play = this.me
          .getChildByName('root')
          .getChildByName('play')
          .getChildByName('play')),
        (this.img_stop = this.me
          .getChildByName('root')
          .getChildByName('play')
          .getChildByName('pause')),
        (this.btn_change_score = this.me.getChildByName(
          'btn_change_score'
        )),
        (this.btn_change_score.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_DesktopInfo.Inst.onBtnShowScoreDelta();
          },
          null,
          !1
        )),
        (this.paipuconfig = new n(this.me.getChildByName('config')));
    }),
    (s.prototype.onEnable = function() {
      this.paipuconfig.reset(), (t.UI_ReplayWheel.Inst.enable = !0);
    }),
    (s.prototype.onDisable = () => {
      t.UI_ReplayWheel.Inst.enable = !1;
    }),
    (s.prototype._isRoundEnd = t => 'RecordNoTile' == t || 'RecordLiuJu' == t || 'RecordHule' == t),
    (s.prototype.initData = function(t) {
      this.data = t;
      const e = t.game;
      const i = t.record;
      let n = null;
      let a = 0;
      this.rounds = [];
      for (let r = 0; r < e.records.length; r++) {
        a += e.records[r].length;
        const s = net.MessageWrapper.decodeMessage(e.records[r]), o = s.$type.name, l = { name: o, data: s };
        null == n && (n = { xun: [], actions: [] }),
          n.actions.push(l),
          this._isRoundEnd(o) &&
            (this.pengding_xun(n), this.rounds.push(n), (n = null));
      }
      null != n && app.Log.Error('最后一份牌谱没有结束'),
        (this.gameResult = i),
        (this.action_index = -1),
        (this.round_index = -1),
        (this.label_chang.text = '东'),
        (this.label_ju.text = '1'),
        (this.label_xun.text = '0'),
        (this.auto_play = !1);
      const h = [];
      'en' != GameMgr.client_language
        ? (h.push(this.label_xun.parent.getChildByName('xun')),
          h.push(this.label_xun.parent.getChildByName('turn')))
        : (h.push(this.label_xun.parent.getChildByName('turn')),
          h.push(this.label_xun.parent.getChildByName('xun'))),
        game.Tools.sprite_align_center(h, 80, [5]),
        app.Log.log(`牌谱大小：${a}B`);
    }),
    (s.prototype.reset = function() {
      (this.auto_play = !1),
        this.page_chang.enable && this.page_chang.close(),
        this.page_xun.enable && this.page_xun.close(),
        this.page_paishan.me.visible && (this.page_paishan.me.visible = !1);
    }),
    (s.prototype.pengding_xun = t => {
      t.xun = [];
      for (
        let e = view.DesktopMgr.Inst.seat, i = !1, n = 0;
        n < t.actions.length;
        n++
      ) {
        const a = t.actions[n];
        'RecordNewRound' == a.name
          ? a.data.ju == e && ((i = !0), t.xun.push(n))
          : 'RecordDealTile' == a.name || 'RecordChiPengGang' == a.name
          ? a.data.seat == e && (i || ((i = !0), t.xun.push(n)))
          : ('RecordDiscardTile' != a.name &&
              'RecordAnGangAddGang' != a.name &&
              'RecordBaBei' != a.name) ||
            (i = !1);
      }
    }),
    (s.prototype.get_currentxun = function() {
      const t = this.rounds[this.round_index];
      if (0 == t.xun.length) return 1;
      for (var e = t.xun.length, i = 0; i < t.xun.length; i++)
        if (this.action_index < t.xun[i]) {
          e = i;
          break;
        }
      return e < 0 && (e = 0), e;
    }),
    (s.prototype.nextStep = function(e) {
      if (
        (void 0 === e && (e = !1),
        (e || !(this.locking_time > Laya.timer.currTimer)) &&
          !(this.round_index >= this.rounds.length))
      ) {
        if (
          this.round_index < 0 ||
          this.rounds[this.round_index].actions.length <=
            this.action_index + 1
        ) {
          if (
            (this.round_index++,
            (this.action_index = 0),
            this.round_index == this.rounds.length)
          )
            return (
              (view.DesktopMgr.Inst.gameEndResult = this.gameResult.result),
              (this.enable = !1),
              void t.UIMgr.Inst.ShowGameEnd()
            );
        } else this.action_index++;
        (this.btn_nextround.visible = this.rounds.length > 1),
          (this.btn_preround.visible = this.rounds.length > 1),
          (this.locking_time =
            Laya.timer.currTimer +
            this.doRecord(
              this.rounds[this.round_index].actions[this.action_index]
            )),
          this._refreshBarshow();
      }
    }),
    (s.prototype._refreshBarshow = function() {
      let t = '';
      if ('chs' == GameMgr.client_language)
        switch (view.DesktopMgr.Inst.index_change % 4) {
          case 0:
            t += '东';
            break;
          case 1:
            t += '南';
            break;
          case 2:
            t += '西';
            break;
          case 3:
            t += '北';
        }
      else if ('jp' == GameMgr.client_language)
        switch (view.DesktopMgr.Inst.index_change % 4) {
          case 0:
            t += '東';
            break;
          case 1:
            t += '南';
            break;
          case 2:
            t += '西';
            break;
          case 3:
            t += '北';
        }
      else
        switch (view.DesktopMgr.Inst.index_change % 4) {
          case 0:
            t += 'East';
            break;
          case 1:
            t += 'South';
            break;
          case 2:
            t += 'West';
            break;
          case 3:
            t += 'North';
        }
      (this.label_chang.text = t),
        (this.label_ju.text = (
          view.DesktopMgr.Inst.index_ju + 1
        ).toString());
      this.label_xun.text = this.get_currentxun().toString();
      const e = [];
      'en' != GameMgr.client_language
        ? (e.push(this.label_xun.parent.getChildByName('xun')),
          e.push(this.label_xun.parent.getChildByName('turn')))
        : (e.push(this.label_xun.parent.getChildByName('turn')),
          e.push(this.label_xun.parent.getChildByName('xun'))), game.Tools.sprite_align_center(e, 80, [5]), ((t, e) => {
        for (var i = 0, n = 1; n < t.numChildren; n++)
          1 != n && (i += 3),
            (i += (r = t.getChildAt(n)).textField.textWidth * r.scaleX);
        for (let a = t.width / 2 - i / 2, n = 1; n < t.numChildren; n++) {
          var r = t.getChildAt(n);
          (r.x = a),
            (a += r.textField.textWidth * r.scaleX + 3),
            'haolong' == r.font ? (r.y = e + 3) : (r.y = e);
        }
      })(this.label_chang.parent, 40);
    }),
    (s.prototype.doRecord = function({name, data}) {
      try {
        var e = 0;
        switch (name) {
          case 'RecordNewRound':
            e = view.ActionNewRound.record(data) + (this._auto_play, 0);
            break;
          case 'RecordDiscardTile':
            e =
              view.ActionDiscardTile.record(data) +
              (this._auto_play ? 500 : 0);
            break;
          case 'RecordDealTile':
            e =
              view.ActionDealTile.record(data) +
              (this._auto_play ? 500 : 0);
            break;
          case 'RecordChiPengGang':
            e =
              view.ActionChiPengGang.record(data) +
              (this._auto_play ? 500 : 0);
            break;
          case 'RecordAnGangAddGang':
            e =
              view.ActionAnGangAddGang.record(data) +
              (this._auto_play ? 200 : 0);
            break;
          case 'RecordBaBei':
            e =
              view.ActionBabei.record(data) + (this._auto_play ? 200 : 0);
            break;
          case 'RecordHule':
            e = view.ActionHule.record(data);
            break;
          case 'RecordLiuJu':
            e = view.ActionLiuJu.record(data);
            break;
          case 'RecordNoTile':
            e = view.ActionNoTile.record(data);
        }
        return ('RecordNewRound' != name && 'RecordDealTile' != name) ||
          this.page_paishan.refresh(),
        e
      ;
      } catch (e) {
        const i = {};
        return (i.error = e.message),
        (i.stack = e.stack),
        (i.method = 'ui_replay doRecord'),
        (i.name = name),
        (i.data = data),
        GameMgr.Inst.onFatalError(i),
        1e6
      ;
      }
    }),
    (s.prototype.doFastRecord = function({name, data}) {
      try {
        switch (name) {
          case 'RecordNewRound':
            view.ActionNewRound.fastrecord(data);
            break;
          case 'RecordDiscardTile':
            view.ActionDiscardTile.fastrecord(data);
            break;
          case 'RecordDealTile':
            view.ActionDealTile.fastrecord(data);
            break;
          case 'RecordChiPengGang':
            view.ActionChiPengGang.fastrecord(data);
            break;
          case 'RecordAnGangAddGang':
            view.ActionAnGangAddGang.fastrecord(data);
            break;
          case 'RecordHule':
            view.ActionHule.fastrecord(data);
            break;
          case 'RecordLiuJu':
            view.ActionLiuJu.fastrecord(data);
            break;
          case 'RecordNoTile':
            view.ActionNoTile.fastrecord(data);
            break;
          case 'RecordBaBei':
            view.ActionBabei.fastrecord(data);
        }
        ('RecordNewRound' != name && 'RecordDealTile' != name) ||
          this.page_paishan.refresh();
      } catch (i) {
        const e = {};
        return (e.error = i.message),
        (e.stack = i.stack),
        (e.method = 'ui_replay doRecord'),
        (e.name = name),
        (e.data = data),
        GameMgr.Inst.onFatalError(e),
        1e6
      ;
      }
      return 0;
    }),
    (s.prototype.update = function() {
      !this.auto_play ||
        this.locking_time > Laya.timer.currTimer ||
        (this.round_index >= 0 &&
          this.round_index < this.rounds.length &&
          this.action_index + 1 <
            this.rounds[this.round_index].actions.length &&
          this.nextStep());
    }),
    (s.prototype.jumpToLastRoundXun = function() {
      if (this.locking_time > Laya.timer.currTimer)
        this.auto_play && (this.auto_play = !1);
      else {
        this.round_index =
          (this.round_index - 1 + this.rounds.length) % this.rounds.length;
        const t = this.rounds[this.round_index];
        let e = t.actions.length - 3;
        e < 1 && (e = 1);
        for (let i = 0; i < e; i++) this.doFastRecord(t.actions[i]);
        (this.action_index = e - 1), this.nextStep();
      }
    }),
    (s.prototype.nextXun = function() {
      if (this.locking_time > Laya.timer.currTimer)
        this.auto_play && (this.auto_play = !1);
      else if (
        !(this.round_index >= this.rounds.length || this.round_index < 0)
      ) {
        const t = this.rounds[this.round_index];
        if (this.action_index != t.actions.length - 1) {
          let e = 0;
          if (0 == t.xun.length) e = t.actions.length - 1;
          else if (t.xun[0] > this.action_index) e = t.xun[0];
          else {
            const i = this.get_currentxun();
            e = i == t.xun.length ? t.actions.length - 1 : t.xun[i];
          }
          for (let n = this.action_index + 1; n < e; n++)
            this.doFastRecord(t.actions[n]);
          (this.action_index = e - 1), this.nextStep();
        }
      }
    }),
    (s.prototype.preXun = function() {
      if (this.locking_time > Laya.timer.currTimer)
        this.auto_play && (this.auto_play = !1);
      else if (
        !(this.round_index >= this.rounds.length || this.round_index < 0)
      ) {
        const t = this.rounds[this.round_index];
        if (0 != this.action_index) {
          let e = 0;
          if (0 == t.xun.length) e = 0;
          else if (t.xun[0] > this.action_index) e = 0;
          else {
            const i = this.get_currentxun() - 1;
            e = 0 == i ? 0 : t.xun[i - 1];
          }
          for (let n = 0; n < e; n++) this.doFastRecord(t.actions[n]);
          (this.action_index = e - 1), this.nextStep();
        } else this.jumpToLastRoundXun();
      }
    }),
    (s.prototype.preStep = function() {
      if (this.locking_time > Laya.timer.currTimer)
        this.auto_play && (this.auto_play = !1);
      else if (
        !(this.round_index >= this.rounds.length || this.round_index < 0)
      ) {
        const t = this.rounds[this.round_index];
        if (0 != this.action_index) {
          for (var e = this.action_index - 1, i = 0; i < e; i++)
            this.doFastRecord(t.actions[i]);
          (this.action_index = e - 1), this.nextStep();
        } else this.jumpToLastRoundXun();
      }
    }),
    (s.prototype.nextRound = function() {
      this.page_xun.enable && this.page_xun.close(),
        this.locking_time > Laya.timer.currTimer
          ? this.auto_play && (this.auto_play = !1)
          : ((this.round_index =
              (this.round_index + 1) % this.rounds.length),
            (this.action_index = -1),
            this.nextStep());
    }),
    (s.prototype.preRound = function() {
      this.page_xun.enable && this.page_xun.close(),
        this.locking_time > Laya.timer.currTimer
          ? this.auto_play && (this.auto_play = !1)
          : ((this.round_index =
              (this.round_index - 1 + this.rounds.length) %
              this.rounds.length),
            (this.action_index = -1),
            this.nextStep());
    }),
    (s.prototype.jumpRound = function(t) {
      this.page_xun.enable && this.page_xun.close(),
        this.locking_time > Laya.timer.currTimer
          ? this.auto_play && (this.auto_play = !1)
          : t < 0 ||
            t >= this.rounds.length ||
            ((this.round_index = t),
            (this.action_index = -1),
            this.nextStep());
    }),
    (s.prototype.jumpXun = function(t) {
      if (this.locking_time > Laya.timer.currTimer)
        this.auto_play && (this.auto_play = !1);
      else if (
        !(this.round_index >= this.rounds.length || this.round_index < 0)
      ) {
        const e = this.rounds[this.round_index];
        let i = 0;
        i = 0 == e.xun.length ? 0 : 0 == t ? 0 : e.xun[t - 1];
        for (let n = 0; n < i; n++) this.doFastRecord(e.actions[n]);
        (this.action_index = i - 1), this.nextStep();
      }
    }),
    (s.prototype.onWheelClick = function() {
      if (!this.page_chang.locking && !this.page_xun.locking)
        return this.page_chang.enable || this.page_xun.enable
          ? (this.page_chang.enable && this.page_chang.close(),
            void (this.page_xun.enable && this.page_xun.close()))
          : void this.nextStep();
    }),
    (s.prototype.onChangeMainBody = function() {
      const t = this.round_index, e = this.action_index;
      if (
        (this.initData(this.data),
        this.reset(),
        !(t >= this.rounds.length || t < 0))
      ) {
        for (var i = this.rounds[t], n = e, a = 0; a <= n; a++)
          this.doFastRecord(i.actions[a]);
        (this.round_index = t),
          (this.action_index = n),
          this._refreshBarshow();
      }
    }),
    (s.Inst = null),
    s
  ;
  })(t.UIBase);

  t.UI_Replay = r;
})(uiscript || (uiscript = {}));