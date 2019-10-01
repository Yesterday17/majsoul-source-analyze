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
        var t = e.call(this, new ui.lobby.payment.choose_method_chsUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');
        this.label_title = this.root.getChildByName('title');
        this.label_price = this.root.getChildByName('price');
        var i = this.root.getChildByName('lst');
        var n = i.getChildByName('wx');
        var a = i.getChildByName('alipay');
        var r = i.getChildByName('alipay_code');

        n.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.close(null);
            t.UI_Payment_Loading.Inst.enable = !0;
            t.UI_Payment_Loading.Inst.enable = !0;
            e.locking ||
              ((game.Tools.CannotPay() ? t.UIMgr.Inst.ShowErrorInfo('暂未开通') : GameMgr.inChina &&
                (GameMgr.inConch
                  ? (app.NetAgent.sendReq2Lobby(
              'Lobby',
              'createWechatAppOrder',
              {
                goods_id: e.goods_id,
                client_type: 0,
                account_id: GameMgr.Inst.account_id
              },
              (e, i) => {
                t.UI_Payment_Loading.Inst.enable = !1;
                if (
                  (e || i.error)
                )
                  t.UIMgr.Inst.showNetReqError(
                    'createWechatAppOrder',
                    e,
                    i
                  );
                else {
                  var n = i.call_wechat_app_param;
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
                  ? (app.NetAgent.sendReq2Lobby(
              'Lobby',
              'createWechatAppOrder',
              {
                goods_id: e.goods_id,
                client_type: 0,
                account_id: GameMgr.Inst.account_id
              },
              (e, i) => {
                t.UI_Payment_Loading.Inst.enable = !1;
                if (
                  (e || i.error)
                )
                  t.UIMgr.Inst.showNetReqError(
                    'createWechatAppOrder',
                    e,
                    i
                  );
                else {
                  var n = i.call_wechat_app_param;

                  var a =
                    `${n.partnerid},${n.prepayid},${n.package},${n.noncestr},${n.timestamp},${n.sign}`;

                  Laya.Browser.window.wkbridge.callNative(
                    'wxpay',
                    a,
                    () => {}
                  );
                }
              }
            ))
                  : t.UI_Payment_Wxcode.Inst.show(e.goods_id, !0))));
          },
          null,
          !1
        );

        a.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close(null);
              if (!e.locking)
                if ((game.Tools.CannotPay()))
                  t.UIMgr.Inst.ShowErrorInfo('暂未开通');
                else if (GameMgr.inChina) {
                  t.UI_Payment_Loading.Inst.enable = !0;
                  var i = -1;

                  GameMgr.inConch || GameMgr.iniOSWebview
                      ? 0 == t.UI_Recharge.alipay_type ||
                        2 == t.UI_Recharge.alipay_type ||
                        3 == t.UI_Recharge.alipay_type
                        ? (i = 0)
                        : 1 == t.UI_Recharge.alipay_type && (i = 1)
                      : 1 == t.UI_Recharge.alipay_type ||
                        2 == t.UI_Recharge.alipay_type
                      ? (i = 1)
                      : 0 == t.UI_Recharge.alipay_type && (i = 0);

                  if (
                    (1 == i)
                  )
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createAlipayScanOrder',
                      {
                        goods_id: e.goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id
                      },
                      (e, i) => {
                        t.UI_Payment_Loading.Inst.enable = !1;
                        if (
                          (e || i.error)
                        )
                          t.UIMgr.Inst.showNetReqError(
                            'createAlipayScanOrder',
                            e,
                            i
                          );
                        else {
                          var n = i.qr_code;
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
                  else if (0 == i) {
                    var n = '';

                    n =
                      GameMgr.inConch || GameMgr.iniOSWebview
                        ? 'APP'
                        : Laya.Browser.onPC
                        ? 'PC_WEB'
                        : 'MOBILE_WEB';

                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createAlipayOrder',
                      {
                        goods_id: e.goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id,
                        alipay_trade_type: n,
                        return_url: GameMgr.Inst.link_url
                      },
                      (e, i) => {
                        t.UI_Payment_Loading.Inst.enable = !1;
                        if (
                          (e || i.error)
                        )
                          t.UIMgr.Inst.showNetReqError(
                            'createAlipayOrder',
                            e,
                            i
                          );
                        else {
                          var n = i.alipay_url;
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
            },
            null,
            !1
          );

        r.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close(null);
              e.locking ||
                (GameMgr.inChina &&
                t.UI_Payment_Wxcode.Inst.show(e.goods_id, !1));
            },
            null,
            !1
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close(null);
            },
            null,
            !1
          );
      }

      getShowedChoose() {
        var e = this.root.getChildByName('lst');
        var i = e.getChildByName('wx');
        var n = e.getChildByName('alipay');
        var a = e.getChildByName('alipay_code');
        a.visible = !1;
        n.visible = !0;
        i.visible = !1;
        if (game.Tools.CannotPay())
          return [n];
        var r = [];
        i.visible = !0;

        t.UI_Recharge.open_wx
            ? GameMgr.inConch || GameMgr.iniOSWebview || !Laya.Browser.onPC
              ? (i.visible = !1)
              : (r.push(i))
            : (i.visible = !1);

        n.visible = !1;
        if (
          (t.UI_Recharge.open_alipay)
        ) {
          var s = -1;

          GameMgr.inConch || GameMgr.iniOSWebview
            ? 0 == t.UI_Recharge.alipay_type ||
              2 == t.UI_Recharge.alipay_type ||
              3 == t.UI_Recharge.alipay_type
              ? (s = 0)
              : 1 == t.UI_Recharge.alipay_type && (s = 1)
            : 1 == t.UI_Recharge.alipay_type || 2 == t.UI_Recharge.alipay_type
            ? (s = 1)
            : 0 == t.UI_Recharge.alipay_type && (s = 0);

          n.visible = !0;
          n.visible = !0;

          1 == s
            ? GameMgr.inConch || GameMgr.iniOSWebview || !Laya.Browser.onPC
              ? (r.push(n))
              : (n.visible = !1)
            : 0 == s
            ? (r.push(n))
            : (n.visible = !1);

          a.visible = !0;
          1 == s ? (r.push(a)) : (a.visible = !1);
        } else a.visible = !1;
        return r;
      }

      show(e, i) {
        var n = this;
        this.goods_id = e;
        var a = cfg.mall.goods.get(e);
        this.label_title.text = a.name;
        this.label_price.text = a.price;
        i || (i = '');
        this.root.getChildByName('extendinfo').text = i;
        this.locking = !0;
        this.me.visible = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );
        var r = this.root.getChildByName('lst');
        var s = this.getShowedChoose();
        r.vScrollBarSkin = '';
        if ((s.length <= 2))
          for (o = 0; o < s.length; o++) s[o].y = 50 + 144 * o;
        else for (var o = 0; o < s.length; o++) s[o].y = 144 * o;
        r.vScrollBar.value = 0;
        r.refresh();
      }

      close(e) {
        var i = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            i.locking = !1;
            i.me.visible = !1;
            e && e.run();
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Payment_ChooseMethod_CHS = e;
})(uiscript || (uiscript = {}));