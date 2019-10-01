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
      var t = e.call(this, new ui.lobby.payment.wxcodeUI()) || this;
      return (
        (t.root = null),
        (t.icon = null),
        (t.label_title = null),
        (t.label_price = null),
        (t.label_method = null),
        (t.loading = null),
        (t.locking = !1),
        (t.id = 0),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.onPayResult = function(t) {
        this.Inst &&
          this.Inst.enable &&
          this.Inst.order_id == t.order_id &&
          this.Inst.close();
      }),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.icon = this.root.getChildByName('icon')),
          (this.icon.skin = ''),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            !1
          )),
          (this.root.getChildByName(
            'btn_close2'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
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
          (this.loading = this.root.getChildByName('loading'));
      }),
      (i.prototype.show = function(e, i) {
        var n = this;
        (this.locking = !0),
          (this.enable = !0),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = !1;
            })
          ),
          (this.loading.visible = !0),
          this.id++;
        var a,
          r = this.id;
        (a = 1010 == e ? cfg.mall.month_ticket.get(e) : cfg.mall.goods.get(e)),
          (this.label_title.text = a.name),
          (this.label_price.text = a.price);
        var s = '';
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
            function(e, i) {
              if (n.me.visible && r == n.id)
                if (e || i.error)
                  t.UIMgr.Inst.showNetReqError(s, e, i), n.close();
                else {
                  app.Log.log(s + ' ' + JSON.stringify(i)),
                    (n.order_id = i.order_id);
                  var a = i.qrcode_buffer;
                  GameMgr.inConch,
                    Laya.loader.load(
                      a,
                      Laya.Handler.create(n, function() {
                        r == n.id && n.me.visible
                          ? ((n.icon.skin = a), (n.loading.visible = !1))
                          : n.release_code(a);
                      })
                    );
                }
            }
          );
      }),
      (i.prototype.release_code = function(t) {
        var e = Laya.loader.getRes(t);
        e && e.destroy();
      }),
      (i.prototype.close = function() {
        var e = this;
        app.Log.log('wxcode close'),
          (this.locking = !0),
          (this.order_id = ''),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.enable = !1),
                (e.locking = !1),
                '' != e.icon.skin &&
                  (e.release_code(e.icon.skin), (e.icon.skin = ''));
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Payment_Wxcode = e;
})(uiscript || (uiscript = {}));