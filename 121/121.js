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
    class t {
      constructor(t, e) {
        var i = this;
        this.me = t;
        this.func_pending = e;
        this.txtinput = t.getChildByName('txtinput');
        this.wrong = t.getChildByName('no');
        this.accept = t.getChildByName('yes');

        this.txtinput.on('focus', this, () => {
          i.wrong.visible = !1;
          i.accept.visible = !1;
        });

        this.txtinput.on('blur', this, () => {
          i.wrong.visible = !1;
          i.accept.visible = !1;
          '' != i.txtinput.text &&
            (i.isOK ? (i.accept.visible = !0) : (i.wrong.visible = !0));
        });

        this.reset();
      }

      get text() {
        return this.txtinput.text;
      }

      get isOK() {
        return !this.func_pending || this.func_pending.run();
      }

      reset() {
        this.txtinput.text = '';
        this.wrong.visible = !1;
        this.accept.visible = !1;
      }
    }

    return t;
  })();

  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.entrance.reset_passwordUI()) || this;
        t.sended = !1;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var i = this;

        this.root = this.me
          .getChildByName('page_reset_password')
          .getChildByName('root');

        this.container_input_mail = this.root.getChildByName(
            'container_input_mail'
          );

        this.btn_send = this.container_input_mail.getChildByName(
            'btn_send'
          );
        var n = !1,
          a = 0,
          r = 0,
          s = () => {
            n ||
              Laya.timer.currTimer < r ||
              game.Tools.setGrayDisable(i.btn_send, !1);
          };

        this.btn_send.clickHandler = new Laya.Handler(this, () => {
          if (!i.locking && '' != i.input_email.text && i.input_email.isOK) {
            i.close();
            if (game.Tools.pending_phonenumber_valid(i.input_email.text))
              return void t.UI_Entrance_Reset_PWD_Phone2.Inst.show(
                i.input_email.text
              );
            if (!n) {
              game.Tools.setGrayDisable(i.btn_send, !0);
              n = !0;
              a++;
              r = Laya.timer.currTimer + 1300 * a;
              Laya.timer.once(1300 * a, i, () => {
                s();
              });
              var e = i.input_email.text,
                o = new Laya.HttpRequest();

              o.once(Laya.Event.COMPLETE, i, a => {
                var r = JSON.parse(a);
                n = !1;
                s();
                i.sended = !0;
                i.label_email.text = game.Tools.encode_email(e);
                r.error && r.error.code
                  ? t.UI_Entrance.Inst.showError('', r.error.code)
                  : (i.refresh_show());
              });

              o.once(Laya.Event.ERROR, i, e => {
                n = !1;
                s();
                t.UI_Entrance_Error.Inst.show(
                  game.Tools.strOfLocalization(2790),
                  !1
                );
              });

              o.send(
                `${GameMgr.config_data.system_email_url}/api/user/forget_password`,
                `email=${i.input_email.text}`,
                'post'
              );
            }
          }
        });

        this.input_email = new e(
            this.container_input_mail.getChildByName('container_account'),
            new Laya.Handler(this, () => game.Tools.pending_email_vaild(i.input_email.text) ||
            game.Tools.pending_phonenumber_valid(i.input_email.text))
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            i.locking || i.close();
          });

        this.root.getChildByName(
            'btn_back'
          ).clickHandler = new Laya.Handler(this, () => {
          i.sended = !1;
          i.locking ||
            (i.sended ? (i.refresh_show()) : i.close());
        });

        this.container_success = this.root.getChildByName(
            'container_success'
          );

        this.container_success.getChildByName(
            'btn_confirm'
          ).clickHandler = new Laya.Handler(this, () => {
            i.locking || i.close();
          });

        this.label_email = this.container_success.getChildByName('mail');
      }

      show() {
        var e = this;
        this.sended = !1;
        this.refresh_show();
        this.locking = !0;
        this.enable = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
      }

      refresh_show() {
        this.container_input_mail.visible = !1;
        this.container_input_mail.visible = !0;
        this.sended
          ? (this.container_success.visible = !0)
          : (this.container_success.visible = !1);
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

    __extends(n, i);

    return n;
  })(t.UIBase);

  t.UI_Entrance_Reset_Password = i;
})(uiscript || (uiscript = {}));