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
  var e = (function() {
      function t(t, e, i, n, a) {
        var r = this;
        (this.isopen = !1),
          (this.locking = !1),
          (this.showed = !1),
          (this.when_close = null),
          (this.when_choose = null),
          (this.datas = []),
          (this.start_rate = 0),
          (this.me = t),
          (t.visible = !1),
          (this.isopen = !1),
          (this.locking = !1),
          (this.when_close = e),
          (this.when_choose = i),
          (this.datas = n),
          (this.start_rate = a),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            new Laya.Handler(this, this.refresh_item)
          ),
          (this.bg = this.me.getChildByName('bg')),
          (this.content = this.me.getChildByName('content')),
          (t.getChildByName('btn_open').clickHandler = new Laya.Handler(
            this,
            function() {
              r.locking || (r.isopen ? r.close() : r.show());
            }
          ));
      }
      return (
        (t.prototype.reset = function() {
          (this.isopen = !1),
            (this.locking = !1),
            (this.me.visible = !0),
            (this.bg.visible = !1),
            (this.content.visible = !1);
        }),
        (t.prototype.show = function() {
          var t = this;
          (this.locking = !0),
            (this.isopen = !0),
            (this.bg.visible = !0),
            (this.bg.height = 10),
            Laya.Tween.to(this.bg, { height: 285 }, 150, Laya.Ease.linearNone),
            (this.content.visible = !0),
            (this.content.alpha = 0),
            Laya.Tween.to(
              this.content,
              { alpha: 1 },
              150,
              Laya.Ease.linearNone
            ),
            Laya.timer.once(150, this, function() {
              t.locking = !1;
            }),
            this.showed ||
              (this.scrollview.reset(),
              this.scrollview.addItem(this.datas.length),
              (this.showed = !0),
              (this.scrollview.rate = this.start_rate));
        }),
        (t.prototype.refresh_item = function(t) {
          var e = this,
            i = t.index,
            n = t.container;
          (n.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.close(), e.when_choose && e.when_choose.runWith(e.datas[i]));
            },
            null,
            !1
          )),
            (n.getChildByName('btn').getChildByName('txt').text = this.datas[
              i
            ]);
        }),
        (t.prototype.close = function() {
          var t = this;
          (this.locking = !0),
            Laya.Tween.to(
              this.content,
              { alpha: 0 },
              150,
              Laya.Ease.linearNone
            ),
            Laya.Tween.to(this.bg, { height: 10 }, 150, Laya.Ease.linearNone),
            Laya.timer.once(150, this, function() {
              (t.locking = !1),
                (t.bg.visible = !1),
                (t.content.visible = !1),
                (t.isopen = !1),
                t.when_close && t.when_close.run();
            });
        }),
        t
      );
    })(),
    i = (function() {
      function t(t, i, n) {
        var a = this;
        (this.locking = !1),
          (this.me = t),
          (t.visible = !1),
          (this.me.getChildByName('btn_close').clickHandler = new Laya.Handler(
            this,
            function() {
              a.dropdown_mouth.locking ||
                a.dropdown_year.locking ||
                (a.dropdown_mouth.isopen && a.dropdown_mouth.close(),
                a.dropdown_year.isopen && a.dropdown_year.close());
            }
          ));
        this.dropdown_mouth = new e(
          this.me.getChildByName('container_month'),
          new Laya.Handler(this, function() {
            a._OnStateChange(), i.runWith('');
          }),
          new Laya.Handler(this, function(t) {
            return i.runWith(t);
          }),
          [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12'
          ],
          0
        );
        for (var r = new Date(Date.now()), s = [], o = 0; o < 120; o++)
          s.push((r.getFullYear() - 120 + o).toString());
        this.dropdown_year = new e(
          this.me.getChildByName('container_year'),
          new Laya.Handler(this, function() {
            a._OnStateChange(), n.runWith('');
          }),
          new Laya.Handler(this, function(t) {
            return n.runWith(t);
          }),
          s,
          1
        );
      }
      return (
        (t.prototype.show = function(t) {
          this.dropdown_mouth.reset(),
            this.dropdown_year.reset(),
            (this.me.visible = !0),
            t ? this.dropdown_mouth.show() : this.dropdown_year.show();
        }),
        (t.prototype._OnStateChange = function() {
          this.dropdown_year.isopen ||
            this.dropdown_mouth.isopen ||
            (this.me.visible = !1);
        }),
        t
      );
    })(),
    n = (function(e) {
      function n() {
        var t = e.call(this, new ui.lobby.agependingUI()) || this;
        return (
          (t.color_hint = '#5A82C8'),
          (t.color_wrong = '#FF3030'),
          (n.Inst = t),
          t
        );
      }
      return (
        __extends(n, e),
        (n.prototype.onCreate = function() {
          var t = this;
          (this.root = this.me
            .getChildByName('agepending')
            .getChildByName('root')),
            (this.btn_confirm = this.root.getChildByName('btn_confirm')),
            (this.btn_close = this.root.getChildByName('btn_close'));
          var e = this.me.getChildByName('agepending').getChildByName('root');
          (this.btn_month = e.getChildByName('month')),
            (this.btn_month.clickHandler = new Laya.Handler(this, function() {
              t.locking || t.date_dropdown.show(!0);
            })),
            (this.txt_month = this.btn_month.getChildByName('txt')),
            (this.btn_year = e.getChildByName('year')),
            (this.btn_year.clickHandler = new Laya.Handler(this, function() {
              t.locking || t.date_dropdown.show(!1);
            })),
            (this.txt_year = this.btn_year.getChildByName('txt')),
            (this.notice_month = e.getChildByName('notice_month')),
            (this.notice_year = e.getChildByName('notice_year')),
            (this.date_dropdown = new i(
              this.me
                .getChildByName('agepending')
                .getChildByName('container_dropdown'),
              new Laya.Handler(this, function(e) {
                '' != e && (t.txt_month.text = e), t.pending_month();
              }),
              new Laya.Handler(this, function(e) {
                '' != e && (t.txt_year.text = e), t.pending_year();
              })
            )),
            (this.btn_confirm.clickHandler = Laya.Handler.create(
              this,
              function() {
                t.locking || t.onClickConfirm();
              },
              null,
              !1
            )),
            (this.btn_close.clickHandler = Laya.Handler.create(
              this,
              function() {
                t.locking || t.close();
              },
              null,
              !1
            ));
        }),
        (n.prototype.onClickConfirm = function() {
          var e = !0,
            i = '0',
            n = '0';
          if (
            (this.pending_month() || (e = !1),
            this.pending_year() || (e = !1),
            (i = this.txt_year.text),
            (n = this.txt_month.text),
            e)
          ) {
            var a = parseInt(i),
              r = parseInt(n),
              s = new Date(),
              o = 12 * s.getFullYear() + s.getMonth() - 12 * a - r,
              l = Math.floor(o / 12),
              h = 0;
            (h = l < 16 ? 5e3 : l < 20 ? 2e4 : -1),
              t.UI_Ageconfirm.Inst.show(i, n, h),
              this.close();
          }
        }),
        (n.prototype.pending_month = function() {
          return this.txt_month.text != game.Tools.strOfLocalization(2729)
            ? ((this.notice_month.text = ''), !0)
            : ((this.notice_month.text = game.Tools.strOfLocalization(2733)),
              (this.notice_month.color = this.color_wrong),
              !1);
        }),
        (n.prototype.pending_year = function() {
          return this.txt_year.text != game.Tools.strOfLocalization(2730)
            ? ((this.notice_year.text = ''), !0)
            : ((this.notice_year.text = game.Tools.strOfLocalization(2734)),
              (this.notice_year.color = this.color_wrong),
              !1);
        }),
        (n.prototype.show = function() {
          var e = this;
          (this.enable = !0),
            (this.locking = !0),
            (this.confirmflag = 0),
            (this.date_dropdown.me.visible = !1),
            (this.notice_month.text = game.Tools.strOfLocalization(2731)),
            (this.notice_month.color = this.color_hint),
            (this.notice_year.text = game.Tools.strOfLocalization(2732)),
            (this.notice_year.color = this.color_hint),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = !1;
              })
            );
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.enable = !1);
              })
            );
        }),
        n
      );
    })(t.UIBase);
  t.UI_Agepending = n;
})(uiscript || (uiscript = {}));