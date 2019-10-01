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
      (i.play = function(e) {
        app.Log.log('ActionDiscardTile play data:' + JSON.stringify(e)),
          e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !1);
        var i = e.seat,
          n = mjcore.MJPai.Create(e.tile),
          a = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi);
        if (
          (t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(i)
          ].AddQiPai(n, a, e.moqie),
          a)
        ) {
          e.is_wliqi
            ? t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(i)
              ].PlaySound('act_drich')
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(i)
              ].PlaySound('act_rich');
          var r = t.DesktopMgr.Inst.player_effects[i].liqi_bgm;
          r &&
            '' != r &&
            (t.AudioMgr.lizhiMuted
              ? t.AudioMgr.PlayLiqiBgm(r, 300, !0)
              : (t.BgmListMgr.stopBgm(),
                Laya.timer.once(1e3, this, function() {
                  t.DesktopMgr.Inst.gameing &&
                    (t.BgmListMgr.PlayMJBgm('', !0),
                    t.AudioMgr.PlayLiqiBgm(r, 300, !0));
                })));
        }
        i == t.DesktopMgr.Inst.seat
          ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(n, !1)
          : t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(i)
            ].onDiscardTile(e.moqie, !1),
          e.operation &&
            Laya.timer.once(500, this, function() {
              t.ActionOperation.play(e.operation);
            }),
          void 0 != e.zhenting &&
            void 0 == e.operation &&
            (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
            uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
          i == t.DesktopMgr.Inst.seat &&
            uiscript.UI_TingPai.Inst.setData1(e, !1);
      }),
      (i.fastplay = function(e, i) {
        app.Log.log(
          'ActionDiscardTile fastplay data:' +
            JSON.stringify(e) +
            ' usetime:' +
            i
        ),
          e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
        var n = e.seat,
          a = mjcore.MJPai.Create(e.tile),
          r = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi);
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(n)
        ].AddQiPai(a, r, e.moqie, !1),
          n == t.DesktopMgr.Inst.seat
            ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, !0)
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(n)
              ].onDiscardTile(e.moqie, !0),
          e.operation &&
            -1 != i &&
            Laya.timer.once(500, this, function() {
              t.ActionOperation.play(e.operation, i);
            }),
          void 0 != e.zhenting &&
            void 0 == e.operation &&
            (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
            uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
          n == t.DesktopMgr.Inst.seat &&
            uiscript.UI_TingPai.Inst.setData1(e, !0);
      }),
      (i.record = function(e, i) {
        void 0 === i && (i = 0),
          app.Log.log('ActionDiscardTile record data:' + JSON.stringify(e)),
          e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
        var n = e.seat,
          a = mjcore.MJPai.Create(e.tile),
          r = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi);
        if (
          (t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(n)
          ].AddQiPai(a, r, e.moqie),
          r &&
            (e.is_wliqi
              ? t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(n)
                ].PlaySound('act_drich')
              : t.DesktopMgr.Inst.players[
                  t.DesktopMgr.Inst.seat2LocalPosition(n)
                ].PlaySound('act_rich'),
            uiscript.UI_DesktopInfo.Inst.changeHeadEmo(n, 'emoji_9', 2e3)),
          n == t.DesktopMgr.Inst.seat
            ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, !1)
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(n)
              ].recordDiscardTile(a, e.moqie, !1),
          e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
          t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && e.operations)
        )
          for (var s = 0; s < e.operations.length; s++)
            t.ActionOperation.ob(e.operations[s], i, 450);
        return 500;
      }),
      (i.fastrecord = function(e, i) {
        void 0 === i && (i = -1),
          app.Log.log('ActionDiscardTile fastrecord data:' + JSON.stringify(e)),
          e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
        var n = e.seat,
          a = mjcore.MJPai.Create(e.tile),
          r = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi);
        if (
          (t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(n)
          ].AddQiPai(a, r, e.moqie, !1),
          n == t.DesktopMgr.Inst.seat
            ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, !0)
            : t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(n)
              ].recordDiscardTile(a, e.moqie, !0),
          e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais),
          t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
            i >= 0 &&
            e.operations)
        )
          for (var s = 0; s < e.operations.length; s++)
            t.ActionOperation.ob(e.operations[s], i, 450);
      }),
      i
    );
  })(t.ActionBase);
  t.ActionDiscardTile = e;
})(view || (view = {}));