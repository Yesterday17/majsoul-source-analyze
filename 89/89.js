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
  var e = new Laya.Vector4(1, 1, 1, 1);
  var i = new Laya.Vector4(0.6, 0.6, 0.6, 1);

  var n = (n => {
    class a {
      constructor() {
        var t = n.call(this) || this;
        t.mySelf = null;
        t.acitve = !1;
        t.val = null;
        t.valid = !0;
        t._clickeffect = null;
        t.during_newgame = !1;
        t.newgame_start = 0;
        t.newgame_lifetime = 200;
        t.during_hule = !1;
        t.hule_start = 0;
        t.hule_lifetime = 100;
        t.isDora = !1;
        t.ispaopai = !1;
        t.index = -1;
        t.pos_x = 0;
        t.z = 0;
        t.bedraged = !1;
        return t;
      }

      _load(t) {
        this.mySelf = t;
        this.mySelf.active = !1;
        this.isDora = !1;
        Laya.timer.frameLoop(1, this, this.Update);
      }

      Reset() {
        this.val = null;
        this.valid = !0;
        this.index = -1;
        this._SetColor(e);
        this.mySelf.active = !1;
        this.during_newgame = !1;
        this.during_hule = !1;
        this.bedraged = !1;
        this.mySelf.transform.localPosition = new Laya.Vector3(0, 0, 0);
        this._clickeffect.destroy();

        null != this._clickeffect &&
          ((this._clickeffect = null));

        this.acitve = !1;
        this.isDora = !1;
        this.mySelf.numChildren > 0 &&
          (this.mySelf.getChildAt(0).active = !1);
      }

      SetVal(n, a) {
        this.val = n;
        this.valid = a;
        this._SetColor(a ? e : i);
        var r = n.dora ? 0.9 : 0.1 * (n.index - 1),
          s = 0;
        switch (n.type) {
          case mjcore.E_MJPai.s:
            s = -0.75;
            break;
          case mjcore.E_MJPai.m:
            s = -0.5;
            break;
          case mjcore.E_MJPai.p:
            s = -0.25;
            break;
          default:
            s = 0;
        }
        var o = this.mySelf.meshRender.material,
          l = 'scene/Assets/Resource/mjpai/';
        'en' == GameMgr.client_language && (l += 'en/');
        l += `${t.DesktopMgr.Inst.mjp_res_name}/hand.png`;
        o.albedoTexture = Laya.loader.getRes(l);
        o.tilingOffset = new Laya.Vector4(0.1, 0.25, r, s);
        this.mySelf.active = !0;
        this.acitve = !0;
        this.RefreshDora();
      }

      LiqiSelect(t) {
        if (!this.mySelf.destroyed) {
          for (var n = !1, a = 0; a < t.length; a++)
            if (0 == mjcore.MJPai.Distance(this.val, t[a])) {
              n = !0;
              break;
            }
          this._SetColor(e);
          this._SetColor(i);
          n
            ? (this.valid = !0)
            : (this.valid = !1);
        }
      }

      ChiTiSelect(t) {
        if (!this.mySelf.destroyed) {
          for (var n = !1, a = 0; a < t.length; a++)
            if (0 == mjcore.MJPai.Distance(this.val, t[a])) {
              n = !0;
              break;
            }
          this._SetColor(i);
          this._SetColor(e);
          n
            ? (this.valid = !1)
            : (this.valid = !0);
        }
      }

      RefreshPaoPai() {
        this.ispaopai
          ? this._SetColor(new Laya.Vector4(1, 0.78, 0.78, 1))
          : this._SetColor(e);
      }

      SelectEnd() {
        this._SetColor(e);
        this.mySelf.destroyed || ((this.valid = !0));
      }

      _SetColor(t) {
        if (!this.mySelf.destroyed) {
          this.mySelf.meshRender.material.albedoColor = t;
        }
      }

      SetIndex(t, e, i) {
        this.index = t;
        this.pos_x = 2.55 * t + (e ? 0.8 : 0);
        i ||
          (this.mySelf.transform.localPosition = new Laya.Vector3(
            this.pos_x,
            this.mySelf.transform.localPosition.y,
            this.z
          ));
      }

      AddClickEffect(t) {
        this._clickeffect.destroy();

        null != this._clickeffect &&
          ((this._clickeffect = null));

        this.mySelf.addChild(t);
        this._clickeffect = t;
        t.transform.localPosition = new Laya.Vector3(0, 0, 2);
        t.active = !0;
        Laya.timer.once(300, this, this.RemoveClickEffect);
      }

      RemoveClickEffect() {
        this._clickeffect.destroy();
        null != this._clickeffect &&
          ((this._clickeffect = null));
      }

      AnimNewTile() {
        var t = this.mySelf.meshRender.material,
          e = t.albedoColor.clone();
        e.w = 0;
        t.albedoColor = e;
        this.during_newgame = !0;
        this.newgame_start = Laya.timer.currTimer;
      }

      Hule() {
        this.during_hule = !0;
        this.hule_start = Laya.timer.currTimer;
        this.acitve = !1;
        this.mySelf.numChildren > 0 &&
          (this.mySelf.getChildAt(0).active = !1);
      }

      Update() {
        if (this.during_newgame) {
          var t = Laya.timer.currTimer - this.newgame_start,
            e = this.mySelf.transform.localPosition.clone(),
            i = (n = this.mySelf.meshRender.material).albedoColor.clone();
          e.y = 0;
          this.mySelf.transform.localPosition = e;
          i.w = 1;
          n.albedoColor = i;
          if (t >= this.newgame_lifetime)
            this.during_newgame = !1;
          else {
            a = t / this.newgame_lifetime;
            e.y = 0.5 * (1 - a);
            this.mySelf.transform.localPosition = e;
            i.w = a;
            n.albedoColor = i;
          }
        }
        if (this.during_hule) {
          var t = Laya.timer.currTimer - this.hule_start,
            n = this.mySelf.meshRender.material,
            i = n.albedoColor.clone();
          i.w = 0;
          if (t >= this.hule_lifetime) n.albedoColor = i;
          else {
            var a = t / this.hule_lifetime;
            i.w = 1 - a;
            n.albedoColor = i;
          }
        }
        if (!this.bedraged) {
          var r = this.mySelf.transform.localPosition,
            s = Math.abs(r.x - this.pos_x);
          if (s > 1e-5) {
            var o = (2.55 * 25 * Laya.timer.delta) / 1e3;
            this.pos_x < r.x && (o = -o);
            o >= s
              ? (this.mySelf.transform.localPosition = new Laya.Vector3(
                  this.pos_x,
                  this.mySelf.transform.localPosition.y,
                  this.z
                ))
              : (this.mySelf.transform.localPosition = new Laya.Vector3(
                  r.x + o,
                  this.mySelf.transform.localPosition.y,
                  this.z
                ));
          }
        }
      }

      RefreshDora() {
        if (t.DesktopMgr.bianjietishi && !this.isDora) {
          this.val.dora && (this.isDora = !0);
          if ((!this.isDora))
            for (var e = 0; e < t.DesktopMgr.Inst.dora.length; e++)
              if (mjcore.MJPai.DoraMet(this.val, t.DesktopMgr.Inst.dora[e])) {
                this.isDora = !0;
                break;
              }
          if (this.isDora)
            if (0 == this.mySelf.numChildren) {
              var i = t.DesktopMgr.Inst.effect_doraPlane.clone();
              this.mySelf.addChild(i);
              i.transform.localPosition = new Laya.Vector3(0, 0, 0);
              i.transform.localScale = new Laya.Vector3(1, 1, 1);
              i.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
              i.active = !0;
              i.getChildAt(0).addComponent(anim.RunUV);
            } else this.mySelf.getChildAt(0).active = !0;
        }
      }
    }

    __extends(a, n);

    a.Cmp = ({val, index}, {val, index}) => {
      var i = mjcore.MJPai.Distance(val, val);
      return 0 != i ? i : index - index;
    };

    return a;
  })(Laya.Script);

  t.HandPaiPlane = n;
})(view || (view = {}));