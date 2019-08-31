var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.mj.hu_cutinUI()) || this;
      return (
        (t.illust = null),
        (t.rect = null),
        (t.effect = null),
        (t.secen = null),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.show = function(e) {
        var n = this;
        this.Inst && this.Inst.destroy(),
          t.UIMgr.Inst.AddMJUI((this.Inst = new i()));
        var a = Laya.timer.currFrame;
        Laya.loader.create(
          'scene/hucutin.ls',
          Laya.Handler.create(this, function() {
            var t = 5 + a - Laya.timer.currFrame;
            t < 0 && (t = 1),
              Laya.timer.frameOnce(t, n, function() {
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
        var e = this;
        (this.enable = !0),
          game.Tools.charaPart(t, this.illust, 'half', this.rect, !0),
          this.me.cutin.play(0, !1),
          view.AudioMgr.PlayAudio(206),
          Laya.timer.once(1100, this, function() {
            e.secen.visible = !1;
          }),
          Laya.timer.once(1800, this, function() {
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
    );
  })(t.UIBase);
  t.UI_HuCutIn = e;
})(uiscript || (uiscript = {}));