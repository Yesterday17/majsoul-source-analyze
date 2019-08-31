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
      const t = e.call(this, new ui.mj.hu_cutinUI()) || this;
      return (
        (t.illust = null),
        (t.rect = null),
        (t.effect = null),
        (t.secen = null),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.show = function(e) {
      const n = this;
      this.Inst && this.Inst.destroy(),
        t.UIMgr.Inst.AddMJUI((this.Inst = new i()));
      const a = Laya.timer.currFrame;
      Laya.loader.create(
        'scene/hucutin.ls',
        Laya.Handler.create(this, () => {
          let t = 5 + a - Laya.timer.currFrame;
          t < 0 && (t = 1),
            Laya.timer.frameOnce(t, n, () => {
              n.Inst._onShow(e);
            });
        })
      );
    }),
    (i.prototype.onCreate = function() {
      (this.illust = this.me
        .getChildByName('root')
        .getChildByName('container_illust')
        .getChildByName('illust')
        .getChildByName('illust')),
        (this.rect = t.UIRect.CreateFromSprite(this.illust)),
        (this.effect = this.me
          .getChildByName('root')
          .getChildByName('effect')),
        (this.secen = Laya.loader.getRes('scene/hucutin.ls')),
        this.effect.addChild(this.secen),
        (this.secen.visible = !0);
    }),
    (i.prototype._onShow = function(t) {
      const e = this;
      (this.enable = !0),
        game.Tools.charaPart(t, this.illust, 'half', this.rect, !0),
        this.me.cutin.play(0, !1),
        view.AudioMgr.PlayAudio(206),
        Laya.timer.once(1100, this, () => {
          e.secen.visible = !1;
        }),
        Laya.timer.once(1800, this, () => {
          e._onHide();
        });
    }),
    (i.prototype._onHide = function() {
      (this.enable = !1),
        Laya.loader.clearTextureRes(this.illust.skin),
        this.destroy(),
        (i.Inst = null);
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_HuCutIn = e;
})(uiscript || (uiscript = {}));