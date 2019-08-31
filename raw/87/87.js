var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  view;
!(function(t) {
  var e = (function(e) {
    function i() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      __extends(i, e),
      (i.play = function(e, i) {
        void 0 === i && (i = 0),
          app.Log.log(
            'ActionOperation play data:' + JSON.stringify(e) + ' usetime:' + i
          );
        try {
          if (e) {
            t.DesktopMgr.Inst.mainrole.can_discard = !1;
            var n = e.operation_list;
            if (null == n || 0 == n.length) return;
            t.DesktopMgr.Inst.oplist = n;
            var a = e.time_fixed,
              r = e.time_add;
            (a -= i) < 0 && ((r += a), (a = 0), r < 0 && (r = 0)),
              app.Log.log('ActionOperation time_fixed:' + a + ' time_add:' + r),
              a + r >= 2e3 &&
                t.DesktopMgr.Inst._PendingAuto() &&
                uiscript.UI_DesktopInfo.Inst.showCountDown(a, r);
          }
        } catch (t) {
          var s = {};
          (s.error = t.message),
            (s.stack = t.stack),
            (s.method = 'play'),
            (s.name = 'ActionOperation'),
            GameMgr.Inst.onFatalError(s);
        }
      }),
      (i.ob = function(e, i, n) {
        void 0 === i && (i = 0),
          void 0 === n && (n = 0),
          app.Log.log(
            'ActionOperation ob data:' + JSON.stringify(e) + ' usetime:' + i
          );
        e.seat == t.DesktopMgr.Inst.seat &&
          Laya.timer.once(n, this, function() {
            var t = e.time_fixed,
              n = e.time_add;
            if (
              ((i -= 300) < 0 && (i = 0),
              (t -= i) < 0 && ((n += t), (t = 0), n < 0 && (n = 0)),
              t + n >= 2e3)
            ) {
              for (
                var a = !1, r = !1, s = !1, o = e.operation_list, l = 0;
                l < o.length;
                l++
              ) {
                switch (o[l].type) {
                  case mjcore.E_PlayOperation.eat:
                  case mjcore.E_PlayOperation.peng:
                  case mjcore.E_PlayOperation.ming_gang:
                  case mjcore.E_PlayOperation.rong:
                    a = !0;
                    break;
                  case mjcore.E_PlayOperation.an_gang:
                  case mjcore.E_PlayOperation.add_gang:
                  case mjcore.E_PlayOperation.liqi:
                  case mjcore.E_PlayOperation.zimo:
                    r = !0;
                  case mjcore.E_PlayOperation.jiuzhongjiupai:
                    r = !0;
                }
                (o[l].type != mjcore.E_PlayOperation.dapai &&
                  o[l].type != mjcore.E_PlayOperation.liqi) ||
                  (s = !0);
              }
              r && uiscript.UIMgr.Inst.ShowLiqiZimo(o),
                a && uiscript.UIMgr.Inst.ShowChipenghu(o),
                (a || r || s) &&
                  uiscript.UI_DesktopInfo.Inst.showCountDown(t, n);
            }
          });
      }),
      i
    );
  })(t.ActionBase);
  t.ActionOperation = e;
})(view || (view = {}));