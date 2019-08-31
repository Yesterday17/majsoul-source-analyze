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
      function t(t, e) {
        const i = this;
        (this.me = t),
          (this.func_pending = e),
          (this.txtinput = t.getChildByName('txtinput')),
          (this.wrong = t.getChildByName('no')),
          (this.accept = t.getChildByName('yes')),
          this.txtinput.on('focus', this, () => {
            (i.wrong.visible = !1), (i.accept.visible = !1);
          }),
          this.txtinput.on('blur', this, () => {
            (i.wrong.visible = !1),
              (i.accept.visible = !1),
              '' != i.txtinput.text &&
                (i.isOK ? (i.accept.visible = !0) : (i.wrong.visible = !0));
          }),
          this.reset();
      }
      return Object.defineProperty(t.prototype, 'text', {
        get() {
          return this.txtinput.text;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t.prototype, 'isOK', {
        get() {
          return !this.func_pending || this.func_pending.run();
        },
        enumerable: !0,
        configurable: !0
      }),
      (t.prototype.reset = function() {
        (this.txtinput.text = ''),
          (this.wrong.visible = !1),
          (this.accept.visible = !1);
      }),
      t
    ;
    })();

  const i = (i => {
    function n() {
      const t = i.call(this, new ui.entrance.reset_passwordUI()) || this;
      return (t.sended = !1), (n.Inst = t), t;
    }
    return __extends(n, i),
    (n.prototype.onCreate = function() {
      const i = this;
      (this.root = this.me
        .getChildByName('page_reset_password')
        .getChildByName('root')),
        (this.container_input_mail = this.root.getChildByName(
          'container_input_mail'
        )),
        (this.btn_send = this.container_input_mail.getChildByName(
          'btn_send'
        ));
      let n = !1;
      let a = 0;
      let r = 0;

      const s = () => {
        n ||
          Laya.timer.currTimer < r ||
          game.Tools.setGrayDisable(i.btn_send, !1);
      };

      (this.btn_send.clickHandler = new Laya.Handler(this, () => {
        if (
          !i.locking &&
          '' != i.input_email.text &&
          i.input_email.isOK &&
          !n
        ) {
          game.Tools.setGrayDisable(i.btn_send, !0),
            (n = !0),
            a++,
            (r = Laya.timer.currTimer + 1300 * a),
            Laya.timer.once(1300 * a, i, () => {
              s();
            });
          const e = i.input_email.text, o = new Laya.HttpRequest();
          o.once(Laya.Event.COMPLETE, i, a => {
            const r = JSON.parse(a);
            (n = !1),
              s(),
              r.error && r.error.code
                ? t.UI_Entrance.Inst.showError('', r.error.code)
                : ((i.sended = !0),
                  (i.label_email.text = game.Tools.encode_email(e)),
                  i.refresh_show());
          }),
            o.once(Laya.Event.ERROR, i, e => {
              (n = !1),
                s(),
                t.UI_Entrance_Error.Inst.show(
                  game.Tools.strOfLocalization(2790),
                  !1
                );
            }),
            o.send(
              `${GameMgr.config_data.system_email_url}/api/user/forget_password`,
              `email=${i.input_email.text}`,
              'post'
            );
        }
      })),
        (this.input_email = new e(
          this.container_input_mail.getChildByName('container_account'),
          new Laya.Handler(this, () => game.Tools.pending_email_vaild(i.input_email.text))
        )),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          i.locking || i.close();
        })),
        (this.container_success = this.root.getChildByName(
          'container_success'
        )),
        (this.container_success.getChildByName(
          'btn_confirm'
        ).clickHandler = new Laya.Handler(this, () => {
          i.locking || i.close();
        })),
        (this.label_email = this.container_success.getChildByName('mail'));
    }),
    (n.prototype.show = function() {
      const e = this;
      this.refresh_show(),
        (this.locking = !0),
        (this.enable = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
    }),
    (n.prototype.refresh_show = function() {
      this.sended
        ? ((this.container_input_mail.visible = !1),
          (this.container_success.visible = !0))
        : ((this.container_input_mail.visible = !0),
          (this.container_success.visible = !1));
    }),
    (n.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    n
  ;
  })(t.UIBase);

  t.UI_Entrance_Reset_Password = i;
})(uiscript || (uiscript = {}));