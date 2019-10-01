var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.mj.hu_cutinUI()) || this;
        t.illust = null;
        t.rect = null;
        t.effect = null;
        t.secen = null;
        i.Inst = t;
        return t;
      }

      static show(e) {
        var n = this;
        this.Inst && this.Inst.destroy();
        t.UIMgr.Inst.AddMJUI((this.Inst = new i()));
        var a = Laya.timer.currFrame;
        Laya.loader.create(
          'scene/hucutin.ls',
          Laya.Handler.create(this, () => {
            var t = 5 + a - Laya.timer.currFrame;
            t < 0 && (t = 1);
            Laya.timer.frameOnce(t, n, () => {
              n.Inst._onShow(e);
            });
          })
        );
      }

      onCreate() {
        this.illust = this.me
          .getChildByName('root')
          .getChildByName('container_illust')
          .getChildByName('illust')
          .getChildByName('illust');

        this.rect = t.UIRect.CreateFromSprite(this.illust);

        this.effect = this.me
            .getChildByName('root')
            .getChildByName('effect');

        this.secen = Laya.loader.getRes('scene/hucutin.ls');
        this.effect.addChild(this.secen);
        this.secen.visible = !0;
      }

      _onShow(t) {
        var e = this;
        this.enable = !0;
        game.Tools.charaPart(t, this.illust, 'half', this.rect, !0);
        this.me.cutin.play(0, !1);
        view.AudioMgr.PlayAudio(206);

        Laya.timer.once(1100, this, () => {
          e.secen.visible = !1;
        });

        Laya.timer.once(1800, this, () => {
          e._onHide();
        });
      }

      _onHide() {
        this.enable = !1;
        Laya.loader.clearTextureRes(this.illust.skin);
        this.destroy();
        i.Inst = null;
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_HuCutIn = e;
})(uiscript || (uiscript = {}));