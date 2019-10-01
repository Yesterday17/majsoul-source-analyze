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

var game;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this) || this;
        t.inited = !1;
        i.Inst = t;
        return t;
      }

      static on_getSkuDetails(t) {
        this.goods_info = {};
        if ((t)) {
          for (var e = 0; e < t.length; e++) {
            var i = t[e];
            var n = i.productId;
            this.goods_info[n] = i;
          }
          Laya.PlatformClass.createClass('layaair.majsoul.mjmgr').call(
            'getGPOwnedItems'
          );
        }
      }

      static on_gp_get_owneditems(t) {
        this.orders = [];
        if ((t)) {
          for (a = 0; a < t.length; a++) {
            var e = t[a];
            this.orders.push({ sku: e.sku, data: e.data, sign: e.sign });
          }
          for (
            var i = t => {
                var e = n.orders[t];
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'solveGooglePlayOrder',
                  {
                    inapp_purchase_data: JSON.stringify(e.data),
                    inapp_data_signature: e.sign
                  },
                  (t, {error}) => {
                    if (t);
                    else if (error) {
                      var n = error.code;
                      if (1901 == n || 1902 == n) {
                        (a = Laya.PlatformClass.createClass(
                          'layaair.majsoul.mjmgr'
                        )).call('consumeGPItem', e.data.purchaseToken);
                      }
                    } else {
                      var a = Laya.PlatformClass.createClass(
                        'layaair.majsoul.mjmgr'
                      );
                      a.call('consumeGPItem', e.data.purchaseToken);
                    }
                  }
                );
              },
              n = this,
              a = 0;
            a < this.orders.length;
            a++
          )
            i(a);
        }
      }

      static on_gp_buy_result(t, e) {
        var i = t.productId;
        this.orders.push({ sku: i, data: t, sign: e });
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'solveGooglePlayOrder',
          { inapp_purchase_data: JSON.stringify(t), inapp_data_signature: e },
          (e, i) => {
            if (e || i.error)
              uiscript.UIMgr.Inst.showNetReqError(
                'solveGooglePlayOrder',
                e,
                i
              );
            else {
              Laya.PlatformClass.createClass('layaair.majsoul.mjmgr').call(
                'consumeGPItem',
                t.purchaseToken
              );
            }
          }
        );
      }

      static on_consume_success(t) {
        for (var e = 0; e < this.orders.length; e++)
          if (this.orders[e].data.purchaseToken == t) {
            this.orders[e] = this.orders[this.orders.length - 1];
            this.orders.pop();
            break;
          }
      }

      static on_gp_pay_cancel() {
        app.NetAgent.sendReq2Lobby(
            'Lobby',
            'cancelGooglePlayOrder',
            { order_id: this.current_order_id },
            (t, e) => {
              (t || e.error) &&
                uiscript.UIMgr.Inst.showNetReqError(
                  'cancelGooglePlayOrder',
                  t,
                  e
                );
            }
          );

        this.current_order_id &&
          '' != this.current_order_id &&
          ((this.current_order_id = ''));
      }

      recover_pre_order(t) {
        for (
          var e = '', n = cfg.mall.product.getGroup(10), a = 0;
          a < n.length;
          a++
        )
          if (n[a].goods_id == t) {
            e = n[a].product_id;
            break;
          }
        if ('' == e) return !1;
        for (
          var r = t => {
              if (i.orders[t].sku == e) {
                var n = i.orders[t];

                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'solveGooglePlayOrder',
                  {
                    inapp_purchase_data: JSON.stringify(n.data),
                    inapp_data_signature: n.sign
                  },
                  (t, e) => {
                    if (t || e.error)
                      if (e && 1902 == e.error.code) {
                        (i = Laya.PlatformClass.createClass(
                          'layaair.majsoul.mjmgr'
                        )).call('consumeGPItem', n.data.purchaseToken);
                      } else
                        uiscript.UIMgr.Inst.showNetReqError(
                          'solveGooglePlayOrder',
                          t,
                          e
                        );
                    else {
                      var i = Laya.PlatformClass.createClass(
                        'layaair.majsoul.mjmgr'
                      );
                      i.call('consumeGPItem', n.data.purchaseToken);
                    }
                  }
                );

                return { value: !0 };
              }
            },
            a = 0;
          a < i.orders.length;
          a++
        ) {
          var s = r(a);
          if ('object' == typeof s) return s.value;
        }
        return !1;
      }

      getGoodsInfo(t) {
        for (
          var e = cfg.mall.product.getGroup(10), n = '', a = 0;
          a < e.length;
          a++
        )
          if (e[a].goods_id == t) {
            n = e[a].product_id;
            break;
          }
        if ('' == n) return null;
        if (i.goods_info[n]) {
          var r = i.goods_info[n];
          return { currency_code: r.price_currency_code, price: r.price };
        }
        return null;
      }

      onGameStart() {
        var t = cfg.mall.product.getGroup(10);
        var e = '';
        if (t) {
          0 != i && (e += ',');
          for (var i = 0; i < t.length; i++)
            e += t[i].product_id;
          Laya.PlatformClass.createClass('layaair.majsoul.mjmgr').call(
            'gp_getSkuDetail',
            e
          );
        }
      }

      want2BuyItem(t, e) {
        for (
          var n = '', a = cfg.mall.product.getGroup(10), r = 0;
          r < a.length;
          r++
        )
          if (a[r].goods_id == t) {
            n = a[r].product_id;
            break;
          }
        '' != n
          ? app.NetAgent.sendReq2Lobby(
              'Lobby',
              'createBillingOrder',
              {
                goods_id: t,
                payment_platform: 10,
                client_type: 1,
                account_id: GameMgr.Inst.account_id
              },
              (t, a) => {
                uiscript.UIMgr.Inst.showNetReqError(
                  'createBillingOrder',
                  t,
                  a
                );

                if (t || a.error)
                  e.runWith(0);
                else {
                  var r = a.order_id;
                  i.current_order_id = r;

                  Laya.PlatformClass.createClass('layaair.majsoul.mjmgr').call(
                    'gp_buySku',
                    n,
                    r
                  );

                  e.runWith(0);
                }
              }
            )
          : e.runWith(1);
      }
    }

    __extends(i, e);

    i.on_failed_info = t => {
      uiscript.UIMgr.Inst && uiscript.UIMgr.Inst.ShowErrorInfo(t);
    };

    i.on_gp_buy_error = (e, i) => {
      if (1 == i)
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'cancelGooglePlayOrder',
          { order_id: e },
          (t, e) => {
            (t || e.error) &&
              uiscript.UIMgr.Inst.showNetReqError(
                'cancelGooglePlayOrder',
                t,
                e
              );
          }
        );
      else {
        var n = '';
        switch (i) {
          case 2:
            n = t.Tools.strOfLocalization(2222);
            break;
          case 3:
            n = t.Tools.strOfLocalization(2223);
            break;
          case 4:
            n = t.Tools.strOfLocalization(2224);
            break;
          case 5:
          case 6:
            n = t.Tools.strOfLocalization(2225);
            break;
          case 7:
            n = t.Tools.strOfLocalization(2226);
        }
        '' != n && uiscript.UIMgr.Inst.ShowErrorInfo(n);
      }
    };

    i.goods_info = {};
    i.current_order_id = '';
    i.orders = [];
    return i;
  })(t.AppShop);
  t.GooglePlayShop = e;
})(game || (game = {}));