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
  uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.entrance.choose_routeUI()) || this;
      return (t.btns = []), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me
          .getChildByName('servers')
          .getChildByName('container')),
          (this.me.visible = !1),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            !1
          ));
        for (
          var i = function(i) {
              var a = n.root.getChildByName('btn' + i);
              n.btns.push(a),
                (a.clickHandler = new Laya.Handler(n, function() {
                  t.UI_Entrance.Inst.showServer(i), e.close();
                }));
            },
            n = this,
            a = 0;
          a < 2;
          a++
        )
          i(a);
      }),
      (i.prototype.show = function() {
        (this.enable = !0),
          t.UIBase.anim_pop_out(this.root, null),
          game.LobbyNetMgr.gateway_regions.mainland
            ? (this.btns[0].visible = !0)
            : (this.btns[0].visible = !1),
          game.LobbyNetMgr.gateway_regions.hk
            ? (this.btns[1].visible = !0)
            : (this.btns[1].visible = !1);
      }),
      (i.prototype.close = function() {
        var e = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, function() {
            e.enable = !1;
          })
        );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Entrance_Choose_Route = e;
})(uiscript || (uiscript = {}));