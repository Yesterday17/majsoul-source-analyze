let uiscript;
!(t => {
  const e = (t => {
    function e() {
      const i = t.call(this, new ui.both_ui.gettitleUI()) || this;
      return (e.Inst = i), i;
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.icon = this.root.getChildByName('icon')),
        (this.btn_close = this.me.getChildByName('btn_close')),
        (this.btn_close.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          false
        ));
    }),
    (e.prototype.show = function(t, e) {
      const i = this;
      (this.enable = true),
        (this.complete = e),
        (this.icon.skin = game.LoadMgr.getResImageSkin(
          cfg.item_definition.title.get(t).icon
        )),
        (this.btn_close.visible = false),
        (this.root.alpha = 1),
        (this.locking = true),
        this.me.in.play(0, false),
        Laya.timer.once(1e3, this, () => {
          (i.locking = false), (i.btn_close.visible = true);
        });
    }),
    (e.prototype.close = function() {
      const t = this;
      (this.locking = true),
        this.me.out.play(0, false),
        Laya.timer.once(200, this, () => {
          (t.locking = false), (t.enable = false), t.complete && t.complete.run();
        });
    }),
    (e.Inst = null),
    e
  ;
  })(t.UIBase);
  t.UI_Gettitle = e;
})(uiscript || (uiscript = {}));