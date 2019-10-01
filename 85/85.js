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
        app.Log.log(`ActionNewRound play data:${JSON.stringify(e)}`);
        t.BgmListMgr.PlayMJBgm();
        t.DesktopMgr.Inst.index_change = e.chang;
        t.DesktopMgr.Inst.index_ju = e.ju;
        t.DesktopMgr.Inst.index_ben = e.ben;
        t.DesktopMgr.Inst.index_player = e.ju;
        t.DesktopMgr.Inst.gameing = !0;
        t.DesktopMgr.Inst.left_tile_count = 69;

        t.DesktopMgr.Inst.rule_mode == t.ERuleMode.Liqi4
          ? (t.DesktopMgr.Inst.left_tile_count = 69)
          : (t.DesktopMgr.Inst.rule_mode = t.ERuleMode.Liqi3) &&
            (t.DesktopMgr.Inst.left_tile_count = 50);

        e.left_tile_count &&
          (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count);

        t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1;
        t.DesktopMgr.Inst.setAutoHule(!1);
        t.DesktopMgr.Inst.setAutoMoQie(!1);
        t.DesktopMgr.Inst.setAutoNoFulu(!1);
        uiscript.UI_DesktopInfo.Inst.resetFunc();
        uiscript.UI_TingPai.Inst.reset();

        t.DesktopMgr.Inst.SetChangJuShow(
          t.DesktopMgr.Inst.index_change,
          t.DesktopMgr.Inst.index_ju
        );

        uiscript.UI_DesktopInfo.Inst.setBen(t.DesktopMgr.Inst.index_ben);
        uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
        uiscript.UI_DesktopInfo.Inst.reset_rounds();
        uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
        t.DesktopMgr.Inst.players[n].Reset();
        for (var n = 0; n < 4; n++)
          t.DesktopMgr.Inst.players[n].setSeat(
            t.DesktopMgr.Inst.localPosition2Seat(n)
          );
        t.DesktopMgr.Inst.RefreshPlayerIndicator();
        t.DesktopMgr.Inst.RefreshPaiLeft();
        t.DesktopMgr.Inst.setScores(e.scores);
        t.DesktopMgr.Inst.md5 = e.md5;
        t.DesktopMgr.Inst.choosed_pai = null;
        t.DesktopMgr.Inst.dora = [];
        var a = 0;
        var r = !1;

        0 == t.DesktopMgr.Inst.index_change &&
          0 == t.DesktopMgr.Inst.index_ju &&
          0 == t.DesktopMgr.Inst.index_ben &&
          t.DesktopMgr.Inst.is_dora3_mode() &&
          (r = !0);

        uiscript.UI_DesktopInfo.Inst.openDora3BeginEffect();
        r &&
          ((a = 1300));
        var s = !1;
        void 0 != e.al && null != e.al && (s = e.al);
        uiscript.UI_AL.Show();
        s && ((a = 1300));

        Laya.timer.once(a, this, () => {
          for (var n = [], a = 0; a < e.tiles.length; a++)
            n.push(mjcore.MJPai.Create(e.tiles[a]));
          t.DesktopMgr.Inst.mainrole.NewGame(n, !1);
          for (a = 1; a < 4; a++) {
            var r = t.DesktopMgr.Inst.localPosition2Seat(a);
            -1 != r &&
              t.DesktopMgr.Inst.players[a].NewGame(
                13 + (r == t.DesktopMgr.Inst.index_ju ? 1 : 0),
                !1
              );
          }

          t.DesktopMgr.Inst.is_dora3_mode() &&
            Laya.timer.once(1e3, i, () => {
              uiscript.UI_DesktopInfo.Inst.openDora3BeginShine();
            });

          Laya.timer.once(1200, i, () => {
            t.DesktopMgr.Inst.dora.push(
              mjcore.MJPai.Create(e.doras[i])
            );

            if (e.doras && e.doras.length > 0)
              for (i = 0; i < e.doras.length; i++)
                uiscript.UI_DesktopInfo.Inst.setDora(
                  i,
                  t.DesktopMgr.Inst.dora[i]
                );
            for (var i = 0; i < 4; i++)
              t.DesktopMgr.Inst.players[i].OnDoraRefresh();
            if (t.DesktopMgr.Inst.index_ju == t.DesktopMgr.Inst.seat) {
              n = { tingpais: e.tingpais0, operation: e.operation };
              uiscript.UI_TingPai.Inst.setData0(n);
            } else {
              var n = { tingpais: e.tingpais1 };
              uiscript.UI_TingPai.Inst.setData1(n, !1);
            }
            t.DesktopMgr.Inst.ActionRunComplete();
          });

          void 0 != e.operation &&
            Laya.timer.once(1e3, i, () => {
              t.ActionOperation.play(e.operation);
            });
        });

        t.DesktopMgr.Inst.fetchLinks();
      }

      static fastplay(e, i) {
        app.Log.log(
          `ActionNewRound fastplay data:${JSON.stringify(e)} usetime:${i}`
        );

        t.DesktopMgr.Inst.index_change = e.chang;
        t.DesktopMgr.Inst.index_ju = e.ju;
        t.DesktopMgr.Inst.index_ben = e.ben;
        t.DesktopMgr.Inst.index_player = e.ju;
        t.DesktopMgr.Inst.gameing = !0;
        t.DesktopMgr.Inst.left_tile_count = 69;

        t.DesktopMgr.Inst.rule_mode == t.ERuleMode.Liqi4
          ? (t.DesktopMgr.Inst.left_tile_count = 69)
          : (t.DesktopMgr.Inst.rule_mode = t.ERuleMode.Liqi3) &&
            (t.DesktopMgr.Inst.left_tile_count = 50);

        e.left_tile_count &&
          (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count);

        t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1;
        t.DesktopMgr.Inst.setAutoHule(!1);
        t.DesktopMgr.Inst.setAutoMoQie(!1);
        t.DesktopMgr.Inst.setAutoNoFulu(!1);
        uiscript.UI_DesktopInfo.Inst.resetFunc();
        uiscript.UI_TingPai.Inst.reset();

        t.DesktopMgr.Inst.SetChangJuShow(
          t.DesktopMgr.Inst.index_change,
          t.DesktopMgr.Inst.index_ju
        );

        uiscript.UI_DesktopInfo.Inst.setBen(t.DesktopMgr.Inst.index_ben);
        uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
        uiscript.UI_DesktopInfo.Inst.reset_rounds();
        uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
        t.DesktopMgr.Inst.players[a].Reset();
        for (a = 0; a < 4; a++)
          t.DesktopMgr.Inst.players[a].setSeat(
            t.DesktopMgr.Inst.localPosition2Seat(a)
          );
        t.DesktopMgr.Inst.RefreshPlayerIndicator();
        t.DesktopMgr.Inst.RefreshPaiLeft();
        t.DesktopMgr.Inst.setScores(e.scores);
        t.DesktopMgr.Inst.md5 = e.md5;
        t.DesktopMgr.Inst.choosed_pai = null;
        t.DesktopMgr.Inst.dora = [];
        for (var n = [], a = 0; a < e.tiles.length; a++)
          n.push(mjcore.MJPai.Create(e.tiles[a]));
        t.DesktopMgr.Inst.mainrole.NewGame(n, !0);
        for (a = 1; a < 4; a++) {
          var r = t.DesktopMgr.Inst.localPosition2Seat(a);
          -1 != r &&
            t.DesktopMgr.Inst.players[a].NewGame(
              13 + (r == t.DesktopMgr.Inst.index_ju ? 1 : 0),
              !0
            );
        }
        t.DesktopMgr.Inst.dora.push(mjcore.MJPai.Create(e.doras[a]));
        if (e.doras && e.doras.length > 0)
          for (a = 0; a < e.doras.length; a++)
            uiscript.UI_DesktopInfo.Inst.setDora(
              a,
              t.DesktopMgr.Inst.dora[a]
            );
        for (a = 0; a < 4; a++) t.DesktopMgr.Inst.players[a].OnDoraRefresh();
        if (t.DesktopMgr.Inst.index_ju == t.DesktopMgr.Inst.seat) {
          s = { tingpais: e.tingpais0, operation: e.operation };
          uiscript.UI_TingPai.Inst.setData0(s);
        } else {
          var s = { tingpais: e.tingpais1 };
          uiscript.UI_TingPai.Inst.setData1(s, !0);
        }
        e.operation &&
          -1 != i &&
          Laya.timer.once(100, this, () => {
            t.ActionOperation.play(e.operation, i + 100);
          });
      }
    }

    __extends(i, e);

    i.record = (e, i) => {
      void 0 === i && (i = 0);
      app.Log.log(`ActionNewRound record data:${JSON.stringify(e)}`);
      t.DesktopMgr.Inst.ClearOperationShow();
      t.BgmListMgr.PlayMJBgm();
      t.DesktopMgr.Inst.index_change = e.chang;
      t.DesktopMgr.Inst.index_ju = e.ju;
      t.DesktopMgr.Inst.index_ben = e.ben;
      t.DesktopMgr.Inst.index_player = e.ju;
      t.DesktopMgr.Inst.gameing = !0;
      t.DesktopMgr.Inst.left_tile_count = 69;

      t.DesktopMgr.Inst.rule_mode == t.ERuleMode.Liqi4
        ? (t.DesktopMgr.Inst.left_tile_count = 69)
        : (t.DesktopMgr.Inst.rule_mode = t.ERuleMode.Liqi3) &&
          (t.DesktopMgr.Inst.left_tile_count = 50);

      e.left_tile_count &&
        (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count);

      t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1;
      t.DesktopMgr.Inst.tingpais = [[], [], [], []];
      uiscript.UI_TingPai.Inst.reset();
      uiscript.UI_Replay.Inst.reset();

      t.DesktopMgr.Inst.SetChangJuShow(
        t.DesktopMgr.Inst.index_change,
        t.DesktopMgr.Inst.index_ju
      );

      uiscript.UI_DesktopInfo.Inst.setBen(t.DesktopMgr.Inst.index_ben);
      uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
      uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
      for (s = 0; s < 4; s++)
        t.DesktopMgr.Inst.players[s].setSeat(
          t.DesktopMgr.Inst.localPosition2Seat(s)
        );
      t.DesktopMgr.Inst.RefreshPlayerIndicator();
      t.DesktopMgr.Inst.RefreshPaiLeft();
      t.DesktopMgr.Inst.choosed_pai = null;
      t.DesktopMgr.Inst.dora = [];
      t.AudioMgr.PlayAudio(216);
      for (s = 0; s < 4; s++) {
        var n = [];
        var a = `tiles${s.toString()}`;
        if (e[a] && e[a].length > 0) {
          for (var r = 0; r < e[a].length; r++)
            n.push(mjcore.MJPai.Create(e[a][r]));
          s == t.DesktopMgr.Inst.seat
            ? t.DesktopMgr.Inst.mainrole.RecordNewGame(n)
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(s)
              ].RecordNewGame(n);
        }
      }
      t.DesktopMgr.Inst.setScores(e.scores);
      t.DesktopMgr.Inst.md5 = e.md5;
      uiscript.UI_DesktopInfo.Inst.reset_rounds();
      t.DesktopMgr.Inst.dora.push(mjcore.MJPai.Create(e.doras[s]));
      t.DesktopMgr.Inst.dora.push(mjcore.MJPai.Create(e.dora));
      if (
        (e.doras && e.doras.length > 0)
      )
        for (s = 0; s < e.doras.length; s++)
          uiscript.UI_DesktopInfo.Inst.setDora(
            s,
            t.DesktopMgr.Inst.dora[s]
          );
      else
        e.dora &&
          '' != e.dora &&
          (uiscript.UI_DesktopInfo.Inst.setDora(0, t.DesktopMgr.Inst.dora[0]));
      for (s = 0; s < 4; s++) t.DesktopMgr.Inst.players[s].OnDoraRefresh();
      if (e.tingpai)
        for (var s = 0; s < e.tingpai.length; s++)
          e.tingpai[s].seat != t.DesktopMgr.Inst.index_ju &&
            t.DesktopMgr.Inst.setTingpai(
              e.tingpai[s].seat,
              e.tingpai[s].tingpais1
            );
      uiscript.UI_Replay.Inst.page_paishan.setTiles(e.paishan);

      t.DesktopMgr.Inst.mode == t.EMJMode.paipu &&
        (e.paishan
          ? (uiscript.UI_Replay.Inst.page_paishan.refresh())
          : uiscript.UI_Replay.Inst.page_paishan.setNoInfo());

      t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
        e.operation &&
        t.ActionOperation.ob(e.operation, i, 1e3);

      return 300;
    };

    i.fastrecord = (e, i) => {
      void 0 === i && (i = -1);
      app.Log.log(`ActionNewRound fastrecord data:${JSON.stringify(e)}`);
      t.BgmListMgr.PlayMJBgm();
      t.DesktopMgr.Inst.ClearOperationShow();
      t.DesktopMgr.Inst.index_change = e.chang;
      t.DesktopMgr.Inst.index_ju = e.ju;
      t.DesktopMgr.Inst.index_ben = e.ben;
      t.DesktopMgr.Inst.index_player = e.ju;
      t.DesktopMgr.Inst.gameing = !0;
      t.DesktopMgr.Inst.left_tile_count = 69;

      t.DesktopMgr.Inst.rule_mode == t.ERuleMode.Liqi4
        ? (t.DesktopMgr.Inst.left_tile_count = 69)
        : (t.DesktopMgr.Inst.rule_mode = t.ERuleMode.Liqi3) &&
          (t.DesktopMgr.Inst.left_tile_count = 50);

      e.left_tile_count &&
        (t.DesktopMgr.Inst.left_tile_count = e.left_tile_count);

      t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !1;
      t.DesktopMgr.Inst.tingpais = [[], [], [], []];
      uiscript.UI_TingPai.Inst.reset();
      uiscript.UI_Replay.Inst.reset();

      t.DesktopMgr.Inst.SetChangJuShow(
        t.DesktopMgr.Inst.index_change,
        t.DesktopMgr.Inst.index_ju
      );

      uiscript.UI_DesktopInfo.Inst.setBen(t.DesktopMgr.Inst.index_ben);
      uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
      uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
      for (s = 0; s < 4; s++)
        t.DesktopMgr.Inst.players[s].setSeat(
          t.DesktopMgr.Inst.localPosition2Seat(s)
        );
      t.DesktopMgr.Inst.RefreshPlayerIndicator();
      t.DesktopMgr.Inst.RefreshPaiLeft();
      t.DesktopMgr.Inst.choosed_pai = null;
      t.DesktopMgr.Inst.dora = [];
      for (s = 0; s < 4; s++) {
        var n = [];
        var a = `tiles${s.toString()}`;
        if (e[a] && e[a].length > 0) {
          for (var r = 0; r < e[a].length; r++)
            n.push(mjcore.MJPai.Create(e[a][r]));
          s == t.DesktopMgr.Inst.seat
            ? t.DesktopMgr.Inst.mainrole.RecordNewGame(n)
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(s)
              ].RecordNewGame(n);
        }
      }
      t.DesktopMgr.Inst.setScores(e.scores);
      t.DesktopMgr.Inst.md5 = e.md5;
      uiscript.UI_DesktopInfo.Inst.reset_rounds();
      t.DesktopMgr.Inst.dora.push(mjcore.MJPai.Create(e.doras[s]));
      t.DesktopMgr.Inst.dora.push(mjcore.MJPai.Create(e.dora));
      if (
        (e.doras && e.doras.length > 0)
      )
        for (s = 0; s < e.doras.length; s++)
          uiscript.UI_DesktopInfo.Inst.setDora(
            s,
            t.DesktopMgr.Inst.dora[s]
          );
      else
        e.dora &&
          '' != e.dora &&
          (uiscript.UI_DesktopInfo.Inst.setDora(0, t.DesktopMgr.Inst.dora[0]));
      for (s = 0; s < 4; s++) t.DesktopMgr.Inst.players[s].OnDoraRefresh();
      if (e.tingpai)
        for (var s = 0; s < e.tingpai.length; s++)
          e.tingpai[s].seat != t.DesktopMgr.Inst.index_ju &&
            t.DesktopMgr.Inst.setTingpai(
              e.tingpai[s].seat,
              e.tingpai[s].tingpais1
            );
      uiscript.UI_Replay.Inst.page_paishan.setTiles(e.paishan);

      t.DesktopMgr.Inst.mode == t.EMJMode.paipu &&
        (e.paishan
          ? (uiscript.UI_Replay.Inst.page_paishan.refresh())
          : uiscript.UI_Replay.Inst.page_paishan.setNoInfo());

      t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
        i >= 0 &&
        e.operation &&
        t.ActionOperation.ob(e.operation, i, 1e3);
    };

    return i;
  })(t.ActionBase);
  t.ActionNewRound = e;
})(view || (view = {}));