var view;
!(t => {
  var e = (() => {
    class e {
      constructor(e) {
        this.val = null;
        this.model = null;
        this.contianer_pai = null;
        this.pai3D = null;
        this.shadow = null;
        this._starttime = 0;
        this._lifetime = 150;
        this._index = 0;
        this._isnew = !1;
        this.model = new Laya.Sprite3D();
        e.addChild(this.model);

        this.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * -t.PAIMODEL_HEIGHT,
            0
          );

        this.model.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
        this.model.transform.localScale = new Laya.Vector3(1, 1, 1);
        this.model.active = !0;
        this.contianer_pai = new Laya.Sprite3D();
        this.model.addChild(this.contianer_pai);

        this.contianer_pai.transform.localPosition = new Laya.Vector3(
            0,
            0,
            0
          );

        this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          );

        this.contianer_pai.transform.localScale = new Laya.Vector3(1, 1, 1);
        this.contianer_pai.active = !0;
        this.shadow = t.DesktopMgr.Inst.effect_shadow.clone();
        this.model.addChild(this.shadow);
        this.shadow.transform.localPosition = new Laya.Vector3(0, 0, 0);
        this.shadow.transform.localScale = new Laya.Vector3(1, 1, 1);
        this.shadow.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
        this.shadow.active = !0;
      }

      SetVal(e) {
        try {
          this.pai3D.model.destroy();

          null != this.pai3D &&
            ((this.pai3D = null));

          this.val = e;
          this.pai3D = new t.ViewPai(e, t.DesktopMgr.Inst.CreatePai3D(e));
          this.contianer_pai.addChild(this.pai3D.model);

          this.pai3D.model.transform.localPosition = new Laya.Vector3(
              0,
              0,
              0
            );

          this.pai3D.model.transform.localScale = new Laya.Vector3(1, 1, 1);

          this.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
              0,
              180,
              0
            );

          this.pai3D.model.active = !0;
        } catch (t) {
          var i = {};
          i.error = t.message;
          i.stack = t.stack;
          i.method = 'HandPai3D';
          i.name = 'SetVal';
          var n = '';
          n += 'pai3D';
          n += ' model';

          this.pai3D &&
            ((this.pai3D.model && (this.pai3D.model.transform && (n += ' transform'))));

          this.contianer_pai && (n += ' contianer_pai');
          i.iinfo = n;
          GameMgr.Inst.onFatalError(i);
        }
      }

      SetIndex(e, i) {
        this.model
          ? this.model.destroyed
            ? app.Log.Error(`SetIndex index:${e} model已经被删除`)
            : this.model.transform ||
              app.Log.Error(`SetIndex index:${e} model.transform不存在`)
          : app.Log.Error(`SetIndex index:${e} model不存在`);

        this._isnew = i;
        this._index = e;
        this.model.transform.localPosition = new Laya.Vector3(
            -t.PAIMODEL_WIDTH * (e + (i ? 0.5 : 0)) * 1.01,
            0.5 * -t.PAIMODEL_HEIGHT,
            0
          );
      }

      Stand() {
        this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0
        );

        this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          );

        this.pai3D.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * t.PAIMODEL_HEIGHT,
            0
          );

        this.shadow.transform.localScale = new Laya.Vector3(
            0.53 * t.PAIMODEL_WIDTH,
            1,
            0.53 * t.PAIMODEL_THICKNESS
          );

        this.shadow.transform.localPosition = new Laya.Vector3(0, 0, 0);
        this.shadow.active = !0;
      }

      FullDown() {
        this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0.5 * t.PAIMODEL_THICKNESS
        );

        this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            90,
            0,
            0
          );

        this.pai3D.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * t.PAIMODEL_HEIGHT,
            0.5 * -t.PAIMODEL_THICKNESS
          );

        this.shadow.transform.localScale = new Laya.Vector3(
            0.53 * t.PAIMODEL_WIDTH,
            1,
            0.53 * t.PAIMODEL_HEIGHT
          );

        this.shadow.transform.localPosition = new Laya.Vector3(
            0,
            0,
            0.5 * (t.PAIMODEL_HEIGHT + t.PAIMODEL_THICKNESS)
          );

        this.shadow.active = !0;
      }

      Cover() {
        this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0.5 * -t.PAIMODEL_THICKNESS
        );

        this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            -90,
            0,
            0
          );

        this.pai3D.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * t.PAIMODEL_HEIGHT,
            0.5 * t.PAIMODEL_THICKNESS
          );

        this.shadow.transform.localScale = new Laya.Vector3(
            0.53 * t.PAIMODEL_WIDTH,
            1,
            0.53 * t.PAIMODEL_HEIGHT
          );

        this.shadow.transform.localPosition = new Laya.Vector3(
            0,
            0,
            0.5 * -(t.PAIMODEL_HEIGHT + t.PAIMODEL_THICKNESS)
          );

        this.shadow.active = !0;
      }

      DoAnim_FullDown() {
        var t = this;
        this.FullDown();
        this._lifetime = 120;
        this._starttime = Laya.timer.currTimer;

        this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          );

        this.shadow.active = !1;
        Laya.timer.clearAll(this);
        Laya.timer.frameLoop(1, this, () => {
          var e = Laya.timer.currTimer - t._starttime;
          t.FullDown();
          if (e >= t._lifetime) Laya.timer.clearAll(t);
          else {
            var i = e / t._lifetime;
            t.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
              90 * i * i,
              0,
              0
            );
          }
        });
      }

      DoAnim_Cover() {
        var t = this;
        this.Cover();
        this._lifetime = 120;
        this._starttime = Laya.timer.currTimer;

        this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          );

        this.shadow.active = !1;
        Laya.timer.clearAll(this);
        Laya.timer.frameLoop(1, this, () => {
          var e = Laya.timer.currTimer - t._starttime;
          t.Cover();
          if (e >= t._lifetime) Laya.timer.clearAll(t);
          else {
            var i = e / t._lifetime;
            t.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
              -90 * i * i,
              0,
              0
            );
          }
        });
      }

      DoAnim_Stand() {
        var t = this;
        this.Cover();
        this._lifetime = 150;
        this._starttime = Laya.timer.currTimer;
        this.shadow.active = !1;
        Laya.timer.clearAll(this);
        Laya.timer.frameLoop(1, this, () => {
          var e = Laya.timer.currTimer - t._starttime - 300;
          t.Stand();
          if (e >= t._lifetime) Laya.timer.clearAll(t);
          else if (e >= 0) {
            var i = e / t._lifetime;
            t.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
              90 * i - 90,
              0,
              0
            );
          }
        });
      }

      Destory() {
        Laya.timer.clearAll(this);
        this.contianer_pai.destroy(!0);
        this.pai3D.model.destroy(!0);
        this.shadow.destroy(!0);
        this.model.destroy(!0);
        this.contianer_pai = null;
        null != this.contianer_pai &&
          ((this.pai3D = null));
      }
    }

    return e;
  })();
  t.HandPai3D = e;
})(view || (view = {}));