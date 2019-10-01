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
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.lobby.payment.buy_yueka_enUI()) || this;
        t.pay_types = [];
        t.current_goods_id = 0;
        t._en_card_ = null;
        t._adyen_date = {};
        t._adyen_btn_confirm = null;
        t._adyen_btn_cancel = null;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;
        this.me.visible = !1;
        this.root = this.me.getChildByName('root');

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            t.locking || t.close();
          });

        this.label_item_name = this.root.getChildByName('name');
        this.label_desc = this.root.getChildByName('desc');
        this.label_price = this.root.getChildByName('price');
        this.label_vip_word = this.root.getChildByName('label_vip_exp');
        this.label_vip = this.root.getChildByName('vip_exp');
        this.label_extendinfo = this.root.getChildByName('extendinfo');
        this.scroll_view = this.root.scriptMap['capsui.CScrollView'];

        this.scroll_view.init_scrollview(
          new Laya.Handler(this, this.render_item)
        );

        this.pay_types = [];
        'jp' == GameMgr.client_language
          ? (this.pay_types = [
              'CreditCard',
              'Paypal',
              'Docomo',
              'Au',
              'Softbank',
              'WebMoney'
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

      show(e) {
        var i = this;
        this.current_goods_id = 2010;
        'jp' == GameMgr.client_language
          ? (this.current_goods_id = 2010)
          : 'en' == GameMgr.client_language && (this.current_goods_id = 3010);
        var n = cfg.mall.month_ticket.get(this.current_goods_id);
        this.label_item_name.text = n.name;
        this.label_price.text = n.price;

        this.label_desc.text =
            t.UI_Activity_Yueka.GetYuekaLeftDays(this.current_goods_id) >= 0
              ? n.desc_detail2
              : n.desc_detail;

        this.label_vip.text = n.vip_exp.toString();

        this.label_vip.x =
            this.label_vip_word.x +
            this.label_vip_word.textField.textWidth +
            10;

        e || (e = '');
        this.label_extendinfo.text = e;
        this.scroll_view.reset();
        this.scroll_view.addItem(this.pay_types.length);
        this.locking = !0;
        this.enable = !0;

        app.PlayerBehaviorStatistic.fb_trace_force(
          app.EBehaviorType.Purchase_Click
        );

        app.PlayerBehaviorStatistic.google_trace_force(
          app.EBehaviorType.G_Purchase_click
        );

        n &&
          (t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            i.locking = !1;
          })
        ));
      }

      render_item({index, container}) {
        var e = this;
        var i = index;
        var n = container;
        n.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            e.onClickAtPay(e.pay_types[i]);
          },
          null,
          !1
        );
        var a = this.pay_types[i];
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
              break;
            case 'WebMoney':
              a = 'WebMoney';
          }
        n.getChildByName('btn').getChildByName('name').text = a;
      }

      onClickAtPay(e) {
        var i = this;
        this.close();
        t.UI_Payment_Loading.Inst.enable = !0;
        t.UI_Payment_Loading.Inst.enable = !0;
        t.UI_Payment_Loading.Inst.enable = !0;
        if ('jp' == GameMgr.client_language)
          'CreditCard' == e
            ? (t.UI_Payment_Creditcard.Inst.show(this.current_goods_id))
            : ('Paypal' != e &&
                'Au' != e &&
                'Docomo' != e &&
                'Softbank' != e &&
                'WebMoney' != e) ||
              (app.NetAgent.sendReq2Lobby(
            'Lobby',
            `createJP${e}Order`,
            {
              goods_id: this.current_goods_id,
              client_type: 0,
              account_id: GameMgr.Inst.account_id,
              return_url: t.UI_Recharge.open_new_window()
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
                else if (1991 == a.error.code) t.UI_Agepending.Inst.show();
                else if (1992 == a.error.code) {
                  var r = JSON.parse(a.error.json_param);
                  t.UI_Agexiane.Inst.show(r.recharged, r.age);
                } else
                  t.UIMgr.Inst.showNetReqError(
                    `createJP${e}Order`,
                    n,
                    a
                  );
                t.UI_Payment_Loading.Inst.enable = !1;
              } else {
                var s = {};
                s.type = e;
                s.lang = 'ja';
                s.accessToken = GameMgr.Inst.yostar_accessToken;
                s.orderId = a.order_id;

                'Paypal' == e || 'WebMoney' == e
                  ? (s.itemName = cfg.mall.month_ticket.get(
                      i.current_goods_id
                    ).name)
                  : 'Au' == e &&
                    (s.itemName = game.Tools.ToDBC(
                      cfg.mall.month_ticket.get(i.current_goods_id).name
                    ));

                s.openNewWindow = t.UI_Recharge.open_new_window();
                Yo.execOrder(s);
                t.UI_Payment_Loading.Inst.enable = !1;
              }
            }
          ));
        else if ('Paypal' == e)
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'createENPaypalOrder',
            {
              goods_id: this.current_goods_id,
              client_type: 0,
              account_id: GameMgr.Inst.account_id,
              return_url: t.UI_Recharge.open_new_window()
                ? 'Yo://CloseWindow'
                : GameMgr.Inst.link_url,
              access_token: GameMgr.Inst.yostar_accessToken
            },
            (i, n) => {
              t.UIMgr.Inst.showNetReqError('createENPaypalOrder', i, n);
              if (i || n.error)
                t.UI_Payment_Loading.Inst.enable = !1;
              else {
                var a = {};
                a.type = e;
                a.lang = 'en';
                a.accessToken = GameMgr.Inst.yostar_accessToken;
                a.orderId = n.order_id;
                a.openNewWindow = t.UI_Recharge.open_new_window();
                Yo.execOrder(a);
                t.UI_Payment_Loading.Inst.enable = !1;
              }
            }
          );
        else if ('Alipay' == e)
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'createENAlipayOrder',
            {
              goods_id: this.current_goods_id,
              client_type: 0,
              account_id: GameMgr.Inst.account_id,
              return_url: t.UI_Recharge.open_new_window()
                ? 'Yo://CloseWindow'
                : GameMgr.Inst.link_url,
              access_token: GameMgr.Inst.yostar_accessToken
            },
            (e, i) => {
              t.UIMgr.Inst.showNetReqError('createENAlipayOrder', e, i);
              if (e || i.error)
                t.UI_Payment_Loading.Inst.enable = !1;
              else {
                var n = {};
                n.type = 'Adyen.Alipay';
                n.lang = 'en';
                n.accessToken = GameMgr.Inst.yostar_accessToken;
                n.orderId = i.order_id;
                n.openNewWindow = t.UI_Recharge.open_new_window();
                Yo.execOrder(n);
                t.UI_Payment_Loading.Inst.enable = !1;
              }
            }
          );
        else if ('MasterCard' == e || 'Visa' == e || 'JCB' == e) {
          t.UI_Payment_Loading.Inst.enable = !0;
          if (
            (null == this._en_card_)
          ) {
            var n = GameMgr.Inst.link_url;
            '/' == n[n.length - 1] && (n = n.substr(0, n.length - 1));
            var a = GameMgr.config_data.checkoutShopperUrl;
            Yo.generateOriginKey({ originDomain: n }, (t, {originKeys}) => {
              if (t) console.error(t);
              else {
                var r = {
                    locale: 'en_US',
                    originKey: originKeys[n],
                    loadingContext: `${a}/checkoutshopper/`
                  };

                var s = new AdyenCheckout(r);
                var o = i;

                o._en_card_ = s
                  .create('card', {
                    onChange({isValid, data}, e) {
                      o._adyen_date.encryptedCardNumber = '';
                      o._adyen_date.encryptedExpiryMonth = '';
                      o._adyen_date.encryptedExpiryYear = '';
                      o._adyen_date.encryptedSecurityCode = '';
                      o._adyen_date.isValid = !1;
                      if (isValid) {
                        var i = data;
                        var n = i.encryptedCardNumber;
                        var a = i.encryptedExpiryMonth;
                        var r = i.encryptedExpiryYear;
                        var s = i.encryptedSecurityCode;
                        o._adyen_date.encryptedCardNumber = n;
                        o._adyen_date.encryptedExpiryMonth = a;
                        o._adyen_date.encryptedExpiryYear = r;
                        o._adyen_date.encryptedSecurityCode = s;
                        o._adyen_date.isValid = !0;
                        o._adyen_btn_confirm.hidden = !1;
                      } else
                        o._adyen_btn_confirm.hidden = !0;
                    }
                  })
                  .mount('#card');

                document.getElementById('container_card').hidden = !1;
              }
            });
          } else document.getElementById('container_card').hidden = !1;
          if (null == this._adyen_btn_confirm) {
            this._adyen_btn_confirm = document.getElementById('card_confirm');
            this._adyen_btn_cancel = document.getElementById('card_cancel');
            var r = this;
            this._adyen_btn_cancel.innerText = 'Cancel';

            this._adyen_btn_cancel.onclick = () => {
              document.getElementById('container_card').hidden = !0;
              t.UI_Payment_Loading.Inst.enable = !1;
            };

            this._adyen_btn_confirm.innerText = 'Ok';

            this._adyen_btn_confirm.onclick = () => {
              document.getElementById('container_card').hidden = !0;
              r._adyen_date.isValid
                ? app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    `createEN${e}Order`,
                    {
                      goods_id: i.current_goods_id,
                      client_type: 0,
                      account_id: GameMgr.Inst.account_id,
                      return_url: t.UI_Recharge.open_new_window()
                        ? 'Yo://CloseWindow'
                        : GameMgr.Inst.link_url,
                      access_token: GameMgr.Inst.yostar_accessToken
                    },
                    (i, n) => {
                      t.UIMgr.Inst.showNetReqError(
                        `createEN${e}Order`,
                        i,
                        n
                      );

                      if (i || n.error)
                        t.UI_Payment_Loading.Inst.enable = !1;
                      else {
                        var a = {};
                        a.type = 'Adyen.CreditCard';
                        a.lang = 'en';
                        a.accessToken = GameMgr.Inst.yostar_accessToken;
                        a.orderId = n.order_id;

                        a.encryptedCardNumber =
                            r._adyen_date.encryptedCardNumber;

                        a.encryptedExpiryMonth =
                            r._adyen_date.encryptedExpiryMonth;

                        a.encryptedExpiryYear =
                            r._adyen_date.encryptedExpiryYear;

                        a.encryptedSecurityCode =
                            r._adyen_date.encryptedSecurityCode;

                        a.openNewWindow = t.UI_Recharge.open_new_window();
                        Yo.execOrder(a);
                        t.UI_Payment_Loading.Inst.enable = !1;
                      }
                    }
                  )
                : (t.UI_Payment_Loading.Inst.enable = !1);
            };

            this._adyen_btn_confirm.hidden = !0;
          }
        }
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Payment_Yueka_EN = e;
})(uiscript || (uiscript = {}));