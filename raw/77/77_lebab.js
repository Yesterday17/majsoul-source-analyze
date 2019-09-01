let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = function(e) {
      app.Log.log(`ActionAnGangAddGang play data:${JSON.stringify(e)}`);
      const i = e.seat;
      const n = t.DesktopMgr.Inst.seat2LocalPosition(i);
      if (
        (e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, false),
        e.type == mjcore.E_Ming.gang_ming)
      )
        t.DesktopMgr.Inst.players[n].PlaySound('act_kan'),
          Laya.timer.once(500, this, () => {
            t.DesktopMgr.Inst.players[n].AddGang(
              mjcore.MJPai.Create(e.tiles)
            ),
              (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
          });
      else {
        const a = new mjcore.MJMing();
        (a.type = mjcore.E_Ming.gang_an),
          (a.from = [i, i, i, i]),
          (a.pais = this.getAngangTile(e.tiles)),
          Laya.timer.once(500, this, () => {
            t.DesktopMgr.Inst.players[n].AddMing(a),
              (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
          }),
          t.DesktopMgr.Inst.players[n].PlaySound('act_kan');
      }
      e.operation &&
        Laya.timer.once(600, this, () => {
          t.ActionOperation.play(e.operation);
        }),
        undefined != e.zhenting &&
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting),
        i == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, false),
        uiscript.UI_DesktopInfo.Inst.changeHeadEmo(i, 'emoji_5', 2e3);
    }),
    (i.fastplay = function(e, i) {
      app.Log.log(
        `ActionAnGangAddGang fastplay data:${JSON.stringify(e)} usetime:${i}`
      );
      const n = e.seat;
      const a = t.DesktopMgr.Inst.seat2LocalPosition(n);
      if (
        (e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true),
        e.type == mjcore.E_Ming.gang_ming)
      )
        t.DesktopMgr.Inst.players[a].AddGang(
          mjcore.MJPai.Create(e.tiles),
          false
        );
      else {
        const r = new mjcore.MJMing();
        (r.type = mjcore.E_Ming.gang_an),
          (r.from = [n, n, n, n]),
          (r.pais = this.getAngangTile(e.tiles)),
          t.DesktopMgr.Inst.players[a].AddMing(r, false);
      }
      e.operation &&
        -1 != i &&
        Laya.timer.once(500, this, () => {
          t.ActionOperation.play(e.operation, i);
        }),
        undefined != e.zhenting &&
          uiscript.UI_TingPai.Inst.setZhengting(e.zhenting),
        n == t.DesktopMgr.Inst.seat &&
          uiscript.UI_TingPai.Inst.setData1(e, true),
        (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
    }),
    (i.record = function(e, i) {
      undefined === i && (i = 0),
        app.Log.log(`ActionAnGangAddGang record data:${JSON.stringify(e)}`),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = t.DesktopMgr.Inst.seat2LocalPosition(n);
      if (e.type == mjcore.E_Ming.gang_ming)
        t.DesktopMgr.Inst.players[a].PlaySound('act_kan'),
          Laya.timer.once(500, this, () => {
            t.DesktopMgr.Inst.players[a].AddGang(
              mjcore.MJPai.Create(e.tiles)
            ),
              (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
          });
      else {
        const r = new mjcore.MJMing();
        (r.type = mjcore.E_Ming.gang_an),
          (r.from = [n, n, n, n]),
          (r.pais = this.getAngangTile(e.tiles)),
          Laya.timer.once(500, this, () => {
            t.DesktopMgr.Inst.players[a].AddMing(r),
              (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true);
          }),
          t.DesktopMgr.Inst.players[a].PlaySound('act_kan');
      }
      if (
        (uiscript.UI_DesktopInfo.Inst.changeHeadEmo(n, 'emoji_5', 2e3),
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && e.operations)
      )
        for (let s = 0; s < e.operations.length; s++)
          t.ActionOperation.ob(e.operations[s], i, 450);
      return 1700;
    }),
    (i.fastrecord = function(e, i) {
      undefined === i && (i = -1),
        app.Log.log(
          `ActionAnGangAddGang fastrecord data:${JSON.stringify(e)}`
        ),
        e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, true);
      const n = e.seat;
      const a = t.DesktopMgr.Inst.seat2LocalPosition(n);
      if (e.type == mjcore.E_Ming.gang_ming)
        t.DesktopMgr.Inst.players[a].AddGang(
          mjcore.MJPai.Create(e.tiles),
          false
        );
      else {
        const r = new mjcore.MJMing();
        (r.type = mjcore.E_Ming.gang_an),
          (r.from = [n, n, n, n]),
          (r.pais = this.getAngangTile(e.tiles)),
          t.DesktopMgr.Inst.players[a].AddMing(r, false);
      }
      if (
        t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
        i >= 0 &&
        e.operations
      )
        for (let s = 0; s < e.operations.length; s++)
          t.ActionOperation.ob(e.operations[s], i, 450);
      t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true;
    }),
    (i.getAngangTile = e => {
      const i = [];
      if (('0' != e.charAt(0) && '5' != e.charAt(0)) || 'z' == e.charAt(1))
        for (s = 0; s < 4; s++) i.push(mjcore.MJPai.Create(e));
      else {
        let n = 1;
        if (t.DesktopMgr.Inst.game_config) {
          const a = t.DesktopMgr.Inst.game_config.mode;
          if (a && a.extendinfo) {
            const r = JSON.parse(a.extendinfo);
            if (r && null != r.dora_count)
              switch (r.dora_count) {
                case 0:
                  n = 0;
                  break;
                case 2:
                case 3:
                  n = 1;
                  break;
                case 4:
                  n = 'p' == e.charAt(1) ? 2 : 1;
              }
          }
          if (
            a &&
            a.detail_rule &&
            a.detail_rule &&
            null != a.detail_rule.dora_count
          )
            switch (a.detail_rule.dora_count) {
              case 0:
                n = 0;
                break;
              case 2:
              case 3:
                n = 1;
                break;
              case 4:
                n = 'p' == e.charAt(1) ? 2 : 1;
            }
        }
        for (var s = 0; s < 4; s++) {
          const o = mjcore.MJPai.Create(e);
          (o.dora = 0 != s && s <= n), i.push(o);
        }
      }
      return (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = true), i;
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionAnGangAddGang = e;
})(view || (view = {}));