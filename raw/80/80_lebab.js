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
      app.Log.log(`ActionDealTile play data:${JSON.stringify(e)}`);
      const i = e.seat;
      const n = e.tile;
      if (
        ((t.DesktopMgr.Inst.left_tile_count = e.left_tile_count),
        i == t.DesktopMgr.Inst.seat)
      ) {
        const a = Laya.timer.currTimer - t.DesktopMgr.Inst.last_gang;
        let r = 0;
        a < 650 && (r = 650 - a),
          Laya.timer.once(r, this, () => {
            t.DesktopMgr.Inst.mainrole.TakePai(mjcore.MJPai.Create(n)),
              t.DesktopMgr.Inst.ActionRunComplete();
          });
      } else
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(i)
        ].TakePai(mjcore.MJPai.Create('5z')),
          t.DesktopMgr.Inst.ActionRunComplete();
      (t.DesktopMgr.Inst.index_player = i),
        t.DesktopMgr.Inst.RefreshPaiLeft(),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.play(e.liqi),
        e.operation && t.ActionOperation.play(e.operation),
        e.doras &&
          e.doras.length > 0 &&
          t.DesktopMgr.Inst.WhenDoras(e.doras, !1),
        void 0 != e.zhenting &&
          void 0 == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        i == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData0(e),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1);
    }),
    (i.fastplay = (e, i) => {
      app.Log.log(
        `ActionDealTile fastplay data:${JSON.stringify(e)} usetime:${i}`
      );
      const n = e.seat;
      const a = e.tile;
      (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.TakePai(mjcore.MJPai.Create(a), !1)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].TakePai(mjcore.MJPai.Create('5z')),
        (t.DesktopMgr.Inst.index_player = n),
        t.DesktopMgr.Inst.RefreshPaiLeft(),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.fastplay(e.liqi, 0),
        e.operation && -1 != i && t.ActionOperation.play(e.operation, i),
        e.doras &&
          e.doras.length > 0 &&
          t.DesktopMgr.Inst.WhenDoras(e.doras, !0),
        void 0 != e.zhenting &&
          void 0 == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        n == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData0(e),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1);
    }),
    (i.record = (e, i) => {
      void 0 === i && (i = 0),
        app.Log.log(`ActionDealTile record data:${JSON.stringify(e)}`);
      const n = e.seat;
      const a = e.tile;
      return (
        (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.TakePai(mjcore.MJPai.Create(a))
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordTakePai(mjcore.MJPai.Create(a)),
        (t.DesktopMgr.Inst.index_player = n),
        t.DesktopMgr.Inst.RefreshPaiLeft(),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.record(e.liqi),
        e.doras &&
          e.doras.length > 0 &&
          t.DesktopMgr.Inst.WhenDoras(e.doras, !0),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          e.operation &&
          t.ActionOperation.ob(e.operation, i),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1),
        300
      );
    }),
    (i.fastrecord = (e, i) => {
      void 0 === i && (i = -1),
        app.Log.log(`ActionDealTile fastrecord data:${JSON.stringify(e)}`);
      const n = e.seat;
      const a = e.tile;
      (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count),
        n == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.TakePai(mjcore.MJPai.Create(a), !1)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].recordTakePai(mjcore.MJPai.Create(a)),
        (t.DesktopMgr.Inst.index_player = n),
        t.DesktopMgr.Inst.RefreshPaiLeft(),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.fastrecord(e.liqi),
        e.doras &&
          e.doras.length > 0 &&
          t.DesktopMgr.Inst.WhenDoras(e.doras, !0),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          i >= 0 &&
          e.operation &&
          t.ActionOperation.ob(e.operation, i),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1);
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionDealTile = e;
})(view || (view = {}));