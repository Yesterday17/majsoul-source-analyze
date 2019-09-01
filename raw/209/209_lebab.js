let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.shop_pack_detailUI()) || this;
      return (
        (t.locking = false),
        (t.goods_id = 0),
        (t.packs = []),
        (t.origin_total_price = 0),
        (t.discount_pack = 0),
        (t.now_total_price = 0),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.scrollview = this.root.scriptMap['capsui.CScrollView']),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_cell)
        ),
        (this.container_total_price = this.root.getChildByName(
          'container_total_price'
        )),
        (this.container_discount = this.root.getChildByName(
          'container_discount'
        )),
        (this.container_final_price = this.root.getChildByName(
          'container_final_price'
        )),
        (this.btn_buy = this.root.getChildByName('btn_buy')),
        (this.btn_buy.clickHandler = new Laya.Handler(this, this.onBuy)),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          t.locking || t.close();
        }));
    }),
    (i.prototype.onBuy = function() {
      if (!this.locking) {
        this.close();
        for (var e = [], i = 0; i < this.packs.length; i++)
          this.packs[i].owned ||
            e.push({
              id: this.packs[i].goods_id,
              count: 1,
              dealPrice: this.packs[i].now_price
            });
        const n = this.when_buy_event;
        const a = this.goods_id;
        n.runWith({ event: 'begin', goods_id: a }),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'buyFromShop',
            {
              goods_id: this.goods_id,
              count: 1,
              bill_short_cut: e,
              deal_price: this.now_total_price
            },
            (e, i) => {
              e || i.error
                ? t.UIMgr.Inst.showNetReqError('buyFromShop', e, i)
                : (view.AudioMgr.PlayAudio(106),
                  t.UI_LightTips.Inst.show(
                    game.Tools.strOfLocalization(2191)
                  ),
                  n.runWith({ event: 'success', goods_id: a }));
            }
          );
      }
    }),
    (i.prototype.show = function(e, i) {
      const n = this;
      (this.goods_id = e), (this.when_buy_event = i);
      const a = cfg.shops.goods.get(this.goods_id);
      if (a && 100 == a.category_goods) {
        const r = cfg.shops.goods_package.getGroup(a.item_id);
        if (r && 0 != r.length) {
          (this.packs = []), (this.origin_total_price = 0);
          for (let s = 0; s < r.length; s++) {
            const o = r[s].good_id;
            const l = r[s].good_count;
            const h = cfg.shops.goods.get(o);
            const c = h.price;
            const u = t.UI_Shop.goods_discount_value(o);
            const _ = Math.floor(c * u);
            let d = false;
            1 == h.category_goods && (d = t.UI_Sushe.skin_owned(h.item_id)),
              this.packs.push({
                goods_id: o,
                count: l,
                origin_price: c,
                discount: u,
                now_price: _,
                owned: d
              }),
              d || (this.origin_total_price += _);
          }
          (this.discount_pack = t.UI_Shop.goods_discount_value(
            this.goods_id
          )),
            (this.now_total_price = Math.floor(
              this.origin_total_price * this.discount_pack
            )),
            (this.container_total_price.getChildByName(
              'value'
            ).text = this.origin_total_price.toString()),
            (this.container_discount.getChildByName('value').text =
              `-${100 - Math.ceil(100 * this.discount_pack)}%`),
            (this.container_final_price.getChildByName(
              'value'
            ).text = this.now_total_price.toString()),
            this.scrollview.reset(),
            this.scrollview.addItem(this.packs.length),
            (this.enable = true),
            (this.locking = true),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, () => {
                n.locking = false;
              })
            );
        }
      }
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    (i.prototype.onDisable = () => {}),
    (i.prototype.refresh_price = (t, e, i) => {
      const n = t.getChildByName('container_origin_price');
      const a = t.getChildByName('container_discount');
      if (((n.visible = false), (a.visible = false), i >= 1))
        (n.visible = true), (n.getChildByName('now_price').text = e.toString());
      else {
        (a.visible = true),
          (a.getChildByName('discount').text =
            `-${100 - Math.ceil(100 * i)}%`);
        const r = a.getChildByName('now_price');
        const s = a.getChildByName('origin_price');
        const o = a.getChildByName('del');
        (s.text = e.toString()),
          (r.text = Math.floor(e * i).toString()),
          (o.width = s.textField.textWidth + 6);
      }
    }),
    (i.prototype.render_cell = function({index, container}) {
      const e = index;
      const i = container;
      const n = this.packs[e];
      const a = cfg.shops.goods.get(n.goods_id);
      if (1 == a.category_goods) {
        i.getChildByName('head').getChildByName('flag_skin').visible = true;
        const r = cfg.item_definition.skin.get(a.item_id);
        game.LoadMgr.setImgSkin(
          i.getChildByName('head').getChildByName('icon'),
          `${r.path}/bighead.png`
        );
      } else
        (i.getChildByName('head').getChildByName('flag_skin').visible = false),
          game.LoadMgr.setImgSkin(
            i.getChildByName('head').getChildByName('icon'),
            a.icon
          );
      (i.getChildByName('name').text = a[`name_${GameMgr.client_language}`]),
        (i.getChildByName('desc').text =
          a[`desc_${GameMgr.client_language}`]),
        n.owned
          ? ((i.getChildByName('container_buy').visible = false),
            (i.getChildByName('owned').visible = true))
          : ((i.getChildByName('container_buy').visible = true),
            (i.getChildByName('owned').visible = false),
            this.refresh_price(
              i.getChildByName('container_buy'),
              n.origin_price,
              n.discount
            ));
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Shop_Pack_Detail = e;
})(uiscript || (uiscript = {}));