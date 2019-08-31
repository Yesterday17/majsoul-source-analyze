const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let view;
!(t => {
  const e = new Laya.Vector4(1, 1, 1, 1);
  const i = new Laya.Vector4(0.6, 0.6, 0.6, 1);

  const n = (n => {
    function a() {
      const t = n.call(this) || this;
      return (
        (t.mySelf = null),
        (t.acitve = !1),
        (t.val = null),
        (t.valid = !0),
        (t._clickeffect = null),
        (t.during_newgame = !1),
        (t.newgame_start = 0),
        (t.newgame_lifetime = 200),
        (t.during_hule = !1),
        (t.hule_start = 0),
        (t.hule_lifetime = 100),
        (t.isDora = !1),
        (t.ispaopai = !1),
        (t.index = -1),
        (t.pos_x = 0),
        (t.z = 0),
        (t.bedraged = !1),
        t
      );
    }
    return __extends(a, n),
    (a.prototype._load = function(t) {
      (this.mySelf = t),
        (this.mySelf.active = !1),
        (this.isDora = !1),
        Laya.timer.frameLoop(1, this, this.Update);
    }),
    (a.prototype.Reset = function() {
      (this.val = null),
        (this.valid = !0),
        (this.index = -1),
        this._SetColor(e),
        (this.mySelf.active = !1),
        (this.during_newgame = !1),
        (this.during_hule = !1),
        (this.bedraged = !1),
        (this.mySelf.transform.localPosition = new Laya.Vector3(0, 0, 0)),
        null != this._clickeffect &&
          (this._clickeffect.destroy(), (this._clickeffect = null)),
        (this.acitve = !1),
        (this.isDora = !1),
        this.mySelf.numChildren > 0 &&
          (this.mySelf.getChildAt(0).active = !1);
    }),
    (a.prototype.SetVal = function(n, a) {
      (this.val = n), (this.valid = a), this._SetColor(a ? e : i);
      const r = n.dora ? 0.9 : 0.1 * (n.index - 1);
      let s = 0;
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
      const o = this.mySelf.meshRender.material;
      let l = 'scene/Assets/Resource/mjpai/';
      'en' == GameMgr.client_language && (l += 'en/'),
        (l += `${t.DesktopMgr.Inst.mjp_res_name}/hand.png`),
        (o.albedoTexture = Laya.loader.getRes(l)),
        (o.tilingOffset = new Laya.Vector4(0.1, 0.25, r, s)),
        (this.mySelf.active = !0),
        (this.acitve = !0),
        this.RefreshDora();
    }),
    (a.prototype.LiqiSelect = function(t) {
      if (!this.mySelf.destroyed) {
        for (var n = !1, a = 0; a < t.length; a++)
          if (0 == mjcore.MJPai.Distance(this.val, t[a])) {
            n = !0;
            break;
          }
        n
          ? (this._SetColor(e), (this.valid = !0))
          : (this._SetColor(i), (this.valid = !1));
      }
    }),
    (a.prototype.ChiTiSelect = function(t) {
      if (!this.mySelf.destroyed) {
        for (var n = !1, a = 0; a < t.length; a++)
          if (0 == mjcore.MJPai.Distance(this.val, t[a])) {
            n = !0;
            break;
          }
        n
          ? (this._SetColor(i), (this.valid = !1))
          : (this._SetColor(e), (this.valid = !0));
      }
    }),
    (a.prototype.RefreshPaoPai = function() {
      this.ispaopai
        ? this._SetColor(new Laya.Vector4(1, 0.78, 0.78, 1))
        : this._SetColor(e);
    }),
    (a.prototype.SelectEnd = function() {
      this.mySelf.destroyed || (this._SetColor(e), (this.valid = !0));
    }),
    (a.prototype._SetColor = function(t) {
      if (!this.mySelf.destroyed) {
        this.mySelf.meshRender.material.albedoColor = t;
      }
    }),
    (a.prototype.SetIndex = function(t, e, i) {
      (this.index = t),
        (this.pos_x = 2.55 * t + (e ? 0.8 : 0)),
        i ||
          (this.mySelf.transform.localPosition = new Laya.Vector3(
            this.pos_x,
            this.mySelf.transform.localPosition.y,
            this.z
          ));
    }),
    (a.prototype.AddClickEffect = function(t) {
      null != this._clickeffect &&
        (this._clickeffect.destroy(), (this._clickeffect = null)),
        this.mySelf.addChild(t),
        (this._clickeffect = t),
        (t.transform.localPosition = new Laya.Vector3(0, 0, 2)),
        (t.active = !0),
        Laya.timer.once(300, this, this.RemoveClickEffect);
    }),
    (a.prototype.RemoveClickEffect = function() {
      null != this._clickeffect &&
        (this._clickeffect.destroy(), (this._clickeffect = null));
    }),
    (a.prototype.AnimNewTile = function() {
      const t = this.mySelf.meshRender.material, e = t.albedoColor.clone();
      (e.w = 0),
        (t.albedoColor = e),
        (this.during_newgame = !0),
        (this.newgame_start = Laya.timer.currTimer);
    }),
    (a.prototype.Hule = function() {
      (this.during_hule = !0),
        (this.hule_start = Laya.timer.currTimer),
        (this.acitve = !1),
        this.mySelf.numChildren > 0 &&
          (this.mySelf.getChildAt(0).active = !1);
    }),
    (a.prototype.Update = function() {
      if (this.during_newgame) {
        var t = Laya.timer.currTimer - this.newgame_start;
        const e = this.mySelf.transform.localPosition.clone();
        var i = (n = this.mySelf.meshRender.material).albedoColor.clone();
        if (t >= this.newgame_lifetime)
          (e.y = 0),
            (this.mySelf.transform.localPosition = e),
            (i.w = 1),
            (n.albedoColor = i),
            (this.during_newgame = !1);
        else {
          a = t / this.newgame_lifetime;
          (e.y = 0.5 * (1 - a)),
            (this.mySelf.transform.localPosition = e),
            (i.w = a),
            (n.albedoColor = i);
        }
      }
      if (this.during_hule) {
        const t = Laya.timer.currTimer - this.hule_start;
        var n = this.mySelf.meshRender.material;
        const i = n.albedoColor.clone();
        if (t >= this.hule_lifetime) (i.w = 0), (n.albedoColor = i);
        else {
          var a = t / this.hule_lifetime;
          (i.w = 1 - a), (n.albedoColor = i);
        }
      }
      if (!this.bedraged) {
        const r = this.mySelf.transform.localPosition, s = Math.abs(r.x - this.pos_x);
        if (s > 1e-5) {
          let o = (2.55 * 25 * Laya.timer.delta) / 1e3;
          o >= s
            ? (this.mySelf.transform.localPosition = new Laya.Vector3(
                this.pos_x,
                this.mySelf.transform.localPosition.y,
                this.z
              ))
            : (this.pos_x < r.x && (o = -o),
              (this.mySelf.transform.localPosition = new Laya.Vector3(
                r.x + o,
                this.mySelf.transform.localPosition.y,
                this.z
              )));
        }
      }
    }),
    (a.prototype.RefreshDora = function() {
      if (t.DesktopMgr.bianjietishi && !this.isDora) {
        if ((this.val.dora && (this.isDora = !0), !this.isDora))
          for (let e = 0; e < t.DesktopMgr.Inst.dora.length; e++)
            if (mjcore.MJPai.DoraMet(this.val, t.DesktopMgr.Inst.dora[e])) {
              this.isDora = !0;
              break;
            }
        if (this.isDora)
          if (0 == this.mySelf.numChildren) {
            const i = t.DesktopMgr.Inst.effect_doraPlane.clone();
            this.mySelf.addChild(i),
              (i.transform.localPosition = new Laya.Vector3(0, 0, 0)),
              (i.transform.localScale = new Laya.Vector3(1, 1, 1)),
              (i.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)),
              (i.active = !0);
            i.getChildAt(0).addComponent(anim.RunUV);
          } else this.mySelf.getChildAt(0).active = !0;
      }
    }),
    (a.Cmp = ({val, index}, {val, index}) => {
      const i = mjcore.MJPai.Distance(val, val);
      return 0 != i ? i : index - index;
    }),
    a
  ;
  })(Laya.Script);

  t.HandPaiPlane = n;
})(view || (view = {}));