let view;
!(t => {
  const e = (() => {
    function e(e, i) {
      (this.player = null),
        (this.origin = null),
        (this.pais = null),
        (this.cx = 0),
        (this.cy = 0),
        (this.x_count = 0),
        (this.last_pai = null),
        (this.last_is_liqi = false),
        (this.after_liqi = false),
        (this.waiting_offset = new Laya.Vector2(
          0.4 * t.PAIMODEL_WIDTH,
          0.4 * t.PAIMODEL_HEIGHT
        )),
        (this.xwidth = 0),
        (this.origin = e),
        (this.pais = new Array()),
        (this.player = i);
    }
    return (e.prototype.AddQiPai = function(e, i, n, a) {
      const r = this;
      undefined === a && (a = true), this.QiPaiPass();
      const s = new t.ViewPai(e, t.DesktopMgr.Inst.CreatePai3D(e));
      t.DesktopMgr.Inst.showingPaopai &&
        ((s.ismoqie = n), (s.ispaopai = t.DesktopMgr.Inst.isPaoPai(s.val))),
        s.OnChoosedPai(),
        this.origin.parent.addChild(s.model),
        this.last_is_liqi && !i && (i = true);
      const o = Math.atan(t.PAIMODEL_HEIGHT / t.PAIMODEL_WIDTH);
      const l = 2 * (Math.random() - 0.5) * 2;
      let h = 0;
      let c = 0;
      i
        ? ((s.model.transform.localRotationEuler = new Laya.Vector3(
            90,
            90 + l,
            0
          )),
          (c =
            ((h =
              (Math.sqrt(
                t.PAIMODEL_HEIGHT * t.PAIMODEL_HEIGHT +
                  t.PAIMODEL_WIDTH * t.PAIMODEL_WIDTH
              ) /
                2) *
                Math.cos(1.5707963 - o - (3.1415926 * Math.abs(l)) / 180) *
                2 +
              0.01 * t.PAIMODEL_WIDTH) -
              t.PAIMODEL_WIDTH) /
            2))
        : ((s.model.transform.localRotationEuler = new Laya.Vector3(
            90,
            l,
            0
          )),
          (c =
            ((h =
              (Math.sqrt(
                t.PAIMODEL_HEIGHT * t.PAIMODEL_HEIGHT +
                  t.PAIMODEL_WIDTH * t.PAIMODEL_WIDTH
              ) /
                2) *
                Math.cos(o - (3.1415926 * Math.abs(l)) / 180) *
                2 +
              0.01 * t.PAIMODEL_WIDTH) -
              t.PAIMODEL_WIDTH) /
            2));
      let u = 0;
      let _ = 0;
      let d = this.cx + c;
      let f = this.cy;
      if (
        (Math.random() < 0.2 &&
          ((h += u = Math.random() * t.PAIMODEL_WIDTH * 0.025), (d += u)),
        (this.xwidth = h),
        (_ = 2 * (Math.random() - 0.5) * t.PAIMODEL_HEIGHT * 0.025),
        (f += _),
        (s.model.transform.localPosition = this.origin.transform.localPosition.clone()),
        (s.model.active = true),
        (s.model.transform.localPosition.x += d),
        (s.model.transform.localPosition.z -= f),
        a)
      ) {
        const p = s.model.transform.position.clone();
        this.player.hand3d.transform.position = p.clone();
        this.player.hand3d
          .getChildAt(0)
          .getChildByName('node_tile')
          .addChild(s.model),
          (s.model.transform.localPosition = new Laya.Vector3(0, 0, 0)),
          (s.model.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            -((i ? 90 : 0) + l)
          )),
          (s.model.transform.localScale = new Laya.Vector3(
            1.1111,
            1.1111,
            1.1111
          ));
        let m = null;
        if (i) {
          const g =
            t.DesktopMgr.Inst.player_effects[this.player.seat].effect_liqi;
          g && '' != g
            ? 'scene/effect_liqi_ice.lh' == g ||
              'scene/effect_liqi_feiyu.lh' == g ||
              'scene/effect_liqi_longteng.lh' == g
              ? ((m = t.ModelAnimationController.get_anim_config(
                  'Dapai',
                  this.player.hand_type
                )),
                Laya.timer.once(m.keypoint[0], this, () => {
                  const e = game.EffectMgr.create_d3_effect(g);
                  r.origin.parent.addChild(e);
                  let i = -1;
                  switch (g) {
                    case 'scene/effect_liqi_ice.lh':
                      i = 235;
                      break;
                    case 'scene/effect_liqi_feiyu.lh':
                      i = 305033;
                      break;
                    case 'scene/effect_liqi_longteng.lh':
                      i = 305038;
                  }
                  i > 0 && t.AudioMgr.PlayAudio(i),
                    Laya.timer.frameLoop(1, e, () => {
                      s && s.model && !s.model.destroyed
                        ? (e.transform.worldMatrix = s.model.transform.worldMatrix.clone())
                        : (Laya.timer.clearAll(e), e.destroy(true));
                    }),
                    Laya.timer.once(5e3, r, () => {
                      e &&
                        !e.destroyed &&
                        (Laya.timer.clearAll(e), e.destroy(true));
                    });
                }))
              : ((m = t.ModelAnimationController.get_anim_config(
                  'LiQiPai',
                  this.player.hand_type
                )),
                Laya.timer.once(m.keypoint[0], this, () => {
                  const e = game.EffectMgr.create_d3_effect(g);
                  r.origin.parent.addChild(e);
                  let i = -1;
                  switch (g) {
                    case 'scene/effect_liqi_fire.lh':
                      i = 236;
                      break;
                    case 'scene/effect_liqi_canying.lh':
                      i = 305032;
                      break;
                    case 'scene/effect_liqi_ding.lh':
                      i = 305037;
                  }
                  i > 0 && t.AudioMgr.PlayAudio(i),
                    Laya.timer.frameLoop(1, e, () => {
                      s && s.model && !s.model.destroyed
                        ? (e.transform.worldMatrix = s.model.transform.worldMatrix.clone())
                        : (Laya.timer.clearAll(e), e.destroy(true));
                    }),
                    Laya.timer.once(1500, r, () => {
                      e &&
                        !e.destroyed &&
                        (Laya.timer.clearAll(e), e.destroy(true));
                    });
                }))
            : (m = t.ModelAnimationController.get_anim_config(
                'Dapai',
                this.player.hand_type
              ));
        } else
          m = t.ModelAnimationController.get_anim_config(
            'Dapai',
            this.player.hand_type
          );
        this.player.playHandAnimtion(m),
          Laya.timer.once(m.keypoint[0], this, () => {
            t.AudioMgr.PlayAudio(207);
          }),
          Laya.timer.once(m.keypoint[1], this, () => {
            s &&
              s.model &&
              !s.model.destroyed &&
              (r.origin.parent.addChild(s.model),
              (s.model.transform.localScale = new Laya.Vector3(1, 1, 1)),
              (s.model.transform.localRotationEuler = i
                ? new Laya.Vector3(90, 90 + l, 0)
                : new Laya.Vector3(90, l, 0)),
              (r.last_pai.model.transform.localPosition = r.origin.transform.localPosition.clone()),
              (r.last_pai.model.transform.localPosition.x += d),
              (r.last_pai.model.transform.localPosition.z -= f));
          });
      }
      (this.last_pai = s),
        (this.last_is_liqi = i),
        t.DesktopMgr.Inst.SetLastQiPai(this.player.seat, s);
      const y = t.DesktopMgr.Inst.effect_shadow.clone();
      s.model.addChild(y),
        (y.transform.localPosition = new Laya.Vector3(
          0,
          0,
          0.5 * -t.PAIMODEL_THICKNESS
        )),
        (y.transform.localScale = new Laya.Vector3(
          0.53 * t.PAIMODEL_WIDTH,
          1,
          0.53 * t.PAIMODEL_HEIGHT
        )),
        (y.transform.localRotationEuler = new Laya.Vector3(90, 0, 0)),
        (y.active = true);
    }),
    (e.prototype.QiPaiPass = function() {
      null != this.last_pai &&
        (this.pais.push(this.last_pai),
        this.x_count++,
        6 == this.x_count && this.pais.length <= 12
          ? ((this.cx = 0),
            (this.cy += 1.05 * t.PAIMODEL_HEIGHT),
            (this.x_count = 0))
          : (this.cx += this.xwidth),
        (this.last_pai = null),
        (this.last_is_liqi = false));
    }),
    (e.prototype.QiPaiNoPass = function() {
      this.last_pai && this.last_pai.model.destroy(), (this.last_pai = null);
    }),
    (e.prototype.Reset = function() {
      if (this.pais.length > 0) {
        for (let t = 0; t < this.pais.length; t++)
          this.pais[t].model.destroy();
        this.pais = new Array();
      }
      (this.cx = this.cy = 0),
        (this.x_count = 0),
        null != this.last_pai && this.last_pai.model.destroy(),
        (this.last_pai = null),
        (this.last_is_liqi = false),
        (this.after_liqi = false),
        Laya.timer.clearAll(this);
    }),
    (e.prototype.OnDoraRefresh = function() {
      if (
        (null != this.last_pai && this.last_pai.RefreshDora(),
        null != this.pais)
      )
        for (let t = 0; t < this.pais.length; t++) this.pais[t].RefreshDora();
    }),
    (e.prototype.OnChoosedPai = function() {
      if (
        (null != this.last_pai && this.last_pai.OnChoosedPai(),
        null != this.pais)
      )
        for (let t = 0; t < this.pais.length; t++)
          this.pais[t].OnChoosedPai();
    }),
    e
  ;
  })();
  t.Block_QiPai = e;
})(view || (view = {}));