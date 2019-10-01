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
  var e = (t => {
    class e {
      constructor() {
        var i = t.call(this, new ui.both_ui.courseUI()) || this;
        i.locking = !1;
        i.loadover = [];

        i.urls = [
          'course/course0.png',
          'course/course1.png',
          'course/course2.png',
          'course/course3.png',
          'course/course4.png',
          'course/course5.png',
          'course/course6.png',
          'course/course7.png',
          'course/course8.png'
        ];

        i.pageindex = 0;
        e.Inst = i;
        return i;
      }

      onCreate() {}

      show(t) {
        var e = this;
        void 0 === t && (t = null);
        this.enable = !0;
        this.func_complete = t;
        this.locking = !0;
        this.root.alpha = 0;

        Laya.Tween.to(
          this.root,
          { alpha: 1 },
          120,
          null,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );

        this.showPage(0);
        for (
          var i = t => {
            n.loadover.push(!1);
            Laya.loader.load(
              n.urls[t],
              Laya.Handler.create(n, () => {
                Laya.timer.frameOnce(3, e, () => {
                  e.loadover[t] = !0;
                  e.loading.visible = !1;
                  e.page.source = Laya.loader.getRes(e.urls[t]);

                  e.enable &&
                    e.pageindex == t &&
                    ((e.page.visible = !0));

                  e.enable || Laya.loader.clearTextureRes(e.urls[t]);
                });
              })
            );
          },
            n = this,
            a = 0;
          a < this.urls.length;
          a++
        )
          i(a);
      }

      close() {
        var t = this;
        this.locking = !0;
        this.root.alpha = 1;
        Laya.Tween.to(
          this.root,
          { alpha: 0 },
          120,
          null,
          Laya.Handler.create(this, () => {
            t.locking = !1;
            t.enable = !1;
            for (var e = 0; e < t.urls.length; e++)
              t.loadover[e] && Laya.loader.clearTextureRes(t.urls[e]);
            t.func_complete && t.func_complete.run();
          })
        );
      }

      showPage(t) {
        this.pageindex = t;
        this.btn_left.visible = 0 != t;
        this.btn_right.visible = t != this.urls.length - 1;
        this.page.visible = !0;
        this.page.source = Laya.loader.getRes(this.urls[t]);
        this.page.visible = !1;
        this.loadover[t]
          ? (this.loading.visible = !1)
          : (this.loading.visible = !0);
      }
    }

    __extends(e, t);

    return e;
  })(t.UIBase);
  t.UI_Course = e;
})(uiscript || (uiscript = {}));