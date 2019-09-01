let uiscript;
!(t => {
  const e = (() => {
      function t(e) {
        (this.me = e),
          (t.scene_entrance =
            'jp' == GameMgr.client_language
              ? 'scene/entrance_jp.ls'
              : 'en' == GameMgr.client_language
              ? 'scene/entrance_en.ls'
              : 'scene/entrance.ls');
      }
      return (
        (t.prototype.show = function() {
          (this.scene = Laya.loader.getRes(t.scene_entrance)),
            this.me.addChild(this.scene),
            (this.scene.visible = true);
        }),
        (t.prototype.close = function() {
          Laya.timer.clearAll(this),
            (this.scene.visible = false),
            this.scene.destroy(true);
        }),
        (t.scene_entrance = ''),
        t
      );
    })();

  const i = (() => {
    function t(t) {
      (this.me = t),
        (this.round = this.me.getChildByName('round')),
        (this.word = this.me.getChildByName('word')),
        (this.icon = this.me.getChildByName('icon')),
        (this.me.visible = false);
    }
    return (t.prototype.show = function(t) {
      const e = this;
      if (!this.me.visible) {
        this.me.visible = true;
        const i = Laya.timer.currTimer;
        if (
          (Laya.timer.frameLoop(1, this, () => {
            e.round.rotation = ((Laya.timer.currTimer - i) / 2e3) * 360;
          }),
          (this.word.text = game.Tools.strOfLocalization(2053)),
          0 == t)
        )
          (this.icon.visible = false), (this.word.y = 150);
        else
          switch (((this.icon.visible = true), (this.word.y = 195), t)) {
            case 1:
            case 4:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/weixin.png'
              );
              break;
            case 2:
            case 5:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/weibo.png'
              );
              break;
            case 3:
            case 6:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/QQ.png'
              );
              break;
            case 7:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/yostar.png'
              );
              break;
            case 8:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/google.png'
              );
              break;
            case 9:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/facebook.png'
              );
              break;
            case 10:
              this.icon.skin = game.Tools.localUISrc(
                'myres/entrance/tiwtter.png'
              );
              break;
            default:
              this.icon.visible = false;
          }
      }
    }),
    (t.prototype.close = function() {
      Laya.timer.clearAll(this), (this.me.visible = false);
    }),
    t
  ;
  })();

  const n = (() => {
    function e(e) {
      const i = this;
      (this.saveflag = true),
        (this.locking = false),
        (this.last_mail_time = -1),
        (this.me = e),
        (this.me.visible = false),
        (this.root = this.me.getChildByName('jpenroot')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking || i.close();
          },
          null,
          false
        )),
        (this.input_account = this.root
          .getChildByName('container_mail')
          .getChildByName('txtinput')),
        (this.label_account_no = this.root
          .getChildByName('container_mail')
          .getChildByName('no')),
        this.input_account.on('input', this, () => {
          i.label_account_no.visible && (i.label_account_no.visible = false),
            '' != i.input_code.text &&
              '' != i.input_account.text &&
              game.Tools.setGrayDisable(i.btn_regist, false);
        }),
        (this.input_code = this.root
          .getChildByName('container_yanzhengma')
          .getChildByName('txtinput')),
        this.input_code.on('input', this, () => {
          '' != i.input_code.text &&
            '' != i.input_account.text &&
            game.Tools.setGrayDisable(i.btn_regist, false);
        }),
        (this.btn_getcode = this.root
          .getChildByName('sendbutton')
          .getChildByName('btn')),
        (this.btn_getcode.clickHandler = new Laya.Handler(this, () => {
          const t = i.input_account.text;
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            t
          )
            ? (Yo.request({
                account: t,
                lang: 'jp' == GameMgr.client_language ? 'ja' : 'en'
              }).then(t => {
                t
                  ? 0 === t.result
                    ? a.Inst.showInfo(game.Tools.strOfLocalization(2688))
                    : 50003 === t.result
                    ? a.Inst.showError(game.Tools.strOfLocalization(2684))
                    : 50004 === t.result
                    ? a.Inst.showError(game.Tools.strOfLocalization(2685))
                    : a.Inst.showError(game.Tools.strOfLocalization(2683))
                  : a.Inst.showError(game.Tools.strOfLocalization(2683));
              }),
              (i.last_mail_time = Laya.timer.currTimer),
              i.refresh_code_state())
            : (i.label_account_no.visible = true);
        })),
        (this.btn_regist = this.root.getChildByName('btn_enter')),
        (this.btn_regist.clickHandler = new Laya.Handler(this, () => {
          if (!i.locking) {
            app.Log.log('btn mail login');
            const t = i.input_account.text;
            Yo.submit({
              account: i.input_account.text,
              code: i.input_code.text
            }).then(e => {
              e
                ? (app.Log.log(`mail login submit result:${e.result}`),
                  0 === e.result
                    ? (game.LocalStorage.setItem('mail_account', t),
                      a.onSocioBack(7, e.token, e.uid))
                    : 50016 === e.result
                    ? (a.Inst.showError(game.Tools.strOfLocalization(2686)),
                      a.Inst.showContainerLogin())
                    : 50009 === e.result
                    ? (a.Inst.showError(game.Tools.strOfLocalization(2687)),
                      a.Inst.showContainerLogin())
                    : (a.Inst.showError(game.Tools.strOfLocalization(2689)),
                      a.Inst.showContainerLogin()))
                : (app.Log.log('mail login submit result: no'),
                  a.Inst.showError(game.Tools.strOfLocalization(2689)),
                  a.Inst.showContainerLogin());
            }),
              1 == i.saveflag
                ? (game.LocalStorage.setItem(
                    'useremail',
                    i.input_account.text
                  ),
                  game.LocalStorage.setItem('saveflag', 'true'))
                : (game.LocalStorage.setItem('useremail', ''),
                  game.LocalStorage.setItem('saveflag', 'false')),
              i.close(),
              a.Inst.showLoginLoading(7);
          }
        })),
        (this.label_info = this.root
          .getChildByName('sendbutton')
          .getChildByName('label'));
      const n = this.root.getChildByName('checkxieyi');
      (this.checkbox = n.getChildByName('checkbox')),
        (n.getChildByName('btn_check').clickHandler = new Laya.Handler(
          this,
          () => {
            (i.checkbox.visible = !i.checkbox.visible),
              (i.btn_regist.visible = i.checkbox.visible);
          }
        ));
      let r;
      'jp' == GameMgr.client_language
        ? ((n.getChildByName('en').visible = false),
          (r = n.getChildByName('jp')))
        : ((n.getChildByName('jp').visible = false),
          (r = n.getChildByName('en'))),
        (n.getChildByName('btn_check').clickHandler = new Laya.Handler(
          this,
          () => {
            (i.checkbox.visible = !i.checkbox.visible),
              (i.btn_regist.visible = i.checkbox.visible);
          }
        )),
        (r.getChildByName('guize').clickHandler = Laya.Handler.create(
          this,
          () => {
            'jp' == GameMgr.client_language
              ? t.UI_User_Xieyi_enjp.Inst.show('docs/jp_liyongguiyue.txt')
              : 'en' == GameMgr.client_language &&
                t.UI_User_Xieyi_enjp.Inst.show('docs/term_of_service.txt');
          },
          null,
          false
        )),
        (r.getChildByName('yinsi').clickHandler = Laya.Handler.create(
          this,
          () => {
            'jp' == GameMgr.client_language
              ? t.UI_User_Xieyi_enjp.Inst.show('docs/jp_yinsixieyi.txt')
              : 'en' == GameMgr.client_language &&
                t.UI_User_Xieyi_enjp.Inst.show('docs/privacy_policy.txt');
          },
          null,
          false
        ));
    }
    return (e.prototype.onchangecheck = function(t) {
      (this.checkbox.visible = t),
        (this.btn_regist.visible = t),
        (this.root.getChildByName('checkxieyi').visible = t);
    }),
    (e.prototype.show = function() {
      const e = this;
      (this.locking = true),
        (this.me.visible = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        ),
        (this.input_account.text = ''),
        (this.label_account_no.visible = false),
        (this.input_code.text = ''),
        (this.checkbox.visible = true),
        (this.btn_regist.visible = true);
      const i = game.LocalStorage.getItem('saveflag'), n = game.LocalStorage.getItem('useremail');
      'true' == i && ((this.input_account.text = n), app.Log.log(n)),
        game.Tools.setGrayDisable(this.btn_regist, true),
        Laya.timer.clearAll(this),
        this.refresh_code_state(),
        Laya.timer.loop(100, this, () => {
          e.refresh_code_state();
        });
    }),
    (e.prototype.refresh_code_state = function() {
      let t = 1e8;
      game.Tools.setGrayDisable(this.btn_getcode, true),
        this.last_mail_time > 0 &&
          (t = Laya.timer.currTimer - this.last_mail_time),
        t < 6e4
          ? ((this.label_info.underline = false),
            (t = Math.ceil((6e4 - t) / 1e3)),
            (this.label_info.text = game.Tools.strOfLocalization(2682, [
              t.toString()
            ])),
            (this.label_info.underline = false),
            game.Tools.setGrayDisable(this.btn_getcode, true))
          : ((this.label_info.text = game.Tools.strOfLocalization(2720)),
            (this.label_info.underline = true),
            game.Tools.setGrayDisable(this.btn_getcode, false));
    }),
    (e.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.me.visible = false), Laya.timer.clearAll(e);
          })
        );
    }),
    e
  ;
  })();

  var a = (a => {
    function r() {
      const t = a.call(this, new ui.entrance.entranceUI()) || this;
      return (
        (t.scene = null),
        (t.txt_account = null),
        (t.txt_password = null),
        (t.btn_login_cd = 0),
        (t.login_loading = null),
        (t.btn_add2desktop = null),
        (t.page_maillogin = null),
        (t.container_extendInfo = null),
        (t.server_index = 0),
        (t.xieyiflag = 0),
        (r.Inst = t),
        t
      );
    }
    return __extends(r, a),
    (r.trySocio = function(t) {
      const e = Laya.LocalStorage.getItem('_pre_sociotype');
      let i = -1;
      e && '' != e && (i = parseInt(e));
      let n = true;
      if (i === t)
        if (t >= 1 && t <= 6) {
          const a = Laya.LocalStorage.getItem('_pre_code');
          a && '' != a && ((n = false), this.onSocioBack(t, a, null));
        } else if (7 == t);
        else if (t >= 8 && t <= 10) {
          let r = game.LocalStorage.getItem('yostar_token');
          r || (r = '');
          let s = game.LocalStorage.getItem('yostar_uid');
          s || (s = ''),
            '' != r && '' != s && ((n = false), this.onSocioBack(t, r, s));
        }
      if (n)
        if (GameMgr.inConch) {
          const o = Laya.PlatformClass.createClass('layaair.majsoul.mjmgr');
          1 == t
            ? o.call('wxLogin')
            : 2 == t
            ? o.call('weiboLogin')
            : 3 == t && o.call('qqLogin');
        } else if (GameMgr.iniOSWebview) {
          let l = '';
          switch (t) {
            case 1:
              l = 'wxLogin';
              break;
            case 2:
              l = 'wbLogin';
              break;
            case 3:
              l = 'qqLogin';
          }
          if (l) {
            const h = this;
            Laya.Browser.window.wkbridge.callNative(l, '', e => {
              h.onSocioBack(t + 3, e, null);
            });
          }
        } else {
          let c = window.location.href;
          if ((c.includes('?') && (c = c.split('?')[0]), 1 == t)) {
            u = 'https://open.weixin.qq.com/connect/qrconnect?';
            (u += 'appid=wx2a0c2449cab74448'),
              (u += '&response_type=code'),
              (u +=
                `&redirect_uri=${encodeURI(`http://www.majsoul.com/0?xdsfdl=1-${c}`)}`),
              (u += '&scope=snsapi_login'),
              (Laya.Browser.window.location.href = u);
          } else if (2 == t) {
            u = 'https://api.weibo.com/oauth2/authorize?';
            (u += 'client_id=399644784'),
              (u += `&redirect_uri=http://www.majsoul.com/0?xdsfdl=2-${c}`),
              (Laya.Browser.window.location.href = u);
          } else if (3 == t) {
            var u = 'https://graph.qq.com/oauth2.0/authorize?';
            (u += 'response_type=code'),
              (u += '&client_id=101480027'),
              (u +=
                `&redirect_uri=${encodeURI('http://www.majsoul.com/0')}`),
              GameMgr.Inst.link_url.includes('majsoul.com/1')
                ? (u += '&state=xdsfdl4')
                : (u += '&state=xdsfdl3'),
              (Laya.Browser.window.location.href = u);
          } else if (7 == t) this.Inst && this.Inst.showMailLogin();
          else if (8 == t) {
            _ = `${GameMgr.Inst.link_url}redirect/`;
            GameMgr.inRelease
              ? (_ += GameMgr.client_language)
              : (_ += 'tt'),
              (_ += '/yo_google.html'),
              'jp' == GameMgr.client_language
                ? Yo.googleJaAuth({ redirect_uri: _, openNewWindow: false })
                : Yo.googleAuth({ redirect_uri: _, openNewWindow: false });
          } else if (9 == t) {
            _ = `${GameMgr.Inst.link_url}redirect/`;
            GameMgr.inRelease
              ? (_ += GameMgr.client_language)
              : (_ += 'tt'),
              (_ += '/yo_facebook.html'),
              Yo.facebookAuth({ redirect_uri: _, openNewWindow: false });
          } else if (10 == t) {
            var _ = `${GameMgr.Inst.link_url}redirect/`;
            GameMgr.inRelease
              ? (_ += GameMgr.client_language)
              : (_ += 'tt'),
              (_ += '/yo_tiwtter.html'),
              'jp' == GameMgr.client_language
                ? Yo.twitterJaAuth({ redirect_uri: _, openNewWindow: false })
                : Yo.twitterAuth({ redirect_uri: _, openNewWindow: false });
          }
        }
    }),
    (r.onSocioBack = function(t, e, i) {
      app.Log.log(`!!!!!!!!!!!!!!! ${t} ${e}`),
        this.Inst && this.Inst._onSocioBack(t, e, i);
    }),
    Object.defineProperty(r.prototype, 'server_region_name', {
      get() {
        switch (this.server_index) {
          case 0:
            return 'mainland';
          case 1:
            return 'hk';
          default:
            return '';
        }
      },
      enumerable: true,
      configurable: true
    }),
    (r.prototype.onCreate = function() {
      const a = this, s = this.me.getChildByName('root');
      this.container_login = this.me
        .getChildByName('root')
        .getChildByName('container_login');
      const o = t => {
        const e = {
          container: t,
          input: t.getChildByName('txtinput'),
          lb: t.getChildByName('lb')
        };
        return (e.input.text = ''),
        (e.lb.visible = true),
        e.input.on('focus', a, () => {
          e.lb.visible = false;
        }),
        e.input.on('blur', a, () => {
          e.lb.visible = !e.input.text || '' == e.input.text;
        }),
        e.input.on('input', a, () => {}),
        e
      ;
      };
      (this.label_server = this.container_login
        .getChildByName('chs')
        .getChildByName('lb')
        .getChildByName('word')),
        (this.container_login
          .getChildByName('chs')
          .getChildByName('lb')
          .getChildByName('btn').clickHandler = new Laya.Handler(
          this,
          () => {
            t.UI_Entrance_Choose_Route.Inst.show();
          }
        )),
        'chs' != GameMgr.client_language &&
          ((this.container_login
            .getChildByName('chs')
            .getChildByName('lb').visible = false),
          (this.container_login
            .getChildByName('chs')
            .getChildByName('img_lb').visible = false)),
        (this.txt_account = o(
          this.container_login
            .getChildByName('chs')
            .getChildByName('container_account')
        )),
        (this.txt_password = o(
          this.container_login
            .getChildByName('chs')
            .getChildByName('container_mima')
        )),
        this.txt_account.input.on(
          laya.events.Event.KEY_DOWN,
          this.txt_account.input,
          ({keyCode}) => {
            keyCode === Laya.Keyboard.ENTER && a._btn_login();
          }
        ),
        this.txt_password.input.on(
          laya.events.Event.KEY_DOWN,
          this.txt_account.input,
          ({keyCode}) => {
            keyCode === Laya.Keyboard.ENTER && a._btn_login();
          }
        ),
        (this.container_extendInfo = s.getChildByName('extendinfo')),
        (this.container_extendInfo.visible = false),
        (this.container_login
          .getChildByName('chs')
          .getChildByName('btn_regist').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_Entrance_Mail_Regist.Inst.show();
          },
          null,
          false
        )),
        (this.container_login
          .getChildByName('chs')
          .getChildByName(
            'btn_forgetpassword'
          ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_Entrance_Reset_Password.Inst.show();
          },
          null,
          false
        )),
        (this.btn_add2desktop = this.me
          .getChildByName('root')
          .getChildByName('btn_add2desktop')),
        (this.btn_add2desktop.visible =
          (Laya.Browser.onAndriod ||
            Laya.Browser.onAndroid ||
            Laya.Browser.onIOS) &&
          !GameMgr.inConch &&
          !GameMgr.inConch),
        (this.btn_add2desktop.clickHandler = new Laya.Handler(
          this,
          () => {
            t.UI_Add2Desktop.Inst && t.UI_Add2Desktop.Inst.show();
          }
        )),
        (this.container_login
          .getChildByName('chs')
          .getChildByName('btn_enter').clickHandler = Laya.Handler.create(
          this,
          this._btn_login,
          null,
          false
        )),
        (this.login_loading = new i(s.getChildByName('loading_login'))),
        (this.page_maillogin = new n(this.me.getChildByName('mail_login'))),
        (this.scene = new e(this.me.getChildByName('scene'))),
        (this.container_social = this.container_login.getChildByName(
          'social'
        )),
        (this.social_btns = []);
      for (u = 0; u < 4; u++)
        this.social_btns.push(
          this.container_social.getChildByName(`btn${u}`)
        ),
          (this.social_btns[u].visible = false);
      let l = [];
      'chs' == GameMgr.client_language &&
        (l = [
          { img: 'myres/entrance/weibo.png', type: 2 },
          { img: 'myres/entrance/QQ.png', type: 3 },
          { img: 'myres/entrance/weixin.png', type: 1 }
        ]),
        'jp' == GameMgr.client_language &&
          (l = [
            { img: 'myres/entrance/google.png', type: 8 },
            { img: 'myres/entrance/tiwtter.png', type: 10 }
          ]),
        'en' == GameMgr.client_language &&
          (l = [
            { img: 'myres/entrance/google.png', type: 8 },
            { img: 'myres/entrance/facebook.png', type: 9 },
            { img: 'myres/entrance/tiwtter.png', type: 10 }
          ]);
      for (
        var h = t => {
            const e = c.social_btns[t];
            t < l.length
              ? ((e.visible = true),
                (e.getChildAt(0).skin = game.Tools.localUISrc(l[t].img)),
                (e.clickHandler = new Laya.Handler(c, () => {
                  r.trySocio(l[t].type);
                })),
                (e.x = (340 * t) / (l.length - 1) + 55))
              : (e.visible = false);
          },
          c = this,
          u = 0;
        u < this.social_btns.length;
        u++
      )
        h(u);
      2 == l.length &&
        ((this.social_btns[0].x = 340 / 3 + 55),
        (this.social_btns[1].x = 680 / 3 + 55)),
        (this.me
          .getChildByName('infos')
          .getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            GameMgr.inConch ||
              game.Tools.open_new_window(
                'http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/2c1d78cce7104e28b8898e2c0fc3d803'
              );
          },
          null,
          false
        )),
        (this.me.getChildByName('infos').visible = false),
        (this.me.getChildByName('copyright').visible =
          'chs' == GameMgr.client_language && GameMgr.inConch);
    }),
    (r.prototype.ModelJpEn = function() {
      const t = this.container_login.getChildByName('jpen'), e = t.getChildByName('btn_enter');
      e.clickHandler = Laya.Handler.create(
        this,
        () => {
          !(t => {
            1 == t && r.trySocio(7);
          })(true);
        },
        null,
        false
      );
      const i = t.getChildByName('checksave'), n = i.getChildByName('checkbox');
      i.getChildByName('btn_check').clickHandler = new Laya.Handler(
        this,
        () => {
          n.visible = !n.visible;
        }
      );
    }),
    (r.prototype.show = function() {
      const t = this;
      'chs' != GameMgr.client_language && GameMgr.inRelease
        ? ((this.container_login.getChildByName('chs').visible = false),
          (this.container_login.getChildByName('jpen').visible = true),
          this.ModelJpEn())
        : ((this.container_social.x = 40), (this.container_social.y = 475)),
        -1 != GameMgr.Inst.beinvited_roomid
          ? ((this.container_extendInfo.visible = true),
            (this.container_extendInfo.getChildAt(0).text =
              `${game.Tools.strOfLocalization(2054)}:${GameMgr.Inst.beinvited_roomid}`))
          : '' != GameMgr.Inst.outsee_paipuid
          ? ((this.container_extendInfo.visible = true),
            (this.container_extendInfo.getChildAt(
              0
            ).text = game.Tools.strOfLocalization(2055)))
          : (this.container_extendInfo.visible = false),
        (this.me.getChildByName('root').getChildByName('version').text =
          game.ResourceVersion.version);
      const e = Laya.LocalStorage.getItem('_pre_sociotype');
      let i = Laya.LocalStorage.getItem('ssssoooodd');
      i || (i = '');
      let n = -1;
      if (
        (e && '' != e && (n = parseInt(e)),
        app.Log.log(`sociotype:${n}`),
        n < 0 || n > 10)
      )
        this.showContainerLogin();
      else if (0 == n)
        '' != i
          ? (Laya.timer.once(600, this, () => {
              t._try_socio_check(n, i);
            }),
            this.showLoginLoading(0))
          : this.showContainerLogin();
      else if (n >= 1 && n <= 6) {
        let a = Laya.LocalStorage.getItem('_pre_code');
        a || (a = ''),
          '' != a || '' != i
            ? (this.showLoginLoading(n),
              Laya.timer.once(500, this, () => {
                a && '' != a
                  ? t._loginby_sociocode(n, a)
                  : t._try_socio_check(n, i);
              }))
            : this.showContainerLogin();
      } else if (
        n >= 7 &&
        n <= 10 &&
        'chs' != GameMgr.client_language &&
        Yo.login
      ) {
        let r = game.LocalStorage.getItem('yostar_token');
        r || (r = '');
        let s = game.LocalStorage.getItem('yostar_uid');
        s || (s = ''),
          '' != s && '' != r
            ? (this.showLoginLoading(n),
              Laya.timer.once(500, this, () => {
                t._login_2_yostar(n, r, s);
              }))
            : this.showContainerLogin();
      } else this.showContainerLogin();
      this.scene.show(),
        (this.enable = true),
        'hk' == game.LobbyNetMgr.gateway_region_name
          ? this.showServer(1)
          : this.showServer(0);
    }),
    (r.prototype._onSocioBack = function(t, e, i) {
      const n = this;
      this.showLoginLoading(t),
        Laya.timer.once(500, this, () => {
          e && '' != e
            ? (Laya.LocalStorage.setItem('_pre_sociotype', t.toString()),
              i
                ? n._login_2_yostar(t, e, i)
                : (Laya.LocalStorage.setItem('_pre_code', e),
                  n._loginby_sociocode(t, e)))
            : n.showContainerLogin();
        });
    }),
    (r.prototype.showContainerLogin = function() {
      if ('' == this.txt_account.input.text) {
        const t = game.LocalStorage.getItem('account');
        t && '' != t
          ? ((this.txt_account.input.text = t),
            (this.txt_account.lb.visible = false))
          : ((this.txt_account.input.text = ''),
            (this.txt_account.lb.visible = true));
      }
      const e = game.LocalStorage.getItem('password');
      e && '' != e
        ? ((this.txt_password.input.text = e),
          (this.txt_password.lb.visible = false))
        : ((this.txt_password.input.text = ''),
          (this.txt_password.lb.visible = true)),
        (this.container_login.visible = true),
        this.login_loading.close();
    }),
    (r.prototype.showLoginLoading = function(t) {
      (this.container_login.visible = false), this.login_loading.show(t);
    }),
    (r.prototype._btn_login = function() {
      const e = this, i = this.txt_account.input.text, n = this.txt_password.input.text;
      i && '' != i
        ? n && '' != n
          ? Laya.timer.currTimer < this.btn_login_cd ||
            (this.multiLogin()
              ? this.showInfo(game.Tools.strOfLocalization(2058))
              : ((this.btn_login_cd = Laya.timer.currTimer + 3e3),
                this.showLoginLoading(0),
                game.LobbyNetMgr.Inst.isOK &&
                r.Inst.server_region_name ==
                  game.LobbyNetMgr.gateway_region_name
                  ? r.Inst._try_login_account(i, n)
                  : game.LobbyNetMgr.Inst.OpenConnect(
                      r.Inst.server_region_name,
                      Laya.Handler.create(this, ({open, maintenance, info}) => {
                        open
                          ? r.Inst._try_login_account(i, n)
                          : (maintenance
                              ? t.UI_Entrance_Maintenance.Inst.show(
                                  maintenance
                                )
                              : e.showInfo(info),
                            e.showContainerLogin(),
                            (e.btn_login_cd = 0));
                      })
                    )))
          : this.showInfo(game.Tools.strOfLocalization(2057))
        : this.showInfo(game.Tools.strOfLocalization(2056));
    }),
    (r.prototype._try_regist_account = function(t, e, i) {
      const n = this;
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'signup',
        { account: t, password: GameMgr.encodeP(i), code: e },
        (e, a) => {
          e
            ? (n.showError(game.Tools.strOfLocalization(2059), e),
              app.Log.Error(e.message))
            : a.error
            ? (n.showError(
                game.Tools.strOfLocalization(2060),
                a.error.code
              ),
              app.Log.Error(
                game.Tools.strOfLocalization(2219, [JSON.stringify(a)])
              ))
            : (game.LocalStorage.setItem('account', t),
              game.LocalStorage.setItem('password', i),
              n._try_login_account(t, i));
        }
      );
    }),
    (r.prototype._try_login_account = function(e, i) {
      const n = this;
      if (this.multiLogin())
        return (
          this.showInfo(game.Tools.strOfLocalization(2058)),
          void this.showContainerLogin()
        );
      const a = {};
      GameMgr.inConch
        ? (a.device_type = 'app')
        : GameMgr.iniOSWebview
        ? (a.device_type = 'app-ios')
        : (Laya.Browser.onPC && (a.device_type = 'pc'),
          Laya.Browser.onIPad && (a.device_type = 'ipad'),
          Laya.Browser.onMobile && (a.device_type = 'mobile')),
        Laya.Browser.onMac && (a.os = 'mac'),
        Laya.Browser.onIOS && (a.os = 'ios'),
        (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
          (a.os = 'android'),
        Laya.Browser.onWeiXin && (a.browser = 'weixin'),
        Laya.Browser.onSafari && (a.browser = 'safari'),
        Laya.Browser.onFirefox && (a.browser = 'firefox'),
        Laya.Browser.onEdge && (a.browser = 'edge'),
        Laya.Browser.onMiniGame && (a.browser = 'minigame');
      const r = [];
      GameMgr.inGooglePlay && r.push(1),
        GameMgr.inChina && r.push(2),
        game.LocalStorage.setItem('account', e),
        game.LocalStorage.setItem('password', i),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'login',
          {
            account: e,
            password: GameMgr.encodeP(i),
            reconnect: false,
            device: a,
            random_key: GameMgr.device_id,
            client_version: game.ResourceVersion.version,
            gen_access_token: true,
            currency_platforms: r
          },
          (a, r) => {
            (n.btn_login_cd = 0),
              a
                ? (n.showError(game.Tools.strOfLocalization(2061), a),
                  n.showContainerLogin())
                : r.error
                ? (503 == r.error.code
                    ? t.UI_Entrance_Prohibition.Inst.show(r.error)
                    : n.showError('', r.error.code),
                  n.showContainerLogin())
                : (Laya.LocalStorage.setItem('_pre_sociotype', '0'),
                  game.LocalStorage.setItem('account', e),
                  game.LocalStorage.setItem('password', i),
                  (GameMgr.Inst.account = e),
                  (GameMgr.Inst.password = i),
                  (GameMgr.Inst.sociotype = 0),
                  n._onLoginSuccess(0, r));
          }
        );
    }),
    (r.prototype._login_2_yostar = function(t, e, i) {
      app.Log.log(
        `login_2_yostar sociotype:${t} token:${e} uid:${i}`
      );
      const n = this,
            a = t => {
              switch (t) {
                case 1:
                  n.showError(game.Tools.strOfLocalization(2677));
                  break;
                case 2:
                  n.showError(game.Tools.strOfLocalization(2678));
                  break;
                case 3:
                  n.showError(game.Tools.strOfLocalization(2679));
                  break;
                case 4:
                  n.showError(game.Tools.strOfLocalization(2680));
                  break;
                default:
                  n.showError(game.Tools.strOfLocalization(2676));
              }
              Laya.LocalStorage.setItem('_pre_sociotype', ''),
                n.showContainerLogin();
            };
      Yo.login &&
        Yo.login({ uid: i, token: e }).then(r => {
          r
            ? (app.Log.log(`yo login data.result:${r.result}`),
              0 == r.result
                ? (game.LocalStorage.setItem('yostar_token', e),
                  game.LocalStorage.setItem('yostar_uid', i),
                  (GameMgr.Inst.yostar_accessToken = r.accessToken),
                  n._loginby_sociocode(t, r.accessToken, i))
                : a(r.result))
            : (app.Log.log('yo login data.result: no'), a(-1));
        });
    }),
    (r.prototype._loginby_sociocode = function(e, i, n) {
      const a = this;
      if (
        (undefined === n && (n = ''),
        app.Log.log(
          `_loginby_sociocode0 sociotype:${e}, code:${i}, uid:${n}`
        ),
        game.LobbyNetMgr.Inst.isOK &&
          r.Inst.server_region_name == game.LobbyNetMgr.gateway_region_name)
      ) {
        Laya.LocalStorage.setItem('_pre_code', ''),
          Laya.LocalStorage.setItem('_pre_sociotype', ''),
          app.Log.log(
            `_loginby_sociocode1 sociotype${e} code:${i} uid:${n}`
          );
        const s = { type: e, code: i };
        n && (s.uid = n),
          app.NetAgent.sendReq2Lobby('Lobby', 'oauth2Auth', s, (t, i) => {
            t
              ? (app.Log.log(`oauth2Auth err:${t}`),
                a.showError(game.Tools.strOfLocalization(2059), t),
                app.Log.Error(t.message),
                a.showContainerLogin())
              : (app.Log.log(`oauth2Auth res: ${JSON.stringify(i)}`),
                i.error
                  ? (a.showError(
                      game.Tools.strOfLocalization(2062),
                      i.error.code
                    ),
                    a.showContainerLogin())
                  : a._try_socio_check(e, i.access_token));
          });
      } else
        game.LobbyNetMgr.Inst.OpenConnect(
          r.Inst.server_region_name,
          Laya.Handler.create(this, ({open, maintenance, info}) => {
            open
              ? a._loginby_sociocode(e, i, n)
              : (maintenance
                  ? t.UI_Entrance_Maintenance.Inst.show(maintenance)
                  : a.showInfo(info),
                a.showContainerLogin());
          })
        );
    }),
    (r.prototype._try_socio_check = function(e, i) {
      const n = this;
      if (this.multiLogin())
        return (
          this.showInfo(game.Tools.strOfLocalization(2058)),
          void this.showContainerLogin()
        );
      game.LobbyNetMgr.Inst.isOK &&
      r.Inst.server_region_name == game.LobbyNetMgr.gateway_region_name
        ? (app.Log.log(
            `_try_socio_check sociotype${e} access_token:${i}`
          ),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'oauth2Check',
            { type: e, access_token: i },
            (t, a) => {
              t
                ? (n.showError(game.Tools.strOfLocalization(2059), t),
                  app.Log.Error(t.message),
                  n.showContainerLogin())
                : (app.Log.log(`oauth2Check res: ${JSON.stringify(a)}`),
                  a.error
                    ? (n.showError(
                        game.Tools.strOfLocalization(2062),
                        a.error.code
                      ),
                      n.showContainerLogin())
                    : a.has_account
                    ? n._try_login_socio(e, i)
                    : n._try_regist_socio(e, i));
            }
          ))
        : game.LobbyNetMgr.Inst.OpenConnect(
            r.Inst.server_region_name,
            Laya.Handler.create(this, ({open, maintenance, info}) => {
              open
                ? n._try_socio_check(e, i)
                : (maintenance
                    ? t.UI_Entrance_Maintenance.Inst.show(maintenance)
                    : n.showInfo(info),
                  n.showContainerLogin());
            })
          );
    }),
    (r.prototype._try_regist_socio = function(t, e) {
      const i = this;
      app.Log.log(`_try_regist_socio sociotype${t} access_token:${e}`);
      const n = Laya.LocalStorage.getItem('__ad_s');
      n && (GameMgr.Inst._ad_str = n);
      const a = {};
      (a.type = t),
        (a.access_token = e),
        GameMgr.Inst._ad_str && (a.advertise_str = GameMgr.Inst._ad_str),
        7 == t && (a.email = game.LocalStorage.getItem('mail_account')),
        app.NetAgent.sendReq2Lobby('Lobby', 'oauth2Signup', a, (n, a) => {
          n
            ? (app.Log.log(`oauth2Signup err:${n}`),
              i.showError(game.Tools.strOfLocalization(2059), n),
              app.Log.Error(n.message),
              i.showContainerLogin())
            : (app.Log.log(`oauth2Signup res: ${JSON.stringify(a)}`),
              a.error
                ? (i.showError(
                    game.Tools.strOfLocalization(2060),
                    a.error.code
                  ),
                  app.Log.Error(
                    game.Tools.strOfLocalization(2219, [JSON.stringify(a)])
                  ),
                  i.showContainerLogin())
                : (app.PlayerBehaviorStatistic.fb_trace_force(
                    app.EBehaviorType.CompleteRegistration
                  ),
                  app.PlayerBehaviorStatistic.google_trace_force(
                    app.EBehaviorType.G_Role_create
                  ),
                  app.PlayerBehaviorStatistic.tw_trace_force(
                    app.EBehaviorType.TW_Signup
                  ),
                  i._try_login_socio(t, e)));
        });
    }),
    (r.prototype._try_login_socio = function(e, i) {
      const n = this;
      if (this.multiLogin())
        return (
          this.showError(game.Tools.strOfLocalization(2058)),
          void this.showContainerLogin()
        );
      app.Log.log(`_try_login_socio sociotype${e} access_token:${i}`);
      const a = {};
      GameMgr.inConch
        ? (a.device_type = 'app')
        : GameMgr.iniOSWebview
        ? (a.device_type = 'app-ios')
        : (Laya.Browser.onPC && (a.device_type = 'pc'),
          Laya.Browser.onIPad && (a.device_type = 'ipad'),
          Laya.Browser.onMobile && (a.device_type = 'mobile')),
        Laya.Browser.onMac && (a.os = 'mac'),
        Laya.Browser.onIOS && (a.os = 'ios'),
        (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
          (a.os = 'android'),
        Laya.Browser.onWeiXin && (a.browser = 'weixin'),
        Laya.Browser.onSafari && (a.browser = 'safari'),
        Laya.Browser.onFirefox && (a.browser = 'firefox'),
        Laya.Browser.onEdge && (a.browser = 'edge'),
        Laya.Browser.onMiniGame && (a.browser = 'minigame');
      const r = [];
      GameMgr.inGooglePlay && r.push(1),
        GameMgr.inChina && r.push(2),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'oauth2Login',
          {
            type: e,
            access_token: i,
            reconnect: false,
            device: a,
            random_key: GameMgr.device_id,
            client_version: game.ResourceVersion.version,
            currency_platforms: r
          },
          (a, r) => {
            (n.btn_login_cd = 0),
              a
                ? (app.Log.log(`oauth2Login err:${a}`),
                  n.showError(game.Tools.strOfLocalization(2061), a),
                  n.showContainerLogin())
                : (app.Log.log(`oauth2Login res: ${JSON.stringify(r)}`),
                  r.error
                    ? (503 == r.error.code
                        ? t.UI_Entrance_Prohibition.Inst.show(r.error)
                        : n.showError('', r.error.code),
                      n.showContainerLogin())
                    : (Laya.LocalStorage.setItem(
                        '_pre_sociotype',
                        e.toString()
                      ),
                      Laya.LocalStorage.setItem('ssssoooodd', i),
                      (GameMgr.Inst.sociotype = e),
                      (GameMgr.Inst.access_token = i),
                      n._onLoginSuccess(e, r)));
          }
        );
    }),
    (r.prototype._onLoginSuccess = function(e, i) {
      const n = this;
      if (
        (app.Log.log(`登陆：${JSON.stringify(i)}`),
        (GameMgr.Inst.account_id = i.account_id),
        (GameMgr.Inst.account_data = i.account),
        (GameMgr.Inst.account_numerical_resource = {}),
        i.account.platform_diamond)
      )
        for (let a = i.account.platform_diamond, r = 0; r < a.length; r++)
          GameMgr.Inst.account_numerical_resource[a[r].id] = a[r].count;
      (GameMgr.Inst.account_refresh_time = Laya.timer.currTimer),
        i.game_info &&
          ((GameMgr.Inst.ingame = true),
          (GameMgr.Inst.mj_server_location = i.game_info.location),
          (GameMgr.Inst.mj_game_token = i.game_info.connect_token),
          (GameMgr.Inst.mj_game_uuid = i.game_info.game_uuid)),
        i.access_token &&
          (Laya.LocalStorage.setItem('_pre_sociotype', e.toString()),
          Laya.LocalStorage.setItem('ssssoooodd', i.access_token),
          (GameMgr.Inst.sociotype = e),
          (GameMgr.Inst.access_token = i.access_token)),
        Laya.LocalStorage.removeItem('__ad_s'),
        t.UI_Loading.Inst.show('load_lobby'),
        (this.enable = false),
        this.scene.close(),
        t.UI_Entrance_Mail_Regist.Inst.close(),
        this.login_loading.close(),
        t.UIMgr.Inst.openLobbyUI(
          Laya.Handler.create(this, () => {
            GameMgr.Inst.afterLogin(),
              GameMgr.Inst.account_data.anti_addiction &&
                t.UIMgr.Inst.ShowPreventAddiction(),
              n.destroy(),
              n.disposeRes(),
              t.UI_Add2Desktop.Inst &&
                (t.UI_Add2Desktop.Inst.destroy(),
                (t.UI_Add2Desktop.Inst = null));
          }),
          Laya.Handler.create(
            this,
            e => t.UI_Loading.Inst.setProgressVal(0.2 * e),
            null,
            false
          )
        );
    }),
    (r.prototype.showMailLogin = function() {
      this.page_maillogin.show();
    }),
    (r.prototype.showInfo = e => {
      let i = '';
      e && (i += e), t.UI_Entrance_Error.Inst.show(i, false);
    }),
    (r.prototype.showError = (e, i, n) => {
      undefined === i && (i = -1), undefined === n && (n = '');
      let a = '';
      e && (a += e),
        -1 != i &&
          (a.length > 0 && (a += ','),
          cfg.info.error.get(i)
            ? (a += cfg.info.error.get(i)[GameMgr.client_language])
            : (a += `${game.Tools.strOfLocalization(2063)}(${i})`)),
        n && (a += `, info:${n}`),
        t.UI_Entrance_Error.Inst.show(a, false);
    }),
    (r.prototype.showServer = function(t) {
      0 == t
        ? (Laya.LocalStorage.setItem('gateway_region', 'mainland'),
          (this.server_index = 0),
          (this.label_server.text = game.Tools.strOfLocalization(2217)))
        : 1 == t &&
          (Laya.LocalStorage.setItem('gateway_region', 'hk'),
          (this.server_index = 1),
          (this.label_server.text = game.Tools.strOfLocalization(2216)));
    }),
    (r.Accountforbidden = t => {
      let e = false;
      return cfg.info.forbidden.forEach(({word}, n) => {
        '' != word && t.includes(word) && (e = true);
      }),
      e
    ;
    }),
    (r.prototype.multiLogin = () => {
      const t = Laya.LocalStorage.getItem('dolllt');
      return (
        !(!t || '' == t) && game.Tools.currentTime < parseFloat(t) + 1.5
      );
    }),
    (r.prototype.disposeRes = () => {
      Laya.Loader.clearTextureRes('res/atlas/myres/entrance.atlas');
      let t = '';
      (t =
        'en' == GameMgr.client_language
          ? 'scene/Assets/Resource/entrance/icon_color_en.png'
          : 'jp' == GameMgr.client_language
          ? 'scene/Assets/Resource/entrance/icon_color_jp.png'
          : 'scene/Assets/Resource/entrance/icon_color.png'),
        Laya.loader.getRes(t).dispose(true);
    }),
    (r.Inst = null),
    r
  ;
  })(t.UIBase);

  t.UI_Entrance = a;
})(uiscript || (uiscript = {}));