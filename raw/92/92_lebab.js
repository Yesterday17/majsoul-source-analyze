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
  const e = (e => {
    function i() {
      const t = e.call(this) || this;
      return (
        (t.handnum = 0),
        (t.hand = null),
        (t.discardcd = 0),
        (t.debug_new_round_frame = -1),
        (t.debug_reset_frame = -1),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.Reset = function() {
      if ((e.prototype.Reset.call(this), null != this.hand)) {
        for (let t = 0; t < this.hand.length; t++) this.hand[t].Destory();
        this.hand = null;
      }
      Laya.timer.clearAll(this),
        (this.discardcd = 0),
        (this.debug_reset_frame = Laya.timer.currFrame);
    }),
    (i.prototype.ForceSet = function(t) {
      this.Reset(), this.RefreshDir(), (this.hand = []), this.SetNum(t);
    }),
    (i.prototype.NewGame = function(e, i) {
      const n = this;
      if (
        (this.Reset(),
        this.RefreshDir(),
        (this.handnum = e),
        (this.hand = []),
        i)
      )
        for (s = 0; s < e; s++) {
          const a = new t.HandPai3D(this.trans_hand.parent);
          a.SetVal(mjcore.MJPai.Create('5z')),
            a.SetIndex(s, 14 == s),
            a.Stand(),
            this.hand.push(a);
        }
      else {
        for (var r = 0, s = 0; s < 4; s++)
          Laya.timer.once(300 * s, this, () => {
            for (let i = 0; i < 4 && r != e; i++) {
              r++;
              const a = new t.HandPai3D(n.trans_hand.parent);
              a.SetVal(mjcore.MJPai.Create('5z')),
                a.SetIndex(r - 1, !1),
                n.hand.push(a),
                a.DoAnim_Stand();
            }
          });
        14 == e &&
          Laya.timer.once(900, this, () => {
            n.hand[13].SetIndex(13, !0);
          });
      }
    }),
    (i.prototype.RecordNewGame = function(e) {
      this.Reset(),
        this.RefreshDir(),
        (this.handnum = e.length),
        (this.hand = []);
      for (let i = 0; i < e.length; i++) {
        const n = new t.HandPai3D(this.trans_hand.parent);
        n.SetVal(e[i]),
          n.SetIndex(i, 14 == i),
          t.DesktopMgr.Inst.record_show_hand ? n.FullDown() : n.Stand(),
          this.hand.push(n);
      }
      this.debug_new_round_frame = Laya.timer.currFrame;
    }),
    (i.prototype.LiPai = function() {
      this.hand[this.hand.length - 1].SetIndex(this.hand.length - 1, !1),
        this.hand[this.hand.length - 1].Stand();
    }),
    (i.prototype.onBabei = function(t, e) {
      this.onDiscardTile(t, e);
    }),
    (i.prototype.onDiscardTile = function(t, e) {
      const i = this;
      if (!(this.seat < 0))
        if (
          (app.Log.log(
            `ViewPlayer_Other onDiscardTile  moqie:${t} fast:${e}`
          ),
          e)
        )
          this.hand[this.hand.length - 1].Destory(), this.hand.pop();
        else if (t)
          this.hand[this.hand.length - 1].Destory(), this.hand.pop();
        else {
          const n = Math.floor(Math.random() * (this.hand.length - 1));
          this.hand[n].Destory(),
            (this.discardcd = 1200 + Laya.timer.currTimer),
            Laya.timer.once(1e3, this, () => {
              (i.hand[n] = i.hand[i.hand.length - 1]),
                i.hand.pop(),
                i.hand[n].SetIndex(n, !1),
                i.hand[n].Stand();
            });
        }
    }),
    (i.prototype._RemoveHandPai = function(t, e) {
      if ((void 0 === e && (e = !0), e)) {
        for (i = 0; i < this.hand.length; i++)
          if (mjcore.MJPai.isSame(t, this.hand[i].val)) {
            n = this.hand[i];
            (this.hand[i] = this.hand[this.hand.length - 1]),
              (this.hand[this.hand.length - 1] = n),
              this.hand.pop(),
              n.Destory();
            break;
          }
      } else
        for (var i = this.hand.length - 1; i >= 0; i--)
          if (mjcore.MJPai.isSame(t, this.hand[i].val)) {
            var n = this.hand[i];
            (this.hand[i] = this.hand[this.hand.length - 1]),
              (this.hand[this.hand.length - 1] = n),
              this.hand.pop(),
              n.Destory();
            break;
          }
    }),
    (i.prototype._LiPai = function() {
      this.hand.sort(({val}, {val}) => mjcore.MJPai.Distance(val, val));
      for (let t = 0; t < this.hand.length; t++) this.hand[t].SetIndex(t, !1);
    }),
    (i.prototype.recordBabei = function(t, e, i) {
      this.recordDiscardTile(t, e, i);
    }),
    (i.prototype.recordDiscardTile = function(t, e, i) {
      const n = this;
      this.seat < 0 ||
        (this._RemoveHandPai(t, !e),
        i
          ? this._LiPai()
          : Laya.timer.once(1e3, this, () => {
              n._LiPai();
            }));
    }),
    (i.prototype.SetNum = function(e) {
      if (!(this.seat < 0)) {
        for (
          app.Log.log(
            `ViewPlayer_Other SetNum  _num:${e} _oldnum:${this.hand.length}`
          );
          this.hand.length < e;

        ) {
          const i = new t.HandPai3D(this.trans_hand.parent);
          i.SetVal(mjcore.MJPai.Create('5z')),
            i.SetIndex(this.hand.length, !1),
            i.Stand(),
            this.hand.push(i);
        }
        for (; this.hand.length > e; )
          this.hand[this.hand.length - 1].Destory(), this.hand.pop();
        app.Log.log(
          `ViewPlayer_Other SetNum _chandlength:${this.hand.length}`
        ),
          this.LiPai();
      }
    }),
    (i.prototype.AddMing = function(i, n) {
      if ((void 0 === n && (n = !0), !(this.seat < 0))) {
        app.Log.log(
          `ViewPlayer_Other AddMing  ming:${i.toString()} doanim:${n}`
        );
        try {
          if (t.DesktopMgr.Inst.mode == t.EMJMode.play) {
            for (var a = 0, r = 0; r < i.pais.length; r++)
              i.from[r] == this.seat && a++;
            this.SetNum(this.hand.length - a);
          } else {
            for (r = 0; r < i.pais.length; r++)
              i.from[r] == this.seat && this._RemoveHandPai(i.pais[r]);
            this._LiPai();
          }
          e.prototype.AddMing.call(this, i, n);
        } catch (t) {
          const s = {};
          (s.error = t.message),
            (s.stack = t.stack),
            (s.method = 'AddMing'),
            (s.class = 'ViewPlayer_Other'),
            GameMgr.Inst.onFatalError(s);
        }
      }
    }),
    (i.prototype.AddGang = function(i, n) {
      if ((void 0 === n && (n = !0), !(this.seat < 0))) {
        app.Log.log(
          `ViewPlayer_Other AddGang ${i.toString()} doanim:${n}`
        );
        try {
          e.prototype.AddGang.call(this, i, n),
            t.DesktopMgr.Inst.mode == t.EMJMode.play
              ? this.SetNum(this.hand.length - 1)
              : (this._RemoveHandPai(i), this._LiPai());
        } catch (t) {
          const a = {};
          (a.error = t.message),
            (a.stack = t.stack),
            (a.method = 'TakePai'),
            (a.class = 'ViewPlayer_Other'),
            GameMgr.Inst.onFatalError(a);
        }
      }
    }),
    (i.prototype.OnDoraRefresh = function() {
      if (
        !(this.seat < 0) &&
        (e.prototype.OnDoraRefresh.call(this),
        t.DesktopMgr.Inst.mode != t.EMJMode.play)
      )
        for (let i = 0; i < this.hand.length; i++)
          this.hand[i].pai3D.RefreshDora();
    }),
    (i.prototype.TakePai = function(e) {
      if (!(this.seat < 0)) {
        app.Log.log(`ViewPlayer_Other TakePai ${e.toString()}`);
        try {
          const i = new t.HandPai3D(this.trans_hand.parent);
          i.SetVal(e),
            i.SetIndex(this.hand.length, !0),
            i.Stand(),
            this.hand.push(i);
        } catch (t) {
          const n = {};
          (n.error = t.message),
            (n.stack = t.stack),
            (n.method = 'TakePai'),
            (n.class = 'ViewPlayer_Other'),
            (n.last_new_round_frame = this.debug_new_round_frame),
            (n.last_reset_frame = this.debug_reset_frame),
            (n.hand_is_null = null == this.hand),
            GameMgr.Inst.onFatalError(n);
        }
      }
    }),
    (i.prototype.recordTakePai = function(e) {
      if (!(this.seat < 0)) {
        const i = new t.HandPai3D(this.trans_hand.parent);
        i.SetVal(e),
          i.SetIndex(this.hand.length, !0),
          t.DesktopMgr.Inst.record_show_hand
            ? (i.FullDown(),
              (i.pai3D.ispaopai = t.DesktopMgr.Inst.isPaoPai(i.pai3D.val)))
            : i.Stand(),
          i.pai3D.OnChoosedPai(),
          this.hand.push(i);
      }
    }),
    (i.prototype.Hule = function(e, i, n, a) {
      const r = this;
      if (!(this.seat < 0))
        if (
          (app.Log.log(
            `ViewPlayer_Other Hule ${i.toString()} zimo:${n}`
          ),
          t.DesktopMgr.Inst.mode == t.EMJMode.play)
        ) {
          if ((this.SetNum(e.length + (n ? 1 : 0)), n)) {
            const s = this.hand[this.hand.length - 1];
            s.SetVal(i),
              s.SetIndex(this.hand.length - 1, !0),
              s.FullDown(),
              (s.model.transform.localPosition.z += 0.2 * t.PAIMODEL_HEIGHT),
              (s.shadow.active = !1);
            u = s.pai3D.model.transform.position.clone();
            (this.hand3d.transform.position = u.clone()),
              this.hand3d
                .getChildAt(0)
                .getChildByName('node_tile')
                .addChild(s.pai3D.model),
              (s.pai3D.model.transform.localPosition = new Laya.Vector3(
                0,
                0,
                0
              )),
              (s.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
                0,
                0,
                0
              )),
              (s.pai3D.model.transform.localScale = new Laya.Vector3(
                1.1111,
                1.1111,
                1.1111
              ));
            const o = t.ModelAnimationController.get_anim_config(
              'Zimo',
              this.hand_type
            );
            this.playHandAnimtion(o),
              Laya.timer.once(o.keypoint[0], this, () => {
                t.AudioMgr.PlayAudio(227);
              }),
              Laya.timer.once(o.keypoint[1], this, () => {
                s.contianer_pai.addChild(s.pai3D.model),
                  (s.pai3D.model.transform.localScale = new Laya.Vector3(
                    1,
                    1,
                    1
                  )),
                  (s.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
                    0,
                    180,
                    0
                  )),
                  s.FullDown(),
                  Laya.timer.once(100, r, () => t.DesktopMgr.Inst.ShowHuleEffect(
                    s.pai3D.model.transform.position,
                    t.DesktopMgr.Inst.player_effects[r.seat].effect_hupai
                  ));
              });
          }
          const l = e.length;
          var h = n ? 1100 : 200;
          Laya.timer.once(h, this, () => {
            t.AudioMgr.PlayAudio(223);
            for (let i = 0; i < l; i++)
              r.hand[i].SetVal(e[i]), r.hand[i].DoAnim_FullDown();
          });
        } else {
          if (n) {
            const c = this.hand[this.hand.length - 1];
            c.SetVal(i),
              c.SetIndex(this.hand.length - 1, !0),
              c.FullDown(),
              (c.model.transform.localPosition.z += 0.2 * t.PAIMODEL_HEIGHT),
              (c.shadow.active = !1);
            var u = c.pai3D.model.transform.position.clone();
            (this.hand3d.transform.position = u.clone()),
              this.hand3d
                .getChildAt(0)
                .getChildByName('node_tile')
                .addChild(c.pai3D.model),
              (c.pai3D.model.transform.localPosition = new Laya.Vector3(
                0,
                0,
                0
              )),
              (c.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
                0,
                0,
                0
              )),
              (c.pai3D.model.transform.localScale = new Laya.Vector3(
                1.1111,
                1.1111,
                1.1111
              ));
            const _ = t.ModelAnimationController.get_anim_config(
              'Zimo',
              this.hand_type
            );
            this.playHandAnimtion(_),
              Laya.timer.once(_.keypoint[0], this, () => {
                t.AudioMgr.PlayAudio(227);
              }),
              Laya.timer.once(_.keypoint[1], this, () => {
                c.contianer_pai.addChild(c.pai3D.model),
                  (c.pai3D.model.transform.localScale = new Laya.Vector3(
                    1,
                    1,
                    1
                  )),
                  (c.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
                    0,
                    180,
                    0
                  )),
                  c.FullDown(),
                  Laya.timer.once(100, r, () => t.DesktopMgr.Inst.ShowHuleEffect(
                    c.pai3D.model.transform.position,
                    t.DesktopMgr.Inst.player_effects[r.seat].effect_hupai
                  ));
              });
          }
          if (t.DesktopMgr.Inst.record_show_hand);
          else {
            const d = e.length;
            var h = n ? 1100 : 200;
            Laya.timer.once(h, this, () => {
              t.AudioMgr.PlayAudio(223);
              for (let e = 0; e < d; e++) r.hand[e].DoAnim_FullDown();
            });
          }
        }
    }),
    (i.prototype.Huangpai = function(e, i, n) {
      const a = this;
      if (!(this.seat < 0))
        if (
          (app.Log.log(
            `ViewPlayer_Other Huangpai  tingpai:${e} fast:${n}`
          ),
          t.DesktopMgr.Inst.mode == t.EMJMode.play)
        )
          if (n)
            if (e) {
              this.SetNum(i.length);
              for (r = 0; r < i.length; r++)
                this.hand[r].SetVal(i[r]), this.hand[r].FullDown();
            } else
              for (var r = 0; r < this.hand.length; r++) this.hand[r].Cover();
          else
            Laya.timer.once(300, this, () => {
              if ((t.AudioMgr.PlayAudio(223), e)) {
                a.SetNum(i.length);
                for (n = 0; n < i.length; n++)
                  a.hand[n].SetVal(i[n]), a.hand[n].DoAnim_FullDown();
              } else for (var n = 0; n < a.hand.length; n++) a.hand[n].DoAnim_Cover();
            });
        else
          t.DesktopMgr.Inst.record_show_hand ||
            Laya.timer.once(300, this, () => {
              if ((t.AudioMgr.PlayAudio(223), e))
                for (n = 0; n < i.length; n++) a.hand[n].DoAnim_FullDown();
              else
                for (var n = 0; n < a.hand.length; n++)
                  a.hand[n].DoAnim_Cover();
            });
    }),
    (i.prototype.onShowHandChange = function(e) {
      if (!(this.seat < 0) && t.DesktopMgr.Inst.gameing)
        for (let i = 0; i < this.hand.length; i++)
          e
            ? (this.hand[i].FullDown(),
              (this.hand[i].pai3D.ispaopai = t.DesktopMgr.Inst.isPaoPai(
                this.hand[i].pai3D.val
              )))
            : (this.hand[i].Stand(), (this.hand[i].pai3D.ispaopai = !1)),
            this.hand[i].pai3D.OnChoosedPai();
    }),
    (i.prototype.onShowPaopaiChange = function() {
      if (
        !(this.seat < 0) &&
        t.DesktopMgr.Inst.gameing &&
        t.DesktopMgr.Inst.record_show_hand
      )
        for (let e = 0; e < this.hand.length; e++)
          (this.hand[e].pai3D.ispaopai = t.DesktopMgr.Inst.isPaoPai(
            this.hand[e].pai3D.val
          )),
            this.hand[e].pai3D.OnChoosedPai();
    }),
    (i.prototype.OnChoosePai = function() {
      if (
        !(this.seat < 0) &&
        (e.prototype.OnChoosePai.call(this),
        (t.DesktopMgr.Inst.mode == t.EMJMode.paipu ||
          t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast) &&
          t.DesktopMgr.Inst.record_show_hand)
      )
        for (let i = 0; i < this.hand.length; i++)
          this.hand[i].pai3D.OnChoosedPai();
    }),
    i
  ;
  })(t.ViewPlayer);
  t.ViewPlayer_Other = e;
})(view || (view = {}));