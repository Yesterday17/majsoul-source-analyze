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
        this.wrong = t.getChildByName('wrong');
        this.accept = t.getChildByName('accept');

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
        var t = i.call(this, new ui.both_ui.bind_phone1UI()) || this;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var i = this;
        this.root = this.me.getChildByName('root');

        this.input_phone = new e(
            this.root.getChildByName('input_phone'),
            new Laya.Handler(this, () => game.Tools.pending_phonenumber_valid(i.input_phone.text))
          );

        this.label_phone = this.root
            .getChildByName('label_phone')
            .getChildByName('info');

        this.input_code = this.root
            .getChildByName('input_code')
            .getChildByName('txtinput');

        this.btn_send_code = this.root.getChildByName('btn_send_code');
        this.label_send_code = this.btn_send_code.getChildByName('info');
        this.btn_confirm = this.root.getChildByName('btn_confirm');

        this.btn_confirm.clickHandler = new Laya.Handler(this, () => {
            if (!i.locking) {
              var e = '';
              if (!GameMgr.Inst.account_data.phone) {
                if (!i.input_phone.isOK)
                  return void t.UIMgr.Inst.ShowErrorInfo(
                    game.Tools.strOfLocalization(2838)
                  );
                e = i.input_phone.text;
              }
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'bindPhoneNumber',
                {
                  phone: e,
                  code: i.input_code.text,
                  password: GameMgr.encodeP(GameMgr.Inst.password)
                },
                (n, a) => {
                  i.btn_confirm.mouseEnabled = !0;

                  t.UIMgr.Inst.showNetReqError(
                        'bindPhoneNumber',
                        n,
                        a
                      );

                  t.UI_LightTips.Inst.show(
                        game.Tools.strOfLocalization(2785)
                      );

                  GameMgr.Inst.account_data.phone = game.Tools.encode_phonenumber(
                        e
                      );

                  GameMgr.Inst.account_data.phone_verify = 1;
                  n || a.error
                    ? (i.last_send_time = 0)
                    : (i.close());
                }
              );
            }
          });

        this.btn_send_code.clickHandler = new Laya.Handler(
            this,
            () => {
              if (!i.locking) {
                var e = '';
                if (!GameMgr.Inst.account_data.phone) {
                  if (!i.input_phone.isOK)
                    return void t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2838)
                    );
                  e = i.input_phone.text;
                }
                i.btn_send_code.mouseEnabled = !1;
                i.during_send_cd = !0;
                i.last_send_time = Laya.timer.currTimer;
                i.refresh_send();
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'createPhoneVerifyCode',
                  { phone: e, usage: 6 },
                  (e, n) => {
                    t.UIMgr.Inst.showNetReqError(
                          'createPhoneVerifyCode',
                          e,
                          n
                        );

                    e || n.error
                      ? (i.last_send_time = 0)
                      : t.UIMgr.Inst.ShowErrorInfo(
                          game.Tools.strOfLocalization(2833)
                        );
                  }
                );
              }
            }
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            i.locking || i.close();
          });

        this.during_send_cd = !1;
        this.last_send_time = 0;
      }

      show() {
        var e = this;
        this.enable = !0;
        this.locking = !0;
        this.input_code.text = '';
        Laya.timer.clearAll(this);
        this.input_phone.me.visible = !1;
        this.label_phone.text = GameMgr.Inst.account_data.phone;
        this.input_phone.me.visible = !0;
        this.input_phone.reset();

        GameMgr.Inst.account_data.phone
          ? (this.label_phone.parent.visible = !0)
          : (this.label_phone.parent.visible = !1);

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );

        this.during_send_cd = !1;
        this.btn_send_code.mouseEnabled = !0;

        this.during_send_cd
          ? this.refresh_send()
          : (this.label_send_code.text = game.Tools.strOfLocalization(
              2787
            ));

        this.btn_confirm.mouseEnabled = !0;
        Laya.timer.frameLoop(1, this, () => {
          e.refresh_send();
        });
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
            Laya.timer.clearAll(e);
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
    }

    __extends(n, i);

    return n;
  })(t.UIBase);

  t.UI_Bind_Phone1 = i;
})(uiscript || (uiscript = {}));