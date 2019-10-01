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
      constructor(...args) {
        return (null !== e && e.apply(this, args)) || this;
      }

      static play(e) {
        var i = this;
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !1);
        t.DesktopMgr.Inst.gameing = !1;
        uiscript.UI_OtherPlayerInfo.Inst.close();
        t.BgmListMgr.stopBgm();
        var n = !1;
        Laya.timer.once(100, this, () => {
          var a = e.hules;
          var r = 0;
          if (a[0].zimo) {
            for (var s = a[0].seat, o = [], l = 0; l < a[0].hand.length; l++)
              o.push(mjcore.MJPai.Create(a[0].hand[l]));
            o = o.sort(mjcore.MJPai.Distance);

            uiscript.UI_Huleshow.Inst.showZimo([
              t.DesktopMgr.Inst.seat2LocalPosition(s)
            ]);

            r += 1400;

            Laya.timer.once(r, i, () => {
              uiscript.UI_HuCutIn.show(
                t.DesktopMgr.Inst.player_datas[s].avatar_id
              );

              n = !0;
            });

            ((a[0].title && '' != a[0].title) || a[0].title_id) &&
              ((r += 2e3));

            Laya.timer.once(r, i, () => {
              s == t.DesktopMgr.Inst.seat &&
                t.DesktopMgr.Inst.mainrole.HulePrepare(
                  o,
                  a[0].hu_tile,
                  a[0].zimo
                );

              t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(s)
              ].Hule(o, a[0].hu_tile, a[0].zimo, n);
            });

            r += 2800;
            uiscript.UI_TingPai.Inst.reset();
            s == t.DesktopMgr.Inst.seat &&
              (uiscript.UI_TingPai.Inst.setZhengting(!1));
          } else {
            Laya.timer.once(r, i, () => {
              for (var e = [], i = 0; i < a.length; i++)
                e.push(t.DesktopMgr.Inst.seat2LocalPosition(a[i].seat));
              uiscript.UI_Huleshow.Inst.showRong(e);
            });

            r += 1500;
            for (
              var h = e => {
                var s = a[e].seat;

                Laya.timer.once(r, i, () => {
                  uiscript.UI_HuCutIn.show(
                    t.DesktopMgr.Inst.player_datas[s].avatar_id
                  );

                  n = !0;
                });

                ((a[e].title && '' != a[e].title) || a[e].title_id) &&
                  ((r += 2e3));
              },
                l = 0;
              l < a.length;
              l++
            )
              h(l);
            for (l = 0; l < a.length; l++) {
              if (a[l].seat == t.DesktopMgr.Inst.seat) {
                for (var c = [], u = 0; u < a[l].hand.length; u++)
                  c.push(mjcore.MJPai.Create(a[l].hand[u]));
                c = c.sort(mjcore.MJPai.Distance);
                t.DesktopMgr.Inst.mainrole.HulePrepare(
                  c,
                  a[l].hu_tile,
                  a[l].zimo
                );
              }
            }

            Laya.timer.once(r, i, () => {
              for (
                var e = 'scene/effect_hupai_default.lh', i = -1, r = 0;
                r < a.length;
                r++
              ) {
                var s = a[r].seat;
                if (-1 == i) i = s;
                else {
                  t.DesktopMgr.Inst.seat2LocalPosition(i) >
                    t.DesktopMgr.Inst.seat2LocalPosition(s) && (i = s);
                }
              }
              i >= 0 && (e = t.DesktopMgr.Inst.player_effects[i].effect_hupai);
              t.DesktopMgr.Inst.ShowHuleEffect(
                t.DesktopMgr.Inst.lastqipai,
                t.DesktopMgr.Inst.lastqipai.model.transform.position,
                e
              );
              for (r = 0; r < a.length; r++) {
                for (var o = [], l = 0; l < a[r].hand.length; l++)
                  o.push(mjcore.MJPai.Create(a[r].hand[l]));
                o = o.sort(mjcore.MJPai.Distance);

                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(a[r].seat)
                ].Hule(o, a[r].hu_tile, a[r].zimo, n);

                uiscript.UI_TingPai.Inst.reset();
                a[r].seat == t.DesktopMgr.Inst.seat &&
                  (uiscript.UI_TingPai.Inst.setZhengting(!1));
              }
            });

            r += 2e3;
          }
          uiscript.UI_DesktopInfo.Inst.changeHeadEmo(l, 'emoji_7', -1);
          uiscript.UI_DesktopInfo.Inst.changeHeadEmo(l, 'emoji_8', -1);
          for (l = 0; l < e.delta_scores.length; l++)
            e.delta_scores[l] > 0
              ? (t.DesktopMgr.Inst.onRoundEnd(l, 1))
              : e.delta_scores[l] < 0 &&
                (t.DesktopMgr.Inst.onRoundEnd(l, 0));
          Laya.timer.once(r, i, () => {
            uiscript.UIMgr.Inst.ShowWin(e, !1);
            t.DesktopMgr.Inst.ActionRunComplete();
          });
        });
      }

      static record(t) {
        this.play(t);
        return 1e5;
      }

      static fastrecord(t) {
        this.play(t);
      }
    }

    __extends(i, e);

    i.fastplay = (e, i) => {
      app.Log.log(`ActionHule fastplay data:${JSON.stringify(e)}`);
      t.BgmListMgr.stopBgm();
      e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !1);
      t.DesktopMgr.Inst.gameing = !1;
      uiscript.UIMgr.Inst.ShowWin(e, !1);
    };

    return i;
  })(t.ActionBase);
  t.ActionHule = e;
})(view || (view = {}));