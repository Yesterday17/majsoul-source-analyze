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
        app.Log.log(`ActionLiqi play data:${JSON.stringify(e)}`);
        Laya.timer.once(300, this, () => {
          var i = e.seat;
          var n = e.score;

          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(i)
          ].ShowLiqi();

          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(i)
          ].SetScore(n, t.DesktopMgr.Inst.mainrole.score);

          uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
        });
      }

      static record(t) {
        app.Log.log(`ActionLiqi record data:${JSON.stringify(t)}`);
        this.play(t);
        return 0;
      }
    }

    __extends(i, e);

    i.fastplay = (e, i) => {
      app.Log.log(`ActionLiqi fastplay data:${JSON.stringify(e)}`);
      var n = e.seat;
      var a = e.score;

      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(n)
      ].ShowLiqi(!1);

      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(n)
      ].SetScore(a, t.DesktopMgr.Inst.mainrole.score);

      uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
    };

    i.fastrecord = e => {
      app.Log.log(`ActionLiqi fastrecord data:${JSON.stringify(e)}`);
      var i = e.seat;
      var n = e.score;

      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(i)
      ].ShowLiqi(!1);

      t.DesktopMgr.Inst.players[
        t.DesktopMgr.Inst.seat2LocalPosition(i)
      ].SetScore(n, t.DesktopMgr.Inst.mainrole.score);

      uiscript.UI_DesktopInfo.Inst.setLiqibang(e.liqibang);
    };

    return i;
  })(t.ActionBase);
  t.ActionLiqi = e;
})(view || (view = {}));