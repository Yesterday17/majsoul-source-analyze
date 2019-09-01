let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.number_inputUI()) || this;
      return (
        (t.title = null),
        (t.txtinput = null),
        (t.locking = false),
        (t.root = null),
        (t._when_inputed = null),
        (t._when_cancel = null),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_cancel'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t._btn_cancel();
          },
          null,
          false
        )),
        (this.root.getChildByName(
          'btn_confirm'
        ).clickHandler = Laya.Handler.create(
          this,
          this._btn_confirm,
          null,
          false
        )),
        (this.txtinput = this.root
          .getChildByName('input')
          .getChildByName('txtinput')),
        (this.title = this.root.getChildByName('title'));
      for (
        var e = this.root.getChildByName('numpad'),
          i = i => {
            const a = e.getChildByName(`n${i}`), r = a.getChildByName('s');
            r.alpha = 0;
            let s = false;
            a.on('mousedown', n, () => {
              (r.alpha = 0),
                (s = true),
                Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, true, true);
            }),
              a.on('mouseup', n, () => {
                Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
                  s &&
                    t.txtinput.text.length < t.txtinput.maxChars &&
                    (t.txtinput.text = t.txtinput.text + i.toString()),
                  (s = false);
              }),
              a.on('mouseout', n, () => {
                Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
                  (s = false);
              });
          },
          n = this,
          a = 0;
        a < 10;
        a++
      )
        i(a);
      const r = (o = e.getChildByName('clear')).getChildByName('s');
      r.alpha = 0;
      let s = false;
      o.on('mousedown', this, () => {
        (r.alpha = 0),
          (s = true),
          Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, true, true);
      }),
        o.on('mouseup', this, () => {
          Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
            s && (t.txtinput.text = ''),
            (s = false);
        }),
        o.on('mouseout', this, () => {
          Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true), (s = false);
        });
      var o = e.getChildByName('del');
      const l = o.getChildByName('s');
      l.alpha = 0;
      let h = false;
      o.on('mousedown', this, () => {
        (l.alpha = 0),
          (h = true),
          Laya.Tween.to(l, { alpha: 1 }, 50, null, null, 0, true, true);
      }),
        o.on('mouseup', this, () => {
          if (
            (Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, true, true), h)
          ) {
            let e = t.txtinput.text;
            e.length > 0 && (e = e.substr(0, e.length - 1)),
              (t.txtinput.text = e);
          }
          h = false;
        }),
        o.on('mouseout', this, () => {
          Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, true, true), (h = false);
        });
    }),
    (i.prototype.show = function(e, i, n) {
      const a = this;
      undefined === n && (n = null),
        (this.enable = true),
        (this.txtinput.text = ''),
        (this.title.text = e),
        (this._when_cancel = n),
        (this._when_inputed = i),
        this.locking ||
          ((this.locking = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, () => {
              a.locking = false;
            })
          ));
    }),
    (i.prototype._hide = function(e) {
      const i = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (i.locking = false), (i.enable = false), e.run();
          })
        );
    }),
    (i.prototype._btn_confirm = function() {
      const t = this;
      this.locking ||
        this._hide(
          Laya.Handler.create(this, () => {
            const e = t._when_inputed;
            (t._when_inputed = null), (t._when_cancel = null);
            let i = 0;
            t.txtinput.text &&
              '' != t.txtinput.text &&
              (i = parseInt(t.txtinput.text)),
              i || (i = 0),
              e && e.runWith(i);
          })
        );
    }),
    (i.prototype._btn_cancel = function() {
      const t = this;
      this.locking ||
        this._hide(
          Laya.Handler.create(this, () => {
            const e = t._when_cancel;
            (t._when_inputed = null), (t._when_cancel = null), e && e.run();
          })
        );
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_NumberInput = e;
})(uiscript || (uiscript = {}));