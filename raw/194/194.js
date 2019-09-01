var uiscript;
!(function(t) {
  var e = (function() {
      function e(t) {
        (this.locking = false),
          (this.me = t),
          (this.info = t.getChildByName('text')),
          (t.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [1],
            false
          )),
          (t.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [0],
            false
          ));
      }
      return (
        (e.prototype.show = function(e, i) {
          var n = this;
          (this.func_confirm = i),
            (this.info.text = e),
            (this.me.visible = true),
            (this.locking = true),
            t.UIBase.anim_pop_out(
              this.me,
              Laya.Handler.create(this, function() {
                n.locking = false;
              })
            );
        }),
        (e.prototype.close = function(e) {
          var i = this;
          this.locking ||
            ((this.locking = true),
            t.UIBase.anim_pop_hide(
              this.me,
              Laya.Handler.create(this, function() {
                (i.locking = false),
                  (i.me.visible = false),
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
        (this.locking = false),
          (this.me = t),
          (this.info = t.getChildByName('text')),
          (this.title = t.getChildByName('ttt')),
          (t.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [1],
            false
          )),
          (t.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [0],
            false
          ));
      }
      return (
        (e.prototype.show = function(e, i, n) {
          var a = this;
          (this.title.text = e),
            (this.func_confirm = n),
            (this.info.text = i),
            (this.me.visible = true),
            (this.locking = true),
            t.UIBase.anim_pop_out(
              this.me,
              Laya.Handler.create(this, function() {
                a.locking = false;
              })
            );
        }),
        (e.prototype.close = function(e) {
          var i = this;
          this.locking ||
            ((this.locking = true),
            t.UIBase.anim_pop_hide(
              this.me,
              Laya.Handler.create(this, function() {
                (i.locking = false),
                  (i.me.visible = false),
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
          (this.Inst.enable = true),
            this.Inst.pop_withtitle.show(
              t,
              e,
              Laya.Handler.create(this, function(t) {
                (n.Inst.enable = false), i && i.runWith(t);
              })
            );
        }),
        (n.PopOutNoTitle = function(t, e) {
          var i = this;
          (this.Inst.enable = true),
            this.Inst.pop_notitle.show(
              t,
              Laya.Handler.create(this, function(t) {
                (i.Inst.enable = false), e && e.runWith(t);
              })
            );
        }),
        (n.prototype.onCreate = function() {
          (this.pop_notitle = new e(this.me.getChildByName('notitle'))),
            (this.pop_withtitle = new i(this.me.getChildByName('title'))),
            (this.pop_notitle.me.visible = false),
            (this.pop_withtitle.me.visible = false);
        }),
        (n.Inst = null),
        n
      );
    })(t.UIBase);
  t.UI_Popout = n;
})(uiscript || (uiscript = {}));