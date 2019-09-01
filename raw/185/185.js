var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.number_inputUI()) || this;
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
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.root.getChildByName(
            'btn_cancel'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
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
            i = function(i) {
              var a = e.getChildByName('n' + i),
                r = a.getChildByName('s');
              r.alpha = 0;
              var s = false;
              a.on('mousedown', n, function() {
                (r.alpha = 0),
                  (s = true),
                  Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, true, true);
              }),
                a.on('mouseup', n, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
                    s &&
                      t.txtinput.text.length < t.txtinput.maxChars &&
                      (t.txtinput.text = t.txtinput.text + i.toString()),
                    (s = false);
                }),
                a.on('mouseout', n, function() {
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
        var r = (o = e.getChildByName('clear')).getChildByName('s');
        r.alpha = 0;
        var s = false;
        o.on('mousedown', this, function() {
          (r.alpha = 0),
            (s = true),
            Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, true, true);
        }),
          o.on('mouseup', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
              s && (t.txtinput.text = ''),
              (s = false);
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true), (s = false);
          });
        var o = e.getChildByName('del'),
          l = o.getChildByName('s');
        l.alpha = 0;
        var h = false;
        o.on('mousedown', this, function() {
          (l.alpha = 0),
            (h = true),
            Laya.Tween.to(l, { alpha: 1 }, 50, null, null, 0, true, true);
        }),
          o.on('mouseup', this, function() {
            if (
              (Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, true, true), h)
            ) {
              var e = t.txtinput.text;
              e.length > 0 && (e = e.substr(0, e.length - 1)),
                (t.txtinput.text = e);
            }
            h = false;
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, true, true), (h = false);
          });
      }),
      (i.prototype.show = function(e, i, n) {
        var a = this;
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
              Laya.Handler.create(this, function() {
                a.locking = false;
              })
            ));
      }),
      (i.prototype._hide = function(e) {
        var i = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (i.locking = false), (i.enable = false), e.run();
            })
          );
      }),
      (i.prototype._btn_confirm = function() {
        var t = this;
        this.locking ||
          this._hide(
            Laya.Handler.create(this, function() {
              var e = t._when_inputed;
              (t._when_inputed = null), (t._when_cancel = null);
              var i = 0;
              t.txtinput.text &&
                '' != t.txtinput.text &&
                (i = parseInt(t.txtinput.text)),
                i || (i = 0),
                e && e.runWith(i);
            })
          );
      }),
      (i.prototype._btn_cancel = function() {
        var t = this;
        this.locking ||
          this._hide(
            Laya.Handler.create(this, function() {
              var e = t._when_cancel;
              (t._when_inputed = null), (t._when_cancel = null), e && e.run();
            })
          );
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_NumberInput = e;
})(uiscript || (uiscript = {}));