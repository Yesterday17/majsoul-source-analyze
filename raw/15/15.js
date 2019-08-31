var uiscript;
!(function(t) {
  var e = (function() {
    function e(e) {
      (this.stardust_icon = null),
        (this.stardust_count = 0),
        (this.stardust_detail = 0),
        (this.items = []),
        (this.choose_count = {}),
        (this.during_sell = !1),
        (this.me = e),
        (this.scrollview = e.scriptMap['capsui.CScrollView']),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          6,
          10
        ),
        this.scrollview.reset(),
        (this.stardust_icon = new t.UI_Item_Skin(
          this.me.getChildByName('stardust')
        )),
        (this.label_stardust_count = this.me
          .getChildByName('stardust')
          .getChildByName('count')),
        (this.label_stardust_delta = this.me
          .getChildByName('stardust')
          .getChildByName('delta')),
        (this.btn_sell = this.me.getChildByName('btn_sell')),
        (this.btn_sell.clickHandler = new Laya.Handler(this, this.open_sell)),
        (this.label_huanqu = this.me.getChildByName('label_huanqu')),
        (this.container_sell = this.me.getChildByName('container_sell')),
        (this.container_sell.getChildByName(
          'btn_clear'
        ).clickHandler = new Laya.Handler(this, this.clear_choose)),
        (this.container_sell.getChildByName(
          'btn_back'
        ).clickHandler = new Laya.Handler(this, this.close_sell)),
        (this.container_sell.getChildByName(
          'btn_sell'
        ).clickHandler = new Laya.Handler(this, this.on_btn_sell)),
        (this.btn_sell2 = this.container_sell.getChildByName('btn_sell')),
        (this.btn_clear_choose = this.container_sell.getChildByName(
          'btn_clear'
        ));
    }
    return (
      (e.prototype.show = function() {
        (this.me.visible = !0),
          (this.during_sell = !1),
          (this.btn_sell.visible = !0),
          (this.label_huanqu.visible = !0),
          (this.container_sell.visible = !1),
          (this.label_stardust_delta.visible = !1),
          (this.choose_count = {}),
          this.stardust_icon.setSkin(
            cfg.item_definition.item.get(302004).icon_transparent
          ),
          (this.stardust_count = t.UI_Bag.get_item_count(game.stardust_id)),
          (this.stardust_detail = 0),
          this.refresh_stardust(),
          this.scrollview.reset(),
          (this.items = t.UI_Bag.find_items_by_category(t.EItemCategory.gift)),
          this.scrollview.addItem(this.items.length),
          0 == this.items.length && (this.btn_sell.visible = !1);
      }),
      (e.prototype.close = function() {
        (this.me.visible = !1), (this.items = []), this.scrollview.reset();
      }),
      (e.prototype.render_item = function(e) {
        var i = this,
          n = e.index,
          a = e.container,
          r = e.cache_data,
          s = this.items[n],
          o = cfg.item_definition.item.get(s.item_id),
          l = a.getChildByName('btn_detail'),
          h = l.getChildByName('content').getChildByName('num'),
          c = function() {
            var t = s.count;
            if (i.during_sell)
              if (o.can_sell) {
                var e = i.choose_count[s.item_id];
                null == e || 0 == e
                  ? ((a.getChildByName('count').visible = !1),
                    (a.getChildByName('btn_del').visible = !1))
                  : ((a.getChildByName('count').visible = !0),
                    (a
                      .getChildByName('count')
                      .getChildAt(0).text = e.toString()),
                    (a.getChildByName('btn_del').visible = !0),
                    (t -= e)),
                  (a
                    .getChildByName('btn_detail')
                    .getChildByName('content')
                    .getChildByName('ban').visible = !1);
              } else
                (a.getChildByName('count').visible = !1),
                  (a.getChildByName('btn_del').visible = !1),
                  (a
                    .getChildByName('btn_detail')
                    .getChildByName('content')
                    .getChildByName('ban').visible = !0);
            else
              (a.getChildByName('count').visible = !1),
                (a.getChildByName('btn_del').visible = !1),
                (a
                  .getChildByName('btn_detail')
                  .getChildByName('content')
                  .getChildByName('ban').visible = !1);
            t <= 1
              ? (h.visible = !1)
              : ((h.visible = !0), (h.text = t.toString()));
          };
        c(),
          (l.clickHandler = Laya.Handler.create(
            this,
            function() {
              if (i.during_sell) {
                if (!o.can_sell) return;
                var e = 0;
                i.choose_count.hasOwnProperty(s.item_id.toString())
                  ? ((e = i.choose_count[s.item_id]),
                    i.choose_count[s.item_id]++)
                  : ((e = 0), (i.choose_count[s.item_id] = 1)),
                  i.choose_count[s.item_id] > s.count &&
                    (i.choose_count[s.item_id] = s.count),
                  (i.stardust_detail +=
                    (i.choose_count[s.item_id] - e) * o.sell_reward_count),
                  i.refresh_stardust(),
                  c();
              } else t.UI_ItemDetail.Inst.show(s.item_id);
            },
            null,
            !1
          )),
          (a.getChildByName('btn_del').clickHandler = Laya.Handler.create(
            this,
            function() {
              i.during_sell &&
                i.choose_count[s.item_id] &&
                (i.choose_count[s.item_id]--,
                c(),
                (i.stardust_detail -= o.sell_reward_count),
                i.refresh_stardust());
            },
            null,
            !1
          )),
          r.skin ||
            (r.skin = new t.UI_Item_Skin(
              l.getChildByName('content').getChildByName('icon')
            )),
          r.skin.setSkin(o.icon);
        var u = l.getChildByName('content');
        this.during_sell
          ? (u.scaleX = u.scaleY = 0.9)
          : (u.scaleX = u.scaleY = 1.1);
      }),
      (e.prototype.open_sell = function() {
        (this.during_sell = !0),
          (this.btn_sell.visible = !1),
          (this.label_huanqu.visible = !1),
          (this.container_sell.visible = !0),
          (this.label_stardust_delta.visible = !0),
          (this.label_stardust_delta.text = ''),
          (this.choose_count = {}),
          (this.stardust_detail = 0),
          this.refresh_stardust(),
          this.scrollview.wantToRefreshAll();
      }),
      (e.prototype.close_sell = function() {
        (this.during_sell = !1),
          (this.btn_sell.visible = !0),
          (this.label_huanqu.visible = !0),
          (this.container_sell.visible = !1),
          (this.label_stardust_delta.visible = !1),
          this.clear_choose(),
          this.scrollview.wantToRefreshAll();
      }),
      (e.prototype.on_btn_sell = function() {
        var e = [];
        for (var i in this.choose_count)
          this.choose_count[i] > 0 &&
            e.push({ item_id: parseInt(i), count: this.choose_count[i] });
        t.UI_SecondConfirm.Inst.show(
          game.Tools.strOfLocalization(2036),
          Laya.Handler.create(this, function() {
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'sellItem',
              { sells: e },
              function(e, i) {
                e || i.error
                  ? t.UIMgr.Inst.showNetReqError('sellItem', e, i)
                  : t.UI_LightTips.Inst.show(
                      game.Tools.strOfLocalization(2037)
                    );
              }
            );
          }),
          Laya.Handler.create(this, function() {})
        );
      }),
      (e.prototype.clear_choose = function() {
        for (var t in this.choose_count) {
          this.choose_count[t] = 0;
          for (var e = 0; e < this.items.length; e++)
            this.items[e].item_id.toString() == t &&
              this.scrollview.wantToRefreshItem(e);
        }
        (this.stardust_detail = 0), this.refresh_stardust();
      }),
      (e.prototype.refresh_stardust = function() {
        (this.label_stardust_count.text = 'x' + this.stardust_count),
          this.stardust_detail > 0
            ? ((this.label_stardust_delta.text =
                '+' + this.stardust_detail.toString()),
              (this.label_stardust_delta.x =
                this.label_stardust_count.textField.textWidth + 55),
              (this.label_stardust_delta.visible = !0),
              (this.btn_sell2.visible = !0),
              (this.btn_clear_choose.visible = !0))
            : ((this.label_stardust_delta.visible = !1),
              (this.btn_sell2.visible = !1),
              (this.btn_clear_choose.visible = !1));
      }),
      (e.prototype.when_update_data = function() {
        this.close_sell(),
          this.scrollview.reset(),
          (this.items = t.UI_Bag.find_items_by_category(t.EItemCategory.gift)),
          this.scrollview.addItem(this.items.length),
          0 == this.items.length && (this.btn_sell.visible = !1),
          (this.stardust_count = t.UI_Bag.get_item_count(game.stardust_id)),
          this.refresh_stardust();
      }),
      e
    );
  })();
  t.UI_Bag_PageGift = e;
})(uiscript || (uiscript = {}));