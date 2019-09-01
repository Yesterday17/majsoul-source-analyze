let view;
!(t => {
  const e = (e => {
    function i(...args) {
      return (null !== e && e.apply(this, args)) || this;
    }
    return __extends(i, e),
    (i.play = (e, i) => {
      undefined === i && (i = 0),
        app.Log.log(
          `ActionOperation play data:${JSON.stringify(e)} usetime:${i}`
        );
      try {
        if (e) {
          t.DesktopMgr.Inst.mainrole.can_discard = false;
          const n = e.operation_list;
          if (null == n || 0 == n.length) return;
          t.DesktopMgr.Inst.oplist = n;
          let a = e.time_fixed;
          let r = e.time_add;
          (a -= i) < 0 && ((r += a), (a = 0), r < 0 && (r = 0)),
            app.Log.log(`ActionOperation time_fixed:${a} time_add:${r}`),
            a + r >= 2e3 &&
              t.DesktopMgr.Inst._PendingAuto() &&
              uiscript.UI_DesktopInfo.Inst.showCountDown(a, r);
        }
      } catch (t) {
        const s = {};
        (s.error = t.message),
          (s.stack = t.stack),
          (s.method = 'play'),
          (s.name = 'ActionOperation'),
          GameMgr.Inst.onFatalError(s);
      }
    }),
    (i.ob = function(e, i, n) {
      undefined === i && (i = 0),
        undefined === n && (n = 0),
        app.Log.log(
          `ActionOperation ob data:${JSON.stringify(e)} usetime:${i}`
        );
      e.seat == t.DesktopMgr.Inst.seat &&
        Laya.timer.once(n, this, () => {
          let t = e.time_fixed;
          let n = e.time_add;
          if (
            ((i -= 300) < 0 && (i = 0),
            (t -= i) < 0 && ((n += t), (t = 0), n < 0 && (n = 0)),
            t + n >= 2e3)
          ) {
            for (
              var a = false, r = false, s = false, o = e.operation_list, l = 0;
              l < o.length;
              l++
            ) {
              switch (o[l].type) {
                case mjcore.E_PlayOperation.eat:
                case mjcore.E_PlayOperation.peng:
                case mjcore.E_PlayOperation.ming_gang:
                case mjcore.E_PlayOperation.rong:
                  a = true;
                  break;
                case mjcore.E_PlayOperation.an_gang:
                case mjcore.E_PlayOperation.add_gang:
                case mjcore.E_PlayOperation.liqi:
                case mjcore.E_PlayOperation.zimo:
                  r = true;
                case mjcore.E_PlayOperation.jiuzhongjiupai:
                  r = true;
              }
              (o[l].type != mjcore.E_PlayOperation.dapai &&
                o[l].type != mjcore.E_PlayOperation.liqi) ||
                (s = true);
            }
            r && uiscript.UIMgr.Inst.ShowLiqiZimo(o),
              a && uiscript.UIMgr.Inst.ShowChipenghu(o),
              (a || r || s) &&
                uiscript.UI_DesktopInfo.Inst.showCountDown(t, n);
          }
        });
    }),
    i
  ;
  })(t.ActionBase);
  t.ActionOperation = e;
})(view || (view = {}));