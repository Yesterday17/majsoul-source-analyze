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

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.entrance.choose_routeUI()) || this;
        t.btns = [];
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;

        this.root = this.me
          .getChildByName('servers')
          .getChildByName('container');

        this.me.visible = !1;
        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
            },
            null,
            !1
          );
        for (
          var i = i => {
            var a = n.root.getChildByName(`btn${i}`);
            n.btns.push(a);
            a.clickHandler = new Laya.Handler(n, () => {
              t.UI_Entrance.Inst.showServer(i);
              e.close();
            });
          },
            n = this,
            a = 0;
          a < 2;
          a++
        )
          i(a);
      }

      show() {
        this.enable = !0;
        t.UIBase.anim_pop_out(this.root, null);

        game.LobbyNetMgr.gateway_regions.mainland
          ? (this.btns[0].visible = !0)
          : (this.btns[0].visible = !1);

        game.LobbyNetMgr.gateway_regions.hk
          ? (this.btns[1].visible = !0)
          : (this.btns[1].visible = !1);
      }

      close() {
        var e = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.enable = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Entrance_Choose_Route = e;
})(uiscript || (uiscript = {}));