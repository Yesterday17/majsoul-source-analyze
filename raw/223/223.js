var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.waitobUI()) || this;
      return (t._sec = 0), (t._start_time = 0), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.label_sec = this.root.getChildByName('sec')),
          (this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking ||
                t.close(
                  Laya.Handler.create(t, function() {
                    t._func && t._func.runWith({ success: false });
                  })
                );
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e, i, n) {
        var a = this;
        (this._func = n),
          (this.label_sec.text = i.toString()),
          (this._sec = i),
          (this.locking = true),
          (this.enable = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              (a.locking = false),
                (a._start_time = Laya.timer.currTimer),
                Laya.timer.loop(100, a, function() {
                  var i = Math.ceil(
                    (1e3 * a._sec - (Laya.timer.currTimer - a._start_time)) /
                      1e3
                  );
                  i <= 0 && (i = 0),
                    (a.label_sec.text = i.toString()),
                    0 == i &&
                      a.close(
                        Laya.Handler.create(a, function() {
                          t.UI_Live_Broadcast.fetchInfo(e, n);
                        })
                      );
                });
            })
          );
      }),
      (i.prototype.close = function(e) {
        var i = this;
        Laya.timer.clearAll(this),
          (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (i.locking = false), (i.enable = false), e && e.run();
            })
          );
      }),
      (i.prototype.onDisable = function() {
        Laya.timer.clearAll(this);
      }),
      i
    );
  })(t.UIBase);
  t.UI_WaitOb = e;
})(uiscript || (uiscript = {}));