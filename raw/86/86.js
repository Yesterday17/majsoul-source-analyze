var view;
!(function(t) {
  var e = (function(e) {
    function i() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      __extends(i, e),
      (i.play = function(e) {
        var i = this;
        app.Log.log('ActionNewRound play data:' + JSON.stringify(e));
        for (var n = 0, a = 1; a < 4; a++) {
          var r = t.DesktopMgr.Inst.players[a].discardcd - Laya.timer.currTimer;
          r > n && (n = r);
        }
        Laya.timer.once(n, this, function() {
          t.BgmListMgr.stopBgm();
          var n = e.players;
          (t.DesktopMgr.Inst.gameing = false),
            uiscript.UI_OtherPlayerInfo.Inst.close(),
            uiscript.UI_TingPai.Inst.reset(),
            uiscript.UI_TingPai.Inst.setZhengting(false);
          for (var a = 0; a < n.length; a++) {
            for (var r = [], s = 0; s < n[a].hand.length; s++)
              r.push(mjcore.MJPai.Create(n[a].hand[s]));
            (r = r.sort(mjcore.MJPai.Distance)),
              t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(a)
              ].Huangpai(n[a].tingpai, r, false);
          }
          Laya.timer.once(1e3, i, function() {
            uiscript.UI_Huleshow.Inst.showLiuJu(n);
          }),
            Laya.timer.once(6e3, i, function() {
              if (e.liujumanguan) uiscript.UIMgr.Inst.ShowWin(e.scores, true);
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
      }),
      (i.fastplay = function(e, i) {
        app.Log.log('ActionNewRound fastplay data:' + JSON.stringify(e));
        t.BgmListMgr.stopBgm();
        var n = e.players;
        (t.DesktopMgr.Inst.gameing = false),
          uiscript.UI_OtherPlayerInfo.Inst.close();
        var a = [false, false, false, false];
        uiscript.UI_TingPai.Inst.reset(),
          uiscript.UI_TingPai.Inst.setZhengting(false);
        for (l = 0; l < t.DesktopMgr.Inst.player_count; l++) {
          for (var r = [], s = 0; s < n[l].hand.length; s++)
            r.push(mjcore.MJPai.Create(n[l].hand[s]));
          (r = r.sort(mjcore.MJPai.Distance)),
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(l)
            ].Huangpai(n[l].tingpai, r, true),
            (a[t.DesktopMgr.Inst.seat2LocalPosition(l)] = n[l].tingpai);
        }
        if (e.liujumanguan) uiscript.UIMgr.Inst.ShowWin(e.scores, true);
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
      }),
      (i.record = function(t) {
        return (
          app.Log.log('ActionNewRound record data:' + JSON.stringify(t)),
          this.play(t),
          8e3
        );
      }),
      (i.fastrecord = function(t) {
        this.play(t);
      }),
      i
    );
  })(t.ActionBase);
  t.ActionNoTile = e;
})(view || (view = {}));