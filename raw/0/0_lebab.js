let uiscript;
!(t => {
  const e = (() => {
    function e(t) {
      (this.good_ids = []),
        (this.used_skin = {}),
        (this.seen_skin_map = null),
        (this.me = t),
        (this.me.visible = false),
        (this.scrollview = this.me.scriptMap['capsui.CScrollView_Heng']),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item)
        ),
        (this.no_info = this.me.getChildByName('no_info'));
    }
    return (e.prototype.have_red_point = function() {
      const e = this;
      if (!this.seen_skin_map) {
        let i = Laya.LocalStorage.getItem(
          game.Tools.eeesss(`shop_skin_list_${GameMgr.Inst.account_id}`)
        );
        if (((this.seen_skin_map = {}), i))
          for (
            let n = (i = game.Tools.dddsss(i)).split(','), a = 0;
            a < n.length;
            a++
          )
            this.seen_skin_map[n[a]] = 1;
      }
      let r = false;
      return cfg.shops.goods.forEach(({category, id}) => {
        r ||
          (5 == category &&
            t.UI_Shop.goods_on_sell(id) &&
            (e.seen_skin_map[id] || (r = true)));
      }),
      r
    ;
    }),
    (e.prototype.refresh_price = (t, e, i, n) => {
      const a = t.getChildByName('container_origin_price');
      const r = t.getChildByName('container_discount');
      if (((a.visible = false), (r.visible = false), i >= 1))
        (a.visible = true), (a.getChildByName('now_price').text = e.toString());
      else {
        (r.visible = true),
          (r.getChildByName('discount').text =
            `-${100 - Math.ceil(100 * i)}%`);
        const s = r.getChildByName('now_price');
        const o = r.getChildByName('origin_price');
        const l = r.getChildByName('del');
        (o.text = e.toString()),
          (s.text = n.toString()),
          (l.width = o.textField.textWidth + 6);
      }
    }),
    (e.prototype.render_item = function({index, container}) {
      const i = this;
      const n = index;
      const a = container;
      const r = this.good_ids[n].id;
      const s = cfg.shops.goods.get(r);
      const o = a.getChildByName('icon');
      game.LoadMgr.setImgSkin(o, s.icon),
        (this.used_skin[s.icon] = 1),
        (a.getChildByName('name').text =
          s[`name_${GameMgr.client_language}`]),
        (a.getChildByName('desc').text =
          s[`desc_${GameMgr.client_language}`]);
      const l = a.getChildByName('sell_day');
      let h = false;
      if (s.sell_end_time && '' != s.sell_end_time) {
        l.visible = true;
        let c = game.Tools.ParseTime(s.sell_end_time) - Date.now();
        c <= 0
          ? ((l.text = game.Tools.strOfLocalization(2818)), (h = false))
          : ((c /= 1e3) <= 60
              ? (l.text = game.Tools.strOfLocalization(2819, ['1']))
              : (c /= 60) < 60
              ? (l.text = game.Tools.strOfLocalization(2819, [
                  Math.ceil(c).toString()
                ]))
              : ((c /= 60),
                (l.text =
                  c < 24
                    ? game.Tools.strOfLocalization(2820, [
                        Math.ceil(c).toString()
                      ])
                    : game.Tools.strOfLocalization(2821, [
                        Math.ceil(c / 24).toString()
                      ]))),
            (h = true));
      } else (l.visible = false), (h = true);
      const u = a.getChildByName('container_buy');
      const _ = a.getChildByName('owned');
      (u.visible = false), (_.visible = false);
      let d = false;
      let f = 0;
      let p = 0;
      const m = t.UI_Shop.goods_discount_value(r);
      const g = [];
      if (100 == s.category_goods)
        if (t.UI_Shop.buyed_count(r, false) > 0) d = true;
        else {
          d = false;
          for (
            let y = s.item_id, v = cfg.shops.goods_package.getGroup(y), b = 0;
            b < v.length;
            b++
          ) {
            const w = v[b].good_id;
            const x = v[b].good_count;
            const I = cfg.shops.goods.get(w);
            if (1 == I.category_goods) {
              if (!t.UI_Sushe.skin_owned(I.item_id)) {
                C = t.UI_Shop.goods_discount_value(w);
                (f += Math.floor(I.price * x * C)),
                  (p += Math.floor(I.price * x)),
                  g.push({
                    id: w,
                    count: x,
                    dealPrice: Math.floor(I.price * x * C)
                  });
              }
            } else {
              var C = t.UI_Shop.goods_discount_value(w);
              (f += Math.floor(I.price * x * C)),
                (p += Math.floor(I.price * x)),
                g.push({
                  id: w,
                  count: x,
                  dealPrice: Math.floor(I.price * x * C)
                });
            }
          }
        }
      else (d = t.UI_Sushe.skin_owned(s.item_id)), (f = s.price);
      if (d) _.visible = true;
      else {
        u.visible = true;
        const S = Math.floor(f * m);
        100 == s.category_goods
          ? this.refresh_price(u, p, Math.ceil((S / p) * 100) / 100, S)
          : this.refresh_price(u, f, m, S);
        const T = u.getChildByName('btn_buy');
        (T.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_SecondConfirm.Inst.show(
              game.Tools.strOfLocalization(2822, [
                s[`desc_${GameMgr.client_language}`]
              ]),
              Laya.Handler.create(i, () => {
                const e = {};
                (e.goods_id = r),
                  (e.count = 1),
                  (e.deal_price = Math.floor(f * m)),
                  100 == s.category_goods && (e.bill_short_cut = g),
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'buyFromShop',
                    e,
                    (e, n) => {
                      if ((game.Tools.setGrayDisable(T, false), e || n.error))
                        t.UIMgr.Inst.showNetReqError('buyFromShop', e, n);
                      else {
                        if (
                          (view.AudioMgr.PlayAudio(106),
                          t.UI_LightTips.Inst.show(
                            game.Tools.strOfLocalization(2191)
                          ),
                          100 == s.category_goods)
                        ) {
                          t.UI_Shop.update_buyed_count(r, false, 1);
                          for (
                            let a = s.item_id, o = cfg.shops.goods_package.getGroup(a), l = 0;
                            l < o.length;
                            l++
                          ) {
                            const h = cfg.shops.goods.get(o[l].good_id);
                            1 == h.category_goods &&
                              t.UI_Sushe.add_skin(h.item_id);
                          }
                        } else t.UI_Sushe.add_skin(s.item_id);
                        i.scrollview.wantToRefreshAll();
                      }
                    }
                  );
              })
            );
          },
          null,
          false
        )),
          (T.visible = h);
      }
      a.getChildByName('btn_detail').clickHandler = Laya.Handler.create(
        this,
        () => {
          t.UI_Shop.Inst.locking ||
            (100 == s.category_goods
              ? d ||
                t.UI_Shop_Pack_Detail.Inst.show(
                  r,
                  Laya.Handler.create(i, i.onPackBuyed, null, false)
                )
              : t.UI_Shop.Inst.close(
                  Laya.Handler.create(i, () => {
                    t.UI_Shop_Skin_Yulan.Inst.show(r);
                  })
                ));
        },
        null,
        false
      );
    }),
    (e.prototype.show = function() {
      const e = this;
      (this.me.visible = true),
        (this.used_skin = {}),
        (this.good_ids = []),
        cfg.shops.goods.forEach(({category, id, sort}) => {
          5 == category &&
            t.UI_Shop.goods_on_sell(id) &&
            e.good_ids.push({ id: id, sort: sort });
        }),
        (this.good_ids = this.good_ids.sort(({sort}, {sort}) => sort - sort)),
        this.scrollview.reset(),
        this.scrollview.addItem(this.good_ids.length),
        (this.no_info.visible = 0 == this.good_ids.length);
      for (let i = 0; i < this.good_ids.length; i++)
        this.seen_skin_map[this.good_ids[i].id.toString()] = 1;
      let n = '';
      for (const a in this.seen_skin_map) '' != n && (n += ','), (n += a);
      Laya.LocalStorage.setItem(
        game.Tools.eeesss(`shop_skin_list_${GameMgr.Inst.account_id}`),
        game.Tools.eeesss(n)
      );
    }),
    (e.prototype.close = function() {
      this.me.visible = false;
      for (const t in this.used_skin)
        Laya.loader.clearTextureRes(game.LoadMgr.getResImageSkin(t));
      this.used_skin = {};
    }),
    (e.prototype.onPackBuyed = function({event, goods_id}) {
      if (this.me.visible && 'success' == event) {
        t.UI_Shop.update_buyed_count(goods_id, false, 1);
        for (
          let i = cfg.shops.goods.get(goods_id).item_id, n = cfg.shops.goods_package.getGroup(i), a = 0;
          a < n.length;
          a++
        ) {
          const r = cfg.shops.goods.get(n[a].good_id);
          1 == r.category_goods && t.UI_Sushe.add_skin(r.item_id);
        }
        this.scrollview.wantToRefreshAll();
      }
    }),
    e
  ;
  })();
  t.UI_Shop_Skin = e;
})(uiscript || (uiscript = {}));