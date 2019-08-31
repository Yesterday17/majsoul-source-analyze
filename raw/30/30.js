var view;
!(function(t) {
  var e = (function() {
    function e(t, e) {
      (this.val = null),
        (this.model = null),
        (this.ismoqie = !1),
        (this.ispaopai = !1),
        (this.isDora = !1),
        (this.val = t),
        (this.model = e),
        (this.isDora = !1),
        this.RefreshDora();
    }
    return (
      (e.prototype.ShowUp = function() {
        this.model.transform.localRotationEuler = new Laya.Vector3(90, 0, 0);
      }),
      (e.prototype.ShowBack = function() {
        this.model.transform.localRotationEuler = new Laya.Vector3(-90, 0, 0);
      }),
      (e.prototype.ShowRot = function() {
        this.model.transform.localRotationEuler = new Laya.Vector3(90, -90, 0);
      }),
      (e.prototype.RefreshDora = function() {
        if (t.DesktopMgr.bianjietishi && !this.isDora) {
          if ((this.val.dora && (this.isDora = !0), !this.isDora))
            for (var e = 0; e < t.DesktopMgr.Inst.dora.length; e++)
              if (mjcore.MJPai.DoraMet(this.val, t.DesktopMgr.Inst.dora[e])) {
                this.isDora = !0;
                break;
              }
          if (this.isDora) {
            var i = t.DesktopMgr.Inst.effect_dora3D.clone();
            this.model.addChild(i),
              (i.transform.localPosition = new Laya.Vector3(0, 0, 0)),
              (i.transform.localScale = new Laya.Vector3(1, 1, 1)),
              (i.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)),
              (i.active = !0);
            i.getChildAt(0).addComponent(anim.RunUV);
          }
        }
      }),
      (e.prototype.OnChoosedPai = function() {
        if (t.DesktopMgr.bianjietishi) {
          var e = t.DesktopMgr.Inst.choosed_pai;
          null == e || 0 != mjcore.MJPai.Distance(this.val, e)
            ? this.ispaopai
              ? this.model.meshRender.sharedMaterial.setColor(
                  caps.Cartoon.COLOR,
                  new Laya.Vector4(1, 0.78, 0.78, 1)
                )
              : this.ismoqie
              ? this.model.meshRender.sharedMaterial.setColor(
                  caps.Cartoon.COLOR,
                  new Laya.Vector4(0.8, 0.8, 0.8, 1)
                )
              : this.model.meshRender.sharedMaterial.setColor(
                  caps.Cartoon.COLOR,
                  new Laya.Vector4(1, 1, 1, 1)
                )
            : this.model.meshRender.sharedMaterial.setColor(
                caps.Cartoon.COLOR,
                new Laya.Vector4(0.615, 0.827, 0.976, 1)
              );
        } else
          this.model.meshRender.sharedMaterial.setColor(
            caps.Cartoon.COLOR,
            new Laya.Vector4(1, 1, 1, 1)
          );
      }),
      e
    );
  })();
  t.ViewPai = e;
})(view || (view = {}));