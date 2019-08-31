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
      var t = e.call(this, new ui.both_ui.itemdetailUI()) || this;
      return (
        (t.locking = !1),
        (t.container_icon = null),
        (t.btn_open = null),
        (t.item_id = 0),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.name = this.root.getChildByName('label_name')),
          (this.desc = this.root.getChildByName('desc')),
          (this.icon = new t.UI_Item_Skin(
            this.root.getChildByName('item').getChildByName('icon')
          )),
          (this.container_icon = this.root.getChildByName('item')),
          (this.locking = !1),
          (this.btn_open = this.root.getChildByName('btn_open')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            !1
          )),
          (this.btn_open.clickHandler = new Laya.Handler(this, function() {
            if (!e.locking) {
              e.close();
              var i = cfg.item_definition.item.get(e.item_id);
              i &&
                1 == i.category &&
                (1 == i.type && t.UI_OpenBox.Inst.show(e.item_id),
                2 == i.type &&
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'openRandomRewardItem',
                    { item_id: e.item_id },
                    function(e, i) {
                      e || i.error
                        ? t.UIMgr.Inst.showNetReqError(
                            'openRandomRewardItem',
                            e,
                            i
                          )
                        : t.UI_GetReward2.Inst.show(i.results);
                    }
                  ));
            }
          }));
      }),
      (i.prototype.show = function(e, i) {
        var n = this;
        void 0 === i && (i = !1), (this.item_id = e);
        var a = game.GameUtility.get_item_view(e);
        (this.name.text = a.name),
          (this.desc.text = a.desc),
          this.icon.setSkin(a.icon),
          (this.btn_open.visible = !1),
          (this.enable = !0),
          (this.locking = !0),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = !1;
            })
          );
        var r = cfg.item_definition.item.get(e);
        r &&
          1 == r.category &&
          ((1 != r.type && 2 != r.type) || (i && (this.btn_open.visible = !0)));
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = !1), (e.enable = !1);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_ItemDetail = e;
})(uiscript || (uiscript = {}));