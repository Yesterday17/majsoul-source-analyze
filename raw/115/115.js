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
        (t.prototype.showError = function() {
          (this.accept.visible = false), (this.wrong.visible = true);
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
        var t = i.call(this, new ui.entrance.mail_registUI()) || this;
        return (t.during_send_cd = false), (t.last_send_time = 0), (n.Inst = t), t;
      }
      return (
        __extends(n, i),
        (n.prototype.onCreate = function() {
          var i = this;
          (this.root = this.me.getChildByName('page_mail_regist')),
            (this.connect_loading = this.me.getChildByName('loading')),
            (this.connect_loading.visible = false),
            (this.content = this.root.getChildByName('root')),
            (this.account = new e(
              this.content.getChildByName('container_account'),
              new Laya.Handler(this, function() {
                return game.Tools.pending_email_vaild(i.account.text);
              })
            )),
            (this.password0 = new e(
              this.content.getChildByName('container_mima'),
              new Laya.Handler(this, function() {
                var t = i.password0.text;
                return t.length >= 6 && t.length <= 20;
              })
            )),
            (this.password1 = new e(
              this.content.getChildByName('container_mima2'),
              new Laya.Handler(this, function() {
                return (
                  i.password0.text == i.password1.text &&
                  (i.password1.text.length >= 6 &&
                    i.password1.text.length <= 20)
                );
              })
            )),
            (this.code_input = new e(
              this.content.getChildByName('container_code'),
              new Laya.Handler(this, function() {
                return 6 == i.code_input.text.length;
              })
            )),
            (this.btn_close = this.content.getChildByName('btn_close')),
            (this.btn_close.clickHandler = Laya.Handler.create(
              this,
              function() {
                i.locking || i.close();
              },
              null,
              false
            )),
            (this.btn_regist = this.content.getChildByName('btn_regist')),
            (this.btn_regist.clickHandler = Laya.Handler.create(
              this,
              function() {
                i.locking || i.onRegist();
              },
              null,
              false
            )),
            (this.btn_send_code = this.content.getChildByName('btn_send_code')),
            (this.label_send_code = this.btn_send_code.getChildByName('info')),
            (this.btn_send_code.clickHandler = new Laya.Handler(
              this,
              function() {
                if (!i.locking)
                  if ('' != i.account.text) {
                    if (i.account.isOK) {
                      var e = i.account.text;
                      (i.btn_send_code.mouseEnabled = false),
                        (i.during_send_cd = true),
                        (i.last_send_time = Laya.timer.currTimer),
                        i.refresh_send();
                      i.account.text;
                      var n = new Laya.HttpRequest();
                      n.once(Laya.Event.COMPLETE, i, function(e) {
                        var n = JSON.parse(e);
                        n.error && n.error.code
                          ? (t.UI_Entrance.Inst.showError('', n.error.code),
                            (i.last_send_time = 0))
                          : t.UI_Entrance.Inst.showInfo(
                              game.Tools.strOfLocalization(2810)
                            );
                      }),
                        n.once(Laya.Event.ERROR, i, function(e) {
                          t.UI_Entrance_Error.Inst.show(
                            game.Tools.strOfLocalization(2790),
                            false
                          ),
                            (i.last_send_time = 0);
                        }),
                        n.send(
                          GameMgr.config_data.system_email_url +
                            '/api/user/sign_up_code',
                          'email=' + e,
                          'post'
                        );
                    }
                  } else i.account.showError();
              }
            )),
            (this.root.visible = false),
            (this.locking = false),
            (this.container_social = this.content.getChildByName('social')),
            (this.social_btns = []);
          for (s = 0; s < 4; s++)
            this.social_btns.push(
              this.container_social.getChildByName('btn' + s)
            ),
              (this.social_btns[s].visible = false);
          var n = [];
          'chs' == GameMgr.client_language &&
            (n = [
              { img: 'myres/entrance/weibo.png', type: 2 },
              { img: 'myres/entrance/QQ.png', type: 3 },
              { img: 'myres/entrance/weixin.png', type: 1 }
            ]),
            'jp' == GameMgr.client_language &&
              (n = [
                { img: 'myres/entrance/google.png', type: 8 },
                { img: 'myres/entrance/tiwtter.png', type: 10 }
              ]),
            'en' == GameMgr.client_language &&
              (n = [
                { img: 'myres/entrance/google.png', type: 8 },
                { img: 'myres/entrance/facebook.png', type: 9 },
                { img: 'myres/entrance/tiwtter.png', type: 10 }
              ]);
          for (
            var a = function(e) {
                var i = r.social_btns[e];
                e < n.length
                  ? ((i.visible = true),
                    (i.getChildAt(0).skin = game.Tools.localUISrc(n[e].img)),
                    (i.clickHandler = new Laya.Handler(r, function() {
                      t.UI_Entrance.trySocio(n[e].type);
                    })),
                    (i.x = (465 * e) / (n.length - 1) - 40))
                  : (i.visible = false);
              },
              r = this,
              s = 0;
            s < n.length;
            s++
          )
            a(s);
          (n.length = 2) &&
            ((this.social_btns[0].x = 115), (this.social_btns[1].x = 270)),
            (this.container_checkbox = this.content.getChildByName('checkbox')),
            (this.checkbox = this.container_checkbox.getChildByName(
              'checkbox'
            )),
            (this.container_checkbox.getChildByName(
              'btn_lock'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_User_Xieyi.Inst.show(
                  Laya.Handler.create(i, function() {
                    i.onchangecheck(true);
                  })
                );
              },
              null,
              false
            )),
            (this.container_checkbox.getChildByName(
              'btn_check'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                i.onchangecheck(!i.checkbox.visible);
              },
              null,
              false
            )),
            this.account.reset(),
            this.password0.reset(),
            this.password1.reset(),
            (this.last_send_time = 0);
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = true),
            t.UIBase.anim_pop_hide(
              this.content,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.enable = false);
              })
            ),
            Laya.timer.clearAll(this);
        }),
        (n.prototype.show = function() {
          var e = this;
          (this.root.visible = true),
            (this.locking = true),
            Laya.timer.clearAll(this),
            (this.enable = true),
            t.UIBase.anim_pop_out(
              this.content,
              Laya.Handler.create(this, function() {
                e.locking = false;
              })
            ),
            (this.connect_loading.visible = false),
            this.onchangecheck(true),
            this.during_send_cd
              ? this.refresh_send()
              : ((this.during_send_cd = false),
                (this.btn_send_code.mouseEnabled = true),
                (this.label_send_code.text = game.Tools.strOfLocalization(
                  2787
                ))),
            Laya.timer.frameLoop(1, this, function() {
              e.refresh_send();
            });
        }),
        (n.prototype.onRegist = function() {
          var e = this,
            i = this.account.text,
            n = this.code_input.text,
            a = this.password0.text,
            r = this.password1.text;
          '' == i && this.account.showError(),
            '' == n && this.code_input.showError(),
            '' == a && this.password0.showError(),
            '' == r && this.password1.showError(),
            this.account.isOK &&
              this.code_input.isOK &&
              this.password0.isOK &&
              this.password1.isOK &&
              (game.LobbyNetMgr.Inst.isOK &&
              t.UI_Entrance.Inst.server_region_name ==
                game.LobbyNetMgr.gateway_region_name
                ? t.UI_Entrance.Inst._try_regist_account(i, n, a)
                : ((this.connect_loading.visible = true),
                  Laya.timer.once(500, this, function() {
                    game.LobbyNetMgr.Inst.OpenConnect(
                      t.UI_Entrance.Inst.server_region_name,
                      Laya.Handler.create(e, function(r) {
                        r.open
                          ? t.UI_Entrance.Inst._try_regist_account(i, n, a)
                          : r.maintenance
                          ? t.UI_Entrance_Maintenance.Inst.show(r.maintenance)
                          : t.UI_Entrance.Inst.showInfo(r.info),
                          (e.connect_loading.visible = false);
                      })
                    );
                  })));
        }),
        (n.prototype.onchangecheck = function(t) {
          (this.checkbox.visible = t),
            (this.btn_regist.visible = t),
            (this.container_social.visible = t);
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
  t.UI_Entrance_Mail_Regist = i;
})(uiscript || (uiscript = {}));