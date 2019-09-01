let uiscript;
!(t => {
  const e = (() => {
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
    return (e.prototype.show = function(e) {
      (this.category = e),
        (this.me.visible = true),
        this.scrollview.reset(),
        (this.items = t.UI_Bag.find_items_by_category(e)),
        this.scrollview.addItem(this.items.length);
    }),
    (e.prototype.close = function() {
      (this.me.visible = false), (this.items = []), this.scrollview.reset();
    }),
    (e.prototype.render_item = function({index, container, cache_data}) {
      const i = index;
      const n = container;
      const a = cache_data;
      a.skin ||
        (a.skin = new t.UI_Item_Skin(
          n
            .getChildByName('btn_detail')
            .getChildByName('content')
            .getChildByName('icon')
        ));
      const r = this.items[i];
      const s = cfg.item_definition.item.get(r.item_id);
      const o = n.getChildByName('btn_detail');
      (o.clickHandler = Laya.Handler.create(
        this,
        () => {
          t.UI_ItemDetail.Inst.show(r.item_id, true);
        },
        null,
        false
      )),
        (o.getChildByName('count').visible = false),
        (o.getChildByName('btn_del').visible = false),
        a.skin.setSkin(s.icon);
      const l = o.getChildByName('content').getChildByName('num');
      r.count <= 1
        ? (l.visible = false)
        : ((l.visible = true), (l.text = r.count.toString()));
    }),
    (e.prototype.when_update_data = function() {
      this.scrollview.reset(),
        (this.items = t.UI_Bag.find_items_by_category(this.category)),
        this.scrollview.addItem(this.items.length);
    }),
    e
  ;
  })();
  t.UI_Bag_PageItem = e;
})(uiscript || (uiscript = {}));