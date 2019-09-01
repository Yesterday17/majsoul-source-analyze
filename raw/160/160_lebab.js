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
        (this.secen.visible = true);
    }),
    (i.prototype._onShow = function(t) {
      const e = this;
      (this.enable = true),
        game.Tools.charaPart(t, this.illust, 'half', this.rect, true),
        this.me.cutin.play(0, false),
        view.AudioMgr.PlayAudio(206),
        Laya.timer.once(1100, this, () => {
          e.secen.visible = false;
        }),
        Laya.timer.once(1800, this, () => {
          e._onHide();
        });
    }),
    (i.prototype._onHide = function() {
      (this.enable = false),
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