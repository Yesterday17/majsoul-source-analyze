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
        for (var n = 0, a = 1; a < 4; a++) {
          var r = t.DesktopMgr.Inst.players[a].discardcd - Laya.timer.currTimer;
          r > n && (n = r);
        }
        Laya.timer.once(n, this, () => {
          t.BgmListMgr.stopBgm();
          var n = e.players;
          t.DesktopMgr.Inst.gameing = !1;
          uiscript.UI_OtherPlayerInfo.Inst.close();
          uiscript.UI_TingPai.Inst.reset();
          uiscript.UI_TingPai.Inst.setZhengting(!1);
          for (var a = 0; a < n.length; a++) {
            for (var r = [], s = 0; s < n[a].hand.length; s++)
              r.push(mjcore.MJPai.Create(n[a].hand[s]));
            r = r.sort(mjcore.MJPai.Distance);
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(a)
            ].Huangpai(n[a].tingpai, r, !1);
          }

          Laya.timer.once(1e3, i, () => {
            uiscript.UI_Huleshow.Inst.showLiuJu(n);
          });

          Laya.timer.once(6e3, i, () => {
            if (e.liujumanguan) uiscript.UIMgr.Inst.ShowWin(e.scores, !0);
            else {
              var i = [];
              if (e.scores && e.scores.length > 0) {
                for (a = 0; a < t.DesktopMgr.Inst.player_count; a++)
                  i.push({ old_score: e.scores[0].old_scores[a], delta: 0 });
                for (a = 0; a < e.scores.length; a++)
                  if (e.scores[a].hasOwnProperty('delta_scores'))
                    for (
                      var n = 0;
                      n < t.DesktopMgr.Inst.player_count &&
                      n < e.scores[a].delta_scores.length;
                      n++
                    )
                      i[n].delta += e.scores[a].delta_scores[n];
              } else
                for (var a = 0; a < t.DesktopMgr.Inst.player_count; a++)
                  i.push({
                    old_score:
                      t.DesktopMgr.Inst.players[
                        t.DesktopMgr.Inst.seat2LocalPosition(a)
                      ].score,
                    delta: 0
                  });
              uiscript.UI_ScoreChange.Inst.show(i);
            }
            t.DesktopMgr.Inst.ActionRunComplete();
          });
        });
      }

      static record(t) {
        app.Log.log(`ActionNewRound record data:${JSON.stringify(t)}`);
        this.play(t);
        return 8e3;
      }

      static fastrecord(t) {
        this.play(t);
      }
    }

    __extends(i, e);

    i.fastplay = (e, i) => {
      app.Log.log(`ActionNewRound fastplay data:${JSON.stringify(e)}`);
      t.BgmListMgr.stopBgm();
      var n = e.players;
      t.DesktopMgr.Inst.gameing = !1;
      uiscript.UI_OtherPlayerInfo.Inst.close();
      var a = [!1, !1, !1, !1];
      uiscript.UI_TingPai.Inst.reset();
      uiscript.UI_TingPai.Inst.setZhengting(!1);
      for (l = 0; l < t.DesktopMgr.Inst.player_count; l++) {
        for (var r = [], s = 0; s < n[l].hand.length; s++)
          r.push(mjcore.MJPai.Create(n[l].hand[s]));
        r = r.sort(mjcore.MJPai.Distance);

        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(l)
        ].Huangpai(n[l].tingpai, r, !0);

        a[t.DesktopMgr.Inst.seat2LocalPosition(l)] = n[l].tingpai;
      }
      if (e.liujumanguan) uiscript.UIMgr.Inst.ShowWin(e.scores, !0);
      else {
        var o = [];
        if (e.scores && e.scores.length > 0) {
          for (l = 0; l < t.DesktopMgr.Inst.player_count; l++)
            o.push({ old_score: e.scores[0].old_scores[l], delta: 0 });
          for (l = 0; l < e.scores.length; l++)
            if (e.scores[l].hasOwnProperty('delta_scores'))
              for (
                s = 0;
                s < t.DesktopMgr.Inst.player_count &&
                s < e.scores[l].delta_scores.length;
                s++
              )
                o[s].delta += e.scores[l].delta_scores[s];
        } else
          for (var l = 0; l < t.DesktopMgr.Inst.player_count; l++)
            o.push({
              old_score:
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(l)
                ].score,
              delta: 0
            });
        uiscript.UI_ScoreChange.Inst.show(o);
      }
    };

    return i;
  })(t.ActionBase);
  t.ActionNoTile = e;
})(view || (view = {}));