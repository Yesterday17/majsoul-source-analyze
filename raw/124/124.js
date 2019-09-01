var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.agesuccessUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me
          .getChildByName('agepending')
          .getChildByName('root')),
          (this.btn_confirm = this.root.getChildByName('btn_confirm')),
          (this.btn_close = this.root.getChildByName('btn_close')),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            false
          )),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function() {
        var e = this;
        (this.enable = true),
          (this.locking = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              e.locking = false;
            })
          );
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.enable = false);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Agesuccess = e;
})(uiscript || (uiscript = {}));