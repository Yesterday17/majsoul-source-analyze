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
    function t(e) {
      this.me = e;
      t.scene_entrance =
          'jp' == GameMgr.client_language
            ? 'scene/entrance_jp.ls'
            : 'en' == GameMgr.client_language
            ? 'scene/entrance_en.ls'
            : 'scene/entrance.ls';
    }

    t.prototype.show = function() {
      this.scene = Laya.loader.getRes(t.scene_entrance);
      this.me.addChild(this.scene);
      this.scene.visible = !0;
    };

    t.prototype.close = function() {
      Laya.timer.clearAll(this);
      this.scene.visible = !1;
      this.scene.destroy(!0);
    };

    t.scene_entrance = '';
    return t;
  })();

  var i = (() => {
    class t {
      constructor(t) {
        this.me = t;
        this.round = this.me.getChildByName('round');
        this.word = this.me.getChildByName('word');
        this.icon = this.me.getChildByName('icon');
        this.me.visible = !1;
      }

      show(t) {
        var e = this;
        if (!this.me.visible) {
          this.me.visible = !0;
          var i = Laya.timer.currTimer;

          Laya.timer.frameLoop(1, this, () => {
              e.round.rotation = ((Laya.timer.currTimer - i) / 2e3) * 360;
            });

          this.word.text = game.Tools.strOfLocalization(2053);
          this.icon.visible = !1;
          this.icon.visible = !0;
          this.word.y = 195;
          if (
            (0 == t)
          )
            this.word.y = 150;
          else
            switch ((t)) {
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
                this.icon.visible = !1;
            }
        }
      }

      close() {
        Laya.timer.clearAll(this);
        this.me.visible = !1;
      }
    }

    return t;
  })();

  var n = (() => {
    class e {
      constructor(e) {
        var i = this;
        this.saveflag = !0;
        this.locking = !1;
        this.last_mail_time = -1;
        this.me = e;
        this.me.visible = !1;
        this.root = this.me.getChildByName('jpenroot');

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || i.close();
            },
            null,
            !1
          );

        this.input_account = this.root
            .getChildByName('container_mail')
            .getChildByName('txtinput');

        this.label_account_no = this.root
            .getChildByName('container_mail')
            .getChildByName('no');

        this.input_account.on('input', this, () => {
          i.label_account_no.visible && (i.label_account_no.visible = !1);
          '' != i.input_code.text &&
            '' != i.input_account.text &&
            game.Tools.setGrayDisable(i.btn_regist, !1);
        });

        this.input_code = this.root
            .getChildByName('container_yanzhengma')
            .getChildByName('txtinput');

        this.input_code.on('input', this, () => {
          '' != i.input_code.text &&
            '' != i.input_account.text &&
            game.Tools.setGrayDisable(i.btn_regist, !1);
        });

        this.btn_getcode = this.root
            .getChildByName('sendbutton')
            .getChildByName('btn');

        this.btn_getcode.clickHandler = new Laya.Handler(this, () => {
          var t = i.input_account.text;

          Yo.request({
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
              });

          i.last_mail_time = Laya.timer.currTimer;
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            t
          )
            ? (i.refresh_code_state())
            : (i.label_account_no.visible = !0);
        });

        this.btn_regist = this.root.getChildByName('btn_enter');

        this.btn_regist.clickHandler = new Laya.Handler(this, () => {
            if (!i.locking) {
              app.Log.log('btn mail login');
              var t = a.Inst.login_index,
                e = i.input_account.text;

              Yo.submit({
                account: i.input_account.text,
                code: i.input_code.text
              }).then(i => {
                app.Log.log(`mail login submit result:${i.result}`);
                game.LocalStorage.setItem('mail_account', e);
                a.Inst.showError(game.Tools.strOfLocalization(2686));
                a.Inst.showError(game.Tools.strOfLocalization(2687));
                a.Inst.showError(game.Tools.strOfLocalization(2689));
                app.Log.log('mail login submit result: no');
                a.Inst.showError(game.Tools.strOfLocalization(2689));
                t == a.Inst.login_index &&
                  (i
                    ? (0 === i.result
                  ? (a.onSocioBack(7, i.token, i.uid))
                  : 50016 === i.result
                  ? (a.Inst.showContainerLogin())
                  : 50009 === i.result
                  ? (a.Inst.showContainerLogin())
                  : (a.Inst.showContainerLogin()))
                    : (a.Inst.showContainerLogin()));
              });

              game.LocalStorage.setItem(
                    'useremail',
                    i.input_account.text
                  );

              game.LocalStorage.setItem('useremail', '');

              1 == i.saveflag
                ? (game.LocalStorage.setItem('saveflag', 'true'))
                : (game.LocalStorage.setItem('saveflag', 'false'));

              i.close();
              a.Inst.showLoginLoading(7);
            }
          });

        this.label_info = this.root
            .getChildByName('sendbutton')
            .getChildByName('label');
        var n = this.root.getChildByName('checkxieyi');
        this.checkbox = n.getChildByName('checkbox');
        n.getChildByName('btn_check').clickHandler = new Laya.Handler(
            this,
            () => {
              i.checkbox.visible = !i.checkbox.visible;
              i.btn_regist.visible = i.checkbox.visible;
            }
          );
        var r;
        n.getChildByName('en').visible = !1;
        n.getChildByName('jp').visible = !1;

        'jp' == GameMgr.client_language
          ? (r = n.getChildByName('jp'))
          : (r = n.getChildByName('en'));

        n.getChildByName('btn_check').clickHandler = new Laya.Handler(
            this,
            () => {
              i.checkbox.visible = !i.checkbox.visible;
              i.btn_regist.visible = i.checkbox.visible;
            }
          );

        r.getChildByName('guize').clickHandler = Laya.Handler.create(
            this,
            () => {
              'jp' == GameMgr.client_language
                ? t.UI_User_Xieyi_enjp.Inst.show('docs/jp_liyongguiyue.txt')
                : 'en' == GameMgr.client_language &&
                  t.UI_User_Xieyi_enjp.Inst.show('docs/term_of_service.txt');
            },
            null,
            !1
          );

        r.getChildByName('yinsi').clickHandler = Laya.Handler.create(
            this,
            () => {
              'jp' == GameMgr.client_language
                ? t.UI_User_Xieyi_enjp.Inst.show('docs/jp_yinsixieyi.txt')
                : 'en' == GameMgr.client_language &&
                  t.UI_User_Xieyi_enjp.Inst.show('docs/privacy_policy.txt');
            },
            null,
            !1
          );
      }

      onchangecheck(t) {
        this.checkbox.visible = t;
        this.btn_regist.visible = t;
        this.root.getChildByName('checkxieyi').visible = t;
      }

      show() {
        var e = this;
        this.locking = !0;
        this.me.visible = !0;

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );

        this.input_account.text = '';
        this.label_account_no.visible = !1;
        this.input_code.text = '';
        this.checkbox.visible = !0;
        this.btn_regist.visible = !0;
        var i = game.LocalStorage.getItem('saveflag'),
          n = game.LocalStorage.getItem('useremail');
        this.input_account.text = n;
        'true' == i && (app.Log.log(n));
        game.Tools.setGrayDisable(this.btn_regist, !0);
        Laya.timer.clearAll(this);
        this.refresh_code_state();
        Laya.timer.loop(100, this, () => {
          e.refresh_code_state();
        });
      }

      refresh_code_state() {
        var t = 1e8;
        game.Tools.setGrayDisable(this.btn_getcode, !0);

        this.last_mail_time > 0 &&
          (t = Laya.timer.currTimer - this.last_mail_time);

        this.label_info.underline = !1;
        t = Math.ceil((6e4 - t) / 1e3);

        this.label_info.text = game.Tools.strOfLocalization(2682, [
              t.toString()
            ]);

        this.label_info.underline = !1;
        this.label_info.text = game.Tools.strOfLocalization(2720);
        this.label_info.underline = !0;
        t < 6e4
          ? (game.Tools.setGrayDisable(this.btn_getcode, !0))
          : (game.Tools.setGrayDisable(this.btn_getcode, !1));
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.me.visible = !1;
            Laya.timer.clearAll(e);
          })
        );
      }
    }

    return e;
  })();

  var a = (a => {
    class r {
      constructor() {
        var t = a.call(this, new ui.entrance.entranceUI()) || this;
        t.scene = null;
        t.login_type_tabs = [];
        t.txt_account = null;
        t.txt_password = null;
        t.btn_login_cd = 0;
        t.login_loading = null;
        t.btn_add2desktop = null;
        t.btn_cancel_login = null;
        t.page_maillogin = null;
        t.container_extendInfo = null;
        t.server_index = 0;
        t.xieyiflag = 0;
        t.login_index = 0;
        t.login_type_tab_index = -1;
        t.login_account_input_info = {};
        r.Inst = t;
        return t;
      }

      static trySocio(t) {
        var e = Laya.LocalStorage.getItem('_pre_sociotype'),
          i = -1;
        e && '' != e && (i = parseInt(e));
        var n = !0;
        if (i === t)
          if (t >= 1 && t <= 6) {
            var a = Laya.LocalStorage.getItem('_pre_code');
            n = !1;
            a && '' != a && (this.onSocioBack(t, a, null));
          } else if (7 == t);
          else if (t >= 8 && t <= 10) {
            var r = game.LocalStorage.getItem('yostar_token');
            r || (r = '');
            var s = game.LocalStorage.getItem('yostar_uid');
            s || (s = '');
            n = !1;
            '' != r && '' != s && (this.onSocioBack(t, r, s));
          }
        if (n)
          if (GameMgr.inConch) {
            var o = Laya.PlatformClass.createClass('layaair.majsoul.mjmgr');
            1 == t
              ? o.call('wxLogin')
              : 2 == t
              ? o.call('weiboLogin')
              : 3 == t && o.call('qqLogin');
          } else if (GameMgr.iniOSWebview) {
            var l = '';
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
              var h = this;
              Laya.Browser.window.wkbridge.callNative(l, '', e => {
                h.onSocioBack(t + 3, e, null);
              });
            }
          } else {
            var c = window.location.href;
            c.includes('?') && (c = c.split('?')[0]);
            if ((1 == t)) {
              u = 'https://open.weixin.qq.com/connect/qrconnect?';
              u += 'appid=wx2a0c2449cab74448';
              u += '&response_type=code';

              u +=
                  `&redirect_uri=${encodeURI(`https://www.majsoul.com/0?xdsfdl=1-${c}`)}`;

              u += '&scope=snsapi_login';
              Laya.Browser.window.location.href = u;
            } else if (2 == t) {
              u = 'https://api.weibo.com/oauth2/authorize?';
              u += 'client_id=399644784';

              u +=
                  `&redirect_uri=https://www.majsoul.com/0?xdsfdl=2-${c}`;

              Laya.Browser.window.location.href = u;
            } else if (3 == t) {
              var u = 'https://graph.qq.com/oauth2.0/authorize?';
              u += 'response_type=code';
              u += '&client_id=101480027';

              u +=
                  `&redirect_uri=${encodeURI('https://www.majsoul.com/0')}`;

              GameMgr.Inst.link_url.includes('majsoul.com/1')
                ? (u += '&state=xdsfdl4')
                : (u += '&state=xdsfdl3');

              Laya.Browser.window.location.href = u;
            } else if (7 == t) this.Inst && this.Inst.showMailLogin();
            else if (8 == t) {
              _ = `${GameMgr.Inst.link_url}redirect/`;

              GameMgr.inRelease
                ? (_ += GameMgr.client_language)
                : (_ += 'tt');

              _ += '/yo_google.html';
              'jp' == GameMgr.client_language
                ? Yo.googleJaAuth({ redirect_uri: _, openNewWindow: !1 })
                : Yo.googleAuth({ redirect_uri: _, openNewWindow: !1 });
            } else if (9 == t) {
              _ = `${GameMgr.Inst.link_url}redirect/`;

              GameMgr.inRelease
                ? (_ += GameMgr.client_language)
                : (_ += 'tt');

              _ += '/yo_facebook.html';
              Yo.facebookAuth({ redirect_uri: _, openNewWindow: !1 });
            } else if (10 == t) {
              var _ = `${GameMgr.Inst.link_url}redirect/`;

              GameMgr.inRelease
                ? (_ += GameMgr.client_language)
                : (_ += 'tt');

              _ += '/yo_tiwtter.html';
              'jp' == GameMgr.client_language
                ? Yo.twitterJaAuth({ redirect_uri: _, openNewWindow: !1 })
                : Yo.twitterAuth({ redirect_uri: _, openNewWindow: !1 });
            }
          }
      }

      static onSocioBack(t, e, i) {
        app.Log.log(`!!!!!!!!!!!!!!! ${t} ${e}`);
        this.Inst && this.Inst._onSocioBack(t, e, i);
      }

      get server_region_name() {
        switch (this.server_index) {
          case 0:
            return 'mainland';
          case 1:
            return 'hk';
          default:
            return '';
        }
      }

      onCreate() {
        var a = this,
          s = this.me.getChildByName('root');
        this.container_login = this.me
          .getChildByName('root')
          .getChildByName('container_login');
        var o = t => {
          var e = {
            container: t,
            input: t.getChildByName('txtinput'),
            lb: t.getChildByName('lb')
          };
          e.input.text = '';
          e.lb.visible = !0;

          e.input.on('focus', a, () => {
            e.lb.visible = !1;
          });

          e.input.on('blur', a, () => {
            e.lb.visible = !e.input.text || '' == e.input.text;
          });

          e.input.on('input', a, () => {});
          return e;
        },
          l = this.container_login.getChildByName('chs');
        this.label_server = l.getChildByName('lb').getChildByName('word');

        l
            .getChildByName('lb')
            .getChildByName('btn').clickHandler = new Laya.Handler(
            this,
            () => {
              t.UI_Entrance_Choose_Route.Inst.show();
            }
          );

        l.getChildByName('lb').visible = !1;

        'chs' != GameMgr.client_language &&
          ((l.getChildByName('img_lb').visible = !1));

        this.txt_account = o(l.getChildByName('container_account'));
        this.txt_password = o(l.getChildByName('container_mima'));

        this.txt_account.input.on(
          laya.events.Event.KEY_DOWN,
          this.txt_account.input,
          ({keyCode}) => {
            keyCode === Laya.Keyboard.ENTER && a._btn_login();
          }
        );

        this.txt_password.input.on(
          laya.events.Event.KEY_DOWN,
          this.txt_account.input,
          ({keyCode}) => {
            keyCode === Laya.Keyboard.ENTER && a._btn_login();
          }
        );

        this.login_type_tabs = [];
        for (
          var h = t => {
            var e = l
              .getChildByName('container_tabs')
              .getChildByName(`tab${t}`);

            c.login_type_tabs.push({
              btn: e,
              word: e.getChildByName('word'),
              choosen: e.getChildByName('chosen')
            });

            c.login_type_tabs[t].btn.clickHandler = new Laya.Handler(
                c,
                () => {
                  a.login_type_tab_index != t && a.change_chs_login_tab(t);
                }
              );
          },
            c = this,
            u = 0;
          u < 2;
          u++
        )
          h(u);
        this.container_extendInfo = s.getChildByName('extendinfo');
        this.container_extendInfo.visible = !1;

        l.getChildByName('btn_regist').clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_Entrance_Mail_Regist.Inst.show();
            },
            null,
            !1
          );

        l.getChildByName(
            'btn_forgetpassword'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_Entrance_Reset_Password.Inst.show();
            },
            null,
            !1
          );

        this.btn_add2desktop = this.me
            .getChildByName('root')
            .getChildByName('btn_add2desktop');

        this.btn_add2desktop.visible =
            (Laya.Browser.onAndriod ||
              Laya.Browser.onAndroid ||
              Laya.Browser.onIOS) &&
            !GameMgr.inConch &&
            !GameMgr.inConch;

        this.btn_add2desktop.clickHandler = new Laya.Handler(
            this,
            () => {
              t.UI_Add2Desktop.Inst && t.UI_Add2Desktop.Inst.show();
            }
          );

        l.getChildByName('btn_enter').clickHandler = Laya.Handler.create(
            this,
            this._btn_login,
            null,
            !1
          );

        this.login_loading = new i(s.getChildByName('loading_login'));
        this.page_maillogin = new n(this.me.getChildByName('mail_login'));
        this.scene = new e(this.me.getChildByName('scene'));

        this.container_social = this.container_login.getChildByName(
            'social'
          );

        this.social_btns = [];

        this.social_btns.push(
          this.container_social.getChildByName(`btn${u}`)
        );

        for (u = 0; u < 4; u++)
          this.social_btns[u].visible = !1;
        var _ = [];

        'chs' == GameMgr.client_language &&
          (_ = [
            { img: 'myres/entrance/weibo.png', type: 2 },
            { img: 'myres/entrance/QQ.png', type: 3 },
            { img: 'myres/entrance/weixin.png', type: 1 }
          ]);

        'jp' == GameMgr.client_language &&
          (_ = [
            { img: 'myres/entrance/google.png', type: 8 },
            { img: 'myres/entrance/tiwtter.png', type: 10 }
          ]);

        'en' == GameMgr.client_language &&
          (_ = [
            { img: 'myres/entrance/google.png', type: 8 },
            { img: 'myres/entrance/facebook.png', type: 9 },
            { img: 'myres/entrance/tiwtter.png', type: 10 }
          ]);
        for (
          var d = t => {
            var e = f.social_btns[t];
            e.visible = !0;
            e.getChildAt(0).skin = game.Tools.localUISrc(_[t].img);

            e.clickHandler = new Laya.Handler(f, () => {
                  r.trySocio(_[t].type);
                });

            t < _.length
              ? (e.x = (340 * t) / (_.length - 1) + 55)
              : (e.visible = !1);
          },
            f = this,
            u = 0;
          u < this.social_btns.length;
          u++
        )
          d(u);
        this.social_btns[0].x = 340 / 3 + 55;

        2 == _.length &&
          ((this.social_btns[1].x = 680 / 3 + 55));

        this.me
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
            !1
          );

        this.me.getChildByName('infos').visible = !1;

        this.me.getChildByName('copyright').visible =
            'chs' == GameMgr.client_language && GameMgr.inConch;

        this.me
            .getChildByName('root')
            .getChildByName('loading_login')
            .getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
            this,
            () => {
              game.LobbyNetMgr.Inst.Close();
              Laya.LocalStorage.setItem('_pre_sociotype', '');
              a.showContainerLogin();
              a.login_loading.me.visible &&
                ((a.btn_login_cd = Laya.timer.currTimer + 500));
            },
            null,
            !1
          );
      }

      ModelJpEn() {
        var t = this.container_login.getChildByName('jpen'),
          e = t.getChildByName('btn_enter');
        e.clickHandler = Laya.Handler.create(
          this,
          () => {
            !(t => {
              1 == t && r.trySocio(7);
            })(!0);
          },
          null,
          !1
        );
        var i = t.getChildByName('checksave'),
          n = i.getChildByName('checkbox');
        i.getChildByName('btn_check').clickHandler = new Laya.Handler(
          this,
          () => {
            n.visible = !n.visible;
          }
        );
      }

      show() {
        var t = this;
        this.container_login.getChildByName('chs').visible = !1;
        this.container_login.getChildByName('jpen').visible = !0;
        this.container_social.x = 40;

        'chs' != GameMgr.client_language && GameMgr.inRelease
          ? (this.ModelJpEn())
          : (this.container_social.y = 475);

        this.container_extendInfo.visible = !0;
        this.container_extendInfo.visible = !0;

        -1 != GameMgr.Inst.beinvited_roomid
          ? (this.container_extendInfo.getChildAt(0).text =
              `${game.Tools.strOfLocalization(2054)}:${GameMgr.Inst.beinvited_roomid}`)
          : '' != GameMgr.Inst.outsee_paipuid
          ? (this.container_extendInfo.getChildAt(
              0
            ).text = game.Tools.strOfLocalization(2055))
          : (this.container_extendInfo.visible = !1);

        this.me.getChildByName('root').getChildByName('version').text =
            game.ResourceVersion.version;
        var e = Laya.LocalStorage.getItem('_pre_sociotype'),
          i = Laya.LocalStorage.getItem('ssssoooodd');
        i || (i = '');
        var n = -1;
        e && '' != e && (n = parseInt(e));
        app.Log.log(`sociotype:${n}`);
        var a = this.login_index;
        this.showLoginLoading(0);
        if (n < 0 || n > 10) this.showContainerLogin();
        else if (0 == n)
          '' != i
            ? (Laya.timer.once(600, this, () => {
            a == t.login_index && t._try_socio_check(a, n, i);
          }))
            : this.showContainerLogin();
        else if (n >= 1 && n <= 6) {
          var r = Laya.LocalStorage.getItem('_pre_code');
          r || (r = '');
          this.showLoginLoading(n);
          '' != r || '' != i
            ? (Laya.timer.once(500, this, () => {
            a == t.login_index &&
              (r && '' != r
                ? t._loginby_sociocode(a, n, r)
                : t._try_socio_check(a, n, i));
          }))
            : this.showContainerLogin();
        } else if (
          n >= 7 &&
          n <= 10 &&
          'chs' != GameMgr.client_language &&
          Yo.login
        ) {
          var s = game.LocalStorage.getItem('yostar_token');
          s || (s = '');
          var o = game.LocalStorage.getItem('yostar_uid');
          o || (o = '');
          this.showLoginLoading(n);
          '' != o && '' != s
            ? (Laya.timer.once(500, this, () => {
            a == t.login_index && t._login_2_yostar(a, n, s, o);
          }))
            : this.showContainerLogin();
        } else this.showContainerLogin();
        this.scene.show();
        this.enable = !0;
        'hk' == game.LobbyNetMgr.gateway_region_name
          ? this.showServer(1)
          : this.showServer(0);
      }

      _onSocioBack(t, e, i) {
        var n = this,
          a = this.login_index;
        this.showLoginLoading(t);
        Laya.timer.once(500, this, () => {
          Laya.LocalStorage.setItem('_pre_sociotype', t.toString());
          Laya.LocalStorage.setItem('_pre_code', e);
          a == n.login_index &&
            (e && '' != e
              ? (i
            ? n._login_2_yostar(a, t, e, i)
            : (n._loginby_sociocode(a, t, e)))
              : n.showContainerLogin());
        });
      }

      showContainerLogin() {
        if (-1 == this.login_type_tab_index) {
          var t = game.LocalStorage.getItem('login_type_tab'),
            e = game.LocalStorage.getItem('account'),
            i = game.LocalStorage.getItem('password');
          this.login_account_input_info = {};
          if (
            (e && i && '' != e && '' != i)
          ) {
            var n = 0;
            t && '' != t && (n = parseInt(t));

            this.login_account_input_info[n] = {
                account: e,
                password: i
              };

            this.change_chs_login_tab(n);
          } else this.change_chs_login_tab(0);
        } else this.change_chs_login_tab(this.login_type_tab_index);
        this.container_login.visible = !0;
        this.login_loading.close();
        this.login_index++;
      }

      showLoginLoading(t) {
        this.container_login.visible = !1;
        this.login_loading.show(t);
      }

      change_chs_login_tab(t) {
        this.login_type_tab_index >= 0 &&
          (this.login_account_input_info[this.login_type_tab_index] = {
            account: this.txt_account.input.text,
            password: this.txt_password.input.text
          });

        t || (t = 0);
        this.login_type_tab_index = t;

        this.login_type_tabs[e].word.color =
          e == t ? '#446fdb' : '#84827b';

        for (var e = 0; e < this.login_type_tabs.length; e++)
          this.login_type_tabs[e].choosen.visible = e == t;
        this.txt_account.lb.text = '账号/邮箱';
        this.txt_account.input.restrict = '';
        this.txt_account.lb.text = '手机号';
        this.txt_account.input.restrict = '0-9';
        this.txt_account.lb.text = '';
        this.txt_account.input.restrict = '';
        switch (t) {
          case 0:
            this.txt_account.input.maxChars = 50;
            break;
          case 1:
            this.txt_account.input.maxChars = 11;
            break;
          default:
          case 0:
            this.txt_account.input.maxChars = 50;
        }
        var i = this.login_account_input_info[t],
          n = '',
          a = '';
        n = i.account;
        i && ((a = i.password));
        this.txt_account.input.text = n;
        this.txt_account.input.text = '';

        n && '' != n
          ? (this.txt_account.lb.visible = !1)
          : (this.txt_account.lb.visible = !0);

        this.txt_password.input.text = a;
        this.txt_password.input.text = '';
        a && '' != a
          ? (this.txt_password.lb.visible = !1)
          : (this.txt_password.lb.visible = !0);
      }

      _btn_login() {
        var e = this,
          i = this.txt_account.input.text,
          n = this.txt_password.input.text;
        if (i && '' != i)
          if (n && '' != n) {
            if (!(Laya.timer.currTimer < this.btn_login_cd))
              if (this.multiLogin())
                this.showInfo(game.Tools.strOfLocalization(2058));
              else {
                this.btn_login_cd = Laya.timer.currTimer + 1e3;
                this.showLoginLoading(0);
                var a = this.login_index;
                game.LobbyNetMgr.Inst.isOK &&
                r.Inst.server_region_name ==
                  game.LobbyNetMgr.gateway_region_name
                  ? r.Inst._try_login_account(a, i, n)
                  : game.LobbyNetMgr.Inst.OpenConnect(
                      r.Inst.server_region_name,
                      Laya.Handler.create(this, ({maintenance, info, open}) => {
                        maintenance
                                ? t.UI_Entrance_Maintenance.Inst.show(
                                    maintenance
                                  )
                                : e.showInfo(info);

                        e.showContainerLogin();
                        a == e.login_index &&
                          (open
                            ? r.Inst._try_login_account(a, i, n)
                            : (e.btn_login_cd = 0));
                      })
                    );
              }
          } else this.showInfo(game.Tools.strOfLocalization(2057));
        else this.showInfo(game.Tools.strOfLocalization(2056));
      }

      _try_regist_account(t, e, i, n) {
        var a = this;
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'signup',
          { account: t, password: GameMgr.encodeP(i), code: e, type: n },
          (e, r) => {
            a.showError(game.Tools.strOfLocalization(2059), e);
            a.showError(game.Tools.strOfLocalization(2060), r.error.code);
            if (e)
              app.Log.Error(e.message);
            else if (r.error)
              app.Log.Error(
                game.Tools.strOfLocalization(2219, [JSON.stringify(r)])
              );
            else {
              var s = n - 1;
              a.login_account_input_info[s] = { account: t, password: i };
              a.change_chs_login_tab(s);
              a._try_login_account(a.login_index, t, i);
            }
          }
        );
      }

      _try_login_account(e, i, n) {
        var a = this;
        if (e == this.login_index) {
          this.showInfo(game.Tools.strOfLocalization(2058));
          if (this.multiLogin())
            return void this.showContainerLogin();
          var r = {};
          Laya.Browser.onPC && (r.device_type = 'pc');
          Laya.Browser.onIPad && (r.device_type = 'ipad');

          GameMgr.inConch
            ? (r.device_type = 'app')
            : GameMgr.iniOSWebview
            ? (r.device_type = 'app-ios')
            : (Laya.Browser.onMobile && (r.device_type = 'mobile'));

          Laya.Browser.onMac && (r.os = 'mac');
          Laya.Browser.onIOS && (r.os = 'ios');

          (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
            (r.os = 'android');

          Laya.Browser.onWeiXin && (r.browser = 'weixin');
          Laya.Browser.onSafari && (r.browser = 'safari');
          Laya.Browser.onFirefox && (r.browser = 'firefox');
          Laya.Browser.onEdge && (r.browser = 'edge');
          Laya.Browser.onMiniGame && (r.browser = 'minigame');
          var s = [];
          GameMgr.inGooglePlay && s.push(1);
          GameMgr.inChina && s.push(2);
          game.LocalStorage.setItem('account', i);
          game.LocalStorage.setItem('password', n);

          game.LocalStorage.setItem(
            'login_type_tab',
            this.login_type_tab_index.toString()
          );

          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'login',
            {
              account: i,
              password: GameMgr.encodeP(n),
              reconnect: !1,
              device: r,
              random_key: GameMgr.device_id,
              client_version: game.ResourceVersion.version,
              gen_access_token: !0,
              currency_platforms: s,
              type: this.login_type_tab_index
            },
            (r, s) => {
              a.btn_login_cd = 0;
              a.showError(game.Tools.strOfLocalization(2061), r);

              503 == s.error.code
                    ? t.UI_Entrance_Prohibition.Inst.show(s.error)
                    : a.showError('', s.error.code);

              Laya.LocalStorage.setItem('_pre_sociotype', '0');
              game.LocalStorage.setItem('account', i);
              game.LocalStorage.setItem('password', n);

              game.LocalStorage.setItem(
                'login_type_tab',
                a.login_type_tab_index.toString()
              );

              GameMgr.Inst.account = i;
              GameMgr.Inst.password = n;
              GameMgr.Inst.sociotype = 0;
              e == a.login_index &&
                ((r ? a.showContainerLogin() : s.error
                ? (a.showContainerLogin())
                : (a._onLoginSuccess(0, s))));
            }
          );
        }
      }

      _login_2_yostar(t, e, i, n) {
        var a = this;
        if (t == this.login_index) {
          app.Log.log(
            `login_2_yostar sociotype:${e} token:${i} uid:${n}`
          );
          var r = this,
            s = t => {
              switch (t) {
                case 1:
                  r.showError(game.Tools.strOfLocalization(2677));
                  break;
                case 2:
                  r.showError(game.Tools.strOfLocalization(2678));
                  break;
                case 3:
                  r.showError(game.Tools.strOfLocalization(2679));
                  break;
                case 4:
                  r.showError(game.Tools.strOfLocalization(2680));
                  break;
                default:
                  r.showError(game.Tools.strOfLocalization(2676));
              }
              Laya.LocalStorage.setItem('_pre_sociotype', '');
              r.showContainerLogin();
            };
          Yo.login &&
            Yo.login({ uid: n, token: i }).then(o => {
              app.Log.log(`yo login data.result:${o.result}`);
              game.LocalStorage.setItem('yostar_token', i);
              game.LocalStorage.setItem('yostar_uid', n);
              GameMgr.Inst.yostar_accessToken = o.accessToken;
              app.Log.log('yo login data.result: no');
              t == a.login_index &&
                (o
                  ? (0 == o.result
                ? (r._loginby_sociocode(t, e, o.accessToken, n))
                : s(o.result))
                  : (s(-1)));
            });
        }
      }

      _loginby_sociocode(e, i, n, a) {
        var s = this;
        void 0 === a && (a = '');

        app.Log.log(
            `_loginby_sociocode0 sociotype:${i}, code:${n}, uid:${a}`
          );

        if ((e == this.login_index))
          if (
            (game.LobbyNetMgr.Inst.isOK &&
            r.Inst.server_region_name ==
              game.LobbyNetMgr.gateway_region_name)
          ) {
            Laya.LocalStorage.setItem('_pre_code', '');
            Laya.LocalStorage.setItem('_pre_sociotype', '');
            app.Log.log(
              `_loginby_sociocode1 sociotype${i} code:${n} uid:${a}`
            );
            var o = { type: i, code: n };
            a && (o.uid = a);
            app.NetAgent.sendReq2Lobby('Lobby', 'oauth2Auth', o, (t, n) => {
              app.Log.log(`oauth2Auth err:${t}`);
              s.showError(game.Tools.strOfLocalization(2059), t);
              app.Log.Error(t.message);
              app.Log.log(`oauth2Auth res: ${JSON.stringify(n)}`);

              s.showError(
                    game.Tools.strOfLocalization(2062),
                    n.error.code
                  );

              e == s.login_index &&
                (t
                  ? (s.showContainerLogin())
                  : (n.error
                ? (s.showContainerLogin())
                : s._try_socio_check(e, i, n.access_token)));
            });
          } else
            game.LobbyNetMgr.Inst.OpenConnect(
              r.Inst.server_region_name,
              Laya.Handler.create(this, ({maintenance, info, open}) => {
                maintenance
                        ? t.UI_Entrance_Maintenance.Inst.show(maintenance)
                        : s.showInfo(info);

                e == s.login_index &&
                  (open
                    ? s._loginby_sociocode(e, i, n, a)
                    : (s.showContainerLogin()));
              })
            );
      }

      _try_socio_check(e, i, n) {
        var a = this;
        this.showInfo(game.Tools.strOfLocalization(2058));

        app.Log.log(
                  `_try_socio_check sociotype${i} access_token:${n}`
                );

        if (e == this.login_index)
          return this.multiLogin()
            ? (void this.showContainerLogin())
            : void (game.LobbyNetMgr.Inst.isOK &&
              r.Inst.server_region_name ==
                game.LobbyNetMgr.gateway_region_name
                ? (app.NetAgent.sendReq2Lobby(
            'Lobby',
            'oauth2Check',
            { type: i, access_token: n },
            (t, r) => {
              a.showError(
                      game.Tools.strOfLocalization(2059),
                      t
                    );

              app.Log.Error(t.message);

              app.Log.log(
                      `oauth2Check res: ${JSON.stringify(r)}`
                    );

              a.showError(
                    game.Tools.strOfLocalization(2062),
                    r.error.code
                  );

              e == a.login_index &&
                (t
                  ? (a.showContainerLogin())
                  : (r.error
                ? (a.showContainerLogin())
                : r.has_account
                ? a._try_login_socio(e, i, n)
                : a._try_regist_socio(e, i, n)));
            }
          ))
                : game.LobbyNetMgr.Inst.OpenConnect(
                    r.Inst.server_region_name,
                    Laya.Handler.create(this, ({maintenance, info, open}) => {
                      maintenance
                              ? t.UI_Entrance_Maintenance.Inst.show(
                                  maintenance
                                )
                              : a.showInfo(info);

                      e == a.login_index &&
                        (open
                          ? a._try_socio_check(e, i, n)
                          : (a.showContainerLogin()));
                    })
                  ));
      }

      _try_regist_socio(t, e, i) {
        var n = this;
        if (t == this.login_index) {
          app.Log.log(
            `_try_regist_socio sociotype${e} access_token:${i}`
          );
          var a = Laya.LocalStorage.getItem('__ad_s');
          a && (GameMgr.Inst._ad_str = a);
          var r = {};
          r.type = e;
          r.access_token = i;
          GameMgr.Inst._ad_str && (r.advertise_str = GameMgr.Inst._ad_str);
          7 == e && (r.email = game.LocalStorage.getItem('mail_account'));
          app.NetAgent.sendReq2Lobby('Lobby', 'oauth2Signup', r, (a, r) => {
            app.Log.log(`oauth2Signup err:${a}`);
            n.showError(game.Tools.strOfLocalization(2059), a);
            app.Log.Error(a.message);
            app.Log.log(`oauth2Signup res: ${JSON.stringify(r)}`);

            n.showError(
                  game.Tools.strOfLocalization(2060),
                  r.error.code
                );

            app.Log.Error(
              game.Tools.strOfLocalization(2219, [
                JSON.stringify(r)
              ])
            );

            app.PlayerBehaviorStatistic.fb_trace_force(
                  app.EBehaviorType.CompleteRegistration
                );

            app.PlayerBehaviorStatistic.google_trace_force(
              app.EBehaviorType.G_Role_create
            );

            app.PlayerBehaviorStatistic.tw_trace_force(
              app.EBehaviorType.TW_Signup
            );

            t == n.login_index &&
              (a
                ? (n.showContainerLogin())
                : (r.error
              ? (n.showContainerLogin())
              : (n._try_login_socio(t, e, i))));
          });
        }
      }

      _try_login_socio(e, i, n) {
        var a = this;
        if (e == this.login_index) {
          this.showError(game.Tools.strOfLocalization(2058));
          if (this.multiLogin())
            return void this.showContainerLogin();
          app.Log.log(
            `_try_login_socio sociotype${i} access_token:${n}`
          );
          var r = {};
          Laya.Browser.onPC && (r.device_type = 'pc');
          Laya.Browser.onIPad && (r.device_type = 'ipad');

          GameMgr.inConch
            ? (r.device_type = 'app')
            : GameMgr.iniOSWebview
            ? (r.device_type = 'app-ios')
            : (Laya.Browser.onMobile && (r.device_type = 'mobile'));

          Laya.Browser.onMac && (r.os = 'mac');
          Laya.Browser.onIOS && (r.os = 'ios');

          (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
            (r.os = 'android');

          Laya.Browser.onWeiXin && (r.browser = 'weixin');
          Laya.Browser.onSafari && (r.browser = 'safari');
          Laya.Browser.onFirefox && (r.browser = 'firefox');
          Laya.Browser.onEdge && (r.browser = 'edge');
          Laya.Browser.onMiniGame && (r.browser = 'minigame');
          var s = [];
          GameMgr.inGooglePlay && s.push(1);
          GameMgr.inChina && s.push(2);
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'oauth2Login',
            {
              type: i,
              access_token: n,
              reconnect: !1,
              device: r,
              random_key: GameMgr.device_id,
              client_version: game.ResourceVersion.version,
              currency_platforms: s
            },
            (r, s) => {
              a.btn_login_cd = 0;
              app.Log.log(`oauth2Login err:${r}`);
              a.showError(game.Tools.strOfLocalization(2061), r);
              app.Log.log(`oauth2Login res: ${JSON.stringify(s)}`);

              503 == s.error.code
                    ? t.UI_Entrance_Prohibition.Inst.show(s.error)
                    : a.showError('', s.error.code);

              Laya.LocalStorage.setItem(
                    '_pre_sociotype',
                    i.toString()
                  );

              Laya.LocalStorage.setItem('ssssoooodd', n);
              GameMgr.Inst.sociotype = i;
              GameMgr.Inst.access_token = n;
              e == a.login_index &&
                ((r ? a.showContainerLogin() : s.error
                ? (a.showContainerLogin())
                : (a._onLoginSuccess(i, s))));
            }
          );
        }
      }

      _onLoginSuccess(e, i) {
        var n = this;
        app.Log.log(`登陆：${JSON.stringify(i)}`);
        GameMgr.Inst.account_id = i.account_id;
        GameMgr.Inst.account_data = i.account;
        GameMgr.Inst.account_numerical_resource = {};
        if (
          (i.account.platform_diamond)
        )
          for (var a = i.account.platform_diamond, r = 0; r < a.length; r++)
            GameMgr.Inst.account_numerical_resource[a[r].id] = a[r].count;
        GameMgr.Inst.account_refresh_time = Laya.timer.currTimer;
        GameMgr.Inst.ingame = !0;
        GameMgr.Inst.mj_server_location = i.game_info.location;
        GameMgr.Inst.mj_game_token = i.game_info.connect_token;

        i.game_info &&
          ((GameMgr.Inst.mj_game_uuid = i.game_info.game_uuid));

        Laya.LocalStorage.setItem('_pre_sociotype', e.toString());
        Laya.LocalStorage.setItem('ssssoooodd', i.access_token);
        GameMgr.Inst.sociotype = e;

        i.access_token &&
          ((GameMgr.Inst.access_token = i.access_token));

        Laya.LocalStorage.removeItem('__ad_s');
        t.UI_Loading.Inst.show('load_lobby');
        this.enable = !1;
        this.scene.close();
        t.UI_Entrance_Mail_Regist.Inst.close();
        this.login_loading.close();
        t.UIMgr.Inst.openLobbyUI(
          Laya.Handler.create(this, () => {
            GameMgr.Inst.afterLogin();

            GameMgr.Inst.account_data.anti_addiction &&
              t.UIMgr.Inst.ShowPreventAddiction();

            n.destroy();
            n.disposeRes();
            t.UI_Add2Desktop.Inst.destroy();
            t.UI_Add2Desktop.Inst &&
              ((t.UI_Add2Desktop.Inst = null));
          }),
          Laya.Handler.create(
            this,
            e => t.UI_Loading.Inst.setProgressVal(0.2 * e),
            null,
            !1
          )
        );
      }

      showMailLogin() {
        this.page_maillogin.show();
      }

      showInfo(e) {
        var i = '';
        e && (i += e);
        t.UI_Entrance_Error.Inst.show(i, !1);
      }

      showError(e, i, n) {
        void 0 === i && (i = -1);
        void 0 === n && (n = '');
        var a = '';
        e && (a += e);
        a.length > 0 && (a += ',');

        -1 != i &&
          ((cfg.info.error.get(i) ? a += cfg.info.error.get(i)[GameMgr.client_language] : a += `${game.Tools.strOfLocalization(2063)}(${i})`));

        n && (a += `, info:${n}`);
        t.UI_Entrance_Error.Inst.show(a, !1);
      }

      showServer(t) {
        Laya.LocalStorage.setItem('gateway_region', 'mainland');
        this.server_index = 0;
        Laya.LocalStorage.setItem('gateway_region', 'hk');
        this.server_index = 1;
        0 == t
          ? (this.label_server.text = game.Tools.strOfLocalization(2217))
          : 1 == t &&
            ((this.label_server.text = game.Tools.strOfLocalization(2216)));
      }

      multiLogin() {
        var t = Laya.LocalStorage.getItem('dolllt');
        return (
          !(!t || '' == t) && game.Tools.currentTime < parseFloat(t) + 1.5
        );
      }

      disposeRes() {
        Laya.Loader.clearTextureRes('res/atlas/myres/entrance.atlas');
        var t = '';

        t =
          'en' == GameMgr.client_language
            ? 'scene/Assets/Resource/entrance/icon_color_en.png'
            : 'jp' == GameMgr.client_language
            ? 'scene/Assets/Resource/entrance/icon_color_jp.png'
            : 'scene/Assets/Resource/entrance/icon_color.png';

        Laya.loader.getRes(t).dispose(!0);
      }
    }

    __extends(r, a);

    r.Accountforbidden = t => {
      var e = !1;

      cfg.info.forbidden.forEach(({word}, n) => {
        '' != word && t.includes(word) && (e = !0);
      });

      return e;
    };

    r.Inst = null;
    return r;
  })(t.UIBase);

  t.UI_Entrance = a;
})(uiscript || (uiscript = {}));