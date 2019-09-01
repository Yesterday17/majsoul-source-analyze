let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      app.Log.log(`ActionLiqi play data:${JSON.stringify(e)}`),
        Laya.timer.once(300, this, () => {
          const i = e.seat;
          const n = e.score;
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(i)
          ].ShowLiqi(),
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].SetScore(n, t.DesktopMgr.Inst.mainrole.score),
            uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
        });
    }),
    (i.fastplay = (e, i) => {
      app.Log.log(`ActionLiqi fastplay data:${JSON.stringify(e)}`);
      const n = e.seat;
      const a = e.score;
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(n)
      ].ShowLiqi(false),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].SetScore(a, t.DesktopMgr.Inst.mainrole.score),
        uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
    }),
    (i.record = function(t) {
      return app.Log.log(`ActionLiqi record data:${JSON.stringify(t)}`),
      this.play(t),
      0
    ;
    }),
    (i.fastrecord = e => {
      app.Log.log(`ActionLiqi fastrecord data:${JSON.stringify(e)}`);
      const i = e.seat;
      const n = e.score;
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(i)
      ].ShowLiqi(false),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(i)
        ].SetScore(n, t.DesktopMgr.Inst.mainrole.score),
        uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionLiqi = e;
})(view || (view = {}));