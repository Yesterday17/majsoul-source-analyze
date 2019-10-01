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
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.payment.choose_method_chsUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.label_title = this.root.getChildByName('title')),
          (this.label_price = this.root.getChildByName('price'));
        var i = this.root.getChildByName('lst'),
          n = i.getChildByName('wx'),
          a = i.getChildByName('alipay'),
          r = i.getChildByName('alipay_code');
        (n.clickHandler = Laya.Handler.create(
          this,
          function() {
            e.locking ||
              (e.close(null),
              game.Tools.CannotPay()
                ? t.UIMgr.Inst.ShowErrorInfo('暂未开通')
                : GameMgr.inChina &&
                  (GameMgr.inConch
                    ? ((t.UI_Payment_Loading.Inst.enable = !0),
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'createWechatAppOrder',
                        {
                          goods_id: e.goods_id,
                          client_type: 0,
                          account_id: GameMgr.Inst.account_id
                        },
                        function(e, i) {
                          if (
                            ((t.UI_Payment_Loading.Inst.enable = !1),
                            e || i.error)
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
                    ? ((t.UI_Payment_Loading.Inst.enable = !0),
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'createWechatAppOrder',
                        {
                          goods_id: e.goods_id,
                          client_type: 0,
                          account_id: GameMgr.Inst.account_id
                        },
                        function(e, i) {
                          if (
                            ((t.UI_Payment_Loading.Inst.enable = !1),
                            e || i.error)
                          )
                            t.UIMgr.Inst.showNetReqError(
                              'createWechatAppOrder',
                              e,
                              i
                            );
                          else {
                            var n = i.call_wechat_app_param,
                              a =
                                n.partnerid +
                                ',' +
                                n.prepayid +
                                ',' +
                                n.package +
                                ',' +
                                n.noncestr +
                                ',' +
                                n.timestamp +
                                ',' +
                                n.sign;
                            Laya.Browser.window.wkbridge.callNative(
                              'wxpay',
                              a,
                              function() {}
                            );
                          }
                        }
                      ))
                    : t.UI_Payment_Wxcode.Inst.show(e.goods_id, !0)));
          },
          null,
          !1
        )),
          (a.clickHandler = Laya.Handler.create(
            this,
            function() {
              if (!e.locking)
                if ((e.close(null), game.Tools.CannotPay()))
                  t.UIMgr.Inst.ShowErrorInfo('暂未开通');
                else if (GameMgr.inChina) {
                  t.UI_Payment_Loading.Inst.enable = !0;
                  var i = -1;
                  if (
                    (GameMgr.inConch || GameMgr.iniOSWebview
                      ? 0 == t.UI_Recharge.alipay_type ||
                        2 == t.UI_Recharge.alipay_type ||
                        3 == t.UI_Recharge.alipay_type
                        ? (i = 0)
                        : 1 == t.UI_Recharge.alipay_type && (i = 1)
                      : 1 == t.UI_Recharge.alipay_type ||
                        2 == t.UI_Recharge.alipay_type
                      ? (i = 1)
                      : 0 == t.UI_Recharge.alipay_type && (i = 0),
                    1 == i)
                  )
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createAlipayScanOrder',
                      {
                        goods_id: e.goods_id,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id
                      },
                      function(e, i) {
                        if (
                          ((t.UI_Payment_Loading.Inst.enable = !1),
                          e || i.error)
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
                                  function() {}
                                )
                              : (Laya.Browser.window.location.href = n);
                        }
                      }
                    );
                  else if (0 == i) {
                    var n = '';
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
                          goods_id: e.goods_id,
                          client_type: 0,
                          account_id: GameMgr.Inst.account_id,
                          alipay_trade_type: n,
                          return_url: GameMgr.Inst.link_url
                        },
                        function(e, i) {
                          if (
                            ((t.UI_Payment_Loading.Inst.enable = !1),
                            e || i.error)
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
                                function() {}
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
          )),
          (r.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.close(null),
                GameMgr.inChina &&
                  t.UI_Payment_Wxcode.Inst.show(e.goods_id, !1));
            },
            null,
            !1
          )),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close(null);
            },
            null,
            !1
          ));
      }),
      (i.prototype.getShowedChoose = function() {
        var e = this.root.getChildByName('lst'),
          i = e.getChildByName('wx'),
          n = e.getChildByName('alipay'),
          a = e.getChildByName('alipay_code');
        if (game.Tools.CannotPay())
          return (a.visible = !1), (n.visible = !0), (i.visible = !1), [n];
        var r = [];
        if (
          (t.UI_Recharge.open_wx
            ? GameMgr.inConch || GameMgr.iniOSWebview || !Laya.Browser.onPC
              ? (i.visible = !1)
              : ((i.visible = !0), r.push(i))
            : (i.visible = !1),
          t.UI_Recharge.open_alipay)
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
            : 0 == t.UI_Recharge.alipay_type && (s = 0),
            1 == s
              ? GameMgr.inConch || GameMgr.iniOSWebview || !Laya.Browser.onPC
                ? ((n.visible = !0), r.push(n))
                : (n.visible = !1)
              : 0 == s
              ? ((n.visible = !0), r.push(n))
              : (n.visible = !1),
            1 == s ? ((a.visible = !0), r.push(a)) : (a.visible = !1);
        } else (n.visible = !1), (a.visible = !1);
        return r;
      }),
      (i.prototype.show = function(e, i) {
        var n = this;
        this.goods_id = e;
        var a = cfg.mall.goods.get(e);
        (this.label_title.text = a.name),
          (this.label_price.text = a.price),
          i || (i = ''),
          (this.root.getChildByName('extendinfo').text = i),
          (this.locking = !0),
          (this.me.visible = !0),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = !1;
            })
          );
        var r = this.root.getChildByName('lst'),
          s = this.getShowedChoose();
        if (((r.vScrollBarSkin = ''), s.length <= 2))
          for (o = 0; o < s.length; o++) s[o].y = 50 + 144 * o;
        else for (var o = 0; o < s.length; o++) s[o].y = 144 * o;
        (r.vScrollBar.value = 0), r.refresh();
      }),
      (i.prototype.close = function(e) {
        var i = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (i.locking = !1), (i.me.visible = !1), e && e.run();
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Payment_ChooseMethod_CHS = e;
})(uiscript || (uiscript = {}));