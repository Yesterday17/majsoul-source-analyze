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
  var e = (function() {
      function t(t, e) {
        var i = this;
        (this.me = t),
          (this.func_pending = e),
          (this.txtinput = t.getChildByName('txtinput')),
          (this.wrong = t.getChildByName('wrong')),
          (this.accept = t.getChildByName('accept')),
          this.txtinput.on('focus', this, function() {
            (i.wrong.visible = !1), (i.accept.visible = !1);
          }),
          this.txtinput.on('blur', this, function() {
            (i.wrong.visible = !1),
              (i.accept.visible = !1),
              '' != i.txtinput.text &&
                (!i.func_pending || i.func_pending.run()
                  ? (i.accept.visible = !0)
                  : (i.wrong.visible = !0));
          }),
          this.reset();
      }
      return (
        Object.defineProperty(t.prototype, 'text', {
          get: function() {
            return this.txtinput.text;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(t.prototype, 'isOK', {
          get: function() {
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
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.both_ui.bind_phone0UI()) || this;
        return (n.Inst = t), t;
      }
      return (
        __extends(n, i),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.root = this.me.getChildByName('root')),
            (this.input_phone = new e(
              this.root.getChildByName('input_phone'),
              new Laya.Handler(this, function() {
                return game.Tools.pending_phonenumber_valid(i.input_phone.text);
              })
            )),
            (this.label_phone = this.root
              .getChildByName('label_phone')
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
                if (!GameMgr.Inst.account_data.phone) {
                  if (!i.input_phone.isOK)
                    return void t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2786)
                    );
                  e = i.input_phone.text;
                }
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'bindPhoneNumber',
                  {
                    phone: e,
                    code: i.input_code.text,
                    password: GameMgr.encodeP(i.input_password0.text)
                  },
                  function(n, a) {
                    (i.btn_confirm.mouseEnabled = !0),
                      n || a.error
                        ? (t.UIMgr.Inst.showNetReqError(
                            'bindPhoneNumber',
                            n,
                            a
                          ),
                          (i.last_send_time = 0))
                        : (t.UI_LightTips.Inst.show(
                            game.Tools.strOfLocalization(2785)
                          ),
                          (GameMgr.Inst.account_data.phone = game.Tools.encode_phonenumber(
                            e
                          )),
                          (GameMgr.Inst.account_data.phone_verify = 1),
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
                  if (!GameMgr.Inst.account_data.phone) {
                    if (!i.input_phone.isOK)
                      return void t.UIMgr.Inst.ShowErrorInfo(
                        game.Tools.strOfLocalization(2838)
                      );
                    e = i.input_phone.text;
                  }
                  (i.btn_send_code.mouseEnabled = !1),
                    (i.during_send_cd = !0),
                    (i.last_send_time = Laya.timer.currTimer),
                    i.refresh_send(),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createPhoneVerifyCode',
                      { phone: e, usage: 6 },
                      function(e, n) {
                        e || n.error
                          ? (t.UIMgr.Inst.showNetReqError(
                              'createPhoneVerifyCode',
                              e,
                              n
                            ),
                            (i.last_send_time = 0))
                          : t.UIMgr.Inst.ShowErrorInfo(
                              game.Tools.strOfLocalization(2833)
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
            (this.during_send_cd = !1),
            (this.last_send_time = 0);
        }),
        (n.prototype.show = function() {
          var e = this;
          (this.enable = !0),
            (this.locking = !0),
            (this.input_code.text = ''),
            this.input_password0.reset(),
            this.input_password1.reset(),
            GameMgr.Inst.account_data.phone
              ? ((this.input_phone.me.visible = !1),
                (this.label_phone.text = GameMgr.Inst.account_data.phone),
                (this.label_phone.parent.visible = !0))
              : ((this.input_phone.me.visible = !0),
                this.input_phone.reset(),
                (this.label_phone.parent.visible = !1)),
            Laya.timer.clearAll(this),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
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
            Laya.timer.frameLoop(1, this, function() {
              e.refresh_send();
            });
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.enable = !1), Laya.timer.clearAll(e);
              })
            );
        }),
        (n.prototype.refresh_send = function() {
          if (this.during_send_cd) {
            var t = Laya.timer.currTimer - this.last_send_time;
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
      );
    })(t.UIBase);
  t.UI_Bind_Phone0 = i;
})(uiscript || (uiscript = {}));