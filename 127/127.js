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
        var t = e.call(this, new ui.lobby.payment.wxcodeUI()) || this;
        t.root = null;
        t.icon = null;
        t.label_title = null;
        t.label_price = null;
        t.label_method = null;
        t.loading = null;
        t.locking = !1;
        t.id = 0;
        i.Inst = t;
        return t;
      }

      static onPayResult({order_id}) {
        this.Inst &&
          this.Inst.enable &&
          this.Inst.order_id == order_id &&
          this.Inst.close();
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.icon = this.root.getChildByName('icon');
        this.icon.skin = '';

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );

        this.root.getChildByName(
            'btn_close2'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.close();
            },
            null,
            !1
          );

        this.label_price = this.root
            .getChildByName('price')
            .getChildByName('v');

        this.label_title = this.root
            .getChildByName('title')
            .getChildByName('v');

        this.label_method = this.root.getChildByName('method');
        this.loading = this.root.getChildByName('loading');
      }

      show(e, i) {
        var n = this;
        this.locking = !0;
        this.enable = !0;

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );

        this.loading.visible = !0;
        this.id++;
        var a;
        var r = this.id;
        a = 1010 == e ? cfg.mall.month_ticket.get(e) : cfg.mall.goods.get(e);
        this.label_title.text = a.name;
        this.label_price.text = a.price;
        var s = '';
        this.label_method.text = game.Tools.strOfLocalization(2163);
        this.label_method.color = '#44b44c';
        this.label_method.text = game.Tools.strOfLocalization(2164);
        this.label_method.color = '#00a9ec';

        i
          ? (s = 'createWechatNativeOrder')
          : (s = 'createAlipayScanOrder');

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          s,
          {
            goods_id: e,
            client_type: 0,
            account_id: GameMgr.Inst.account_id
          },
          (e, i) => {
            t.UIMgr.Inst.showNetReqError(s, e, i);
            if (n.me.visible && r == n.id)
              if (e || i.error)
                n.close();
              else {
                app.Log.log(`${s} ${JSON.stringify(i)}`);
                n.order_id = i.order_id;
                var a = i.qrcode_buffer;
                GameMgr.inConch;
                Laya.loader.load(
                  a,
                  Laya.Handler.create(n, () => {
                    n.icon.skin = a;
                    r == n.id && n.me.visible
                      ? (n.loading.visible = !1)
                      : n.release_code(a);
                  })
                );
              }
          }
        );
      }

      release_code(t) {
        var e = Laya.loader.getRes(t);
        e && e.destroy();
      }

      close() {
        var e = this;
        app.Log.log('wxcode close');
        this.locking = !0;
        this.order_id = '';
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.enable = !1;
            e.locking = !1;
            e.release_code(e.icon.skin);
            '' != e.icon.skin &&
              ((e.icon.skin = ''));
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Payment_Wxcode = e;
})(uiscript || (uiscript = {}));