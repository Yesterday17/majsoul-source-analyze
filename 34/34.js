var view;
!(t => {
  var e = (() => {
    class e {
      constructor(t, e) {
        this.origin = null;
        this.player = null;
        this.xOffset = 0;
        this.mings = new Array();
        this.pais = new Array();
        this.hengs = new Array();
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
        this.mings = [];
        this.hengs = [];
        this.xOffset = 0;
      }

      AddMing(e, i) {
        var n = this;
        void 0 === i && (i = !0);
        try {
          this.mings.push(e);
          for (var a = 0, r = new Array(), s = 0; s < e.pais.length; s++) {
            r.push(
              new t.ViewPai(e.pais[s], t.DesktopMgr.Inst.CreatePai3D(e.pais[s]))
            );

            this.pais.push(r[s]);

            t.DesktopMgr.Inst.showingPaopai &&
              (r[s].ispaopai = t.DesktopMgr.Inst.isPaoPai(r[s].val));

            r[s].OnChoosedPai();
            var o = t.DesktopMgr.Inst.effect_shadow.clone();
            r[s].model.addChild(o);

            o.transform.localPosition = new Laya.Vector3(
                0,
                0,
                0.5 * -t.PAIMODEL_THICKNESS
              );

            o.transform.localScale = new Laya.Vector3(
                0.53 * t.PAIMODEL_WIDTH,
                1,
                0.53 * t.PAIMODEL_HEIGHT
              );

            o.transform.localRotationEuler = new Laya.Vector3(90, 0, 0);
            o.active = !0;
          }
          var l = 0;
          if (e.type == mjcore.E_Ming.shunzi) {
            for (var h = new Array(), c = -1, s = 0; s < 3; s++)
              e.from[s] != this.seat ? (c = s) : h.push(s);

            h = h.sort((t, i) => -mjcore.MJPai.Distance(e.pais[t], e.pais[i]));

            -1 != c && h.push(c);
            l = h[0];
            for (s = 0; s < 3; s++) {
              var u = h[s];
              var _ = r[u];
              this.origin.parent.addChild(_.model);
              _.model.transform.localPosition = this.origin.transform.localPosition.clone();
              this.xOffset += 0.5 * t.PAIMODEL_HEIGHT * 1.02;
              _.ShowRot();
              _.model.transform.localPosition.x -= this.xOffset;

              _.model.transform.localPosition.z -=
                    0.5 * (t.PAIMODEL_HEIGHT - t.PAIMODEL_WIDTH);

              a = this.xOffset;
              this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02;
              _.ShowUp();
              _.model.transform.localPosition.x -= this.xOffset;
              e.from[u] != this.seat
                ? (this.xOffset += 0.5 * t.PAIMODEL_HEIGHT * 1.02)
                : (this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02);
            }
          } else if (
            e.type == mjcore.E_Ming.kezi ||
            e.type == mjcore.E_Ming.gang_ming
          ) {
            for (var h = new Array(), s = 0; s < e.pais.length; s++) h.push(s);
            for (s = 0; s < e.pais.length; s++)
              if (e.from[s] != this.seat) {
                var d = 0;
                var f = t.DesktopMgr.Inst.seat2LocalPosition(this.seat);
                switch (
                  (t.DesktopMgr.Inst.seat2LocalPosition(e.from[s]) - f + 4) % 4
                ) {
                  case 1:
                    d = 0;
                    break;
                  case 2:
                    d = e.pais.length - 2;
                    break;
                  case 3:
                    d = e.pais.length - 1;
                }
                var p = h[s];
                h[s] = h[d];
                h[d] = p;
                break;
              }
            l = h[0];
            for (s = 0; s < e.pais.length; s++) {
              var u = h[s];
              var _ = r[u];
              this.origin.parent.addChild(_.model);
              _.model.transform.localPosition = this.origin.transform.localPosition.clone();
              this.xOffset += 0.5 * t.PAIMODEL_HEIGHT * 1.02;
              _.ShowRot();
              _.model.transform.localPosition.x -= this.xOffset;

              _.model.transform.localPosition.z -=
                    0.5 * (t.PAIMODEL_HEIGHT - t.PAIMODEL_WIDTH) * 1.02;

              a = this.xOffset;
              this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02;
              _.model.transform.localPosition.x -= this.xOffset;
              _.ShowUp();
              e.from[u] != this.seat
                ? (this.xOffset += 0.5 * t.PAIMODEL_HEIGHT * 1.02)
                : (this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02);
            }
          } else {
            l = 0;
            for (s = 0; s < 4; s++) {
              _ = r[(u = s)];
              1 == s && t.DesktopMgr.Inst.SetLastQiPai(this.player.seat, _);
              this.origin.parent.addChild(_.model);
              _.model.transform.localPosition = this.origin.transform.localPosition.clone();
              this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02;
              _.ShowUp();
              _.model.transform.localPosition.x -= this.xOffset;
              a = this.xOffset;
              this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02;
              _.model.transform.localPosition.x -= this.xOffset;
              _.ShowBack();
              1 == s || 2 == s
                ? (this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02)
                : (this.xOffset += 0.5 * t.PAIMODEL_WIDTH * 1.02);
            }
          }
          this.hengs.push(a);
          if ((i)) {
            t.AudioMgr.PlayAudio(209);
            var m = new Laya.Sprite3D();
            this.origin.parent.addChild(m);

            m.transform.localPosition = r[
                l
              ].model.transform.localPosition.clone();

            m.transform.localRotationEuler = new Laya.Vector3(90, 0, 0);
            m.transform.localScale = new Laya.Vector3(1, 1, 1);
            for (
              var g = [], y = r[l].model.transform.localPosition.clone(), s = 0;
              s < r.length;
              s++
            ) {
              var v = r[s].model.transform.localPosition.clone();
              g.push(new Laya.Vector3(v.x - y.x, v.y - y.y, v.z - y.z));
            }
            m.addChild(r[s].model);
            for (s = 0; s < r.length; s++)
              r[s].model.transform.localPosition = g[s].clone();
            var b = m.transform.position.clone();
            this.player.hand3d.transform.position = b.clone();

            this.player.hand3d
              .getChildAt(0)
              .getChildByName('node_tile')
              .addChild(m);

            m.transform.localPosition = new Laya.Vector3(0, 0, 0);

            m.transform.localScale = new Laya.Vector3(
                1.1111,
                1.1111,
                1.1111
              );

            m.transform.localRotationEuler = new Laya.Vector3(-90, 0, 0);
            var w = t.ModelAnimationController.get_anim_config(
              'Fulu',
              this.player.hand_type
            );
            this.player.playHandAnimtion(w);
            m.active = !1;

            Laya.timer.once(w.keypoint[0], this, () => {
              m.active = !0;
            });

            Laya.timer.once(w.keypoint[1], this, () => {
              try {
                n.origin.parent.addChild(m);

                m.transform.localRotationEuler = new Laya.Vector3(
                    90,
                    0,
                    0
                  );

                m.transform.position = b;
                m.transform.localScale = new Laya.Vector3(1, 1, 1);
                for (var i = 0; i < r.length; i++) {
                  n.origin.parent.addChild(r[i].model);
                  var a = r[i].model.transform.localPosition.clone();
                  a.x += y.x;
                  a.y += y.y;
                  a.z += y.z;
                  r[i].model.transform.localPosition = a;
                }
                t.DesktopMgr.Inst.ActionRunComplete();
              } catch (t) {
                var s = {};
                s.error = t.message;
                s.stack = t.stack;
                s.method = 'AddMing2';
                s.ming = e.toString();
                s.class = 'Block_Ming';
                GameMgr.Inst.onFatalError(s);
              }
            });

            Laya.timer.once(33, this, () => {
              try {
                if (null == m || m.destroyed) return;

                var i =
                    t.DesktopMgr.Inst.player_effects[n.player.seat]
                      .effect_ming;

                var a = game.EffectMgr.create_d3_effect(i, !0).root;
                n.origin.parent.addChild(a);
                a.transform.worldMatrix = m.transform.worldMatrix.clone();

                a.transform.localRotationEuler = new Laya.Vector3(
                    180,
                    0,
                    0
                  );

                a.active = !0;

                Laya.timer.frameLoop(1, a, () => {
                  a.transform.worldMatrix = m.transform.worldMatrix.clone();
                  m &&
                    !m.destroyed &&
                    ((a.transform.localRotationEuler = new Laya.Vector3(
                      180,
                      0,
                      0
                    )));
                });

                Laya.timer.once(1500, a, () => {
                  Laya.timer.clearAll(a);
                  a && (a.destroy());
                  m && m.destroy();
                });
              } catch (t) {
                var r = {};
                r.error = t.message;
                r.stack = t.stack;
                r.method = 'AddMing4';
                r.ming = e.toString();
                r.class = 'Block_Ming';
                GameMgr.Inst.onFatalError(r);
              }
            });
          }
        } catch (t) {
          var x = {};
          x.error = t.message;
          x.stack = t.stack;
          x.method = 'AddMing';
          x.ming = e.toString();
          x.class = 'Block_Ming';
          GameMgr.Inst.onFatalError(x);
        }
      }

      AddGang(e, i) {
        var n = this;
        void 0 === i && (i = !0);
        for (
          var a = a => {
              if (
                r.mings[a].type == mjcore.E_Ming.kezi &&
                0 == mjcore.MJPai.Distance(r.mings[a].pais[0], e)
              ) {
                r.mings[a].type = mjcore.E_Ming.gang_ming;
                r.mings[a].pais.push(e.Clone());
                r.mings[a].from.push(r.player.seat);
                var s = new t.ViewPai(e, t.DesktopMgr.Inst.CreatePai3D(e));
                r.origin.parent.addChild(s.model);
                s.model.transform.localPosition = r.origin.transform.localPosition.clone();
                s.ShowRot();
                s.model.transform.localPosition.x -= r.hengs[a];

                s.model.transform.localPosition.z =
                    s.model.transform.localPosition.z -
                    0.5 * (t.PAIMODEL_HEIGHT - t.PAIMODEL_WIDTH) * 1.02 +
                    1.02 * t.PAIMODEL_WIDTH;

                t.DesktopMgr.Inst.SetLastQiPai(r.player.seat, s);
                r.pais.push(s);

                t.DesktopMgr.Inst.showingPaopai &&
                  (s.ispaopai = t.DesktopMgr.Inst.isPaoPai(s.val));

                s.OnChoosedPai();
                var o = t.DesktopMgr.Inst.effect_shadow.clone();
                s.model.addChild(o);

                o.transform.localPosition = new Laya.Vector3(
                    0,
                    0,
                    0.5 * -t.PAIMODEL_THICKNESS
                  );

                o.transform.localScale = new Laya.Vector3(
                    0.53 * t.PAIMODEL_WIDTH,
                    1,
                    0.53 * t.PAIMODEL_HEIGHT
                  );

                o.transform.localRotationEuler = new Laya.Vector3(90, 0, 0);
                o.active = !0;
                if (
                  (i)
                ) {
                  t.AudioMgr.PlayAudio(209);
                  var l = new Laya.Sprite3D();
                  r.origin.parent.addChild(l);
                  l.transform.localPosition = s.model.transform.localPosition.clone();

                  l.transform.localRotationEuler = new Laya.Vector3(
                      90,
                      0,
                      0
                    );

                  l.transform.localScale = new Laya.Vector3(1, 1, 1);
                  var h = s.model.transform.localPosition.clone();
                  l.addChild(s.model);
                  s.model.transform.localPosition = new Laya.Vector3(
                      0,
                      0,
                      0
                    );
                  var c = l.transform.position.clone();
                  r.player.hand3d.transform.position = c.clone();

                  r.player.hand3d
                    .getChildAt(0)
                    .getChildByName('node_tile')
                    .addChild(l);

                  l.transform.localPosition = new Laya.Vector3(0, 0, 0);

                  l.transform.localScale = new Laya.Vector3(
                      1.1111,
                      1.1111,
                      1.1111
                    );

                  l.transform.localRotationEuler = new Laya.Vector3(
                      -90,
                      0,
                      0
                    );
                  var u = t.ModelAnimationController.get_anim_config(
                    'Fulu',
                    r.player.hand_type
                  );
                  r.player.playHandAnimtion(u);
                  l.active = !1;

                  Laya.timer.once(u.keypoint[0], r, () => {
                    l.active = !0;
                  });

                  Laya.timer.once(u.keypoint[1], r, () => {
                    n.origin.parent.addChild(l);

                    l.transform.localRotationEuler = new Laya.Vector3(
                        90,
                        0,
                        0
                      );

                    l.transform.localScale = new Laya.Vector3(1, 1, 1);
                    l.transform.position = c;
                    n.origin.parent.addChild(s.model);
                    s.model.transform.localPosition = h;

                    t.DesktopMgr.Inst.lastqipai === s &&
                      t.DesktopMgr.Inst.effect_pai_canchi.active &&
                      t.DesktopMgr.Inst.ShowChiPengEffect();

                    t.DesktopMgr.Inst.ActionRunComplete();
                  });

                  Laya.timer.once(33, r, () => {
                    if (null != l && !l.destroyed) {
                      var e =
                          t.DesktopMgr.Inst.player_effects[n.player.seat]
                            .effect_ming,
                        i = game.EffectMgr.create_d3_effect(e, !0).root;
                      n.origin.parent.addChild(i);
                      i.transform.worldMatrix = l.transform.worldMatrix.clone();

                      i.transform.localRotationEuler = new Laya.Vector3(
                          180,
                          0,
                          0
                        );

                      i.active = !0;

                      Laya.timer.frameLoop(1, i, () => {
                        i.transform.worldMatrix = l.transform.worldMatrix.clone();
                        l &&
                          !l.destroyed &&
                          ((i.transform.localRotationEuler = new Laya.Vector3(
                            180,
                            0,
                            0
                          )));
                      });

                      Laya.timer.once(1500, i, () => {
                        Laya.timer.clearAll(i);
                        i && (i.destroy());
                        l && l.destroy();
                      });
                    }
                  });
                }
                return 'break';
              }
            },
            r = this,
            s = 0;
          s < this.mings.length;
          s++
        ) {
          if ('break' === a(s)) break;
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
  t.Block_Ming = e;
})(view || (view = {}));