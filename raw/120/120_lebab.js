const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.entrance.add2desktopUI()) || this;
      return (t.skin = ''), (t.loaded = !1), (i.Inst = t), t;
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
      (this.enable = !0),
        (this.locking = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        ),
        (this.loaded = !1),
        (this.img.skin = ''),
        '' != this.skin &&
          Laya.loader.load(
            this.skin,
            Laya.Handler.create(this, () => {
              (e.loaded = !0),
                e.enable
                  ? (e.img.skin = e.skin)
                  : ((e.loaded = !1), Laya.loader.clearTextureRes(e.skin));
            })
          );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1),
              (e.enable = !1),
              e.loaded &&
                ((e.loaded = !1), Laya.loader.clearTextureRes(e.skin));
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Add2Desktop = e;
})(uiscript || (uiscript = {}));