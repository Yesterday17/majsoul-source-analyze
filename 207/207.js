var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (() => {
    function e(t) {
      this.locking = !1;
      this.me = t;
      this.info = t.getChildByName('text');

      t.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          this.close,
          [1],
          !1
        );

      t.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
          this,
          this.close,
          [0],
          !1
        );
    }

    e.prototype.show = function(e, i) {
      var n = this;
      this.func_confirm = i;
      this.info.text = e;
      this.me.visible = !0;
      this.locking = !0;
      t.UIBase.anim_pop_out(
        this.me,
        Laya.Handler.create(this, () => {
          n.locking = !1;
        })
      );
    };

    e.prototype.close = function(e) {
      var i = this;
      this.locking = !0;
      this.locking ||
        (t.UIBase.anim_pop_hide(
        this.me,
        Laya.Handler.create(this, () => {
          i.locking = !1;
          i.me.visible = !1;
          i.func_confirm && i.func_confirm.runWith(e);
          i.func_confirm = null;
        })
      ));
    };

    return e;
  })();

  var i = (() => {
    class e {
      constructor(t) {
        this.locking = !1;
        this.me = t;
        this.info = t.getChildByName('text');
        this.title = t.getChildByName('ttt');

        t.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [1],
            !1
          );

        t.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
            this,
            this.close,
            [0],
            !1
          );
      }

      show(e, i, n) {
        var a = this;
        this.title.text = e;
        this.func_confirm = n;
        this.info.text = i;
        this.me.visible = !0;
        this.locking = !0;
        t.UIBase.anim_pop_out(
          this.me,
          Laya.Handler.create(this, () => {
            a.locking = !1;
          })
        );
      }

      close(e) {
        var i = this;
        this.locking = !0;
        this.locking ||
          (t.UIBase.anim_pop_hide(
          this.me,
          Laya.Handler.create(this, () => {
            i.locking = !1;
            i.me.visible = !1;
            i.func_confirm && i.func_confirm.runWith(e);
            i.func_confirm = null;
          })
        ));
      }
    }

    return e;
  })();

  var n = (t => {
    class n {
      constructor() {
        var e = t.call(this, new ui.both_ui.popwindowUI()) || this;
        e.pop_notitle = null;
        e.pop_withtitle = null;
        n.Inst = e;
        return e;
      }

      static PopOutWithTitle(t, e, i) {
        var n = this;
        this.Inst.enable = !0;
        this.Inst.pop_withtitle.show(
          t,
          e,
          Laya.Handler.create(this, t => {
            n.Inst.enable = !1;
            i && i.runWith(t);
          })
        );
      }

      static PopOutNoTitle(t, e) {
        var i = this;
        this.Inst.enable = !0;
        this.Inst.pop_notitle.show(
          t,
          Laya.Handler.create(this, t => {
            i.Inst.enable = !1;
            e && e.runWith(t);
          })
        );
      }

      onCreate() {
        this.pop_notitle = new e(this.me.getChildByName('notitle'));
        this.pop_withtitle = new i(this.me.getChildByName('title'));
        this.pop_notitle.me.visible = !1;
        this.pop_withtitle.me.visible = !1;
      }
    }

    __extends(n, t);

    n.Inst = null;
    return n;
  })(t.UIBase);

  t.UI_Popout = n;
})(uiscript || (uiscript = {}));