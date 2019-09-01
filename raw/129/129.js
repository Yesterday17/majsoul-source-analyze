var uiscript;
!(function(t) {
  var e = (function() {
      function t(t, e) {
        var i = this;
        (this.me = t),
          (this.func_pending = e),
          (this.txtinput = t.getChildByName('txtinput')),
          (this.wrong = t.getChildByName('wrong')),
          (this.accept = t.getChildByName('accept')),
          this.txtinput.on('focus', this, function() {
            (i.wrong.visible = false), (i.accept.visible = false);
          }),
          this.txtinput.on('blur', this, function() {
            (i.wrong.visible = false),
              (i.accept.visible = false),
              '' != i.txtinput.text &&
                (!i.func_pending || i.func_pending.run()
                  ? (i.accept.visible = true)
                  : (i.wrong.visible = true));
          }),
          this.reset();
      }
      return (
        Object.defineProperty(t.prototype, 'text', {
          get: function() {
            return this.txtinput.text;
          },
          enumerable: true,
          configurable: true
        }),
        Object.defineProperty(t.prototype, 'isOK', {
          get: function() {
            return !this.func_pending || this.func_pending.run();
          },
          enumerable: true,
          configurable: true
        }),
        (t.prototype.reset = function() {
          (this.txtinput.text = ''),
            (this.wrong.visible = false),
            (this.accept.visible = false);
        }),
        t
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.both_ui.bind_mail0UI()) || this;
        return (n.Inst = t), t;
      }
      return (
        __extends(n, i),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.root = this.me.getChildByName('root')),
            (this.input_mail = new e(
              this.root.getChildByName('input_mail'),
              new Laya.Handler(this, function() {
                return game.Tools.pending_email_vaild(i.input_mail.text);
              })
            )),
            (this.label_mail = this.root
              .getChildByName('label_email')
              .getChildByName('info')),
            (this.input_code = this.root
              .getChildByName('input_code')
              .getChildByName('txtinput')),
            (this.input_password0 = new e(
              this.root.getChildByName('input_password0'),
              new Laya.Handler(this, function() {
                return (
                  i.input_password0.text.length >= 6 &&
                  i.input_password0.text.length <= 20
                );
              })
            )),
            (this.input_password1 = new e(
              this.root.getChildByName('input_password1'),
              new Laya.Handler(this, function() {
                return (
                  i.input_password0.text == i.input_password1.text &&
                  i.input_password1.text.length >= 6 &&
                  i.input_password1.text.length <= 20
                );
              })
            )),
            (this.btn_send_code = this.root.getChildByName('btn_send_code')),
            (this.label_send_code = this.btn_send_code.getChildByName('info')),
            (this.btn_confirm = this.root.getChildByName('btn_confirm')),
            (this.btn_confirm.clickHandler = new Laya.Handler(this, function() {
              if (
                !i.locking &&
                i.input_password0.text == i.input_password1.text
              ) {
                var e = '';
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
                    password: GameMgr.encodeP(i.input_password0.text)
                  },
                  function(n, a) {
                    (i.btn_confirm.mouseEnabled = true),
                      n || a.error
                        ? (t.UIMgr.Inst.showNetReqError('bindEmail', n, a),
                          (i.last_send_time = 0))
                        : (t.UI_LightTips.Inst.show(
                            game.Tools.strOfLocalization(2785)
                          ),
                          (GameMgr.Inst.account_data.email = game.Tools.encode_email(
                            e
                          )),
                          (GameMgr.Inst.account_data.email_verity = 1),
                          i.close());
                  }
                );
              }
            })),
            (this.btn_send_code.clickHandler = new Laya.Handler(
              this,
              function() {
                if (!i.locking) {
                  var e = '';
                  if (!GameMgr.Inst.account_data.email) {
                    if (!i.input_mail.isOK)
                      return void t.UIMgr.Inst.ShowErrorInfo(
                        game.Tools.strOfLocalization(2786)
                      );
                    e = i.input_mail.text;
                  }
                  (i.btn_send_code.mouseEnabled = false),
                    (i.during_send_cd = true),
                    (i.last_send_time = Laya.timer.currTimer),
                    i.refresh_send(),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createEmailVerifyCode',
                      { email: e, usage: 1 },
                      function(e, n) {
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
            ).clickHandler = new Laya.Handler(this, function() {
              i.locking || i.close();
            })),
            (this.during_send_cd = false),
            (this.last_send_time = 0);
        }),
        (n.prototype.show = function() {
          var e = this;
          (this.enable = true),
            (this.locking = true),
            (this.input_code.text = ''),
            this.input_password0.reset(),
            this.input_password1.reset(),
            GameMgr.Inst.account_data.email
              ? ((this.input_mail.me.visible = false),
                (this.label_mail.text = GameMgr.Inst.account_data.email),
                (this.label_mail.parent.visible = true))
              : ((this.input_mail.me.visible = true),
                this.input_mail.reset(),
                (this.label_mail.parent.visible = false)),
            Laya.timer.clearAll(this),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = false;
              })
            ),
            this.during_send_cd
              ? this.refresh_send()
              : ((this.during_send_cd = false),
                (this.btn_send_code.mouseEnabled = true),
                (this.label_send_code.text = game.Tools.strOfLocalization(
                  2787
                ))),
            (this.btn_confirm.mouseEnabled = true),
            Laya.timer.frameLoop(1, this, function() {
              e.refresh_send();
            });
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = true),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.enable = false), Laya.timer.clearAll(e);
              })
            );
        }),
        (n.prototype.refresh_send = function() {
          if (this.during_send_cd) {
            var t = Laya.timer.currTimer - this.last_send_time;
            t >= 6e4
              ? ((this.during_send_cd = false),
                (this.btn_send_code.mouseEnabled = true),
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
      );
    })(t.UIBase);
  t.UI_Bind_Mail0 = i;
})(uiscript || (uiscript = {}));