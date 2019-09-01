var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.common.closeappUI()) || this;
      return (t.locking = false), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.close(),
                Laya.Browser.window.conch &&
                  Laya.Browser.window.conch.exit &&
                  Laya.Browser.window.conch.exit());
            },
            null,
            false
          )),
          (this.root.getChildByName(
            'btn_cancel'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            false
          )),
          (this.root.getChildByName('btn_cancel').filters = [
            new Laya.ColorFilter([
              0.3086,
              0.6094,
              0.082,
              0,
              0,
              0.3086,
              0.6094,
              0.082,
              0,
              0,
              0.3086,
              0.6094,
              0.082,
              0,
              0,
              0,
              0,
              0,
              1,
              0
            ])
          ]),
          (this.desc = this.root.getChildByName('desc')),
          (this.desc.text = game.Tools.strOfLocalization(22)),
          (this.locking = false),
          GameMgr.inConch &&
            Laya.Browser.window.conch.setOnBackPressedFunction &&
            Laya.Browser.window.conch.setOnBackPressedFunction(function() {
              e.locking || t.UI_CloseApp.Inst.show();
            });
      }),
      (i.prototype.show = function() {
        var e = this;
        (this.locking = true),
          (this.enable = true),
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
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_CloseApp = e;
})(uiscript || (uiscript = {}));