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
          (this.wrong = t.getChildByName('wrong')),
          (this.accept = t.getChildByName('accept')),
          this.txtinput.on('focus', this, () => {
            (i.wrong.visible = !1), (i.accept.visible = !1);
          }),
          this.txtinput.on('blur', this, () => {
            (i.wrong.visible = !1),
              (i.accept.visible = !1),
              '' != i.txtinput.text &&
                (!i.func_pending || i.func_pending.run()
                  ? (i.accept.visible = !0)
                  : (i.wrong.visible = !0));
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
      const t = i.call(this, new ui.both_ui.bind_mail1UI()) || this;
      return (n.Inst = t), t;
    }
    return __extends(n, i),
    (n.prototype.onCreate = function() {
      const i = this;
      (this.root = this.me.getChildByName('root')),
        (this.input_mail = new e(
          this.root.getChildByName('input_mail'),
          new Laya.Handler(this, () => game.Tools.pending_email_vaild(i.input_mail.text))
        )),
        (this.label_mail = this.root
          .getChildByName('label_email')
          .getChildByName('info')),
        (this.input_code = this.root
          .getChildByName('input_code')
          .getChildByName('txtinput')),
        (this.btn_send_code = this.root.getChildByName('btn_send_code')),
        (this.label_send_code = this.btn_send_code.getChildByName('info')),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.btn_confirm.clickHandler = new Laya.Handler(this, () => {
          if (!i.locking) {
            let e = '';
            if (!GameMgr.Inst.account_data.email) {
              if (!i.input_mail.isOK)
                return void t.UIMgr.Inst.ShowErrorInfo(
                  game.Tools.strOfLocalization(2786)
                );
              e = i.input_mail.text;
            }
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'bindEmail',
              {
                email: e,
                code: i.input_code.text,
                password: GameMgr.encodeP(GameMgr.Inst.password)
              },
              (n, a) => {
                (i.btn_confirm.mouseEnabled = !0),
                  n || a.error
                    ? (t.UIMgr.Inst.showNetReqError('bindEmail', n, a),
                      (i.last_send_time = 0))
                    : (t.UI_LightTips.Inst.show(
                        game.Tools.strOfLocalization(2785)
                      ),
                      (GameMgr.Inst.account_data.email = game.Tools.encode_email(
                        e
                      )),
                      (GameMgr.Inst.account_data.email_verify = 1),
                      i.close());
              }
            );
          }
        })),
        (this.btn_send_code.clickHandler = new Laya.Handler(
          this,
          () => {
            if (!i.locking) {
              let e = '';
              if (!GameMgr.Inst.account_data.email) {
                if (!i.input_mail.isOK)
                  return void t.UIMgr.Inst.ShowErrorInfo(
                    game.Tools.strOfLocalization(2786)
                  );
                e = i.input_mail.text;
              }
              (i.btn_send_code.mouseEnabled = !1),
                (i.during_send_cd = !0),
                (i.last_send_time = Laya.timer.currTimer),
                i.refresh_send(),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'createEmailVerifyCode',
                  { email: e, usage: 1 },
                  (e, n) => {
                    e || n.error
                      ? (t.UIMgr.Inst.showNetReqError(
                          'createEmailVerifyCode',
                          e,
                          n
                        ),
                        (i.last_send_time = 0))
                      : t.UI_LightTips.Inst.show(
                          game.Tools.strOfLocalization(2810)
                        );
                  }
                );
            }
          }
        )),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          i.locking || i.close();
        })),
        (this.during_send_cd = !1),
        (this.last_send_time = 0);
    }),
    (n.prototype.show = function() {
      const e = this;
      (this.enable = !0),
        (this.locking = !0),
        (this.input_code.text = ''),
        Laya.timer.clearAll(this),
        GameMgr.Inst.account_data.email
          ? ((this.input_mail.me.visible = !1),
            (this.label_mail.text = GameMgr.Inst.account_data.email),
            (this.label_mail.parent.visible = !0))
          : ((this.input_mail.me.visible = !0),
            this.input_mail.reset(),
            (this.label_mail.parent.visible = !1)),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        ),
        this.during_send_cd
          ? this.refresh_send()
          : ((this.during_send_cd = !1),
            (this.btn_send_code.mouseEnabled = !0),
            (this.label_send_code.text = game.Tools.strOfLocalization(
              2787
            ))),
        (this.btn_confirm.mouseEnabled = !0),
        Laya.timer.frameLoop(1, this, () => {
          e.refresh_send();
        });
    }),
    (n.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1), Laya.timer.clearAll(e);
          })
        );
    }),
    (n.prototype.refresh_send = function() {
      if (this.during_send_cd) {
        const t = Laya.timer.currTimer - this.last_send_time;
        t >= 6e4
          ? ((this.during_send_cd = !1),
            (this.btn_send_code.mouseEnabled = !0),
            (this.label_send_code.text = game.Tools.strOfLocalization(
              2787
            )))
          : (this.label_send_code.text = game.Tools.strOfLocalization(
              2682,
              [Math.ceil(60 - t / 1e3).toString()]
            ));
      }
    }),
    n
  ;
  })(t.UIBase);

  t.UI_Bind_Mail1 = i;
})(uiscript || (uiscript = {}));