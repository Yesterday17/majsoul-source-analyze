let uiscript;
!(uiscript => {
  class UI_Shop_Skin {
    constructor(t) {
      (this.good_ids = []);
      (this.used_skin = {});
      (this.seen_skin_map = null);
      (this.me = t);
      (this.me.visible = !1);
      (this.scrollview = this.me.scriptMap['capsui.CScrollView_Heng']);
      this.scrollview.init_scrollview(
        new Laya.Handler(this, this.render_item)
      );
      (this.no_info = this.me.getChildByName('no_info'));
    }

    have_red_point() {
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
      let r = !1;
      return cfg.shops.goods.forEach(({ category, id }) => {
        r ||
          (5 == category &&
            uiscript.UI_Shop.goods_on_sell(id) &&
            (e.seen_skin_map[id] || (r = !0)));
      }),
        r
        ;
    }

    refresh_price(t, e, i, n) {
      const a = t.getChildByName('container_origin_price');
      const r = t.getChildByName('container_discount');
      if (((a.visible = !1), (r.visible = !1), i >= 1))
        (a.visible = !0), (a.getChildByName('now_price').text = e.toString());
      else {
        (r.visible = !0),
          (r.getChildByName('discount').text =
            `-${100 - Math.ceil(100 * i)}%`);
        const s = r.getChildByName('now_price');
        const o = r.getChildByName('origin_price');
        const l = r.getChildByName('del');
        (o.text = e.toString()),
          (s.text = n.toString()),
          (l.width = o.textField.textWidth + 6);
      }
    }

    render_item({ index, container }) {
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
      let h = !1;
      if (s.sell_end_time && '' != s.sell_end_time) {
        l.visible = !0;
        let c = game.Tools.ParseTime(s.sell_end_time) - Date.now();
        c <= 0
          ? ((l.text = game.Tools.strOfLocalization(2818)), (h = !1))
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
            (h = !0));
      } else (l.visible = !1), (h = !0);
      const u = a.getChildByName('container_buy');
      const _ = a.getChildByName('owned');
      (u.visible = !1), (_.visible = !1);
      let d = !1;
      let f = 0;
      let p = 0;
      const m = uiscript.UI_Shop.goods_discount_value(r);
      const g = [];
      if (100 == s.category_goods)
        if (uiscript.UI_Shop.buyed_count(r, !1) > 0) d = !0;
        else {
          d = !1;
          for (
            let y = s.item_id, v = cfg.shops.goods_package.getGroup(y), b = 0;
            b < v.length;
            b++
          ) {
            const w = v[b].good_id;
            const x = v[b].good_count;
            const I = cfg.shops.goods.get(w);
            if (1 == I.category_goods) {
              if (!uiscript.UI_Sushe.skin_owned(I.item_id)) {
                C = uiscript.UI_Shop.goods_discount_value(w);
                (f += Math.floor(I.price * x * C)),
                  (p += Math.floor(I.price * x)),
                  g.push({
                    id: w,
                    count: x,
                    dealPrice: Math.floor(I.price * x * C)
                  });
              }
            } else {
              var C = uiscript.UI_Shop.goods_discount_value(w);
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
      else (d = uiscript.UI_Sushe.skin_owned(s.item_id)), (f = s.price);
      if (d) _.visible = !0;
      else {
        u.visible = !0;
        const S = Math.floor(f * m);
        100 == s.category_goods
          ? this.refresh_price(u, p, Math.ceil((S / p) * 100) / 100, S)
          : this.refresh_price(u, f, m, S);
        const T = u.getChildByName('btn_buy');
        (T.clickHandler = Laya.Handler.create(
          this,
          () => {
            uiscript.UI_SecondConfirm.Inst.show(
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
                      if ((game.Tools.setGrayDisable(T, !1), e || n.error))
                        uiscript.UIMgr.Inst.showNetReqError('buyFromShop', e, n);
                      else {
                        if (
                          (view.AudioMgr.PlayAudio(106),
                            uiscript.UI_LightTips.Inst.show(
                              game.Tools.strOfLocalization(2191)
                            ),
                            100 == s.category_goods)
                        ) {
                          uiscript.UI_Shop.update_buyed_count(r, !1, 1);
                          for (
                            let a = s.item_id, o = cfg.shops.goods_package.getGroup(a), l = 0;
                            l < o.length;
                            l++
                          ) {
                            const h = cfg.shops.goods.get(o[l].good_id);
                            1 == h.category_goods &&
                              uiscript.UI_Sushe.add_skin(h.item_id);
                          }
                        } else uiscript.UI_Sushe.add_skin(s.item_id);
                        i.scrollview.wantToRefreshAll();
                      }
                    }
                  );
              })
            );
          },
          null,
          !1
        )),
          (T.visible = h);
      }
      a.getChildByName('btn_detail').clickHandler = Laya.Handler.create(
        this,
        () => {
          uiscript.UI_Shop.Inst.locking ||
            (100 == s.category_goods
              ? d ||
              uiscript.UI_Shop_Pack_Detail.Inst.show(
                r,
                Laya.Handler.create(i, i.onPackBuyed, null, !1)
              )
              : uiscript.UI_Shop.Inst.close(
                Laya.Handler.create(i, () => {
                  uiscript.UI_Shop_Skin_Yulan.Inst.show(r);
                })
              ));
        },
        null,
        !1
      );
    }

    show() {
      const e = this;
      (this.me.visible = !0),
        (this.used_skin = {}),
        (this.good_ids = []),
        cfg.shops.goods.forEach(({ category, id, sort }) => {
          5 == category &&
            uiscript.UI_Shop.goods_on_sell(id) &&
            e.good_ids.push({ id: id, sort: sort });
        }),
        (this.good_ids = this.good_ids.sort(({ sort }, { sort }) => sort - sort)),
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
    }

    close() {
      this.me.visible = !1;
      for (const t in this.used_skin)
        Laya.loader.clearTextureRes(game.LoadMgr.getResImageSkin(t));
      this.used_skin = {};
    }

    onPackBuyed({ event, goods_id }) {
      if (this.me.visible && 'success' == event) {
        uiscript.UI_Shop.update_buyed_count(goods_id, !1, 1);
        for (
          let i = cfg.shops.goods.get(goods_id).item_id, n = cfg.shops.goods_package.getGroup(i), a = 0;
          a < n.length;
          a++
        ) {
          const r = cfg.shops.goods.get(n[a].good_id);
          1 == r.category_goods && uiscript.UI_Sushe.add_skin(r.item_id);
        }
        this.scrollview.wantToRefreshAll();
      }
    }
  }
  uiscript.UI_Shop_Skin = UI_Shop_Skin;
})(uiscript || (uiscript = {}));