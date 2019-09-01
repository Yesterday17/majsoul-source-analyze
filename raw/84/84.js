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
        app.Log.log('ActionLiuJu play data:' + JSON.stringify(e)),
          (t.DesktopMgr.Inst.gameing = false),
          uiscript.UI_OtherPlayerInfo.Inst.close();
        var n = 0;
        if (
          (e.liqi ? ((n = 1e3), t.ActionLiqi.play(e.liqi)) : (n = 500),
          e.type == mjcore.E_LiuJu.sanjiahule)
        ) {
          t.BgmListMgr.stopBgm();
          var a = e.seat;
          Laya.timer.once(n, this, function() {
            for (var e = [], i = 0; i < 4; i++)
              t.DesktopMgr.Inst.localPosition2Seat(i) != a && e.push(i);
            uiscript.UI_Huleshow.Inst.showRong(e);
          }),
            (n += 1500),
            Laya.timer.once(n, this, function() {
              for (var i = 0; i < e.allplayertiles.length; i++)
                if (i != a) {
                  for (
                    var n = e.allplayertiles[i].split('|'), r = [], s = 0;
                    s < n.length;
                    s++
                  )
                    r.push(mjcore.MJPai.Create(n[s]));
                  (r = r.sort(mjcore.MJPai.Distance)),
                    t.DesktopMgr.Inst.players[
                      t.DesktopMgr.Inst.seat2LocalPosition(i)
                    ].Huangpai(true, r, false);
                }
            }),
            (n += 1e3),
            Laya.timer.once(n, this, function() {
              uiscript.UIMgr.Inst.ShowLiuJu(e),
                t.DesktopMgr.Inst.ActionRunComplete();
            });
        } else
          Laya.timer.once(n, this, function() {
            t.BgmListMgr.stopBgm();
            var n = 500;
            if (e.type == mjcore.E_LiuJu.jiuzhongjiupai) {
              for (
                var a = e.seat, r = e.tiles, s = [], o = 0;
                o < r.length;
                o++
              )
                s.push(mjcore.MJPai.Create(r[o]));
              (s = s.sort(mjcore.MJPai.Distance)),
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(a)
                ].Huangpai(true, s, false);
            }
            if (
              e.type == mjcore.E_LiuJu.sijializhi &&
              e.allplayertiles &&
              e.allplayertiles.length > 0
            ) {
              for (var l = 0; l < e.allplayertiles.length; l++) {
                for (
                  var h = e.allplayertiles[l].split('|'), s = [], o = 0;
                  o < h.length;
                  o++
                )
                  s.push(mjcore.MJPai.Create(h[o]));
                (s = s.sort(mjcore.MJPai.Distance)),
                  t.DesktopMgr.Inst.players[
                    t.DesktopMgr.Inst.seat2LocalPosition(l)
                  ].Huangpai(true, s, false);
              }
              n = 1e3;
            }
            Laya.timer.once(n, i, function() {
              uiscript.UIMgr.Inst.ShowLiuJu(e),
                t.DesktopMgr.Inst.ActionRunComplete();
            });
          });
      }),
      (i.fastplay = function(e, i) {
        app.Log.log('ActionLiuJu fastplay data:' + JSON.stringify(e)),
          t.BgmListMgr.stopBgm(),
          (t.DesktopMgr.Inst.gameing = false),
          uiscript.UI_OtherPlayerInfo.Inst.close();
        if (
          (e.liqi && t.ActionLiqi.fastplay(e.liqi, 0),
          e.type == mjcore.E_LiuJu.jiuzhongjiupai)
        ) {
          for (var n = e.seat, a = e.tiles, r = [], s = 0; s < a.length; s++)
            r.push(mjcore.MJPai.Create(a[s]));
          (r = r.sort(mjcore.MJPai.Distance)),
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].Huangpai(true, r, true);
        }
        if (e.type == mjcore.E_LiuJu.sanjiahule)
          for (var n = e.seat, o = 0; o < e.allplayertiles.length; o++)
            if (o != n) {
              for (
                var l = e.allplayertiles[o].split('|'), r = [], s = 0;
                s < l.length;
                s++
              )
                r.push(mjcore.MJPai.Create(l[s]));
              (r = r.sort(mjcore.MJPai.Distance)),
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(o)
                ].Huangpai(true, r, false);
            }
        uiscript.UIMgr.Inst.ShowLiuJu(e);
      }),
      (i.record = function(t) {
        return (
          app.Log.log('ActionLiuJu record data:' + JSON.stringify(t)),
          this.play(t),
          4e3
        );
      }),
      (i.fastrecord = function(t) {
        this.play(t);
      }),
      i
    );
  })(t.ActionBase);
  t.ActionLiuJu = e;
})(view || (view = {}));