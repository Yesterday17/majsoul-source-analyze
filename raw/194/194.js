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
      function e(t) {
        (this.locking = !1),
          (this.me = t),
          (this.info = t.getChildByName('text')),
          (t.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [1],
            !1
          )),
          (t.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [0],
            !1
          ));
      }
      return (
        (e.prototype.show = function(e, i) {
          var n = this;
          (this.func_confirm = i),
            (this.info.text = e),
            (this.me.visible = !0),
            (this.locking = !0),
            t.UIBase.anim_pop_out(
              this.me,
              Laya.Handler.create(this, function() {
                n.locking = !1;
              })
            );
        }),
        (e.prototype.close = function(e) {
          var i = this;
          this.locking ||
            ((this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.me,
              Laya.Handler.create(this, function() {
                (i.locking = !1),
                  (i.me.visible = !1),
                  i.func_confirm && i.func_confirm.runWith(e),
                  (i.func_confirm = null);
              })
            ));
        }),
        e
      );
    })(),
    i = (function() {
      function e(t) {
        (this.locking = !1),
          (this.me = t),
          (this.info = t.getChildByName('text')),
          (this.title = t.getChildByName('ttt')),
          (t.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [1],
            !1
          )),
          (t.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [0],
            !1
          ));
      }
      return (
        (e.prototype.show = function(e, i, n) {
          var a = this;
          (this.title.text = e),
            (this.func_confirm = n),
            (this.info.text = i),
            (this.me.visible = !0),
            (this.locking = !0),
            t.UIBase.anim_pop_out(
              this.me,
              Laya.Handler.create(this, function() {
                a.locking = !1;
              })
            );
        }),
        (e.prototype.close = function(e) {
          var i = this;
          this.locking ||
            ((this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.me,
              Laya.Handler.create(this, function() {
                (i.locking = !1),
                  (i.me.visible = !1),
                  i.func_confirm && i.func_confirm.runWith(e),
                  (i.func_confirm = null);
              })
            ));
        }),
        e
      );
    })(),
    n = (function(t) {
      function n() {
        var e = t.call(this, new ui.both_ui.popwindowUI()) || this;
        return (
          (e.pop_notitle = null), (e.pop_withtitle = null), (n.Inst = e), e
        );
      }
      return (
        __extends(n, t),
        (n.PopOutWithTitle = function(t, e, i) {
          var n = this;
          (this.Inst.enable = !0),
            this.Inst.pop_withtitle.show(
              t,
              e,
              Laya.Handler.create(this, function(t) {
                (n.Inst.enable = !1), i && i.runWith(t);
              })
            );
        }),
        (n.PopOutNoTitle = function(t, e) {
          var i = this;
          (this.Inst.enable = !0),
            this.Inst.pop_notitle.show(
              t,
              Laya.Handler.create(this, function(t) {
                (i.Inst.enable = !1), e && e.runWith(t);
              })
            );
        }),
        (n.prototype.onCreate = function() {
          (this.pop_notitle = new e(this.me.getChildByName('notitle'))),
            (this.pop_withtitle = new i(this.me.getChildByName('title'))),
            (this.pop_notitle.me.visible = !1),
            (this.pop_withtitle.me.visible = !1);
        }),
        (n.Inst = null),
        n
      );
    })(t.UIBase);
  t.UI_Popout = n;
})(uiscript || (uiscript = {}));