var uiscript;
!(function(t) {
  var e = (function() {
      function t(t, e) {
        var i = this;
        (this.me = t),
          (this.func_pending = e),
          (this.txtinput = t.getChildByName('txtinput')),
          (this.wrong = t.getChildByName('no')),
          (this.accept = t.getChildByName('yes')),
          this.txtinput.on('focus', this, function() {
            (i.wrong.visible = false), (i.accept.visible = false);
          }),
          this.txtinput.on('blur', this, function() {
            (i.wrong.visible = false),
              (i.accept.visible = false),
              '' != i.txtinput.text &&
                (i.isOK ? (i.accept.visible = true) : (i.wrong.visible = true));
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
        var t = i.call(this, new ui.entrance.reset_passwordUI()) || this;
        return (t.sended = false), (n.Inst = t), t;
      }
      return (
        __extends(n, i),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.root = this.me
            .getChildByName('page_reset_password')
            .getChildByName('root')),
            (this.container_input_mail = this.root.getChildByName(
              'container_input_mail'
            )),
            (this.btn_send = this.container_input_mail.getChildByName(
              'btn_send'
            ));
          var n = false,
            a = 0,
            r = 0,
            s = function() {
              n ||
                Laya.timer.currTimer < r ||
                game.Tools.setGrayDisable(i.btn_send, false);
            };
          (this.btn_send.clickHandler = new Laya.Handler(this, function() {
            if (
              !i.locking &&
              '' != i.input_email.text &&
              i.input_email.isOK &&
              !n
            ) {
              game.Tools.setGrayDisable(i.btn_send, true),
                (n = true),
                a++,
                (r = Laya.timer.currTimer + 1300 * a),
                Laya.timer.once(1300 * a, i, function() {
                  s();
                });
              var e = i.input_email.text,
                o = new Laya.HttpRequest();
              o.once(Laya.Event.COMPLETE, i, function(a) {
                var r = JSON.parse(a);
                (n = false),
                  s(),
                  r.error && r.error.code
                    ? t.UI_Entrance.Inst.showError('', r.error.code)
                    : ((i.sended = true),
                      (i.label_email.text = game.Tools.encode_email(e)),
                      i.refresh_show());
              }),
                o.once(Laya.Event.ERROR, i, function(e) {
                  (n = false),
                    s(),
                    t.UI_Entrance_Error.Inst.show(
                      game.Tools.strOfLocalization(2790),
                      false
                    );
                }),
                o.send(
                  GameMgr.config_data.system_email_url +
                    '/api/user/forget_password',
                  'email=' + i.input_email.text,
                  'post'
                );
            }
          })),
            (this.input_email = new e(
              this.container_input_mail.getChildByName('container_account'),
              new Laya.Handler(this, function() {
                return game.Tools.pending_email_vaild(i.input_email.text);
              })
            )),
            (this.root.getChildByName(
              'btn_close'
            ).clickHandler = new Laya.Handler(this, function() {
              i.locking || i.close();
            })),
            (this.container_success = this.root.getChildByName(
              'container_success'
            )),
            (this.container_success.getChildByName(
              'btn_confirm'
            ).clickHandler = new Laya.Handler(this, function() {
              i.locking || i.close();
            })),
            (this.label_email = this.container_success.getChildByName('mail'));
        }),
        (n.prototype.show = function() {
          var e = this;
          this.refresh_show(),
            (this.locking = true),
            (this.enable = true),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = false;
              })
            );
        }),
        (n.prototype.refresh_show = function() {
          this.sended
            ? ((this.container_input_mail.visible = false),
              (this.container_success.visible = true))
            : ((this.container_input_mail.visible = true),
              (this.container_success.visible = false));
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = true),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.enable = false);
              })
            );
        }),
        n
      );
    })(t.UIBase);
  t.UI_Entrance_Reset_Password = i;
})(uiscript || (uiscript = {}));