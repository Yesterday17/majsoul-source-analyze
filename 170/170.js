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
        var t = e.call(this, new ui.both_ui.gitfcodeUI()) || this;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');
        this.input = this.root.getChildByName('input');

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            !1
          );

        this.btn_confirm = this.root.getChildByName('btn_confirm');

        this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.btn_cd = Laya.timer.currTimer + 1e3;
              e.locking ||
                e.btn_cd > Laya.timer.currTimer ||
                (app.NetAgent.sendReq2Lobby(
                'Lobby',
                'useGiftCode',
                { code: e.input.text },
                (i, n) => {
                  e.btn_cd = 0;
                  i || n.error
                    ? t.UIMgr.Inst.showNetReqError('useGiftCode', i, n)
                    : game.Tools.showRewards(n, null);
                }
              ));
            },
            null,
            !1
          );

        this.input.on('input', this, () => {
          e.btn_confirm.visible = 12 == e.input.text.length;
        });
      }

      show() {
        var e = this;
        this.enable = !0;
        this.locking = !0;
        this.input.text = '';
        this.btn_cd = 0;
        this.btn_confirm.visible = !1;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
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

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_Giftcode = e;
})(uiscript || (uiscript = {}));