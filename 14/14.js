var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(t) {
        this.items = [];
        this.me = t;
        this.scrollview = t.scriptMap['capsui.CScrollView'];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          6,
          10
        );

        this.scrollview.reset();
      }

      show(e) {
        this.category = e;
        this.me.visible = !0;
        this.scrollview.reset();
        this.items = t.UI_Bag.find_items_by_category(e);
        this.scrollview.addItem(this.items.length);
      }

      close() {
        this.me.visible = !1;
        this.items = [];
        this.scrollview.reset();
      }

      render_item({index, container, cache_data}) {
        var i = index;
        var n = container;
        var a = cache_data;
        a.skin ||
          (a.skin = new t.UI_Item_Skin(
            n
              .getChildByName('btn_detail')
              .getChildByName('content')
              .getChildByName('icon')
          ));
        var r = this.items[i];
        var s = cfg.item_definition.item.get(r.item_id);
        var o = n.getChildByName('btn_detail');

        o.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_ItemDetail.Inst.show(r.item_id, !0);
          },
          null,
          !1
        );

        o.getChildByName('count').visible = !1;
        o.getChildByName('btn_del').visible = !1;
        a.skin.setSkin(s.icon);
        var l = o.getChildByName('content').getChildByName('num');
        l.visible = !0;
        r.count <= 1
          ? (l.visible = !1)
          : (l.text = r.count.toString());
      }

      when_update_data() {
        this.scrollview.reset();
        this.items = t.UI_Bag.find_items_by_category(this.category);
        this.scrollview.addItem(this.items.length);
      }
    }

    return e;
  })();
  t.UI_Bag_PageItem = e;
})(uiscript || (uiscript = {}));