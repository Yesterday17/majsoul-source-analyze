var uiscript;
!(function(t) {
  var e = (function(t) {
    function e() {
      var i = t.call(this, new ui.both_ui.courseUI()) || this;
      return (
        (i.locking = false),
        (i.loadover = []),
        (i.urls = [
          'course/course0.png',
          'course/course1.png',
          'course/course2.png',
          'course/course3.png',
          'course/course4.png',
          'course/course5.png',
          'course/course6.png',
          'course/course7.png',
          'course/course8.png'
        ]),
        (i.pageindex = 0),
        (e.Inst = i),
        i
      );
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {}),
      (e.prototype.show = function(t) {
        var e = this;
        undefined === t && (t = null),
          (this.enable = true),
          (this.func_complete = t),
          (this.locking = true),
          (this.root.alpha = 0),
          Laya.Tween.to(
            this.root,
            { alpha: 1 },
            120,
            null,
            Laya.Handler.create(this, function() {
              e.locking = false;
            })
          ),
          this.showPage(0);
        for (
          var i = function(t) {
              n.loadover.push(false),
                Laya.loader.load(
                  n.urls[t],
                  Laya.Handler.create(n, function() {
                    Laya.timer.frameOnce(3, e, function() {
                      (e.loadover[t] = true),
                        e.enable &&
                          e.pageindex == t &&
                          ((e.loading.visible = false),
                          (e.page.source = Laya.loader.getRes(e.urls[t])),
                          (e.page.visible = true)),
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
      }),
      (e.prototype.close = function() {
        var t = this;
        (this.locking = true),
          (this.root.alpha = 1),
          Laya.Tween.to(
            this.root,
            { alpha: 0 },
            120,
            null,
            Laya.Handler.create(this, function() {
              (t.locking = false), (t.enable = false);
              for (var e = 0; e < t.urls.length; e++)
                t.loadover[e] && Laya.loader.clearTextureRes(t.urls[e]);
              t.func_complete && t.func_complete.run();
            })
          );
      }),
      (e.prototype.showPage = function(t) {
        (this.pageindex = t),
          (this.btn_left.visible = 0 != t),
          (this.btn_right.visible = t != this.urls.length - 1),
          this.loadover[t]
            ? ((this.page.visible = true),
              (this.page.source = Laya.loader.getRes(this.urls[t])),
              (this.loading.visible = false))
            : ((this.page.visible = false), (this.loading.visible = true));
      }),
      e
    );
  })(t.UIBase);
  t.UI_Course = e;
})(uiscript || (uiscript = {}));