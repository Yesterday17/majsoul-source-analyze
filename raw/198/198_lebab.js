const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (() => {
      function e(t) {
        const e = this;
        (this.me = t),
          (this.root = this.me.getChildByName('root')),
          (this.name = this.root.getChildByName('label_name')),
          (this.desc = this.root.getChildByName('desc')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
            },
            null,
            !1
          )),
          (this.container_item = this.root.getChildByName('item')),
          (this.buyed = this.container_item.getChildByName('buyed')),
          (this.icon = this.container_item.getChildByName('icon')),
          (this.container_price = this.root.getChildByName('price')),
          (this.btn_buy = this.root.getChildByName('btn_buy'));
      }
      return (e.prototype.show_recharge = function(e, i) {
        const n = this;
        (this.me.visible = !0), t.UIBase.anim_pop_out(this.root, null);
        let a;
        cfg.mall.goods_shelves.getGroup(e).forEach(t => {
          t.goods_id == i && (a = t);
        });
        const r = cfg.mall.goods.get(i);
        (this.name.text = r.name),
          (this.desc.text = r.desc),
          game.LoadMgr.setImgSkin(this.icon, r.icon),
          (this.container_price.getChildByName('icon').visible = !1);
        let s = null;
        c.Inst.app_shop && (s = c.Inst.app_shop.getGoodsInfo(i)),
          (this.container_price.getChildByName('count').text = s
            ? s.price
            : a.price),
          game.Tools.child_align_center(this.container_price, [20]),
          (this.buyed.visible = !1),
          game.Tools.setGrayDisable(this.container_item, !1),
          game.Tools.setGrayDisable(this.btn_buy, !1),
          (this.btn_buy.clickHandler = Laya.Handler.create(
            this,
            () => {
              n.close(),
                game.Tools.setGrayDisable(n.btn_buy, !0),
                c.Inst.want_to_recharge(i);
            },
            null,
            !1
          ));
      }),
      (e.prototype.show_exchange = function(e) {
        const i = this;
        (this.me.visible = !0), t.UIBase.anim_pop_out(this.root, null);
        const n = cfg.exchange.exchange.get(e);
        (this.name.text = n[`name_${GameMgr.client_language}`]),
          (this.desc.text = n[`desc_${GameMgr.client_language}`]),
          game.LoadMgr.setImgSkin(this.icon, n.icon),
          (this.container_price.getChildByName(
            'icon'
          ).skin = game.LoadMgr.getResImageSkin(
            cfg.item_definition.currency.get(n.source_currency).icon
          )),
          (this.container_price.getChildByName('icon').visible = !0);
        const a = t.UI_Bag.get_item_count(n.source_currency);
        (this.buyed.visible = !1),
          game.Tools.setGrayDisable(this.container_item, !1),
          game.Tools.setGrayDisable(this.btn_buy, a < n.source_value);
        const r = this.container_price.getChildByName('count');
        (r.text = n.source_value.toString()),
          (r.color = a < n.source_value ? '#ff0000' : '#00ff00'),
          game.Tools.child_align_center(this.container_price),
          (this.btn_buy.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.close(),
                game.Tools.setGrayDisable(i.btn_buy, !0),
                c.Inst.want_to_exchange(e);
            },
            null,
            !1
          ));
      }),
      (e.prototype.show_searchexchange = function(e) {
        const i = this;
        (this.me.visible = !0), t.UIBase.anim_pop_out(this.root, null);
        const n = cfg.exchange.searchexchange.get(e);
        (this.name.text = n[`name_${GameMgr.client_language}`]),
          (this.desc.text = n[`desc_${GameMgr.client_language}`]),
          game.LoadMgr.setImgSkin(this.icon, n.icon),
          (this.container_price.getChildByName(
            'icon'
          ).skin = game.LoadMgr.getResImageSkin(
            cfg.item_definition.currency.get(n.source_currency).icon
          )),
          (this.container_price.getChildByName('icon').visible = !0);
        const a = t.UI_Bag.get_item_count(n.source_currency);
        (this.buyed.visible = !1),
          game.Tools.setGrayDisable(this.container_item, !1),
          game.Tools.setGrayDisable(this.btn_buy, a < n.source_value);
        const r = this.container_price.getChildByName('count');
        (r.text = n.source_value.toString()),
          (r.color = a < n.source_value ? '#ff0000' : '#00ff00'),
          game.Tools.child_align_center(this.container_price),
          (this.btn_buy.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.close(),
                game.Tools.setGrayDisable(i.btn_buy, !0),
                c.Inst.want_to_searchexchange(e);
            },
            null,
            !1
          ));
      }),
      (e.prototype.close = function() {
        const e = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.me.visible = !1;
          })
        );
      }),
      e
    ;
    })();

  const i = (() => {
    function e(t) {
      const e = this;
      (this.current_id = 0),
        (this.my_vip_id = 0),
        (this.me = t),
        (this.container_title = t.getChildByName('container_title')),
        (this.current_title_big = this.container_title.getChildByName(
          'current_title_big'
        )),
        (this.current_title_small = t
          .getChildByName('container_next')
          .getChildByName('current_title_small')),
        (this.next_title = t
          .getChildByName('container_next')
          .getChildByName('next_title')),
        (this.next_info = t
          .getChildByName('container_next')
          .getChildByName('next_info')),
        (this.label_infos = []);
      for (
        let i = t.getChildByName('container_infos'), n = 0;
        n < i.numChildren;
        n++
      )
        this.label_infos.push(i.getChildAt(n));
      (this.label_require = t.getChildByName('require')),
        (this.label_value = t.getChildByName('value')),
        (this.btn_left = t.getChildByName('btn_left')),
        (this.btn_left.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.current_id--, e.refresh();
          },
          null,
          !1
        )),
        (this.btn_right = t.getChildByName('btn_right')),
        (this.btn_right.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.current_id++, e.refresh();
          },
          null,
          !1
        )),
        (this.container_bar = t.getChildByName('bar').getChildByName('v')),
        (this.bar_v = t.getChildByName('bar').getChildByName('v').mask),
        (this.btn_get_reward = t.getChildByName('btn_get_reward')),
        (this.container_reward = t.getChildByName('container_reward'));
    }
    return (e.prototype.show = function() {
      const t = this;
      this.me.visible = !0;
      let e = 0;
      GameMgr.Inst.account_data.vip && (e = GameMgr.Inst.account_data.vip),
        (this.current_id = 1),
        cfg.vip.vip.forEach(({charge, id}) => {
          e >= charge && (t.current_id = id);
        }),
        (this.my_vip_id = this.current_id);
      const i = cfg.vip.vip.get(this.current_id);
      if (i) {
        const n = cfg.vip.vip.get(this.current_id + 1);
        n
          ? ((this.label_value.text =
              `${e.toString()}/${n.charge.toString()}`),
            (this.bar_v.width = (this.container_bar.width * e) / n.charge),
            game.LoadMgr.setImgSkin(this.current_title_small, i.img),
            game.LoadMgr.setImgSkin(this.next_title, n.img),
            (this.next_info.text = game.Tools.strOfLocalization(2158, [
              (n.charge - e).toString()
            ])),
            (this.next_info.visible = !0),
            (this.next_title.visible = !0),
            game.Tools.child_align_center(
              this.me.getChildByName('container_next'),
              [0, 30, 0]
            ))
          : ((this.label_value.text = e.toString()),
            (this.bar_v.width = this.container_bar.width),
            game.LoadMgr.setImgSkin(this.current_title_small, i.img),
            (this.next_info.visible = !1),
            (this.next_title.visible = !1),
            game.Tools.child_align_center(
              this.me.getChildByName('container_next'),
              [0, 30, 0]
            ));
      } else this.me.getChildByName('container_next').visible = !1;
      this.refresh();
    }),
    (e.prototype.close = function() {
      this.me.visible = !1;
    }),
    (e.prototype.refresh = function() {
      const e = this, i = cfg.vip.vip.get(this.current_id);
      if (i) {
        game.LoadMgr.setImgSkin(this.current_title_big, i.img),
          (this.btn_left.visible =
            null != cfg.vip.vip.get(this.current_id - 1)),
          (this.btn_right.visible =
            null != cfg.vip.vip.get(this.current_id + 1)),
          0 == i.charge
            ? (this.label_require.text = '')
            : (this.label_require.text = game.Tools.strOfLocalization(
                2159,
                [i.charge.toString()]
              ));
        for (var n = [], a = 0; a < i.rewards.length; a++)
          '' != i.rewards[a] && n.push(i.rewards[a]);
        if (0 == n.length)
          (this.container_reward.visible = !1),
            (this.btn_get_reward.visible = !1),
            (this.label_require.visible = !0),
            (this.container_title.y = 334);
        else {
          (this.container_reward.visible = !0),
            (this.container_title.y = 88);
          for (
            const r = this.container_reward.getChildByName('container_item'),
                  s = i => {
                    const a = r.getChildAt(i);
                    if (n.length > i) {
                      const s =
                                a.width * n.length +
                                (n.length < 1 ? 0 : 0 * (n.length - 1)),
                            l = r.width / 2 - s / 2 + (a.width + 0) * i;
                      (a.x = l), (a.y = 0), (a.visible = !0);
                      const h = n[i], u = parseInt(h.split('-')[0]), _ = parseInt(h.split('-')[1]);
                      a.getChildByName(
                        'btn'
                      ).clickHandler = Laya.Handler.create(
                        o,
                        () => {
                          t.UI_ItemDetail.Inst.show(u);
                        },
                        null,
                        !1
                      );
                      const d = a.getChildByName('count');
                      _ > 1
                        ? ((d.visible = !0), (d.text = _.toString()))
                        : (d.visible = !1);
                      const f = game.GameUtility.get_item_view(u);
                      game.LoadMgr.setImgSkin(
                        a.getChildByName('btn').getChildByName('icon'),
                        f.icon
                      );
                      const p = a.getChildByName('btn').getChildByName('getted');
                      c.vip_reward_getted
                        ? c.vip_reward_getted[o.current_id - 1]
                          ? ((p.visible = !0),
                            (o.label_require.visible = !0),
                            (o.btn_get_reward.visible = !1))
                          : ((p.visible = !1),
                            o.my_vip_id >= o.current_id
                              ? ((o.btn_get_reward.visible = !0),
                                (o.label_require.visible = !1),
                                (o.btn_get_reward.clickHandler = Laya.Handler.create(
                                  o,
                                  () => {
                                    const i = e.current_id;
                                    app.NetAgent.sendReq2Lobby(
                                      'Lobby',
                                      'gainVipReward',
                                      { vip_level: i - 1 },
                                      (n, a) => {
                                        n || a.error
                                          ? t.UIMgr.Inst.showNetReqError(
                                              'gainVipReward',
                                              n,
                                              a
                                            )
                                          : ((c.vip_reward_getted[i - 1] = 1),
                                            e.refresh(),
                                            t.UI_LightTips.Inst.show(
                                              game.Tools.strOfLocalization(2211)
                                            ));
                                      }
                                    );
                                  },
                                  null,
                                  !1
                                )))
                              : ((o.btn_get_reward.visible = !1),
                                (o.label_require.visible = !0)))
                        : ((p.visible = !1),
                          (o.label_require.visible = !0),
                          (o.btn_get_reward.visible = !1));
                    } else a.visible = !1;
                  },
                  o = this,
                  a = 0;
            a < r.numChildren;
            a++
          )
            s(a);
        }
        for (
          const l = i[`desc_${GameMgr.client_language}`].split('\\n'), a = 0;
          a < this.label_infos.length;
          a++
        )
          a < l.length
            ? ((this.label_infos[a].text = l[a]),
              (this.label_infos[a].visible = !0))
            : (this.label_infos[a].visible = !1);
      }
    }),
    e
  ;
  })();

  const n = (() => {
    function e(i) {
      const n = this;
      (this.root = null),
        (this.icon = null),
        (this.label_title = null),
        (this.label_price = null),
        (this.label_method = null),
        (this.loading = null),
        (this.locking = !1),
        (this.id = 0),
        (e.Inst = this),
        (this.me = i),
        (this.root = i.getChildByName('root')),
        (this.icon = this.root.getChildByName('icon')),
        (this.icon.skin = ''),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            n.locking || n.close();
          },
          null,
          !1
        )),
        (this.root.getChildByName(
          'btn_close2'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            n.locking || n.close();
          },
          null,
          !1
        )),
        (this.label_price = this.root
          .getChildByName('price')
          .getChildByName('v')),
        (this.label_title = this.root
          .getChildByName('title')
          .getChildByName('v')),
        (this.label_method = this.root.getChildByName('method')),
        (this.loading = this.root.getChildByName('loading')),
        app.NetAgent.AddListener2Lobby(
          'NotifyPayResult',
          Laya.Handler.create(
            this,
            e => {
              app.Log.log(
                `NotifyPayResult msg:${JSON.stringify(e)} this.me.visible:${n.me.visible} this.order_id:${n.order_id} ==${n.order_id == e.order_id}`
              );
              const i = cfg.mall.goods.get(e.goods_id);
              let a = '';
              0 === e.pay_result
                ? ((a = game.Tools.strOfLocalization(2161, [i.name])),
                  app.PlayerBehaviorStatistic.recharged_count++,
                  app.PlayerBehaviorStatistic.fb_trace_pending(
                    app.EBehaviorType.Purchase,
                    app.PlayerBehaviorStatistic.recharged_count
                  ))
                : (a = game.Tools.strOfLocalization(2160, [i.name])),
                t.UI_LightTips.Inst.show(a),
                n.me.visible && n.order_id == e.order_id && n.close();
            },
            null,
            !1
          )
        );
    }
    return (e.prototype.show = function(e, i) {
      const n = this;
      (this.locking = !0),
        (this.me.visible = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        ),
        (this.loading.visible = !0),
        this.id++;
      const a = this.id, r = cfg.mall.goods.get(e);
      (this.label_title.text = r.name), (this.label_price.text = r.price);
      let s = '';
      i
        ? ((this.label_method.text = game.Tools.strOfLocalization(2163)),
          (this.label_method.color = '#44b44c'),
          (s = 'createWechatNativeOrder'))
        : ((this.label_method.text = game.Tools.strOfLocalization(2164)),
          (this.label_method.color = '#00a9ec'),
          (s = 'createAlipayScanOrder')),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          s,
          {
            goods_id: e,
            client_type: 0,
            account_id: GameMgr.Inst.account_id
          },
          (e, i) => {
            if (n.me.visible && a == n.id)
              if (e || i.error)
                t.UIMgr.Inst.showNetReqError(s, e, i), n.close();
              else {
                app.Log.log(`${s} ${JSON.stringify(i)}`),
                  (n.order_id = i.order_id);
                const r = i.qrcode_buffer;
                GameMgr.inConch,
                  Laya.loader.load(
                    r,
                    Laya.Handler.create(n, () => {
                      a == n.id && n.me.visible
                        ? ((n.icon.skin = r), (n.loading.visible = !1))
                        : n.release_code(r);
                    })
                  );
              }
          }
        );
    }),
    (e.prototype.release_code = t => {
      const e = Laya.loader.getRes(t);
      e && e.destroy();
    }),
    (e.prototype.close = function() {
      const e = this;
      app.Log.log('wxcode close'),
        (this.locking = !0),
        (this.order_id = ''),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.me.visible = !1),
              (e.locking = !1),
              '' != e.icon.skin &&
                (e.release_code(e.icon.skin), (e.icon.skin = ''));
          })
        );
    }),
    e
  ;
  })();

  const a = (() => {
    function e(e) {
      const i = this;
      (this.me = e),
        (this.root = e.getChildByName('root')),
        (this.label_title = this.root.getChildByName('title')),
        (this.label_price = this.root.getChildByName('price'));
      const a = this.root.getChildByName('lst'), r = a.getChildByName('wx'), s = a.getChildByName('alipay'), o = a.getChildByName('alipay_code');
      (r.clickHandler = Laya.Handler.create(
        this,
        () => {
          i.locking ||
            (i.close(null),
            100718 != GameMgr.Inst.account_id
              ? GameMgr.inChina &&
                (GameMgr.inConch
                  ? ((c.Inst.container_loading.visible = !0),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createWechatAppOrder',
                      {
                        goods_id: i.goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id
                      },
                      (e, i) => {
                        if (
                          ((c.Inst.container_loading.visible = !1),
                          e || i.error)
                        )
                          t.UIMgr.Inst.showNetReqError(
                            'createWechatAppOrder',
                            e,
                            i
                          );
                        else {
                          const n = i.call_wechat_app_param;
                          Laya.PlatformClass.createClass(
                            'layaair.majsoul.mjmgr'
                          ).call(
                            'onWechatAppOrder',
                            n.appid,
                            n.partnerid,
                            n.prepayid,
                            n.package,
                            n.noncestr,
                            n.timestamp,
                            n.sign
                          );
                        }
                      }
                    ))
                  : GameMgr.iniOSWebview
                  ? ((c.Inst.container_loading.visible = !0),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createWechatAppOrder',
                      {
                        goods_id: i.goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id
                      },
                      (e, i) => {
                        if (
                          ((c.Inst.container_loading.visible = !1),
                          e || i.error)
                        )
                          t.UIMgr.Inst.showNetReqError(
                            'createWechatAppOrder',
                            e,
                            i
                          );
                        else {
                          const n = i.call_wechat_app_param,
                                a =
                                  `${n.partnerid},${n.prepayid},${n.package},${n.noncestr},${n.timestamp},${n.sign}`;
                          Laya.Browser.window.wkbridge.callNative(
                            'wxpay',
                            a,
                            () => {}
                          );
                        }
                      }
                    ))
                  : n.Inst.show(i.goods_id, !0))
              : t.UIMgr.Inst.ShowErrorInfo('暂未开通'));
        },
        null,
        !1
      )),
        (s.clickHandler = Laya.Handler.create(
          this,
          () => {
            if (!i.locking)
              if ((i.close(null), 100718 != GameMgr.Inst.account_id)) {
                if (GameMgr.inChina) {
                  c.Inst.container_loading.visible = !0;
                  let e = -1;
                  if (
                    (GameMgr.inConch || GameMgr.iniOSWebview
                      ? 0 == c.alipay_type ||
                        2 == c.alipay_type ||
                        3 == c.alipay_type
                        ? (e = 0)
                        : 1 == c.alipay_type && (e = 1)
                      : 1 == c.alipay_type || 2 == c.alipay_type
                      ? (e = 1)
                      : 0 == c.alipay_type && (e = 0),
                    1 == e)
                  )
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createAlipayScanOrder',
                      {
                        goods_id: i.goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id
                      },
                      (e, i) => {
                        if (
                          ((c.Inst.container_loading.visible = !1),
                          e || i.error)
                        )
                          t.UIMgr.Inst.showNetReqError(
                            'createAlipayScanOrder',
                            e,
                            i
                          );
                        else {
                          const n = i.qr_code;
                          if (GameMgr.inConch) {
                            Laya.PlatformClass.createClass(
                              'layaair.majsoul.mjmgr'
                            ).call('onAlipay_Brower', n);
                          } else
                            GameMgr.iniOSWebview
                              ? Laya.Browser.window.wkbridge.callNative(
                                  'alipay_brower',
                                  n,
                                  () => {}
                                )
                              : (Laya.Browser.window.location.href = n);
                        }
                      }
                    );
                  else if (0 == e) {
                    let n = '';
                    (n =
                      GameMgr.inConch || GameMgr.iniOSWebview
                        ? 'APP'
                        : Laya.Browser.onPC
                        ? 'PC_WEB'
                        : 'MOBILE_WEB'),
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'createAlipayOrder',
                        {
                          goods_id: i.goods_id,
                          client_type: 0,
                          account_id: GameMgr.Inst.account_id,
                          alipay_trade_type: n,
                          return_url: GameMgr.Inst.link_url
                        },
                        (e, i) => {
                          if (
                            ((c.Inst.container_loading.visible = !1),
                            e || i.error)
                          )
                            t.UIMgr.Inst.showNetReqError(
                              'createAlipayOrder',
                              e,
                              i
                            );
                          else {
                            const n = i.alipay_url;
                            if (GameMgr.inConch) {
                              a = n.split('?');
                              Laya.PlatformClass.createClass(
                                'layaair.majsoul.mjmgr'
                              ).call('onAlipay', a[a.length - 1]);
                            } else if (GameMgr.iniOSWebview) {
                              var a = n.split('?');
                              Laya.Browser.window.wkbridge.callNative(
                                'alipay',
                                a[a.length - 1],
                                () => {}
                              );
                            } else Laya.Browser.window.location.href = n;
                          }
                        }
                      );
                  }
                }
              } else t.UIMgr.Inst.ShowErrorInfo('暂未开通');
          },
          null,
          !1
        )),
        (o.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking ||
              (i.close(null), GameMgr.inChina && n.Inst.show(i.goods_id, !1));
          },
          null,
          !1
        )),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking || i.close(null);
          },
          null,
          !1
        ));
    }
    return (e.prototype.getShowedChoose = function() {
      const t = this.root.getChildByName('lst'), e = t.getChildByName('wx'), i = t.getChildByName('alipay'), n = t.getChildByName('alipay_code');
      if (100718 == GameMgr.Inst.account_id)
        return (n.visible = !1), (i.visible = !0), (e.visible = !0), [e, i];
      const a = [];
      if (
        (c.open_wx
          ? GameMgr.inConch || GameMgr.iniOSWebview || !Laya.Browser.onPC
            ? (e.visible = !1)
            : ((e.visible = !0), a.push(e))
          : (e.visible = !1),
        c.open_alipay)
      ) {
        let r = -1;
        GameMgr.inConch || GameMgr.iniOSWebview
          ? 0 == c.alipay_type || 2 == c.alipay_type || 3 == c.alipay_type
            ? (r = 0)
            : 1 == c.alipay_type && (r = 1)
          : 1 == c.alipay_type || 2 == c.alipay_type
          ? (r = 1)
          : 0 == c.alipay_type && (r = 0),
          1 == r
            ? GameMgr.inConch || GameMgr.iniOSWebview || !Laya.Browser.onPC
              ? ((i.visible = !0), a.push(i))
              : (i.visible = !1)
            : 0 == r
            ? ((i.visible = !0), a.push(i))
            : (i.visible = !1),
          1 == r ? ((n.visible = !0), a.push(n)) : (n.visible = !1);
      } else (i.visible = !1), (n.visible = !1);
      return a;
    }),
    (e.prototype.show = function(e, i) {
      const n = this;
      this.goods_id = e;
      const a = cfg.mall.goods.get(e);
      (this.label_title.text = a.name),
        (this.label_price.text = a.price),
        i || (i = ''),
        (this.root.getChildByName('extendinfo').text = i),
        (this.locking = !0),
        (this.me.visible = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );
      const r = this.root.getChildByName('lst'), s = this.getShowedChoose();
      if (((r.vScrollBarSkin = ''), s.length <= 2))
        for (o = 0; o < s.length; o++) s[o].y = 50 + 144 * o;
      else for (var o = 0; o < s.length; o++) s[o].y = 144 * o;
      (r.vScrollBar.value = 0), r.refresh();
    }),
    (e.prototype.close = function(e) {
      const i = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (i.locking = !1), (i.me.visible = !1), e && e.run();
          })
        );
    }),
    e
  ;
  })();

  const r = (() => {
    function e(t) {
      const e = this;
      (this.pay_types = []),
        (this.current_goods_id = 0),
        (this._en_card_ = null),
        (this._adyen_date = {}),
        (this._adyen_btn_confirm = null),
        (this._adyen_btn_cancel = null),
        (this.me = t),
        (this.me.visible = !1),
        (this.root = t.getChildByName('root')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        })),
        (this.label_item_name = this.root.getChildByName('item_name')),
        (this.label_price = this.root.getChildByName('price')),
        (this.label_vip = this.root.getChildByName('vip')),
        (this.label_extendinfo = this.root.getChildByName('extendinfo')),
        (this.scroll_view = this.root.scriptMap['capsui.CScrollView']),
        this.scroll_view.init_scrollview(
          new Laya.Handler(this, this.render_item)
        ),
        (this.pay_types = []),
        'jp' == GameMgr.client_language
          ? (this.pay_types = [
              'CreditCard',
              'Paypal',
              'Docomo',
              'Au',
              'Softbank'
            ])
          : 'en' == GameMgr.client_language &&
            (this.pay_types = [
              'Paypal',
              'MasterCard',
              'Visa',
              'JCB',
              'Alipay'
            ]);
    }
    return (e.prototype.show = function(e, i) {
      const n = this;
      this.current_goods_id = e;
      const a = cfg.mall.goods.get(e);
      a &&
        ((this.label_item_name.text = a.name),
        (this.label_price.text = a.price),
        (this.label_vip.text = a.vip_exp.toString()),
        i || (i = ''),
        (this.label_extendinfo.text = i),
        this.scroll_view.reset(),
        this.scroll_view.addItem(this.pay_types.length),
        (this.locking = !0),
        (this.me.visible = !0),
        app.PlayerBehaviorStatistic.fb_trace_force(
          app.EBehaviorType.Purchase_Click
        ),
        app.PlayerBehaviorStatistic.google_trace_force(
          app.EBehaviorType.G_Purchase_click
        ),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        ));
    }),
    (e.prototype.render_item = function({index, container}) {
      const e = this, i = index, n = container;
      n.getChildByName('btn').clickHandler = Laya.Handler.create(
        this,
        () => {
          e.onClickAtPay(e.pay_types[i]);
        },
        null,
        !1
      );
      let a = this.pay_types[i];
      if ('jp' == GameMgr.client_language)
        switch (a) {
          case 'CreditCard':
            a = 'クレジットカード';
            break;
          case 'Paypal':
            a = 'Paypal(ペイパル）';
            break;
          case 'Au':
            a = 'auかんたん決済';
            break;
          case 'Docomo':
            a = 'ドコモ払い';
            break;
          case 'Softbank':
            a = 'ソフトバンクまとめて支払い';
        }
      n.getChildByName('btn').getChildByName('name').text = a;
    }),
    (e.prototype.onClickAtPay = function(e) {
      const i = this;
      if ('jp' == GameMgr.client_language)
        'CreditCard' == e
          ? (this.close(),
            c.Inst.page_creditcard.show(this.current_goods_id))
          : ('Paypal' != e &&
              'Au' != e &&
              'Docomo' != e &&
              'Softbank' != e) ||
            ((c.Inst.container_loading.visible = !0),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              `createJP${e}Order`,
              {
                goods_id: this.current_goods_id,
                client_type: 0,
                account_id: GameMgr.Inst.account_id,
                return_url: c.open_new_window()
                  ? 'Yo://CloseWindow'
                  : GameMgr.Inst.link_url,
                access_token: GameMgr.Inst.yostar_accessToken
              },
              (n, a) => {
                if (n || a.error) {
                  if (n)
                    t.UIMgr.Inst.showNetReqError(
                      `createJP${e}Order`,
                      n,
                      a
                    );
                  else if (1991 == a.error.code)
                    t.UI_Agepending.Inst.show();
                  else if (1992 == a.error.code) {
                    const r = JSON.parse(a.error.json_param);
                    t.UI_Agexiane.Inst.show(r.recharged, r.age);
                  } else
                    t.UIMgr.Inst.showNetReqError(
                      `createJP${e}Order`,
                      n,
                      a
                    );
                  c.Inst.container_loading.visible = !1;
                } else {
                  const s = {};
                  (s.type = e),
                    (s.lang = 'ja'),
                    (s.accessToken = GameMgr.Inst.yostar_accessToken),
                    (s.orderId = a.order_id),
                    'Paypal' == e
                      ? (s.itemName = cfg.mall.goods.get(
                          i.current_goods_id
                        ).name)
                      : 'Au' == e &&
                        (s.itemName = game.Tools.ToDBC(
                          cfg.mall.goods.get(i.current_goods_id).name
                        )),
                    (s.openNewWindow = c.open_new_window()),
                    Yo.execOrder(s),
                    (c.Inst.container_loading.visible = !1);
                }
              }
            ));
      else if ('Paypal' == e)
        (c.Inst.container_loading.visible = !0),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'createENPaypalOrder',
            {
              goods_id: this.current_goods_id,
              client_type: 0,
              account_id: GameMgr.Inst.account_id,
              return_url: c.open_new_window()
                ? 'Yo://CloseWindow'
                : GameMgr.Inst.link_url,
              access_token: GameMgr.Inst.yostar_accessToken
            },
            (i, n) => {
              if (i || n.error)
                t.UIMgr.Inst.showNetReqError('createENPaypalOrder', i, n),
                  (c.Inst.container_loading.visible = !1);
              else {
                const a = {};
                (a.type = e),
                  (a.lang = 'en'),
                  (a.accessToken = GameMgr.Inst.yostar_accessToken),
                  (a.orderId = n.order_id),
                  (a.openNewWindow = c.open_new_window()),
                  Yo.execOrder(a),
                  (c.Inst.container_loading.visible = !1);
              }
            }
          );
      else if ('Alipay' == e)
        (c.Inst.container_loading.visible = !0),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'createENAlipayOrder',
            {
              goods_id: this.current_goods_id,
              client_type: 0,
              account_id: GameMgr.Inst.account_id,
              return_url: c.open_new_window()
                ? 'Yo://CloseWindow'
                : GameMgr.Inst.link_url,
              access_token: GameMgr.Inst.yostar_accessToken
            },
            (e, i) => {
              if (e || i.error)
                t.UIMgr.Inst.showNetReqError('createENAlipayOrder', e, i),
                  (c.Inst.container_loading.visible = !1);
              else {
                const n = {};
                (n.type = 'Adyen.Alipay'),
                  (n.lang = 'en'),
                  (n.accessToken = GameMgr.Inst.yostar_accessToken),
                  (n.orderId = i.order_id),
                  (n.openNewWindow = c.open_new_window()),
                  Yo.execOrder(n),
                  (c.Inst.container_loading.visible = !1);
              }
            }
          );
      else if ('MasterCard' == e || 'Visa' == e || 'JCB' == e) {
        if (
          ((c.Inst.container_loading.visible = !0), null == this._en_card_)
        ) {
          let n = GameMgr.Inst.link_url;
          '/' == n[n.length - 1] && (n = n.substr(0, n.length - 1));
          const a = GameMgr.config_data.checkoutShopperUrl;
          Yo.generateOriginKey({ originDomain: n }, (t, {originKeys}) => {
            if (t) console.error(t);
            else {
              const r = {
                        locale: 'en_US',
                        originKey: originKeys[n],
                        loadingContext: `${a}/checkoutshopper/`
                      },
                    s = new AdyenCheckout(r),
                    o = i;
              (o._en_card_ = s
                .create('card', {
                  onChange({isValid, data}, e) {
                    if (isValid) {
                      const i = data, n = i.encryptedCardNumber, a = i.encryptedExpiryMonth, r = i.encryptedExpiryYear, s = i.encryptedSecurityCode;
                      (o._adyen_date.encryptedCardNumber = n),
                        (o._adyen_date.encryptedExpiryMonth = a),
                        (o._adyen_date.encryptedExpiryYear = r),
                        (o._adyen_date.encryptedSecurityCode = s),
                        (o._adyen_date.isValid = !0),
                        (o._adyen_btn_confirm.hidden = !1);
                    } else
                      (o._adyen_date.encryptedCardNumber = ''),
                        (o._adyen_date.encryptedExpiryMonth = ''),
                        (o._adyen_date.encryptedExpiryYear = ''),
                        (o._adyen_date.encryptedSecurityCode = ''),
                        (o._adyen_date.isValid = !1),
                        (o._adyen_btn_confirm.hidden = !0);
                  }
                })
                .mount('#card')),
                (document.getElementById('container_card').hidden = !1);
            }
          });
        } else document.getElementById('container_card').hidden = !1;
        if (null == this._adyen_btn_confirm) {
          (this._adyen_btn_confirm = document.getElementById(
            'card_confirm'
          )),
            (this._adyen_btn_cancel = document.getElementById(
              'card_cancel'
            ));
          const r = this;
          (this._adyen_btn_cancel.innerText = 'Cancel'),
            (this._adyen_btn_cancel.onclick = () => {
              (document.getElementById('container_card').hidden = !0),
                (c.Inst.container_loading.visible = !1);
            }),
            (this._adyen_btn_confirm.innerText = 'Ok'),
            (this._adyen_btn_confirm.onclick = () => {
              (document.getElementById('container_card').hidden = !0),
                r._adyen_date.isValid
                  ? app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      `createEN${e}Order`,
                      {
                        goods_id: i.current_goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id,
                        return_url: c.open_new_window()
                          ? 'Yo://CloseWindow'
                          : GameMgr.Inst.link_url,
                        access_token: GameMgr.Inst.yostar_accessToken
                      },
                      (i, n) => {
                        if (i || n.error)
                          t.UIMgr.Inst.showNetReqError(
                            `createEN${e}Order`,
                            i,
                            n
                          ),
                            (c.Inst.container_loading.visible = !1);
                        else {
                          const a = {};
                          (a.type = 'Adyen.CreditCard'),
                            (a.lang = 'en'),
                            (a.accessToken =
                              GameMgr.Inst.yostar_accessToken),
                            (a.orderId = n.order_id),
                            (a.encryptedCardNumber =
                              r._adyen_date.encryptedCardNumber),
                            (a.encryptedExpiryMonth =
                              r._adyen_date.encryptedExpiryMonth),
                            (a.encryptedExpiryYear =
                              r._adyen_date.encryptedExpiryYear),
                            (a.encryptedSecurityCode =
                              r._adyen_date.encryptedSecurityCode),
                            (a.openNewWindow = c.open_new_window()),
                            Yo.execOrder(a),
                            (c.Inst.container_loading.visible = !1);
                        }
                      }
                    )
                  : (c.Inst.container_loading.visible = !1);
            }),
            (this._adyen_btn_confirm.hidden = !0);
        }
      }
    }),
    (e.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        );
    }),
    e
  ;
  })();

  const s = (() => {
    function t(t, e, i, n, a) {
      const r = this;
      (this.isopen = !1),
        (this.locking = !1),
        (this.showed = !1),
        (this.when_close = null),
        (this.when_choose = null),
        (this.datas = []),
        (this.start_rate = 0),
        (this.me = t),
        (t.visible = !1),
        (this.isopen = !1),
        (this.locking = !1),
        (this.when_close = e),
        (this.when_choose = i),
        (this.datas = n),
        (this.start_rate = a),
        (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.refresh_item)
        ),
        (this.bg = this.me.getChildByName('bg')),
        (this.content = this.me.getChildByName('content')),
        (t.getChildByName('btn_open').clickHandler = new Laya.Handler(
          this,
          () => {
            r.locking || (r.isopen ? r.close() : r.show());
          }
        ));
    }
    return (t.prototype.reset = function() {
      (this.isopen = !1),
        (this.locking = !1),
        (this.me.visible = !0),
        (this.bg.visible = !1),
        (this.content.visible = !1);
    }),
    (t.prototype.show = function() {
      const t = this;
      (this.locking = !0),
        (this.isopen = !0),
        (this.bg.visible = !0),
        (this.bg.height = 10),
        Laya.Tween.to(this.bg, { height: 385 }, 150, Laya.Ease.linearNone),
        (this.content.visible = !0),
        (this.content.alpha = 0),
        Laya.Tween.to(
          this.content,
          { alpha: 1 },
          150,
          Laya.Ease.linearNone
        ),
        Laya.timer.once(150, this, () => {
          t.locking = !1;
        }),
        this.showed ||
          (this.scrollview.reset(),
          this.scrollview.addItem(this.datas.length),
          (this.showed = !0),
          (this.scrollview.rate = this.start_rate));
    }),
    (t.prototype.refresh_item = function({index, container}) {
      const e = this, i = index, n = container;
      (n.getChildByName('btn').clickHandler = Laya.Handler.create(
        this,
        () => {
          e.locking ||
            (e.close(), e.when_choose && e.when_choose.runWith(e.datas[i]));
        },
        null,
        !1
      )),
        (n.getChildByName('btn').getChildByName('txt').text = this.datas[
          i
        ]);
    }),
    (t.prototype.close = function() {
      const t = this;
      (this.locking = !0),
        Laya.Tween.to(
          this.content,
          { alpha: 0 },
          150,
          Laya.Ease.linearNone
        ),
        Laya.Tween.to(this.bg, { height: 10 }, 150, Laya.Ease.linearNone),
        Laya.timer.once(150, this, () => {
          (t.locking = !1),
            (t.bg.visible = !1),
            (t.content.visible = !1),
            (t.isopen = !1),
            t.when_close && t.when_close.run();
        });
    }),
    t
  ;
  })();

  const o = (() => {
    function t(t, e, i) {
      const n = this;
      (this.locking = !1),
        (this.me = t),
        (t.visible = !1),
        (this.me.getChildByName('btn_close').clickHandler = new Laya.Handler(
          this,
          () => {
            n.dropdown_mouth.locking ||
              n.dropdown_year.locking ||
              (n.dropdown_mouth.isopen && n.dropdown_mouth.close(),
              n.dropdown_year.isopen && n.dropdown_year.close());
          }
        ));
      this.dropdown_mouth = new s(
        this.me.getChildByName('container_month'),
        new Laya.Handler(this, () => {
          n._OnStateChange(), e.runWith('');
        }),
        new Laya.Handler(this, t => e.runWith(t)),
        [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12'
        ],
        0
      );
      for (var a = new Date(Date.now()), r = [], o = 0; o < 120; o++)
        r.push((a.getFullYear() + o - 30).toString());
      this.dropdown_year = new s(
        this.me.getChildByName('container_year'),
        new Laya.Handler(this, () => {
          n._OnStateChange(), i.runWith('');
        }),
        new Laya.Handler(this, t => i.runWith(t)),
        r,
        0.262
      );
    }
    return (
      (t.prototype.show = function(t) {
        this.dropdown_mouth.reset(),
          this.dropdown_year.reset(),
          (this.me.visible = !0),
          t ? this.dropdown_mouth.show() : this.dropdown_year.show();
      }),
      (t.prototype._OnStateChange = function() {
        this.dropdown_year.isopen ||
          this.dropdown_mouth.isopen ||
          (this.me.visible = !1);
      }),
      t
    );
  })();

  const l = (() => {
    function e(t) {
      const e = this;
      (this.locking = !1),
        (this.me = t),
        (t.visible = !1),
        (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        })),
        (this.root.getChildByName('confirm').clickHandler = new Laya.Handler(
          this,
          () => {
            e.locking || e.close();
          }
        ));
    }
    return (e.prototype.show = function() {
      const e = this;
      (this.locking = !0),
        (this.me.visible = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
    }),
    (e.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        );
    }),
    e
  ;
  })();

  const h = (() => {
    function e(t) {
      const e = this;
      (this.color_wrong = '#FF3030'),
        (this.color_hint = '#5A82C8'),
        (this.locking = !1),
        (this.current_goodsID = 0),
        (this.me = t),
        (this.me.visible = !1),
        (this.root_adyen = this.me.getChildByName('root_adyen'));
      const i = this.root_adyen.getChildByName('card');
      (this.input_cardno = i
        .getChildByName('input')
        .getChildByName('txtinput')),
        (this.cardno_wrong = i
          .getChildByName('input')
          .getChildByName('wrong')),
        (this.cardno_ac = i.getChildByName('input').getChildByName('ac')),
        (this.notice_cardno = i.getChildByName('notice')),
        (this.card_imgs = i.getChildByName('card_img')),
        this.input_cardno.on('blur', this, () => {
          e.pending_cardno();
        }),
        this.input_cardno.on('input', this, () => {
          e.cardno_wrong.visible && (e.cardno_wrong.visible = !1),
            e.code_ac.visible && (e.code_ac.visible = !1);
        });
      const n = this.root_adyen.getChildByName('date');
      (this.btn_month = n.getChildByName('month')),
        (this.btn_month.clickHandler = new Laya.Handler(this, () => {
          e.locking || e.date_dropdown.show(!0);
        })),
        (this.txt_month = this.btn_month.getChildByName('txt')),
        (this.notice_month = n.getChildByName('notice_month')),
        (this.btn_year = n.getChildByName('year')),
        (this.btn_year.clickHandler = new Laya.Handler(this, () => {
          e.locking || e.date_dropdown.show(!1);
        })),
        (this.txt_year = this.btn_year.getChildByName('txt')),
        (this.notice_year = n.getChildByName('notice_year'));
      const a = this.root_adyen.getChildByName('code');
      (this.input_code = a
        .getChildByName('input')
        .getChildByName('txtinput')),
        (this.code_wrong = a.getChildByName('input').getChildByName('wrong')),
        (this.code_ac = a.getChildByName('input').getChildByName('ac')),
        (this.notice_code = a.getChildByName('notice')),
        this.input_code.on('blur', this, () => {
          e.pending_code();
        }),
        this.input_code.on('input', this, () => {
          e.code_wrong.visible && (e.code_wrong.visible = !1),
            e.code_ac.visible && (e.code_ac.visible = !1);
        }),
        (a.getChildByName('btn_what').clickHandler = new Laya.Handler(
          this,
          () => {
            e.locking || e.contianer_cardnumber_hint.show();
          }
        )),
        (this.root_adyen.getChildByName(
          'paybutton'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.onClickConfirm();
        })),
        (this.root_adyen.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        })),
        (this.contianer_cardnumber_hint = new l(
          this.me.getChildByName('container_cardnumber')
        )),
        (this.date_dropdown = new o(
          this.me.getChildByName('container_dropdown'),
          new Laya.Handler(this, t => {
            '' != t && (e.txt_month.text = t), e.pending_month();
          }),
          new Laya.Handler(this, t => {
            '' != t && (e.txt_year.text = t), e.pending_year();
          })
        ));
    }
    return (e.prototype.show = function(e) {
      const i = this;
      (this.me.visible = !0),
        (this.locking = !0),
        (this.current_goodsID = e),
        (this.date_dropdown.me.visible = !1),
        (this.contianer_cardnumber_hint.me.visible = !1),
        t.UIBase.anim_pop_out(
          this.root_adyen,
          Laya.Handler.create(this, () => {
            i.locking = !1;
          })
        ),
        (this.txt_month.text = game.Tools.strOfLocalization(2729)),
        (this.txt_year.text = game.Tools.strOfLocalization(2730)),
        (this.input_cardno.text = ''),
        (this.input_code.text = ''),
        (this.notice_cardno.text = game.Tools.strOfLocalization(2726)),
        (this.notice_cardno.color = this.color_hint),
        (this.notice_month.text = game.Tools.strOfLocalization(2731)),
        (this.notice_month.color = this.color_hint),
        (this.notice_year.text = game.Tools.strOfLocalization(2732)),
        (this.notice_year.color = this.color_hint),
        (this.notice_code.text = game.Tools.strOfLocalization(2736)),
        (this.notice_code.color = this.color_hint),
        (this.cardno_wrong.visible = !1),
        (this.card_imgs.visible = !1),
        (this.cardno_ac.visible = !1),
        (this.code_wrong.visible = !1),
        (this.code_ac.visible = !1);
    }),
    (e.prototype.pending_Luhn = t => {
      for (var e = 0, i = '0'.charCodeAt(0), n = 0; n < t.length; n += 2)
        e += t.charCodeAt(t.length - n - 1) - i;
      for (n = 1; n < t.length; n += 2) {
        const a = 2 * (t.charCodeAt(t.length - n - 1) - i);
        e += a <= 9 ? a : a - 9;
      }
      return e % 10 == 0;
    }),
    (e.prototype.isValidCreditCard = function(t) {
      const e = this.pending_Luhn(t), i = parseInt(t.substr(0, 2)), n = (parseInt(t.substr(0, 3)), parseInt(t.substr(0, 4))), a = (parseInt(t.substr(0, 5)), parseInt(t.substr(0, 6)));
      if (15 == t.length && (34 == i || 37 == i) && e) return 'amex';
      if (16 == t.length && n >= 3528 && n <= 3589 && e) return 'jcb';
      if (16 == t.length) {
        if (a >= 51e4 && a <= 559999 && e) return 'mastercard';
        if (n >= 2221 && n <= 2720 && e) return 'mastercard';
      }
      if (14 == t.length) {
        if (a >= 3e5 && a <= 303574 && e) return 'diner';
        if (3095 == n) return 'diner';
        if (36 == i) return 'diner';
        if (i >= 38 && i <= 39) return 'diner';
      }
      return '4' != t.charAt(0) || (13 != t.length && 16 != t.length) || !e
        ? ''
        : 'visa';
    }),
    (e.prototype.pending_cardno = function() {
      if (
        this.input_cardno.text.length >= 13 &&
        this.input_cardno.text.length <= 19
      ) {
        const t = this.isValidCreditCard(this.input_cardno.text);
        if ('' != t) {
          (this.cardno_wrong.visible = !1),
            (this.notice_cardno.text = ''),
            (this.cardno_ac.visible = !0),
            (this.card_imgs.visible = !0);
          for (let e = 0; e < this.card_imgs.numChildren; e++) {
            const i = this.card_imgs.getChildAt(e);
            i.visible = i.name == t;
          }
          return !0;
        }
        return (
          (this.cardno_wrong.visible = !0),
          (this.cardno_ac.visible = !1),
          (this.notice_cardno.text = ''),
          (this.notice_cardno.color = this.color_wrong),
          (this.card_imgs.visible = !1),
          !1
        );
      }
      return (
        (this.cardno_wrong.visible = !0),
        (this.cardno_ac.visible = !1),
        (this.notice_cardno.text = game.Tools.strOfLocalization(2727)),
        (this.notice_cardno.color = this.color_wrong),
        (this.card_imgs.visible = !1),
        !1
      );
    }),
    (e.prototype.pending_month = function() {
      return this.txt_month.text != game.Tools.strOfLocalization(2729)
        ? ((this.notice_month.text = ''), !0)
        : ((this.notice_month.text = game.Tools.strOfLocalization(2733)),
          (this.notice_month.color = this.color_wrong),
          !1);
    }),
    (e.prototype.pending_year = function() {
      return this.txt_year.text != game.Tools.strOfLocalization(2730)
        ? ((this.notice_year.text = ''), !0)
        : ((this.notice_year.text = game.Tools.strOfLocalization(2734)),
          (this.notice_year.color = this.color_wrong),
          !1);
    }),
    (e.prototype.pending_code = function() {
      return this.input_code.text.length >= 3 &&
        this.input_code.text.length <= 4
        ? ((this.notice_code.text = ''),
          (this.code_wrong.visible = !1),
          (this.code_ac.visible = !0),
          !0)
        : ((this.code_wrong.visible = !0),
          (this.code_ac.visible = !1),
          (this.notice_code.text = game.Tools.strOfLocalization(2737)),
          (this.notice_code.color = this.color_wrong),
          !1);
    }),
    (e.prototype.onClickConfirm = function() {
      let e = !0;
      if (
        (this.pending_cardno() || (e = !1),
        this.pending_month() || (e = !1),
        this.pending_year() || (e = !1),
        this.pending_code() || (e = !1),
        e)
      ) {
        this.close(), (c.Inst.container_loading.visible = !0);
        const i = this.input_cardno.text, n = this.current_goodsID;
        window.Multipayment.init(GameMgr.config_data.jp_shop_id),
          Multipayment.getToken(
            {
              cardno: this.input_cardno.text,
              expire: this.txt_year.text + this.txt_month.text,
              securitycode: this.input_code.text
            },
            ({resultCode, tokenObject}) => {
              if ('000' != resultCode)
                !(e => {
                  t.UIMgr.Inst.ShowErrorInfo(
                    game.Tools.strOfLocalization(e)
                  ),
                    (c.Inst.container_loading.visible = !1);
                })(2742);
              else {
                const a = tokenObject;
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'createJPCreditCardOrder',
                  {
                    goods_id: n,
                    client_type: 0,
                    account_id: GameMgr.Inst.account_id,
                    return_url: c.open_new_window()
                      ? 'Yo://CloseWindow'
                      : GameMgr.Inst.link_url,
                    access_token: GameMgr.Inst.yostar_accessToken
                  },
                  (e, n) => {
                    if (e || n.error)
                      if (e)
                        t.UIMgr.Inst.showNetReqError(
                          'createJPCreditCardOrder',
                          e,
                          n
                        ),
                          (c.Inst.container_loading.visible = !1);
                      else if (1991 == n.error.code)
                        t.UI_Agepending.Inst.show(),
                          (c.Inst.container_loading.visible = !1);
                      else if (1992 == n.error.code) {
                        const r = JSON.parse(n.error.json_param);
                        t.UI_Agexiane.Inst.show(r.recharged, r.age),
                          (c.Inst.container_loading.visible = !1);
                      } else
                        t.UIMgr.Inst.showNetReqError(
                          'createJPCreditCardOrder',
                          e,
                          n
                        ),
                          (c.Inst.container_loading.visible = !1);
                    else {
                      const s = {};
                      (s.type = 'CreditCard'),
                        (s.lang = 'ja'),
                        (s.accessToken = GameMgr.Inst.yostar_accessToken),
                        (s.token = a.token),
                        (s.orderId = n.order_id),
                        (s.cardNo = i),
                        (s.openNewWindow = c.open_new_window()),
                        Yo.execOrder(s),
                        (c.Inst.container_loading.visible = !1);
                    }
                  }
                );
              }
            }
          );
      }
    }),
    (e.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root_adyen,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.me.visible = !1);
          })
        );
    }),
    e
  ;
  })();

  var c = (s => {
    function o() {
      const t = s.call(this, new ui.lobby.rechargeUI()) || this;
      return (
        (t.money = null),
        (t.tabs = []),
        (t.locking = !1),
        (t.goods_sheleve_id = ''),
        (t.tab_index = -1),
        (t.items = []),
        (t.app_shop = null),
        (t.tab_infos = []),
        (o.Inst = t),
        t
      );
    }
    return __extends(o, s),
    (o.init = function() {
      const t = this;
      if (
        ((this.vip_reward_getted = null),
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchVipReward', {}, (e, {error, gained_vip_levels}) => {
          if (e || error);
          else if (((t.vip_reward_getted = {}), gained_vip_levels))
            for (let n = 0; n < gained_vip_levels.length; n++)
              t.vip_reward_getted[gained_vip_levels[n]] = 1;
        }),
        'en' == GameMgr.client_language)
      ) {
        ((e = document.createElement('link')).rel = 'stylesheet'),
          (e.href =
            `${GameMgr.config_data.checkoutShopperUrl}/checkoutshopper/sdk/2.1.0/adyen.css`);
        (i = document.getElementsByTagName('head')[0]).appendChild(e);
        ((e = document.createElement('link')).rel = 'stylesheet'),
          (e.href = game.ResourceVersion.formatURL('css/adyen_custom.css'));
        (i = document.getElementsByTagName('head')[0]).appendChild(e);
        (e = document.createElement('script')).src =
          `${GameMgr.config_data.checkoutShopperUrl}/checkoutshopper/sdk/2.1.0/adyen.js`;
        (i = document.getElementsByTagName(
          'script'
        )[0]).parentNode.insertBefore(e, i);
      } else if ('jp' == GameMgr.client_language) {
        var e = document.createElement('script');
        e.src = GameMgr.config_data.jp_shop_js;
        var i = document.getElementsByTagName('script')[0];
        i.parentNode.insertBefore(e, i);
      }
    }),
    (o.on_new_recharge_refresh = function({new_recharged_list}) {
      if (new_recharged_list) {
        for (let i = 0; i < new_recharged_list.length; i++)
          t.UI_Recharge.new_recharge_list[new_recharged_list[i]] = 1;
        this.Inst &&
          this.Inst.enable &&
          this.Inst.scrollview.wantToRefreshAll();
      }
    }),
    (o.open_new_window = () => !(
      (Laya.Browser.onIOS || Laya.Browser.onMac) &&
      Laya.Browser.onSafari
    )),
    (o.prototype.onCreate = function() {
      const s = this;
      (this.container_top = this.me.getChildByName('top')),
        (this.container_top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            s.locking ||
              s.close(
                Laya.Handler.create(s, () => {
                  t.UI_Lobby.Inst.enable = !0;
                })
              );
          },
          null,
          !1
        )),
        (this.money = new t.UI_Money(
          this.container_top,
          null,
          Laya.Handler.create(
            this,
            () => s.locking,
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
        let o = t => {
                const e = l.container_tab.getChildAt(t);
                l.tabs.push(e),
                  (e.clickHandler = Laya.Handler.create(
                    l,
                    () => {
                      s.tab_index != t && s.change_tab(t);
                    },
                    null,
                    !1
                  ));
              },
            l = this,
            c = 0;
        c < this.container_tab.numChildren;
        c++
      )
        o(c);
      const u = this.container_content.getChildByName('right');
      (this.container_right = u),
        (this.scrollview = u.scriptMap['capsui.CScrollView']),
        this.scrollview.init_scrollview(
          Laya.Handler.create(this, this.render_good_shelves, null, !1),
          -1,
          4
        ),
        (this.page_vip = new i(
          this.container_content.getChildByName('page_vip')
        )),
        (this.buy_single = new e(this.me.getChildByName('pop_buy_single'))),
        (this.container_loading = this.me.getChildByName(
          'container_loading'
        )),
        (this.container_loading.visible = !1),
        GameMgr.inConch &&
          GameMgr.inGooglePlay &&
          ((this.app_shop = new game.GooglePlayShop()),
          this.app_shop.onGameStart()),
        (this.page_wxcode = new n(this.me.getChildByName('wxcode'))),
        (this.page_wxcode.me.visible = !1),
        (this.page_choose = new a(this.me.getChildByName('choose_method'))),
        (this.page_choose.me.visible = !1),
        (this.page_choose_en = new r(
          this.me.getChildByName('choose_method_en')
        )),
        (this.page_choose_en.me.visible = !1),
        (this.page_creditcard = new h(
          this.me.getChildByName('container_creditcard')
        ));
    }),
    (o.prototype.show = function(e) {
      const i = this;
      (this.enable = !0),
        (this.locking = !0),
        game.Scene_Lobby.Inst.change_bg('indoor', !1),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_in(this.container_content, { y: 30 }, 150),
        this.money.onEnable(),
        Laya.timer.once(150, this, () => {
          i.locking = !1;
        }),
        (this.tab_infos = []),
        GameMgr.config_data.goods_sheleve_id &&
          '' != GameMgr.config_data.goods_sheleve_id &&
          o.open_payment &&
          ('chs' == GameMgr.client_language
            ? (this.goods_sheleve_id = 'shelves_001')
            : 'jp' == GameMgr.client_language
            ? (this.goods_sheleve_id = 'shelves_002')
            : 'en' == GameMgr.client_language &&
              (this.goods_sheleve_id = 'shelves_003'),
          this.tab_infos.push('huiyu')),
        this.tab_infos.push('tongbi'),
        'chs' == GameMgr.client_language && this.tab_infos.push('huishi'),
        this.tab_infos.push('vip');
      for (let n = 0; n < this.tabs.length; n++)
        if (n < this.tab_infos.length)
          switch (((this.tabs[n].visible = !0), this.tab_infos[n])) {
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
    }),
    (o.prototype.close = function(e) {
      const i = this;
      (this.locking = !0),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_out(this.container_content, { y: 30 }, 150),
        Laya.timer.once(150, this, () => {
          (i.locking = !1), (i.enable = !1), (i.tab_index = -1), e.run();
        });
    }),
    (o.prototype.refresh_info = function(t) {
      this.buy_single.me.visible = !1;
      for (var e = 0, i = 0; i < this.tab_infos.length; i++)
        if (this.tab_infos[i] == t) {
          e = i;
          break;
        }
      this.change_tab(e);
    }),
    (o.prototype.change_tab = function(t) {
      const e = this;
      this.tab_index = t;
      for (let i = 0; i < this.tabs.length; i++)
        (this.tabs[i].skin = game.Tools.localUISrc(
          t == i
            ? 'myres/shop/tab_choose.png'
            : 'myres/shop/tab_unchoose.png'
        )),
          (this.tabs[i].getChildAt(0).color =
            t == i ? '#d9b263' : '#8cb65f');
      (this.container_right.visible = !1),
        this.page_vip.close(),
        (this.items = []),
        this.scrollview.reset(),
        'huiyu' == this.tab_infos[t]
          ? ((this.container_right.visible = !0),
            this.scrollview.change_render_handler(
              Laya.Handler.create(this, this.render_good_shelves, null, !1)
            ),
            cfg.mall.goods_shelves
              .getGroup(this.goods_sheleve_id)
              .forEach(({goods_id}) => {
                e.items.push(goods_id);
              }),
            this.scrollview.addItem(this.items.length))
          : 'tongbi' == this.tab_infos[t]
          ? ((this.container_right.visible = !0),
            this.scrollview.change_render_handler(
              Laya.Handler.create(this, this.render_recharge, null, !1)
            ),
            cfg.exchange.exchange.forEach(({id}) => {
              e.items.push(id);
            }),
            this.scrollview.addItem(this.items.length))
          : 'huishi' == this.tab_infos[t]
          ? ((this.container_right.visible = !0),
            this.scrollview.change_render_handler(
              Laya.Handler.create(
                this,
                this.render_searchexchange,
                null,
                !1
              )
            ),
            cfg.exchange.searchexchange.forEach(({id}) => {
              e.items.push(id);
            }),
            this.scrollview.addItem(this.items.length))
          : 'vip' == this.tab_infos[t] && this.page_vip.show();
    }),
    (o.prototype.render_recharge = function({index, container}) {
      const e = this, i = index, n = container, a = cfg.exchange.exchange.get(this.items[i]), r = n.getChildByName('btn');
      (r.clickHandler = Laya.Handler.create(
        this,
        () => {
          e.buy_single.show_exchange(e.items[i]);
        },
        null,
        !1
      )),
        (r.getChildByName('label_name').text =
          a[`name_${GameMgr.client_language}`]),
        game.LoadMgr.setImgSkin(r.getChildByName('icon'), a.icon),
        (r.filters = []),
        (r.getChildByName('buyed').visible = !1),
        (r.getChildByName('count').visible = !1);
      const s = r.getChildByName('btn_buy').getChildByName('currency');
      (s.visible = !0),
        game.LoadMgr.setImgSkin(
          s,
          cfg.item_definition.currency.get(a.source_currency).icon
        ),
        (r
          .getChildByName('btn_buy')
          .getChildByName('label_gold').text = a.source_value.toString()),
        game.Tools.child_align_center(r.getChildByName('btn_buy')),
        (r.getChildByName('shouchong').visible = !1),
        (r.getChildByName('desc').text = '');
    }),
    (o.prototype.render_searchexchange = function({index, container}) {
      const e = this, i = index, n = container, a = cfg.exchange.searchexchange.get(this.items[i]), r = n.getChildByName('btn');
      (r.clickHandler = Laya.Handler.create(
        this,
        () => {
          e.buy_single.show_searchexchange(e.items[i]);
        },
        null,
        !1
      )),
        (r.getChildByName('label_name').text =
          a[`name_${GameMgr.client_language}`]),
        game.LoadMgr.setImgSkin(r.getChildByName('icon'), a.icon),
        (r.filters = []),
        (r.getChildByName('buyed').visible = !1),
        (r.getChildByName('count').visible = !1);
      const s = r.getChildByName('btn_buy').getChildByName('currency');
      (s.visible = !0),
        game.LoadMgr.setImgSkin(
          s,
          cfg.item_definition.currency.get(a.source_currency).icon
        ),
        (r
          .getChildByName('btn_buy')
          .getChildByName('label_gold').text = a.source_value.toString()),
        game.Tools.child_align_center(r.getChildByName('btn_buy')),
        (r.getChildByName('shouchong').visible = !1),
        (r.getChildByName('desc').text = '');
    }),
    (o.prototype.render_good_shelves = function({index, container}) {
      let i;
      const n = this;
      const a = index;
      const r = container.getChildByName('btn');
      cfg.mall.goods_shelves
        .getGroup(this.goods_sheleve_id)
        .forEach(t => {
          t.goods_id == n.items[a] && (i = t);
        }),
        (r.clickHandler = Laya.Handler.create(
          this,
          () => {
            if (100718 != GameMgr.Inst.account_id)
              if (
                (n.app_shop &&
                  (n.app_shop.recover_pre_order(n.items[a])
                    ? t.UI_LightTips.Inst.show(
                        game.Tools.strOfLocalization(2168)
                      )
                    : n.buy_single.show_recharge(
                        n.goods_sheleve_id,
                        n.items[a]
                      )),
                GameMgr.iniOSWebview)
              )
                t.UI_Popout.PopOutNoTitle(
                  game.Tools.strOfLocalization(2169),
                  null
                );
              else if ('chs' == GameMgr.client_language)
                if (
                  t.UI_ShiMingRenZheng.renzhenged ||
                  GameMgr.Inst.player_in_haiwai
                ) {
                  let e = '', i = '';
                  if (
                    (o.payment_info &&
                      '' != o.payment_info &&
                      (0 == o.payment_info_show_type &&
                        (e = o.payment_info),
                      1 == o.payment_info_show_type &&
                        (i = o.payment_info)),
                    e && '' != e)
                  )
                    t.UI_Popout.PopOutNoTitle(e, null);
                  else {
                    0 == n.page_choose.getShowedChoose().length
                      ? t.UI_Popout.PopOutNoTitle(
                          game.Tools.strOfLocalization(104),
                          null
                        )
                      : n.page_choose.show(n.items[a], i);
                  }
                } else t.UI_ShiMingRenZheng.Inst.show();
              else
                'jp' == GameMgr.client_language
                  ? GameMgr.Inst.account_data.birthday
                    ? n.page_choose_en.show(n.items[a], '')
                    : t.UI_Agepending.Inst.show()
                  : 'en' == GameMgr.client_language &&
                    n.page_choose_en.show(n.items[a], '');
            else n.page_choose.show(n.items[a], '');
          },
          null,
          !1
        ));
      const s = cfg.mall.goods.get(this.items[a]);
      (r.getChildByName('label_name').text = s.name),
        game.LoadMgr.setImgSkin(r.getChildByName('icon'), s.icon),
        (r.filters = []),
        (r.getChildByName('buyed').visible = !1),
        (r.getChildByName('count').visible = !1),
        (r
          .getChildByName('btn_buy')
          .getChildByName('currency').visible = !1);
      let l = null;
      this.app_shop && (l = this.app_shop.getGoodsInfo(this.items[a])),
        (r.getChildByName('btn_buy').getChildByName('label_gold').text = l
          ? l.price
          : i.price),
        game.Tools.child_align_center(r.getChildByName('btn_buy')),
        o.new_recharge_list[s.cny]
          ? ((r.getChildByName('shouchong').visible = !1),
            (r.getChildByName('desc').text = s.normal_desc),
            (r.getChildByName('desc').color = '#f17828'))
          : ((r.getChildByName('shouchong').visible = !0),
            (r.getChildByName('desc').text = s.first_desc),
            (r.getChildByName('desc').color = '#f56aff'));
    }),
    (o.prototype.want_to_exchange = e => {
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
    }),
    (o.prototype.want_to_searchexchange = e => {
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
    }),
    (o.prototype.want_to_recharge = function(t) {
      const e = this;
      this.app_shop &&
        ((this.container_loading.visible = !0),
        this.app_shop.want2BuyItem(
          t,
          Laya.Handler.create(this, () => {
            e.container_loading.visible = !1;
          })
        ));
    }),
    (o.open_payment = !1),
    (o.payment_info_show_type = 1),
    (o.payment_info = ''),
    (o.open_wx = !0),
    (o.wx_type = 0),
    (o.open_alipay = !0),
    (o.alipay_type = 0),
    (o.new_recharge_list = {}),
    (o.vip_reward_getted = null),
    o
  ;
  })(t.UIBase);

  t.UI_Recharge = c;
})(uiscript || (uiscript = {}));