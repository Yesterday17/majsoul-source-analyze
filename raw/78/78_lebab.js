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
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      app.Log.log(`ActionBabei play data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !1);
      const i = e.seat;
      const n = mjcore.MJPai.Create('4z');
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(i)
      ].AddBabei(n, e.moqie, !0),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(i)
        ].PlaySound('act_babei'),
        i == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(n, !1)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].onBabei(e.moqie, !1),
        e.operation &&
          Laya.timer.once(500, this, () => {
            t.ActionOperation.play(e.operation);
          }),
        void 0 != e.zhenting &&
          void 0 == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        i == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, !1),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0);
    }),
    (i.fastplay = function(e, i) {
      app.Log.log(
        `ActionBabei fastplay data:${JSON.stringify(e)} usetime:${i}`
      ),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
      const n = e.seat;
      const a = mjcore.MJPai.Create('4z');
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(n)
      ].AddBabei(a, e.moqie, !1),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(a, !0)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].onBabei(e.moqie, !0),
        e.operation &&
          -1 != i &&
          Laya.timer.once(500, this, () => {
            t.ActionOperation.play(e.operation, i);
          }),
        void 0 != e.zhenting &&
          void 0 == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        n == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, !0),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0);
    }),
    (i.record = (e, i) => {
      void 0 === i && (i = 0),
        app.Log.log(`ActionBabei record data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
      const n = e.seat;
      const a = mjcore.MJPai.Create('4z');
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddBabei(a, e.moqie, !0),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].PlaySound('act_babei'),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(a, !1)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordBabei(a, e.moqie, !1),
        e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && e.operations)
      )
        for (let r = 0; r < e.operations.length; r++)
          t.ActionOperation.ob(e.operations[r], i, 450);
      return (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0), 1e3;
    }),
    (i.fastrecord = (e, i) => {
      void 0 === i && (i = -1),
        app.Log.log(`ActionBabei fastrecord data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
      const n = e.seat;
      const a = mjcore.MJPai.Create('4z');
      if (
        (t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddBabei(a, e.moqie, !1),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.onBabei(a, !0)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordBabei(a, e.moqie, !0),
        e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          i >= 0 &&
          e.operations)
      )
        for (let r = 0; r < e.operations.length; r++)
          t.ActionOperation.ob(e.operations[r], i, 450);
      t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0;
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionBabei = e;
})(view || (view = {}));