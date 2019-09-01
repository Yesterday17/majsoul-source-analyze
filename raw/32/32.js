var view;
!(function(t) {
  var e = (function() {
    function e(e) {
      (this.val = null),
        (this.model = null),
        (this.contianer_pai = null),
        (this.pai3D = null),
        (this.shadow = null),
        (this._starttime = 0),
        (this._lifetime = 150),
        (this._index = 0),
        (this._isnew = false),
        (this.model = new Laya.Sprite3D()),
        e.addChild(this.model),
        (this.model.transform.localPosition = new Laya.Vector3(
          0,
          0.5 * -t.PAIMODEL_HEIGHT,
          0
        )),
        (this.model.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)),
        (this.model.transform.localScale = new Laya.Vector3(1, 1, 1)),
        (this.model.active = true),
        (this.contianer_pai = new Laya.Sprite3D()),
        this.model.addChild(this.contianer_pai),
        (this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0
        )),
        (this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
          0,
          0,
          0
        )),
        (this.contianer_pai.transform.localScale = new Laya.Vector3(1, 1, 1)),
        (this.contianer_pai.active = true),
        (this.shadow = t.DesktopMgr.Inst.effect_shadow.clone()),
        this.model.addChild(this.shadow),
        (this.shadow.transform.localPosition = new Laya.Vector3(0, 0, 0)),
        (this.shadow.transform.localScale = new Laya.Vector3(1, 1, 1)),
        (this.shadow.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)),
        (this.shadow.active = true);
    }
    return (
      (e.prototype.SetVal = function(e) {
        try {
          null != this.pai3D &&
            (this.pai3D.model.destroy(), (this.pai3D = null)),
            (this.val = e),
            (this.pai3D = new t.ViewPai(e, t.DesktopMgr.Inst.CreatePai3D(e))),
            this.contianer_pai.addChild(this.pai3D.model),
            (this.pai3D.model.transform.localPosition = new Laya.Vector3(
              0,
              0,
              0
            )),
            (this.pai3D.model.transform.localScale = new Laya.Vector3(1, 1, 1)),
            (this.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
              0,
              180,
              0
            )),
            (this.pai3D.model.active = true);
        } catch (t) {
          var i = {};
          (i.error = t.message),
            (i.stack = t.stack),
            (i.method = 'HandPai3D'),
            (i.name = 'SetVal');
          var n = '';
          this.pai3D &&
            ((n += 'pai3D'),
            this.pai3D.model &&
              ((n += ' model'),
              this.pai3D.model.transform && (n += ' transform'))),
            this.contianer_pai && (n += ' contianer_pai'),
            (i.iinfo = n),
            GameMgr.Inst.onFatalError(i);
        }
      }),
      (e.prototype.SetIndex = function(e, i) {
        this.model
          ? this.model.destroyed
            ? app.Log.Error('SetIndex index:' + e + ' model已经被删除')
            : this.model.transform ||
              app.Log.Error('SetIndex index:' + e + ' model.transform不存在')
          : app.Log.Error('SetIndex index:' + e + ' model不存在'),
          (this._isnew = i),
          (this._index = e),
          (this.model.transform.localPosition = new Laya.Vector3(
            -t.PAIMODEL_WIDTH * (e + (i ? 0.5 : 0)) * 1.01,
            0.5 * -t.PAIMODEL_HEIGHT,
            0
          ));
      }),
      (e.prototype.Stand = function() {
        (this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0
        )),
          (this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          )),
          (this.pai3D.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * t.PAIMODEL_HEIGHT,
            0
          )),
          (this.shadow.transform.localScale = new Laya.Vector3(
            0.53 * t.PAIMODEL_WIDTH,
            1,
            0.53 * t.PAIMODEL_THICKNESS
          )),
          (this.shadow.transform.localPosition = new Laya.Vector3(0, 0, 0)),
          (this.shadow.active = true);
      }),
      (e.prototype.FullDown = function() {
        (this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0.5 * t.PAIMODEL_THICKNESS
        )),
          (this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            90,
            0,
            0
          )),
          (this.pai3D.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * t.PAIMODEL_HEIGHT,
            0.5 * -t.PAIMODEL_THICKNESS
          )),
          (this.shadow.transform.localScale = new Laya.Vector3(
            0.53 * t.PAIMODEL_WIDTH,
            1,
            0.53 * t.PAIMODEL_HEIGHT
          )),
          (this.shadow.transform.localPosition = new Laya.Vector3(
            0,
            0,
            0.5 * (t.PAIMODEL_HEIGHT + t.PAIMODEL_THICKNESS)
          )),
          (this.shadow.active = true);
      }),
      (e.prototype.Cover = function() {
        (this.contianer_pai.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0.5 * -t.PAIMODEL_THICKNESS
        )),
          (this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            -90,
            0,
            0
          )),
          (this.pai3D.model.transform.localPosition = new Laya.Vector3(
            0,
            0.5 * t.PAIMODEL_HEIGHT,
            0.5 * t.PAIMODEL_THICKNESS
          )),
          (this.shadow.transform.localScale = new Laya.Vector3(
            0.53 * t.PAIMODEL_WIDTH,
            1,
            0.53 * t.PAIMODEL_HEIGHT
          )),
          (this.shadow.transform.localPosition = new Laya.Vector3(
            0,
            0,
            0.5 * -(t.PAIMODEL_HEIGHT + t.PAIMODEL_THICKNESS)
          )),
          (this.shadow.active = true);
      }),
      (e.prototype.DoAnim_FullDown = function() {
        var t = this;
        this.FullDown(),
          (this._lifetime = 120),
          (this._starttime = Laya.timer.currTimer),
          (this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          )),
          (this.shadow.active = false),
          Laya.timer.clearAll(this),
          Laya.timer.frameLoop(1, this, function() {
            var e = Laya.timer.currTimer - t._starttime;
            if (e >= t._lifetime) t.FullDown(), Laya.timer.clearAll(t);
            else {
              var i = e / t._lifetime;
              t.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
                90 * i * i,
                0,
                0
              );
            }
          });
      }),
      (e.prototype.DoAnim_Cover = function() {
        var t = this;
        this.Cover(),
          (this._lifetime = 120),
          (this._starttime = Laya.timer.currTimer),
          (this.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          )),
          (this.shadow.active = false),
          Laya.timer.clearAll(this),
          Laya.timer.frameLoop(1, this, function() {
            var e = Laya.timer.currTimer - t._starttime;
            if (e >= t._lifetime) t.Cover(), Laya.timer.clearAll(t);
            else {
              var i = e / t._lifetime;
              t.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
                -90 * i * i,
                0,
                0
              );
            }
          });
      }),
      (e.prototype.DoAnim_Stand = function() {
        var t = this;
        this.Cover(),
          (this._lifetime = 150),
          (this._starttime = Laya.timer.currTimer),
          (this.shadow.active = false),
          Laya.timer.clearAll(this),
          Laya.timer.frameLoop(1, this, function() {
            var e = Laya.timer.currTimer - t._starttime - 300;
            if (e >= t._lifetime) t.Stand(), Laya.timer.clearAll(t);
            else if (e >= 0) {
              var i = e / t._lifetime;
              t.contianer_pai.transform.localRotationEuler = new Laya.Vector3(
                90 * i - 90,
                0,
                0
              );
            }
          });
      }),
      (e.prototype.Destory = function() {
        null != this.contianer_pai &&
          (Laya.timer.clearAll(this),
          this.contianer_pai.destroy(true),
          this.pai3D.model.destroy(true),
          this.shadow.destroy(true),
          this.model.destroy(true),
          (this.contianer_pai = null),
          (this.pai3D = null));
      }),
      e
    );
  })();
  t.HandPai3D = e;
})(view || (view = {}));