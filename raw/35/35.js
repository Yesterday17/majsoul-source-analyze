var view;
!(function(t) {
  var e = (function() {
    function e(t, e) {
      (this.origin = null),
        (this.player = null),
        (this.xOffset = 0),
        (this.pais = new Array()),
        (this.origin = t),
        (this.xOffset = 0),
        (this.player = e);
    }
    return (
      Object.defineProperty(e.prototype, 'seat', {
        get: function() {
          return this.player.seat;
        },
        enumerable: !0,
        configurable: !0
      }),
      (e.prototype.Reset = function() {
        if ((Laya.timer.clearAll(this), this.pais.length > 0)) {
          for (var t = 0; t < this.pais.length; t++)
            this.pais[t].model.destroy();
          this.pais = [];
        }
        this.xOffset = 0;
      }),
      (e.prototype.AddBabei = function(e, i, n) {
        var a = this;
        void 0 === n && (n = !0);
        try {
          var r = new t.ViewPai(e, t.DesktopMgr.Inst.CreatePai3D(e));
          this.pais.push(r),
            t.DesktopMgr.Inst.showingPaopai &&
              ((r.ismoqie = i),
              (r.ispaopai = t.DesktopMgr.Inst.isPaoPai(r.val))),
            r.OnChoosedPai();
          var s = t.DesktopMgr.Inst.effect_shadow.clone();
          r.model.addChild(s),
            (s.transform.localPosition = new Laya.Vector3(
              0,
              0,
              0.5 * -t.PAIMODEL_THICKNESS
            )),
            (s.transform.localScale = new Laya.Vector3(
              0.53 * t.PAIMODEL_WIDTH,
              1,
              0.53 * t.PAIMODEL_HEIGHT
            )),
            (s.transform.localRotationEuler = new Laya.Vector3(90, 0, 0)),
            (s.active = !0);
          if (
            (this.origin.parent.addChild(r.model),
            (r.model.transform.localPosition = this.origin.transform.localPosition.clone()),
            (this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02),
            r.ShowUp(),
            (r.model.transform.localPosition.x -= this.xOffset),
            (this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02),
            t.DesktopMgr.Inst.SetLastQiPai(this.player.seat, r),
            n)
          ) {
            var o = r.model.transform.localPosition.clone(),
              l = r.model.transform.position.clone();
            this.player.hand3d.transform.position = l.clone();
            this.player.hand3d
              .getChildAt(0)
              .getChildByName('node_tile')
              .addChild(r.model),
              (r.model.transform.localScale = new Laya.Vector3(
                1.1111,
                1.1111,
                1.1111
              )),
              (r.model.transform.localPosition = new Laya.Vector3(0, 0, 0)),
              (r.model.transform.localRotationEuler = new Laya.Vector3(
                0,
                0,
                0
              ));
            var h = t.ModelAnimationController.get_anim_config(
              'Dapai',
              this.player.hand_type
            );
            this.player.playHandAnimtion(h),
              Laya.timer.once(h.keypoint[0], this, function() {
                t.AudioMgr.PlayAudio(207);
              }),
              Laya.timer.once(h.keypoint[1], this, function() {
                r &&
                  r.model &&
                  !r.model.destroyed &&
                  (a.origin.parent.addChild(r.model),
                  (r.model.transform.localScale = new Laya.Vector3(1, 1, 1)),
                  r.ShowUp(),
                  (r.model.transform.localPosition = o));
              }),
              t.DesktopMgr.Inst.ActionRunComplete();
          }
        } catch (t) {
          var c = {};
          (c.error = t.message),
            (c.stack = t.stack),
            (c.method = 'Babei'),
            (c.class = 'Block_Babei'),
            GameMgr.Inst.onFatalError(c);
        }
      }),
      (e.prototype.OnDoraRefresh = function() {
        if (null != this.pais)
          for (var t = 0; t < this.pais.length; t++) this.pais[t].RefreshDora();
      }),
      (e.prototype.OnChoosedPai = function() {
        if (null != this.pais)
          for (var t = 0; t < this.pais.length; t++)
            this.pais[t].OnChoosedPai();
      }),
      e
    );
  })();
  t.Block_Babei = e;
})(view || (view = {}));