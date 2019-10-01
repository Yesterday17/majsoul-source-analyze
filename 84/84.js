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
        app.Log.log(`ActionLiuJu play data:${JSON.stringify(e)}`);
        t.DesktopMgr.Inst.gameing = !1;
        uiscript.UI_OtherPlayerInfo.Inst.close();
        var n = 0;
        n = 1e3;
        e.liqi ? (t.ActionLiqi.play(e.liqi)) : (n = 500);
        if (
          (e.type == mjcore.E_LiuJu.sanjiahule)
        ) {
          t.BgmListMgr.stopBgm();
          var a = e.seat;

          Laya.timer.once(n, this, () => {
            for (var e = [], i = 0; i < 4; i++)
              t.DesktopMgr.Inst.localPosition2Seat(i) != a && e.push(i);
            uiscript.UI_Huleshow.Inst.showRong(e);
          });

          n += 1500;

          Laya.timer.once(n, this, () => {
            for (var i = 0; i < e.allplayertiles.length; i++)
              if (i != a) {
                for (
                  var n = e.allplayertiles[i].split('|'), r = [], s = 0;
                  s < n.length;
                  s++
                )
                  r.push(mjcore.MJPai.Create(n[s]));
                r = r.sort(mjcore.MJPai.Distance);
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(i)
                ].Huangpai(!0, r, !1);
              }
          });

          n += 1e3;
          Laya.timer.once(n, this, () => {
            uiscript.UIMgr.Inst.ShowLiuJu(e);
            t.DesktopMgr.Inst.ActionRunComplete();
          });
        } else
          Laya.timer.once(n, this, () => {
            t.BgmListMgr.stopBgm();
            var n = 500;
            if (e.type == mjcore.E_LiuJu.jiuzhongjiupai) {
              for (
                var a = e.seat, r = e.tiles, s = [], o = 0;
                o < r.length;
                o++
              )
                s.push(mjcore.MJPai.Create(r[o]));
              s = s.sort(mjcore.MJPai.Distance);
              t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(a)
              ].Huangpai(!0, s, !1);
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
                s = s.sort(mjcore.MJPai.Distance);
                t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(l)
                ].Huangpai(!0, s, !1);
              }
              n = 1e3;
            }
            Laya.timer.once(n, i, () => {
              uiscript.UIMgr.Inst.ShowLiuJu(e);
              t.DesktopMgr.Inst.ActionRunComplete();
            });
          });
      }

      static record(t) {
        app.Log.log(`ActionLiuJu record data:${JSON.stringify(t)}`);
        this.play(t);
        return 4e3;
      }

      static fastrecord(t) {
        this.play(t);
      }
    }

    __extends(i, e);

    i.fastplay = (e, i) => {
      app.Log.log(`ActionLiuJu fastplay data:${JSON.stringify(e)}`);
      t.BgmListMgr.stopBgm();
      t.DesktopMgr.Inst.gameing = !1;
      uiscript.UI_OtherPlayerInfo.Inst.close();
      e.liqi && t.ActionLiqi.fastplay(e.liqi, 0);
      if (
        (e.type == mjcore.E_LiuJu.jiuzhongjiupai)
      ) {
        for (var n = e.seat, a = e.tiles, r = [], s = 0; s < a.length; s++)
          r.push(mjcore.MJPai.Create(a[s]));
        r = r.sort(mjcore.MJPai.Distance);
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].Huangpai(!0, r, !0);
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
            r = r.sort(mjcore.MJPai.Distance);
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(o)
            ].Huangpai(!0, r, !1);
          }
      uiscript.UIMgr.Inst.ShowLiuJu(e);
    };

    return i;
  })(t.ActionBase);
  t.ActionLiuJu = e;
})(view || (view = {}));