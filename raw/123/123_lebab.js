let uiscript;
!(t => {
  const e = (() => {
      function t(t, e, i, n, a) {
        const r = this;
        (this.isopen = false),
          (this.locking = false),
          (this.showed = false),
          (this.when_close = null),
          (this.when_choose = null),
          (this.datas = []),
          (this.start_rate = 0),
          (this.me = t),
          (t.visible = false),
          (this.isopen = false),
          (this.locking = false),
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
            () => {
              r.locking || (r.isopen ? r.close() : r.show());
            }
          ));
      }
      return (t.prototype.reset = function() {
        (this.isopen = false),
          (this.locking = false),
          (this.me.visible = true),
          (this.bg.visible = false),
          (this.content.visible = false);
      }),
      (t.prototype.show = function() {
        const t = this;
        (this.locking = true),
          (this.isopen = true),
          (this.bg.visible = true),
          (this.bg.height = 10),
          Laya.Tween.to(this.bg, { height: 285 }, 150, Laya.Ease.linearNone),
          (this.content.visible = true),
          (this.content.alpha = 0),
          Laya.Tween.to(
            this.content,
            { alpha: 1 },
            150,
            Laya.Ease.linearNone
          ),
          Laya.timer.once(150, this, () => {
            t.locking = false;
          }),
          this.showed ||
            (this.scrollview.reset(),
            this.scrollview.addItem(this.datas.length),
            (this.showed = true),
            (this.scrollview.rate = this.start_rate));
      }),
      (t.prototype.refresh_item = function({index, container}) {
        const e = this, i = index, n = container;
        (n.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              (e.close(), e.when_choose && e.when_choose.runWith(e.datas[i]));
          },
          null,
          false
        )),
          (n.getChildByName('btn').getChildByName('txt').text = this.datas[
            i
          ]);
      }),
      (t.prototype.close = function() {
        const t = this;
        (this.locking = true),
          Laya.Tween.to(
            this.content,
            { alpha: 0 },
            150,
            Laya.Ease.linearNone
          ),
          Laya.Tween.to(this.bg, { height: 10 }, 150, Laya.Ease.linearNone),
          Laya.timer.once(150, this, () => {
            (t.locking = false),
              (t.bg.visible = false),
              (t.content.visible = false),
              (t.isopen = false),
              t.when_close && t.when_close.run();
          });
      }),
      t
    ;
    })();

  const i = (() => {
    function t(t, i, n) {
      const a = this;
      (this.locking = false),
        (this.me = t),
        (t.visible = false),
        (this.me.getChildByName('btn_close').clickHandler = new Laya.Handler(
          this,
          () => {
            a.dropdown_mouth.locking ||
              a.dropdown_year.locking ||
              (a.dropdown_mouth.isopen && a.dropdown_mouth.close(),
              a.dropdown_year.isopen && a.dropdown_year.close());
          }
        ));
      this.dropdown_mouth = new e(
        this.me.getChildByName('container_month'),
        new Laya.Handler(this, () => {
          a._OnStateChange(), i.runWith('');
        }),
        new Laya.Handler(this, t => i.runWith(t)),
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
        new Laya.Handler(this, () => {
          a._OnStateChange(), n.runWith('');
        }),
        new Laya.Handler(this, t => n.runWith(t)),
        s,
        1
      );
    }
    return (
      (t.prototype.show = function(t) {
        this.dropdown_mouth.reset(),
          this.dropdown_year.reset(),
          (this.me.visible = true),
          t ? this.dropdown_mouth.show() : this.dropdown_year.show();
      }),
      (t.prototype._OnStateChange = function() {
        this.dropdown_year.isopen ||
          this.dropdown_mouth.isopen ||
          (this.me.visible = false);
      }),
      t
    );
  })();

  const n = (e => {
    function n() {
      const t = e.call(this, new ui.lobby.agependingUI()) || this;
      return (
        (t.color_hint = '#5A82C8'),
        (t.color_wrong = '#FF3030'),
        (n.Inst = t),
        t
      );
    }
    return __extends(n, e),
    (n.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me
        .getChildByName('agepending')
        .getChildByName('root')),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.btn_close = this.root.getChildByName('btn_close'));
      const e = this.me.getChildByName('agepending').getChildByName('root');
      (this.btn_month = e.getChildByName('month')),
        (this.btn_month.clickHandler = new Laya.Handler(this, () => {
          t.locking || t.date_dropdown.show(true);
        })),
        (this.txt_month = this.btn_month.getChildByName('txt')),
        (this.btn_year = e.getChildByName('year')),
        (this.btn_year.clickHandler = new Laya.Handler(this, () => {
          t.locking || t.date_dropdown.show(false);
        })),
        (this.txt_year = this.btn_year.getChildByName('txt')),
        (this.notice_month = e.getChildByName('notice_month')),
        (this.notice_year = e.getChildByName('notice_year')),
        (this.date_dropdown = new i(
          this.me
            .getChildByName('agepending')
            .getChildByName('container_dropdown'),
          new Laya.Handler(this, e => {
            '' != e && (t.txt_month.text = e), t.pending_month();
          }),
          new Laya.Handler(this, e => {
            '' != e && (t.txt_year.text = e), t.pending_year();
          })
        )),
        (this.btn_confirm.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.onClickConfirm();
          },
          null,
          false
        )),
        (this.btn_close.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          false
        ));
    }),
    (n.prototype.onClickConfirm = function() {
      let e = true, i = '0', n = '0';
      if (
        (this.pending_month() || (e = false),
        this.pending_year() || (e = false),
        (i = this.txt_year.text),
        (n = this.txt_month.text),
        e)
      ) {
        const a = parseInt(i);
        const r = parseInt(n);
        const s = new Date();
        const o = 12 * s.getFullYear() + s.getMonth() - 12 * a - r;
        const l = Math.floor(o / 12);
        let h = 0;
        (h = l < 16 ? 5e3 : l < 20 ? 2e4 : -1),
          t.UI_Ageconfirm.Inst.show(i, n, h),
          this.close();
      }
    }),
    (n.prototype.pending_month = function() {
      return this.txt_month.text != game.Tools.strOfLocalization(2729)
        ? ((this.notice_month.text = ''), true)
        : ((this.notice_month.text = game.Tools.strOfLocalization(2733)),
          (this.notice_month.color = this.color_wrong),
          false);
    }),
    (n.prototype.pending_year = function() {
      return this.txt_year.text != game.Tools.strOfLocalization(2730)
        ? ((this.notice_year.text = ''), true)
        : ((this.notice_year.text = game.Tools.strOfLocalization(2734)),
          (this.notice_year.color = this.color_wrong),
          false);
    }),
    (n.prototype.show = function() {
      const e = this;
      (this.enable = true),
        (this.locking = true),
        (this.confirmflag = 0),
        (this.date_dropdown.me.visible = false),
        (this.notice_month.text = game.Tools.strOfLocalization(2731)),
        (this.notice_month.color = this.color_hint),
        (this.notice_year.text = game.Tools.strOfLocalization(2732)),
        (this.notice_year.color = this.color_hint),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        );
    }),
    (n.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    n
  ;
  })(t.UIBase);

  t.UI_Agepending = n;
})(uiscript || (uiscript = {}));