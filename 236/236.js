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
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.lobby.waitobUI()) || this;
        t._sec = 0;
        t._start_time = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.label_sec = this.root.getChildByName('sec');
        this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking ||
                t.close(
                  Laya.Handler.create(t, () => {
                    t._func && t._func.runWith({ success: !1 });
                  })
                );
            },
            null,
            !1
          );
      }

      show(e, i, n) {
        var a = this;
        this._func = n;
        this.label_sec.text = i.toString();
        this._sec = i;
        this.locking = !0;
        this.enable = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            a.locking = !1;
            a._start_time = Laya.timer.currTimer;
            Laya.timer.loop(100, a, () => {
              var i = Math.ceil(
                (1e3 * a._sec - (Laya.timer.currTimer - a._start_time)) /
                  1e3
              );
              i <= 0 && (i = 0);
              a.label_sec.text = i.toString();
              0 == i &&
                a.close(
                  Laya.Handler.create(a, () => {
                    t.UI_Live_Broadcast.fetchInfo(e, n);
                  })
                );
            });
          })
        );
      }

      close(e) {
        var i = this;
        Laya.timer.clearAll(this);
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            i.locking = !1;
            i.enable = !1;
            e && e.run();
          })
        );
      }

      onDisable() {
        Laya.timer.clearAll(this);
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_WaitOb = e;
})(uiscript || (uiscript = {}));