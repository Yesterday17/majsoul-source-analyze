let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      app.Log.log(`ActionBabei play data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, false);
      const i = e.seat;
      const n = mjcore.MJPai.Create('4z');
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(i)
      ].AddBabei(n, e.moqie, true),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(i)
        ].PlaySound('act_babei'),
        i == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(n, false)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].onBabei(e.moqie, false),
        e.operation &&
          Laya.timer.once(500, this, () => {
            t.ActionOperation.play(e.operation);
          }),
        undefined != e.zhenting &&
          undefined == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        i == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, false),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
    }),
    (i.fastplay = function(e, i) {
      app.Log.log(
        `ActionBabei fastplay data:${JSON.stringify(e)} usetime:${i}`
      ),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = mjcore.MJPai.Create('4z');
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(n)
      ].AddBabei(a, e.moqie, false),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(a, true)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].onBabei(e.moqie, true),
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
          uiscript.UI_TingPai.Inst.setData1(e, true),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
    }),
    (i.record = (e, i) => {
      undefined === i && (i = 0),
        app.Log.log(`ActionBabei record data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = mjcore.MJPai.Create('4z');
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddBabei(a, e.moqie, true),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].PlaySound('act_babei'),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(a, false)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordBabei(a, e.moqie, false),
        e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && e.operations)
      )
        for (let r = 0; r < e.operations.length; r++)
          t.ActionOperation.ob(e.operations[r], i, 450);
      return (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true), 1e3;
    }),
    (i.fastrecord = (e, i) => {
      undefined === i && (i = -1),
        app.Log.log(`ActionBabei fastrecord data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = mjcore.MJPai.Create('4z');
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddBabei(a, e.moqie, false),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(a, true)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordBabei(a, e.moqie, true),
        e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          i >= 0 &&
          e.operations)
      )
        for (let r = 0; r < e.operations.length; r++)
          t.ActionOperation.ob(e.operations[r], i, 450);
      t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true;
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionBabei = e;
})(view || (view = {}));