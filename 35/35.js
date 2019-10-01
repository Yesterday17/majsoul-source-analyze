var view;
!(t => {
  var e = (() => {
    class e {
      constructor(t, e) {
        this.origin = null;
        this.player = null;
        this.xOffset = 0;
        this.pais = new Array();
        this.origin = t;
        this.xOffset = 0;
        this.player = e;
      }

      get seat() {
        return this.player.seat;
      }

      Reset() {
        Laya.timer.clearAll(this);
        if ((this.pais.length > 0)) {
          for (var t = 0; t < this.pais.length; t++)
            this.pais[t].model.destroy();
          this.pais = [];
        }
        this.xOffset = 0;
      }

      AddBabei(e, i, n) {
        var a = this;
        void 0 === n && (n = !0);
        try {
          var r = new t.ViewPai(e, t.DesktopMgr.Inst.CreatePai3D(e));
          this.pais.push(r);
          r.ismoqie = i;

          t.DesktopMgr.Inst.showingPaopai &&
            ((r.ispaopai = t.DesktopMgr.Inst.isPaoPai(r.val)));

          r.OnChoosedPai();
          var s = t.DesktopMgr.Inst.effect_shadow.clone();
          r.model.addChild(s);

          s.transform.localPosition = new Laya.Vector3(
              0,
              0,
              0.5 * -t.PAIMODEL_THICKNESS
            );

          s.transform.localScale = new Laya.Vector3(
              0.53 * t.PAIMODEL_WIDTH,
              1,
              0.53 * t.PAIMODEL_HEIGHT
            );

          s.transform.localRotationEuler = new Laya.Vector3(90, 0, 0);
          s.active = !0;
          this.origin.parent.addChild(r.model);
          r.model.transform.localPosition = this.origin.transform.localPosition.clone();
          this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02;
          r.ShowUp();
          r.model.transform.localPosition.x -= this.xOffset;
          this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02;
          t.DesktopMgr.Inst.SetLastQiPai(this.player.seat, r);
          if (
            (n)
          ) {
            var o = r.model.transform.localPosition.clone();
            var l = r.model.transform.position.clone();
            this.player.hand3d.transform.position = l.clone();

            this.player.hand3d
              .getChildAt(0)
              .getChildByName('node_tile')
              .addChild(r.model);

            r.model.transform.localScale = new Laya.Vector3(
                1.1111,
                1.1111,
                1.1111
              );

            r.model.transform.localPosition = new Laya.Vector3(0, 0, 0);
            r.model.transform.localRotationEuler = new Laya.Vector3(
                0,
                0,
                0
              );
            var h = t.ModelAnimationController.get_anim_config(
              'Dapai',
              this.player.hand_type
            );
            this.player.playHandAnimtion(h);

            Laya.timer.once(h.keypoint[0], this, () => {
              t.AudioMgr.PlayAudio(207);
            });

            Laya.timer.once(h.keypoint[1], this, () => {
              a.origin.parent.addChild(r.model);
              r.model.transform.localScale = new Laya.Vector3(1, 1, 1);
              r.ShowUp();
              r &&
                r.model &&
                !r.model.destroyed &&
                ((r.model.transform.localPosition = o));
            });

            t.DesktopMgr.Inst.ActionRunComplete();
          }
        } catch (t) {
          var c = {};
          c.error = t.message;
          c.stack = t.stack;
          c.method = 'Babei';
          c.class = 'Block_Babei';
          GameMgr.Inst.onFatalError(c);
        }
      }

      OnDoraRefresh() {
        if (null != this.pais)
          for (var t = 0; t < this.pais.length; t++) this.pais[t].RefreshDora();
      }

      OnChoosedPai() {
        if (null != this.pais)
          for (var t = 0; t < this.pais.length; t++)
            this.pais[t].OnChoosedPai();
      }
    }

    return e;
  })();
  t.Block_Babei = e;
})(view || (view = {}));