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
        var t = i.call(this, new ui.entrance.mail_registUI()) || this;
        t.during_send_cd = !1;
        t.last_send_time = 0;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var i = this;
        this.root = this.me.getChildByName('page_mail_regist');
        this.connect_loading = this.me.getChildByName('loading');
        this.connect_loading.visible = !1;
        this.content = this.root.getChildByName('root');

        this.account = new e(
            this.content.getChildByName('container_account'),
            new Laya.Handler(this, () => game.Tools.pending_email_vaild(i.account.text) ||
            game.Tools.pending_phonenumber_valid(i.account.text))
          );

        this.password0 = new e(
            this.content.getChildByName('container_mima'),
            new Laya.Handler(this, () => {
              var t = i.password0.text;
              return t.length >= 6 && t.length <= 20;
            })
          );

        this.password1 = new e(
            this.content.getChildByName('container_mima2'),
            new Laya.Handler(this, () => i.password0.text == i.password1.text &&
            (i.password1.text.length >= 6 &&
              i.password1.text.length <= 20))
          );

        this.code_input = new e(
            this.content.getChildByName('container_code'),
            new Laya.Handler(this, () => 6 == i.code_input.text.length)
          );

        this.btn_close = this.content.getChildByName('btn_close');

        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.close();
            },
            null,
            !1
          );

        this.btn_regist = this.content.getChildByName('btn_regist');

        this.btn_regist.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.onRegist();
            },
            null,
            !1
          );

        this.btn_send_code = this.content.getChildByName('btn_send_code');
        this.label_send_code = this.btn_send_code.getChildByName('info');

        this.btn_send_code.clickHandler = new Laya.Handler(
            this,
            () => {
              if (!i.locking)
                if ('' != i.account.text) {
                  if (i.account.isOK) {
                    i.btn_send_code.mouseEnabled = !1;
                    i.during_send_cd = !0;
                    i.last_send_time = Laya.timer.currTimer;
                    i.refresh_send();
                    var e = i.account.text,
                      n = '';
                    game.Tools.pending_email_vaild(e) && (n = 'email');
                    game.Tools.pending_phonenumber_valid(e) &&
                      (n = 'phone');
                    var a = new Laya.HttpRequest();

                    a.once(Laya.Event.COMPLETE, i, e => {
                      var a = JSON.parse(e);
                      t.UI_Entrance.Inst.showError('', a.error.code);

                      'email' == n &&
                            t.UI_Entrance.Inst.showInfo(
                              game.Tools.strOfLocalization(2810)
                            );

                      a.error && a.error.code
                        ? (i.last_send_time = 0)
                        : ('phone' == n &&
                        t.UI_Entrance.Inst.showInfo(
                          game.Tools.strOfLocalization(2833)
                        ));
                    });

                    a.once(Laya.Event.ERROR, i, e => {
                      t.UI_Entrance_Error.Inst.show(
                        game.Tools.strOfLocalization(2790),
                        !1
                      );

                      i.last_send_time = 0;
                    });

                    'email' == n
                      ? a.send(
                          `${GameMgr.config_data.system_email_url}/api/user/sign_up_code`,
                          `type=email&email=${e}`,
                          'post'
                        )
                      : 'phone' == n &&
                        a.send(
                          `${GameMgr.config_data.system_email_url}/api/user/sign_up_code`,
                          `type=phone&phone=${e}`,
                          'post'
                        );
                  }
                } else i.account.showError();
            }
          );

        this.root.visible = !1;
        this.locking = !1;
        this.container_social = this.content.getChildByName('social');
        this.social_btns = [];

        this.social_btns.push(
          this.container_social.getChildByName(`btn${s}`)
        );

        for (s = 0; s < 4; s++)
          this.social_btns[s].visible = !1;
        var n = [];

        'chs' == GameMgr.client_language &&
          (n = [
            { img: 'myres/entrance/weibo.png', type: 2 },
            { img: 'myres/entrance/QQ.png', type: 3 },
            { img: 'myres/entrance/weixin.png', type: 1 }
          ]);

        'jp' == GameMgr.client_language &&
          (n = [
            { img: 'myres/entrance/google.png', type: 8 },
            { img: 'myres/entrance/tiwtter.png', type: 10 }
          ]);

        'en' == GameMgr.client_language &&
          (n = [
            { img: 'myres/entrance/google.png', type: 8 },
            { img: 'myres/entrance/facebook.png', type: 9 },
            { img: 'myres/entrance/tiwtter.png', type: 10 }
          ]);
        for (
          var a = e => {
            var i = r.social_btns[e];
            i.visible = !0;
            i.getChildAt(0).skin = game.Tools.localUISrc(n[e].img);

            i.clickHandler = new Laya.Handler(r, () => {
                  t.UI_Entrance.trySocio(n[e].type);
                });

            e < n.length
              ? (i.x = (465 * e) / (n.length - 1) - 40)
              : (i.visible = !1);
          },
            r = this,
            s = 0;
          s < n.length;
          s++
        )
          a(s);
        this.social_btns[0].x = 115;

        (n.length = 2) &&
          ((this.social_btns[1].x = 270));

        this.container_checkbox = this.content.getChildByName('checkbox');

        this.checkbox = this.container_checkbox.getChildByName(
            'checkbox'
          );

        this.container_checkbox.getChildByName(
            'btn_lock'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_User_Xieyi.Inst.show(
                Laya.Handler.create(i, () => {
                  i.onchangecheck(!0);
                })
              );
            },
            null,
            !1
          );

        this.container_checkbox.getChildByName(
            'btn_check'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              i.onchangecheck(!i.checkbox.visible);
            },
            null,
            !1
          );

        this.account.reset();
        this.password0.reset();
        this.password1.reset();
        this.last_send_time = 0;
      }

      close() {
        var e = this;
        this.locking = !0;

        t.UIBase.anim_pop_hide(
          this.content,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );

        Laya.timer.clearAll(this);
      }

      show() {
        var e = this;
        this.root.visible = !0;
        this.locking = !0;
        Laya.timer.clearAll(this);
        this.enable = !0;

        t.UIBase.anim_pop_out(
          this.content,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );

        this.connect_loading.visible = !1;
        this.onchangecheck(!0);
        this.during_send_cd = !1;
        this.btn_send_code.mouseEnabled = !0;

        this.during_send_cd
          ? this.refresh_send()
          : (this.label_send_code.text = game.Tools.strOfLocalization(
              2787
            ));

        Laya.timer.frameLoop(1, this, () => {
          e.refresh_send();
        });
      }

      onRegist() {
        var e = this,
          i = this.account.text,
          n = this.code_input.text,
          a = this.password0.text,
          r = this.password1.text;
        '' == i && this.account.showError();
        '' == n && this.code_input.showError();
        '' == a && this.password0.showError();
        '' == r && this.password1.showError();
        if (
          (this.account.isOK &&
          this.code_input.isOK &&
          this.password0.isOK &&
          this.password1.isOK)
        ) {
          var s = 0;
          game.Tools.pending_email_vaild(i) && (s = 1);
          game.Tools.pending_phonenumber_valid(i) && (s = 2);
          this.connect_loading.visible = !0;
          game.LobbyNetMgr.Inst.isOK &&
          t.UI_Entrance.Inst.server_region_name ==
            game.LobbyNetMgr.gateway_region_name
            ? t.UI_Entrance.Inst._try_regist_account(i, n, a, s)
            : (Laya.timer.once(500, this, () => {
            game.LobbyNetMgr.Inst.OpenConnect(
              t.UI_Entrance.Inst.server_region_name,
              Laya.Handler.create(e, ({open, maintenance, info}) => {
                open
                  ? t.UI_Entrance.Inst._try_regist_account(i, n, a, s)
                  : maintenance
                  ? t.UI_Entrance_Maintenance.Inst.show(maintenance)
                  : t.UI_Entrance.Inst.showInfo(info);

                e.connect_loading.visible = !1;
              })
            );
          }));
        }
      }

      onchangecheck(t) {
        this.checkbox.visible = t;
        this.btn_regist.visible = t;
        this.container_social.visible = t;
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

  t.UI_Entrance_Mail_Regist = i;
})(uiscript || (uiscript = {}));