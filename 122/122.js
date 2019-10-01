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
            (!i.func_pending || i.func_pending.run()
              ? (i.accept.visible = !0)
              : (i.wrong.visible = !0));
        });

        this.reset();
      }

      get text() {
        return this.txtinput.text;
      }

      get isOK() {
        return !this.func_pending || this.func_pending.run();
      }

      showError() {
        this.accept.visible = !1;
        this.wrong.visible = !0;
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
        var t = i.call(this, new ui.entrance.reset_password_phone2UI()) || this;
        t.during_send_cd = !1;
        t.last_send_time = 0;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var i = this;
        this.root = this.me.getChildByName('root');
        this.label_phonenumber = this.root.getChildByName('phonenumber');

        this.pwd0 = new e(
            this.root.getChildByName('container_mima'),
            new Laya.Handler(this, () => {
              var t = i.pwd0.text;
              return t.length >= 6 && t.length <= 20;
            })
          );

        this.pwd1 = new e(
            this.root.getChildByName('container_mima2'),
            new Laya.Handler(this, () => i.pwd1.text == i.pwd0.text &&
            (i.pwd1.text.length >= 6 && i.pwd1.text.length <= 20))
          );

        this.input_code = new e(
            this.root.getChildByName('container_code'),
            new Laya.Handler(this, () => 6 == i.input_code.text.length)
          );

        this.btn_send_code = this.root.getChildByName('btn_send_code');
        this.label_send_code = this.btn_send_code.getChildByName('info');

        this.btn_send_code.clickHandler = new Laya.Handler(
            this,
            () => {
              if (!i.locking) {
                i.btn_send_code.mouseEnabled = !1;
                i.during_send_cd = !0;
                i.last_send_time = Laya.timer.currTimer;
                i.refresh_send();
                var e = i.phonenumber,
                  n = new Laya.HttpRequest();

                n.once(Laya.Event.COMPLETE, i, e => {
                  var n = JSON.parse(e);
                  t.UI_Entrance.Inst.showError('', n.error.code);
                  n.error && n.error.code
                    ? (i.last_send_time = 0)
                    : t.UI_Entrance.Inst.showInfo(
                        game.Tools.strOfLocalization(2833)
                      );
                });

                n.once(Laya.Event.ERROR, i, e => {
                  t.UI_Entrance_Error.Inst.show(
                    game.Tools.strOfLocalization(2790),
                    !1
                  );

                  i.last_send_time = 0;
                });

                n.send(
                  `${GameMgr.config_data.system_email_url}/api/user/forget_password`,
                  `type=phone&phone=${e}`,
                  'post'
                );
              }
            }
          );

        this.btn_confirm = this.root.getChildByName('btn_confirm');

        this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.onComfirm();
            },
            null,
            !1
          );

        this.root.getChildByName(
            'btn_back'
          ).clickHandler = new Laya.Handler(this, () => {
          i.close();
          i.locking ||
            (t.UI_Entrance_Reset_Password.Inst.show());
        });

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            i.locking || i.close();
          });
      }

      show(e) {
        var i = this;
        this.phonenumber = e;
        this.label_phonenumber.text = e;
        Laya.timer.clearAll(this);
        this.during_send_cd = !1;
        this.btn_send_code.mouseEnabled = !0;

        this.during_send_cd
          ? this.refresh_send()
          : (this.label_send_code.text = game.Tools.strOfLocalization(
              2787
            ));

        Laya.timer.frameLoop(1, this, () => {
          i.refresh_send();
        });

        this.locking = !0;
        this.enable = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            i.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        Laya.timer.clearAll(this);
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );
      }

      refresh_send() {
        if (this.during_send_cd) {
          var t = Laya.timer.currTimer - this.last_send_time;
          this.during_send_cd = !1;
          this.btn_send_code.mouseEnabled = !0;
          t >= 6e4
            ? (this.label_send_code.text = game.Tools.strOfLocalization(
                2787
              ))
            : (this.label_send_code.text = game.Tools.strOfLocalization(
                2682,
                [Math.ceil(60 - t / 1e3).toString()]
              ));
        }
      }

      onComfirm() {
        var e = this,
          i = this.input_code.text,
          n = this.pwd0.text,
          a = this.pwd1.text;
        '' == i && this.input_code.showError();
        '' == n && this.pwd0.showError();
        '' == a && this.pwd1.showError();
        if (
          (this.input_code.isOK && this.pwd0.isOK && this.pwd1.isOK)
        ) {
          var r = new Laya.HttpRequest();

          r.once(Laya.Event.COMPLETE, this, i => {
            var n = JSON.parse(i);
            t.UI_Entrance.Inst.showError('', n.error.code);

            t.UI_Entrance.Inst.showInfo(
                  game.Tools.strOfLocalization(2834)
                );

            n.error && n.error.code
              ? (e.last_send_time = 0)
              : (e.close());
          });

          r.once(Laya.Event.ERROR, this, i => {
            t.UI_Entrance_Error.Inst.show(
              game.Tools.strOfLocalization(2790),
              !1
            );

            e.last_send_time = 0;
          });

          r.send(
            `${GameMgr.config_data.system_email_url}/api/user/reset_password/phone`,
            `phone=${this.phonenumber}&code=${this.input_code.text}&pass=${GameMgr.encodeP(this.pwd0.text)}`,
            'post'
          );
        }
      }
    }

    __extends(n, i);

    return n;
  })(t.UIBase);

  t.UI_Entrance_Reset_PWD_Phone2 = i;
})(uiscript || (uiscript = {}));