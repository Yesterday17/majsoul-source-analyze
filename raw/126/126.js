var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      return e.call(this, new ui.mj.alUI()) || this;
    }
    return (
      __extends(i, e),
      (i.Show = function() {
        var e = new i();
        t.UIMgr.Inst.AddMJUI(e),
          Laya.timer.frameOnce(5, this, function() {
            e.show();
          });
      }),
      (i.prototype.show = function() {
        var t = this;
        (this.me.visible = true),
          this.me.start.play(0, false),
          Laya.timer.once(1300, this, function() {
            (t.me.visible = false), t.me.destroy(true);
          });
      }),
      i
    );
  })(t.UIBase);
  t.UI_AL = e;
})(uiscript || (uiscript = {}));