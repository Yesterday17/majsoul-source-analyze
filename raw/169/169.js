var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.both_ui.itemdetailUI()) || this;
      return (
        (t.locking = false),
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
          (this.locking = false),
          (this.btn_open = this.root.getChildByName('btn_open')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            false
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
        undefined === i && (i = false), (this.item_id = e);
        var a = game.GameUtility.get_item_view(e);
        (this.name.text = a.name),
          (this.desc.text = a.desc),
          this.icon.setSkin(a.icon),
          (this.btn_open.visible = false),
          (this.enable = true),
          (this.locking = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = false;
            })
          );
        var r = cfg.item_definition.item.get(e);
        r &&
          1 == r.category &&
          ((1 != r.type && 2 != r.type) || (i && (this.btn_open.visible = true)));
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.enable = false);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_ItemDetail = e;
})(uiscript || (uiscript = {}));