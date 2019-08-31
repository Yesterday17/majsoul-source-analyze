var uiscript;
!(function(t) {
  var e = (function() {
    function e(t) {
      (this.items = []),
        (this.me = t),
        (this.scrollview = t.scriptMap['capsui.CScrollView']),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          6,
          10
        ),
        this.scrollview.reset();
    }
    return (
      (e.prototype.show = function(e) {
        (this.category = e),
          (this.me.visible = !0),
          this.scrollview.reset(),
          (this.items = t.UI_Bag.find_items_by_category(e)),
          this.scrollview.addItem(this.items.length);
      }),
      (e.prototype.close = function() {
        (this.me.visible = !1), (this.items = []), this.scrollview.reset();
      }),
      (e.prototype.render_item = function(e) {
        var i = e.index,
          n = e.container,
          a = e.cache_data;
        a.skin ||
          (a.skin = new t.UI_Item_Skin(
            n
              .getChildByName('btn_detail')
              .getChildByName('content')
              .getChildByName('icon')
          ));
        var r = this.items[i],
          s = cfg.item_definition.item.get(r.item_id),
          o = n.getChildByName('btn_detail');
        (o.clickHandler = Laya.Handler.create(
          this,
          function() {
            t.UI_ItemDetail.Inst.show(r.item_id, !0);
          },
          null,
          !1
        )),
          (o.getChildByName('count').visible = !1),
          (o.getChildByName('btn_del').visible = !1),
          a.skin.setSkin(s.icon);
        var l = o.getChildByName('content').getChildByName('num');
        r.count <= 1
          ? (l.visible = !1)
          : ((l.visible = !0), (l.text = r.count.toString()));
      }),
      (e.prototype.when_update_data = function() {
        this.scrollview.reset(),
          (this.items = t.UI_Bag.find_items_by_category(this.category)),
          this.scrollview.addItem(this.items.length);
      }),
      e
    );
  })();
  t.UI_Bag_PageItem = e;
})(uiscript || (uiscript = {}));