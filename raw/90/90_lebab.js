let view;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this) || this;
      return (
        (t.desktop = null),
        (t.seat = 0),
        (t.trans_hand = null),
        (t.trans_paihai = null),
        (t.trans_ming = null),
        (t.trans_liqi = null),
        (t.trans_ind = null),
        (t.trans_dir = null),
        (t.trans_man = null),
        (t.trans_babei = null),
        (t.container_score = null),
        (t.trans_scores = null),
        (t.hand3d = null),
        (t._hand_models = []),
        (t._anim_hands = []),
        (t.container_qipai = null),
        (t.container_ming = null),
        (t.container_babei = null),
        (t.score = 0),
        (t.duringShowDetla = false),
        (t.anim_id = 0),
        (t.trans_liqi_position = null),
        (t.trans_liqi_scale = null),
        (t.liqibang = null),
        (t.hand_type = 'hand_human'),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.Init = function(e, i, n, a, r, s, o) {
      (this.desktop = e),
        (this.seat = i),
        (this.trans_hand = n),
        (this.trans_paihai = r),
        (this.trans_ming = a),
        (this.trans_man = s),
        (this.trans_babei = o);
      for (h = 0; h < this.trans_hand.parent.numChildren; h++)
        this.trans_hand.parent.getChildAt(h).active = false;
      for (h = 0; h < this.trans_ming.parent.numChildren; h++)
        this.trans_ming.parent.getChildAt(h).active = false;
      for (h = 0; h < this.trans_paihai.parent.numChildren; h++)
        this.trans_paihai.parent.getChildAt(h).active = false;
      for (h = 0; h < this.trans_babei.parent.numChildren; h++)
        this.trans_babei.parent.getChildAt(h).active = false;
      (this.container_qipai = new t.Block_QiPai(r, this)),
        (this.container_ming = new t.Block_Ming(a, this)),
        (this.container_babei = new t.Block_Babei(o, this)),
        (this.trans_liqi = s.getChildByName('liqi')),
        (this.trans_liqi.active = false),
        (this.trans_liqi_position = this.trans_liqi.transform.localPosition),
        (this.trans_liqi_scale = this.trans_liqi.transform.localScale),
        (this.trans_dir = s.getChildByName('dir')),
        (this.trans_ind = s.getChildByName('ind'));
      const l = s.getChildByName('score');
      (this.container_score = l), (this.trans_scores = new Array());
      for (var h = 0; h < 10; h++)
        this.trans_scores.push(l.getChildByName(h.toString()));
      (this.hand3d = s.parent.getChildByName(`hand_${(i + 1).toString()}`)),
        (this.hand3d.active = false),
        this.SetScore(25e3, 25e3),
        this.RefreshDir();
    }),
    (i.prototype.onInitRoom = function(e) {
      if (((this.seat = e), -1 != this.seat)) {
        (this.trans_man.active = true),
          this.create_liqibang(
            t.DesktopMgr.Inst.player_effects[this.seat].liqibang
          );
        const i = t.DesktopMgr.Inst.player_effects[this.seat].hand;
        this.create_hand(i);
      } else this.trans_man.active = false;
    }),
    (i.prototype.create_liqibang = function(t) {
      this.liqibang && (this.liqibang.destroy(true), (this.liqibang = null)),
        (this.liqibang = Laya.loader.getRes(t).clone()),
        this.trans_liqi.addChild(this.liqibang),
        (this.liqibang.transform.localPosition = new Laya.Vector3(0, 0, 0)),
        (this.liqibang.transform.localScale = new Laya.Vector3(1, 1, 1)),
        (this.liqibang.transform.localRotationEuler = new Laya.Vector3(
          0,
          0,
          0
        )),
        (this.liqibang.active = true);
      const e = t => {
        if ('shadow' != t.name) {
          if (t instanceof Laya.MeshSprite3D) {
            const i = t;
            if (i.meshRender && i.meshRender.sharedMaterial) {
              const n = new caps.BaseMaterial(caps.Cartoon.filename);
              n.setTexture(
                caps.Cartoon.TEXTURE,
                i.meshRender.material.albedoTexture
              ),
                n.setNumber(caps.Cartoon.SPLIT, 0.4),
                n.setColor(
                  caps.Cartoon.COLOR_LIGHT,
                  new Laya.Vector3(1, 1, 1)
                ),
                n.setColor(
                  caps.Cartoon.COLOR_UNLIGHT,
                  new Laya.Vector3(1, 1, 1)
                ),
                n.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1)),
                (i.meshRender.sharedMaterial = n);
            }
          }
          for (let a = 0; a < t.numChildren; a++) e(t.getChildAt(a));
        }
      };
      e(this.liqibang.getChildAt(0));
    }),
    (i.prototype.create_hand = function(t) {
      if (
        ((this.hand_type = t), (this._anim_hands = []), this._hand_models)
      ) {
        for (let e = 0; e < this._hand_models.length; e++)
          this._hand_models[e].destroy(true);
        this._hand_models = [];
      }
      const i = `scene/${t}.lh`;
      const n = Laya.loader.getRes(i);
      n
        .getChildAt(0)
        .getChildByName('node_liqibang')
        .getChildByName('p') &&
        n
          .getChildAt(0)
          .getChildByName('node_liqibang')
          .getChildByName('p')
          .destroy(true),
        n
          .getChildAt(0)
          .getChildByName('node_tile')
          .getChildByName('p') &&
          n
            .getChildAt(0)
            .getChildByName('node_tile')
            .getChildByName('p')
            .destroy(true);
      const a = n.getChildAt(0).clone();
      this.hand3d.addChild(a),
        (a.transform.localPosition = new Laya.Vector3(0, 0, 0)),
        (a.transform.localScale = new Laya.Vector3(0.9, 0.9, 0.9)),
        (a.transform.localRotation = new Laya.Quaternion(0, 0, 0, 0)),
        (this._anim_hands = [a.getComponentByType(Laya.Animator)]),
        (this._hand_models = [a]);
      let r = new Laya.Vector3(0.9725, 0.9137, 0.937);
      'hand_cat_blue' == t &&
        (r = new Laya.Vector3(216 / 255, 210 / 255, 206 / 255));
      const s = a.getChildByName('hand');
      const o = new caps.BaseMaterial(caps.Cartoon.filename);
      if (
        (o.setTexture(
          caps.Cartoon.TEXTURE,
          s.skinnedMeshRender.sharedMaterials[0].albedoTexture
        ),
        o.setColor(caps.Cartoon.COLOR_LIGHT, new Laya.Vector3(1, 1, 1)),
        o.setColor(caps.Cartoon.COLOR_UNLIGHT, r),
        o.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1)),
        o.setNumber(caps.Cartoon.SPLIT, 0.4),
        2 == s.skinnedMeshRender.sharedMaterials.length)
      ) {
        const l = new caps.BaseMaterial(caps.Cartoon.filename);
        l.setTexture(
          caps.Cartoon.TEXTURE,
          s.skinnedMeshRender.sharedMaterials[1].albedoTexture
        ),
          l.setColor(caps.Cartoon.COLOR_LIGHT, new Laya.Vector3(1, 1, 1)),
          l.setColor(caps.Cartoon.COLOR_UNLIGHT, r),
          l.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1)),
          l.setNumber(caps.Cartoon.SPLIT, 0.4),
          (s.skinnedMeshRender.sharedMaterials = [o, l]);
      } else s.skinnedMeshRender.sharedMaterials = [o];
      let h = new Laya.Vector3(0.6823, 0.447, 0.408);
      let c = 0.6;
      'hand_cat_blue' == t &&
        ((h = new Laya.Vector3(83 / 255, 65 / 255, 63 / 255)), (c = 0.9));
      const u = a.clone();
      u.getChildByName('node_liqibang').destroy(true),
        u.getChildByName('node_tile').destroy(true),
        u.getChildByName('Dum_Shadow') &&
          u.getChildByName('Dum_Shadow').destroy(true),
        u.getChildByName('Bone021') &&
          u.getChildByName('Bone021').destroy(true),
        a.addChild(u),
        (u.transform.localPosition = new Laya.Vector3(0, 0, 0)),
        (u.transform.localScale = new Laya.Vector3(1, 1, 1)),
        (u.transform.localRotation = new Laya.Quaternion(0, 0, 0, 0));
      const _ = u.getChildByName('hand');
      const d = new caps.Material_Outline(caps.Outline.filename);
      d.setColor(caps.Outline.OUTLINE_COLOR, h),
        d.setNumber(caps.Outline.OUTLINE_ALPHA, c),
        d.setNumber(caps.Outline.OUTLINE, 0.001);
      const f = new caps.Material_Outline(caps.Outline.filename);
      f.setColor(caps.Outline.OUTLINE_COLOR, h),
        f.setNumber(caps.Outline.OUTLINE_ALPHA, c),
        f.setNumber(caps.Outline.OUTLINE, 0.001),
        (_.skinnedMeshRender.sharedMaterials = [d, f]),
        this._anim_hands.push(u.getComponentByType(Laya.Animator)),
        this._hand_models.push(u),
        (this.hand3d.active = true),
        (this.hand3d.transform.position = new Laya.Vector3(0, 0, 0));
    }),
    (i.prototype.playHandAnimtion = function({name, speed, lifetime}) {
      const e = this;
      this.hand3d.active = true;
      for (let i = 0; i < this._anim_hands.length; i++)
        this._anim_hands[i].play(name, speed);
      (this.hand3d.transform.localScale = new Laya.Vector3(1e-4, 1e-4, 1)),
        Laya.timer.frameOnce(1, this, () => {
          e.hand3d.transform.localScale = new Laya.Vector3(1, 1, 1);
        }),
        this.anim_id++;
      const n = this.anim_id;
      Laya.timer.once(lifetime, this, () => {
        n == e.anim_id && (e.hand3d.active = false);
      });
    }),
    (i.prototype.setSeat = function(t) {
      this.seat = t;
    }),
    (i.prototype.Reset = function() {
      (this.duringShowDetla = false),
        this.container_ming.Reset(),
        this.container_qipai.Reset(),
        this.container_babei.Reset(),
        (this.trans_liqi.active = false),
        this.hand3d && (this.hand3d.active = false),
        Laya.timer.clearAll(this),
        (this.anim_id = 0);
    }),
    (i.prototype.AddQiPai = function(t, e, i, n) {
      undefined === n && (n = true), this.container_qipai.AddQiPai(t, e, i, n);
    }),
    (i.prototype.QiPaiPass = function() {
      this.container_qipai.QiPaiPass();
    }),
    (i.prototype.QiPaiNoPass = function() {
      this.container_qipai.QiPaiNoPass();
    }),
    (i.prototype.AddMing = function(t, e) {
      undefined === e && (e = true), this.container_ming.AddMing(t, e);
    }),
    (i.prototype.AddGang = function(t, e) {
      undefined === e && (e = true), this.container_ming.AddGang(t, e);
    }),
    (i.prototype.AddBabei = function(t, e, i) {
      undefined === i && (i = true), this.container_babei.AddBabei(t, e, i);
    }),
    (i.prototype.ShowLiqi = function(e) {
      const i = this;
      if (
        (undefined === e && (e = true),
        (this.trans_liqi.transform.localPosition = this.trans_liqi_position),
        (this.trans_liqi.transform.localScale = this.trans_liqi_scale),
        (this.trans_liqi.active = true),
        e)
      ) {
        (this.hand3d.transform.position = this.trans_liqi.transform.position.clone()),
          this.hand3d
            .getChildAt(0)
            .getChildByName('node_liqibang')
            .addChild(this.trans_liqi),
          (this.trans_liqi.transform.localScale = new Laya.Vector3(
            0.011111,
            0.011111,
            0.01111
          )),
          (this.trans_liqi.transform.localPosition = new Laya.Vector3(
            0,
            0,
            0
          )),
          (this.trans_liqi.transform.localRotation = new Laya.Quaternion(
            0,
            0,
            -0.7,
            -0.7
          )),
          (this.hand3d.active = true);
        const n = t.ModelAnimationController.get_anim_config(
          'LiZhi',
          this.hand_type
        );
        this.playHandAnimtion(n),
          Laya.timer.once(n.keypoint[0], this, () => {
            i.trans_man.addChild(i.trans_liqi),
              (i.trans_liqi.transform.localPosition = i.trans_liqi_position),
              (i.trans_liqi.transform.localScale = i.trans_liqi_scale),
              (i.trans_liqi.transform.localRotation = new Laya.Quaternion(
                0,
                0,
                0,
                1
              ));
          });
      }
    }),
    (i.prototype.SetScore = function(t, e) {
      (this.score = t), this.RefreshScore(e);
    }),
    (i.prototype.RefreshDir = function() {
      if (-1 != this.seat) {
        const e = new Laya.Vector4();
        let i = 0;
        (i =
          t.DesktopMgr.Inst.rule_mode == t.ERuleMode.Liqi3
            ? (this.seat - t.DesktopMgr.Inst.index_ju + 3) % 3
            : (this.seat - t.DesktopMgr.Inst.index_ju + 4) % 4),
          (e.z = 0.25 * i),
          (e.w = 0),
          (e.x = 0.25),
          (e.y = 1),
          (this.trans_dir.meshRender.material.tilingOffset = e);
      }
    }),
    (i.prototype.RefreshScore = function(t) {
      if (-1 == this.seat) this.container_score.active = false;
      else {
        this.container_score.active = true;
        let e = '';
        let i = 0;
        if (this.duringShowDetla) {
          const n = this.score - t;
          n > 0
            ? ((e = `+${n.toString()}`), (i = -0.33333))
            : ((e = n.toString()), (i = -0.66667));
        } else (e = this.score.toString()), (i = 0);
        for (s = 0; s < e.length && s < this.trans_scores.length; s++) {
          let a = 0;
          switch (e[e.length - s - 1]) {
            case '-':
              a = 0;
              break;
            case '+':
              a = 1;
              break;
            case '0':
              a = 2;
              break;
            case '1':
              a = 3;
              break;
            case '2':
              a = 4;
              break;
            case '3':
              a = 5;
              break;
            case '4':
              a = 6;
              break;
            case '5':
              a = 7;
              break;
            case '6':
              a = 8;
              break;
            case '7':
              a = 9;
              break;
            case '8':
              a = 10;
              break;
            case '9':
              a = 11;
          }
          a /= 12;
          const r = new Laya.Vector4();
          (r.z = a),
            (r.w = i),
            (r.x = 1 / 12),
            (r.y = 1 / 3),
            (this.trans_scores[s].meshRender.material.tilingOffset = r),
            (this.trans_scores[s].active = true);
        }
        for (var s = e.length; s < this.trans_scores.length; s++)
          this.trans_scores[s].active = false;
        if (e.length <= 6) {
          ((o = this.container_score.transform.localPosition.clone()).x =
            (0.165 * (e.length - 1)) / 2 - 0.5325),
            (this.container_score.transform.localPosition = o),
            (this.container_score.transform.localScale = new Laya.Vector3(
              1,
              1,
              1
            ));
        } else {
          var o = this.container_score.transform.localPosition.clone();
          (o.x = -0.12), (this.container_score.transform.localPosition = o);
          const l = 0.56 + ((10 - e.length) / 4) * (1 - 0.56);
          const h = 0.9 + ((10 - e.length) / 4) * (1 - 0.9);
          this.container_score.transform.localScale = new Laya.Vector3(
            l,
            h,
            1
          );
        }
      }
    }),
    (i.prototype.Hule = (t, e, i, n) => {}),
    (i.prototype.Huangpai = (t, e, i) => {}),
    (i.prototype.OnDoraRefresh = function() {
      this.container_qipai.OnDoraRefresh(),
        this.container_ming.OnDoraRefresh(),
        this.container_babei.OnDoraRefresh();
    }),
    (i.prototype.OnChoosePai = function() {
      this.container_qipai.OnChoosedPai(),
        this.container_ming.OnChoosedPai(),
        this.container_babei.OnChoosedPai();
    }),
    (i.prototype.PlaySound = function(e) {
      let i = '';
      switch (e) {
        case 'act_chi':
          i = 'chi';
          break;
        case 'act_drich':
        case 'act_rich':
          i = 'lizhi';
          break;
        case 'act_kan':
          i = 'gang';
          break;
        case 'act_pon':
          i = 'peng';
          break;
        case 'act_babei':
          i = 'babei';
      }
      '' != i &&
        uiscript.UI_DesktopInfo.Inst.shout(
          t.DesktopMgr.Inst.seat2LocalPosition(this.seat),
          i,
          this.desktop.player_datas[this.seat]
        ),
        t.AudioMgr.PlayCharactorSound(
          this.desktop.player_datas[this.seat].character,
          e
        );
    }),
    i
  ;
  })(Laya.Script);
  t.ViewPlayer = e;
})(view || (view = {}));