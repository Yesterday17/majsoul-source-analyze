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

var view;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this) || this;
        t.desktop = null;
        t.seat = 0;
        t.trans_hand = null;
        t.trans_paihai = null;
        t.trans_ming = null;
        t.trans_liqi = null;
        t.trans_ind = null;
        t.trans_dir = null;
        t.trans_man = null;
        t.trans_babei = null;
        t.container_score = null;
        t.trans_scores = null;
        t.hand3d = null;
        t._hand_models = [];
        t._anim_hands = [];
        t.container_qipai = null;
        t.container_ming = null;
        t.container_babei = null;
        t.score = 0;
        t.duringShowDetla = !1;
        t.anim_id = 0;
        t.trans_liqi_position = null;
        t.trans_liqi_scale = null;
        t.liqibang = null;
        t.liqibang_effects = {};
        t.hand_type = 'hand_human';
        return t;
      }

      Init(e, i, n, a, r, s, o) {
        this.desktop = e;
        this.seat = i;
        this.trans_hand = n;
        this.trans_paihai = r;
        this.trans_ming = a;
        this.trans_man = s;
        this.trans_babei = o;
        for (h = 0; h < this.trans_hand.parent.numChildren; h++)
          this.trans_hand.parent.getChildAt(h).active = !1;
        for (h = 0; h < this.trans_ming.parent.numChildren; h++)
          this.trans_ming.parent.getChildAt(h).active = !1;
        for (h = 0; h < this.trans_paihai.parent.numChildren; h++)
          this.trans_paihai.parent.getChildAt(h).active = !1;
        for (h = 0; h < this.trans_babei.parent.numChildren; h++)
          this.trans_babei.parent.getChildAt(h).active = !1;
        this.container_qipai = new t.Block_QiPai(r, this);
        this.container_ming = new t.Block_Ming(a, this);
        this.container_babei = new t.Block_Babei(o, this);
        this.trans_liqi = s.getChildByName('liqi');
        this.trans_liqi.active = !1;
        this.trans_liqi_position = this.trans_liqi.transform.localPosition;
        this.trans_liqi_scale = this.trans_liqi.transform.localScale;
        this.trans_dir = s.getChildByName('dir');
        this.trans_ind = s.getChildByName('ind');
        var l = s.getChildByName('score');
        this.container_score = l;
        this.trans_scores = new Array();
        for (var h = 0; h < 10; h++)
          this.trans_scores.push(l.getChildByName(h.toString()));
        this.hand3d = s.parent.getChildByName(`hand_${(i + 1).toString()}`);
        this.hand3d.active = !1;
        this.SetScore(25e3, 25e3);
        this.RefreshDir();
      }

      onInitRoom(e) {
        this.seat = e;
        if ((-1 != this.seat)) {
          this.trans_man.active = !0;
          this.create_liqibang(
            t.DesktopMgr.Inst.player_effects[this.seat].liqibang
          );
          var i = t.DesktopMgr.Inst.player_effects[this.seat].hand;
          this.create_hand(i);
        } else this.trans_man.active = !1;
      }

      create_liqibang(t) {
        var e = this;
        this.liqibang.destroy(!0);
        this.liqibang && ((this.liqibang = null));
        this.liqibang = Laya.loader.getRes(t).clone();
        this.trans_liqi.addChild(this.liqibang);
        this.liqibang.transform.localPosition = new Laya.Vector3(0, 0, 0);
        this.liqibang.transform.localScale = new Laya.Vector3(1, 1, 1);

        this.liqibang.transform.localRotationEuler = new Laya.Vector3(
            0,
            0,
            0
          );

        this.liqibang.active = !0;
        this.liqibang_effects = {};
        var i = t => {
          if ('shadow' != t.name) {
            var n = t.name;
            if ('effect_' != n.substr(0, 7)) {
              if (t instanceof Laya.MeshSprite3D) {
                var a = t;
                if (a.meshRender && a.meshRender.sharedMaterial) {
                  var r = new caps.BaseMaterial(caps.Cartoon.filename);

                  r.setTexture(
                    caps.Cartoon.TEXTURE,
                    a.meshRender.material.albedoTexture
                  );

                  r.setNumber(caps.Cartoon.SPLIT, 0.4);

                  r.setColor(
                    caps.Cartoon.COLOR_LIGHT,
                    new Laya.Vector3(1, 1, 1)
                  );

                  r.setColor(
                    caps.Cartoon.COLOR_UNLIGHT,
                    new Laya.Vector3(1, 1, 1)
                  );

                  r.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1));
                  a.meshRender.sharedMaterial = r;
                }
              }
              for (var s = 0; s < t.numChildren; s++) i(t.getChildAt(s));
            } else e.liqibang_effects[n.substr(7)] = t;
          }
        };
        i(this.liqibang.getChildAt(0));
      }

      create_hand(t) {
        this.hand_type = t;
        this._anim_hands = [];
        if (
          (this._hand_models)
        ) {
          for (var e = 0; e < this._hand_models.length; e++)
            this._hand_models[e].destroy(!0);
          this._hand_models = [];
        }
        var i = `scene/${t}.lh`;
        var n = Laya.loader.getRes(i);

        n
          .getChildAt(0)
          .getChildByName('node_liqibang')
          .getChildByName('p') &&
          n
            .getChildAt(0)
            .getChildByName('node_liqibang')
            .getChildByName('p')
            .destroy(!0);

        n
          .getChildAt(0)
          .getChildByName('node_tile')
          .getChildByName('p') &&
          n
            .getChildAt(0)
            .getChildByName('node_tile')
            .getChildByName('p')
            .destroy(!0);
        var a = n.getChildAt(0).clone();
        this.hand3d.addChild(a);
        a.transform.localPosition = new Laya.Vector3(0, 0, 0);
        a.transform.localScale = new Laya.Vector3(0.9, 0.9, 0.9);
        a.transform.localRotation = new Laya.Quaternion(0, 0, 0, 0);
        this._anim_hands = [a.getComponentByType(Laya.Animator)];
        this._hand_models = [a];
        var r = new Laya.Vector3(0.9725, 0.9137, 0.937);
        'hand_cat_blue' == t &&
          (r = new Laya.Vector3(216 / 255, 210 / 255, 206 / 255));
        var s = a.getChildByName('hand');
        var o = new caps.BaseMaterial(caps.Cartoon.filename);

        o.setTexture(
            caps.Cartoon.TEXTURE,
            s.skinnedMeshRender.sharedMaterials[0].albedoTexture
          );

        o.setColor(caps.Cartoon.COLOR_LIGHT, new Laya.Vector3(1, 1, 1));
        o.setColor(caps.Cartoon.COLOR_UNLIGHT, r);
        o.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1));
        o.setNumber(caps.Cartoon.SPLIT, 0.4);
        if (
          (2 == s.skinnedMeshRender.sharedMaterials.length)
        ) {
          var l = new caps.BaseMaterial(caps.Cartoon.filename);

          l.setTexture(
            caps.Cartoon.TEXTURE,
            s.skinnedMeshRender.sharedMaterials[1].albedoTexture
          );

          l.setColor(caps.Cartoon.COLOR_LIGHT, new Laya.Vector3(1, 1, 1));
          l.setColor(caps.Cartoon.COLOR_UNLIGHT, r);
          l.setColor(caps.Cartoon.COLOR, new Laya.Vector3(1, 1, 1));
          l.setNumber(caps.Cartoon.SPLIT, 0.4);
          s.skinnedMeshRender.sharedMaterials = [o, l];
        } else s.skinnedMeshRender.sharedMaterials = [o];
        var h = new Laya.Vector3(0.6823, 0.447, 0.408);
        var c = 0.6;
        h = new Laya.Vector3(83 / 255, 65 / 255, 63 / 255);
        'hand_cat_blue' == t &&
          ((c = 0.9));
        var u = a.clone();
        u.getChildByName('node_liqibang').destroy(!0);
        u.getChildByName('node_tile').destroy(!0);

        u.getChildByName('Dum_Shadow') &&
          u.getChildByName('Dum_Shadow').destroy(!0);

        u.getChildByName('Bone021') &&
          u.getChildByName('Bone021').destroy(!0);

        a.addChild(u);
        u.transform.localPosition = new Laya.Vector3(0, 0, 0);
        u.transform.localScale = new Laya.Vector3(1, 1, 1);
        u.transform.localRotation = new Laya.Quaternion(0, 0, 0, 0);
        var _ = u.getChildByName('hand');
        var d = new caps.Material_Outline(caps.Outline.filename);
        d.setColor(caps.Outline.OUTLINE_COLOR, h);
        d.setNumber(caps.Outline.OUTLINE_ALPHA, c);
        d.setNumber(caps.Outline.OUTLINE, 0.001);
        var f = new caps.Material_Outline(caps.Outline.filename);
        f.setColor(caps.Outline.OUTLINE_COLOR, h);
        f.setNumber(caps.Outline.OUTLINE_ALPHA, c);
        f.setNumber(caps.Outline.OUTLINE, 0.001);
        _.skinnedMeshRender.sharedMaterials = [d, f];
        this._anim_hands.push(u.getComponentByType(Laya.Animator));
        this._hand_models.push(u);
        this.hand3d.active = !0;
        this.hand3d.transform.position = new Laya.Vector3(0, 0, 0);
      }

      playHandAnimtion({name, speed, lifetime}) {
        var e = this;
        this.hand3d.active = !0;
        for (var i = 0; i < this._anim_hands.length; i++)
          this._anim_hands[i].play(name, speed);
        this.hand3d.transform.localScale = new Laya.Vector3(1e-4, 1e-4, 1);

        Laya.timer.frameOnce(1, this, () => {
          e.hand3d.transform.localScale = new Laya.Vector3(1, 1, 1);
        });

        this.anim_id++;
        var n = this.anim_id;
        Laya.timer.once(lifetime, this, () => {
          n == e.anim_id && (e.hand3d.active = !1);
        });
      }

      setSeat(t) {
        this.seat = t;
      }

      Reset() {
        this.duringShowDetla = !1;
        this.container_ming.Reset();
        this.container_qipai.Reset();
        this.container_babei.Reset();
        this.trans_liqi.active = !1;
        this.hand3d && (this.hand3d.active = !1);
        Laya.timer.clearAll(this);
        this.anim_id = 0;
      }

      AddQiPai(t, e, i, n) {
        void 0 === n && (n = !0);
        this.container_qipai.AddQiPai(t, e, i, n);
      }

      QiPaiPass() {
        this.container_qipai.QiPaiPass();
      }

      QiPaiNoPass() {
        this.container_qipai.QiPaiNoPass();
      }

      AddMing(t, e) {
        void 0 === e && (e = !0);
        this.container_ming.AddMing(t, e);
      }

      AddGang(t, e) {
        void 0 === e && (e = !0);
        this.container_ming.AddGang(t, e);
      }

      AddBabei(t, e, i) {
        void 0 === i && (i = !0);
        this.container_babei.AddBabei(t, e, i);
      }

      ShowLiqi(e) {
        var i = this;
        void 0 === e && (e = !0);
        this.trans_liqi.transform.localPosition = this.trans_liqi_position;
        this.trans_liqi.transform.localScale = this.trans_liqi_scale;
        this.trans_liqi.active = !0;
        if ((e)) {
          this.hand3d.transform.position = this.trans_liqi.transform.position.clone();
          this.trans_liqi.active = !1;
          this.hand3d.active = !0;
          var n = t.ModelAnimationController.get_anim_config(
            'LiZhi',
            this.hand_type
          );
          this.playHandAnimtion(n);
          Laya.timer.once(n.keypoint[0], this, () => {
            i.trans_liqi.active = !0;
            i.trans_man.addChild(i.trans_liqi);
            i.trans_liqi.transform.localPosition = i.trans_liqi_position;
            i.trans_liqi.transform.localScale = i.trans_liqi_scale;

            i.trans_liqi.transform.localRotation = new Laya.Quaternion(
                0,
                0,
                0,
                1
              );

            i.PlayLiqibangEffect('idle');
          });
        } else
          this.PlayLiqibangEffect('idle');
      }

      SetScore(t, e) {
        this.score = t;
        this.RefreshScore(e);
      }

      RefreshDir() {
        if (-1 != this.seat) {
          var e = new Laya.Vector4();
          var i = 0;

          i =
            t.DesktopMgr.Inst.rule_mode == t.ERuleMode.Liqi3
              ? (this.seat - t.DesktopMgr.Inst.index_ju + 3) % 3
              : (this.seat - t.DesktopMgr.Inst.index_ju + 4) % 4;

          e.z = 0.25 * i;
          e.w = 0;
          e.x = 0.25;
          e.y = 1;
          this.trans_dir.meshRender.material.tilingOffset = e;
        }
      }

      RefreshScore(t) {
        if (-1 == this.seat) this.container_score.active = !1;
        else {
          this.container_score.active = !0;
          var e = '';
          var i = 0;
          e = this.score.toString();
          if (this.duringShowDetla) {
            var n = this.score - t;
            e = `+${n.toString()}`;
            e = n.toString();
            n > 0
              ? (i = -0.33333)
              : (i = -0.66667);
          } else i = 0;
          for (s = 0; s < e.length && s < this.trans_scores.length; s++) {
            var a = 0;
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
            var r = new Laya.Vector4();
            r.z = a;
            r.w = i;
            r.x = 1 / 12;
            r.y = 1 / 3;
            this.trans_scores[s].meshRender.material.tilingOffset = r;
            this.trans_scores[s].active = !0;
          }
          for (var s = e.length; s < this.trans_scores.length; s++)
            this.trans_scores[s].active = !1;
          if (e.length <= 6) {
            (o = this.container_score.transform.localPosition.clone()).x =
              0.05355 * ((0.165 * (e.length - 1)) / 2 - 0.5325);

            this.container_score.transform.localPosition = o;
            this.container_score.transform.localScale = new Laya.Vector3(
                0.05355,
                0.01512,
                1
              );
          } else {
            var o = this.container_score.transform.localPosition.clone();
            o.x = 0.05355 * -0.12;
            this.container_score.transform.localPosition = o;
            var l = 0.56 + ((10 - e.length) / 4) * (1 - 0.56);
            var h = 0.9 + ((10 - e.length) / 4) * (1 - 0.9);
            this.container_score.transform.localScale = new Laya.Vector3(
              0.05355 * l,
              0.01512 * h,
              1
            );
          }
        }
      }

      Hule(t, e, i, n) {}
      Huangpai(t, e, i) {}

      OnDoraRefresh() {
        this.container_qipai.OnDoraRefresh();
        this.container_ming.OnDoraRefresh();
        this.container_babei.OnDoraRefresh();
      }

      OnChoosePai() {
        this.container_qipai.OnChoosedPai();
        this.container_ming.OnChoosedPai();
        this.container_babei.OnChoosedPai();
      }

      PlaySound(e) {
        var i = '';
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
          );

        t.AudioMgr.PlayCharactorSound(
          this.desktop.player_datas[this.seat].character,
          e
        );
      }

      OnRoundEnd(t) {
        0 == t
          ? this.PlayLiqibangEffect('defeat')
          : 1 == t && this.PlayLiqibangEffect('win');
      }

      PlayLiqibangEffect(t) {
        for (var e in this.liqibang_effects)
          this.liqibang_effects[e].active = e == t;
      }
    }

    __extends(i, e);

    return i;
  })(Laya.Script);
  t.ViewPlayer = e;
})(view || (view = {}));