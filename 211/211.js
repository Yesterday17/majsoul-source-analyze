var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (() => {
    function e(t) {
      var e = this;
      this.me = t;
      this.root = this.me.getChildByName('root');
      this.name = this.root.getChildByName('label_name');
      this.desc = this.root.getChildByName('desc');

      this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.close();
          },
          null,
          !1
        );

      this.container_item = this.root.getChildByName('item');
      this.buyed = this.container_item.getChildByName('buyed');
      this.icon = this.container_item.getChildByName('icon');
      this.container_price = this.root.getChildByName('price');
      this.btn_buy = this.root.getChildByName('btn_buy');
    }

    e.prototype.show_recharge = function(e, i) {
      var a = this;
      this.me.visible = !0;
      t.UIBase.anim_pop_out(this.root, null);
      var r;
      cfg.mall.goods_shelves.getGroup(e).forEach(t => {
        t.goods_id == i && (r = t);
      });
      var s = cfg.mall.goods.get(i);
      this.name.text = s.name;
      this.desc.text = s.desc;
      game.LoadMgr.setImgSkin(this.icon, s.icon);
      this.container_price.getChildByName('icon').visible = !1;
      var o = null;
      n.Inst.app_shop && (o = n.Inst.app_shop.getGoodsInfo(i));

      this.container_price.getChildByName('count').text = o
          ? o.price
          : r.price;

      game.Tools.child_align_center(this.container_price, [20]);
      this.buyed.visible = !1;
      game.Tools.setGrayDisable(this.container_item, !1);
      game.Tools.setGrayDisable(this.btn_buy, !1);
      this.btn_buy.clickHandler = Laya.Handler.create(
          this,
          () => {
            a.close();
            game.Tools.setGrayDisable(a.btn_buy, !0);
            n.Inst.want_to_recharge(i);
          },
          null,
          !1
        );
    };

    e.prototype.show_exchange = function(e) {
      var i = this;
      this.me.visible = !0;
      t.UIBase.anim_pop_out(this.root, null);
      var a = cfg.exchange.exchange.get(e);
      this.name.text = a[`name_${GameMgr.client_language}`];
      this.desc.text = a[`desc_${GameMgr.client_language}`];
      game.LoadMgr.setImgSkin(this.icon, a.icon);

      this.container_price.getChildByName(
          'icon'
        ).skin = game.LoadMgr.getResImageSkin(
          cfg.item_definition.currency.get(a.source_currency).icon
        );

      this.container_price.getChildByName('icon').visible = !0;
      var r = t.UI_Bag.get_item_count(a.source_currency);
      this.buyed.visible = !1;
      game.Tools.setGrayDisable(this.container_item, !1);
      game.Tools.setGrayDisable(this.btn_buy, r < a.source_value);
      var s = this.container_price.getChildByName('count');
      s.text = a.source_value.toString();
      s.color = r < a.source_value ? '#ff0000' : '#00ff00';
      game.Tools.child_align_center(this.container_price);
      this.btn_buy.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.close();
            game.Tools.setGrayDisable(i.btn_buy, !0);
            n.Inst.want_to_exchange(e);
          },
          null,
          !1
        );
    };

    e.prototype.show_searchexchange = function(e) {
      var i = this;
      this.me.visible = !0;
      t.UIBase.anim_pop_out(this.root, null);
      var a = cfg.exchange.searchexchange.get(e);
      this.name.text = a[`name_${GameMgr.client_language}`];
      this.desc.text = a[`desc_${GameMgr.client_language}`];
      game.LoadMgr.setImgSkin(this.icon, a.icon);

      this.container_price.getChildByName(
          'icon'
        ).skin = game.LoadMgr.getResImageSkin(
          cfg.item_definition.currency.get(a.source_currency).icon
        );

      this.container_price.getChildByName('icon').visible = !0;
      var r = t.UI_Bag.get_item_count(a.source_currency);
      this.buyed.visible = !1;
      game.Tools.setGrayDisable(this.container_item, !1);
      game.Tools.setGrayDisable(this.btn_buy, r < a.source_value);
      var s = this.container_price.getChildByName('count');
      s.text = a.source_value.toString();
      s.color = r < a.source_value ? '#ff0000' : '#00ff00';
      game.Tools.child_align_center(this.container_price);
      this.btn_buy.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.close();
            game.Tools.setGrayDisable(i.btn_buy, !0);
            n.Inst.want_to_searchexchange(e);
          },
          null,
          !1
        );
    };

    e.prototype.close = function() {
      var e = this;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.me.visible = !1;
        })
      );
    };

    return e;
  })();

  var i = (() => {
    class e {
      constructor(t) {
        var e = this;
        this.current_id = 0;
        this.my_vip_id = 0;
        this.me = t;
        this.container_title = t.getChildByName('container_title');

        this.current_title_big = this.container_title.getChildByName(
            'current_title_big'
          );

        this.current_title_small = t
            .getChildByName('container_next')
            .getChildByName('current_title_small');

        this.next_title = t
            .getChildByName('container_next')
            .getChildByName('next_title');

        this.next_info = t
            .getChildByName('container_next')
            .getChildByName('next_info');

        this.label_infos = [];
        for (
          var i = t.getChildByName('container_infos'), n = 0;
          n < i.numChildren;
          n++
        )
          this.label_infos.push(i.getChildAt(n));
        this.label_require = t.getChildByName('require');
        this.label_value = t.getChildByName('value');
        this.btn_left = t.getChildByName('btn_left');

        this.btn_left.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.current_id--;
              e.refresh();
            },
            null,
            !1
          );

        this.btn_right = t.getChildByName('btn_right');

        this.btn_right.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.current_id++;
              e.refresh();
            },
            null,
            !1
          );

        this.container_bar = t.getChildByName('bar').getChildByName('v');
        this.bar_v = t.getChildByName('bar').getChildByName('v').mask;
        this.btn_get_reward = t.getChildByName('btn_get_reward');
        this.container_reward = t.getChildByName('container_reward');
      }

      show() {
        var t = this;
        this.me.visible = !0;
        var e = 0;
        GameMgr.Inst.account_data.vip && (e = GameMgr.Inst.account_data.vip);
        this.current_id = 1;

        cfg.vip.vip.forEach(({charge, id}) => {
          e >= charge && (t.current_id = id);
        });

        this.my_vip_id = this.current_id;
        var i = cfg.vip.vip.get(this.current_id);
        if (i) {
          var n = cfg.vip.vip.get(this.current_id + 1);

          this.label_value.text =
                `${e.toString()}/${n.charge.toString()}`;

          this.bar_v.width = (this.container_bar.width * e) / n.charge;
          game.LoadMgr.setImgSkin(this.current_title_small, i.img);
          game.LoadMgr.setImgSkin(this.next_title, n.img);

          this.next_info.text = game.Tools.strOfLocalization(2158, [
                (n.charge - e).toString()
              ]);

          this.next_info.visible = !0;
          this.next_title.visible = !0;
          this.label_value.text = e.toString();
          this.bar_v.width = this.container_bar.width;
          game.LoadMgr.setImgSkin(this.current_title_small, i.img);
          this.next_info.visible = !1;
          this.next_title.visible = !1;
          n
            ? (game.Tools.child_align_center(
            this.me.getChildByName('container_next'),
            [0, 30, 0]
          ))
            : (game.Tools.child_align_center(
            this.me.getChildByName('container_next'),
            [0, 30, 0]
          ));
        } else this.me.getChildByName('container_next').visible = !1;
        this.refresh();
      }

      close() {
        this.me.visible = !1;
      }

      refresh() {
        var e = this,
          i = cfg.vip.vip.get(this.current_id);
        if (i) {
          game.LoadMgr.setImgSkin(this.current_title_big, i.img);

          this.btn_left.visible =
              null != cfg.vip.vip.get(this.current_id - 1);

          this.btn_right.visible =
              null != cfg.vip.vip.get(this.current_id + 1);

          0 == i.charge
            ? (this.label_require.text = '')
            : (this.label_require.text = game.Tools.strOfLocalization(
                2159,
                [i.charge.toString()]
              ));
          for (var a = [], r = 0; r < i.rewards.length; r++)
            '' != i.rewards[r] && a.push(i.rewards[r]);
          this.container_reward.visible = !1;
          this.btn_get_reward.visible = !1;
          this.label_require.visible = !0;
          if (0 == a.length)
            this.container_title.y = 334;
          else {
            this.container_reward.visible = !0;
            this.container_title.y = 88;
            for (
              var s = this.container_reward.getChildByName('container_item'),
                o = i => {
                  var r = s.getChildAt(i);
                  if (a.length > i) {
                    var o =
                        r.width * a.length +
                        (a.length < 1 ? 0 : 0 * (a.length - 1)),
                      h = s.width / 2 - o / 2 + (r.width + 0) * i;
                    r.x = h;
                    r.y = 0;
                    r.visible = !0;
                    var c = a[i],
                      u = parseInt(c.split('-')[0]),
                      _ = parseInt(c.split('-')[1]);
                    r.getChildByName(
                      'btn'
                    ).clickHandler = Laya.Handler.create(
                      l,
                      () => {
                        t.UI_ItemDetail.Inst.show(u);
                      },
                      null,
                      !1
                    );
                    var d = r.getChildByName('count');
                    d.visible = !0;
                    _ > 1
                      ? (d.text = _.toString())
                      : (d.visible = !1);
                    var f = game.GameUtility.get_item_view(u);
                    game.LoadMgr.setImgSkin(
                      r.getChildByName('btn').getChildByName('icon'),
                      f.icon
                    );
                    var p = r.getChildByName('btn').getChildByName('getted');
                    p.visible = !0;
                    l.label_require.visible = !0;
                    p.visible = !1;
                    l.btn_get_reward.visible = !0;
                    l.label_require.visible = !1;
                    l.btn_get_reward.visible = !1;
                    p.visible = !1;
                    l.label_require.visible = !0;
                    n.vip_reward_getted
                      ? n.vip_reward_getted[l.current_id - 1]
                        ? (l.btn_get_reward.visible = !1)
                        : (l.my_vip_id >= l.current_id
                      ? (l.btn_get_reward.clickHandler = Laya.Handler.create(
                          l,
                          () => {
                            var i = e.current_id;
                            app.NetAgent.sendReq2Lobby(
                              'Lobby',
                              'gainVipReward',
                              { vip_level: i - 1 },
                              (a, r) => {
                                n.vip_reward_getted[i - 1] = 1;
                                e.refresh();
                                a || r.error
                                  ? t.UIMgr.Inst.showNetReqError(
                                      'gainVipReward',
                                      a,
                                      r
                                    )
                                  : (t.UI_LightTips.Inst.show(
                                  game.Tools.strOfLocalization(2211)
                                ));
                              }
                            );
                          },
                          null,
                          !1
                        ))
                      : (l.label_require.visible = !0))
                      : (l.btn_get_reward.visible = !1);
                  } else r.visible = !1;
                },
                l = this,
                r = 0;
              r < s.numChildren;
              r++
            )
              o(r);
          }
          this.label_infos[r].text = h[r];
          for (
            var h = i[`desc_${GameMgr.client_language}`].split('\\n'), r = 0;
            r < this.label_infos.length;
            r++
          )
            r < h.length
              ? (this.label_infos[r].visible = !0)
              : (this.label_infos[r].visible = !1);
        }
      }
    }

    return e;
  })();

  var n = (n => {
    class a {
      constructor() {
        var t = n.call(this, new ui.lobby.rechargeUI()) || this;
        t.money = null;
        t.tabs = [];
        t.locking = !1;
        t.goods_sheleve_id = '';
        t.tab_index = -1;
        t.items = [];
        t.app_shop = null;
        t.tab_infos = [];
        a.Inst = t;
        return t;
      }

      static init() {
        var e = this;
        this.vip_reward_getted = null;

        app.NetAgent.sendReq2Lobby('Lobby', 'fetchVipReward', {}, (t, {error, gained_vip_levels}) => {
          e.vip_reward_getted = {};
          if (t || error);
          else if ((gained_vip_levels))
            for (var n = 0; n < gained_vip_levels.length; n++)
              e.vip_reward_getted[gained_vip_levels[n]] = 1;
        });

        if (
          ('en' == GameMgr.client_language)
        ) {
          (i = document.createElement('link')).rel = 'stylesheet';
          i.href =
              `${GameMgr.config_data.checkoutShopperUrl}/checkoutshopper/sdk/2.1.0/adyen.css`;
          (n = document.getElementsByTagName('head')[0]).appendChild(i);
          (i = document.createElement('link')).rel = 'stylesheet';
          i.href = game.ResourceVersion.formatURL('css/adyen_custom.css');
          (n = document.getElementsByTagName('head')[0]).appendChild(i);
          (i = document.createElement('script')).src =
            `${GameMgr.config_data.checkoutShopperUrl}/checkoutshopper/sdk/2.1.0/adyen.js`;
          (n = document.getElementsByTagName(
            'script'
          )[0]).parentNode.insertBefore(i, n);
        } else if ('jp' == GameMgr.client_language) {
          var i = document.createElement('script');
          i.src = GameMgr.config_data.jp_shop_js;
          var n = document.getElementsByTagName('script')[0];
          n.parentNode.insertBefore(i, n);
        }
        app.NetAgent.AddListener2Lobby(
          'NotifyPayResult',
          Laya.Handler.create(
            this,
            e => {
              var i = e.goods_id;
              if (1010 == i || 2010 == i || 3010 == i) {
                var n = cfg.mall.month_ticket.get(i),
                  r = '';
                r = game.Tools.strOfLocalization(2161, [n.name]);
                app.PlayerBehaviorStatistic.recharged_count++;

                0 === e.pay_result
                  ? (app.PlayerBehaviorStatistic.fb_trace_pending(
                  app.EBehaviorType.Purchase,
                  app.PlayerBehaviorStatistic.recharged_count
                ))
                  : (r = game.Tools.strOfLocalization(2160, [n.name]));

                t.UI_LightTips.Inst.show(r);
                t.UI_Activity_Yueka.OnBuyedYueka(i);
                a.Inst &&
                  a.Inst.enable &&
                  a.Inst.change_tab(a.Inst.tab_index);
              } else {
                var n = cfg.mall.goods.get(i),
                  r = '';
                r = game.Tools.strOfLocalization(2161, [n.name]);
                app.PlayerBehaviorStatistic.recharged_count++;

                0 === e.pay_result
                  ? (app.PlayerBehaviorStatistic.fb_trace_pending(
                  app.EBehaviorType.Purchase,
                  app.PlayerBehaviorStatistic.recharged_count
                ))
                  : (r = game.Tools.strOfLocalization(2160, [n.name]));

                t.UI_LightTips.Inst.show(r);
              }
              t.UI_Payment_Wxcode.onPayResult(e);
            },
            null,
            !1
          )
        );
      }

      static on_new_recharge_refresh({new_recharged_list}) {
        if (new_recharged_list) {
          for (var i = 0; i < new_recharged_list.length; i++)
            t.UI_Recharge.new_recharge_list[new_recharged_list[i]] = 1;
          this.Inst &&
            this.Inst.enable &&
            this.Inst.scrollview.wantToRefreshAll();
        }
      }

      onCreate() {
        var n = this;
        this.container_top = this.me.getChildByName('top');

        this.container_top.getChildByName(
            'btn_back'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              n.locking ||
                n.close(
                  Laya.Handler.create(n, () => {
                    t.UI_Lobby.Inst.enable = !0;
                  })
                );
            },
            null,
            !1
          );

        this.money = new t.UI_Money(
            this.container_top,
            null,
            Laya.Handler.create(
              this,
              () => n.locking,
              null,
              !1
            )
          );

        this.container_content = this.me.getChildByName('content');

        this.container_tab = this.container_content.getChildByName(
            'tabs'
          );

        this.tabs = [];
        for (
          var a = t => {
            var e = r.container_tab.getChildAt(t);
            r.tabs.push(e);
            e.clickHandler = Laya.Handler.create(
                r,
                () => {
                  n.tab_index != t && n.change_tab(t);
                },
                null,
                !1
              );
          },
            r = this,
            s = 0;
          s < this.container_tab.numChildren;
          s++
        )
          a(s);
        var o = this.container_content.getChildByName('right');
        this.container_right = o;
        this.scrollview = o.scriptMap['capsui.CScrollView'];

        this.scrollview.init_scrollview(
          Laya.Handler.create(this, this.render_good_shelves, null, !1),
          -1,
          4
        );

        this.page_vip = new i(
            this.container_content.getChildByName('page_vip')
          );

        this.buy_single = new e(this.me.getChildByName('pop_buy_single'));
        this.app_shop = new game.GooglePlayShop();
        GameMgr.inConch &&
          GameMgr.inGooglePlay &&
          (this.app_shop.onGameStart());
      }

      show(e) {
        var i = this;
        this.enable = !0;
        this.locking = !0;
        game.Scene_Lobby.Inst.change_bg('indoor', !1);
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150);
        t.UIBase.anim_alpha_in(this.container_content, { y: 30 }, 150);
        this.money.onEnable();

        Laya.timer.once(150, this, () => {
          i.locking = !1;
        });

        this.tab_infos = [];

        'chs' == GameMgr.client_language
            ? (this.goods_sheleve_id = 'shelves_001')
            : 'jp' == GameMgr.client_language
            ? (this.goods_sheleve_id = 'shelves_002')
            : 'en' == GameMgr.client_language &&
              (this.goods_sheleve_id = 'shelves_003');

        GameMgr.config_data.goods_sheleve_id &&
          '' != GameMgr.config_data.goods_sheleve_id &&
          a.open_payment &&
          (this.tab_infos.push('huiyu'));

        this.tab_infos.push('tongbi');
        'chs' == GameMgr.client_language && this.tab_infos.push('huishi');
        this.tab_infos.push('vip');
        this.tabs[n].visible = !0;
        for (var n = 0; n < this.tabs.length; n++)
          if (n < this.tab_infos.length)
            switch ((this.tab_infos[n])) {
              case 'huiyu':
                this.tabs[n].getChildByName(
                  'label_name'
                ).text = game.Tools.strOfLocalization(2165);
                break;
              case 'tongbi':
                this.tabs[n].getChildByName(
                  'label_name'
                ).text = game.Tools.strOfLocalization(2166);
                break;
              case 'huishi':
                this.tabs[n].getChildByName(
                  'label_name'
                ).text = game.Tools.strOfLocalization(2201);
                break;
              case 'vip':
                this.tabs[n].getChildByName(
                  'label_name'
                ).text = game.Tools.strOfLocalization(2167);
            }
          else this.tabs[n].visible = !1;
        this.refresh_info(e);
      }

      close(e) {
        var i = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150);
        t.UIBase.anim_alpha_out(this.container_content, { y: 30 }, 150);
        Laya.timer.once(150, this, () => {
          i.locking = !1;
          i.enable = !1;
          i.tab_index = -1;
          e.run();
        });
      }

      refresh_info(t) {
        this.buy_single.me.visible = !1;
        for (var e = 0, i = 0; i < this.tab_infos.length; i++)
          if (this.tab_infos[i] == t) {
            e = i;
            break;
          }
        this.change_tab(e);
      }

      change_tab(t) {
        var e = this;
        this.tab_index = t;

        this.tabs[i].skin = game.Tools.localUISrc(
          t == i
            ? 'myres/shop/tab_choose.png'
            : 'myres/shop/tab_unchoose.png'
        );

        for (var i = 0; i < this.tabs.length; i++)
          this.tabs[i].getChildAt(0).color =
              t == i ? '#d9b263' : '#8cb65f';
        this.container_right.visible = !1;
        this.page_vip.close();
        this.items = [];
        this.scrollview.reset();
        this.container_right.visible = !0;

        this.scrollview.change_render_handler(
          Laya.Handler.create(this, this.render_good_shelves, null, !1)
        );

        cfg.mall.goods_shelves
          .getGroup(this.goods_sheleve_id)
          .forEach(({is_monthcard, goods_id}) => {
            (is_monthcard && game.Tools.CannotPay()) ||
              e.items.push(goods_id);
          });

        this.container_right.visible = !0;

        this.scrollview.change_render_handler(
          Laya.Handler.create(this, this.render_recharge, null, !1)
        );

        cfg.exchange.exchange.forEach(({id}) => {
          e.items.push(id);
        });

        this.container_right.visible = !0;

        this.scrollview.change_render_handler(
          Laya.Handler.create(
            this,
            this.render_searchexchange,
            null,
            !1
          )
        );

        cfg.exchange.searchexchange.forEach(({id}) => {
          e.items.push(id);
        });

        'huiyu' == this.tab_infos[t]
          ? (this.scrollview.addItem(this.items.length))
          : 'tongbi' == this.tab_infos[t]
          ? (this.scrollview.addItem(this.items.length))
          : 'huishi' == this.tab_infos[t]
          ? (this.scrollview.addItem(this.items.length))
          : 'vip' == this.tab_infos[t] && this.page_vip.show();
      }

      render_recharge({index, container}) {
        var e = this,
          i = index,
          n = container,
          a = cfg.exchange.exchange.get(this.items[i]),
          r = n.getChildByName('btn');

        r.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.buy_single.show_exchange(e.items[i]);
          },
          null,
          !1
        );

        r.getChildByName('label_name').text =
            a[`name_${GameMgr.client_language}`];

        game.LoadMgr.setImgSkin(r.getChildByName('icon'), a.icon);
        r.filters = [];
        var s = r.getChildByName('btn_buy').getChildByName('currency');
        s.visible = !0;

        game.LoadMgr.setImgSkin(
          s,
          cfg.item_definition.currency.get(a.source_currency).icon
        );

        r
            .getChildByName('btn_buy')
            .getChildByName('label_gold').text = a.source_value.toString();

        game.Tools.child_align_center(r.getChildByName('btn_buy'));
        r.getChildByName('shouchong').visible = !1;
        r.getChildByName('desc').text = '';
        r.getChildByName('left_days').visible = !1;
      }

      render_searchexchange({index, container}) {
        var e = this,
          i = index,
          n = container,
          a = cfg.exchange.searchexchange.get(this.items[i]),
          r = n.getChildByName('btn');

        r.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.buy_single.show_searchexchange(e.items[i]);
          },
          null,
          !1
        );

        r.getChildByName('label_name').text =
            a[`name_${GameMgr.client_language}`];

        game.LoadMgr.setImgSkin(r.getChildByName('icon'), a.icon);
        r.filters = [];
        var s = r.getChildByName('btn_buy').getChildByName('currency');
        s.visible = !0;

        game.LoadMgr.setImgSkin(
          s,
          cfg.item_definition.currency.get(a.source_currency).icon
        );

        r
            .getChildByName('btn_buy')
            .getChildByName('label_gold').text = a.source_value.toString();

        game.Tools.child_align_center(r.getChildByName('btn_buy'));
        r.getChildByName('shouchong').visible = !1;
        r.getChildByName('desc').text = '';
        r.getChildByName('left_days').visible = !1;
      }

      render_good_shelves({index, container}) {
        var i,
          n = this,
          r = index,
          s = container.getChildByName('btn');

        cfg.mall.goods_shelves
            .getGroup(this.goods_sheleve_id)
            .forEach(t => {
              t.goods_id == n.items[r] && (i = t);
            });

        s.clickHandler = Laya.Handler.create(
            this,
            () => {
              a.on_want_2_buy(n.items[r]);
            },
            null,
            !1
          );

        if (
          (i.is_monthcard)
        ) {
          l = cfg.mall.month_ticket.get(this.items[r]);
          s.getChildByName('label_name').text = l.name;
          game.LoadMgr.setImgSkin(s.getChildByName('icon'), l.icon);
          s.filters = [];
          s
              .getChildByName('btn_buy')
              .getChildByName('currency').visible = !1;
          h = null;
          this.app_shop && (h = this.app_shop.getGoodsInfo(this.items[r]));

          s.getChildByName('btn_buy').getChildByName('label_gold').text = h
              ? h.price
              : i.price;

          game.Tools.child_align_center(s.getChildByName('btn_buy'));
          s.getChildByName('shouchong').visible = !1;
          s.getChildByName('desc').text = l.desc;
          s.getChildByName('desc').color = '#f56aff';
          var o = t.UI_Activity_Yueka.GetYuekaLeftDays(this.items[r]);
          s.getChildByName('left_days').visible = !0;
          o >= 0
            ? (s
                .getChildByName('left_days')
                .getChildByName('val').text = game.Tools.strOfLocalization(
                2840,
                [o.toString()]
              ))
            : (s.getChildByName('left_days').visible = !1);
        } else {
          var l = cfg.mall.goods.get(this.items[r]);
          s.getChildByName('label_name').text = l.name;
          game.LoadMgr.setImgSkin(s.getChildByName('icon'), l.icon);
          s.filters = [];
          s.getChildByName('left_days').visible = !1;
          s
              .getChildByName('btn_buy')
              .getChildByName('currency').visible = !1;
          var h = null;
          this.app_shop && (h = this.app_shop.getGoodsInfo(this.items[r]));

          s.getChildByName('btn_buy').getChildByName('label_gold').text = h
              ? h.price
              : i.price;

          game.Tools.child_align_center(s.getChildByName('btn_buy'));
          s.getChildByName('shouchong').visible = !1;
          s.getChildByName('desc').text = l.normal_desc;
          s.getChildByName('shouchong').visible = !0;
          s.getChildByName('desc').text = l.first_desc;
          a.new_recharge_list[l.cny]
            ? (s.getChildByName('desc').color = '#f17828')
            : (s.getChildByName('desc').color = '#f56aff');
        }
      }

      want_to_exchange(e) {
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'exchangeCurrency',
          { id: e },
          (e, i) => {
            e || i.error
              ? t.UIMgr.Inst.showNetReqError('exchangeCurrency', e, i)
              : t.UI_LightTips.Inst.show(game.Tools.strOfLocalization(2191));
          }
        );
      }

      want_to_searchexchange(e) {
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'exchangeChestStone',
          { id: e, count: 1 },
          (e, i) => {
            e || i.error
              ? t.UIMgr.Inst.showNetReqError('exchangeChestStone', e, i)
              : t.UI_LightTips.Inst.show(game.Tools.strOfLocalization(2191));
          }
        );
      }

      want_to_recharge(e) {
        t.UI_Payment_Loading.Inst.enable = !0;
        this.app_shop &&
          (this.app_shop.want2BuyItem(
          e,
          Laya.Handler.create(this, () => {
            t.UI_Payment_Loading.Inst.enable = !1;
          })
        ));
      }
    }

    __extends(a, n);

    a.open_new_window = () => !(
      (Laya.Browser.onIOS || Laya.Browser.onMac) &&
      Laya.Browser.onSafari
    );

    a.on_want_2_buy = e => {
      var i = '';
      'chs' == GameMgr.client_language
        ? (i = 'shelves_001')
        : 'jp' == GameMgr.client_language
        ? (i = 'shelves_002')
        : 'en' == GameMgr.client_language && (i = 'shelves_003');
      var n;

      cfg.mall.goods_shelves.getGroup(i).forEach(t => {
          t.goods_id == e && (n = t);
        });

      if (
        (game.Tools.CannotPay())
      )
        t.UI_Payment_ChooseMethod_CHS.Inst.show(e, '');
      else if (GameMgr.iniOSWebview)
        t.UI_Popout.PopOutNoTitle(game.Tools.strOfLocalization(2169), null);
      else if ('chs' == GameMgr.client_language)
        if (
          t.UI_ShiMingRenZheng.renzhenged ||
          GameMgr.Inst.player_in_haiwai
        ) {
          var r = '',
            s = '';
          0 == a.payment_info_show_type && (r = a.payment_info);

          a.payment_info &&
              '' != a.payment_info &&
              ((1 == a.payment_info_show_type && (s = a.payment_info)));

          if (
            (r && '' != r)
          )
            t.UI_Popout.PopOutNoTitle(r, null);
          else {
            0 == t.UI_Payment_ChooseMethod_CHS.Inst.getShowedChoose().length
              ? t.UI_Popout.PopOutNoTitle(
                  game.Tools.strOfLocalization(104),
                  null
                )
              : n.is_monthcard
              ? t.UI_Payment_Yueka_CHS.Inst.show(s)
              : t.UI_Payment_ChooseMethod_CHS.Inst.show(e, s);
          }
        } else t.UI_ShiMingRenZheng.Inst.show();
      else
        'jp' == GameMgr.client_language
          ? GameMgr.Inst.account_data.birthday
            ? n.is_monthcard
              ? t.UI_Payment_Yueka_EN.Inst.show('')
              : t.UI_Payment_ChooseMethod_EN.Inst.show(e, '')
            : t.UI_Agepending.Inst.show()
          : 'en' == GameMgr.client_language &&
            (n.is_monthcard
              ? t.UI_Payment_Yueka_EN.Inst.show('')
              : t.UI_Payment_ChooseMethod_EN.Inst.show(e, ''));
    };

    a.open_payment = !1;
    a.payment_info_show_type = 1;
    a.payment_info = '';
    a.open_wx = !0;
    a.wx_type = 0;
    a.open_alipay = !0;
    a.alipay_type = 0;
    a.new_recharge_list = {};
    a.vip_reward_getted = null;
    return a;
  })(t.UIBase);

  t.UI_Recharge = n;
})(uiscript || (uiscript = {}));