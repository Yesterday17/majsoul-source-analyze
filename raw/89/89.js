var view;
!(function(t) {
  var e = new Laya.Vector4(1, 1, 1, 1),
    i = new Laya.Vector4(0.6, 0.6, 0.6, 1),
    n = (function(n) {
      function a() {
        var t = n.call(this) || this;
        return (
          (t.mySelf = null),
          (t.acitve = false),
          (t.val = null),
          (t.valid = true),
          (t._clickeffect = null),
          (t.during_newgame = false),
          (t.newgame_start = 0),
          (t.newgame_lifetime = 200),
          (t.during_hule = false),
          (t.hule_start = 0),
          (t.hule_lifetime = 100),
          (t.isDora = false),
          (t.ispaopai = false),
          (t.index = -1),
          (t.pos_x = 0),
          (t.z = 0),
          (t.bedraged = false),
          t
        );
      }
      return (
        __extends(a, n),
        (a.prototype._load = function(t) {
          (this.mySelf = t),
            (this.mySelf.active = false),
            (this.isDora = false),
            Laya.timer.frameLoop(1, this, this.Update);
        }),
        (a.prototype.Reset = function() {
          (this.val = null),
            (this.valid = true),
            (this.index = -1),
            this._SetColor(e),
            (this.mySelf.active = false),
            (this.during_newgame = false),
            (this.during_hule = false),
            (this.bedraged = false),
            (this.mySelf.transform.localPosition = new Laya.Vector3(0, 0, 0)),
            null != this._clickeffect &&
              (this._clickeffect.destroy(), (this._clickeffect = null)),
            (this.acitve = false),
            (this.isDora = false),
            this.mySelf.numChildren > 0 &&
              (this.mySelf.getChildAt(0).active = false);
        }),
        (a.prototype.SetVal = function(n, a) {
          (this.val = n), (this.valid = a), this._SetColor(a ? e : i);
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
          'en' == GameMgr.client_language && (l += 'en/'),
            (l += t.DesktopMgr.Inst.mjp_res_name + '/hand.png'),
            (o.albedoTexture = Laya.loader.getRes(l)),
            (o.tilingOffset = new Laya.Vector4(0.1, 0.25, r, s)),
            (this.mySelf.active = true),
            (this.acitve = true),
            this.RefreshDora();
        }),
        (a.prototype.LiqiSelect = function(t) {
          if (!this.mySelf.destroyed) {
            for (var n = false, a = 0; a < t.length; a++)
              if (0 == mjcore.MJPai.Distance(this.val, t[a])) {
                n = true;
                break;
              }
            n
              ? (this._SetColor(e), (this.valid = true))
              : (this._SetColor(i), (this.valid = false));
          }
        }),
        (a.prototype.ChiTiSelect = function(t) {
          if (!this.mySelf.destroyed) {
            for (var n = false, a = 0; a < t.length; a++)
              if (0 == mjcore.MJPai.Distance(this.val, t[a])) {
                n = true;
                break;
              }
            n
              ? (this._SetColor(i), (this.valid = false))
              : (this._SetColor(e), (this.valid = true));
          }
        }),
        (a.prototype.RefreshPaoPai = function() {
          this.ispaopai
            ? this._SetColor(new Laya.Vector4(1, 0.78, 0.78, 1))
            : this._SetColor(e);
        }),
        (a.prototype.SelectEnd = function() {
          this.mySelf.destroyed || (this._SetColor(e), (this.valid = true));
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
            (t.active = true),
            Laya.timer.once(300, this, this.RemoveClickEffect);
        }),
        (a.prototype.RemoveClickEffect = function() {
          null != this._clickeffect &&
            (this._clickeffect.destroy(), (this._clickeffect = null));
        }),
        (a.prototype.AnimNewTile = function() {
          var t = this.mySelf.meshRender.material,
            e = t.albedoColor.clone();
          (e.w = 0),
            (t.albedoColor = e),
            (this.during_newgame = true),
            (this.newgame_start = Laya.timer.currTimer);
        }),
        (a.prototype.Hule = function() {
          (this.during_hule = true),
            (this.hule_start = Laya.timer.currTimer),
            (this.acitve = false),
            this.mySelf.numChildren > 0 &&
              (this.mySelf.getChildAt(0).active = false);
        }),
        (a.prototype.Update = function() {
          if (this.during_newgame) {
            var t = Laya.timer.currTimer - this.newgame_start,
              e = this.mySelf.transform.localPosition.clone(),
              i = (n = this.mySelf.meshRender.material).albedoColor.clone();
            if (t >= this.newgame_lifetime)
              (e.y = 0),
                (this.mySelf.transform.localPosition = e),
                (i.w = 1),
                (n.albedoColor = i),
                (this.during_newgame = false);
            else {
              a = t / this.newgame_lifetime;
              (e.y = 0.5 * (1 - a)),
                (this.mySelf.transform.localPosition = e),
                (i.w = a),
                (n.albedoColor = i);
            }
          }
          if (this.during_hule) {
            var t = Laya.timer.currTimer - this.hule_start,
              n = this.mySelf.meshRender.material,
              i = n.albedoColor.clone();
            if (t >= this.hule_lifetime) (i.w = 0), (n.albedoColor = i);
            else {
              var a = t / this.hule_lifetime;
              (i.w = 1 - a), (n.albedoColor = i);
            }
          }
          if (!this.bedraged) {
            var r = this.mySelf.transform.localPosition,
              s = Math.abs(r.x - this.pos_x);
            if (s > 1e-5) {
              var o = (2.55 * 25 * Laya.timer.delta) / 1e3;
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
            if ((this.val.dora && (this.isDora = true), !this.isDora))
              for (var e = 0; e < t.DesktopMgr.Inst.dora.length; e++)
                if (mjcore.MJPai.DoraMet(this.val, t.DesktopMgr.Inst.dora[e])) {
                  this.isDora = true;
                  break;
                }
            if (this.isDora)
              if (0 == this.mySelf.numChildren) {
                var i = t.DesktopMgr.Inst.effect_doraPlane.clone();
                this.mySelf.addChild(i),
                  (i.transform.localPosition = new Laya.Vector3(0, 0, 0)),
                  (i.transform.localScale = new Laya.Vector3(1, 1, 1)),
                  (i.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)),
                  (i.active = true);
                i.getChildAt(0).addComponent(anim.RunUV);
              } else this.mySelf.getChildAt(0).active = true;
          }
        }),
        (a.Cmp = function(t, e) {
          var i = mjcore.MJPai.Distance(t.val, e.val);
          return 0 != i ? i : t.index - e.index;
        }),
        a
      );
    })(Laya.Script);
  t.HandPaiPlane = n;
})(view || (view = {}));