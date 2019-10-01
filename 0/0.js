var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(t) {
        this.good_ids = [];
        this.used_skin = {};
        this.seen_skin_map = null;
        this.me = t;
        this.me.visible = !1;
        this.scrollview = this.me.scriptMap['capsui.CScrollView_Heng'];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item)
        );

        this.no_info = this.me.getChildByName('no_info');
      }

      have_red_point() {
        var e = this;
        if (!this.seen_skin_map) {
          var i = Laya.LocalStorage.getItem(
            game.Tools.eeesss(`shop_skin_list_${GameMgr.Inst.account_id}`)
          );
          this.seen_skin_map = {};
          if ((i))
            for (
              var n = (i = game.Tools.dddsss(i)).split(','), a = 0;
              a < n.length;
              a++
            )
              this.seen_skin_map[n[a]] = 1;
        }
        var r = !1;

        cfg.shops.goods.forEach(({category, id}) => {
          r ||
            (5 == category &&
              t.UI_Shop.goods_on_sell(id) &&
              (e.seen_skin_map[id] || (r = !0)));
        });

        return r;
      }

      refresh_price(t, e, i, n) {
        var a = t.getChildByName('container_origin_price');
        var r = t.getChildByName('container_discount');
        a.visible = !1;
        r.visible = !1;
        a.visible = !0;
        if ((i >= 1))
          a.getChildByName('now_price').text = e.toString();
        else {
          r.visible = !0;
          r.getChildByName('discount').text =
              `-${100 - Math.ceil(100 * i)}%`;
          var s = r.getChildByName('now_price');
          var o = r.getChildByName('origin_price');
          var l = r.getChildByName('del');
          o.text = e.toString();
          s.text = n.toString();
          l.width = o.textField.textWidth + 6;
        }
      }

      render_item({index, container}) {
        var i = this;
        var n = index;
        var a = container;
        var r = this.good_ids[n].id;
        var s = cfg.shops.goods.get(r);
        var o = a.getChildByName('icon');
        game.LoadMgr.setImgSkin(o, s.icon);
        this.used_skin[s.icon] = 1;

        a.getChildByName('name').text =
            s[`name_${GameMgr.client_language}`];

        a.getChildByName('desc').text =
            s[`desc_${GameMgr.client_language}`];
        var l = a.getChildByName('sell_day');
        var h = !1;
        l.visible = !1;
        if (s.sell_end_time && '' != s.sell_end_time) {
          l.visible = !0;
          var c = game.Tools.ParseTime(s.sell_end_time) - Date.now();
          l.text = game.Tools.strOfLocalization(2818);
          c /= 60;

          (c /= 1e3) <= 60
                ? (l.text = game.Tools.strOfLocalization(2819, ['1']))
                : (c /= 60) < 60
                ? (l.text = game.Tools.strOfLocalization(2819, [
                    Math.ceil(c).toString()
                  ]))
                : (l.text =
                    c < 24
                      ? game.Tools.strOfLocalization(2820, [
                          Math.ceil(c).toString()
                        ])
                      : game.Tools.strOfLocalization(2821, [
                          Math.ceil(c / 24).toString()
                        ]));

          c <= 0
            ? (h = !1)
            : (h = !0);
        } else h = !0;
        var u = a.getChildByName('container_buy');
        var _ = a.getChildByName('owned');
        u.visible = !1;
        _.visible = !1;
        var d = !1;
        var f = 0;
        var p = 0;
        var m = t.UI_Shop.goods_discount_value(r);
        var g = [];
        d = t.UI_Sushe.skin_owned(s.item_id);
        if (100 == s.category_goods)
          if (t.UI_Shop.buyed_count(r, !1) > 0) d = !0;
          else {
            d = !1;
            for (
              var y = s.item_id, v = cfg.shops.goods_package.getGroup(y), b = 0;
              b < v.length;
              b++
            ) {
              var w = v[b].good_id;
              var x = v[b].good_count;
              var I = cfg.shops.goods.get(w);
              if (1 == I.category_goods) {
                if (!t.UI_Sushe.skin_owned(I.item_id)) {
                  C = t.UI_Shop.goods_discount_value(w);
                  f += Math.floor(I.price * x * C);
                  p += Math.floor(I.price * x);
                  g.push({
                    id: w,
                    count: x,
                    dealPrice: Math.floor(I.price * x * C)
                  });
                }
              } else {
                var C = t.UI_Shop.goods_discount_value(w);
                f += Math.floor(I.price * x * C);
                p += Math.floor(I.price * x);
                g.push({
                  id: w,
                  count: x,
                  dealPrice: Math.floor(I.price * x * C)
                });
              }
            }
          }
        else f = s.price;
        if (d) _.visible = !0;
        else {
          u.visible = !0;
          var S = Math.floor(f * m);
          100 == s.category_goods
            ? this.refresh_price(u, p, Math.ceil((S / p) * 100) / 100, S)
            : this.refresh_price(u, f, m, S);
          var M = u.getChildByName('btn_buy');

          M.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_SecondConfirm.Inst.show(
                game.Tools.strOfLocalization(2822, [
                  s[`desc_${GameMgr.client_language}`]
                ]),
                Laya.Handler.create(i, () => {
                  var e = {};
                  e.goods_id = r;
                  e.count = 1;
                  e.deal_price = Math.floor(f * m);
                  100 == s.category_goods && (e.bill_short_cut = g);
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'buyFromShop',
                    e,
                    (e, n) => {
                      game.Tools.setGrayDisable(M, !1);
                      if ((e || n.error))
                        t.UIMgr.Inst.showNetReqError('buyFromShop', e, n);
                      else {
                        view.AudioMgr.PlayAudio(106);

                        t.UI_LightTips.Inst.show(
                          game.Tools.strOfLocalization(2191)
                        );

                        if (
                          (100 == s.category_goods)
                        ) {
                          t.UI_Shop.update_buyed_count(r, !1, 1);
                          for (
                            var a = s.item_id,
                              o = cfg.shops.goods_package.getGroup(a),
                              l = 0;
                            l < o.length;
                            l++
                          ) {
                            var h = cfg.shops.goods.get(o[l].good_id);
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
            !1
          );

          M.visible = h;
        }
        a.getChildByName('btn_detail').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_Shop.Inst.locking ||
              (100 == s.category_goods
                ? d ||
                  t.UI_Shop_Pack_Detail.Inst.show(
                    r,
                    Laya.Handler.create(i, i.onPackBuyed, null, !1)
                  )
                : t.UI_Shop.Inst.close(
                    Laya.Handler.create(i, () => {
                      t.UI_Shop_Skin_Yulan.Inst.show(r);
                    })
                  ));
          },
          null,
          !1
        );
      }

      show() {
        var e = this;
        this.me.visible = !0;
        this.used_skin = {};
        this.good_ids = [];

        cfg.shops.goods.forEach(({category, id, sort}) => {
          5 == category &&
            t.UI_Shop.goods_on_sell(id) &&
            e.good_ids.push({ id: id, sort: sort });
        });

        this.good_ids = this.good_ids.sort(({sort}, {sort}) => sort - sort);

        this.scrollview.reset();
        this.scrollview.addItem(this.good_ids.length);
        this.no_info.visible = 0 == this.good_ids.length;
        for (var i = 0; i < this.good_ids.length; i++)
          this.seen_skin_map[this.good_ids[i].id.toString()] = 1;
        var n = '';
        '' != n && (n += ',');
        for (var a in this.seen_skin_map) n += a;
        Laya.LocalStorage.setItem(
          game.Tools.eeesss(`shop_skin_list_${GameMgr.Inst.account_id}`),
          game.Tools.eeesss(n)
        );
      }

      close() {
        this.me.visible = !1;
        for (var t in this.used_skin)
          Laya.loader.clearTextureRes(game.LoadMgr.getResImageSkin(t));
        this.used_skin = {};
      }

      onPackBuyed({event, goods_id}) {
        if (this.me.visible && 'success' == event) {
          t.UI_Shop.update_buyed_count(goods_id, !1, 1);
          for (
            var i = cfg.shops.goods.get(goods_id).item_id,
              n = cfg.shops.goods_package.getGroup(i),
              a = 0;
            a < n.length;
            a++
          ) {
            var r = cfg.shops.goods.get(n[a].good_id);
            1 == r.category_goods && t.UI_Sushe.add_skin(r.item_id);
          }
          this.scrollview.wantToRefreshAll();
        }
      }
    }

    return e;
  })();
  t.UI_Shop_Skin = e;
})(uiscript || (uiscript = {}));