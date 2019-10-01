var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function() {
      function e(e) {
        var i = this;
        (this.me = e),
          (this.root = this.me.getChildByName('root')),
          (this.name = this.root.getChildByName('label_name')),
          (this.desc = this.root.getChildByName('desc')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              i.close();
            },
            null,
            !1
          )),
          (this.container_item = this.root.getChildByName('item')),
          (this.buyed = this.container_item.getChildByName('buyed')),
          (this.icon = new t.UI_Item_Skin(
            this.container_item.getChildByName('icon')
          )),
          (this.container_price = this.root.getChildByName('price')),
          (this.btn_buy = this.root.getChildByName('btn_buy')),
          (this.btn_buy.clickHandler = Laya.Handler.create(
            this,
            this.on_buy,
            null,
            !1
          )),
          (this.owned_count = this.root.getChildByName('owned_count'));
      }
      return (
        (e.prototype.show = function(e, i, n) {
          (this.me.visible = !0),
            (this.inzhp = e),
            t.UIBase.anim_pop_out(this.root, null),
            (this.shop_item_id = i),
            (this.buyed_count = n);
          var a;
          if (e)
            (this.currency_icon = cfg.item_definition.currency.get(
              100002
            ).icon),
              (this.my_currency_num = GameMgr.Inst.account_data.gold),
              (a = cfg.shops.zhp_goods.get(i));
          else {
            var r = (a = cfg.shops.goods.get(i)).currency;
            10 == Math.floor(r / 1e4)
              ? (this.currency_icon = cfg.item_definition.currency.get(r).icon)
              : (this.currency_icon = cfg.item_definition.item.get(
                  r
                ).icon_transparent),
              (this.my_currency_num = t.UI_Bag.get_item_count(r));
          }
          a.show_has
            ? ((this.owned_count.visible = !0),
              (this.owned_count.text = game.Tools.strOfLocalization(2212, [
                t.UI_Bag.get_item_count(a.item_id).toString()
              ])))
            : (this.owned_count.visible = !1);
          var s = cfg.item_definition.item.get(a.item_id);
          (this.name.text = s['name_' + GameMgr.client_language]),
            (this.desc.text = s['desc_' + GameMgr.client_language]),
            this.icon.setSkin(a.icon),
            (this.single_price = a.price),
            (this.container_price.getChildByName(
              'icon'
            ).skin = game.LoadMgr.getResImageSkin(this.currency_icon)),
            this.refresh_cost(this.single_price);
          var o = a.buy_limit;
          null != o && o < 0
            ? ((this.buyed.visible = !1),
              (this.icon.me.filters = []),
              game.Tools.setGrayDisable(
                this.btn_buy,
                this.single_price > this.my_currency_num
              ))
            : a.buy_limit <= n
            ? ((this.buyed.visible = !0),
              (this.icon.me.filters = [new Laya.ColorFilter(t.DARK_FILTER)]),
              game.Tools.setGrayDisable(this.btn_buy, !0))
            : ((this.buyed.visible = !1),
              (this.icon.me.filters = []),
              game.Tools.setGrayDisable(
                this.btn_buy,
                this.single_price > this.my_currency_num
              ));
        }),
        (e.prototype.close = function() {
          var e = this;
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              e.me.visible = !1;
            })
          );
        }),
        (e.prototype.refresh_cost = function(t) {
          this.container_price.getChildByName('label0'),
            this.container_price.getChildByName('icon');
          var e = this.container_price.getChildByName('count');
          (e.text = t.toString()),
            (e.color = t <= this.my_currency_num ? '#00ff00' : '#ff0000'),
            game.Tools.child_align_center(this.container_price, [10, 5]);
        }),
        (e.prototype.on_buy = function() {
          this.close(),
            game.Tools.setGrayDisable(this.btn_buy, !0),
            this.inzhp
              ? n.Inst.want_to_buy_zhp(this.shop_item_id, 1)
              : n.Inst.want_to_buy_othershop(this.shop_item_id, 1);
        }),
        e
      );
    })(),
    i = (function() {
      function e(e) {
        var i = this;
        (this.mounthly = !1),
          (this.me = e),
          (this.root = this.me.getChildByName('root')),
          (this.name = this.root.getChildByName('label_name')),
          (this.desc = this.root.getChildByName('desc')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              i.close();
            },
            null,
            !1
          )),
          (this.container_item = this.root.getChildByName('item')),
          (this.buyed = this.container_item.getChildByName('buyed')),
          (this.icon = new t.UI_Item_Skin(
            this.container_item.getChildByName('icon')
          )),
          (this.label_count = this.root.getChildByName('count')),
          (this.container_danjia = this.root.getChildByName('danjia')),
          (this.container_left_count = this.root.getChildByName('left')),
          (this.label_refresh_info = this.root.getChildByName('refresh_info')),
          (this.container_price = this.root.getChildByName('price')),
          (this.btn_buy = this.root.getChildByName('btn_buy')),
          (this.btn_buy.clickHandler = Laya.Handler.create(
            this,
            this.on_buy,
            null,
            !1
          ));
        for (
          var n = ['-10', '-1', '+1', '+10'],
            a = function(t) {
              var e = r.root.getChildByName(n[t]),
                a = e.getChildByName('s');
              a.alpha = 0;
              var s = !1;
              e.on('mousedown', r, function() {
                (a.alpha = 0),
                  (s = !0),
                  Laya.Tween.to(a, { alpha: 1 }, 50, null, null, 0, !0, !0);
              }),
                e.on('mouseup', r, function() {
                  if (
                    (Laya.Tween.to(a, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    s)
                  )
                    switch (t) {
                      case 0:
                        i.on_num_change(-10);
                        break;
                      case 1:
                        i.on_num_change(-1);
                        break;
                      case 2:
                        i.on_num_change(1);
                        break;
                      case 3:
                        i.on_num_change(10);
                    }
                  s = !1;
                }),
                e.on('mouseout', r, function() {
                  Laya.Tween.to(a, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    (s = !1);
                });
            },
            r = this,
            s = 0;
          s < n.length;
          s++
        )
          a(s);
        this.owned_count = this.root.getChildByName('owned_count');
      }
      return (
        (e.prototype.show = function(e, i, n) {
          (this.me.visible = !0),
            (this.inzhp = e),
            (this.buyed_count = n),
            (this.shop_item_id = i),
            t.UIBase.anim_pop_out(this.root, null);
          var a;
          if (e)
            (this.currency_icon = cfg.item_definition.currency.get(
              100002
            ).icon),
              (this.my_currency_num = GameMgr.Inst.account_data.gold),
              (a = cfg.shops.zhp_goods.get(i)),
              (this.mounthly = !1);
          else {
            var r = (a = cfg.shops.goods.get(i)).currency;
            10 == Math.floor(r / 1e4)
              ? (this.currency_icon = cfg.item_definition.currency.get(r).icon)
              : (this.currency_icon = cfg.item_definition.item.get(
                  r
                ).icon_transparent),
              (this.my_currency_num = t.UI_Bag.get_item_count(r)),
              (this.mounthly = 4 == a.category);
          }
          (this.shop_table = a),
            (this.single_price = a.price),
            (this.container_price.getChildByName(
              'icon'
            ).skin = game.LoadMgr.getResImageSkin(this.currency_icon)),
            a.show_has
              ? ((this.owned_count.visible = !0),
                (this.owned_count.text = game.Tools.strOfLocalization(2212, [
                  t.UI_Bag.get_item_count(a.item_id).toString()
                ])))
              : (this.owned_count.visible = !1);
          var s = cfg.item_definition.item.get(a.item_id);
          (this.name.text = s['name_' + GameMgr.client_language]),
            (this.desc.text = s['desc_' + GameMgr.client_language]),
            this.icon.setSkin(a.icon),
            (this.count = 1),
            this.refresh(),
            (this.label_refresh_info.visible = this.mounthly),
            null != a.buy_limit && a.buy_limit < 0
              ? ((this.container_left_count.visible = !1),
                (this.container_danjia.x = 393))
              : ((this.container_left_count.visible = !0),
                (this.container_danjia.x = 300),
                (this.container_left_count.getChildByName('count').text =
                  (this.mounthly ? game.Tools.strOfLocalization(2184) : '') +
                  (a.buy_limit - n).toString())),
            (this.container_danjia.getChildByName(
              'icon'
            ).skin = game.LoadMgr.getResImageSkin(this.currency_icon)),
            (this.container_danjia.getChildByName(
              'price'
            ).text = this.single_price.toString());
        }),
        (e.prototype.close = function() {
          var e = this;
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              e.me.visible = !1;
            })
          );
        }),
        (e.prototype.on_buy = function() {
          this.close(),
            game.Tools.setGrayDisable(this.btn_buy, !0),
            this.inzhp
              ? n.Inst.want_to_buy_zhp(this.shop_item_id, this.count)
              : n.Inst.want_to_buy_othershop(this.shop_item_id, this.count);
        }),
        (e.prototype.on_num_change = function(t) {
          (this.count += t),
            this.shop_table.buy_limit &&
              this.shop_table.buy_limit >= 0 &&
              this.count + this.buyed_count > this.shop_table.buy_limit &&
              (this.count = this.shop_table.buy_limit - this.buyed_count),
            this.count >= 999 && (this.count = 999),
            this.count < 1 && (this.count = 1),
            this.refresh();
        }),
        (e.prototype.refresh = function() {
          this.label_count.text = this.count.toString();
          var e = this.shop_table.buy_limit;
          null != e && e < 0
            ? ((this.buyed.visible = !1),
              (this.icon.me.filters = []),
              game.Tools.setGrayDisable(
                this.btn_buy,
                this.single_price * this.count > this.my_currency_num
              ))
            : this.shop_table.buy_limit <= this.buyed_count
            ? ((this.buyed.visible = !0),
              (this.icon.me.filters = [new Laya.ColorFilter(t.DARK_FILTER)]),
              game.Tools.setGrayDisable(this.btn_buy, !0))
            : ((this.buyed.visible = !1),
              (this.icon.me.filters = []),
              game.Tools.setGrayDisable(
                this.btn_buy,
                this.single_price * this.count > this.my_currency_num
              )),
            this.refresh_cost(this.count * this.single_price);
        }),
        (e.prototype.refresh_cost = function(t) {
          this.container_price.getChildByName('label0'),
            this.container_price.getChildByName('icon');
          var e = this.container_price.getChildByName('count');
          (e.text = t.toString()),
            (e.color = t <= this.my_currency_num ? '#00ff00' : '#ff0000'),
            game.Tools.child_align_center(this.container_price, [10, 5]);
        }),
        e
      );
    })(),
    n = (function(n) {
      function a() {
        var t = n.call(this, new ui.lobby.shopUI()) || this;
        return (
          (t.money = null),
          (t.tabs = []),
          (t.heads = []),
          (t.currencys = {}),
          (t.locking = !1),
          (t.shop_index = -1),
          (t.items = []),
          (t.usd_item_icon = {}),
          (a.Inst = t),
          t
        );
      }
      return (
        __extends(a, n),
        (a.init = function() {
          var e = this;
          app.NetAgent.sendReq2Lobby('Lobby', 'fetchShopInfo', {}, function(
            i,
            n
          ) {
            i || n.error
              ? t.UIMgr.Inst.showNetReqError('fetchShopInfo', i, n)
              : (e.shopinfo = JSON.parse(JSON.stringify(n)).shop_info);
          }),
            app.NetAgent.AddListener2Lobby(
              'NotifyShopUpdate',
              Laya.Handler.create(
                this,
                function(t) {
                  (e.shopinfo = t.shop_info),
                    e.Inst && e.Inst.enable && e.Inst.refresh_info();
                },
                null,
                !1
              )
            );
        }),
        (a.buyed_count = function(t, e) {
          if (!this.shopinfo) return 0;
          var i = [];
          if (e) {
            if (!this.shopinfo.zhp) return 0;
            i = this.shopinfo.zhp.buy_records;
          } else i = this.shopinfo.buy_records;
          if (!i || 0 == i.length) return 0;
          for (var n = 0; n < i.length; n++)
            if (i[n].id == t) return i[n].count;
          return 0;
        }),
        (a.update_buyed_count = function(t, e, i) {
          if (!this.shopinfo) return 0;
          var n;
          e
            ? (this.shopinfo.zhp || (this.shopinfo.zhp = {}),
              this.shopinfo.zhp.buy_records ||
                (this.shopinfo.zhp.buy_records = []),
              (n = this.shopinfo.zhp.buy_records))
            : (this.shopinfo.buy_records || (this.shopinfo.buy_records = []),
              (n = this.shopinfo.buy_records));
          for (var a = !1, r = 0; r < n.length; r++)
            if (n[r].id == t) {
              (n[r].count = i), (a = !0);
              break;
            }
          a || n.push({ id: t, count: i });
        }),
        (a.goods_on_sell = function(t) {
          var e = cfg.shops.goods.get(t);
          if (!e) return !1;
          var i = Date.now();
          return (
            !(
              e.sell_start_time &&
              '' != e.sell_start_time &&
              game.Tools.ParseTime(e.sell_start_time) > i
            ) &&
            !(
              e.sell_end_time &&
              '' != e.sell_end_time &&
              game.Tools.ParseTime(e.sell_end_time) < i
            )
          );
        }),
        (a.goods_discount_value = function(t) {
          var e = cfg.shops.goods.get(t);
          if (!e) return 1;
          if (!e.discount_start_time || '' == e.discount_start_time) return 1;
          if (!e.discount_end_time || '' == e.discount_end_time) return 1;
          var i = Date.now();
          if (game.Tools.ParseTime(e.discount_start_time) > i) return 1;
          if (game.Tools.ParseTime(e.discount_end_time) < i) return 1;
          var n = e.discount / 1e4;
          return n < 0 ? 1 : n > 1 ? 1 : n;
        }),
        (a.prototype.onCreate = function() {
          var n = this;
          (this.container_top = this.me.getChildByName('top')),
            (this.container_top.getChildByName(
              'btn_back'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                n.locking ||
                  n.close(
                    Laya.Handler.create(n, function() {
                      t.UI_Lobby.Inst.enable = !0;
                    })
                  );
              },
              null,
              !1
            )),
            (this.money = new t.UI_Money(
              this.container_top,
              Laya.Handler.create(
                this,
                function(t) {
                  n.close(t);
                },
                null,
                !1
              ),
              Laya.Handler.create(
                this,
                function() {
                  return n.locking;
                },
                null,
                !1
              )
            )),
            (this.container_content = this.me.getChildByName('content')),
            (this.container_tab = this.container_content.getChildByName(
              'tabs'
            )),
            (this.tabs = []);
          for (
            var a = function(t) {
                var e = r.container_tab.getChildByName('btn' + t);
                r.tabs.push(e),
                  (e.clickHandler = Laya.Handler.create(
                    r,
                    function() {
                      n.shop_index != t && n.change_tab(t);
                    },
                    null,
                    !1
                  ));
              },
              r = this,
              s = 0;
            s < this.container_tab.numChildren;
            s++
          )
            a(s);
          var o = this.container_content.getChildByName('right');
          (this.container_right = o),
            (this.timerefresh = o
              .getChildByName('head0')
              .getChildByName('time')),
            (this.scrollview = o.scriptMap['capsui.CScrollView']),
            this.scrollview.init_scrollview(
              Laya.Handler.create(this, this.render_item, null, !1),
              -1,
              4
            ),
            (this.buy_single = new e(this.me.getChildByName('pop_buy_single'))),
            (this.buy_multi = new i(this.me.getChildByName('pop_buy_multi'))),
            (this.heads = []);
          for (s = 0; s < 4; s++)
            this.heads.push(
              this.container_content
                .getChildByName('right')
                .getChildByName('head' + s)
            );
          (this.btn_refreshZHP = this.heads[0].getChildByName('refresh')),
            (this.heads[0].getChildByName(
              'refresh'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                n.locking ||
                  t.UI_SecondConfirm.Inst.show(
                    game.Tools.strOfLocalization(2204),
                    Laya.Handler.create(n, function() {
                      n.refresh_zhp();
                    }),
                    null
                  );
              },
              null,
              !1
            )),
            t.UI_Bag.add_item_listener(
              302002,
              Laya.Handler.create(
                this,
                function() {
                  1 == n.shop_index && n.refresh_head_show();
                },
                null,
                !1
              )
            ),
            t.UI_Bag.add_item_listener(
              302003,
              Laya.Handler.create(
                this,
                function() {
                  2 == n.shop_index && n.refresh_head_show();
                },
                null,
                !1
              )
            ),
            t.UI_Bag.add_item_listener(
              302004,
              Laya.Handler.create(
                this,
                function() {
                  3 == n.shop_index && n.refresh_head_show();
                },
                null,
                !1
              )
            ),
            (this.page_skin = new t.UI_Shop_Skin(
              this.container_content.getChildByName('skin_shop')
            ));
        }),
        (a.prototype.have_red_point = function() {
          return this.page_skin.have_red_point();
        }),
        (a.prototype.getLocalTime = function() {
          var t = new Date().getTime();
          return (
            (t = Math.ceil(t / 1e3)),
            (t += 10800),
            (t %= 86400),
            (t = 86400 - t) < 3600
              ? ((t = Math.ceil(t / 60)),
                game.Tools.strOfLocalization(2674, [t.toString()]) +
                  game.Tools.strOfLocalization(2748))
              : ((t = Math.ceil(t / 3600)),
                game.Tools.strOfLocalization(2674, [t.toString()]) +
                  game.Tools.strOfLocalization(2747))
          );
        }),
        (a.prototype.show = function(e) {
          var i = this;
          void 0 === e && (e = 0),
            (this.enable = !0),
            (this.locking = !0),
            (this.usd_item_icon = {}),
            game.Scene_Lobby.Inst.change_bg('indoor', !1),
            t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
            t.UIBase.anim_alpha_in(this.container_content, { y: 30 }, 150),
            this.refresh_info(e),
            this.money.onEnable(),
            (this.timerefresh.text = this.getLocalTime()),
            Laya.timer.once(150, this, function() {
              i.locking = !1;
            }),
            (this.tabs[4].getChildByName(
              'redpoint'
            ).visible = this.page_skin.have_red_point());
        }),
        (a.prototype.close = function(e) {
          var i = this;
          (this.locking = !0),
            t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
            t.UIBase.anim_alpha_out(this.container_content, { y: 30 }, 150),
            Laya.timer.once(150, this, function() {
              (i.locking = !1), (i.enable = !1), e && e.run();
            });
        }),
        (a.prototype.onDisable = function() {
          this.shop_index = -1;
          for (var t in this.usd_item_icon)
            Laya.loader.clearTextureRes(game.LoadMgr.getResImageSkin(t));
          this.usd_item_icon = {};
        }),
        (a.prototype.refresh_info = function(t) {
          void 0 === t && (t = 0),
            (this.buy_single.me.visible = !1),
            (this.buy_multi.me.visible = !1),
            a.shopinfo ? this.change_tab(t) : this.change_tab(-1);
        }),
        (a.prototype.change_tab = function(t) {
          var e = this;
          a.shopinfo || (t = -1), (this.shop_index = t);
          for (l = 0; l < this.tabs.length; l++)
            (this.tabs[l].skin = game.Tools.localUISrc(
              t == l
                ? 'myres/shop/tab_choose.png'
                : 'myres/shop/tab_unchoose.png'
            )),
              (this.tabs[l].getChildAt(0).color =
                t == l ? '#d9b263' : '#8cb65f');
          if (
            ((this.container_right.visible = !1),
            this.page_skin.close(),
            4 == this.shop_index)
          )
            this.page_skin.show(),
              (this.tabs[4].getChildByName('redpoint').visible = !1);
          else {
            if (
              ((this.container_right.visible = !0),
              this.refresh_head_show(),
              (this.items = []),
              this.scrollview.reset(),
              0 == this.shop_index)
            ) {
              var i = a.shopinfo.zhp;
              if (i) {
                if (i.goods)
                  for (l = 0; l < i.goods.length; l++)
                    this.items.push({
                      shop_item_id: i.goods[l],
                      buyed_count: 0,
                      sort: l
                    });
                if (i.buy_records)
                  for (l = 0; l < i.buy_records.length; l++)
                    for (
                      var n = i.buy_records[l], r = 0;
                      r < this.items.length;
                      r++
                    )
                      this.items[r].shop_item_id == n.id &&
                        (this.items[r].buyed_count = n.count);
              }
            } else if (1 == this.shop_index || 2 == this.shop_index) {
              cfg.shops.goods.forEach(function(t) {
                t.category == e.shop_index &&
                  e.items.push({
                    shop_item_id: t.id,
                    buyed_count: 0,
                    sort: t.sort
                  });
              }),
                (this.items = this.items.sort(function(t, e) {
                  return t.sort - e.sort;
                }));
              if ((o = a.shopinfo).buy_records)
                for (l = 0; l < o.buy_records.length; l++)
                  for (
                    var n = o.buy_records[l], s = 0;
                    s < this.items.length;
                    s++
                  )
                    this.items[s].shop_item_id == n.id &&
                      (this.items[s].buyed_count = n.count);
            } else if (3 == this.shop_index) {
              cfg.shops.goods.forEach(function(t) {
                4 == t.category &&
                  e.items.push({
                    shop_item_id: t.id,
                    buyed_count: 0,
                    sort: t.sort
                  });
              }),
                cfg.shops.goods.forEach(function(t) {
                  3 == t.category &&
                    e.items.push({
                      shop_item_id: t.id,
                      buyed_count: 0,
                      sort: t.sort + 1e5
                    });
                }),
                (this.items = this.items.sort(function(t, e) {
                  return t.sort - e.sort;
                }));
              var o = a.shopinfo;
              if (o.buy_records)
                for (var l = 0; l < o.buy_records.length; l++)
                  for (
                    var n = o.buy_records[l], h = 0;
                    h < this.items.length;
                    h++
                  )
                    this.items[h].shop_item_id == n.id &&
                      (this.items[h].buyed_count = n.count);
            }
            this.scrollview.addItem(this.items.length);
          }
        }),
        (a.prototype.refresh_head_show = function() {
          for (var e = 0; e < this.heads.length; e++)
            this.heads[e].visible = this.shop_index == e;
          if (0 == this.shop_index) {
            var i = a.shopinfo.zhp;
            if (i) {
              var n = this.heads[0].getChildByName('refresh'),
                r = this.heads[0].getChildByName('noinfo'),
                s = this.heads[0].getChildByName('count');
              if (
                ((n.visible = !1),
                (r.visible = !1),
                (s.text = ''),
                i.free_refresh && i.free_refresh.count < i.free_refresh.limit)
              )
                (n.visible = !0),
                  (n.getChildByName('pay').visible = !1),
                  (n.getChildByName('free').visible = !0),
                  (n.getChildByName('free').text = game.Tools.strOfLocalization(
                    2185
                  )),
                  (s.text =
                    game.Tools.strOfLocalization(2186) +
                    (i.free_refresh.limit - i.free_refresh.count));
              else if (
                i.cost_refresh &&
                i.cost_refresh.count < i.cost_refresh.limit
              ) {
                var o = cfg.shops.zhp_refresh_price.get(
                  i.cost_refresh.count + 1
                );
                if (o) {
                  (n.visible = !0), (n.getChildByName('free').visible = !1);
                  var l = n.getChildByName('pay');
                  l.visible = !0;
                  var h = l.getChildByName('count'),
                    c = l.getChildByName('icon'),
                    u = l.getChildByName('money');
                  (h.text = game.Tools.strOfLocalization(2187)),
                    (s.text =
                      game.Tools.strOfLocalization(2188) +
                      (i.cost_refresh.limit - i.cost_refresh.count)),
                    (c.skin = game.LoadMgr.getResImageSkin(
                      cfg.item_definition.currency.get(100001).icon
                    )),
                    (u.text = '×' + o.refresh_price.toString()),
                    game.Tools.child_align_center(n.getChildByName('pay'), [
                      30
                    ]);
                } else r.visible = !0;
              } else r.visible = !0;
            } else this.heads[0].visible = !1;
          } else if (this.shop_index >= 1 && this.shop_index <= 3) {
            var _ = void 0;
            switch (this.shop_index) {
              case 1:
                _ = 302002;
                break;
              case 2:
                _ = 302003;
                break;
              case 3:
                _ = 302004;
            }
            var d = this.heads[this.shop_index];
            this.currencys[this.shop_index] ||
              (this.currencys[this.shop_index] = new t.UI_Item_Skin(
                d.getChildByName('icon')
              )),
              this.currencys[this.shop_index].setSkin(
                cfg.item_definition.item.get(_).icon_transparent
              ),
              (d.getChildByName('count').text =
                '×' + t.UI_Bag.get_item_count(_).toString());
          }
        }),
        (a.prototype.render_item = function(e) {
          var i = this,
            n = e.index,
            a = e.container,
            r = e.cache_data;
          r.skin ||
            (r.skin = new t.UI_Item_Skin(
              a.getChildByName('btn').getChildByName('icon')
            ));
          var s,
            o,
            l = this.items[n];
          if (0 == this.shop_index)
            (o = cfg.item_definition.currency.get(100002).icon),
              (s = cfg.shops.zhp_goods.get(l.shop_item_id));
          else {
            var h = (s = cfg.shops.goods.get(l.shop_item_id)).currency;
            o =
              10 == Math.floor(h / 1e4)
                ? cfg.item_definition.currency.get(h).icon
                : cfg.item_definition.item.get(h).icon_transparent;
          }
          var c = a.getChildByName('btn');
          if (
            ((c.clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : s.need_amount
                  ? i.buy_multi.show(
                      0 == i.shop_index,
                      l.shop_item_id,
                      l.buyed_count
                    )
                  : i.buy_single.show(
                      0 == i.shop_index,
                      l.shop_item_id,
                      l.buyed_count
                    );
              },
              null,
              !1
            )),
            (c.getChildByName('label_name').text =
              s['name_' + GameMgr.client_language]),
            r.skin.setSkin(s.icon),
            (this.usd_item_icon[s.icon] = 1),
            s.buy_limit >= 0)
          )
            if (4 == s.category)
              if (l.buyed_count >= s.buy_limit)
                (c.getChildByName('buyed').visible = !0),
                  (c.getChildByName('icon').filters = [
                    new Laya.ColorFilter(t.DARK_FILTER)
                  ]),
                  (c.getChildByName('btn_buy').filters = [
                    new Laya.ColorFilter(t.GRAY_FILTER)
                  ]),
                  (c.getChildByName('count').visible = !0),
                  (c.getChildByName('count').text =
                    game.Tools.strOfLocalization(2189) + '0');
              else {
                (c.getChildByName('icon').filters = []),
                  (c.getChildByName('btn_buy').filters = []),
                  (c.getChildByName('buyed').visible = !1),
                  (c.getChildByName('count').visible = !0);
                u = s.buy_limit - l.buyed_count;
                c.getChildByName('count').text =
                  game.Tools.strOfLocalization(2189) + u;
              }
            else if (l.buyed_count >= s.buy_limit)
              (c.getChildByName('icon').filters = [
                new Laya.ColorFilter(t.DARK_FILTER)
              ]),
                (c.getChildByName('btn_buy').filters = [
                  new Laya.ColorFilter(t.GRAY_FILTER)
                ]),
                (c.getChildByName('buyed').visible = !0),
                (c.getChildByName('count').visible = !1);
            else {
              (c.getChildByName('icon').filters = []),
                (c.getChildByName('btn_buy').filters = []),
                (c.getChildByName('buyed').visible = !1),
                (c.getChildByName('count').visible = !0);
              var u = s.buy_limit - l.buyed_count;
              c.getChildByName('count').text =
                u > 1 ? game.Tools.strOfLocalization(2190) + u.toString() : '';
            }
          else
            (c.getChildByName('icon').filters = []),
              (c.getChildByName('btn_buy').filters = []),
              (c.getChildByName('buyed').visible = !1),
              (c.getChildByName('count').visible = !1);
          (c
            .getChildByName('btn_buy')
            .getChildByName('currency').skin = game.LoadMgr.getResImageSkin(o)),
            (c.getChildByName('btn_buy').getChildByName('label_gold').text =
              s.price),
            game.Tools.child_align_center(c.getChildByName('btn_buy'));
        }),
        (a.prototype.want_to_buy_zhp = function(e, i) {
          var n = this;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'buyFromZHP',
            { goods_id: e, count: i },
            function(r, s) {
              if (r || s.error)
                t.UIMgr.Inst.showNetReqError('buyFromZHP', r, s);
              else {
                if (
                  (t.UI_LightTips.Inst.show(game.Tools.strOfLocalization(2191)),
                  view.AudioMgr.PlayAudio(106),
                  0 == n.shop_index)
                )
                  for (h = 0; h < n.items.length; h++)
                    if (n.items[h].shop_item_id == e) {
                      (n.items[h].buyed_count += i),
                        n.scrollview.wantToRefreshItem(h);
                      break;
                    }
                var o = a.shopinfo.zhp;
                if (o) {
                  o.buy_records || (o.buy_records = []);
                  for (var l = !1, h = 0; h < o.buy_records.length; h++)
                    if (o.buy_records[h].id == e) {
                      (o.buy_records[h].count += i), (l = !0);
                      break;
                    }
                  l || o.buy_records.push({ id: e, count: i });
                }
              }
            }
          );
        }),
        (a.prototype.want_to_buy_othershop = function(e, i) {
          var n = this;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'buyFromShop',
            {
              goods_id: e,
              count: i,
              deal_price: cfg.shops.goods.get(e).price * i
            },
            function(r, s) {
              if (r || s.error)
                t.UIMgr.Inst.showNetReqError('buyFromShop', r, s);
              else {
                if ((view.AudioMgr.PlayAudio(106), 0 != n.shop_index))
                  for (h = 0; h < n.items.length; h++)
                    if (n.items[h].shop_item_id == e) {
                      (n.items[h].buyed_count += i),
                        n.scrollview.wantToRefreshItem(h);
                      break;
                    }
                a.shopinfo.buy_records || (a.shopinfo.buy_records = []);
                for (
                  var o = a.shopinfo.buy_records, l = !1, h = 0;
                  h < o.length;
                  h++
                )
                  if (o[h].id == e) {
                    (o[h].count += i), (l = !0);
                    break;
                  }
                l || o.push({ id: e, count: i }),
                  s.rewards && s.rewards.length > 0
                    ? game.Tools.showRewards(s, null)
                    : t.UI_LightTips.Inst.show(
                        game.Tools.strOfLocalization(2191)
                      );
              }
            }
          );
        }),
        (a.prototype.refresh_zhp = function() {
          var e = this;
          game.Tools.setGrayDisable(this.btn_refreshZHP, !0),
            app.NetAgent.sendReq2Lobby('Lobby', 'refreshZHPShop', {}, function(
              i,
              n
            ) {
              if (
                (game.Tools.setGrayDisable(e.btn_refreshZHP, !1), i || n.error)
              )
                t.UIMgr.Inst.showNetReqError('refreshZHPShop', i, n);
              else {
                a.shopinfo.zhp = JSON.parse(JSON.stringify(n.zhp));
                a.shopinfo.zhp;
                0 == e.shop_index && e.change_tab(0);
              }
            });
        }),
        (a.Inst = null),
        (a.shopinfo = null),
        a
      );
    })(t.UIBase);
  t.UI_Shop = n;
})(uiscript || (uiscript = {}));