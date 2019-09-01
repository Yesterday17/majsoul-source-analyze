let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.entrance.add2desktopUI()) || this;
      return (t.skin = ''), (t.loaded = false), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.img = this.root.getChildByName('img')),
        Laya.Browser.onAndroid || Laya.Browser.onAndriod || GameMgr.inConch
          ? (this.skin = game.Tools.localUISrc(
              'myres2/treasurehead/add2desktop_android.png'
            ))
          : (Laya.Browser.onIOS || GameMgr.iniOSWebview) &&
            (this.skin = game.Tools.localUISrc(
              'myres2/treasurehead/add2desktop_ios.png'
            )),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          t.close();
        }));
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.enable = true),
        (this.locking = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        ),
        (this.loaded = false),
        (this.img.skin = ''),
        '' != this.skin &&
          Laya.loader.load(
            this.skin,
            Laya.Handler.create(this, () => {
              (e.loaded = true),
                e.enable
                  ? (e.img.skin = e.skin)
                  : ((e.loaded = false), Laya.loader.clearTextureRes(e.skin));
            })
          );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false),
              (e.enable = false),
              e.loaded &&
                ((e.loaded = false), Laya.loader.clearTextureRes(e.skin));
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Add2Desktop = e;
})(uiscript || (uiscript = {}));