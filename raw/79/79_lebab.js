let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      app.Log.log(`ActionChiPengGang play data:${JSON.stringify(e)}`);
      const i = e.seat;
      const n = new mjcore.MJMing();
      (n.type = e.type), (n.from = e.froms), (n.pais = []);
      for (let a = 0; a < e.tiles.length; a++)
        n.pais.push(mjcore.MJPai.Create(e.tiles[a]));
      Laya.timer.once(600, this, () => {
        try {
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(
              t.DesktopMgr.Inst.lastpai_seat
            )
          ].QiPaiNoPass(),
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].AddMing(n),
            n.type == mjcore.E_Ming.gang_ming &&
              (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
        } catch (t) {
          const e = {};
          (e.error = t.message),
            (e.stack = t.stack),
            (e.method = 'addming600'),
            (e.name = 'ActionChiPengGang'),
            GameMgr.Inst.onFatalError(e);
        }
      }),
        i != t.DesktopMgr.Inst.seat ||
          (n.type != mjcore.E_Ming.gang_an &&
            n.type != mjcore.E_Ming.gang_ming) ||
          (t.DesktopMgr.Inst.last_gang = Laya.timer.currTimer);
      let r = '';
      let s = '';
      switch (n.type) {
        case mjcore.E_Ming.kezi:
          (r = 'emoji_4'), (s = 'emoji_3');
          break;
        case mjcore.E_Ming.shunzi:
          (r = 'emoji_2'), (s = 'emoji_1');
          break;
        case mjcore.E_Ming.gang_ming:
          (r = 'emoji_6'), (s = 'emoji_5');
      }
      uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
        t.DesktopMgr.Inst.index_player,
        r,
        2e3
      ),
        (t.DesktopMgr.Inst.index_player = i),
        uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
          t.DesktopMgr.Inst.index_player,
          s,
          2e3
        ),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.play(e.liqi),
        e.operation &&
          Laya.timer.once(600, this, () => {
            t.ActionOperation.play(e.operation);
          }),
        undefined != e.zhenting &&
          undefined == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting));
      let o = '';
      switch (n.type) {
        case mjcore.E_Ming.shunzi:
          o = 'act_chi';
          break;
        case mjcore.E_Ming.gang_ming:
        case mjcore.E_Ming.gang_an:
          o = 'act_kan';
          break;
        case mjcore.E_Ming.kezi:
          o = 'act_pon';
      }
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(i)
      ].PlaySound(o),
        i == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData0(e);
    }),
    (i.fastplay = function(e, i) {
      app.Log.log(
        `ActionChiPengGang fastplay data:${JSON.stringify(e)} usetime:${i}`
      );
      const n = e.seat;
      const a = new mjcore.MJMing();
      (a.type = e.type), (a.from = e.froms), (a.pais = []);
      for (let r = 0; r < e.tiles.length; r++)
        a.pais.push(mjcore.MJPai.Create(e.tiles[r]));
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)
      ].QiPaiNoPass(),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddMing(a, false),
        a.type == mjcore.E_Ming.gang_ming &&
          (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true),
        n != t.DesktopMgr.Inst.seat ||
          (a.type != mjcore.E_Ming.gang_an &&
            a.type != mjcore.E_Ming.gang_ming) ||
          (t.DesktopMgr.Inst.last_gang = Laya.timer.currTimer),
        (t.DesktopMgr.Inst.index_player = n),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.fastplay(e.liqi, 0),
        e.operation &&
          -1 != i &&
          Laya.timer.once(600, this, () => {
            t.ActionOperation.play(e.operation, i);
          }),
        undefined != e.zhenting &&
          undefined == e.operation &&
          (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
        n == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData0(e);
    }),
    (i.record = function(e, i) {
      undefined === i && (i = 0),
        app.Log.log(`ActionChiPengGang record data:${JSON.stringify(e)}`);
      const n = e.seat;
      const a = new mjcore.MJMing();
      (a.type = e.type), (a.from = e.froms), (a.pais = []);
      for (let r = 0; r < e.tiles.length; r++)
        a.pais.push(mjcore.MJPai.Create(e.tiles[r]));
      Laya.timer.once(600, this, () => {
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)
        ].QiPaiNoPass(),
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(n)
          ].AddMing(a),
          a.type == mjcore.E_Ming.gang_ming &&
            (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
      }),
        n != t.DesktopMgr.Inst.seat ||
          (a.type != mjcore.E_Ming.gang_an &&
            a.type != mjcore.E_Ming.gang_ming) ||
          (t.DesktopMgr.Inst.last_gang = Laya.timer.currTimer);
      let s = '';
      let o = '';
      switch (a.type) {
        case mjcore.E_Ming.kezi:
          (s = 'emoji_4'), (o = 'emoji_3');
          break;
        case mjcore.E_Ming.shunzi:
          (s = 'emoji_2'), (o = 'emoji_1');
          break;
        case mjcore.E_Ming.gang_ming:
          (s = 'emoji_6'), (o = 'emoji_5');
      }
      uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
        t.DesktopMgr.Inst.index_player,
        s,
        2e3
      ),
        (t.DesktopMgr.Inst.index_player = n),
        uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
          t.DesktopMgr.Inst.index_player,
          o,
          2e3
        ),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.record(e.liqi);
      let l = '';
      switch (a.type) {
        case mjcore.E_Ming.shunzi:
          l = 'act_chi';
          break;
        case mjcore.E_Ming.gang_ming:
        case mjcore.E_Ming.gang_an:
          l = 'act_kan';
          break;
        case mjcore.E_Ming.kezi:
          l = 'act_pon';
      }
      return (
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].PlaySound(l),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          e.operation &&
          t.ActionOperation.ob(e.operation, i, 500),
        1700
      );
    }),
    (i.fastrecord = (e, i) => {
      undefined === i && (i = -1),
        app.Log.log(`ActionChiPengGang fastrecord data:${JSON.stringify(e)}`);
      const n = e.seat;
      const a = new mjcore.MJMing();
      (a.type = e.type), (a.from = e.froms), (a.pais = []);
      for (let r = 0; r < e.tiles.length; r++)
        a.pais.push(mjcore.MJPai.Create(e.tiles[r]));
      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)
      ].QiPaiNoPass(),
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddMing(a, false),
        a.type == mjcore.E_Ming.gang_ming &&
          (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true),
        (t.DesktopMgr.Inst.index_player = n),
        t.DesktopMgr.Inst.RefreshPlayerIndicator(),
        e.liqi && t.ActionLiqi.fastrecord(e.liqi),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
          i >= 0 &&
          e.operation &&
          t.ActionOperation.ob(e.operation, i, 500);
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionChiPengGang = e;
})(view || (view = {}));