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
      function e(t) {
        var e = this;
        (this.me = t),
          (this.root = t.getChildByName('root')),
          (this.panel = this.root.getChildByName('content')),
          (this.label_info = this.panel.getChildByName('info')),
          (this.panel.vScrollBarSkin = ''),
          (this.me.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function(e) {
          var i = cfg.chest.chest.get(e);
          (this.label_info.text = i['desc_' + GameMgr.client_language]),
            (this.label_info.height = this.label_info.textField.textHeight),
            this.panel.refresh(),
            (this.me.visible = !0),
            t.UIBase.anim_alpha_in(this.root, { y: 30 }, 150);
        }),
        (e.prototype.showinfo = function(e) {
          (this.label_info.text = e),
            (this.label_info.height = this.label_info.textField.textHeight),
            this.panel.refresh(),
            (this.me.visible = !0),
            t.UIBase.anim_alpha_in(this.root, { y: 30 }, 150);
        }),
        (e.prototype.close = function() {
          var e = this;
          t.UIBase.anim_alpha_out(
            this.root,
            { y: 30 },
            150,
            0,
            Laya.Handler.create(this, function() {
              e.me.visible = !1;
            })
          );
        }),
        e
      );
    })(),
    i = (function() {
      function e(t) {
        var e = this;
        (this.me = t),
          (this.me.visible = !1),
          (this.root = this.me.getChildByName('root')),
          (this.name = this.root.getChildByName('label_name')),
          (this.desc = this.root.getChildByName('desc')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            !1
          )),
          (this.container_item = this.root.getChildByName('item')),
          (this.buyed = this.container_item.getChildByName('buyed')),
          (this.icon = this.container_item.getChildByName('icon')),
          (this.container_price = this.root.getChildByName('price')),
          (this.btn_buy = this.root.getChildByName('btn_buy')),
          (this.btn_buy.clickHandler = Laya.Handler.create(
            this,
            this.on_buy,
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function(e, i, n) {
          (this.chest_shop_item_id = e),
            (this.my_currency_num = n),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(this.root, null);
          var a = cfg.chest.chest_shop.get(e);
          this.my_currency_num = n;
          var r = game.GameUtility.get_item_view(a.item_id);
          (this.name.text = r.name),
            (this.desc.text = r.desc),
            game.LoadMgr.setImgSkin(this.icon, a.icon),
            (this.single_price = a.price),
            this.refresh_cost(this.single_price),
            i
              ? ((this.buyed.visible = !0),
                (this.icon.filters = [new Laya.ColorFilter(t.DARK_FILTER)]),
                game.Tools.setGrayDisable(this.btn_buy, !0))
              : ((this.buyed.visible = !1),
                (this.icon.filters = []),
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
          this.close(), game.Tools.setGrayDisable(this.btn_buy, !0);
          var e = this.chest_shop_item_id;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'buyFromChestShop',
            { goods_id: this.chest_shop_item_id, count: 1 },
            function(i, n) {
              if (i || n.error)
                t.UIMgr.Inst.showNetReqError('buyFromChestShop', i, n);
              else {
                var a = cfg.chest.chest_shop.get(e);
                t.UI_LightTips.Inst.show(
                  game.Tools.strOfLocalization(2161, [
                    a['name_' + GameMgr.client_language]
                  ])
                ),
                  h.on_chest_count_change([
                    { faith_id: n.chest_id, consume_count: n.consume_count }
                  ]),
                  h.Inst.xy.want_refresh(),
                  h.Inst.money.onEnable(),
                  h.Inst.money.label_xinyang &&
                    (h.Inst.money.label_xinyang.text = h
                      .get_chest_currency(
                        cfg.chest.chest.get(h.Inst.chest_id).faith_id
                      )
                      .toString());
              }
            }
          );
        }),
        e
      );
    })(),
    n = (function() {
      function e(t) {
        var e = this;
        (this.me = t),
          (this.me.visible = !1),
          (this.root = this.me.getChildByName('root')),
          (this.name = this.root.getChildByName('label_name')),
          (this.desc = this.root.getChildByName('desc')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.close();
            },
            null,
            !1
          )),
          (this.container_item = this.root.getChildByName('item')),
          (this.buyed = this.container_item.getChildByName('buyed')),
          (this.icon = this.container_item.getChildByName('icon')),
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
          var i = ['-10', '-1', '+1', '+10'],
            n = function(t) {
              var n = a.root.getChildByName(i[t]),
                r = n.getChildByName('s');
              r.alpha = 0;
              var s = !1;
              n.on('mousedown', a, function() {
                (r.alpha = 0),
                  (s = !0),
                  Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
              }),
                n.on('mouseup', a, function() {
                  if (
                    (Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    s)
                  )
                    switch (t) {
                      case 0:
                        e.on_num_change(-10);
                        break;
                      case 1:
                        e.on_num_change(-1);
                        break;
                      case 2:
                        e.on_num_change(1);
                        break;
                      case 3:
                        e.on_num_change(10);
                    }
                  s = !1;
                }),
                n.on('mouseout', a, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    (s = !1);
                });
            },
            a = this,
            r = 0;
          r < i.length;
          r++
        )
          n(r);
      }
      return (
        (e.prototype.show = function(e, i) {
          (this.chest_shop_item_id = e),
            (this.my_currency_num = i),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(this.root, null);
          var n = cfg.chest.chest_shop.get(e);
          this.single_price = n.price;
          var a = game.GameUtility.get_item_view(n.item_id);
          (this.name.text = a.name),
            (this.desc.text = a.desc),
            game.LoadMgr.setImgSkin(this.icon, n.icon),
            (this.count = 1),
            this.refresh(),
            (this.label_refresh_info.visible = !1),
            (this.container_left_count.visible = !1),
            (this.container_danjia.x = 393),
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
          this.close(), game.Tools.setGrayDisable(this.btn_buy, !0);
          var e = this.chest_shop_item_id,
            i = this.count;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'buyFromChestShop',
            { goods_id: this.chest_shop_item_id, count: this.count },
            function(n, a) {
              if (n || a.error)
                t.UIMgr.Inst.showNetReqError('buyFromChestShop', n, a);
              else {
                var r = cfg.chest.chest_shop.get(e);
                t.UI_LightTips.Inst.show(
                  game.Tools.strOfLocalization(2161, [
                    r['name_' + GameMgr.client_language] + 'x' + i
                  ])
                ),
                  h.on_chest_count_change([
                    { faith_id: a.chest_id, consume_count: a.consume_count }
                  ]),
                  h.Inst.xy.want_refresh(),
                  h.Inst.money.onEnable(),
                  h.Inst.money.label_xinyang &&
                    (h.Inst.money.label_xinyang.text = h
                      .get_chest_currency(
                        cfg.chest.chest.get(h.Inst.chest_id).faith_id
                      )
                      .toString());
              }
            }
          );
        }),
        (e.prototype.on_num_change = function(t) {
          (this.count += t),
            this.count >= 999 && (this.count = 999),
            this.count < 1 && (this.count = 1),
            this.refresh();
        }),
        (e.prototype.refresh = function() {
          (this.label_count.text = this.count.toString()),
            (this.buyed.visible = !1),
            game.Tools.setGrayDisable(this.container_item, !1),
            game.Tools.setGrayDisable(
              this.btn_buy,
              this.single_price * this.count > this.my_currency_num
            ),
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
    a = (function() {
      function e(t, e, a) {
        var r = this;
        (this.me = t),
          (this.buy_single = new i(e)),
          (this.buy_multi = new n(a)),
          (this.label_count = t.getChildByName('count')),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, !1),
            -1,
            4
          ),
          (this.me.visible = !1),
          (this.me.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              r.locking || r.close();
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function(e) {
          var i = this;
          (this.chest_id = e),
            (this.locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_alpha_in(
              this.me,
              { y: 30 },
              150,
              null,
              Laya.Handler.create(this, function() {
                i.locking = !1;
              })
            ),
            (this.items = []),
            cfg.chest.chest_shop.forEach(function(n) {
              n.chest_id == e &&
                ((n.check_activity &&
                  !t.UI_Activity.activity_is_running(n.check_activity)) ||
                  i.items.push({ id: n.id, sort: n.sort }));
            }),
            (this.items = this.items.sort(function(t, e) {
              return t.sort - e.sort;
            })),
            this.refresh_currency(),
            this.scrollview.reset(),
            this.scrollview.addItem(this.items.length);
        }),
        (e.prototype.want_refresh = function() {
          this.scrollview.wantToRefreshAll();
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_alpha_out(
              this.me,
              { y: 30 },
              150,
              null,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.me.visible = !1);
              })
            );
        }),
        (e.prototype.render_item = function(e) {
          var i = this,
            n = e.index,
            a = e.container,
            r = (e.cache_data, this.items[n].id),
            s = cfg.chest.chest_shop.get(r),
            o = !1;
          game.GameUtility.item_owned(s.item_id) && (o = !0);
          var l = a.getChildByName('btn');
          (l.clickHandler = Laya.Handler.create(
            this,
            function() {
              s.need_amount
                ? i.buy_multi.show(r, i.currency_count)
                : i.buy_single.show(r, o, i.currency_count);
            },
            null,
            !1
          )),
            (l.getChildByName('label_name').text =
              s['name_' + GameMgr.client_language]),
            game.LoadMgr.setImgSkin(
              a.getChildByName('btn').getChildByName('icon'),
              s.icon
            ),
            o
              ? ((l.getChildByName('buyed').visible = !0),
                (l.getChildByName('icon').filters = [
                  new Laya.ColorFilter(t.DARK_FILTER)
                ]),
                (l.getChildByName('btn_buy').filters = [
                  new Laya.ColorFilter(t.GRAY_FILTER)
                ]))
              : ((l.getChildByName('buyed').visible = !1),
                (l.getChildByName('icon').filters = []),
                (l.getChildByName('btn_buy').filters = [])),
            (l
              .getChildByName('btn_buy')
              .getChildByName('label_gold').text = s.price.toString()),
            game.Tools.child_align_center(l.getChildByName('btn_buy')),
            (l.getChildByName('xianding').visible =
              null != s.check_activity && s.check_activity > 0);
        }),
        (e.prototype.refresh_currency = function() {
          (this.currency_count = h.get_chest_currency(this.chest_id)),
            (this.label_count.text = this.currency_count.toString());
        }),
        e
      );
    })(),
    r = (function() {
      function e(t, e) {
        var i = this;
        (this.cells = []),
          (this.init_h = 0),
          (this.total_h = 0),
          (this.charas = []),
          (this.looks = []),
          (this.gifts = []),
          (this.used_cell_count = 0),
          (this.in_up = {}),
          (this.me = t),
          (this.father = e),
          (this.content = this.me.getChildByName('content')),
          (this.templete = this.content.getChildByName('templete')),
          (this.templete.visible = !1),
          (this.cells = []);
        for (
          var n = this.templete.scriptMap['capsui.UICopy'], a = 0;
          a < 150;
          a++
        ) {
          var r = n.getNodeClone();
          this.cells.push(r);
        }
        (this.container_character = this.content.getChildByName(
          'container_character'
        )),
          (this.container_look = this.content.getChildByName('container_look')),
          (this.container_present = this.content.getChildByName(
            'container_present'
          )),
          (this.scrollbar = this.me.getChildByName('scrollbar').scriptMap[
            'capsui.CScrollBar'
          ]),
          this.scrollbar.init(
            new Laya.Handler(this, function(t) {
              (i.content.vScrollBar.value = i.content.vScrollBar.max * t),
                i.onPanelScroll();
            })
          ),
          (this.content.vScrollBarSkin = ''),
          this.content.vScrollBar.on('change', this, this.onPanelScroll);
      }
      return (
        (e.prototype.onPanelScroll = function() {
          this.total_h < this.content.height
            ? this.scrollbar.setVal(0, 1)
            : this.scrollbar.setVal(
                this.content.vScrollBar.value / this.content.vScrollBar.max,
                this.content.height / this.total_h
              );
        }),
        (e.prototype.refresh_data = function(e) {
          var i = this,
            n = t.UI_Activity.onTreasureRateUpRetID(h.Inst.chest_id),
            a = 0 != n;
          this.in_up = {};
          var r = cfg.activity.chest_up.getGroup(n);
          r &&
            r.forEach(function(t) {
              if (t.chest_id == e)
                for (var n = t.up_items, a = 0; a < n.length; a++)
                  i.in_up[n[a]] = 1;
            }),
            (this.content.getChildByName('desc_chs').visible = !1),
            (this.content.getChildByName('desc_en').visible = !1),
            (this.content.getChildByName('desc_jp').visible = !1),
            (this.content.getChildByName('desc_chs_up').visible = !1),
            (this.content.getChildByName('desc_en_up').visible = !1),
            (this.content.getChildByName('desc_jp_up').visible = !1);
          var s = this.content.getChildByName(
            'desc_' + GameMgr.client_language + (a ? '_up' : '')
          );
          if (
            ((s.visible = !0),
            (this.init_h = s.height + 10),
            0 != this.used_cell_count)
          ) {
            for (c = 0; c < this.used_cell_count; c++)
              this.cells[c].visible = !1;
            this.used_cell_count = 0;
          }
          if (
            ((this.charas = []),
            (this.looks = []),
            (this.gifts = []),
            cfg.chest.preview.forEach(function(n) {
              if (
                n.chest_id == e &&
                (!n.check_activity ||
                  t.UI_Activity.activity_is_running(n.check_activity))
              )
                switch (n.type) {
                  case 'chara':
                    i.charas.push({
                      item_id: n.item_id,
                      check_activity: n.check_activity
                    });
                    break;
                  case 'skin':
                    i.looks.push({
                      item_id: n.item_id,
                      check_activity: n.check_activity
                    });
                    break;
                  case 'gift':
                    i.gifts.push({
                      item_id: n.item_id,
                      check_activity: n.check_activity
                    });
                }
            }),
            (this.total_h = this.init_h),
            (this.used_cell_count = 0),
            this.charas.length > 0)
          ) {
            (this.container_character.visible = !0),
              (this.container_character.y = this.total_h),
              (this.container_character.height =
                174 + 170 * (Math.ceil(this.charas.length / 6) - 1)),
              (this.total_h += this.container_character.height);
            for (
              var o = function(t) {
                  var e = l.charas[t].item_id,
                    n = l.charas[t].check_activity,
                    a = l.cells[l.used_cell_count++];
                  l.container_character.addChild(a),
                    (a.x = (t % 6) * 162 + 135),
                    (a.y = 15 + 175 * Math.floor(t / 6)),
                    (a.visible = !0);
                  var r = cfg.item_definition.character.find(e),
                    s = cfg.item_definition.skin.find(r.init_skin),
                    o = a.getChildByName('btn');
                  (o.clickHandler = Laya.Handler.create(
                    l,
                    function() {
                      (i.me.visible = !1),
                        i.father.page_character.show(i.charas, t);
                    },
                    null,
                    !1
                  )),
                    game.LoadMgr.setImgSkin(
                      o.getChildByName('icon'),
                      s.path + '/smallhead.png'
                    ),
                    (o.getChildByName('xianding').visible = null != n && n > 0),
                    (o.getChildByName('up').visible = l.in_up.hasOwnProperty(
                      e.toString()
                    ));
                },
                l = this,
                c = 0;
              c < this.charas.length;
              c++
            )
              o(c);
            this.total_h += 25;
          } else this.container_character.visible = !1;
          if (this.looks.length > 0) {
            (this.container_look.visible = !0),
              (this.container_look.y = this.total_h),
              (this.container_look.height =
                174 + 170 * (Math.ceil(this.looks.length / 6) - 1)),
              (this.total_h += this.container_look.height);
            for (
              var u = function(e) {
                  var i = _.looks[e].item_id,
                    n = _.looks[e].check_activity,
                    a = _.cells[_.used_cell_count++];
                  _.container_look.addChild(a),
                    (a.x = (e % 6) * 162 + 135),
                    (a.y = 15 + 175 * Math.floor(e / 6)),
                    (a.visible = !0);
                  var r = cfg.item_definition.item.find(i),
                    s = a.getChildByName('btn');
                  (s.clickHandler = Laya.Handler.create(
                    _,
                    function() {
                      t.UI_ItemDetail.Inst.show(i);
                    },
                    null,
                    !1
                  )),
                    game.LoadMgr.setImgSkin(s.getChildByName('icon'), r.icon),
                    (s.getChildByName('xianding').visible = null != n && n > 0),
                    (s.getChildByName('up').visible = _.in_up.hasOwnProperty(
                      i.toString()
                    ));
                },
                _ = this,
                c = 0;
              c < this.looks.length;
              c++
            )
              u(c);
            this.total_h += 25;
          } else this.container_look.visible = !1;
          if (this.gifts.length > 0) {
            (this.container_present.visible = !0),
              (this.container_present.y = this.total_h),
              (this.container_present.height =
                174 + 170 * (Math.ceil(this.gifts.length / 6) - 1)),
              (this.total_h += this.container_present.height);
            for (
              var d = function(e) {
                  var i = f.gifts[e].item_id,
                    n = f.gifts[e].check_activity,
                    a = f.cells[f.used_cell_count++];
                  f.container_present.addChild(a),
                    (a.x = (e % 6) * 162 + 135),
                    (a.y = 15 + 175 * Math.floor(e / 6)),
                    (a.visible = !0);
                  var r = cfg.item_definition.item.find(i),
                    s = a.getChildByName('btn');
                  (s.clickHandler = Laya.Handler.create(
                    f,
                    function() {
                      t.UI_ItemDetail.Inst.show(i);
                    },
                    null,
                    !1
                  )),
                    game.LoadMgr.setImgSkin(s.getChildByName('icon'), r.icon),
                    (s.getChildByName('xianding').visible = null != n && n > 0),
                    (s.getChildByName('up').visible = f.in_up.hasOwnProperty(
                      i.toString()
                    ));
                },
                f = this,
                c = 0;
              c < this.gifts.length;
              c++
            )
              d(c);
            this.total_h += 25;
          } else this.container_present.visible = !1;
          for (c = this.used_cell_count; c < this.cells.length; c++)
            this.cells[c].visible = !1;
          this.content.vScrollBar.stopScroll(),
            (this.content.vScrollBar.value = 0),
            this.content.refresh(),
            this.scrollbar.reset(),
            this.scrollbar.setVal(0, this.content.height / this.total_h);
        }),
        (e.prototype.show = function() {
          (this.me.visible = !0),
            t.UIBase.anim_alpha_in(this.me, { y: 30 }, 150);
        }),
        e
      );
    })(),
    s = (function() {
      function e(e, i) {
        var n = this;
        (this.head_cells = []),
          (this.locking = !1),
          (this.target_x = 0),
          (this.detail_height = 0),
          (this.me = e),
          (this.father = i),
          (this.container_right = this.me.getChildByName('right')),
          (this.btn_left = this.container_right.getChildByName('btn_left')),
          (this.btn_left.clickHandler = new Laya.Handler(this, function() {
            n._change_choose_target_x(n.target_x + 180);
          })),
          (this.btn_right = this.container_right.getChildByName('btn_right')),
          (this.btn_right.clickHandler = new Laya.Handler(this, function() {
            n._change_choose_target_x(n.target_x - 180);
          })),
          (this.panel_choose = this.container_right.getChildByName(
            'panel_choose'
          )),
          (this.container_choose = this.panel_choose.getChildByName(
            'container_choose'
          )),
          (this.head_templete = this.container_choose.getChildByName(
            'templete'
          )),
          (this.head_templete.visible = !1);
        for (
          var a = this.head_templete.scriptMap['capsui.UICopy'], r = 0;
          r < 16;
          r++
        ) {
          var s = a.getNodeClone();
          (s.visible = !1), this.head_cells.push(s);
        }
        var o = this.container_right.getChildByName('intro');
        (this.intro_content = o.getChildByName('content')),
          (this.intro_scorll = o.getChildByName('scrollbar').scriptMap[
            'capsui.CScrollBar'
          ]),
          this.intro_scorll.init(
            Laya.Handler.create(
              this,
              function(t) {
                n.intro_content.vScrollBar.value =
                  n.intro_content.vScrollBar.max * t;
              },
              null,
              !1
            )
          ),
          (this.intro_content.vScrollBarSkin = ''),
          this.intro_content.vScrollBar.on('change', this, function() {
            var t =
                n.intro_content.vScrollBar.value /
                n.intro_content.vScrollBar.max,
              e = n.intro_content.height / n.detail_height;
            n.intro_scorll.setVal(t, e);
          }),
          (this.container_left = this.me.getChildByName('left')),
          (this.container_illust = this.container_left.getChildByName(
            'container_illust'
          )),
          (this.illust_h = this.container_illust.getChildByName('illust_h')),
          (this.illust = new t.UI_Character_Skin(
            this.illust_h.getChildByName('illust')
          )),
          (this.illust_x = this.container_illust.x),
          (this.container_left.getChildByName(
            'btn_back'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              n.locking ||
                ((n.me.visible = !1), n.reset(), n.father.page_total.show());
            },
            null,
            !1
          ));
        var l = null;
        'chs' == GameMgr.client_language
          ? ((l = this.container_illust.getChildByName('container_name')),
            (this.container_illust.getChildByName(
              'container_name_en'
            ).visible = !1))
          : ((l = this.container_illust.getChildByName('container_name_en')),
            (this.container_illust.getChildByName(
              'container_name'
            ).visible = !1)),
          (this.label_name = l.getChildByName('label_name')),
          (this.label_cv = l.getChildByName('label_CV'));
      }
      return (
        (e.prototype.show = function(e, i) {
          var n = this;
          this.charas = e;
          for (
            var a = function(t) {
                var e = r.head_cells[t];
                if (t < r.charas.length) {
                  var a = r.charas[t].item_id,
                    s = cfg.item_definition.character.find(a),
                    o = cfg.item_definition.skin.find(s.init_skin);
                  e.visible = !0;
                  var l = e.getChildByName('btn');
                  (l.clickHandler = Laya.Handler.create(
                    r,
                    function() {
                      i != t &&
                        ((n.head_cells[i]
                          .getChildByName('btn')
                          .getChildByName('chosen').visible = !1),
                        (i = t),
                        (e
                          .getChildByName('btn')
                          .getChildByName('chosen').visible = !0),
                        n._refresh_detail(a, !1));
                    },
                    null,
                    !1
                  )),
                    (l.getChildByName('chosen').visible = t == i),
                    game.LoadMgr.setImgSkin(
                      l.getChildByName('icon'),
                      o.path + '/smallhead.png'
                    ),
                    (e.x = e.width * t);
                } else e.visible = !1;
              },
              r = this,
              s = 0;
            s < this.head_cells.length;
            s++
          )
            a(s);
          this._refresh_detail(e[i].item_id, !0),
            (this.container_choose.width = this.head_cells[0].width * e.length),
            (this.container_choose.x = 0),
            this._refresh_leftright_btn(),
            (this.me.visible = !0),
            (this.locking = !0),
            t.UIBase.anim_alpha_in(this.container_left, { x: -30 }, 150),
            t.UIBase.anim_alpha_in(
              this.container_right,
              { x: 30 },
              150,
              0,
              Laya.Handler.create(this, function() {
                n.locking = !1;
              })
            );
        }),
        (e.prototype.reset = function() {
          this.audio_channel &&
            (this.audio_channel.stop(), (this.audio_channel = null)),
            Laya.Tween.clearAll(this.container_choose),
            this.illust.clear();
        }),
        (e.prototype._refresh_detail = function(t, e) {
          var i = this;
          this.audio_channel &&
            (this.audio_channel.stop(), (this.audio_channel = null)),
            this.illust.clear();
          var n = cfg.item_definition.character.find(t);
          (this.label_name.text = n['name_' + GameMgr.client_language]),
            'chs' == GameMgr.client_language
              ? (this.label_cv.text =
                  'CV' + n['desc_cv_' + GameMgr.client_language])
              : (this.label_cv.text =
                  'CV:' + n['desc_cv_' + GameMgr.client_language]);
          var a = this.intro_content.getChildByName('container_text');
          if (
            ((a.getChildByName('height').text =
              n['desc_stature_' + GameMgr.client_language]),
            (a.getChildByName('birth').text =
              n['desc_birth_' + GameMgr.client_language]),
            (a.getChildByName('age').text =
              n['desc_age_' + GameMgr.client_language]),
            (a.getChildByName('bloodtype').text = n.desc_bloodtype),
            (a.getChildByName('cv').text =
              n['desc_cv_' + GameMgr.client_language]),
            (a.getChildByName('hobby').text =
              n['desc_hobby_' + GameMgr.client_language]),
            (a.getChildByName('desc').text =
              n['desc_' + GameMgr.client_language]),
            'en' == GameMgr.client_language)
          ) {
            var r = [
              new Laya.ColorFilter([
                0.7,
                0,
                0,
                0,
                0,
                0,
                0.7,
                0,
                0,
                0,
                0,
                0,
                0.7,
                0,
                0,
                0,
                0,
                0,
                1,
                0
              ])
            ];
            (a.getChildByName('height').font = 'en_shuhun'),
              (a.getChildByName('height').filters = r),
              (a.getChildByName('birth').font = 'en_shuhun'),
              (a.getChildByName('birth').filters = r),
              (a.getChildByName('age').font = 'en_shuhun'),
              (a.getChildByName('age').filters = r),
              (a.getChildByName('bloodtype').font = 'en_shuhun'),
              (a.getChildByName('bloodtype').filters = r),
              (a.getChildByName('cv').font = 'en_shuhun'),
              (a.getChildByName('cv').filters = r),
              (a.getChildByName('hobby').font = 'en_shuhun'),
              (a.getChildByName('hobby').filters = r),
              (a.getChildByName('desc').font = 'en_shuhun'),
              (a.getChildByName('desc').filters = r);
          }
          for (f = 0; f < 12; f += 2) {
            var s = a.getChildAt(f);
            a.getChildAt(f + 1).x = s.textField.textWidth * s.scaleX + s.x + 10;
          }
          var o =
              a.getChildByName('desc').textField.textHeight *
              a.getChildByName('desc').scaleY,
            l = this.intro_content.getChildByName('audio');
          (l.y = 340 + o), (this.detail_height = 560 + o);
          for (
            var h = ['lobby_selfintro', 'lobby_playerlogin', 'lobby_normal'],
              c = [],
              u = -1,
              _ = function(e) {
                var n = l
                    .getChildByName('audio' + e)
                    .getChildByName('btn_play'),
                  a = n.getChildByName('img');
                (a.skin = game.Tools.localUISrc('myres/bothui/bf_play.png')),
                  c.push(a),
                  (n.clickHandler = Laya.Handler.create(
                    d,
                    function() {
                      if (u == e)
                        i.audio_channel &&
                          (i.audio_channel.stop(), (i.audio_channel = null)),
                          (u = -1),
                          (a.skin = game.Tools.localUISrc(
                            'myres/bothui/bf_play.png'
                          ));
                      else {
                        -1 != u &&
                          (i.audio_channel &&
                            (i.audio_channel.stop(), (i.audio_channel = null)),
                          (c[u].skin = game.Tools.localUISrc(
                            'myres/bothui/bf_play.png'
                          )),
                          (u = -1)),
                          (u = e),
                          (a.skin = game.Tools.localUISrc(
                            'myres/bothui/bf_pause.png'
                          ));
                        var n = view.AudioMgr.PlayCharactorSound(
                          { charid: t, level: 1 },
                          h[e],
                          Laya.Handler.create(i, function() {
                            i.audio_channel &&
                              (i.audio_channel.stop(),
                              (i.audio_channel = null)),
                              (u = -1),
                              (a.skin = game.Tools.localUISrc(
                                'myres/bothui/bf_play.png'
                              ));
                          })
                        );
                        i.audio_channel = n.sound;
                      }
                    },
                    null,
                    !1
                  ));
              },
              d = this,
              f = 0;
            f < 3;
            f++
          )
            _(f);
          switch (
            (this.intro_content.vScrollBar.stopScroll(),
            this.intro_content.refresh(),
            this.intro_scorll.reset(),
            this.intro_scorll.setVal(
              0,
              this.intro_content.height / this.detail_height
            ),
            (this.intro_content.vScrollBar.value = 0),
            t)
          ) {
            case 200005:
              this.illust_h.y = -40;
              break;
            case 200006:
              this.illust_h.y = -60;
              break;
            case 200009:
              this.illust_h.y = -50;
              break;
            case 200011:
            case 200014:
              this.illust_h.y = -80;
              break;
            default:
              this.illust_h.y = 0;
          }
          this.illust.setSkin(n.init_skin, 'full'),
            e
              ? ((this.container_illust.alpha = 1),
                (this.container_illust.x = this.illust_x))
              : ((this.container_illust.x = this.illust_x - 50),
                (this.container_illust.alpha = 0),
                Laya.Tween.to(
                  this.container_illust,
                  { x: this.illust_x, alpha: 1 },
                  400,
                  Laya.Ease.strongOut,
                  null,
                  0,
                  !0
                ));
        }),
        (e.prototype._refresh_leftright_btn = function() {
          this.container_choose.x >= 0
            ? ((this.container_choose.x = 0), (this.btn_left.visible = !1))
            : (this.btn_left.visible = !0),
            this.container_choose.width <= this.panel_choose.width
              ? (this.btn_right.visible = !1)
              : this.container_choose.x <=
                this.panel_choose.width - this.container_choose.width
              ? ((this.container_choose.x =
                  this.panel_choose.width - this.container_choose.width),
                (this.btn_right.visible = !1))
              : (this.btn_right.visible = !0);
        }),
        (e.prototype._change_choose_target_x = function(t) {
          var e = this;
          if (
            (t > 0 && (t = 0),
            this.container_choose.width > this.panel_choose.width &&
              t < this.panel_choose.width - this.container_choose.width &&
              (t = this.panel_choose.width - this.container_choose.width),
            this._refresh_leftright_btn(),
            (this.target_x = t),
            Laya.Tween.clearAll(this.container_choose),
            t != this.container_choose.x)
          ) {
            var i = Math.abs(t - this.container_choose.x) / 0.5;
            Laya.Tween.to(
              this.container_choose,
              { x: t },
              i,
              null,
              Laya.Handler.create(this, function() {
                e._refresh_leftright_btn();
              })
            );
          }
        }),
        e
      );
    })(),
    o = (function() {
      function e(t) {
        var e = this;
        (this.locking = !1),
          (this.me = t),
          (this.btn_close = this.me.getChildByName('btn_close')),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            !1
          )),
          (this.page_total = new r(this.me.getChildByName('page_total'), this)),
          (this.page_character = new s(
            this.me.getChildByName('page_character'),
            this
          ));
      }
      return (
        (e.prototype.show = function(e) {
          var i = this;
          (this.chest_id = e),
            this.page_total.refresh_data(e),
            (this.page_total.me.visible = !0),
            (this.page_character.me.visible = !1),
            (this.locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_alpha_in(
              this.me,
              { y: 30 },
              150,
              0,
              Laya.Handler.create(this, function() {
                i.locking = !1;
              })
            );
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_alpha_out(
              this.me,
              { y: 30 },
              150,
              0,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.me.visible = !1), e.page_character.reset();
              })
            );
        }),
        e
      );
    })(),
    l = (function() {
      function e(e) {
        var i = this;
        (this.locking = !1),
          (this.id = 0),
          (this.count = 0),
          (this.me = e),
          (this.root = e.getChildByName('root')),
          (this.label_num0 = this.root.getChildByName('num0')),
          (this.label_num1 = this.root.getChildByName('num1')),
          (this.label_num2 = this.root.getChildByName('num2')),
          (this.label_num3 = this.root.getChildByName('num3')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, function() {
            i.locking || i.close();
          })),
          (this.root.getChildByName(
            'btn_cancel'
          ).clickHandler = new Laya.Handler(this, function() {
            i.locking || i.close();
          })),
          (this.root.getChildByName('btn_cancel').filters = [
            new Laya.ColorFilter(t.GRAY_FILTER)
          ]),
          (this.root.getChildByName(
            'btn_confirm'
          ).clickHandler = new Laya.Handler(this, function() {
            i.locking ||
              (app.NetAgent.sendReq2Lobby(
                'Lobby',
                'exchangeChestStone',
                { id: i.id, count: i.count },
                function(e, i) {
                  e || i.error
                    ? t.UIMgr.Inst.showNetReqError('exchangeChestStone', e, i)
                    : t.UI_LightTips.Inst.show(
                        game.Tools.strOfLocalization(2191)
                      );
                }
              ),
              i.close());
          }));
      }
      return (
        (e.prototype.show = function(e) {
          var i = this;
          (this.id = 3001), (this.count = Math.ceil(e / 200));
          var n = cfg.exchange.searchexchange.find(this.id);
          (this.label_num0.text = (n.source_value * this.count).toString()),
            (this.label_num1.text = (n.target_value * this.count).toString()),
            (this.label_num2.text = (n.source_value * this.count).toString()),
            (this.label_num3.text = (n.target_value * this.count).toString()),
            (this.locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                i.locking = !1;
              })
            );
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.me.visible = !1);
              })
            );
        }),
        e
      );
    })(),
    h = (function(i) {
      function n() {
        var t = i.call(this, new ui.lobby.treasureUI()) || this;
        return (
          (t.tab_index = 0),
          (t.map_img = {}),
          (t.last_seen_up_activity = null),
          (n.Inst = t),
          t
        );
      }
      return (
        __extends(n, i),
        (n.on_chest_count_change = function(t) {
          for (var e = 0; e < t.length; e++)
            this.chest_count[t[e].faith_id] ||
              (this.chest_count[t[e].faith_id] = { total: 0, consume: 0 }),
              t[e].consume_count &&
                (this.chest_count[t[e].faith_id].consume = t[e].consume_count),
              t[e].total_open_count &&
                (this.chest_count[t[e].faith_id].total = t[e].total_open_count);
          this.Inst && this.Inst.enable && this.Inst.refresh_currency();
        }),
        (n.get_chest_currency = function(t) {
          if (!this.chest_count[t]) return 0;
          var e = this.chest_count[t].total - this.chest_count[t].consume;
          return e < 0 && (e = 0), e;
        }),
        (n.prototype.have_red_point = function() {
          if (!this.last_seen_up_activity) {
            this.last_seen_up_activity = {};
            var e = game.Tools.dddsss(
              Laya.LocalStorage.getItem(
                'treasure_up_' + GameMgr.Inst.account_id
              )
            );
            if (e)
              for (var i = e.split(','), n = 0; n < i.length; n++)
                this.last_seen_up_activity[i[n]] = 1;
          }
          var a = 1e3;
          'chs' != GameMgr.client_language && (a += 1);
          var r = t.UI_Activity.onTreasureRateUpRetID(a),
            s = t.UI_Activity.onTreasureRateUpRetID(a + 2);
          return (
            !(!r || this.last_seen_up_activity[r]) ||
            !(!s || this.last_seen_up_activity[s])
          );
        }),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.contianer_content = this.me.getChildByName('content')),
            (this.tabs = []);
          for (
            var n = function(t) {
                var e = r.contianer_content
                  .getChildByName('tabs')
                  .getChildByName('tab' + t);
                r.tabs.push(e),
                  (e.clickHandler = new Laya.Handler(r, function() {
                    i.locking || (i.tab_index != t && i.change_tab(t));
                  }));
              },
              r = this,
              s = 0;
            s < 2;
            s++
          )
            n(s);
          (this.img_head = this.contianer_content.getChildByName('head')),
            (this.contianer_content.getChildByName(
              'btn_xiangqing'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                i.tips.show(1e3);
              },
              null,
              !1
            )),
            (this.contianer_content.getChildByName(
              'btn_xiangqing'
            ).visible = !1),
            (this.container_top = this.me.getChildByName('top')),
            (this.container_top.getChildByName(
              'btn_back'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                i.locking ||
                  i.close(
                    Laya.Handler.create(i, function() {
                      t.UI_Lobby.Inst.enable = !0;
                    })
                  );
              },
              null,
              !1
            )),
            (this.money = new t.UI_Money(
              this.container_top,
              Laya.Handler.create(this, this.close, null, !1),
              Laya.Handler.create(
                this,
                function() {
                  return i.locking;
                },
                null,
                !1
              )
            )),
            (this.tips = new e(this.me.getChildByName('tips'))),
            (this.xy = new a(
              this.me.getChildByName('xy'),
              this.me.getChildByName('pop_buy_single'),
              this.me.getChildByName('pop_buy_multi')
            )),
            (this.me.getChildByName('pop_buy_xunmi_chs').visible = !1),
            (this.me.getChildByName('pop_buy_huiyu_jp').visible = !1),
            (this.buy_xunmi = new l(
              this.me.getChildByName('pop_buy_xunmi_chs')
            ));
          var h = this.contianer_content.getChildByName('container_shop');
          (this.label_currency = h
            .getChildByName('btn_shop')
            .getChildByName('count')),
            (h.getChildByName('btn_shop').clickHandler = Laya.Handler.create(
              this,
              function() {
                i.locking ||
                  i.xy.show(cfg.chest.chest.get(i.chest_id).faith_id);
              },
              null,
              !1
            )),
            (h.getChildByName('btn_what').clickHandler = Laya.Handler.create(
              this,
              function() {
                i.tips.showinfo(game.Tools.strOfLocalization(55));
              },
              null,
              !1
            )),
            (h.getChildByName('btn_what').visible = !1),
            (this.preview = new o(this.me.getChildByName('preview'))),
            (this.contianer_content.getChildByName(
              'btn_preview'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                i.preview.show(i.chest_id);
              },
              null,
              !1
            )),
            (this.xyexchange = this.contianer_content
              .getChildByName('container_shop')
              .getChildByName('btn_xy')),
            (this.locking = !1);
        }),
        (n.prototype.show = function() {
          var e = this;
          (this.enable = !0),
            (this.locking = !0),
            t.UIBase.anim_alpha_in(this.contianer_content, { y: 30 }, 150),
            t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
            (this.tips.me.visible = !1),
            (this.preview.me.visible = !1),
            (this.xy.me.visible = !1),
            (this.buy_xunmi.me.visible = !1),
            'chs' == GameMgr.client_language &&
              (this.container_top.getChildByName(
                'container_xinyang'
              ).visible = !1),
            Laya.timer.once(150, this, function() {
              e.locking = !1;
            }),
            (this.map_img = {}),
            this.change_tab(0);
          var i = 1e3;
          'chs' != GameMgr.client_language && (i += 1);
          var n = t.UI_Activity.onTreasureRateUpRetID(i),
            a = t.UI_Activity.onTreasureRateUpRetID(i + 2);
          (this.last_seen_up_activity = {}),
            n && (this.last_seen_up_activity[n] = 1),
            a && (this.last_seen_up_activity[a] = 1);
          var r = '';
          for (var s in this.last_seen_up_activity)
            '' != r && (r += ','), (r += s);
          Laya.LocalStorage.setItem(
            'treasure_up_' + GameMgr.Inst.account_id,
            game.Tools.eeesss(r)
          );
        }),
        (n.prototype.change_tab = function(t) {
          this.tab_index = t;
          for (var e = 0; e < 2; e++)
            (this.tabs[e].getChildAt(0).skin = game.Tools.localUISrc(
              'myres/treasure/treasure_btn' +
                e +
                '_' +
                (e == t ? 'chosed' : 'unchose') +
                '.png'
            )),
              (this.tabs[e].mouseEnabled = e != t);
          this.refresh_show();
        }),
        (n.prototype.refresh_show = function() {
          var e = this,
            i = 1e3 + 2 * this.tab_index;
          'chs' != GameMgr.client_language && i++, (this.chest_id = i);
          var a = cfg.chest.chest.get(this.chest_id).faith_id;
          this.label_currency.text = n.get_chest_currency(a).toString();
          var r = cfg.chest.chest.get(i),
            s = t.UI_Activity.onTreasureRateUp(this.chest_id);
          '' != s
            ? (game.LoadMgr.setImgSkin(this.img_head, s), (this.map_img[s] = 1))
            : (game.LoadMgr.setImgSkin(this.img_head, r.img),
              (this.map_img[r.img] = 1)),
            (this.contianer_content
              .getChildByName('container1')
              .getChildByName('txt1').text = game.Tools.strOfLocalization(
              2708
            )),
            (this.contianer_content
              .getChildByName('container1')
              .getChildByName('txt2').text = game.Tools.strOfLocalization(
              2709
            )),
            (this.contianer_content
              .getChildByName('container10')
              .getChildByName('txt1').text = game.Tools.strOfLocalization(
              2710
            )),
            (this.contianer_content
              .getChildByName('container10')
              .getChildByName('txt2').text = game.Tools.strOfLocalization(
              2711
            ));
          var o = r.ticket_id,
            l = 0;
          o && (l = t.UI_Bag.get_item_count(o));
          var h = function(t) {
              var e = t.getChildByName('txt1'),
                i = t.getChildByName('txt2'),
                n = t.getChildByName('icon'),
                a =
                  e.textField.textWidth +
                  10 +
                  n.width +
                  10 +
                  i.textField.textWidth;
              (e.x = 360 - a / 2),
                (n.x = e.x + e.textField.textWidth + 10),
                (i.x = n.x + n.width + 10);
            },
            c = this.contianer_content.getChildByName('container1');
          if ((h(c), l >= 1)) {
            _ = c.getChildByName('btn_tanfang').getChildByName('price');
            game.LoadMgr.setImgSkin(
              _.getChildByName('icon'),
              cfg.item_definition.item.get(o).icon_transparent
            ),
              (_.getChildByName('count').text = 'x1'),
              game.Tools.child_align_center(_);
          } else {
            _ = c.getChildByName('btn_tanfang').getChildByName('price');
            (d = cfg.item_definition.item.get(r.currency)) &&
              game.LoadMgr.setImgSkin(
                _.getChildByName('icon'),
                d.icon_transparent
              );
            (f = cfg.item_definition.currency.get(r.currency)) &&
              game.LoadMgr.setImgSkin(_.getChildByName('icon'), f.icon),
              (_.getChildByName('count').text = 'x' + r.price),
              game.Tools.child_align_center(_);
          }
          c.getChildByName('btn_tanfang').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : l >= 1
                ? t.UI_TanfangRoot.Inst.show(i, 1, !0)
                : t.UI_Bag.get_item_count(302014) < r.price
                ? e.buy_xunmi.show(r.price - t.UI_Bag.get_item_count(302014))
                : t.UI_TanfangRoot.Inst.show(i, 1, !1);
            },
            null,
            !1
          );
          var u = this.contianer_content.getChildByName('container10');
          if ((h(u), l >= 10)) {
            _ = u.getChildByName('btn_tanfang').getChildByName('price');
            game.LoadMgr.setImgSkin(
              _.getChildByName('icon'),
              cfg.item_definition.item.get(o).icon_transparent
            ),
              (_.getChildByName('count').text = 'x10'),
              game.Tools.child_align_center(_);
          } else {
            var _ = u.getChildByName('btn_tanfang').getChildByName('price'),
              d = cfg.item_definition.item.get(r.currency);
            d &&
              game.LoadMgr.setImgSkin(
                _.getChildByName('icon'),
                d.icon_transparent
              );
            var f = cfg.item_definition.currency.get(r.currency);
            f && game.LoadMgr.setImgSkin(_.getChildByName('icon'), f.icon),
              (_.getChildByName('count').text = 'x' + r.price10),
              game.Tools.child_align_center(_);
          }
          (u.getChildByName('btn_tanfang').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UI_PiPeiYuYue.Inst.enable
                ? t.UI_Popout.PopOutNoTitle(
                    game.Tools.strOfLocalization(204),
                    null
                  )
                : l >= 10
                ? t.UI_TanfangRoot.Inst.show(i, 10, !0)
                : t.UI_Bag.get_item_count(302014) < r.price10
                ? e.buy_xunmi.show(r.price10 - t.UI_Bag.get_item_count(302014))
                : t.UI_TanfangRoot.Inst.show(i, 10, !1);
            },
            null,
            !1
          )),
            this.money.onEnable(),
            this.money.label_xinyang &&
              (this.money.label_xinyang.text = n
                .get_chest_currency(a)
                .toString()),
            ('jp' != GameMgr.client_language &&
              'en' != GameMgr.client_language) ||
              this.jpproject();
        }),
        (n.prototype.jpproject = function() {
          var e = this,
            i = this.contianer_content.getChildByName('container_shop'),
            n = this.contianer_content
              .getChildByName('container1')
              .getChildByName('txt1'),
            a = this.contianer_content
              .getChildByName('container1')
              .getChildByName('txt2'),
            r = this.contianer_content
              .getChildByName('container10')
              .getChildByName('txt1'),
            s = this.contianer_content
              .getChildByName('container10')
              .getChildByName('txt2');
          (i.getChildByName('btn_shop').visible = !1),
            (i.getChildByName('btn_what').visible = !1),
            (this.container_top.getChildByName(
              'container_huishi'
            ).visible = !1),
            (this.xyexchange.visible = !0),
            (this.xyexchange.getChildByName(
              'count'
            ).text = game.Tools.strOfLocalization(2712)),
            (this.xyexchange.clickHandler = Laya.Handler.create(
              this,
              function() {
                e.locking ||
                  e.xy.show(cfg.chest.chest.get(e.chest_id).faith_id);
              },
              null,
              !1
            ));
          var o = this.contianer_content
              .getChildByName('container1')
              .getChildByName('btn_tanfang')
              .getChildByName('price'),
            l = this.contianer_content
              .getChildByName('container10')
              .getChildByName('btn_tanfang')
              .getChildByName('price');
          (n.fontSize = 27),
            (a.fontSize = 27),
            (r.fontSize = 27),
            (s.fontSize = 27);
          var h = 1001;
          1 == this.tab_index && (h += 2), (this.chest_id = h);
          var c = cfg.chest.chest.get(h),
            u = c.ticket_id,
            _ = 0;
          u && (_ = t.UI_Bag.get_item_count(u));
          var d = function(t) {
            var e = t.getChildByName('txt1'),
              i = t.getChildByName('txt2'),
              n = t.getChildByName('icon'),
              a =
                e.textField.textWidth +
                10 +
                n.width +
                10 +
                i.textField.textWidth;
            (e.x = 360 - a / 2),
              (n.x = e.x + e.textField.textWidth + 10),
              (i.x = n.x + n.width + 10);
          };
          d(this.contianer_content.getChildByName('container1')),
            d(this.contianer_content.getChildByName('container10')),
            _ >= 1
              ? (game.LoadMgr.setImgSkin(
                  o.getChildByName('icon'),
                  cfg.item_definition.item.get(u).icon_transparent
                ),
                (o.getChildByName('count').text = 'x1'),
                game.Tools.child_align_center(o))
              : (game.LoadMgr.setImgSkin(
                  o.getChildByName('icon'),
                  cfg.item_definition.currency.find(c.currency).icon
                ),
                (o.getChildByName('count').text = 'x' + c.price),
                game.Tools.child_align_center(o)),
            _ >= 10
              ? (game.LoadMgr.setImgSkin(
                  l.getChildByName('icon'),
                  cfg.item_definition.item.get(u).icon_transparent
                ),
                (l.getChildByName('count').text = 'x10'),
                game.Tools.child_align_center(l))
              : (game.LoadMgr.setImgSkin(
                  l.getChildByName('icon'),
                  cfg.item_definition.currency.find(c.currency).icon
                ),
                (l.getChildByName('count').text = 'x' + c.price10),
                game.Tools.child_align_center(l));
          var f = this.me
            .getChildByName('pop_buy_huiyu_jp')
            .getChildByName('root');
          (f.getChildByName('btn_close').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.UIBase.anim_pop_hide(
                f,
                Laya.Handler.create(e, function() {
                  (e.locking = !1),
                    (e.me.getChildByName('pop_buy_huiyu_jp').visible = !1);
                })
              );
            },
            null,
            !1
          )),
            (f.getChildByName('btn_confirm').clickHandler = Laya.Handler.create(
              this,
              function() {
                e.locking ||
                  (Laya.Handler.create(e, e.close, null, !1) &&
                    Laya.Handler.create(e, e.close, null, !1).runWith(
                      Laya.Handler.create(
                        e,
                        function() {
                          t.UI_Recharge.Inst.show('huiyu'),
                            (e.me.getChildByName(
                              'pop_buy_huiyu_jp'
                            ).visible = !1);
                        },
                        null,
                        !1
                      )
                    ));
              }
            )),
            (f.getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UIBase.anim_pop_hide(
                  f,
                  Laya.Handler.create(e, function() {
                    (e.locking = !1),
                      (e.me.getChildByName('pop_buy_huiyu_jp').visible = !1);
                  })
                );
              },
              null,
              !1
            )),
            (f.getChildByName('btn_cancel').filters = [
              new Laya.ColorFilter(t.GRAY_FILTER)
            ]),
            (f.getChildByName('content').text = game.Tools.strOfLocalization(
              2673
            )),
            (this.contianer_content
              .getChildByName('container1')
              .getChildByName('btn_tanfang').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : _ >= 1
                  ? t.UI_TanfangRoot.Inst.show(h, 1, !0)
                  : t.UI_Bag.get_item_count(100001) < c.price
                  ? ((e.me.getChildByName('pop_buy_huiyu_jp').visible = !0),
                    (e.locking = !0),
                    t.UIBase.anim_pop_out(
                      f,
                      Laya.Handler.create(e, function() {
                        e.locking = !1;
                      })
                    ))
                  : t.UI_TanfangRoot.Inst.show(h, 1, !1);
              },
              null,
              !1
            )),
            (this.contianer_content
              .getChildByName('container10')
              .getChildByName('btn_tanfang').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : _ >= 10
                  ? t.UI_TanfangRoot.Inst.show(h, 10, !0)
                  : t.UI_Bag.get_item_count(100001) < c.price10
                  ? ((e.me.getChildByName('pop_buy_huiyu_jp').visible = !0),
                    (e.locking = !0),
                    t.UIBase.anim_pop_out(
                      f,
                      Laya.Handler.create(e, function() {
                        e.locking = !1;
                      })
                    ))
                  : t.UI_TanfangRoot.Inst.show(h, 10, !1);
              },
              null,
              !1
            ));
        }),
        (n.prototype.close = function(e) {
          var i = this;
          (this.locking = !0),
            t.UIBase.anim_alpha_out(this.contianer_content, { y: 30 }, 150),
            t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
            (this.tips.me.visible = !1),
            this.preview.me.visible && this.preview.close(),
            this.xy.me.visible && this.xy.close(),
            Laya.timer.once(150, this, function() {
              (i.locking = !1), (i.enable = !1), e && e.run();
            });
        }),
        (n.prototype.onDisable = function() {
          for (var t in this.map_img) Laya.loader.clearTextureRes(t);
          game.LoadMgr.clearImgSkin(this.img_head), (this.img_head.skin = '');
        }),
        (n.prototype.refresh_currency = function() {
          (this.label_currency.text = n
            .get_chest_currency(cfg.chest.chest.get(this.chest_id).faith_id)
            .toString()),
            this.xy.me.visible && this.xy.refresh_currency();
        }),
        (n.chest_count = {}),
        n
      );
    })(t.UIBase);
  t.UI_Treasure = h;
})(uiscript || (uiscript = {}));