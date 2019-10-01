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
      var t = e.call(this, new ui.lobby.number_inputUI()) || this;
      return (
        (t.title = null),
        (t.txtinput = null),
        (t.locking = !1),
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
            !1
          )),
          (this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = Laya.Handler.create(
            this,
            this._btn_confirm,
            null,
            !1
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
              var s = !1;
              a.on('mousedown', n, function() {
                (r.alpha = 0),
                  (s = !0),
                  Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
              }),
                a.on('mouseup', n, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    s &&
                      t.txtinput.text.length < t.txtinput.maxChars &&
                      (t.txtinput.text = t.txtinput.text + i.toString()),
                    (s = !1);
                }),
                a.on('mouseout', n, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    (s = !1);
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
        var s = !1;
        o.on('mousedown', this, function() {
          (r.alpha = 0),
            (s = !0),
            Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
        }),
          o.on('mouseup', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
              s && (t.txtinput.text = ''),
              (s = !1);
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0), (s = !1);
          });
        var o = e.getChildByName('del'),
          l = o.getChildByName('s');
        l.alpha = 0;
        var h = !1;
        o.on('mousedown', this, function() {
          (l.alpha = 0),
            (h = !0),
            Laya.Tween.to(l, { alpha: 1 }, 50, null, null, 0, !0, !0);
        }),
          o.on('mouseup', this, function() {
            if (
              (Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, !0, !0), h)
            ) {
              var e = t.txtinput.text;
              e.length > 0 && (e = e.substr(0, e.length - 1)),
                (t.txtinput.text = e);
            }
            h = !1;
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, !0, !0), (h = !1);
          });
      }),
      (i.prototype.show = function(e, i, n) {
        var a = this;
        void 0 === n && (n = null),
          (this.enable = !0),
          (this.txtinput.text = ''),
          (this.title.text = e),
          (this._when_cancel = n),
          (this._when_inputed = i),
          this.locking ||
            ((this.locking = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                a.locking = !1;
              })
            ));
      }),
      (i.prototype._hide = function(e) {
        var i = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (i.locking = !1), (i.enable = !1), e.run();
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