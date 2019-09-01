let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      const i = this;
      console.log(`ActionHule play data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, false),
        (t.DesktopMgr.Inst.gameing = false),
        uiscript.UI_OtherPlayerInfo.Inst.close(),
        t.BgmListMgr.stopBgm();
      let n = false;
      Laya.timer.once(100, this, () => {
        const a = e.hules;
        let r = 0;
        if (a[0].zimo) {
          for (var s = a[0].seat, o = [], l = 0; l < a[0].hand.length; l++)
            o.push(mjcore.MJPai.Create(a[0].hand[l]));
          (o = o.sort(mjcore.MJPai.Distance)),
            uiscript.UI_Huleshow.Inst.showZimo([
              t.DesktopMgr.Inst.seat2LocalPosition(s)
            ]),
            (r += 1400),
            ((a[0].title && '' != a[0].title) || a[0].title_id) &&
              (Laya.timer.once(r, i, () => {
                uiscript.UI_HuCutIn.show(
                  t.DesktopMgr.Inst.player_datas[s].avatar_id
                ),
                  (n = true);
              }),
              (r += 2e3)),
            Laya.timer.once(r, i, () => {
              s == t.DesktopMgr.Inst.seat &&
                t.DesktopMgr.Inst.mainrole.HulePrepare(
                  o,
                  a[0].hu_tile,
                  a[0].zimo
                ),
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(s)
                ].Hule(o, a[0].hu_tile, a[0].zimo, n);
            }),
            (r += 2800),
            s == t.DesktopMgr.Inst.seat &&
              (uiscript.UI_TingPai.Inst.reset(),
              uiscript.UI_TingPai.Inst.setZhengting(false));
        } else {
          Laya.timer.once(r, i, () => {
            for (var e = [], i = 0; i < a.length; i++)
              e.push(t.DesktopMgr.Inst.seat2LocalPosition(a[i].seat));
            uiscript.UI_Huleshow.Inst.showRong(e);
          }),
            (r += 1500);
          for (
            const h = e => {
                      const s = a[e].seat;
                      ((a[e].title && '' != a[e].title) || a[e].title_id) &&
                        (Laya.timer.once(r, i, () => {
                          uiscript.UI_HuCutIn.show(
                            t.DesktopMgr.Inst.player_datas[s].avatar_id
                          ),
                            (n = true);
                        }),
                        (r += 2e3));
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
              (c = c.sort(mjcore.MJPai.Distance)),
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
              const s = a[r].seat;
              if (-1 == i) i = s;
              else {
                t.DesktopMgr.Inst.seat2LocalPosition(i) >
                  t.DesktopMgr.Inst.seat2LocalPosition(s) && (i = s);
              }
            }
            i >= 0 && (e = t.DesktopMgr.Inst.player_effects[i].effect_hupai),
              t.DesktopMgr.Inst.ShowHuleEffect(
                t.DesktopMgr.Inst.lastqipai.model.transform.position,
                e
              );
            for (r = 0; r < a.length; r++) {
              for (var o = [], l = 0; l < a[r].hand.length; l++)
                o.push(mjcore.MJPai.Create(a[r].hand[l]));
              (o = o.sort(mjcore.MJPai.Distance)),
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(a[r].seat)
                ].Hule(o, a[r].hu_tile, a[r].zimo, n),
                a[r].seat == t.DesktopMgr.Inst.seat &&
                  (uiscript.UI_TingPai.Inst.reset(),
                  uiscript.UI_TingPai.Inst.setZhengting(false));
            }
          }),
            (r += 2e3);
        }
        for (l = 0; l < e.delta_scores.length; l++)
          e.delta_scores[l] > 0
            ? uiscript.UI_DesktopInfo.Inst.changeHeadEmo(l, 'emoji_7', -1)
            : e.delta_scores[l] < 0 &&
              uiscript.UI_DesktopInfo.Inst.changeHeadEmo(l, 'emoji_8', -1);
        Laya.timer.once(r, i, () => {
          uiscript.UIMgr.Inst.ShowWin(e, false),
            t.DesktopMgr.Inst.ActionRunComplete();
        });
      });
    }),
    (i.fastplay = (e, i) => {
      app.Log.log(`ActionHule fastplay data:${JSON.stringify(e)}`),
        t.BgmListMgr.stopBgm(),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, false),
        (t.DesktopMgr.Inst.gameing = false),
        uiscript.UIMgr.Inst.ShowWin(e, false);
    }),
    (i.record = function(t) {
      return this.play(t), 1e5;
    }),
    (i.fastrecord = function(t) {
      this.play(t);
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionHule = e;
})(view || (view = {}));