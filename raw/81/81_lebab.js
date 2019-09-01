let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      app.Log.log(`ActionDiscardTile play data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, false);
      const i = e.seat;
      const n = mjcore.MJPai.Create(e.tile);
      const a = !(null == e.is_liqi || undefined == e.is_liqi || !e.is_liqi);
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(i)
        ].AddQiPai(n, a, e.moqie),
        a)
      ) {
        e.is_wliqi
          ? t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].PlaySound('act_drich')
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].PlaySound('act_rich');
        const r = t.DesktopMgr.Inst.player_effects[i].liqi_bgm;
        r &&
          '' != r &&
          (t.AudioMgr.lizhiMuted
            ? t.AudioMgr.PlayLiqiBgm(r, 300, true)
            : (t.BgmListMgr.stopBgm(),
              Laya.timer.once(1e3, this, () => {
                t.DesktopMgr.Inst.gameing &&
                  (t.BgmListMgr.PlayMJBgm('', true),
                  t.AudioMgr.PlayLiqiBgm(r, 300, true));
              })));
      }
      i == t.DesktopMgr.Inst.seat
        ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(n, false)
        : t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(i)
          ].onDiscardTile(e.moqie, false),
        e.operation &&
          Laya.timer.once(500, this, () => {
            t.ActionOperation.play(e.operation);
          }),
        undefined != e.zhenting &&
          undefined == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        i == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, false);
    }),
    (i.fastplay = function(e, i) {
      app.Log.log(
        `ActionDiscardTile fastplay data:${JSON.stringify(e)} usetime:${i}`
      ),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = mjcore.MJPai.Create(e.tile);
      const r = !(null == e.is_liqi || undefined == e.is_liqi || !e.is_liqi);
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(n)
      ].AddQiPai(a, r, e.moqie, false),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, true)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].onDiscardTile(e.moqie, true),
        e.operation &&
          -1 != i &&
          Laya.timer.once(500, this, () => {
            t.ActionOperation.play(e.operation, i);
          }),
        undefined != e.zhenting &&
          undefined == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        n == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, true);
    }),
    (i.record = (e, i) => {
      undefined === i && (i = 0),
        app.Log.log(`ActionDiscardTile record data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = mjcore.MJPai.Create(e.tile);
      const r = !(null == e.is_liqi || undefined == e.is_liqi || !e.is_liqi);
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddQiPai(a, r, e.moqie),
        r &&
          (e.is_wliqi
            ? t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(n)
              ].PlaySound('act_drich')
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(n)
              ].PlaySound('act_rich'),
          uiscript.UI_DesktopInfo.Inst.changeHeadEmo(n, 'emoji_9', 2e3)),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, false)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordDiscardTile(a, e.moqie, false),
        e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && e.operations)
      )
        for (let s = 0; s < e.operations.length; s++)
          t.ActionOperation.ob(e.operations[s], i, 450);
      return 500;
    }),
    (i.fastrecord = (e, i) => {
      undefined === i && (i = -1),
        app.Log.log(`ActionDiscardTile fastrecord data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = mjcore.MJPai.Create(e.tile);
      const r = !(null == e.is_liqi || undefined == e.is_liqi || !e.is_liqi);
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddQiPai(a, r, e.moqie, false),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, true)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordDiscardTile(a, e.moqie, true),
        e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          i >= 0 &&
          e.operations)
      )
        for (let s = 0; s < e.operations.length; s++)
          t.ActionOperation.ob(e.operations[s], i, 450);
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionDiscardTile = e;
})(view || (view = {}));