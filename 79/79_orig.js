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
        app.Log.log('ActionChiPengGang play data:' + JSON.stringify(e));
        var i = e.seat,
          n = new mjcore.MJMing();
        (n.type = e.type), (n.from = e.froms), (n.pais = []);
        for (var a = 0; a < e.tiles.length; a++)
          n.pais.push(mjcore.MJPai.Create(e.tiles[a]));
        Laya.timer.once(600, this, function() {
          try {
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(
                t.DesktopMgr.Inst.lastpai_seat
              )
            ].QiPaiNoPass(),
              t.DesktopMgr.Inst.players[
                t.DesktopMgr.Inst.seat2LocalPosition(i)
              ].AddMing(n),
              n.type == mjcore.E_Ming.gang_ming &&
                (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0);
          } catch (t) {
            var e = {};
            (e.error = t.message),
              (e.stack = t.stack),
              (e.method = 'addming600'),
              (e.name = 'ActionChiPengGang'),
              GameMgr.Inst.onFatalError(e);
          }
        }),
          i != t.DesktopMgr.Inst.seat ||
            (n.type != mjcore.E_Ming.gang_an &&
              n.type != mjcore.E_Ming.gang_ming) ||
            (t.DesktopMgr.Inst.last_gang = Laya.timer.currTimer);
        var r = '',
          s = '';
        switch (n.type) {
          case mjcore.E_Ming.kezi:
            (r = 'emoji_4'), (s = 'emoji_3');
            break;
          case mjcore.E_Ming.shunzi:
            (r = 'emoji_2'), (s = 'emoji_1');
            break;
          case mjcore.E_Ming.gang_ming:
            (r = 'emoji_6'), (s = 'emoji_5');
        }
        uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
          t.DesktopMgr.Inst.index_player,
          r,
          2e3
        ),
          (t.DesktopMgr.Inst.index_player = i),
          uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
            t.DesktopMgr.Inst.index_player,
            s,
            2e3
          ),
          t.DesktopMgr.Inst.RefreshPlayerIndicator(),
          e.liqi && t.ActionLiqi.play(e.liqi),
          e.operation &&
            Laya.timer.once(600, this, function() {
              t.ActionOperation.play(e.operation);
            }),
          void 0 != e.zhenting &&
            void 0 == e.operation &&
            (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
            uiscript.UI_TingPai.Inst.setZhengting(e.zhenting));
        var o = '';
        switch (n.type) {
          case mjcore.E_Ming.shunzi:
            o = 'act_chi';
            break;
          case mjcore.E_Ming.gang_ming:
          case mjcore.E_Ming.gang_an:
            o = 'act_kan';
            break;
          case mjcore.E_Ming.kezi:
            o = 'act_pon';
        }
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(i)
        ].PlaySound(o),
          i == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData0(e);
      }),
      (i.fastplay = function(e, i) {
        app.Log.log(
          'ActionChiPengGang fastplay data:' +
            JSON.stringify(e) +
            ' usetime:' +
            i
        );
        var n = e.seat,
          a = new mjcore.MJMing();
        (a.type = e.type), (a.from = e.froms), (a.pais = []);
        for (var r = 0; r < e.tiles.length; r++)
          a.pais.push(mjcore.MJPai.Create(e.tiles[r]));
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)
        ].QiPaiNoPass(),
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(n)
          ].AddMing(a, !1),
          a.type == mjcore.E_Ming.gang_ming &&
            (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0),
          n != t.DesktopMgr.Inst.seat ||
            (a.type != mjcore.E_Ming.gang_an &&
              a.type != mjcore.E_Ming.gang_ming) ||
            (t.DesktopMgr.Inst.last_gang = Laya.timer.currTimer),
          (t.DesktopMgr.Inst.index_player = n),
          t.DesktopMgr.Inst.RefreshPlayerIndicator(),
          e.liqi && t.ActionLiqi.fastplay(e.liqi, 0),
          e.operation &&
            -1 != i &&
            Laya.timer.once(600, this, function() {
              t.ActionOperation.play(e.operation, i);
            }),
          void 0 != e.zhenting &&
            void 0 == e.operation &&
            (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),
            uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),
          n == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData0(e);
      }),
      (i.record = function(e, i) {
        void 0 === i && (i = 0),
          app.Log.log('ActionChiPengGang record data:' + JSON.stringify(e));
        var n = e.seat,
          a = new mjcore.MJMing();
        (a.type = e.type), (a.from = e.froms), (a.pais = []);
        for (var r = 0; r < e.tiles.length; r++)
          a.pais.push(mjcore.MJPai.Create(e.tiles[r]));
        Laya.timer.once(600, this, function() {
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)
          ].QiPaiNoPass(),
            t.DesktopMgr.Inst.players[
              t.DesktopMgr.Inst.seat2LocalPosition(n)
            ].AddMing(a),
            a.type == mjcore.E_Ming.gang_ming &&
              (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0);
        }),
          n != t.DesktopMgr.Inst.seat ||
            (a.type != mjcore.E_Ming.gang_an &&
              a.type != mjcore.E_Ming.gang_ming) ||
            (t.DesktopMgr.Inst.last_gang = Laya.timer.currTimer);
        var s = '',
          o = '';
        switch (a.type) {
          case mjcore.E_Ming.kezi:
            (s = 'emoji_4'), (o = 'emoji_3');
            break;
          case mjcore.E_Ming.shunzi:
            (s = 'emoji_2'), (o = 'emoji_1');
            break;
          case mjcore.E_Ming.gang_ming:
            (s = 'emoji_6'), (o = 'emoji_5');
        }
        uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
          t.DesktopMgr.Inst.index_player,
          s,
          2e3
        ),
          (t.DesktopMgr.Inst.index_player = n),
          uiscript.UI_DesktopInfo.Inst.changeHeadEmo(
            t.DesktopMgr.Inst.index_player,
            o,
            2e3
          ),
          t.DesktopMgr.Inst.RefreshPlayerIndicator(),
          e.liqi && t.ActionLiqi.record(e.liqi);
        var l = '';
        switch (a.type) {
          case mjcore.E_Ming.shunzi:
            l = 'act_chi';
            break;
          case mjcore.E_Ming.gang_ming:
          case mjcore.E_Ming.gang_an:
            l = 'act_kan';
            break;
          case mjcore.E_Ming.kezi:
            l = 'act_pon';
        }
        return (
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(n)
          ].PlaySound(l),
          t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
            e.operation &&
            t.ActionOperation.ob(e.operation, i, 500),
          1700
        );
      }),
      (i.fastrecord = function(e, i) {
        void 0 === i && (i = -1),
          app.Log.log('ActionChiPengGang fastrecord data:' + JSON.stringify(e));
        var n = e.seat,
          a = new mjcore.MJMing();
        (a.type = e.type), (a.from = e.froms), (a.pais = []);
        for (var r = 0; r < e.tiles.length; r++)
          a.pais.push(mjcore.MJPai.Create(e.tiles[r]));
        t.DesktopMgr.Inst.players[
          t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)
        ].QiPaiNoPass(),
          t.DesktopMgr.Inst.players[
            t.DesktopMgr.Inst.seat2LocalPosition(n)
          ].AddMing(a, !1),
          a.type == mjcore.E_Ming.gang_ming &&
            (t.DesktopMgr.Inst.waiting_lingshang_deal_tile = !0),
          (t.DesktopMgr.Inst.index_player = n),
          t.DesktopMgr.Inst.RefreshPlayerIndicator(),
          e.liqi && t.ActionLiqi.fastrecord(e.liqi),
          t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast &&
            i >= 0 &&
            e.operation &&
            t.ActionOperation.ob(e.operation, i, 500);
      }),
      i
    );
  })(t.ActionBase);
  t.ActionChiPengGang = e;
})(view || (view = {}));