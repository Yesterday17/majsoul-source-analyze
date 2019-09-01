var uiscript;
!(function(t) {
  var e = (function() {
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
    return (
      (e.prototype.have_red_point = function() {
        var e = this;
        if (!this.seen_skin_map) {
          var i = Laya.LocalStorage.getItem(
            game.Tools.eeesss('shop_skin_list_' + GameMgr.Inst.account_id)
          );
          if (((this.seen_skin_map = {}), i))
            for (
              var n = (i = game.Tools.dddsss(i)).split(','), a = 0;
              a < n.length;
              a++
            )
              this.seen_skin_map[n[a]] = 1;
        }
        var r = false;
        return (
          cfg.shops.goods.forEach(function(i) {
            r ||
              (5 == i.category &&
                t.UI_Shop.goods_on_sell(i.id) &&
                (e.seen_skin_map[i.id] || (r = true)));
          }),
          r
        );
      }),
      (e.prototype.refresh_price = function(t, e, i, n) {
        var a = t.getChildByName('container_origin_price'),
          r = t.getChildByName('container_discount');
        if (((a.visible = false), (r.visible = false), i >= 1))
          (a.visible = true), (a.getChildByName('now_price').text = e.toString());
        else {
          (r.visible = true),
            (r.getChildByName('discount').text =
              '-' + (100 - Math.ceil(100 * i)) + '%');
          var s = r.getChildByName('now_price'),
            o = r.getChildByName('origin_price'),
            l = r.getChildByName('del');
          (o.text = e.toString()),
            (s.text = n.toString()),
            (l.width = o.textField.textWidth + 6);
        }
      }),
      (e.prototype.render_item = function(e) {
        var i = this,
          n = e.index,
          a = e.container,
          r = this.good_ids[n].id,
          s = cfg.shops.goods.get(r),
          o = a.getChildByName('icon');
        game.LoadMgr.setImgSkin(o, s.icon),
          (this.used_skin[s.icon] = 1),
          (a.getChildByName('name').text =
            s['name_' + GameMgr.client_language]),
          (a.getChildByName('desc').text =
            s['desc_' + GameMgr.client_language]);
        var l = a.getChildByName('sell_day'),
          h = false;
        if (s.sell_end_time && '' != s.sell_end_time) {
          l.visible = true;
          var c = game.Tools.ParseTime(s.sell_end_time) - Date.now();
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
        var u = a.getChildByName('container_buy'),
          _ = a.getChildByName('owned');
        (u.visible = false), (_.visible = false);
        var d = false,
          f = 0,
          p = 0,
          m = t.UI_Shop.goods_discount_value(r),
          g = [];
        if (100 == s.category_goods)
          if (t.UI_Shop.buyed_count(r, false) > 0) d = true;
          else {
            d = false;
            for (
              var y = s.item_id, v = cfg.shops.goods_package.getGroup(y), b = 0;
              b < v.length;
              b++
            ) {
              var w = v[b].good_id,
                x = v[b].good_count,
                I = cfg.shops.goods.get(w);
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
          var S = Math.floor(f * m);
          100 == s.category_goods
            ? this.refresh_price(u, p, Math.ceil((S / p) * 100) / 100, S)
            : this.refresh_price(u, f, m, S);
          var T = u.getChildByName('btn_buy');
          (T.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_SecondConfirm.Inst.show(
                game.Tools.strOfLocalization(2822, [
                  s['desc_' + GameMgr.client_language]
                ]),
                Laya.Handler.create(i, function() {
                  var e = {};
                  (e.goods_id = r),
                    (e.count = 1),
                    (e.deal_price = Math.floor(f * m)),
                    100 == s.category_goods && (e.bill_short_cut = g),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'buyFromShop',
                      e,
                      function(e, n) {
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
            false
          )),
            (T.visible = h);
        }
        a.getChildByName('btn_detail').clickHandler = Laya.Handler.create(
          this,
          function() {
            t.UI_Shop.Inst.locking ||
              (100 == s.category_goods
                ? d ||
                  t.UI_Shop_Pack_Detail.Inst.show(
                    r,
                    Laya.Handler.create(i, i.onPackBuyed, null, false)
                  )
                : t.UI_Shop.Inst.close(
                    Laya.Handler.create(i, function() {
                      t.UI_Shop_Skin_Yulan.Inst.show(r);
                    })
                  ));
          },
          null,
          false
        );
      }),
      (e.prototype.show = function() {
        var e = this;
        (this.me.visible = true),
          (this.used_skin = {}),
          (this.good_ids = []),
          cfg.shops.goods.forEach(function(i) {
            5 == i.category &&
              t.UI_Shop.goods_on_sell(i.id) &&
              e.good_ids.push({ id: i.id, sort: i.sort });
          }),
          (this.good_ids = this.good_ids.sort(function(t, e) {
            return t.sort - e.sort;
          })),
          this.scrollview.reset(),
          this.scrollview.addItem(this.good_ids.length),
          (this.no_info.visible = 0 == this.good_ids.length);
        for (var i = 0; i < this.good_ids.length; i++)
          this.seen_skin_map[this.good_ids[i].id.toString()] = 1;
        var n = '';
        for (var a in this.seen_skin_map) '' != n && (n += ','), (n += a);
        Laya.LocalStorage.setItem(
          game.Tools.eeesss('shop_skin_list_' + GameMgr.Inst.account_id),
          game.Tools.eeesss(n)
        );
      }),
      (e.prototype.close = function() {
        this.me.visible = false;
        for (var t in this.used_skin)
          Laya.loader.clearTextureRes(game.LoadMgr.getResImageSkin(t));
        this.used_skin = {};
      }),
      (e.prototype.onPackBuyed = function(e) {
        if (this.me.visible && 'success' == e.event) {
          t.UI_Shop.update_buyed_count(e.goods_id, false, 1);
          for (
            var i = cfg.shops.goods.get(e.goods_id).item_id,
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
      }),
      e
    );
  })();
  t.UI_Shop_Skin = e;
})(uiscript || (uiscript = {}));