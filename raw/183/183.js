var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.both_ui.need_bind_mailUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, function() {
            e.locking || e.close();
          })),
          (this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = new Laya.Handler(this, function() {
            e.locking ||
              (e.close(),
              GameMgr.Inst.sociotype >= 1
                ? t.UI_Bind_Mail0.Inst.show()
                : t.UI_Bind_Mail1.Inst.show());
          }));
      }),
      (i.prototype.show = function() {
        var e = this;
        (this.locking = true),
          (this.enable = true),
          (this.root.getChildByName('info').text = game.Tools.strOfLocalization(
            2808
          )),
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
  t.UI_Need_Bind_Mail = e;
})(uiscript || (uiscript = {}));