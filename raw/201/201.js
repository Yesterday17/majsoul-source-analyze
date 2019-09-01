var uiscript;
!(function(t) {
  var e = (function() {
      function e(t) {
        var e = this;
        (this.rounds = []),
          (this.locking = false),
          (this.enable = false),
          (this.me = t),
          (this.me.visible = false),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.renderInfo, null, false)
          ),
          (this.btn_up = this.me.getChildByName('up')),
          (this.btn_down = this.me.getChildByName('down')),
          (this.btn_up.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.scrollview.scrollDelta(-100);
            },
            null,
            false
          )),
          (this.btn_down.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.scrollview.scrollDelta(100);
            },
            null,
            false
          )),
          this.scrollview.me.on('ratechange', this, function() {
            (e.btn_up.visible = e.scrollview.rate > 0),
              (e.btn_down.visible =
                e.scrollview.need_scroll && e.scrollview.rate < 1);
          }),
          (this.enable = false);
      }
      return (
        (e.prototype.show = function(e) {
          var i = this;
          (this.enable = true),
            (this.locking = true),
            (this.me.visible = true),
            this.scrollview.reset(),
            (this.rounds = e);
          for (var n = 0; n < e.length; n++) {
            var a = this.caluH(e[n]);
            a, this.scrollview.addItem(1, a);
          }
          t.UIBase.anim_alpha_in(
            this.me,
            { y: 30 },
            120,
            0,
            Laya.Handler.create(this, function() {
              i.locking = false;
            })
          ),
            (this.btn_up.visible = false),
            (this.btn_down.visible = this.scrollview.need_scroll);
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.enable = false),
            (this.locking = true),
            t.UIBase.anim_alpha_out(
              this.me,
              { y: 30 },
              120,
              0,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.me.visible = false);
              })
            );
        }),
        (e.prototype.caluH = function(t) {
          var e = t.actions[t.actions.length - 1];
          if ('RecordNoTile' == e.name) {
            for (
              var i = e.data, n = [], a = 0;
              a < view.DesktopMgr.Inst.player_count;
              a++
            )
              n.push({ old_score: i.scores[0].old_scores[a], delta: 0 });
            for (a = 0; a < i.scores.length; a++)
              for (var r = 0; r < view.DesktopMgr.Inst.player_count; r++)
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
        (e.prototype.renderInfo = function(t) {
          for (
            var e = this,
              i = t.index,
              n = t.container,
              a = this.rounds[i],
              s = 0;
            s < a.actions.length;
            s++
          )
            if ('RecordNewRound' == a.actions[s].name) {
              var o = undefined;
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
              for (var _ = h.width / 2 - l / 2, d = 0; d < h.numChildren; d++) {
                var f = h.getChildAt(d);
                (f.x = _),
                  (_ += f.textField.textWidth * f.scaleX + c[d]),
                  'haolong' == f.font ? (f.y = 34) : (f.y = 31);
              }
              break;
            }
          var p = a.actions[a.actions.length - 1],
            m = p.data,
            g = n,
            y = n.getChildByName('line'),
            v = n.getChildByName('liuju'),
            b = n.getChildByName('win'),
            w = n.getChildByName('lose');
          if (
            ((y.visible = false),
            (v.visible = false),
            (b.visible = false),
            (w.visible = false),
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
              b.visible = true;
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
                  ? ((M.visible = true),
                    (M.getChildByName(
                      'name'
                    ).text = view.DesktopMgr.Inst.getPlayerName(I[s])),
                    (M.getChildByName('point').text =
                      '+' + x[I[s]].delta.toString()))
                  : (M.visible = false);
              }
            } else if (
              ((b.visible = true),
              (b.getChildByName('info').text = ''),
              (v.visible = true),
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
                  ? ((M.visible = true),
                    (M.getChildByName(
                      'name'
                    ).text = view.DesktopMgr.Inst.getPlayerName(I[s])),
                    (M.getChildByName('point').text =
                      '+' + x[I[s]].delta.toString()))
                  : (M.visible = false);
              }
          } else if ('RecordLiuJu' == p.name) {
            var S = [
              '',
              game.Tools.strOfLocalization(2172),
              game.Tools.strOfLocalization(2173),
              game.Tools.strOfLocalization(2174),
              game.Tools.strOfLocalization(2175),
              game.Tools.strOfLocalization(2176)
            ];
            (v.visible = true), (v.text = S[m.type]), (g.height = 120);
          } else if (p.data.hules[0].zimo) {
            b.visible = true;
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
                M.visible = true;
                E = m.hules[0].seat;
                M.getChildByName(
                  'name'
                ).text = view.DesktopMgr.Inst.getPlayerName(E);
                D = m.delta_scores[E];
                M.getChildByName('point').text = '+' + D.toString();
              } else M.visible = false;
            }
            g.height = 120;
          } else {
            b.visible = true;
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
                M.visible = true;
                E = m.hules[s].seat;
                M.getChildByName(
                  'name'
                ).text = view.DesktopMgr.Inst.getPlayerName(E);
                D = m.delta_scores[E];
                M.getChildByName('point').text = '+' + D.toString();
              } else M.visible = false;
            }
            (y.visible = true),
              (y.y = 80 + 40 * m.hules.length),
              (w.visible = true),
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
                M.visible = true;
                for (var E = 0, L = 0; L < m.delta_scores.length; L++)
                  m.delta_scores[L] < m.delta_scores[E] && (E = L);
                M.getChildByName(
                  'name'
                ).text = view.DesktopMgr.Inst.getPlayerName(E);
                var D = m.delta_scores[E];
                M.getChildByName('point').text = D.toString();
              } else M.visible = false;
            }
            g.height = 180 + 40 * (p.data.hules.length - 1);
          }
          (g.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || (r.Inst.jumpRound(i), e.close());
            },
            null,
            false
          )),
            (n.getChildByName('bg').height = n.height - 4);
        }),
        e
      );
    })(),
    i = (function() {
      function e(t) {
        var e = this;
        (this.locking = false),
          (this.enable = false),
          (this.have0 = false),
          (this.me = t),
          (this.me.visible = false),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.renderInfo, null, false)
          ),
          (this.btn_up = this.me.getChildByName('up')),
          (this.btn_down = this.me.getChildByName('down')),
          (this.btn_up.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.scrollview.scrollDelta(-100);
            },
            null,
            false
          )),
          (this.btn_down.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.scrollview.scrollDelta(100);
            },
            null,
            false
          )),
          this.scrollview.me.on('ratechange', this, function() {
            (e.btn_up.visible = e.scrollview.rate > 0),
              (e.btn_down.visible =
                e.scrollview.need_scroll && e.scrollview.rate < 1);
          }),
          (this.enable = false);
      }
      return (
        (e.prototype.show = function(e, i) {
          var n = this;
          (this.enable = true),
            (this.locking = true),
            (this.have0 = i),
            (this.me.visible = true),
            this.scrollview.reset(),
            this.scrollview.addItem(e + (i ? 1 : 0)),
            t.UIBase.anim_alpha_in(
              this.me,
              { y: 30 },
              100,
              0,
              Laya.Handler.create(this, function() {
                n.locking = false;
              })
            ),
            (this.btn_up.visible = false),
            (this.btn_down.visible = this.scrollview.need_scroll);
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.enable = false),
            (this.locking = true),
            t.UIBase.anim_alpha_out(
              this.me,
              { y: 30 },
              100,
              0,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.me.visible = false);
              })
            );
        }),
        (e.prototype.renderInfo = function(t) {
          var e = this,
            i = t.index,
            n = t.container;
          (n.getChildByName('num').text = (
            i + (this.have0 ? 0 : 1)
          ).toString()),
            (n.clickHandler = Laya.Handler.create(
              this,
              function() {
                e.locking || (r.Inst.jumpXun(i + (e.have0 ? 0 : 1)), e.close());
              },
              null,
              false
            ));
          var a = n,
            s = [];
          'en' == GameMgr.client_language
            ? (s.push(a.getChildByName('xun')), s.push(a.getChildByName('num')))
            : (s.push(a.getChildByName('num')),
              s.push(a.getChildByName('xun'))),
            game.Tools.sprite_align_center(s, 115, [10]);
          for (var o = 1; o < a.numChildren; o++) {
            var l = a.getChildAt(o);
            'haolong' == l.font ? (l.y = 42) : (l.y = 39);
          }
        }),
        e
      );
    })(),
    n = (function() {
      function t(t) {
        var e = this;
        (this._show_hand = false),
          (this._show_paopai = false),
          (this.me = t),
          (this._btn_out = this.me.getChildByName('btn_out')),
          (this._btn_out.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.switch();
            },
            null,
            false
          )),
          (this.me.getChildByName(
            'btn_shoupai'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              (e._show_hand = !e._show_hand),
                (e._choosed_show_hand.visible = e._show_hand),
                view.DesktopMgr.Inst.onShowHandChange(e._show_hand);
            },
            null,
            false
          )),
          (this._choosed_show_paopai = this.me
            .getChildByName('btn_paopai')
            .getChildByName('choosed')),
          (this.me.getChildByName(
            'btn_paopai'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              (e._show_paopai = !e._show_paopai),
                (e._choosed_show_paopai.visible = e._show_paopai),
                view.DesktopMgr.Inst.onShowPaopaiChange(e._show_paopai);
            },
            null,
            false
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
      return (
        (t.prototype.reset = function() {
          Laya.Tween.clearAll(this),
            (this._show_hand = true),
            (this.me.x = -258),
            (this._btn_out.disabled = false),
            (this._choosed_show_hand.visible = this._show_hand),
            (this._show_paopai = true),
            (this._choosed_show_paopai.visible = this._show_paopai);
        }),
        (t.prototype.switch = function() {
          var t = this,
            e = -258;
          this.me.x < -100 && (e = -5),
            (this._btn_out.disabled = true),
            Laya.Tween.to(
              this.me,
              { x: e },
              200,
              Laya.Ease.strongOut,
              Laya.Handler.create(this, function() {
                t._btn_out.disabled = false;
              }),
              0,
              true,
              true
            );
        }),
        t
      );
    })(),
    a = (function() {
      function e(e) {
        var i = this;
        (this.tiles = []),
          (this.container_input = null),
          (this.tile_count = 0),
          (this.gray_filter = null),
          (this.dora_filter = null),
          (this.lidora_filter = null),
          (this.noinfo = true),
          (this.locking = false),
          (this.enable = false),
          (this.me = e),
          (this.root = e.getChildByName('root')),
          (this.content = this.root.getChildByName('content')),
          (this.content.vScrollBarSkin = '');
        var n = this.content.getChildByName('tile_templete');
        n.visible = false;
        for (var a = 0; a < 100; a++) {
          var r = n.scriptMap['capsui.UICopy'].getNodeClone();
          (r.visible = false), this.tiles.push(r);
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
            function() {
              i.locking || t.UI_Info_MD5.Inst.show();
            },
            null,
            false
          ));
      }
      return (
        (e.prototype.setTiles = function(t) {
          this.tile_count = Math.floor(t.length / 2);
          for (
            var e = 'myres2/mjp/' + GameMgr.Inst.mjp_view + '/ui/', i = 0;
            2 * i + 1 < t.length;
            i++
          )
            (this.tiles[i].skin = game.Tools.localUISrc(
              e + t.charAt(2 * i) + t.charAt(2 * i + 1) + '.png'
            )),
              (this.tiles[i].visible = true);
          for (i = this.tile_count; i < this.tiles.length; i++)
            this.tiles[i].visible = false;
          (this.noinfo = false),
            (this.container_input.getChildByName('txtinput').text = t);
        }),
        (e.prototype.refresh = function() {
          this.me.visible && (this.noinfo || this.setInfo());
        }),
        (e.prototype.setInfo = function() {
          if (!this.noinfo) {
            var t = view.DesktopMgr.Inst.left_tile_count,
              e = view.DesktopMgr.Inst.dora.length,
              i =
                view.DesktopMgr.Inst.get_gang_count() +
                view.DesktopMgr.Inst.get_babei_count();
            i > 0 && view.DesktopMgr.Inst.waiting_lingshang_deal_tile && i--;
            var n = this.tile_count - i - 14;
            n < 0 && (n = 0);
            for (
              var a = this.tiles[0].width, r = this.tiles[0].height + 10, s = 0;
              s < n;
              s++
            ) {
              var o = 0;
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
              var h = this.tiles[s];
              (h.x = ((s - n) % 12) * a),
                (h.y = Math.floor((s - n) / 12) * r + l),
                (h.filters = []);
            }
            for (
              var c =
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
          this.noinfo = true;
        }),
        (e.prototype.show = function() {
          var e = this;
          this.locking ||
            (this.noinfo
              ? t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2179))
              : ((this.locking = true),
                (this.me.visible = true),
                this.refresh(),
                t.UIBase.anim_alpha_in(
                  this.me,
                  { y: 30 },
                  120,
                  0,
                  Laya.Handler.create(this, function() {
                    e.locking = false;
                  })
                )));
        }),
        (e.prototype.close = function() {
          var e = this;
          this.locking ||
            ((this.locking = true),
            t.UIBase.anim_alpha_out(
              this.me,
              { y: 30 },
              120,
              0,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.me.visible = false);
              })
            ));
        }),
        e
      );
    })(),
    r = (function(r) {
      function s() {
        var t = r.call(this, new ui.mj.replayUI()) || this;
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
          (t._auto_play = false),
          (s.Inst = t),
          t
        );
      }
      return (
        __extends(s, r),
        Object.defineProperty(s.prototype, 'auto_play', {
          get: function() {
            return this._auto_play;
          },
          set: function(t) {
            (this._auto_play = t),
              (this.img_play.visible = !t),
              (this.img_stop.visible = t);
          },
          enumerable: true,
          configurable: true
        }),
        (s.prototype.onCreate = function() {
          var r = this,
            s = this.me.getChildByName('root').getChildByName('round');
          (s.clickHandler = Laya.Handler.create(
            this,
            function() {
              r.page_chang.locking ||
                (r.auto_play && (r.auto_play = false),
                r.page_xun.enable && r.page_xun.close(),
                r.page_paishan.me.visible && r.page_paishan.close(),
                r.page_chang.enable
                  ? r.page_chang.close()
                  : r.page_chang.show(r.rounds));
            },
            null,
            false
          )),
            (this.label_chang = s.getChildByName('chang')),
            (this.label_ju = s.getChildByName('ju'));
          var o = this.me.getChildByName('root').getChildByName('turn');
          (this.label_xun = o.getChildByName('xun')),
            (o.clickHandler = Laya.Handler.create(
              this,
              function() {
                r.page_xun.locking ||
                  (r.auto_play && (r.auto_play = false),
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
              false
            )),
            (this.me
              .getChildByName('root')
              .getChildByName('paishan').clickHandler = Laya.Handler.create(
              this,
              function() {
                r.page_paishan.locking ||
                  (r.auto_play && (r.auto_play = false),
                  r.page_chang.enable && r.page_chang.close(),
                  r.page_xun.enable && r.page_xun.close(),
                  r.page_paishan.me.visible
                    ? r.page_paishan.close()
                    : r.page_paishan.show());
              },
              null,
              false
            )),
            (this.page_chang = new e(this.me.getChildByName('info_chang'))),
            (this.page_xun = new i(this.me.getChildByName('info_xun'))),
            (this.page_paishan = new a(this.me.getChildByName('info_paishan'))),
            (this.me
              .getChildByName('root')
              .getChildByName('play').clickHandler = Laya.Handler.create(
              this,
              function() {
                r.auto_play = !r.auto_play;
              },
              null,
              false
            )),
            (this.me
              .getChildByName('root')
              .getChildByName('nextstep').clickHandler = Laya.Handler.create(
              this,
              function() {
                r.locking_time > Laya.timer.currTimer
                  ? r.auto_play && (r.auto_play = false)
                  : r.nextStep();
              },
              null,
              false
            )),
            (this.me
              .getChildByName('root')
              .getChildByName('prestep').clickHandler = Laya.Handler.create(
              this,
              function() {
                r.preStep();
              },
              null,
              false
            )),
            (this.me
              .getChildByName('root')
              .getChildByName('nextturn').clickHandler = Laya.Handler.create(
              this,
              function() {
                r.nextXun();
              },
              null,
              false
            )),
            (this.me
              .getChildByName('root')
              .getChildByName('preturn').clickHandler = Laya.Handler.create(
              this,
              function() {
                r.preXun();
              },
              null,
              false
            )),
            (this.btn_preround = this.me
              .getChildByName('root')
              .getChildByName('preround')),
            (this.btn_preround.clickHandler = Laya.Handler.create(
              this,
              function() {
                r.preRound();
              },
              null,
              false
            )),
            (this.btn_nextround = this.me
              .getChildByName('root')
              .getChildByName('nextround')),
            (this.btn_nextround.clickHandler = Laya.Handler.create(
              this,
              function() {
                r.nextRound();
              },
              null,
              false
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
              function() {
                t.UI_DesktopInfo.Inst.onBtnShowScoreDelta();
              },
              null,
              false
            )),
            (this.paipuconfig = new n(this.me.getChildByName('config')));
        }),
        (s.prototype.onEnable = function() {
          this.paipuconfig.reset(), (t.UI_ReplayWheel.Inst.enable = true);
        }),
        (s.prototype.onDisable = function() {
          t.UI_ReplayWheel.Inst.enable = false;
        }),
        (s.prototype._isRoundEnd = function(t) {
          return 'RecordNoTile' == t || 'RecordLiuJu' == t || 'RecordHule' == t;
        }),
        (s.prototype.initData = function(t) {
          this.data = t;
          var e = t.game,
            i = t.record,
            n = null,
            a = 0;
          this.rounds = [];
          for (var r = 0; r < e.records.length; r++) {
            a += e.records[r].length;
            var s = net.MessageWrapper.decodeMessage(e.records[r]),
              o = s.$type.name,
              l = { name: o, data: s };
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
            (this.auto_play = false);
          var h = [];
          'en' != GameMgr.client_language
            ? (h.push(this.label_xun.parent.getChildByName('xun')),
              h.push(this.label_xun.parent.getChildByName('turn')))
            : (h.push(this.label_xun.parent.getChildByName('turn')),
              h.push(this.label_xun.parent.getChildByName('xun'))),
            game.Tools.sprite_align_center(h, 80, [5]),
            app.Log.log('牌谱大小：' + a + 'B');
        }),
        (s.prototype.reset = function() {
          (this.auto_play = false),
            this.page_chang.enable && this.page_chang.close(),
            this.page_xun.enable && this.page_xun.close(),
            this.page_paishan.me.visible && (this.page_paishan.me.visible = false);
        }),
        (s.prototype.pengding_xun = function(t) {
          t.xun = [];
          for (
            var e = view.DesktopMgr.Inst.seat, i = false, n = 0;
            n < t.actions.length;
            n++
          ) {
            var a = t.actions[n];
            'RecordNewRound' == a.name
              ? a.data.ju == e && ((i = true), t.xun.push(n))
              : 'RecordDealTile' == a.name || 'RecordChiPengGang' == a.name
              ? a.data.seat == e && (i || ((i = true), t.xun.push(n)))
              : ('RecordDiscardTile' != a.name &&
                  'RecordAnGangAddGang' != a.name &&
                  'RecordBaBei' != a.name) ||
                (i = false);
          }
        }),
        (s.prototype.get_currentxun = function() {
          var t = this.rounds[this.round_index];
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
            (undefined === e && (e = false),
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
                  (this.enable = false),
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
          var t = '';
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
          var e = [];
          'en' != GameMgr.client_language
            ? (e.push(this.label_xun.parent.getChildByName('xun')),
              e.push(this.label_xun.parent.getChildByName('turn')))
            : (e.push(this.label_xun.parent.getChildByName('turn')),
              e.push(this.label_xun.parent.getChildByName('xun'))),
            game.Tools.sprite_align_center(e, 80, [5]),
            (function(t, e) {
              for (var i = 0, n = 1; n < t.numChildren; n++)
                1 != n && (i += 3),
                  (i += (r = t.getChildAt(n)).textField.textWidth * r.scaleX);
              for (var a = t.width / 2 - i / 2, n = 1; n < t.numChildren; n++) {
                var r = t.getChildAt(n);
                (r.x = a),
                  (a += r.textField.textWidth * r.scaleX + 3),
                  'haolong' == r.font ? (r.y = e + 3) : (r.y = e);
              }
            })(this.label_chang.parent, 40);
        }),
        (s.prototype.doRecord = function(t) {
          try {
            var e = 0;
            switch (t.name) {
              case 'RecordNewRound':
                e = view.ActionNewRound.record(t.data) + (this._auto_play, 0);
                break;
              case 'RecordDiscardTile':
                e =
                  view.ActionDiscardTile.record(t.data) +
                  (this._auto_play ? 500 : 0);
                break;
              case 'RecordDealTile':
                e =
                  view.ActionDealTile.record(t.data) +
                  (this._auto_play ? 500 : 0);
                break;
              case 'RecordChiPengGang':
                e =
                  view.ActionChiPengGang.record(t.data) +
                  (this._auto_play ? 500 : 0);
                break;
              case 'RecordAnGangAddGang':
                e =
                  view.ActionAnGangAddGang.record(t.data) +
                  (this._auto_play ? 200 : 0);
                break;
              case 'RecordBaBei':
                e =
                  view.ActionBabei.record(t.data) + (this._auto_play ? 200 : 0);
                break;
              case 'RecordHule':
                e = view.ActionHule.record(t.data);
                break;
              case 'RecordLiuJu':
                e = view.ActionLiuJu.record(t.data);
                break;
              case 'RecordNoTile':
                e = view.ActionNoTile.record(t.data);
            }
            return (
              ('RecordNewRound' != t.name && 'RecordDealTile' != t.name) ||
                this.page_paishan.refresh(),
              e
            );
          } catch (e) {
            var i = {};
            return (
              (i.error = e.message),
              (i.stack = e.stack),
              (i.method = 'ui_replay doRecord'),
              (i.name = t.name),
              (i.data = t.data),
              GameMgr.Inst.onFatalError(i),
              1e6
            );
          }
        }),
        (s.prototype.doFastRecord = function(t) {
          try {
            switch (t.name) {
              case 'RecordNewRound':
                view.ActionNewRound.fastrecord(t.data);
                break;
              case 'RecordDiscardTile':
                view.ActionDiscardTile.fastrecord(t.data);
                break;
              case 'RecordDealTile':
                view.ActionDealTile.fastrecord(t.data);
                break;
              case 'RecordChiPengGang':
                view.ActionChiPengGang.fastrecord(t.data);
                break;
              case 'RecordAnGangAddGang':
                view.ActionAnGangAddGang.fastrecord(t.data);
                break;
              case 'RecordHule':
                view.ActionHule.fastrecord(t.data);
                break;
              case 'RecordLiuJu':
                view.ActionLiuJu.fastrecord(t.data);
                break;
              case 'RecordNoTile':
                view.ActionNoTile.fastrecord(t.data);
                break;
              case 'RecordBaBei':
                view.ActionBabei.fastrecord(t.data);
            }
            ('RecordNewRound' != t.name && 'RecordDealTile' != t.name) ||
              this.page_paishan.refresh();
          } catch (i) {
            var e = {};
            return (
              (e.error = i.message),
              (e.stack = i.stack),
              (e.method = 'ui_replay doRecord'),
              (e.name = t.name),
              (e.data = t.data),
              GameMgr.Inst.onFatalError(e),
              1e6
            );
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
            this.auto_play && (this.auto_play = false);
          else {
            this.round_index =
              (this.round_index - 1 + this.rounds.length) % this.rounds.length;
            var t = this.rounds[this.round_index],
              e = t.actions.length - 3;
            e < 1 && (e = 1);
            for (var i = 0; i < e; i++) this.doFastRecord(t.actions[i]);
            (this.action_index = e - 1), this.nextStep();
          }
        }),
        (s.prototype.nextXun = function() {
          if (this.locking_time > Laya.timer.currTimer)
            this.auto_play && (this.auto_play = false);
          else if (
            !(this.round_index >= this.rounds.length || this.round_index < 0)
          ) {
            var t = this.rounds[this.round_index];
            if (this.action_index != t.actions.length - 1) {
              var e = 0;
              if (0 == t.xun.length) e = t.actions.length - 1;
              else if (t.xun[0] > this.action_index) e = t.xun[0];
              else {
                var i = this.get_currentxun();
                e = i == t.xun.length ? t.actions.length - 1 : t.xun[i];
              }
              for (var n = this.action_index + 1; n < e; n++)
                this.doFastRecord(t.actions[n]);
              (this.action_index = e - 1), this.nextStep();
            }
          }
        }),
        (s.prototype.preXun = function() {
          if (this.locking_time > Laya.timer.currTimer)
            this.auto_play && (this.auto_play = false);
          else if (
            !(this.round_index >= this.rounds.length || this.round_index < 0)
          ) {
            var t = this.rounds[this.round_index];
            if (0 != this.action_index) {
              var e = 0;
              if (0 == t.xun.length) e = 0;
              else if (t.xun[0] > this.action_index) e = 0;
              else {
                var i = this.get_currentxun() - 1;
                e = 0 == i ? 0 : t.xun[i - 1];
              }
              for (var n = 0; n < e; n++) this.doFastRecord(t.actions[n]);
              (this.action_index = e - 1), this.nextStep();
            } else this.jumpToLastRoundXun();
          }
        }),
        (s.prototype.preStep = function() {
          if (this.locking_time > Laya.timer.currTimer)
            this.auto_play && (this.auto_play = false);
          else if (
            !(this.round_index >= this.rounds.length || this.round_index < 0)
          ) {
            var t = this.rounds[this.round_index];
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
              ? this.auto_play && (this.auto_play = false)
              : ((this.round_index =
                  (this.round_index + 1) % this.rounds.length),
                (this.action_index = -1),
                this.nextStep());
        }),
        (s.prototype.preRound = function() {
          this.page_xun.enable && this.page_xun.close(),
            this.locking_time > Laya.timer.currTimer
              ? this.auto_play && (this.auto_play = false)
              : ((this.round_index =
                  (this.round_index - 1 + this.rounds.length) %
                  this.rounds.length),
                (this.action_index = -1),
                this.nextStep());
        }),
        (s.prototype.jumpRound = function(t) {
          this.page_xun.enable && this.page_xun.close(),
            this.locking_time > Laya.timer.currTimer
              ? this.auto_play && (this.auto_play = false)
              : t < 0 ||
                t >= this.rounds.length ||
                ((this.round_index = t),
                (this.action_index = -1),
                this.nextStep());
        }),
        (s.prototype.jumpXun = function(t) {
          if (this.locking_time > Laya.timer.currTimer)
            this.auto_play && (this.auto_play = false);
          else if (
            !(this.round_index >= this.rounds.length || this.round_index < 0)
          ) {
            var e = this.rounds[this.round_index],
              i = 0;
            i = 0 == e.xun.length ? 0 : 0 == t ? 0 : e.xun[t - 1];
            for (var n = 0; n < i; n++) this.doFastRecord(e.actions[n]);
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
          var t = this.round_index,
            e = this.action_index;
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
      );
    })(t.UIBase);
  t.UI_Replay = r;
})(uiscript || (uiscript = {}));